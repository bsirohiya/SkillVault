import fs from "fs"
import imagekit from "../configs/imageKit.js"
import { Post } from "../models/Post.js"
import { User } from "../models/User.js"
import { error } from "console"


// Add post
export const addPost = async (req, res) => {
    
    try {

        const {userId} = req.auth()
        const {content, post_type}= req.body
        const images = req.files

        let image_urls= []

        if(images.length){
            image_urls = await Promise.all(
                images.map( async (image) => {

                    const fileBuffer = fs.readFileSync(image.path)
                    const response = await imagekit.upload({
                        file: fileBuffer,
                        fileName: image.originalname,
                        folder: "posts"
                    })

                    const url = imagekit.url({
                        path: response.filePath,
                        transformation:[
                            {quality: "auto"},
                            {format:"webp"},
                            {width:"1280"},
                        ]
                    }) 
                    return url
                })
            )
        }

        await Post.create({
            user: userId,
            content,
            post_type,
            image_urls
        })

        res.json({success: true, message: "Post created successfully"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }

}


// Get posts
export const getFeedPosts = async (req, res) => {
    try {

        const {userId} = req.auth()
        const user = await User.findById(userId)

        // User connections and following

        const userIds = [userId, ...user.connections, ...user.following]
        const posts = await Post.find({user: {$in: userIds}}).populate("user").sort({createdAt: -1})

        res.json({success: true, posts})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// Like posts
export const likePost = async (req, res) => {
    try {

        const {userId} = req.auth()
        const {postId} = req.body

        const post = await Post.findById(postId)

        if(post.likes_count.includes(userId)){
            post.likes_count = post.likes_count.filter(user=> user !== userId)
            await post.save()
            res.json({success: true, message: "Unliked post"})
        }else{
            post.likes_count.push(userId)
            await post.save()
            res.json({success: true, message: "Liked post"})

        }
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}


// Delete post
export const deletePost = async (req, res) => {
    try {
        const {userId} = req.auth()
        const {postId} = req.params

        const post = await Post.findById(postId)

        if(!post){
            return res.json({success: false, message:"Post not found" })
        }

        if(userId === post.user){
            await Post.findByIdAndDelete(postId)
            // await post.save()
            return res.json({success: true, message: "Post deleted successfully"})
        }else{
            res.json({success: false, message: "Not authenticated"})
        }
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Save post
export const savePost = async (req, res) => {
    try {
        const {userId} = req.auth()
        const {postId} = req.body

        const user = await User.findById(userId)
        
        if(!user){
            return res.json({success: false, message: "Not authorized"})
        }

        if(user.savedPosts.includes(postId)){
            user.savedPosts = user.savedPosts.filter((p)=> p.toString() !== postId)
            await user.save()
            return res.json({success: true, message: "Post unsaved"})
        }else{
            user.savedPosts.push(postId)
            await user.save()
            return res.json({success: true, message: "Post saved"})
        }
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


// get saved posts
export const getSavedPosts = async (req, res) => {
    try {
        const { userId } = req.auth();

        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "Not authenticated" });
        }

        const posts = await Post.find({
            _id: { $in: user.savedPosts }
        })
        .populate("user")
        .sort({ createdAt: -1 });

        res.json({ success: true, posts });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


// Search by hashtags
export const searchByhashTags = async (req, res) => {
    try {
        const {tag} = req.query

        if (!tag) return res.status(400).json({ success: false, message: "Hashtag required" })

        const words = tag.trim().split(/\s+/);

        const regex = words.map(word => new RegExp(`(^|\\s)#?${word}(?=\\s|$)`, "i"));
        
         const posts = await Post.find({
            $or: regex.map(r => ({ content: { $regex: r } }))
            })
            .populate("user")
            .sort({ createdAt: -1 });

        res.json({ success: true, posts: posts || []})
                            
    } catch (error) {
            res.status(500).json({ success: false, message: error.message })
    }
}