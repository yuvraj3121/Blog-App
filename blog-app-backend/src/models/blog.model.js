import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "required"],
    },
    blogImage: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "required"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
