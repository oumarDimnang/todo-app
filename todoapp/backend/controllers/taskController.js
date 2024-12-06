const Task = require("../models/taskModel");

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error })
    }
}

// Add a new task
const addTask = async (req, res) => {
    try {
        const newTask = new Task({ task: req.body.task })
        await newTask.save();
        res.status(201).json(newTask)
    } catch (error) {
        res.status(400).json({ message: "Error adding task", error })
    }
}

// Delete a task by ._id
const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Task deleted successfully" })
    } catch (error) {
        res.status(404).json({ message: "Task not found" , error})
    }
}

module.exports = {
    getTasks,
    addTask,
    deleteTask
}