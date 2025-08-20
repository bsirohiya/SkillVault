import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'

function MenuItems({setSidebarOpen}) {
  return (
    <div className='px-6 text-gray-600 space-y-1 font-medium'>
        {
            menuItemsData.map( ({to, label, Icon})=> (
                <NavLink key={to} to={to} end={ to === "/"} 
                  onClick={()=>setSidebarOpen(false)}
                  
                  className={ ({isActive})=> `px-4 py-3 flex items-center gap-3 rounded-full mr-7 ${isActive ? 'bg-indigo-50 text-[#C58C34] text-xl':'hover:bg-gray-50'}`}>
                    
                      <Icon className='w-5 h-5'/>
                      {label} 
                </NavLink>
            ))
        }
    </div>
  )
}

export default MenuItems