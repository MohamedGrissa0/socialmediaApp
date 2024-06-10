import React, { useEffect, useState } from 'react';
import { MoreHorizontal, Heart, MessageCircle, ThumbsUp, MapPin, ThumbsDown, Trash, Send } from 'react-feather';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {format} from "timeago.js"
import { Difference } from '@mui/icons-material';
export default function Post(props) {
  const userToken = localStorage.getItem('token');
  const [user, setUser] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  console.log(userToken)

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
  }, [user._id])

  const HandleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/posts/${id}`);
      if (res.status === 200) {
        toast.success("Deleted Successfully");

        setTimeout(() => {
          window.location.reload(); // Reloads the current page
        }, 1000); // 2000 milliseconds = 2 seconds
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };


  const handleLike = async (id, userId) => {
    console.log(id)
    console.log(userId)
    try {
      const res = await axios.put(`http://localhost:8000/api/posts/${id}/like/${userId}`);
      if (res.status === 200) {
        toast.success("Like Add Successfully");
        setTimeout(() => {
          window.location.reload(); // Reloads the current page
        }, 1000); // 2000 milliseconds = 2 seconds

      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  }
  const handledisLike = async (id, userId) => {
    console.log(id)
    console.log(userId)
    try {
      const res = await axios.put(`http://localhost:8000/api/posts/${id}/dislike/${userId}`);
      if (res.status === 200) {
        toast.success("DisLike Add Successfully");
        setTimeout(() => {
          window.location.reload(); // Reloads the current page
        }, 1000); // 2000 milliseconds = 2 seconds

      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  }
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/posts/${props.id}/comments`);
        setComments(res.data.comments);
      } catch (err) {
        console.error(err.message);
        toast.error(err.message);
      }
    };
    fetchComments();
  }, [props.id]);

  const handleAddComment = async (postId, comment ,userId) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/posts/${postId}/comments`, { comment , userId });
      if (res.status === 200) {
        setComments([...comments, res.data.comment]);
        setNewComment('');
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="my-4 shadow-xl bg-white dark:bg-[#1C1C1C]  rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <img
              alt="Profile"
              src={`http://localhost:8000/${props.profilePicture}`}              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{props.username}</p>
            <p className="text-sm text-gray-500 dark:text-white">
  {format(props.createdAt)}
</p>
            {props.location && (
              <div className='flex items-center gap-x-2'>
                <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
                  <MapPin color="white" size={18} />
                </div>
                <p className="text-sm text-gray-500 dark:text-white">{props.location.substr(40)}</p>
              </div>
            )}
          </div>
        </div>
        {props.userId == user._id && (
          <div className="bg-red-500 text-white p-3 rounded-full cursor-pointer" onClick={() => { HandleDelete(props.id) }}>
            <Trash />
          </div>
        )}
      </div>
      <div className="mb-4">
        <p className="text-lg text-gray-700 dark:text-white mb-4">{props.desc}</p>
        <div className="p-2 flex gap-2 flex-wrap items-center justify-center">
          {props.imgs.length === 1 ? (
            <img
              key={0}
              alt="Pexels Image"
              src={`http://localhost:8000/uploads/${props.imgs[0]}`}
              className="rounded-lg object-cover w-[600px] h-[600px]"
            />
          ) : (
            props.imgs.map((img, index) => (
              <img
                key={index}
                alt="Pexels Image"
                src={`http://localhost:8000/uploads/${img}`}
                className="rounded-lg object-cover h-96 w-96"
              />
            ))
          )}
        </div>
      </div>
      <div className="flex items-center justify-between p-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className='flex items-center gap-x-2'>
              <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center cursor-pointer">
                <ThumbsUp color="white" size={18} onClick={() => handleLike(props.id, props.userId)} />
              </div>
              <p className="text-gray-600 dark:text-white">{props.likes.length} Likes</p>
            </div>
            <div className='flex items-center gap-x-2'>
              <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer">
                <ThumbsDown color="white" size={18} onClick={() => handledisLike(props.id, props.userId)} />
              </div>
              <p className="text-gray-600 dark:text-white">{props.dislikes.length} Dislikes</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleComments}>
            <MessageCircle size={20} color='' />
            <p className="text-gray-600 dark:text-white">{comments.length} Comments</p>
          </div>
        </div>
      </div>
      {showComments && (
        <div className="p-4">
          <div className="mb-4 flex items-center p-2 bg-gray-100">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border outline-none bg-transparent border-none border-gray-300 rounded"
            />
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer">

            <Send onClick={() => handleAddComment(props.id, newComment , props.userId)} color="#fff" size={20}/>
            </div>

          </div>
          <div>
            {comments.map((comment, index) => (
              <div key={index} className="border-t border-gray-200 py-2">
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 overflow-hidden rounded-full">
                    <img
                      alt={comment.username}
                      src={`http://localhost:8000/${comment.profilePicture}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{comment.username}</p>
                </div>
                <p className="ml-12 text-gray-700">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
