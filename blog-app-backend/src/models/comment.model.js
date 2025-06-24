import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentText: {
      type: String,
      required: [true, "Comment text is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
