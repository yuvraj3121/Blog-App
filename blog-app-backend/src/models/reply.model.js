import mongoose, { Schema } from "mongoose";

const replySchema = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    replyText: {
      type: String,
      required: [true, "Reply text is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

export const Reply = mongoose.model("Reply", replySchema);
