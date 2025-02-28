const express = require("express");


const { testify, deleteTestimony, getTestimonies, getTestimony } = require("../controllers/testimonialController");


const router = express.Router();






router.post("/testify", testify);

router.get("/getTestimonies", getTestimonies);

router.get("/getTestimony/:testyId", getTestimony);



router.delete('/:testyId', deleteTestimony);


module.exports = router;