const express = require("express");
const { 
  registerProject, 
  getProject, 
  getProjects, 
  deleteProject 
} = require("../controllers/projectController");

const router = express.Router();

router.post("/regProject", registerProject);
router.get("/projects", getProjects);
router.get("/project/:id", getProject);
router.delete("/:projectId", deleteProject);

module.exports = router;
