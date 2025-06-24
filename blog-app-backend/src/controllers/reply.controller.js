import { Reply } from "../models/reply.model.js";

const createReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { replyText } = req.body;
    const userId = req.user._id;

    const newReply = await Reply.create({
      commentId,
      userId,
      replyText,
    });

    res.status(201).json({ message: "Reply added", reply: newReply });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create reply", error: error.message });
  }
};

const getAllReplies = async (req, res) => {
  try {
    const { commentId } = req.params;

    const replies = await Reply.find({ commentId })
      .populate("userId")
      .sort({ createdAt: 1 });

    res
      .status(200)
      .json({ message: "Replies fetched", count: replies.length, replies });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch replies", error: error.message });
  }
};

const deleteReply = async (req, res) => {
  try {
    const { replyId } = req.params;

    const deletedReply = await Reply.findByIdAndDelete(replyId);
    if (!deletedReply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting reply", error: error.message });
  }
};

export { createReply, getAllReplies, deleteReply };
