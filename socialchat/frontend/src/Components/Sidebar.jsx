import React from 'react'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import { AllInclusiveRounded, ArrowBack, ArrowDownward, Chat, IcecreamOutlined, VideocamOutlined } from '@mui/icons-material';
import { StepIcon } from '@mui/material';
export default function
    () {
    return (
        <div className='flex    flex-col gap-y-8   text-black rounded shadow-xl bg-gray-200 w-full py-8  px-10'>
        
            <div className='flex items-center  gap-1'>
                <RssFeedIcon     />
                <p>Feed</p>

            </div>
            <div className='flex items-center gap-1'>
                <Chat />
                <p>Chats</p>

            </div>

            <div className='flex items-center gap-1'>
                <VideocamOutlined />
                <p>Chats</p>

            </div>
            <div className='flex items-center gap-1'>
            <Chat />
                <p>Chats</p>

            </div>
            <div className='flex items-center gap-1'>
            <RssFeedIcon />
                <p>Chats</p>

            </div>
            <div className='flex items-center gap-1'>
            <IcecreamOutlined />
                <p>Chats</p>

            </div>
            <div className='flex items-center gap-1'>
            <AllInclusiveRounded />
                <p>Chats</p>

            </div>
            <div className='flex items-center gap-1'>
            <RssFeedIcon />
                <p>Chats</p>

            </div>
            <div className='flex items-center gap-1'>
            <ArrowDownward />
                <p>Show More</p>

            </div>
            <hr />
        </div>
    )
}
