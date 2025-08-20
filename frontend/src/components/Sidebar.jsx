
import { assets, dummyUserData } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import MenuItems from './MenuItems'
import { CirclePlus, LogOut } from 'lucide-react'
import { useClerk, UserButton } from '@clerk/clerk-react'
import { useSelector } from 'react-redux'

function Sidebar({sidebarOpen, setSidebarOpen}) {

    const navigate = useNavigate()
    const userData = useSelector( (state)=> state.user.value)
    const {signOut} = useClerk()
    
  return (
    <div className={`w-60 xl:w-65 bg-white border-r border-gray-200 flex flex-col items-center max-sm:absolute top-4 bottom-0 z-20 pt-2.5 mt-2.5 ${sidebarOpen ? 'translate-x-4' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
        
        <div className="w-full flex justify-center">
            <img onClick= {()=>navigate("/")} src={assets.logo} alt="" className="w-40 max-w-[150px] mb-2.5 ml-2.5 cursor-pointer object-contain" />
        </div>

        <hr className='border-t border-gray-200 w-full mb-8'/>

       <MenuItems setSidebarOpen={setSidebarOpen}/>

        <Link to='/create-post' className='flex items-center justify-center gap-2 py-2.5 px-4 mt-6 mr-11 mx-7 
             rounded-xl bg-[#C58C34] hover:bg-[#b37c2e] 
             active:scale-95 transition text-white font-medium shadow-md cursor-pointer'>
          <CirclePlus className='w-5 h-5'/>
          Create Post
        </Link>

       <div className="mt-auto w-full px-6 pb-6">
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl shadow-sm">
            <UserButton />
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold text-gray-800">{userData.full_name}</h1>
              <p className="text-xs text-gray-500">@{userData.username}</p>
            </div>
            <LogOut
              onClick={signOut}
              className="ml-auto text-gray-400 hover:text-red-500 cursor-pointer transition"
            />
          </div>
      </div>

    </div>
  )
}

export default Sidebar