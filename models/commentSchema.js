import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// postId index (GET /api/comments/post/:postId)
commentSchema.index({ postId: 1 });

export default mongoose.model("Comment", commentSchema);
