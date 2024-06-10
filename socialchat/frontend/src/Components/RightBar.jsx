import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ThumbsUp } from 'react-feather';
import { toast } from 'react-toastify';

function SponsoredAds() {
  return (
    <div className='bg-white shadow p-6 rounded-lg w-full max-w-xs dark:bg-[#1C1C1C]'>
      <p className='text-md mb-4 dark:text-white'>Sponsored Ads</p>
      <div className='space-y-4'>
        <img src='https://via.placeholder.com/300x100' alt='Ad 1' className='rounded-lg' />
        <img src='https://via.placeholder.com/300x100' alt='Ad 2' className='rounded-lg' />
      </div>
    </div>
  );
}


export default function RightBar() {
  const userToken = localStorage.getItem('token');
  const [user, setUser] = useState({});
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchOnline = async () => {
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
        setFollowers(response.data.Requetes)
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchOnline();
  }, [userToken]);

  const handleConfirm = async (followerId , userId) => {
    console.log(followerId)
    console.log(user._id)
    try {
      const response = await axios.post(`http://localhost:8000/api/users/request/accept/${followerId}/${userId}`)
      setUser(response.data);
      setFollowers(response.data.Requetes)
      toast.success("Request Accepted ")
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = (followerId) => {
    // Handle delete action
  };
  return (
    <div className='flex flex-1 items-center gap-3 flex-col p-4 w-full'>
      <div className='bg-white dark:bg-[#1C1C1C] shadow p-6 rounded-lg w-full max-w-xs'>
        <div className='flex items-center text-sm justify-between w-full'>
          <p className='text-md dark:text-white'>Friends Requests</p>
          <p className='text-[#13aff0]'>See all</p>
        </div>
        <hr className='mt-4' />
        {followers ? followers.map((follower, index) => (
        <div key={index} className='flex flex-col items-start w-full gap-3 mt-4'>
          <div className='w-full flex gap-4'>
            <div className='w-12 h-12 rounded-full overflow-hidden'>
              <img
                alt={follower.username}
                src={`http://localhost:8000/${follower.profilePicture}`}
                className='w-full h-full object-cover'
              />
            </div>

            <div>
              <p className='text-lg font-medium'>{follower.username.substr(0,15)}</p>
              <p className='text-sm text-gray-500'>{follower.mutualFriendsCount} mutual Friends</p>
            </div>
          </div>
          <div className='flex flex-row items-center gap-x-6 w-full'>
            <button className='p-2 px-4 text-white bg-[#13aff0] rounded-3xl' onClick={() => handleConfirm(follower.id , user._id)}>
              Confirm
            </button>
            <button className='p-2 px-4 text-black bg-zinc-200 rounded-3xl' onClick={() => handleDelete(follower.id)}>
              Delete
            </button>
          </div>
        </div>
      )) : <p>0 Requests </p>}





      </div>

      <div className='bg-white dark:bg-[#1C1C1C] shadow p-6 rounded-lg w-full max-w-xs'>
        <div className='flex items-center text-sm justify-between w-full'>
          <p className='text-md dark:text-white'>Suggest Pages
          </p>
          <p className='text-[#13aff0]'>See all</p>
        </div>
        <hr className='mt-4' />
        <div className='mt-4 flex flex-col gap-y-4 items-center'>
          <img src='https://uitheme.net/sociala/images/g-2.jpg' alt='' className='rounded-2xl' />
          <div className='bg-gray-200 text-s w-full py-2 rounded-3xl flex items-center justify-center gap-x-2'>
            <ThumbsUp size={18} />
            <p>Like Page</p>
          </div>
        </div>
        <div className='mt-4 flex flex-col gap-y-4 items-center'>
          <img src='https://uitheme.net/sociala/images/g-3.jpg' alt='' className='rounded-2xl' />
          <div className='bg-gray-200 text-s w-full py-2 rounded-3xl flex items-center justify-center gap-x-2'>
            <ThumbsUp size={18} />
            <p>Like Page</p>
          </div>
        </div>






      </div>
      <SponsoredAds />
    </div>
  );
}
