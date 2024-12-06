const express = require("express");
const router = express.Router();
const { addTask, deleteTask, getTasks } = require("../controllers/taskController")

// Routes
router.get("/tasks", getTasks)
router.post("/tasks", addTask)
router.delete("/tasks/:id", deleteTask)

module.exports = router