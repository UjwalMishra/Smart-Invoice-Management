const Imap = require("imap");
const { simpleParser } = require("mailparser");
const cheerio = require("cheerio");
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const {
  extractTextFromImage,
  extractInvoiceData,
} = require("../ocr/extractText");
const Invoice = require("../models/Invoice");
const { getEmailCredentials } = require("../services/getEmailCredentials");

async function initializeEmailProcessing(userId) {
  try {
    const userData = await getEmailCredentials(userId);
    console.log("user data : ", userData);
    if (!userData?.user || !userData?.password) {
      throw new Error("Missing email credentials for user");
    }

    console.log("ℹ️ Initializing email processing for:", userData.user);

    const imapConfig = {
      user: userData.user,
      password: userData.password,
      host: "imap.gmail.com",
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 10000,
      connTimeout: 30000,
    };

    const tempDir = path.join(__dirname, "temp_attachments");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Configure logging with user-specific context
    function log(message, level = "info") {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] [${level.toUpperCase()}] [USER:${userId}] ${message}`;
      console.log(logMessage);
      fs.appendFileSync(
        path.join(__dirname, "email_processor.log"),
        logMessage + "\n"
      );
    }

    // Helper functions
    function getSearchCriteria() {
      // Build nested OR structure with exactly two arguments per OR
      const searchTerms = [
        ["SUBJECT", "invoice"],
        ["SUBJECT", "bill"],
        ["FROM", "billing"],
        ["FROM", "noreply"],
        ["TEXT", "invoice"],
        ["TEXT", "bill"],
      ];

      // Recursively nest OR conditions
      const buildOrTree = (terms) => {
        if (terms.length === 1) return terms[0];
        const first = terms.shift();
        return ["OR", first, buildOrTree(terms)];
      };

      return ["UNSEEN", buildOrTree(searchTerms)];
    }

    async function processEmailBody(emailData, parsed) {
      try {
        const text = parsed.text || "";
        const html = parsed.html ? cheerio.load(parsed.html).text() : "";
        const combined = `${text} ${html}`.toLowerCase();

        const invoiceKeywords = [
          "invoice",
          "bill",
          "payment",
          "amount due",
          "total amount",
          "receipt",
          "statement",
        ];

        if (!invoiceKeywords.some((k) => combined.includes(k))) {
          return false;
        }

        log("📧 Found invoice-related content in email body");
        const extractedData = extractInvoiceData(combined);

        // Calculate total if missing
        if (!extractedData.amounts?.total && extractedData.amounts) {
          const subtotal = parseFloat(extractedData.amounts.subtotal || 0);
          const tax = parseFloat(extractedData.amounts.tax?.total || 0);
          extractedData.amounts.total = (subtotal + tax).toFixed(2);
        }

        return saveInvoice({
          ...extractedData,
          source: `Email body from ${emailData.from}`,
          originalFilename: "email_body.txt",
          rawText: combined,
        });
      } catch (error) {
        log(`❌ Error processing email body: ${error.message}`, "error");
        return false;
      }
    }

    async function processAttachments(emailData) {
      let processedCount = 0;

      for (const attachment of emailData.attachments) {
        try {
          log(`📎 Processing attachment: ${attachment.filename}`);
          let extractedText = "";

          if (attachment.contentType === "application/pdf") {
            const buffer = fs.readFileSync(attachment.path);
            const data = await pdfParse(buffer);
            extractedText = data.text;
          } else {
            extractedText = await extractTextFromImage(attachment.path);
          }

          const extractedFields = extractInvoiceData(extractedText);
          if (extractedFields) {
            await saveInvoice({
              ...extractedFields,
              rawText: extractedText,
              source: `Attachment from ${emailData.from}`,
              originalFilename: attachment.filename,
            });
            processedCount++;
          }
        } catch (error) {
          log(`❌ Attachment processing error: ${error.message}`, "error");
        } finally {
          if (fs.existsSync(attachment.path)) {
            fs.unlinkSync(attachment.path);
          }
        }
      }
      return processedCount > 0;
    }

    async function saveInvoice(invoiceData) {
      try {
        // Validation and transformation logic
        if (!invoiceData.metadata?.invoiceNumber) {
          throw new Error("Missing invoice number");
        }

        // GSTIN validation
        const isValidGSTIN = (gstin) =>
          /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[Z]{1}[A-Z\d]{1}$/.test(gstin);

        // Transform amounts
        // const transformAmount = (value) =>
        //   Math.round(parseFloat(String(value).replace(/,/g, "")) * 100) / 100;

        const transformAmount = (value) => {
          const number = parseFloat(String(value || "0").replace(/,/g, ""));
          return isNaN(number) ? 0 : Math.round(number * 100) / 100;
        };

        // Create invoice document
        const invoiceDoc = new Invoice({
          metadata: {
            number: invoiceData.metadata.invoiceNumber,
            type: invoiceData.metadata.type || "TAX_INVOICE",
            date: invoiceData.metadata.invoiceDate || new Date(),
            dueDate: invoiceData.metadata.dueDate,
            currency: "INR",
          },
          parties: {
            supplier: {
              name: invoiceData.entities?.supplier?.name || "Unknown Supplier",
              taxInfo: {
                gstin: isValidGSTIN(
                  invoiceData.entities?.supplier?.taxInfo?.gstin
                )
                  ? invoiceData.entities.supplier.taxInfo.gstin
                  : undefined,
              },
            },
            customer: {
              name: invoiceData.entities?.customer?.name || "Unknown Customer",
            },
          },
          amounts: {
            subtotal: transformAmount(invoiceData.amounts.subtotal),
            tax: {
              cgst: transformAmount(invoiceData.amounts.tax?.cgst),
              sgst: transformAmount(invoiceData.amounts.tax?.sgst),
              igst: transformAmount(invoiceData.amounts.tax?.igst),
            },
            total: transformAmount(invoiceData.amounts.total),
          },
          system: {
            source: "email",
            originalFilename: invoiceData.originalFilename,
            processedAt: new Date(),
          },
        });

        await invoiceDoc.save();
        log(`✅ Invoice saved: ${invoiceDoc._id}`);
        return true;
      } catch (error) {
        log(`❌ Invoice save failed: ${error.message}`, "error");
        return false;
      }
    }

    async function processEmail() {
      return new Promise((resolve, reject) => {
        const imap = new Imap(imapConfig);
        let processedCount = 0;

        imap.once("ready", () => {
          imap.openBox("INBOX", false, (err) => {
            if (err) return reject(err);

            imap.search(getSearchCriteria(), (err, results) => {
              if (err) return reject(err);
              if (!results.length) return resolve(0);

              const fetch = imap.fetch(results, {
                bodies: "",
                markSeen: true,
                struct: true,
              });

              fetch.on("message", (msg) => {
                const emailData = { attachments: [] };

                msg.on("body", async (stream) => {
                  try {
                    const parsed = await simpleParser(stream);
                    emailData.from = parsed.from?.value?.[0]?.address;

                    // Process attachments
                    if (parsed.attachments) {
                      for (const attachment of parsed.attachments) {
                        const filePath = path.join(
                          tempDir,
                          `${Date.now()}_${attachment.filename}`
                        );
                        fs.writeFileSync(filePath, attachment.content);
                        emailData.attachments.push({
                          path: filePath,
                          filename: attachment.filename,
                          contentType: attachment.contentType,
                        });
                      }
                    }

                    // Process content
                    const bodyResult = await processEmailBody(
                      emailData,
                      parsed
                    );
                    const attachmentsResult = await processAttachments(
                      emailData
                    );

                    if (bodyResult || attachmentsResult) {
                      processedCount++;
                    }
                  } catch (error) {
                    log(
                      `❌ Message processing error: ${error.message}`,
                      "error"
                    );
                  }
                });
              });

              fetch.once("error", reject);
              fetch.once("end", () => {
                imap.end();
                resolve(processedCount);
              });
            });
          });
        });

        imap.once("error", reject);
        imap.connect();
      });
    }

    // Scheduling logic
    const job = cron.schedule("*/1 * * * *", async () => {
      try {
        log("⏰ Running scheduled email check");
        const count = await processEmail();
        log(`🎉 Processed ${count} invoices`);
      } catch (error) {
        log(`❌ Scheduled job failed: ${error.message}`, "error");
      }
    });

    // Initial run
    setTimeout(async () => {
      try {
        const count = await processEmail();
        log(`🚀 Initial processing completed: ${count} invoices`);
      } catch (error) {
        log(`❌ Initial processing failed: ${error.message}`, "error");
      }
    }, 15000);

    return {
      stop: () => {
        job.stop();
        log("🛑 Stopped email processing");
      },
    };
  } catch (error) {
    console.error("❌ Initialization failed:", error);
    throw error;
  }
}

module.exports = { initializeEmailProcessing };
