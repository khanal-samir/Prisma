import { Router } from "express";
import userRoutes from "../routes/user.routes.js";
import postRoutes from "./post.routes.js";
const router = Router();

router.use("/api/user", userRoutes);
router.use("/api/post", postRoutes);

export default router;
