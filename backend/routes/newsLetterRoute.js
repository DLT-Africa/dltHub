const express = require("express");

const { getNewsLetters, subscribe, getSubscription, deleteNewsLetter } = require("../controllers/newsLetterController");

const router = express.Router();






router.post("/subscribe", subscribe);

router.get("/getNewsLetters", getNewsLetters);

router.get("/getSubscription/:id", getSubscription);



router.delete('/:subId', deleteNewsLetter);


module.exports = router;