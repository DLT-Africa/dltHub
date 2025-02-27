const express = require("express");
const { suggestIdea, getIdea, getIdeas, deleteIdea } = require("../controllers/ideaController");
const router = express.Router();






router.post("/suggestIdea", suggestIdea);

router.get("/getIdeas", getIdeas);

router.get("/getIdea/:id", getIdea);



router.delete('/:ideaId', deleteIdea);


module.exports = router;