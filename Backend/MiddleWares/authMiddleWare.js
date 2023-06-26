// jsonwebtoken (JWT) is used for create token for the users and 
// it certifies the user identity, and sends it to the client.
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

/* what is going to happen here when user passess thru this middleware is that
  */
const protect = expressAsyncHandler(async (req, res, next) => { // we naming out jwt protect bcoz it protect our api from unautorized access
  let token; // declaring  new variable

  if(
    req.headers.authorization &&    // if authorization present
    req.headers.authorization.startsWith("Bearer") // and if this authorization has a token which start with "Bearer" (as you might know we are sending Bearer token from our frontend  )
   ){
    try { //verifying the token which was sent by the user, by below 2 lines of code
      token = req.headers.authorization.split(" ")[1]; // token contains Bearer and token string inside of it so we are removing Bearer part by splitting it (just taking only tokens)

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //vetify by using jwt_secret defined in .env file

       // find the user by id and leave the password (as we dont get the password from the DataBase),
       // From decoded.id is going to find the user and it going to put this user in req of this middleware ,
       //And next() will send him to the note api (which is in get request within noteRoutes file)
      req.user = await User.findById(decoded.id).select("password");
       console.log(token);
      next();
    } catch (error) { // if it is going to fail authorization , flag error
      res.status(401);
      throw new Error("Not authorized, token Failed");
    }
  }
  if (!token) {   // else if there is no token send by user
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = {protect}; // exported to noteRoutes

