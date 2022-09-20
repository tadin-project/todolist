import express from "express";
import { registerUser, getMe, loginUser } from "../controllers/MsUser.js";
import { protect } from "../middlewares/authMiddlewares.js";
const router = express.Router();

router.post("/", loginUser);
router.post("/register", registerUser);
router.get("/me", protect, getMe);

export default router;
