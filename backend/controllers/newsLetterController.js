const { sendEmail } = require("../utils/index");

const NewsLetter = require("../models/newsLetterModel");


exports.subscribe = async (req, res) => {
  try {
    const {  emailAddress} = req.body;

    const newNewsLetter = new NewsLetter({ emailAddress});
    await newNewsLetter.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailAddress,
      subject: "Subscription Successful",
      text: `Hello!,\n\nThank you for subscribing to DLT Hub news letter.\n\nBest regards,\nDLT Africa Team`,
    };

    const notifyOptions = {
      from: process.env.EMAIL_USER,
      to: "info@dltafrica.io",
      subject: "News Letter Subscription",
      text: `A new subsription to our news letter:\n\nEmail: ${emailAddress}\nIdea:\n\nLFG🎉🚀💪.`,
    };

    await Promise.all([
      sendEmail(mailOptions).catch((error) =>
        console.error("Error sending newsletter confirmation email:", error)
      ),
      sendEmail(notifyOptions).catch((error) =>
        console.error("Error sending newsletter notification email:", error)
      ),
    ]);

    res.status(201).json({
      success: true,
      message: "subscription submission successful",
      data: newNewsLetter,
    });
  } catch (error) {
    console.error("subscription submission error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


exports.getSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const newsLetter = await NewsLetter.findById(id);

    if (!newsLetter) {
      return res.status(404).json({
        success: false,
        message: "subscription not found",
      });
    }

    res.status(200).json({ success: true, data: newsLetter });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getNewsLetters = async (req, res) => {
  try {
    const newsLetters = await NewsLetter.find();
    res.status(200).json({ success: true, data: newsLetters });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.deleteNewsLetter = async (req, res) => {
  try {
    const  {subId}  = req.params;
 
    const sub = await NewsLetter.findById(subId);
  

 

    if (!sub) {
      return res.status(404).json({
        success: false,
        message: "Subsription not found",
      });
    }

    await sub.deleteOne();
    res.status(200).json({ success: true, message: "subscription deleted successfully" });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};