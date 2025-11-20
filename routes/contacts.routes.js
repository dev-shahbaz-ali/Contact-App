import express from "express";
const router = express.Router();

// Temporary simple routes
router.get("/", (req, res) => {
  res.json({ message: "Contacts route working!" });
});

router.get("/test", (req, res) => {
  res.json({ message: "Test route working!" });
});

export default router;
