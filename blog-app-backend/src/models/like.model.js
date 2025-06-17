import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema);
