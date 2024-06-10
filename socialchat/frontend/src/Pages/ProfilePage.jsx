  import React, { useEffect, useState } from 'react';
  import Navbar1 from '../Components/Navbar1';
  import Post from '../Components/Post';
  import Center1 from '../Components/Center1';
  import AddPost from '../Components/AddPost';
  import axios from 'axios';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  export default function ProfilePage() {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      profilePicture: '',
      coverPicture: '',
      desc: '',
      city: '',
      from: '',
      relationship: ''
    });
    const userToken = localStorage.getItem("token");


    const getCoverPictureUrl = () => {
      return user.coverPicture ? `http://localhost:8000/${user.coverPicture}` : 'https://via.placeholder.com/1500x300';
    };



    
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
          console.log(user)
        } catch (err) {
          console.error(err.message);
          toast.error(err.message); // Show an error notification if fetching user data fails
        }
      };
  
      const fetchPosts = async () => {
        try {
          if (!userToken) {
            throw new Error('No user token found');
          }
    
          if (!user._id) {
            return; // Exit early if user ID is not yet available
          }
  
          const postsResponse = await axios.get(`http://localhost:8000/api/posts/profile/${user._id}`);
          setPosts(postsResponse.data.reverse());
          console.log(postsResponse.data)
        } catch (err) {
          console.error(err.message);
          toast.error(err.message); // Show an error notification if fetching posts fails
        }
      };
  
      fetchUserData();
      fetchPosts();
    }, [userToken, user._id]); // Add dependencies to trigger the effect when these values change




    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar1 />
        <img
          src={getCoverPictureUrl()}
          alt="Cover"
          className="bg-cover bg-center w-full h-[300px] object-cover rounded-lg mx-auto border-4 border-white "
        />

        <div className="max-w-5xl mx-auto mt-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Profile Picture */}
            <div className="col-span-3">
              <img
                src={user.profilePicture ? `http://localhost:8000/${user.profilePicture}` : 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-40 h-40 object-cover rounded-full mx-auto border-4 border-white -mt-20"
              />

            </div>
            {/* Basic Info */}
            <div className="col-span-9">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Basic Info</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <p className="text-base">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">description</p>
                    <p className="text-base">{user.desc}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">relationship</p>
                    <p className="text-base">
                      {user.relationship === 1
                        ? "Single"
                        : user.relationship === 2
                          ? "Married"
                          : user.relationship === 3
                            ? "Divorced" :"Unkown"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 mt-6">
              <AddPost />
              <div className=" p-4 ">
                <h2 className="text-3xl font-semibold mb-4 text-[#13aff0]">Posts</h2>
                {posts.map((item, index) => (
    <Post key={index} desc={item.desc}  imgs={item.imgs} username={item.username} profilePicture={item.profilePicture}  location={item.location} userId={item.userId} id={item._id} createdAt={item.createdAt}  likes={item.likes} dislikes={item.dislikes}/>
  ))}               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
