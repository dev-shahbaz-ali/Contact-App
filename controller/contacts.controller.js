const Contact = require("../models/contacts.models.js");

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
      limit: 5,
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
  res.render("add-contact", {
    error: null,
    formData: null,
    success: null,
  });
};

const addContact = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, address } = req.body;

    // Simple validation
    if (!first_name || !last_name || !email || !phone) {
      return res.render("add-contact", {
        error: "All fields are required except address",
        formData: req.body,
        success: null,
      });
    }

    await Contact.create(req.body);
    res.redirect("/?success=true");
  } catch (error) {
    let errorMessage = "Failed to create contact";

    // Handle duplicate email error
    if (error.code === 11000) {
      errorMessage = "Email already exists";
    }

    res.render("add-contact", {
      error: errorMessage,
      formData: req.body,
      success: null,
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
