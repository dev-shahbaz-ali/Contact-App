const express = require("express");
const router = express.Router();
const {
  addContact,
  addContactPage,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
  updateContactPage,
} = require("../controllers/contacts.controller.js"); // Changed to "controllers"

router.get("/", getContacts);
router.get("/show-contact/:id", getContact);
router.get("/add-contact", addContactPage);
router.post("/add-contact", addContact);
router.get("/update-contact/:id", updateContactPage);
router.post("/update-contact/:id", updateContact);
router.get("/delete-contact/:id", deleteContact);

module.exports = router;
