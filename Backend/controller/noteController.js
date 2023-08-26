const asyncHandler = require("express-async-handler");
const Content = require("../Models/noteModel");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Content.find(/* {user: req.user._id} */);  // we have to access notes for particular user. For this we need to provide userId as parameter in find() query of mongoDB from middleware
  //  ( as we dont want to do by user manually) so we have to create middleware to achieve that
  res.json(notes);  
});

const get10SortedNotes = asyncHandler(async (req, res) => {
   await Content.find() 
  .sort({createdAt:-1}) //sort by createdAt field in descending order
  .limit(10) // limit the result to 10 entries
  .then(note => res.json(note))
  .catch(error => res.status(404).json({noteNotfound : 'No content found'}));
});

const createNote = asyncHandler(async (req, res,) => {
   const {title, category, author, elements, createdBy} = req.body;

   if(!title || elements.length ===0 || !category || !author ) {
     res.status(400);
     throw new Error("Please Fill all required Fields");
   }
   else{
     const note = new Content({user:req.user._id, title, category, author, elements, createdBy});

     const createdContent = await note.save();  // saving into our database
     
     res.status(201).json(createdContent);
   }
   
});

const getNoteById = asyncHandler(async (req, res ) => {
  const note = await Content.findById(req.params.id);
  
  if(note) {
    res.json(note);
  }
  else {
    res.status(404).json({ message: "Content not Found"});
  }

});

const UpdateNote = asyncHandler(async (req, res) => {
  const {title, category, author, elements} = req.body;   // destructuring object from body

  const note = await Content.findById(req.params.id); //find the perticular id of note that has to be update

  if(note.user.toString() !== req.user._id.toString()){    // checking if the currently logged in user is same who wants to do updation
     res.status(401);
     throw new Error("You cannot update this content because you haven't created this one");
  }

  if(note) {  // checking that  if this  id of note is present or not  /that's why we didnt use if else or else stmt
    note.title = title;
    note.category = category;
    note.author = author;
    note.elements = elements;

    const updatedNote = await note.save(); // save back to DB
    res.json(updatedNote);
  }
  else{
    res.status(404);
    throw new Error("Content not found");
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const  note = await Content.findById(req.params.id);
 
  if(note.user.toString() !== req.user._id.toString()) {  // checking is the same user who currently logged in
    res.status(401);
    throw new Error("You can't remove it because you haven't created this one");
  }

  if(note) {     // if note is present in database  then remove it (remove() function is deprecated)
    await note.deleteOne();
    res.json({message: "Content Removed"});
  }
  else{
    res.status(404);
    throw new Error("Content not found");
  }

})

module.exports = { getNotes, createNote, getNoteById, UpdateNote, deleteNote, get10SortedNotes };  // exported to noteRouter

