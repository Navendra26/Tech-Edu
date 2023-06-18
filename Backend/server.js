
const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');  // .env file contains all of our secrets info related to our application, 
                                   // for ex any password, api_key, sort of stuffs
                                  //  to use this file we have to install package called dotenv.

const app = express();

app.get('/', (req,res)=> {   //get request get info from server(backend) and serve it to front end
  res.send("API is running...");
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
} );

app.get('/api/notes/:id', (req, res) => { //This will fetch the perticular id dynamically
   const note = notes.find((idx) => idx._id === req.params.id); //find()- iterates thru every id and find matched one
   res.send(note);
  // console.log(req.params); // in console --> id:value
});

const port = process.env.PORT || 4000;

app.listen(port , console.log(`Server started on PORT ${port}`));

