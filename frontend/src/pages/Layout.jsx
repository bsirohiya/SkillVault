import  { useState } from 'react'
import Sidebar from '../components/Sidebar'
import {Outlet} from "react-router-dom"
import {Menu, X} from "lucide-react"
import { dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'
import {useSelector} from "react-redux"

function Layout() {

  const userData = useSelector( (state)=> state.user.value)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  return userData ? (
    <div className='w-full flex h-screen'>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {
        sidebarOpen ? 
        <X className='absolute top-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' onClick={()=> setSidebarOpen(false)}/>
        :
        <Menu className='absolute top-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' onClick={ ()=> setSidebarOpen(true)}/>
      }

      <div className='flex-1 bg-slate-50'>
        <Outlet />
      </div>

    </div>
  ) : (
    <Loading />
  )
}

export default Layout