import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import SearchIcon from '@mui/icons-material/Search';
import c from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Chat } from '@mui/icons-material';
export default function Navbar() {
    return (
       <div>
         <div className='flex  items-center justify-between px-5  bg-[#202224]'>
            <div className='  p-2 rounded-lg flex gap-4 items-center justify-between '>
                <FacebookIcon sx={{ color: '#fff', borderRadius: "50%", fontSize: "32px" }} />
               
            </div>

     <div className=' p-2 rounded-lg flex gap-4 items-center justify-between  bg-gray-300'>
                    <SearchIcon sx={{ color: '#000', borderRadius: "50%" }} />

                    <input type="text" name="" id="" className='bg-transparent	  bg-gray-300 outline-none border-none' />
                </div>

            <div className=' p-2 rounded-lg flex gap-4 items-center justify-between '>
                
             <div className='relative w-max'>
                <div className='absolute -top-3 -right-0 bg-red-600 w-5 h-5 rounded-full flex items-start justify-center'>
                    <p className='text-white text-sm'>1</p>
                </div>
                <PersonIcon  sx={{ color: '#fff' , fontSize: "28px" ,cursor:"pointer"}}/>
             </div>
             <div className='relative w-max'>
                <div className='absolute -top-3 -right-0 bg-red-600 w-5 h-5 rounded-full flex items-start justify-center'>
                    <p className='text-white text-sm'>1</p>
                </div>
                <ChatIcon  sx={{ color: '#fff' , fontSize: "28px" ,cursor:"pointer"}}/>
             </div>
             <div className='relative w-max'>
                <div className='absolute -top-3 -right-0 bg-red-600 w-5 h-5 rounded-full flex items-start justify-center'>
                    <p className='text-white text-sm'>1</p>
                </div>
                <NotificationsIcon  sx={{ color: '#fff' , fontSize: "28px" ,cursor:"pointer"}}/>
                 </div>
                 <div className='h-12 w-12'>
                        <img alt='' src='https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=600' className=' cursor-pointer rounded-full w-full h-full object-cover'/>
                 </div>
            
        </div>
        </div>
        <hr></hr>
       </div>

    );
}
