import Contact from "../models/contacts.models.js";
import mongoose from "mongoose";

export const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

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
    res.render("500", { message: error.message });
  }
};

export const getContact = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.render("404", { message: "Invalid Id" });
  }

  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.render("404", { message: "Contact Not Found" });
    }

    res.render("show-contact", { contact });
  } catch (error) {
    res.render("500", { message: error.message });
  }
};

export const addContactPage = (req, res) => {
  res.render("add-contact");
};

export const addContact = async (req, res) => {
  try {
    await Contact.create(req.body);
    res.redirect("/");
  } catch (error) {
    res.render("500", { message: error.message });
  }
};

export const updateContactPage = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.render("404", { message: "Invalid Id" });
  }

  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.render("404", { message: "Contact Not Found" });
    }

    res.render("update-contact", { contact });
  } catch (error) {
    res.render("500", { message: error.message });
  }
};

export const updateContact = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.render("404", { message: "Invalid Id" });
  }

  try {
    const contact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // important!
    });

    if (!contact) {
      return res.render("404", { message: "Contact Not Found" });
    }

    res.redirect("/");
  } catch (error) {
    res.render("500", { message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.render("404", { message: "Invalid Id" });
  }

  try {
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.render("404", { message: "Contact Not Found" });
    }

    res.redirect("/");
  } catch (error) {
    res.render("500", { message: error.message });
  }
};
