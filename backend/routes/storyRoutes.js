import express from "express";
import { upload } from "../configs/multer.js";
import { protect } from "../middleware/auth.js";
import { addStory, getStories } from "../controllers/storyController.js";

const storyRoute = express.Router()

storyRoute.post("/create", upload.single("media"), protect, addStory)
storyRoute.get("/get", protect, getStories)

export default storyRoute