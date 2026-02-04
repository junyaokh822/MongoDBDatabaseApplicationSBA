import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    age: {
      type: Number,
      min: [0, "Age cannot be negative"],
      max: [150, "Age seems unrealistic"],
    },
  },
  {
    timestamps: true,
  },
);

// 1. Email index
userSchema.index({ email: 1 });

// 2. CreatedAt index for sorting (GET /api/users sorts by createdAt)
userSchema.index({ createdAt: -1 });

export default mongoose.model("User", userSchema);
