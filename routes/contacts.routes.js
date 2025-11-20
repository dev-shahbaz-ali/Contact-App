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

// GET: All contacts (Home)
router.get("/", getContacts);

// GET: Single contact
router.get("/show-contact/:id", getContact);

// GET: Add contact form
router.get("/add-contact", addContactPage);

// POST: Add contact
router.post("/add-contact", addContact);

// GET: Update contact form
router.get("/update-contact/:id", updateContactPage);

// POST: Update contact
router.post("/update-contact/:id", updateContact);

// GET: Delete contact
router.get("/delete-contact/:id", deleteContact);

export default router;
