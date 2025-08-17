import express from "express"
import { protect } from "../middleware/auth.js"
import { acceptConnectionRequest, discoverUsers, followUser, getUserConnections, getUserData, getUserProfile, sendConnectionRequest, unfollowUser, updateUserData } from "../controllers/userControllers.js"
import { upload } from "../configs/multer.js"
import { getUSerRecentMessage } from "../controllers/messagesController.js"

const userRouter = express.Router()

userRouter.get("/data",protect, getUserData)

userRouter.post("/update", upload.fields([
    {name: "profile", maxCount: 1},
    {name: "cover", maxCount: 1},
]), protect, updateUserData)

userRouter.post("/discover", protect, discoverUsers)

userRouter.post("/follow", protect, followUser)

userRouter.post("/unfollow", protect, unfollowUser)

userRouter.post("/connect", protect, sendConnectionRequest)

userRouter.post("/accept", protect, acceptConnectionRequest)

userRouter.get("/connections", protect, getUserConnections)

userRouter.post("/profiles", getUserProfile)

userRouter.get("/recent-messages", protect, getUSerRecentMessage)

export default userRouter