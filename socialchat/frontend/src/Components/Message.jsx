import React from 'react'
import {format} from "timeago.js"

export default function Message({ msg, own , friend }) {
    return (
        <div >
            {own? (
                <div className="flex justify-end">
                    <div className="flex items-center  gap-x-4">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Profile"
                            className="w-10 h-10 mr-2 object-cover rounded-full border-4 border-white"
                        />
                    </div>
                    <div className='flex items-center flex-col justify-center gap-y-2'>

                    <div className="bg-white p-2 rounded text-black">{msg.text}</div>
                    <div className="text-gray-400 text-sm ml-2">{format(msg.createdAt)}</div>
                    </div>

                </div>
            ) : (
                <div className="flex justify-start">
                    <div className="flex items-center gap-x-4">
                        <img
                src={friend.profilePicture ? `http://localhost:8000/${friend.profilePicture}` : 'https://via.placeholder.com/150'}
                alt="Profile"
                            className="w-10 h-10 mr-2 object-cover rounded-full border-4 border-white"
                        />
                    </div>
                    <div className='flex items-center flex-col justify-center gap-y-2'>
                    <div className="bg-blue-500 p-2 rounded text-white">{msg.text}</div>
                    <div className="text-gray-400 text-sm ml-2">{format(msg.createdAt)}</div>
                    </div>
                </div>
            )}
        </div>
    )
}
