import express from "express";
import {
  signUpUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signUp", signUpUser);
router.post("/login", loginUser);
router.get("/profile", protect, (req, res) => {
  res.json({ user: req.user });
});
router.get("/userProfile/:id", getUserProfile);
router.get("/allUsers", getAllUsers);
router.patch("/updateProfile", protect, updateUserProfile);

export default router;
