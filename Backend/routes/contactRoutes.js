const express = require("express");
 const { contactDetails } = require("../controller/contactController");
const router = express.Router();

// this route is an api end point so using only "/"
router.route("/").post(contactDetails); // since we want to store data on database so we use post request

module.exports = router;  // expoted to server