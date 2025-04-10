// require("dotenv").config();
// const express = require("express");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// // Import routes
// const userRoutes = require("./routes/user");

// // Connect to DB
// const { dbConnect } = require("./config/dbConnection");

// const app = express();
// const PORT = process.env.PORT || 8000;

// // Connect to DB
// dbConnect();

// // Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:3000", // your React frontend
//     credentials: true,
//   })
// );

// // API routes
// app.use("/user", userRoutes);

// // Default route
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "API is running" });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ error: "Route not found" });
// });

// // Error handler
// app.use((err, req, res, next) => {
//   console.error("Server error:", err);
//   res.status(500).json({ error: "Something went wrong!" });
// });

// // Start server
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );

require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import routes
const userRoutes = require("./routes/user");
const { dbConnect } = require("./config/dbConnection");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to DB
dbConnect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Update to your actual frontend origin
    credentials: true, // ✅ Allow cookies to be sent with requests
  })
);

// API routes
app.use("/api/auth", userRoutes); // 🔁 Use cleaner path

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
