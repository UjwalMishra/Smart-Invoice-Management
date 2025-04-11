require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Import routes
const emailAutomationRoutes = require("./routes/emailRoutes");
const userRoutes = require("./routes/user");
const getAllInvoices = require("./routes/invoiceRoute");
const { dbConnect } = require("./config/dbConnection");
const { checkAuthCookie } = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 8000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Connect to DB
dbConnect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(checkAuthCookie("token"));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// API routes
app.use("/api/auth", userRoutes);
app.use("/api/automation", emailAutomationRoutes);
app.use("/api/invoices", getAllInvoices);
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

// Multer config
const upload = multer({ dest: "data/" });

// ✅ Chatbot File Upload Route (Gemini JSON output)
app.post("/api/upload", upload.single("invoice"), async (req, res) => {
  let extractedText = "";
  try {
    if (!req.file) {
      console.error("❌ No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("✅ File received:", req.file.originalname);

    const filePath = path.join(__dirname, "data", req.file.filename);
    const ext = path.extname(req.file.originalname).toLowerCase();

    // Extract text
    if (ext === ".pdf") {
      const buffer = fs.readFileSync(filePath);
      const data = await pdfParse(buffer);
      extractedText = data.text;
    } else if ([".png", ".jpg", ".jpeg"].includes(ext)) {
      const image = await Tesseract.recognize(filePath, "eng");
      extractedText = image.data.text;
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-pro-latest",
    });

    const prompt = `
You are a JSON generator. Respond ONLY with a JSON array. No markdown or explanation.

Extract all invoices from the following text. If a field is missing, use an empty string.

[
  {
    "invoiceNumber": "",
    "invoiceDate": "",
    "seller": "",
    "gstin": "",
    "item": "",
    "grossAmount": "",
    "discount": "",
    "taxableValue": "",
    "tax": "",
    "total": "",
    "shipping": "",
    "shippingAddress": "",
    "notes": ""
  }
]

Text to process:
"""${extractedText}"""
Return only the valid JSON array.
    `;

    const result = await model.generateContent(prompt);

    let responseText = result.response.text().trim();

    // Clean markdown fences if present
    if (responseText.startsWith("```json") || responseText.startsWith("```")) {
      responseText = responseText
        .replace(/```json\n?/, "")
        .replace(/```$/, "")
        .trim();
    }

    // Try parsing JSON
    let structuredData;
    try {
      structuredData = JSON.parse(responseText);
    } catch (err) {
      console.error("❌ JSON parsing error:", err.message);
      return res
        .status(500)
        .json({ error: "AI response was not valid JSON", raw: responseText });
    }

    res.json({ invoices: structuredData });
  } catch (error) {
    console.error("❌ Error processing invoice:", error);
    res.status(500).json({ error: "Failed to process invoice" });
  } finally {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path); // Clean uploaded file
    }
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
