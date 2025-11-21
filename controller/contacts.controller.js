const Contact = require("../models/contacts.models.js");
const mongoose = require("mongoose");

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.render("home", {
      contacts: contacts,
      totalDocs: contacts.length,
      limit: 10,
      totalPages: 1,
      currentPage: 1,
      counter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    });
  } catch (error) {
    res.render("home", {
      contacts: [],
      error: "Database connection failed",
    });
  }
};

const getContact = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.redirect("/");
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.redirect("/");
    }

    res.render("show-contact", { contact });
  } catch (error) {
    res.redirect("/");
  }
};

const addContactPage = (req, res) => {
  res.render("add-contact");
};

const addContact = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, address } = req.body;

    // Validation
    if (!first_name || !last_name || !email || !phone) {
      return res.render("add-contact", {
        error: "Please fill all required fields",
        formData: req.body,
      });
    }

    await Contact.create({
      first_name,
      last_name,
      email,
      phone,
      address,
    });

    res.redirect("/");
  } catch (error) {
    res.render("add-contact", {
      error: "Failed to create contact",
      formData: req.body,
    });
  }
};

const updateContactPage = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.redirect("/");
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.redirect("/");
    }

    res.render("update-contact", { contact });
  } catch (error) {
    res.redirect("/");
  }
};

const updateContact = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.redirect("/");
    }

    const { first_name, last_name, email, phone, address } = req.body;

    // Validation
    if (!first_name || !last_name || !email || !phone) {
      const contact = await Contact.findById(req.params.id);
      return res.render("update-contact", {
        contact,
        error: "Please fill all required fields",
      });
    }

    await Contact.findByIdAndUpdate(req.params.id, {
      first_name,
      last_name,
      email,
      phone,
      address,
    });

    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
};

const deleteContact = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.redirect("/");
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
};

module.exports = {
  getContacts,
  getContact,
  addContactPage,
  addContact,
  updateContactPage,
  updateContact,
  deleteContact,
};
