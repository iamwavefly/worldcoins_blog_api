// import packages
import express from "express";
import multer from "multer";
import { createPost, deletePost } from "../controllers/post.controller.js";
// init()
const router = express.Router();
// setup routes
router.post(
  "/new",
  multer({ dest: "temp/", limits: { fieldSize: 8 * 1024 * 1024 } }).single(
    "thumbnail"
  ),
  createPost
);

router.delete(
  "/delete:id",
  multer({ dest: "temp/", limits: { fieldSize: 8 * 1024 * 1024 } }).single(
    "thumbnail"
  ),
  deletePost
);

export default router;
