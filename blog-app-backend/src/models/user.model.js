import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "required"],
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "required"],
      trim: true,
      index: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "required"],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "required"],
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
