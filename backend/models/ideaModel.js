const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    why: {
      type: String,
      required: true,
    },
  
  },
  { timestamps: true, minimize: false }
);

const Idea = mongoose.model("Idea", ideaSchema);
module.exports = Idea;
