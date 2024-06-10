import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Assuming you are using react-toastify for notifications
import Post from './Post';
import AddPost from './AddPost';

export default function Center1() {
  const userToken = localStorage.getItem('token');
  const userId = localStorage.getItem('userid');

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

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
        toast.error(err.message); 
      }
    };
  
    fetchUserData();
  }, [userToken]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!userToken) {
          throw new Error('No user token found');
        }
  
        if (!user._id) {
          return; // Exit early if user ID is not yet available
        }
  
        const postsResponse = await axios.get(`http://localhost:8000/api/posts/${user._id}`);
        setPosts(postsResponse.data.reverse());
        console.log(postsResponse.data);
      } catch (err) {
        console.error(err.message);
        toast.error(err.message); 
      }
    };
  
    fetchPosts();
  }, [userToken, user._id]);
  




  return (
    <div className='col-span-1 md:col-span-2'>
  <AddPost user={user} />
  {posts.map((item, index) => (
    <Post key={index} desc={item.desc} username={item.username} createdAt={item.createdAt} profilePicture={item.profilePicture}  imgs={item.imgs} location={item.location} userId={item.userId} id={item._id} createdAt={item.createdAt}  likes={item.likes} dislikes={item.dislikes}/>
  ))} 
</div>

  );
}
