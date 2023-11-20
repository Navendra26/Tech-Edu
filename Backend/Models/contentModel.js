const mongoose = require('mongoose');
   
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
       author:{
         type: String,
         required: true,
       },
       elements:{
         type: mongoose.Schema.Types.Mixed,
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