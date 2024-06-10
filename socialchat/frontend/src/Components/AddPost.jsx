// AddPost.js
import React, { useEffect, useState } from 'react';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { Edit3 } from 'react-feather';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import MapComponent from './MapComponent';

export default function AddPost() {
  const userToken = localStorage.getItem('token');
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    description: '',
    userId: '',
    imgs: [],
    tagsFriends: [],
    likes: [],
    location: '',
    feeling: '',
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userToken) {
          throw new Error('No user token found');
        }

        const response = await axios.get('http://localhost:8000/api/users', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setUser(response.data);
        setFormData((prevData) => ({
          ...prevData,
          userId: response.data._id,
        }));
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchUser();
  }, [userToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    console.log(newImagePreviews)

    setFormData((prevData) => ({
      ...prevData,
      imgs: files,
    }));
    setImagePreviews(newImagePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('userId', formData.userId);
    data.append('username', user.username);
    data.append('desc', formData.description);
    data.append('profilePicture', user.profilePicture);
    formData.imgs.forEach((file) => {
      data.append('imgs', file);
    });
    formData.tagsFriends.forEach((tag) => {
      data.append('tagsFriends', tag);
    });
    formData.likes.forEach((like) => {
      data.append('likes', like);
    });
    data.append('location', formData.location);
    data.append('feeling', formData.feeling);

    try {
      const res = await axios.post('http://localhost:8000/api/posts', data);
      if (res.status === 200) {
        toast.success('Post created successfully');
        window.location.reload("/");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };


    

  const handleLocationButtonClick = () => {
    setShowMap(true);
  };

  const handleSetPosition = (pos) => {
    setFormData((prevData) => ({
      ...prevData,
      location: pos.name, 
    }));
    setShowMap(false);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col rounded-3xl shadow-xl bg-[white] dark:bg-[#1C1C1C] mt-4 p-6'>
      <div className='flex items-center mb-3'>
        <Edit3 color='blue' size={24} className='mr-2' />
        <h2 className='text-md font-semibold text-gray-400 dark:text-white'>Create Post</h2>
      </div>
      <div className='flex w-full border border-gray-300 rounded-2xl p-4'>
        <div className='w-10 h-10 overflow-hidden rounded-full'>
          <img
            alt=''
            src={`http://localhost:8000/${user.profilePicture}`}
            className='w-full h-full object-cover'
          />
        </div>
        <textarea
          className='flex-1 ml-4 outline-none border-none bg-transparent h-32'
          placeholder='What&apos;s on your mind?'
          name='description'
          onChange={handleChange}
        />
      </div>
      <div className='flex items-center justify-between mt-4'>
        <div className='flex items-center'>
          <div className='flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md relative cursor-pointer'>
            <AddToPhotosIcon fontSize='small' />
            <span className='ml-1'>Photo/Video</span>
            <input
              type='file'
              id='coverPicture'
              name='coverPicture'
              multiple
              onChange={handleImageUpload}
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
            />
          </div>
          <button type="button" className='flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-md ml-2'>
            <TurnedInIcon fontSize='small' />
            <span className='ml-1'>Tag Friends</span>
          </button>
          <button type="button" onClick={handleLocationButtonClick} className='flex items-center justify-center bg-yellow-500 text-white px-4 py-2 rounded-md ml-2'>
            <LocationOnIcon fontSize='small' />
            <span className='ml-1'>Location</span>
          </button>
          <button className='flex items-center justify-center bg-purple-500 text-white px-4 py-2 rounded-md ml-2'>
            <InsertEmoticonIcon fontSize='small' />
            <span className='ml-1'>Feeling/Activity</span>
          </button>
        </div>
        <button type='submit' className='bg-blue-500 p-2 px-4 rounded-md text-white'>
          Post
        </button>
      </div>
      {showMap && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
            <h2 className="text-xl font-semibold mb-4">Select Location</h2>
            <MapComponent setPosition={handleSetPosition} />
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
              onClick={() => setShowMap(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {imagePreviews.length > 0 && (
        <div className='mt-4'>
          <h3 className='text-md font-semibold text-gray-400 mb-2'>Image Previews</h3>
          <div className='flex flex-wrap'>
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt={`preview-${index}`} className='w-20 h-20 object-cover rounded-md mr-2 mb-2' />
            ))}
          </div>
        </div>
      )}
      <ToastContainer />
    </form>
  );
}
