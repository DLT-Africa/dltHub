const mongoose = require("mongoose");

const newsLetterSchema = new mongoose.Schema(
  {
 
    emailAddress: {
      type: String,
      required: true,
    },
  
  
  },
  { timestamps: true, minimize: false }
);

const NewsLetter = mongoose.model("NewsLetter", newsLetterSchema);
module.exports = NewsLetter;
