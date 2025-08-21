import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import StoriesBar from "../components/StoriesBar"
import PostCard from "../components/PostCard"
import RecentMessages from "../components/RecentMessages"
import { useAuth } from "@clerk/clerk-react"
import { api } from "../api/axios"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { assets } from "../assets/assets"

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

  const removePost = async (postId) => {
    setFeed(prevPost=> prevPost.filter((p)=> p._id !== postId))
  }

  return !loading ? (
    <div className="h-full overflow-y-auto no-scrollbar py-4 mt-3 flex justify-center items-start gap-8 px-4 ">

      {/* Left gap */}
      <div className="hidden xl:block flex-1"></div>

      {/* Center: Stories + Posts */}
       <div className="w-full max-w-3xl flex flex-col items-start"> 
        <StoriesBar /> 
           {feed.length > 0 ? 
           (<div className="p-4 space-y-6 w-full">
              {feed.map((post) => ( <PostCard key={post._id} post={post} removePost={removePost}/> ))} 
           </div>)
           : 
           (  <div className="w-full mt-15 flex flex-col items-center justify-center py-16 px-6 text-center bg-[#FAFAFA] rounded-xl border border-gray-200 shadow-sm">

              <h2 className="text-2xl md:text-3xl font-semibold tracking-wide 
                  text-gray-800 mb-3">
                Your feed feels a little quiet 🕊
              </h2>

              <p className="text-gray-600 text-base mb-1">
                Follow <span className="text-gray-800 font-medium">@abd17</span> and others to see more posts.
              </p>

              <p className="text-gray-500 text-sm mb-8">
                Visit <span className="text-gray-700 font-medium">Discover</span> to search and connect.
              </p>

              <Link 
                to="/discover"
                className="px-5 py-2.5 rounded-lg 
                  bg-gradient-to-r from-[#D6B98B] to-[#BFA071]  
                  text-gray-800 font-medium text-sm
                  shadow hover:shadow-md transition-all"
              >
                Go to Discover →
              </Link>
            </div>


)
           } 
        </div>

      {/* Right section: Saved + Messages */}
      <div className="max-xl:hidden sticky top-0">
        <Link to='/saved-posts'>
          <div className="bg-white text-xs p-3.5 rounded-md inline-flex flex-col gap-2 shadow">
            <h3 className="text-slate-800 font-semibold text-base">Saved posts</h3>
            <img
              src={assets.sponsored_img}
              alt=""
              className="w-75 h-50 rounded-md cursor-pointer"/>
          </div>
        </Link>
        <RecentMessages />
      </div>

      {/* Right gap */}
      <div className="hidden xl:block flex-1"></div>
    </div>

  ) :
  (<Loading />)
}

export default Feed