import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Conversation({ conversation }) {
    const [user, setUser] = useState({});
    const [friend, setFriend] = useState({});
    const userToken = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!userToken) {
                    throw new Error('No user token found');
                }

                const userResponse = await axios.get('http://localhost:8000/api/users', {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });

                setUser(userResponse.data);
            } catch (err) {
                console.error(err.message);
                toast.error(err.message); // Show an error notification if fetching user data fails
            }
        };

        fetchUserData();
    }, [userToken]);

    useEffect(() => {
        if (!user._id) return; // Ensure user data is fetched first

        const friendid = conversation.membres.find((m) => m !== user._id);

        const getFriend = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/users/${friendid}`);
                setFriend(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        if (friendid) {
            getFriend();
        }
    }, [conversation, user]);

    return (
        <div className="flex items-center p-2 gap-x-4 rounded mb-2">
            <img
                src={friend.profilePicture ? `http://localhost:8000/${friend.profilePicture}` : 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-12 h-12 object-cover rounded-full border-4 border-white"
            />
            <div className="flex-1">
                <div className="text-white">{friend.username}</div>
                <div className="text-gray-400 text-sm">{friend.message}</div>
            </div>
            <div className="text-gray-400 text-sm">{friend.time}</div>
        </div>
    );
}
