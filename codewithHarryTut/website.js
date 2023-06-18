
const http = require("http");
const fs = require('fs');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res)=>{
 
  res.setHeader('content-Type', 'text/html')
  console.log(req.url)

   if(req.url == '/'){
    res.statusCode = 200;
   const data = fs.readFileSync('index.html');
   res.end(data.toString());
  }

  else if(req.url == '/home' ){
    res.statusCode = 200;
    res.end('<h1> Home Page </h1> <p> Hey! this is our main page of site </p>');
  }
  else if(req.url == '/about'){
    res.statusCode = 200;
    res.end('<h2> about page </h2> <p> hello this is about page of our website </p>')
  }
 
   else{
    //  res.harry();   //this will crash app bcoz harry is not defined
    res.statusCode == 404;
    res.end('<h1> Not Found </h1> <p> hey this is not found in server</p>')
  } 
})

server.listen(port, ()=> {
  console.log(`server is listening on port ${port}`);
})