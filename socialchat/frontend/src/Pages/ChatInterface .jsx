import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Message from '../Components/Message';
import Conversation from '../Components/Conversation';
import onlineFriends from '../Components/OnlineUsersList';
import 'tailwindcss/tailwind.css'; // Make sure Tailwind CSS is imported
import { io } from 'socket.io-client';
import OnlineUsersList from '../Components/OnlineUsersList';
const ChatInterface = () => {
    const [followers, setFollowers] = useState([])
    const [person, setPerson] = useState({});
    const userToken = localStorage.getItem('token');
    const [user, setUser] = useState({});
    const [conv, setCov] = useState([])
    const [msgs, setMsgs] = useState([])
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [friend, setFriend] = useState({});
    const [newmsg, setNewmsg] = useState("")
    const [newarrmsg, setarrNewmsg] = useState(null)
    const [onlineUsers, setonlineUsers] = useState([])

    const scroll = useRef()

    const socket = useRef()
    useEffect(() => {
        socket.current = io("ws://localhost:9000");
        socket.current.on("getMsg", data => {
            setarrNewmsg({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })

    }, [])

    useEffect(() => {
        newarrmsg && selectedConversation.membres?.includes(newarrmsg.sender) &&
            setMsgs((prev) => [...prev, newarrmsg])
    }, [newarrmsg, selectedConversation])


    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {
            setonlineUsers(
                user.followers?.filter(follower => users.some(user => user.userId === follower.id)))
            
        });
    }, [user]);


    console.log(onlineUsers)
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
                toast.error(err.message); // Show an error notification if fetching user data fails
            }
        };
        fetchUserData();
    }, [user._id])


    useEffect(() => {
        const fetchFriends = async () => {
            try {
                if (!userToken) {
                    throw new Error('No user token found');
                }

                if (!user._id) {
                    return; // Exit early if user ID is not yet available
                }

                const userResponse = await axios.get(`http://localhost:8000/api/users/followers/${user._id}`);
                setFollowers(userResponse.data);
            } catch (err) {
                toast.error(err.message); // Show an error notification if fetching user data fails
            }
        };
        fetchFriends();

    }, [user._id])


    const [conversations, setConversations] = useState([]);
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/conv/" + user._id);
                setCov(res.data)
            } catch (err) {
            }
        };
        getConversations()
    }, [user._id]);


    useEffect(() => {
        const getMessages = async () => {
            try {
                if (!selectedConversation) { return null }
                const res = await axios.get(`http://localhost:8000/api/msg/${selectedConversation._id}`);
                setMsgs(res.data);
            } catch (err) {
            }
        };
        getMessages();
    }, [selectedConversation]);


    useEffect(() => {
        if (!user._id) return; // Ensure user data is fetched first
        if (selectedConversation) {
            const friendid = selectedConversation.membres.find((m) => m !== user._id);

            const getFriend = async () => {
                try {
                    const res = await axios.get(`http://localhost:8000/api/users/${friendid}`);
                    setFriend(res.data);
                } catch (err) {
                }
            };

            if (friendid) {
                getFriend();
            }
        }
    }, [selectedConversation, user]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
            sender: user._id,
            text: newmsg,
            conversationId: selectedConversation._id
        };

        socket.current.emit("SendMsg", {
            senderId: user._id,
            receiverId: friend._id,
            text: newmsg
        })

        try {
            const res = await axios.post(`http://localhost:8000/api/msg/`, message);
            setMsgs([...msgs, res.data]);
            setNewmsg("")
        } catch (err) {
            toast.error(err.message);
        }
    };



    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' });
    }, [msgs]);
    return (
<div className="flex h-screen gap-x-2 overflow-hidden">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 bg-gray-800 p-4 flex flex-col">
                <div className="flex items-center mb-4">
            <input
                type="text"
                placeholder="Search Messenger"
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="flex flex-col gap-y-2 overflow-y-auto">
            {conv.map((conv, index) => (
                <div 
                    key={index} 
                    onClick={() => { setSelectedConversation(conv) }} 
                    className="cursor-pointer hover:bg-gray-700 rounded-lg p-2"
                >
                    <Conversation key={index} conversation={conv} />
                </div>
            ))}
        </div>
            </div>





            {selectedConversation ? (
                <div className="flex-1 bg-gray-200 p-4 flex flex-col justify-between overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                    <div>
                        <div className="flex items-center mb-4 gap-x-4">
                            <img
                                src={friend.profilePicture ? `http://localhost:8000/${friend.profilePicture}` : 'https://via.placeholder.com/150'}
                                alt="Profile"
                                className="w-10 h-10 object-cover rounded-full border-4 border-white"
                            />
                            <div className="text-white">{friend.username}</div>
                        </div>

                        <div className="flex flex-col space-y-4">
                            {msgs.map((msg, index) => (
                                <div key={index} ref={scroll}>
                                    <Message msg={msg} own={msg.sender === user._id} friend={friend} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center p-2">
                        <input
                            onChange={e => setNewmsg(e.target.value)}
                            value={newmsg}
                            type="text"
                            placeholder="Write Something ...."
                            className="w-full p-2 rounded bg-white text-white mr-2"
                        />
                        <button className="bg-blue-600 p-2 rounded text-white" onClick={handleSubmit}>Send</button>
                    </div>
                </div>
            ) : (
                <div className="flex-1 bg-gray-200  text-black text-center text-5xl justify-center items-center p-4 flex flex-col">
                    Open a chat
                </div>
            )
            }
            <OnlineUsersList person={user}  />

        </div>

    );
};

export default ChatInterface;
