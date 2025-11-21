const Contact = require("../models/contacts.models.js");
const mongoose = require("mongoose");

const getContacts = async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      // Show demo data if no database
      const demoContacts = [
        {
          _id: "1",
          first_name: "John",
          last_name: "Doe",
          email: "john@example.com",
          phone: "123-456-7890",
          address: "New York",
        },
        {
          _id: "2",
          first_name: "Jane",
          last_name: "Smith",
          email: "jane@example.com",
          phone: "098-765-4321",
          address: "London",
        },
      ];

      return res.render("home", {
        contacts: demoContacts,
        totalDocs: 2,
        limit: 10,
        totalPages: 1,
        currentPage: 1,
        counter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      });
    }

    // If database connected, get real data
    const contacts = await Contact.find().limit(10);
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
    // Fallback to demo data
    const demoContacts = [
      {
        _id: "1",
        first_name: "Demo",
        last_name: "User",
        email: "demo@example.com",
        phone: "000-000-0000",
        address: "Demo Address",
      },
    ];

    res.render("home", {
      contacts: demoContacts,
      totalDocs: 1,
      limit: 10,
      totalPages: 1,
      currentPage: 1,
      counter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    });
  }
};

// Other controller functions same as before...
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
