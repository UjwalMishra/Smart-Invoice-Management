require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import routes
const emailAutomationRoutes = require("./routes/emailRoutes");
const userRoutes = require("./routes/user");
const getAllInvoices = require("./routes/invoiceRoute");
const { dbConnect } = require("./config/dbConnection");
const { checkAuthCookie } = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to DB
dbConnect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(checkAuthCookie("token"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// API routes
app.use("/api/auth", userRoutes); // 🔁 Use cleaner path
app.use("/api/automation", emailAutomationRoutes);
app.use("/api/invoices", getAllInvoices);
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
