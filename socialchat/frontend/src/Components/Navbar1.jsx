import React, { useEffect, useState } from 'react';
import { Home, User, Settings, Search, Video, ShoppingCart, ShoppingBag, Bell, MessageCircle, } from 'react-feather';
import { useVisibility } from '../VisibilityContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function () {
  const userToken = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profilePicture: '',
    coverPicture: '',
    desc: '',
    city: '',
    from: '',
    relationship: ''
  });
  const { open, setOpen } = useVisibility();
  useEffect(() => {
    const fetchUser = async () => {
      if (!userToken) {
        console.error('No user token found');
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/users", {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          profilePicture: response.data.profilePicture,
          coverPicture: response.data.coverPicture,
          desc: response.data.desc,
          city: response.data.city,
          from: response.data.from,
          relationship: response.data.relationship
        });
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchUser();
  }, [userToken]); 

  const handleRecherche = (e)=>{
    if (e.key === 'Enter') {
      window.location.replace(`search?search=${e.target.value}`)
    }
     
  }


  return (
    <div className='flex items-center justify-between py-5 px-10 bg-white dark:bg-[#1C1C1C] rounded shadow-lg'>
      <div>
        <p style={{ fontFamily: 'Fredoka, sans-serif' }} className='text-3xl font-bold text-[#13aff0]'>Social</p>
      </div>
      <div className='flex items-center justify-center gap-4'>
        <div className='flex items-center gap-4  bg-zinc-100 p-3 rounded-3xl '>
          <Search color="gray" />
          <input type='text' placeholder='Start typing to search' className='outline-none flex-1 border-none bg-transparent  ' onKeyDown={handleRecherche} />
        </div>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full '>
          <a href='/'>

            <Home color='#13aff0' size={30} />
            </a>

          </div>
          <div className='w-12 h-12 bg-zinc-100 flex items-center justify-center rounded-full '>
            <Video color='#13aff0' size={30} />

          </div>
          <div className='w-12 h-12 bg-zinc-100 flex items-center justify-center rounded-full '>
            <ShoppingBag color='#13aff0' size={30} />

          </div>

        </div>
      </div>
      <div className='flex items-center justify-center gap-4'>
        <p onClick={()=>{
          localStorage.removeItem("token");
          window.location.reload()
        }} className='text-white bg-red-500 p-2 cursor-pointer rounded-xl'>Logout</p>
        <Bell color='#13aff0' size={30} />
        <MessageCircle color='#13aff0' className='cursor-pointer' onClick={()=>{setOpen(!open)}} size={30} />
       <a href='/setting'>
       <Settings color='#13aff0' size={30}  />
       </a>
       <a href='/profile'>

        <div className='w-12 h-12'>
          <img alt=''
              src={formData.profilePicture ? `http://localhost:8000/${formData.profilePicture}` : 'https://via.placeholder.com/150'}
              className='w-full h-full object-cover rounded-full' />
        </div>
        </a>

      </div>
    </div>
  );
}
