import express from "express";
import {
  createReply,
  getAllReplies,
  deleteReply,
} from "../controllers/reply.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/createReply/:commentId", protect, createReply);
router.get("/getAllReplies/:commentId", getAllReplies);
router.delete("/deleteReply/:replyId", protect, deleteReply);

export default router;
