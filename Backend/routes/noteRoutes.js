const express = require("express");
const { getNotes, createNote, getNoteById, UpdateNote, deleteNote, get10SortedNotes} = require("../controller/noteController");
const { protect } = require("../MiddleWares/authMiddleWare");

const router = express.Router();

// this route is an api end point so using only "/"
/* When user logs-in, user has to pass throgh this middleware(protect in our case) to reach this api  */
router.route("/").get(/* protect, */ getNotes); // since we want to fetch data from database so we use get request
router.route('/sorted10contents').get(get10SortedNotes);
router.route("/create").post(protect, createNote);  //since we want to create and post to DB
router.route("/:id").get(getNoteById).put(protect, UpdateNote).delete(protect, deleteNote);


module.exports = router;  // exported to server

//before creating routes we need to create model for notes