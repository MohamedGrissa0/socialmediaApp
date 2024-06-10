import React from 'react'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import { AllInclusiveRounded, ArrowBack, ArrowDownward, Chat, IcecreamOutlined, VideocamOutlined } from '@mui/icons-material';
import { StepIcon } from '@mui/material';
import img from "../assets/giftbox-removebg-preview.png"
export default function LeftSide
    () {
    return (
        <div className='flex   flex-col gap-y-8   text-black rounded shadow-xl bg-gray-200 dark:bg-[#1C1C1C] w-full py-8  px-10'>
            <div className='flex flex-row gap-2 items-center'>
                <img alt='' src={img}  className='object-cover w-16 h-16' />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, officia?</p>

            </div>
            <div>
                <img src='' alt='' />
                            </div>
       </div>
    )
}
