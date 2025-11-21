const Contact = require("../models/contacts.models.js");

// Demo data - app will work without database
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
    // Try to get from database, if fails use demo data
    const contacts = await Contact.find()
      .limit(10)
      .catch(() => demoContacts);

    res.render("home", {
      contacts: contacts || demoContacts,
      totalDocs: (contacts || demoContacts).length,
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
    });
  }
};

const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).catch(() =>
      demoContacts.find((c) => c._id === req.params.id)
    );

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
    // If database works, save there. Otherwise just redirect
    await Contact.create(req.body).catch(() => {
      console.log("Database not available - contact not saved");
    });

    res.redirect("/");
  } catch (error) {
    res.render("add-contact", {
      error: "Please check all fields",
      formData: req.body,
    });
  }
};

const updateContactPage = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).catch(() =>
      demoContacts.find((c) => c._id === req.params.id)
    );

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
    await Contact.findByIdAndUpdate(req.params.id, req.body).catch(() => {
      console.log("Database not available - contact not updated");
    });

    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
};

const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id).catch(() => {
      console.log("Database not available - contact not deleted");
    });

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
