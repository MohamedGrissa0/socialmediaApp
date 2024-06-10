import React from 'react';
import { Rss, User, Globe, Users, Mail, Map, Video } from 'react-feather';

export default function Sidebar1() {
  const menuItems = [
    { icon: <Rss color='white' />, color: 'bg-blue-600', text: 'NewsFeed' },
    { icon: <User color='white' />, color: 'bg-orange-600', text: 'Profile' },
    { icon: <Globe color='white' />, color: 'bg-red-600', text: 'Network' },
    { icon: <Users color='white' />, color: 'bg-green-600', text: 'Popular groups' },
  ];

  const morePagesItems = [
    { icon: <Mail color='#13aff0' />, text: 'Messages' ,link:"chat" },
    { icon: <Map color='#13aff0' />, text: 'Maps' },
    { icon: <Video color='#13aff0' />, text: 'Videos' },
  ];

  const newFeedItems = [
    { icon: <Rss color='#13aff0' />, text: 'Latest News' },
    { icon: <User color='#13aff0' />, text: 'User Profiles' },
    { icon: <Globe color='#13aff0' />, text: 'Global Network' },
    
  ];

  const renderMenuItems = (items) => (
    items.map((item, index) => (
      <a href={`/${item.link}`} key={index} className='flex items-center gap-3 mt-4'>
        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${item.color}`}>
          {item.icon}
        </div>
        <p className='text-gray-700 dark:text-white'>{item.text}</p>
      </a>
    ))
  );

  return (
    <div className='flex items-center gap-3 flex-col p-4'>
      <div className='bg-white dark:bg-[#1C1C1C] shadow p-6 rounded-lg w-full max-w-xs '>
        <p className='text-gray-500 font-semibold mb-4'>New Feed</p>
        <hr className='mt-4' />
        <div>{renderMenuItems(menuItems)}</div>
      </div>

      <div className='bg-white dark:bg-[#1C1C1C] shadow p-6 rounded-lg w-full max-w-xs'>
        
        <p className='text-gray-500 font-semibold mb-4'>More Pages</p>
        <hr className='mt-4' />

        <div>{renderMenuItems(morePagesItems)}</div>
      </div>

      <div className='bg-white dark:bg-[#1C1C1C] shadow p-6 rounded-lg w-full max-w-xs'>
        <p className='text-gray-500 font-semibold mb-4'>New Feed</p>
        <hr className='mt-4' />

        <div>{renderMenuItems(newFeedItems)}</div>
      </div>
    </div>
  );
}
