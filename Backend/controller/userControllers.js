const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../Utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin, pic } = req.body;

// To check whether the user is already exists in our database
const userExists = await User.findOne({email}); //findOne() is one of the queries of mongoDB/mongoose

if(userExists) {
  res.status(400);
  throw new Error("User already exists");
}

// else add/create a new user in our database by create() function
const user = await User.create({ 
   name,
   email,
   password,
   isAdmin,
   pic,
});

   if(user){
     res.status(201).json({
       _id: user._id,
       name:user.name,
       email:user.email,
       isAdmin:user.isAdmin,
       pic:user.pic,
       token: generateToken(user._id),
     });
   } else {
       res.status(400);
       throw new Error("Error Occured!");
   }
  
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email});

  if(user && (await user.matchPassword(password))){
    res.json({
      _id: user._id,
       name:user.name,
       email:user.email,
       isAdmin:user.isAdmin,
       pic:user.pic,
       token: generateToken(user._id),
    });
  } else{
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {   // if user exists then he is going to perform some action
    user.name = req.body.name || user.name;     // if user donot update any change then it take same name as ealier was
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;

    if(req.body.password) {  // password will update only when the body is contain of password ,as we dont want to expose our password to the user or any harmful people
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    // once userInfo is updated and saved it we gonna send it to the frontend
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  }
  else {  // if user doesn't exists
    res.status(404);
    throw new Error("User not Found");
  }
});

module.exports = {registerUser, authUser, updateUserProfile};  // exported to userRouter