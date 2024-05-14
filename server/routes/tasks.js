import { Router } from "express";
import {
  getTasks,
  addTask,
  deleteTask,
  editTask,
  toggleTaskCompletion,
  getTaskById,
} from "../controllers/tasks.js";

const router = Router();

router.get("/:userID", getTasks);
router.get("/t/:taskID", getTaskById);

router.post("/:userID", addTask);

router.patch("/:taskId", editTask);
router.patch("/complete/:taskId/", toggleTaskCompletion);

router.delete("/:taskId", deleteTask);

export default router;
