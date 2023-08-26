/* 1 First of all select create new project and build a cluster on mongoDB and choose plan(free)
 2 set database access by creating userName & password and click on add user then 
 3 network access by setting ip address to allow access from anywhere (0.0.0.0/0)
 4 install mongoose on your project to use mongoDB
 5 then connect our cluster that we have made
 6 create as new variable in .env file and its value will be link of mongo uri 
 7 then use it in db(any).js file,  just like using below⤵️   */


const mongoose = require('mongoose');


const connectDB = async ()=> {
  try{
     const  conn = await mongoose.connect(process.env.MONGO_URI, {
       useUnifiedtopology:true,
       useNewUrlParser: true,
      //  useCreateIndex: true,
     });

     console.log(`MongoDB Connected: ${conn.connection.host}`);
  }catch(error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;

