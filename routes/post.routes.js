import { Router } from "express";
import {
  createPost,
  deletePost,
  fetchPosts,
  showPost,
  updatePost,
} from "../controllers/post.controller.js";

const router = Router();

router.post("/", createPost);
router.get("/fetch-posts", fetchPosts);
router.get("/show-post/:postId", showPost);
router.delete("/:id", deletePost);
router.put("/:postId", updatePost);
export default router;
