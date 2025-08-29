import {BadgeCheck, Bookmark, BookMarked, Heart, MessageCircle, Save, Share2, Trash} from "lucide-react"
import moment from "moment"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useAuth } from "@clerk/clerk-react"
import { api } from "../api/axios"
import toast from "react-hot-toast"
import ImageModal from "./ImageModal"

function PostCard({post, removePost}) {

    const [selectedImageIndex, setSelectedImageIndex] = useState(null);


    const {getToken} = useAuth()

    const postWithHashTags = post.content.replace(/(#\w+)/g,'<span class= "text-indigo-600 cursor-pointer">$1</span>')
    const currentUser = useSelector( (state)=> state.user.value)

    const [likes, setLikes] = useState(post.likes_count)
    const [saved, setSaved] = useState(currentUser.savedPosts?.includes(post._id) || false)
    const navigate = useNavigate()

    const handleLike =async ()=>{
        try {
            
            const {data} = await api.post("/api/post/like", {postId: post._id}, {headers: {Authorization: `Bearer ${await getToken()}`}})

            if(data.success){
                toast.success(data.message)
                setLikes(data.likes_count);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleDelete = async () => {
        try {

            const {data} = await api.delete(`/api/post/${post._id}`, {headers: {Authorization: `Bearer ${await getToken()}`}} )

            if(data.success){
                toast.success(data.message)
                removePost(post._id)
            }else{
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleSave = async () => {
        try {
            const {data} = await api.post("/api/post/save", {postId: post._id}, {
                headers: {Authorization: `Bearer ${await getToken()}`}
            })

            if(data.success){
                toast.success(data.message)
                setSaved(prev => !prev)

                if (removePost && saved) {
                  removePost(post._id);
                }
            }else{
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleShare = () => {
        const url = `${window.location.origin}/post/${post._id}`
        navigator.clipboard.writeText(url)
        toast.success("Post link copied to clipboard!")
    }
    
  return (
    <div className='bg-white rounded-xl shadow p-4 space-y-4 w-full sm:w-full md:max-w-2xl'>

        {/* User Info */}
        <div onClick={()=> navigate("/profile/" + post.user._id)} className='inline-flex items-center gap-3 cursor-pointer'>

            <img src={post.user.profile_picture} className='w-10 h-10 rounded-full shadow'/>
            <div>
                <div className='flex items-center space-x-1'>
                <span>{post.user.full_name}</span>
                <BadgeCheck className='w-4 h-4 text-blue-500'/>
                </div>
                <div className="text-gray-500 text-sm">@{post.user.username} • {moment(post.createdAt).fromNow()}</div>
            </div>
      </div>

      {/* content */}
      {post.content && <div className="text-gray-800 text-md whitespace-pre-line" dangerouslySetInnerHTML={{__html: postWithHashTags}}/>}

      {/* Horizontal Scroll for multiple images */}
        <div className="flex overflow-x-auto gap-5 scrollbar-hide">
            {post.image_urls.map((img, index) => (
                <img
                src={img}
                key={index}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md h-72 object-cover rounded-lg cursor-pointer"
                alt={`post-img-${index}`}
                onClick={() => setSelectedImageIndex(index)}
                />
            ))}
        </div>
      {/* Actions */}

        <div className='flex flex-wrap items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300'>
            <div className='flex items-center gap-1 cursor-pointer'>

                <Heart className={`w-4 h-4 cursor-pointer ${likes.includes
                (currentUser._id) && 'text-red-500 fill-red-500'}`} onClick=
                {handleLike}/>
                <span>{likes.length}</span>

            </div>

            <div className='flex items-center gap-1 cursor-pointer'>
                <MessageCircle className="w-4 h-4"/>
                <span>{17}</span>
            </div>

            <div onClick={handleShare} className='flex items-center gap-1 cursor-pointer'>
                <Share2 className="w-4 h-4"/>
                {/* <span>{7}</span> */}
            </div>


                    
            {/* Shows only if created by userId that is login */}
            {currentUser._id === post.user._id && 
                <div className='ml-auto flex items-center gap-4 cursor-pointer'>
                    <Trash className="w-4 h-4" onClick={handleDelete}/>
                </div>
            }

            <div className='flex items-center gap-1 cursor-pointer ml-4' onClick={handleSave}>
                {saved ? (
                    <BookMarked className="w-4 h-4" />
                ) : (
                    <Bookmark className="w-4 h-4" />
                )}
            </div>


        </div>

        {/* IMAGE MODAL */}
            {selectedImageIndex !== null && (
                <ImageModal
                images={post.image_urls}
                initialIndex={selectedImageIndex}
                onClose={() => setSelectedImageIndex(null)}
                saved={saved}
                onSave={handleSave}
                />
            )}

    </div>
  )
}

export default PostCard