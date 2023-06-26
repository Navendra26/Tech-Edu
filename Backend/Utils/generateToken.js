const jwt = require("jsonwebtoken");

// jsonwebtoken (JWT) is used for create token for the users and 
// it certifies the user identity, and sends it to the client.
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;  //exported in userController