import express from "express";
import {
  createComment,
  getAllComments,
  deleteComment,
} from "../controllers/comment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/createComment/:blogId", protect, createComment);
router.get("/getAllComments/:blogId", getAllComments);
router.delete("/deleteComment/:commentId", protect, deleteComment);

export default router;
