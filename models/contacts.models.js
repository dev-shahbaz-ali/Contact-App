const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: false,
      trim: true,
    },
    last_name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

contactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
