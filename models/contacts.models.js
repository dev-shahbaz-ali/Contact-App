const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    address: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
