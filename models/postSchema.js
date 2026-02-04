import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: String,
});

const Post = mongoose.model("Post", postSchema);
export default Post;
