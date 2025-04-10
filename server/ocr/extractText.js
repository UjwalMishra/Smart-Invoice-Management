const Tesseract = require("tesseract.js");

const extractTextFromImage = async (filePath, retries = 2) => {
  for (let i = 0; i < retries; i++) {
    try {
      const { data } = await Tesseract.recognize(filePath, "eng", {
        logger: (m) => console.log(m),
        tessedit_char_whitelist:
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@.,#:/-+₹$%() ",
        presets: ["fast"],
        // Added PDF-specific optimizations
        preserve_interword_spaces: 1,
        tessedit_pageseg_mode: 6, // Assume single uniform block of text
      });

      return data.text
        .replace(/(\n\s*){2,}/g, "\n") // Normalize newlines
        .replace(/([A-Z])\s+(?=[A-Z])/g, "$1") // Fix spaced-out GSTIN
        .replace(/\s+/g, " ") // Collapse multiple spaces
        .trim();
    } catch (error) {
      if (i === retries - 1) throw error;
      console.warn(`OCR Attempt ${i + 1} failed. Retrying...`);
    }
  }
};

function extractInvoiceData(text) {
  const cleanValue = (value) => value?.replace(/[^\w\s.,-@]/g, "").trim();

  // 1. Extract Invoice Header Information
  const invoiceNumber = cleanValue(
    text.match(/(?:Invoice\s*No[#:]?\s*)([A-Za-z0-9-]+)/i)?.[1]
  );

  const dates = {
    invoiceDate: cleanValue(
      text.match(
        /(?:Date|Invoice\s*Date)[^\w\n]*([A-Za-z]+\s+\d{1,2},\s+\d{4}|\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/i
      )?.[1]
    ),
    dueDate: cleanValue(
      text.match(
        /(?:Due\s*Date)[^\w\n]*([A-Za-z]+\s+\d{1,2},\s+\d{4}|\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/i
      )?.[1]
    ),
  };

  // 2. Extract Financial Information
  const amounts = {
    subtotal: text
      .match(/(?:Sub\s*Total|Amount)[^\d₹$]*[₹]?\s*([\d,]+\.\d{2})/i)?.[1]
      ?.replace(/,/g, ""),
    tax: {
      cgst: text
        .match(/CGST[^\d₹$]*[₹]?\s*([\d,]+\.\d{2})/i)?.[1]
        ?.replace(/,/g, ""),
      sgst: text
        .match(/SGST[^\d₹$]*[₹]?\s*([\d,]+\.\d{2})/i)?.[1]
        ?.replace(/,/g, ""),
      igst: text
        .match(/IGST[^\d₹$]*[₹]?\s*([\d,]+\.\d{2})/i)?.[1]
        ?.replace(/,/g, ""),
    },
    discount: text
      .match(/(?:Discount)[^\d₹$]*[₹]?\s*([\d,]+\.\d{2})/i)?.[1]
      ?.replace(/,/g, ""),
    total: text
      .match(
        /(?:Total\s*Amount|Grand\s*Total)[^\d₹$]*[₹]?\s*([\d,]+\.\d{2})/i
      )?.[1]
      ?.replace(/,/g, ""),
  };

  // Helper function to extract entity information
  const extractEntity = (sectionText, type) => {
    const lines = sectionText.split("\n").filter((l) => l.trim());
    return {
      type: type, // 'supplier' or 'customer'
      name: cleanValue(lines[0]),
      address: {
        line1: cleanValue(lines[1]),
        line2: cleanValue(lines[2]),
        city: cleanValue(lines.find((l) => l.includes(","))?.split(",")[0]),
        state: cleanValue(lines.find((l) => l.includes(","))?.split(",")[1]),
        country: cleanValue(
          lines.find((l) => l.match(/india|INDIA/i)) || "India"
        ),
      },
      taxInfo: {
        gstin: text.match(
          /(?:GSTIN[:]?\s*)(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1})/i
        )?.[1],
        pan: text.match(/(?:PAN[:]?\s*)([A-Z]{5}\d{4}[A-Z]{1})/i)?.[1],
      },
      contact: {
        email: sectionText.match(
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i
        )?.[0],
        phone: sectionText
          .match(/(?:\+91|0)?\s*[-\s]?(\d{5})\s*[-\s]?(\d{5})/)
          ?.slice(1)
          .join(""),
      },
    };
  };

  const billedBySection =
    text.match(
      /Billed\s*By([\s\S]+?)(?=Billed\s*To|Item|Description|$)/i
    )?.[1] || "";
  const billedToSection =
    text.match(/Billed\s*To([\s\S]+?)(?=Item|Description|$)/i)?.[1] || "";

  const entities = {
    supplier: extractEntity(billedBySection, "supplier"),
    customer: extractEntity(billedToSection, "customer"),
  };

  // 4. Extract Line Items
  const lineItems = [];
  const itemRegex =
    /(\d+)\.\s*(.+?)\s+(\d+%)\s+(\d+)\s+[₹]?([\d,]+\.\d{2})\s+[₹]?([\d,]+\.\d{2})/gi;
  let itemMatch;
  while ((itemMatch = itemRegex.exec(text)) !== null) {
    lineItems.push({
      srNo: parseInt(itemMatch[1]),
      description: cleanValue(itemMatch[2]),
      hsnCode: text.match(/HSN[:]?\s*(\d+)/i)?.[1],
      quantity: parseInt(itemMatch[4]),
      rate: parseFloat(itemMatch[5].replace(/,/g, "")),
      taxRate: itemMatch[3],
      amount: parseFloat(itemMatch[6].replace(/,/g, "")),
    });
  }

  // 5. Payment Information
  const paymentInfo = {
    accountNumber: text.match(/(?:Account\s*No|A\/C)[:.]?\s*([\d-]+)/i)?.[1],
    ifscCode: text.match(/IFSC[:]?\s*([A-Z]{4}0[A-Z0-9]{6})/i)?.[1],
    paymentTerms: text.match(/(?:Payment\s*Terms)[:.]?\s*(.+?)(?=\n|$)/i)?.[1],
  };

  return {
    metadata: {
      invoiceNumber,
      type: "TAX_INVOICE", // or 'PROFORMA', 'RECEIPT' etc.
      reference: text.match(/(?:Ref|Reference)[:.]?\s*(.+?)(?=\n|$)/i)?.[1],
      ...dates,
    },
    entities,
    amounts,
    lineItems,
    paymentInfo,
    rawText: text,
  };
}

module.exports = { extractTextFromImage, extractInvoiceData };
