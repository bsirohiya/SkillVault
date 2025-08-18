import { useEffect, useState } from "react"
import { assets, dummyPostsData } from "../assets/assets"
import Loading from "../components/Loading"
import StoriesBar from "../components/StoriesBar"
import PostCard from "../components/PostCard"
import RecentMessages from "../components/RecentMessages"
import { useAuth } from "@clerk/clerk-react"
import { api } from "../api/axios"
import toast from "react-hot-toast"

function Feed() {

  const {getToken} = useAuth()

  const[feed, setFeed] = useState([])
  const[loading, setLoading] = useState(true)

  useEffect( ()=>{

    async function fetchFeed(){
      try { 

        setLoading(true)
        const {data} = await api.get("/api/post/feed", {headers: {Authorization: `Bearer ${await getToken()}`}})

        if(data.success){
          setFeed(data.posts)
        }else{
          toast.error(data.message)
        }

      } catch (error) {
        toast.error(error.message)
      }

      setLoading(false)
    }

    fetchFeed()
  }, [])

  return !loading ? (
    <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">

      {/* Stories and post list */}
      <div>
        <StoriesBar />
        <div className="p-4 space-y-6">
          {feed.map( (post)=>(
            <PostCard key={post._id} post={post}/>
          ))}
        </div>
      </div>

      {/* Right side area of feed - () and messages */}

      <div className="max-xl:hidden sticky top-0"> 
        <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
          <h3 className="text-slate-800 font-semibold text-base">Saved posts</h3>
          <img src={assets.sponsored_img} alt="" className="w-75 h-50 rounded-md cursor-pointer"/>
        </div>

        {/* messages*/}
          <RecentMessages />
      </div>

    </div>
  ) :
  (<Loading />)
}

export default Feed