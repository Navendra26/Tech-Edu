const express = require("express");
 const { registerUser, authUser, updateUserProfile } = require("../controller/userControllers");
const { protect } = require("../MiddleWares/authMiddleWare");
const router = express.Router();

// this route is an api end point so using only "/"
router.route("/").post(registerUser); // since we want to store data on database so we use post request
router.route("/login").post(authUser);
router.route('/profile').post(protect, updateUserProfile);

module.exports = router;  // expoted to server