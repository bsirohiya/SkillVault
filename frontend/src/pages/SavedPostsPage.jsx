import { useEffect, useState } from "react"
import SavedPosts from "../components/SavedPosts"
import RecentMessages from "../components/RecentMessages"
import { Link } from "react-router-dom"
import { assets } from "../assets/assets"

function SavedPostsPage() {

  return (
    <div className="h-full overflow-y-auto no-scrollbar py-4 mt-3 flex justify-center xl:justify-between items-start gap-8 px-4">

      {/* Left gap */}
      <div className="hidden xl:block flex-1"></div>

      {/* Center: Saved Posts */}
      <div className="w-full max-w-3xl flex flex-col items-start">
        <div className="p-4 space-y-6 w-full">
          <SavedPosts />
        </div>
      </div>

      {/* Right section: Sponsored + Messages */}
      <div className="max-xl:hidden sticky top-0 flex flex-col gap-4">
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
  )
}

export default SavedPostsPage
