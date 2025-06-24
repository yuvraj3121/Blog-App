import { Comment } from "../models/comment.model.js";
import { Reply } from "../models/reply.model.js";

const createComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const newComment = await Comment.create({
      blogId,
      userId,
      commentText: content,
    });

    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create comment", error: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({ blogId })
      .populate("userId")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({ message: "Comments fetched", count: comments.length, comments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch comments", error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await Reply.deleteMany({ commentId });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};

export { createComment, getAllComments, deleteComment };
