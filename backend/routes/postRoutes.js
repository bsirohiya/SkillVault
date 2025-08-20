import express from "express"
import { upload } from "../configs/multer.js"
import { protect } from "../middleware/auth.js"
import { addPost, deletePost, getFeedPosts, getSavedPosts, likePost, savePost, searchByhashTags } from "../controllers/postController.js"

const postRouter = express.Router()

postRouter.post("/add", upload.array("images"), protect, addPost)

postRouter.get("/feed", protect, getFeedPosts)

postRouter.post("/like", protect, likePost)

postRouter.delete("/:postId", protect, deletePost)

postRouter.post("/save", protect, savePost)

postRouter.get("/savedPosts", protect, getSavedPosts)

postRouter.get("/search", protect, searchByhashTags)

export default postRouter