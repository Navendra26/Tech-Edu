/* model defines that what types of data in notes is going to have
   { like note is going to have title, content, catagory, user} 
   this note data is going to store here
   */
   const mongoose = require('mongoose');
   const bcrypt = require('bcryptjs');
   
   const contentSchema = mongoose.Schema(
     {
       title: {
         type: String,
         required: true,
       },
       category: {
         type: String,
         required: true,
       },
       content: {
         type: String,
         required: true,
       },
       author:{
         type: String,
         required: true,
       },
       pictures: {
        type: Array,
       },
       videoCaption:{
         type:Array,
       },
       ytVideos :{
        type: Array,
       },
       createdBy:{
         type: String,
       },
       user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
       },
     },
     {
       timestamps: true,  // it is for knowing that when it was added of updated
     }
   );
   
   const Content = mongoose.model("Note", contentSchema);
   
   module.exports = Content;  // exported to noteController