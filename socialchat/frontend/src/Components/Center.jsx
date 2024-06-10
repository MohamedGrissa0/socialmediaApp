import React from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Post from './Post';
export default function Center() {
    return (
        <div className='  h-full w-full col-span-2 text-black gap-y-4 '>
            <div className='container mx-auto'>
                <div className='flex flex-col rounded shadow-xl bg-gray-200  '>
                    <div className='flex items-center w-full gap-x-4 m-4'>
                        <div className='h-12 w-12'>
                            <img alt='' src='https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=600' className=' cursor-pointer rounded-full w-full h-full object-cover' />
                        </div>
                        <input type='text' className='w-full outline-none border-none bg-transparent' placeholder='what going on ur mind' />


                    </div>
                    <hr class="border-none h-[5px] bg-white" />



                    <div className='flex  items-center justify-between px-4 '>
                        <div className='flex p-4 gap-3  '>

                            <div className='flex gap-2'>
                                <AddToPhotosIcon />
                                <p>Photos or Videos</p>
                            </div>
                            <div className='flex gap-2'>
                                <TurnedInIcon />
                                <p>Tag</p>
                            </div>
                            <div className='flex gap-2'>
                                <LocationOnIcon />
                                <p>Location</p>
                            </div>
                            <div className='flex gap-2'>
                                <InsertEmoticonIcon />
                                <p>Emojis</p>
                            </div>
                        </div>

                        <div> <button className='bg-blue-400 text-white p-2 rounded'>Share</button></div>


                    </div></div>

                <Post />
            </div>
        </div>
    )
}
