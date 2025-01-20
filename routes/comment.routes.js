import { Router } from "express";
import {
  createComment,
  deleteComment,
  fetchComments,
  showComment,
  updateComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.post("/", createComment);
router.get("/fetch-comments", fetchComments);
router.get("/show-comment/:commentId", showComment);
router.delete("/:id", deleteComment);
router.put("/:commentId", updateComment);
export default router;
