const { sendEmail } = require("../utils/index");
const Project = require("../models/projectModel");

exports.registerProject = async (req, res) => {
  try {
    const { tags, projectDoc, description, personalInfo } = req.body;
    
    const newProject = new Project({
      tags,
      projectDoc: Array.isArray(projectDoc) ? projectDoc : [projectDoc],
      description,
      personalInfo,
    });
    await newProject.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: personalInfo.email,
      subject: "Project Successfully Received",
      text: `Hello ${personalInfo.fullName},\n\nThank you for submitting your project! Our team will review it and get back to you as soon as possible.\n\nBest regards,\nDLT Africa Team`,
    };

    const notifyOptions = {
      from: process.env.EMAIL_USER,
      to: "info@dltafrica.io",
      subject: "New Project Submission",
      text: `A new project has been submitted:\n\nName: ${personalInfo.fullName}\nEmail: ${personalInfo.email}\nDescription: ${description}\nTags: ${Array.isArray(tags) ? tags.join(", ") : tags}\n\nPlease review the project in the system.`,
    };

    await Promise.all([
      sendEmail(mailOptions).catch((error) =>
        console.error("Error sending project confirmation email:", error)
      ),
      sendEmail(notifyOptions).catch((error) =>
        console.error("Error sending project notification email:", error)
      ),
    ]);

    res.status(201).json({
      success: true,
      message: "Project submission successful",
      data: newProject,
    });
  } catch (error) {
    console.error("Project submission error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


exports.getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    await project.deleteOne();
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
