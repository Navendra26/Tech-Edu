const asyncHandler = require("express-async-handler");
const Contact = require("../Models/contactModel");

const contactDetails = asyncHandler(async (req, res,) => {
  const {name, email, subject, message} = req.body;

  if(!name || !email || !subject || !message ) {
    res.status(400);
    throw new Error("Please Fill all the Fields");
  }
  else{
    const contact = new Contact({/* user:req.user._id, */ name, email, subject, message});

    const newContact = await contact.save();  // saving into our database
    
    res.status(201).json(newContact);
  }
  
});

module.exports = { contactDetails };  // exported to contactRouter