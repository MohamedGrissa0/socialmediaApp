import React from 'react'

export default function OnlineUsersList({person}) {
  return (
    <div className="w-1/4 bg-gray-200 p-4">
    <div className="flex flex-col items-center gap-y-2">
        <img
            src={person.profilePicture ? `http://localhost:8000/${person.profilePicture}` : 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-12 h-12 object-cover rounded-full  border-4 border-white "
        />                     <div className="text-black mb-4">{person.username}</div>
        <button className="bg-blue-600 text-white py-2 px-4 rounded mb-2">Profile</button>
        <button className="bg-gray-700 text-white py-2 px-4 rounded mb-2">Mute</button>
        <button className="bg-gray-700 text-white py-2 px-4 rounded mb-2">Search</button>
        <div className="w-full">
            <button className="w-full bg-gray-700 text-white py-2 px-4 rounded mb-2 text-left">Chat Info</button>
            <button className="w-full bg-gray-700 text-white py-2 px-4 rounded mb-2 text-left">Customize Chat</button>
            <button className="w-full bg-gray-700 text-white py-2 px-4 rounded mb-2 text-left">Media, files and links</button>
            <button className="w-full bg-gray-700 text-white py-2 px-4 rounded mb-2 text-left">Privacy & support</button>
        </div>
    </div>
</div>  )
}
