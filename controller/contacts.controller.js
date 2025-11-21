const Contact = require("../models/contacts.models.js");
const mongoose = require("mongoose");

const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.render("home", {
        contacts: [],
        error: "Database not connected",
        totalDocs: 0,
        totalPages: 0,
        currentPage: 1,
      });
    }

    const result = await Contact.paginate({}, options);

    res.render("home", {
      totalDocs: result.totalDocs,
      limit: result.limit,
      totalPages: result.totalPages,
      currentPage: result.page,
      counter: result.pagingCounter,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      contacts: result.docs,
    });
  } catch (error) {
    console.error("Error in getContacts:", error);

    // Fallback: Render with empty data
    res.render("home", {
      contacts: [],
      error: "Failed to load contacts",
      totalDocs: 0,
      totalPages: 0,
      currentPage: 1,
    });
  }
};

const getContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).render("error", {
      message: "Invalid ID format",
    });
  }

  try {
    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).render("error", {
        message: "Database not available",
      });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).render("error", {
        message: "Contact not found",
      });
    }

    res.render("show-contact", { contact });
  } catch (error) {
    console.error("Error in getContact:", error);
    res.status(500).render("error", {
      message: "Error loading contact",
    });
  }
};

const addContactPage = (req, res) => {
  try {
    res.render("add-contact");
  } catch (error) {
    console.error("Error in addContactPage:", error);
    res.status(500).render("error", {
      message: "Error loading form",
    });
  }
};

const addContact = async (req, res) => {
  try {
    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).render("error", {
        message: "Database not available",
      });
    }

    await Contact.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.error("Error in addContact:", error);

    // Render form again with error
    res.render("add-contact", {
      error: "Failed to create contact",
      formData: req.body,
    });
  }
};

const updateContactPage = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).render("error", {
      message: "Invalid ID format",
    });
  }

  try {
    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).render("error", {
        message: "Database not available",
      });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).render("error", {
        message: "Contact not found",
      });
    }

    res.render("update-contact", { contact });
  } catch (error) {
    console.error("Error in updateContactPage:", error);
    res.status(500).render("error", {
      message: "Error loading contact",
    });
  }
};

const updateContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).render("error", {
      message: "Invalid ID format",
    });
  }

  try {
    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).render("error", {
        message: "Database not available",
      });
    }

    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!contact) {
      return res.status(404).render("error", {
        message: "Contact not found",
      });
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error in updateContact:", error);

    // Try to get contact and render form with error
    try {
      const contact = await Contact.findById(req.params.id);
      res.render("update-contact", {
        contact,
        error: "Failed to update contact",
      });
    } catch {
      res.status(500).render("error", {
        message: "Error updating contact",
      });
    }
  }
};

const deleteContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ error: "Database not available" });
    }

    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error in deleteContact:", error);

    // JSON response for AJAX requests, redirect for form submissions
    if (req.accepts("json")) {
      res.status(500).json({ error: error.message });
    } else {
      res.redirect("/");
    }
  }
};

// Export all functions
module.exports = {
  getContacts,
  getContact,
  addContactPage,
  addContact,
  updateContactPage,
  updateContact,
  deleteContact,
};
