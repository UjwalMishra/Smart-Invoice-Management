// routes/emailRoutes.js
const express = require("express");
const { initializeEmailProcessing } = require("../controllers/emailProcessor");
const { restrictToLoggedinUserOnly } = require("../middlewares/authentication");
const router = express.Router();

const activeProcessors = new Map();

router.post("/start", restrictToLoggedinUserOnly, async (req, res) => {
  try {
    if (!req.user) return res.status(401).send("Unauthorized");

    if (activeProcessors.has(req.user._id)) {
      return res.status(400).send("Processing already active");
    }

    const processor = await initializeEmailProcessing(req.user._id);
    activeProcessors.set(req.user._id, processor);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error starting processing");
  }
});

router.post("/stop", (req, res) => {
  if (!req.user) return res.status(401).send("Unauthorized");

  const processor = activeProcessors.get(req.user._id);
  if (processor) {
    processor.stop();
    activeProcessors.delete(req.user._id);
  }

  res.json({ success: true });
});

module.exports = router;
