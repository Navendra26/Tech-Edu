const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
   subject: {
      type: String,
      required: true,
    },
    message:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,  // it is for knowing that when it was added of updated
  }
);
  
const Contact = mongoose.model("Contected User", contactSchema);

module.exports = Contact;  // exported to userController
