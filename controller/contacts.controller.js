const Contact = require("../models/contacts.models.js");
const mongoose = require("mongoose");

const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const totalContacts = await Contact.countDocuments();
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalContacts / limit);

    res.render("home", {
      contacts: contacts,
      totalDocs: totalContacts,
      limit: limit,
      totalPages: totalPages,
      currentPage: page,
      counter: skip + 1,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
    });
  } catch (error) {
    res.render("home", {
      contacts: [],
      totalDocs: 0,
      limit: limit,
      totalPages: 0,
      currentPage: 1,
      counter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    });
  }
};

const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.render("show-contact", { contact });
  } catch (error) {
    res.redirect("/");
  }
};

const addContactPage = (req, res) => {
  res.render("add-contact");
};

// In your addContact controller
const addContact = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Convert errors to field-specific format
      const fieldErrors = {};
      errors.array().forEach((error) => {
        fieldErrors[error.path] = error.msg;
      });

      return res.render("add-contact", {
        errors: errors.array(),
        fieldErrors: fieldErrors,
        formData: req.body,
        success: false,
      });
    }

    // Save contact logic here
    await Contact.create(req.body);

    res.render("add-contact", {
      success: true,
      formData: {},
      errors: null,
      fieldErrors: null,
    });
  } catch (error) {
    res.render("add-contact", {
      errors: [{ msg: "Error saving contact" }],
      formData: req.body,
      success: false,
      fieldErrors: null,
    });
  }
};

const updateContactPage = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.render("update-contact", { contact });
  } catch (error) {
    res.redirect("/");
  }
};

const updateContact = async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
};

const deleteContact = async (req, res) => {
  try {
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
