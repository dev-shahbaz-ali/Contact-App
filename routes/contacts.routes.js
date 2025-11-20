import express from "express";
import {
  addContact,
  addContactPage,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
  updateContactPage,
} from "../controller/contacts.controller.js";

const router = express.Router();

// Simple test route without database
router.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Your existing routes
router.get("/", getContacts);
router.get("/show-contact/:id", getContact);
router.get("/add-contact", addContactPage);
router.post("/add-contact", addContact);
router.get("/update-contact/:id", updateContactPage);
router.post("/update-contact/:id", updateContact);
router.get("/delete-contact/:id", deleteContact);

export default router;
