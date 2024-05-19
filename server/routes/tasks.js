import { Router } from "express";
import {
  getTasks,
  addTask,
  deleteTask,
  editTask,
  toggleTaskCompletion,
  getTaskById,
} from "../controllers/tasks.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.get("/:userID", verifyToken, getTasks);
router.get("/t/:taskID", verifyToken, getTaskById);

router.post("/:userID", verifyToken, addTask);

router.patch("/:taskId", verifyToken, editTask);
router.patch("/complete/:taskId/", verifyToken, toggleTaskCompletion);

router.delete("/:taskId", verifyToken, deleteTask);

export default router;
