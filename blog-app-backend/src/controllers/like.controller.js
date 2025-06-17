import { Like } from "../models/like.model.js";

const createLike = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;

    const newLike = await Like.create({
      userId,
      blogId,
    });

    res.status(201).json({ message: "Blog liked successfully", like: newLike });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error liking blog", error: error.message });
  }
};

const getAllLikes = async (req, res) => {
  try {
    const blogId = req.params.id;

    const likes = await Like.find({ blogId })
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "likes fetched successfully",
      count: likes.length,
      likes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching likes", error: error.message });
  }
};

const removeLike = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;

    const deletedLike = await Like.findOneAndDelete({ blogId, userId });
    if (!deletedLike) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.status(200).json({ message: "Like removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing like", error: error.message });
  }
};

export { createLike, getAllLikes, removeLike };
