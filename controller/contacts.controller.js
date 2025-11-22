const Contact = require("../models/contacts.models.js");
const mongoose = require("mongoose");

const getContacts = async (req, res) => {
  try {
    const demoContacts = [
      // Yahan aapke 10 demo contacts
    ];

    const page = parseInt(req.query.page) || 1;
    const limit = 3; // 3 contacts per page
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedContacts = demoContacts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(demoContacts.length / limit);

    res.render("home", {
      contacts: paginatedContacts,
      totalDocs: demoContacts.length,
      limit: limit,
      totalPages: totalPages, // ✅ Real total pages (e.g., 4 pages for 10 contacts)
      currentPage: page,
      counter: startIndex + 1,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
    });
  } catch (error) {
    res.render("home", {
      contacts: [],
      totalDocs: 0,
      totalPages: 0, // ✅ 0 pages when no contacts
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

const addContact = async (req, res) => {
  try {
    await Contact.create(req.body);
    res.redirect("/");
  } catch (error) {
    res.render("add-contact", { error: "Failed to create contact" });
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
