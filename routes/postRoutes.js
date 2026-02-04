import express from "express";
import Post from "../models/postSchema.js";

const router = express.Router();

//get all posts with query commands
router.get("/", async (req, res) => {
  try {
    const {
      category,
      author,
      published,
      tag,
      search,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    let filter = {};

    // Query commands for filtering:
    if (category) {
      filter.category = category;
      // Example: GET /api/posts?category=technology
      // Returns all posts in technology category
    }
    if (author) {
      filter.author = { $regex: author, $options: "i" }; // Case-insensitive search
      // Example: GET /api/posts?author=john
      // Returns posts where author contains "john" (case-insensitive)
      // Also matches: John, Johnny, Johnson, etc.
    }
    if (published !== undefined) {
      filter.isPublished = published === "true";
      // Example: GET /api/posts?published=true
      // Returns only published posts
      // Example: GET /api/posts?published=false
      // Returns only unpublished (draft) posts
    }
    if (tag) {
      filter.tags = tag; // Search for posts with specific tag
      // Example: GET /api/posts?tag=javascript
      // Returns posts that have "javascript" in their tags array
      // Must match exact tag value in array
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
      // Example: GET /api/posts?search=mongodb
      // Returns posts where "mongodb" appears in title OR content
      // Case-insensitive search in both fields
    }

    // Sorting
    const sort = {};
    // Example: GET /api/posts?sortBy=views&order=desc
    // Sorts posts by views in descending order (highest views first)
    // Example: GET /api/posts?sortBy=title&order=asc
    // Sorts posts by title in alphabetical order (A-Z)
    sort[sortBy] = order === "desc" ? -1 : 1;

    const posts = await Post.find(filter).sort(sort).select("-__v"); // Exclude __v field

    res.json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

//get single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    // Increment view count
    post.views += 1;
    await post.save();

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

//Create new post
router.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

//Update post (partial update)
router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Use $set for partial updates
      {
        new: true,
        runValidators: true,
      },
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    res.json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

//Remove post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    res.json({
      success: true,
      message: "Post deleted successfully",
      data: {
        id: post._id,
        title: post.title,
        author: post.author,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
