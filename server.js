import express from "express";
import { logReq, globalErr } from "./middleware/basicMiddlewares.js";
import dotenv from "dotenv";
import connectDB from "./db/conn.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
connectDB();

//express setup
app.use(express.json());
app.use(logReq);

//routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

//global handling errors
app.use(globalErr);

//listener
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
