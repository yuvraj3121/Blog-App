import mongoose, { Schema } from "mongoose";

const AdSchema = new Schema(
  {
    adImage: {
      type: String,
    },
    position: {
      type: String,
      required: [true, "required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    totalClicks: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Ad = mongoose.model("Ad", AdSchema);
