const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice"); // adjust the path as per your structure
const { restrictToLoggedinUserOnly } = require("../middlewares/authentication"); // assuming you use JWT

// GET all invoices of a user
router.get("/getInvoices", restrictToLoggedinUserOnly, async (req, res) => {
  try {
    const userId = req.user.id; // populated by verifyToken middleware

    const invoices = await Invoice.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, data: invoices });
  } catch (err) {
    console.error("Error fetching invoices:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
