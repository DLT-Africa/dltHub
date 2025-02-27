const { sendEmail } = require("../utils/index");
const Idea = require("../models/ideaModel");

exports.suggestIdea = async (req, res) => {
  try {
    const { fullName, emailAddress, why } = req.body;

    const newIdea = new Idea({ fullName, emailAddress, why });
    await newIdea.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailAddress,
      subject: "Idea Successfully Received",
      text: `Hello ${fullName},\n\nThank you for your suggestion! Our team will review it and get back to you as soon as possible.\n\nBest regards,\nDLT Africa Team`,
    };

    const notifyOptions = {
      from: process.env.EMAIL_USER,
      to: "info@dltafrica.io",
      subject: "New Idea Submission",
      text: `A new idea has been submitted:\n\nName: ${fullName}\nEmail: ${emailAddress}\nIdea: ${why}\n\nPlease review the suggestion in the system.`,
    };

    await Promise.all([
      sendEmail(mailOptions).catch((error) =>
        console.error("Error sending idea confirmation email:", error)
      ),
      sendEmail(notifyOptions).catch((error) =>
        console.error("Error sending idea notification email:", error)
      ),
    ]);

    res.status(201).json({
      success: true,
      message: "Idea submission successful",
      data: newIdea,
    });
  } catch (error) {
    console.error("Idea submission error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


exports.getIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const idea = await Idea.findById(id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    res.status(200).json({ success: true, data: idea });
  } catch (error) {
    console.error("Error fetching idea:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.status(200).json({ success: true, data: ideas });
  } catch (error) {
    console.error("Error fetching ideas:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.deleteIdea = async (req, res) => {
  try {
    const  {ideaId}  = req.params;
    console.log(ideaId)
    const idea = await Idea.findById(ideaId);
  

    console.log(idea)

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    await idea.deleteOne();
    res.status(200).json({ success: true, message: "Idea deleted successfully" });
  } catch (error) {
    console.error("Error deleting idea:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};