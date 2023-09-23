
const express = require('express');
//const notes = require('./data/notes');  // we were required when we was using notes directly from our note file
const dotenv = require('dotenv'); 
 const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const contactRoutes = require("./routes/contactRoutes");
const { notFound, errorHandler } = require('./MiddleWares/errorMiddleware');
const path = require('path');

const app = express();
dotenv.config(); // .env file contains all of our secrets info related to our application, 
// for ex any password, api_key, sort of stuffs
//  to use this file we have to install package called dotenv.

connectDB(); // To connect mongoDB in our project(nodeJs / expressJs) we have to install -> npm i mongoose on root dir

/* req --> request parameter used when smthing request from client or user
   res --> response parameter used when server provide response to the client
 */
app.use(express.json()); // use every time when we have to accept data from the userside


app.get('/', (req,res)=> {   //get request get info from server(backend) and serve it to front end
  res.send("API is running...");
});

// API endpoint to check the admin secret
app.post('/api/checkAdminSecret', (req, res) => {
  const { adminSecret } = req.body;
  if (adminSecret === process.env.ADMIN_SECRET) {
    // Admin secret is valid
    res.status(200).json({ message: 'Admin secret is valid.' });
  } else {
    // Admin secret is invalid
    res.status(403).json({ message: 'Invalid admin secret.' });
  }
});
/* 
//fetch all from notes file
app.get('/api/notes', (req, res) => {
  res.json(notes);
} ); 
 */
/* 
// fetch only 1 notes that is = _id
app.get('/api/notes/:id', (req, res) => { //This will fetch the perticular id dynamically
  const note = notes.find((idx) => idx._id === req.params.id); //find()- iterates thru every id and find matched one
  res.send(note);
  // console.log(req.params); // in console --> id:value
}); */

app.use("/api/users", userRoutes);   //all of the files related to the users will go to userRoutes file created within routes folder
app.use("/api/notes",noteRoutes);
app.use("/api/contact",contactRoutes);

// -----------------------------Deployment -------------------------------------------
   
   /*   __dirname = path.resolve();
    if(process.env.NODE_ENV === 'production') {     // if project is not ready for deployment then its value should be 'developement' 
       app.use(express.static(path.join(__dirname, '/frontend/build')));       // use static folder called build from frontend

       app.get('*', (req, res) =>{    // this will check all routes other than our routes(noteRoutes and userRoutes)    ->and whenever we run our backend it going to serve our frontend to the localhost 5000 
        
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));   // send response from current folder(__dirname) to frontend then build and index.html of build folder
       })  
  }
   else{
    app.get('/', (req,res)=> {  
      res.send("API is running...");
    });
  }  */
// -----------------------------Deployment -------------------------------------------

app.use(notFound);  //using from errorMiddleWare file
app.use(errorHandler); 

const port = process.env.PORT || 5000;

app.listen(port , console.log(`Server started on PORT ${port}`));

// Concurrently --> We can start/run frontend and backend both on one command --> install concurrently on root directory

     // we stores user data in our database for that we need to install following dependencies--
//1 bcryptjs is for encrypt our passwords  //for userModel 
//2 express-async-handler is for handling errors
//3 jsonwebtoken (JWT) is used for create token for the users and it certifies the user identity, and sends it to the client.


//redux is state management in react js apps
// and create store for our applications

// redux - how we call backend api by using action of redux 