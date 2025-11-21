const Contact = require("../models/contacts.models.js");
const mongoose = require("mongoose");

// Demo data as fallback
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

const getContacts = async (req, res) => {
  try {
    // Try database first
    if (mongoose.connection.readyState === 1) {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.render("home", {
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
        message: "📊 Live Database Data",
      });
    }

    // Fallback to demo data
    res.render("home", {
      contacts: demoContacts,
      totalDocs: demoContacts.length,
      limit: 10,
      totalPages: 1,
      currentPage: 1,
      counter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
      message: "📝 Demo Data (No Database)",
    });
  } catch (error) {
    res.render("home", {
      contacts: demoContacts,
      message: "📝 Demo Data (Error)",
    });
  }
};

const getContact = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const contact = await Contact.findById(req.params.id);
      if (contact) {
        return res.render("show-contact", { contact });
      }
    }

    // Fallback to demo data
    const contact = demoContacts.find((c) => c._id === req.params.id);
    if (contact) {
      return res.render("show-contact", { contact });
    }

    res.redirect("/");
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

    if (!first_name || !last_name || !email || !phone) {
      return res.render("add-contact", {
        error: "Please fill all required fields",
        formData: req.body,
      });
    }

    // Try to save to database
    if (mongoose.connection.readyState === 1) {
      await Contact.create({ first_name, last_name, email, phone, address });
      return res.redirect("/?message=Contact+saved+to+database");
    }

    // If no database, just show success
    res.redirect("/?message=Contact+added+(demo+mode)");
  } catch (error) {
    res.render("add-contact", {
      error: "Failed to create contact",
      formData: req.body,
    });
  }
};

const updateContactPage = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const contact = await Contact.findById(req.params.id);
      if (contact) {
        return res.render("update-contact", { contact });
      }
    }

    // Fallback to demo data
    const contact = demoContacts.find((c) => c._id === req.params.id);
    if (contact) {
      return res.render("update-contact", { contact });
    }

    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
};

const updateContact = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, address } = req.body;

    if (!first_name || !last_name || !email || !phone) {
      return res.redirect(
        "/update-contact/" + req.params.id + "?error=Please+fill+all+fields"
      );
    }

    // Try to update in database
    if (mongoose.connection.readyState === 1) {
      await Contact.findByIdAndUpdate(req.params.id, {
        first_name,
        last_name,
        email,
        phone,
        address,
      });
      return res.redirect("/?message=Contact+updated+in+database");
    }

    // If no database, just redirect
    res.redirect("/?message=Contact+updated+(demo+mode)");
  } catch (error) {
    res.redirect("/");
  }
};

const deleteContact = async (req, res) => {
  try {
    // Try to delete from database
    if (mongoose.connection.readyState === 1) {
      await Contact.findByIdAndDelete(req.params.id);
      return res.redirect("/?message=Contact+deleted+from+database");
    }

    // If no database, just redirect
    res.redirect("/?message=Contact+deleted+(demo+mode)");
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
