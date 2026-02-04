import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    category: {
      type: String,
      enum: [
        "technology",
        "lifestyle",
        "education",
        "entertainment",
        "general",
      ],
      default: "general",
    },
    tags: [String],
    isPublished: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

//1. Category index (GET /api/posts?category=...)
postSchema.index({ category: 1 });

//2. CreatedAt index for sorting (default sort in GET /api/posts)
postSchema.index({ createdAt: -1 });

//3. Author index (query by author in routes)
postSchema.index({ author: 1 });

export default mongoose.model("Post", postSchema);
