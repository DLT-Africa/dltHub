const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    tags: {
      type: String,
      required: true,
    },
    projectDoc: {
      type: [String], // Updated to array of strings
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    personalInfo: {
      fullName: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      calendly: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: String,
        required: true,
      },
      linkedIn: {
        type: String,
      },
      twitter: {
        type: String,
      },
    },
  },
  { timestamps: true, minimize: false }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;