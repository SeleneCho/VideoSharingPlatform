import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getByTag,
  getVideo,
  random,
  savedVideos,
  search,
  sub,
  trend,
  updateVideo,
  userVideos,
} from "../controllers/videoController.js";
import { verifyToken } from "../utils/verfyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", verifyToken, sub);
router.get("/tags", getByTag);
router.get("/search", search);
router.get("/mypage", verifyToken, userVideos);
router.get("/watchlater", verifyToken, savedVideos);

export default router;
