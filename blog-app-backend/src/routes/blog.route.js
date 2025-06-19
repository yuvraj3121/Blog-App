import express from "express";
import {
  createBlog,
  editBlog,
  getAllBlogs,
  getUserBlogs,
  getBlogById,
  deleteBlog,
  updateBlogStatus,
} from "../controllers/blog.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/createBlog",
  upload.fields([{ name: "blogImage", maxCount: 1 }]),
  protect,
  createBlog
);
router.post(
  "/editBlog/:id",
  upload.fields([{ name: "blogImage", maxCount: 1 }]),
  editBlog
);
router.get("/getAllBlogs", getAllBlogs);
router.get("/getUserBlogs", protect, getUserBlogs);
router.get("/getBlogById/:id", getBlogById);
router.delete("/deleteBlog/:id", protect, deleteBlog);
router.patch("/updateStatus/:id", updateBlogStatus);

export default router;
