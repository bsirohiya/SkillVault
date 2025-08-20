import {useAuth} from "@clerk/clerk-react"
import { useEffect } from "react"
import { useState } from "react"
import { api } from "../api/axios"
import {toast} from "react-hot-toast"
import PostCard from "./PostCard"
import Loading from "./Loading"

function SavedPosts() {

  const {getToken} = useAuth()
  const [savedPosts, setSavedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const removePost = (postId) => {
      setSavedPosts(prev => prev.filter(p => p._id !== postId));
  }


  useEffect(()=>{
    async function fetchSavedPosts (params) {
      try {
        setLoading(true)
        const {data} = await api.get("/api/post/savedPosts", {
          headers: {Authorization: `Bearer ${await getToken()}`}
        })

        if(data.success){
          setSavedPosts(data.posts)
        }else{
          toast.error(data.message)
        }

      } catch (error) {
        toast.error(error.message)
      }

      setLoading(false)
    }

    fetchSavedPosts()

  },[])

  if (loading) return <Loading />;

  if (savedPosts.length === 0) return <div className="p-4">No saved posts yet.</div>;
  
  return (
    <div className="p-4 space-y-6 w-full max-w-3xl mx-auto">
        {
          savedPosts.map((post)=>(
            <PostCard key={post._id} post={post} removePost={removePost}/>
          ))
        }
    </div>
  )
}

export default SavedPosts