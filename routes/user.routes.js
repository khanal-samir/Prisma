import { Router } from "express";
import {
  createUser,
  deleteUser,
  fetchUsers,
  showUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/", createUser);
router.get("/fetch-users", fetchUsers);
router.get("/show-user/:userId", showUser);
router.delete("/:id", deleteUser);
router.put("/:userId", updateUser);
export default router;
