import express from "express";
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
  subList,
  saveVideo,
  unSaveVideo,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verfyToken.js";

const router = express.Router();

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

//like a video
router.put("/like/:videoId", verifyToken, like);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);

router.get("/sublist", verifyToken, subList);

router.put("/save/:id", verifyToken, saveVideo);

router.put("/unsave/:id", verifyToken, unSaveVideo);

export default router;
