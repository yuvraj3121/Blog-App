import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import blogRoutes from "./routes/blog.route.js";
import likeRoutes from "./routes/like.route.js";
import saveRoutes from "./routes/save.route.js";
import adRoutes from "./routes/ads.route.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/save", saveRoutes);
app.use("/api/ad", adRoutes);
export { app };
