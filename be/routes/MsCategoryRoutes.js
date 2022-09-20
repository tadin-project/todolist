import express from "express";
import {
  addCategory,
  delCategory,
  editCategory,
  getCategories,
  getCategoryById,
} from "../controllers/MsCategory.js";
import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.route("").get(protect, getCategories).post(protect, addCategory);
router
  .route("/:id")
  .get(protect, getCategoryById)
  .put(protect, editCategory)
  .delete(protect, delCategory);

export default router;
