const { sendEmail } = require("../utils/index");


const Testimonial = require("../models/tetimonialModel");



exports.testify = async (req, res) => {
  try {
    const {  name, testimony} = req.body;

    const newTestimony = new Testimonial({ name, testimony });
    await newTestimony.save();

    res.status(201).json({
      success: true,
      message: "Testimony recieved Succesfully",
      data: newTestimony,
    });
  } catch (error) {
    console.error("Testimony error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


exports.getTestimony = async (req, res) => {
  try {
    const { testyId } = req.params;
    const testimony = await Testimonial.findById(testyId);

    if (!testimony) {
      return res.status(404).json({
        success: false,
        message: "testimony not found",
      });
    }

    res.status(200).json({ success: true, data: testimony });
  } catch (error) {
    console.error("Error fetching testimony:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getTestimonies = async (req, res) => {
  try {
    const testimonies = await Testimonial.find();
    res.status(200).json({ success: true, data: testimonies });
  } catch (error) {
    console.error("Error fetching testimonies:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.deleteTestimony = async (req, res) => {
  try {
    const  {testyId}  = req.params;
 
    const testimony = await Testimonial.findById(testyId);
  

 

    if (!testimony) {
      return res.status(404).json({
        success: false,
        message: "testimony not found",
      });
    }

    await sub.deleteOne();
    res.status(200).json({ success: true, message: "testimony deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimony:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};