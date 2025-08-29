import { Eye, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Messages() {

  const {connections} = useSelector((state)=> state.connections)

  const navigate = useNavigate()

  return (
      <div className='min-h-screen relative bg-slate-50'>
        <div className='max-w-6xl mx-auto p-6'>

          {/* Title */}
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-extrabold bg-gradient-to-r from-[#C58C34] to-[#d9a74a] bg-clip-text text-transparent mb-2'>Messages</h1>
              <p className='text-slate-600'>Interact to your friends</p>
            </div>

          {/* Connected Users */}
           <div className='flex flex-wrap justify-center gap-6'>
            {connections.map(user => (
              <div key={user._id}
                className='flex items-center p-5 bg-white shadow rounded-md gap-5 w-full sm:w-[450px] md:w-[500px]'>
                  
                {/* Avatar */}
                <img
                  src={user.profile_picture}
                  alt={user.full_name}
                  className='w-16 h-16 rounded-full object-cover'/>

                {/* User Info */}
                <div className='flex-1'>
                  <p className='font-medium text-slate-700'>{user.full_name}</p>
                  <p className='text-slate-500'>@{user.username}</p>
                  <p className='text-sm text-slate-600 line-clamp-2'>{user.bio}</p>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col gap-2'>
                  <button
                    onClick={() => navigate(`/messages/${user._id}`)}
                    className='w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded transition active:scale-95'>
                    <MessageSquare className='w-4 h-4 text-slate-800' />
                  </button>

                  <button
                    onClick={() => navigate(`/profile/${user._id}`)}
                    className='w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded transition active:scale-95'>
                    <Eye className='w-4 h-4 text-slate-800' />
                  </button>
                </div>
            </div>
          ))}
          </div>
        </div>
      </div>
  )
}

export default Messages