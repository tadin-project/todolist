import express from "express";
import {
  addList,
  delList,
  editList,
  getList,
  getListById,
} from "../controllers/List.js";
import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.route("").get(protect, getList).post(protect, addList);
router
  .route("/:id")
  .get(protect, getListById)
  .put(protect, editList)
  .delete(protect, delList);

export default router;
