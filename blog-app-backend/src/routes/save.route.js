import express from "express";
import {
  createSave,
  getAllSaved,
  removeSaved,
  isSaved,
} from "../controllers/save.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/createSave/:id", protect, createSave);
router.get("/getAllSaved", protect, getAllSaved);
router.delete("/removeSaved/:id", protect, removeSaved);
router.get("/isSaved/:id", protect, isSaved);

export default router;
