const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token.toString()).digest("hex");
};

const sendEmail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const calculateTuitionFee = (courseSelected, classType) => {
  let tuitionFee = 0;

  if (classType === "Physical") {
    switch (courseSelected) {
      case "Frontend Development":
        tuitionFee = 0.5 * 420000;
        break;
      case "Product UI/UX Design":
        tuitionFee = 0.5 * 170000;
        break;
      case "Full-Stack Development":
        tuitionFee = 0.5 * 630000;
        break;
      default:
        tuitionFee = 0;
    }
  } else if (classType === "Online") {
    switch (courseSelected) {
      case "Frontend Development":
        tuitionFee = 0.5 * 370000;
        break;
      case "Product UI/UX Design":
        tuitionFee = 0.5 * 170000;
        break;
      case "Blockchain Development":
        tuitionFee = 0;
        break;
      default:
        tuitionFee = 0;
    }
  }
  return tuitionFee;
};
const calculateCorpersFee = (courseSelected) => {
  let tuitionFee = 0;

  switch (courseSelected) {
    case "Web Start Essential":
      tuitionFee = 70000;
      break;
    case "Product UI/UX Design":
      tuitionFee = 70000;
      break;
    case "Code Master Intermediate":
      tuitionFee = 150000;
      break;
    default:
      tuitionFee = 0;
  }

  return tuitionFee;
};

module.exports = {
  generateToken,
  hashToken,
  sendEmail,
  calculateTuitionFee,
  calculateCorpersFee,
};