const asyncHandler = require("express-async-handler");
const Note = require("../Models/noteModel");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({user: req.user._id});  // we have to access notes for particular user. For this we need to provide userId as parameter in find() query of mongoDB from middleware
  //  ( as we dont want to do by user manually) so we have to create middleware to achieve that
  res.json(notes);
});

const createNote = asyncHandler(async (req, res,) => {
   const {title, content, category} = req.body;

   if(!title || !content || !category ) {
     res.status(400);
     throw new Error("Please Fill all the Fields");
   }
   else{
     const note = new Note({user:req.user._id, title, content, category});

     const createdNote = await note.save();  // saving into our database
     
     res.status(201).json(createdNote);
   }
   
});

const getNoteById = asyncHandler(async (req, res ) => {
  const note = await Note.findById(req.params.id);
  
  if(note) {
    res.json(note);
  }
  else {
    res.status(404).json({ message: "Note not Found"});
  }

});

const UpdateNote = asyncHandler(async (req, res) => {
  const {title, content, category} = req.body;   // destructuring object from body

  const note = await Note.findById(req.params.id); //find the perticular id of note that has to be update

  if(note.user.toString() !== req.user._id.toString()){    // checking if the currently logged in user is same who wants to do updation
     res.status(401);
     throw new Error("You cannot perform this action");
  }

  if(note) {  // checking that  if this  id of note is present or not  /that's why we didnt use if else or else stmt
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save(); // save back to DB
    res.json(updatedNote);
  }
  else{
    res.status(404);
    throw new Error("Note not found");
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const  note = await Note.findById(req.params.id);
 
  if(note.user.toString() !== req.user._id.toString()) {  // checking is the same user who currently logged in
    res.status(401);
    throw new Error("You cant perform this action");
  }

  if(note) {     // if note is present in database  then remove it (remove() function is deprecated)
    await note.deleteOne();
    res.json({message: "Note Removed"});
  }
  else{
    res.status(404);
    throw new Error("Note not found");
  }

})

module.exports = { getNotes, createNote, getNoteById, UpdateNote, deleteNote };  // exported to noteRouter

