import express from "express";
import {
  createLike,
  getAllLikes,
  removeLike,
} from "../controllers/like.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/createLike/:id", protect, createLike);
router.get("/getAllLikes/:id", getAllLikes);
router.delete("/removeLike/:id", protect, removeLike);

export default router;
