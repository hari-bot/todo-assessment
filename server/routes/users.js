import { Router } from "express";
import { registerUser, signInUser } from "../controllers/users.js";

const router = Router();

router.post("/register", registerUser);
router.post("/signin", signInUser);

export default router;
