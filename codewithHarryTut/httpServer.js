
const http = require("http");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res)=>{
  console.log(req.url)
  res.statusCode = 200;
  res.setHeader('content-Type', 'text/html')
  res.end('<h1> This is owesome code </h1> <p> anything </p>');
})

server.listen(port, ()=> {
  console.log(`server is listening on port ${port}`);
})