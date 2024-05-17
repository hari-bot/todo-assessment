import { Task } from "../models/taskModel.js";

export const getTasks = async (req, res) => {
  try {
    const { userID } = req.params;
    const tasks = await Task.find({ userID: userID });
    return res.status(200).json({
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const taskID = req.params.taskID;

    console.log(taskID);
    const task = await Task.findById(taskID);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to get task", error: error.message });
  }
};

export const addTask = async (req, res) => {
  try {
    const { userID } = req.params;
    const { title, dueDate, description } = req.body;

    const newTask = new Task({
      title,
      description,
      dueDate,
      userID,
    });

    await newTask.save();

    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add task", error: error.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { title, dueDate, completed, description } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, dueDate, completed, description },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update task", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add task", error: error.message });
  }
};

export const toggleTaskCompletion = async (req, res) => {
  try {
    console.log("Hello From Patch");
    const taskId = req.params.taskId;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.completed = !task.completed;
    await task.save();
    res
      .status(200)
      .json({ message: "Task completion status toggled successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to toggle task completion status",
      error: error.message,
    });
  }
};
