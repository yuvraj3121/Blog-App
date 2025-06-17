import mongoose, { Schema } from "mongoose";

const saveSchema = new Schema(
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

export const Save = mongoose.model("Save", saveSchema);
