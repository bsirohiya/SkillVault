import express from "express"
import { getChatMessages, sednMessage, sseContoller } from "../controllers/messagesController.js"
import { upload } from "../configs/multer.js"
import { protect } from "../middleware/auth.js"

const messageRouter = express.Router()

messageRouter.get("/:userId", sseContoller)

messageRouter.post("/send", upload.single("image"), protect, sednMessage)

messageRouter.post("/get", protect, getChatMessages)

export default messageRouter