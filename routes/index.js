import { Router } from "express";
import userRoutes from "../routes/user.routes.js";
const router = Router();

router.use("/api/user", userRoutes); // all routes will have api/user

export default router;
