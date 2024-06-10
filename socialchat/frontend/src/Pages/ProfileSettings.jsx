import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar1 from '../Components/Navbar1';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileSettings = () => {
  const [user, setUser] = useState({});
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

  useEffect(() => {
    const fetchUser = async () => {
      if (!userToken) {
        console.error('No user token found');
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/users", {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          profilePicture: response.data.profilePicture,
          coverPicture: response.data.coverPicture,
          desc: response.data.desc,
          city: response.data.city,
          from: response.data.from,
          relationship: response.data.relationship
        });
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




  const handleImageUpload = async (e, type) => {
    e.preventDefault();
  
    if (type === 'profilePicture' || type === 'coverPicture') {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append(type, file);
  
      try {
        const response = await axios.put(`http://localhost:8000/api/users/${user._id}/upload-${type}`, formData, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setUser(response.data);
        setFormData((prevData) => ({
          ...prevData,
          [type]: response.data[type]
        }));
        toast.success(`${type} updated successfully!`);
      } catch (err) {
        toast.error(err.message);
      }
    } else if (type === 'formSubmission') {
      try {
        const updateData = {
          username: formData.username,
          email: formData.email,
          desc: formData.desc,
          city: formData.city,
          from: formData.from,
          relationship: formData.relationship
        };
  
        const response = await axios.put(`http://localhost:8000/api/users/${user._id}`, updateData, {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
  
        setUser(response.data);
        toast.success("Profile updated successfully!");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  

  const getProfilePictureUrl = () => {
    return formData.profilePicture ? `http://localhost:8000/${formData.profilePicture}` : 'https://via.placeholder.com/150';
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <Navbar1 />
      <ToastContainer />
      <div className="max-w-3xl mx-auto mt-2 h-max bg-white w-full flex-1 p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <label htmlFor="profilePicture" className="relative cursor-pointer inline-block">
            <input
              type="file"
              name="profilePicture"
              onChange={(e) => handleImageUpload(e, 'profilePicture')}
              className="hidden"
              id="profilePicture"
            />
            <img
              src={getProfilePictureUrl()}
              alt="Profile"
              className="mx-auto h-24 w-24 rounded-full object-cover cursor-pointer"
              onClick={() => document.getElementById('profilePicture').click()}
            />
            <span className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white rounded-full cursor-pointer hover:bg-opacity-70 transition duration-300">
              Change Picture
            </span>
          </label>
          <h2 className="text-2xl font-bold mt-4">{user.username}</h2>
          <p className="text-gray-600">{user.city}</p>
        </div>

        <form onSubmit={(e) => handleImageUpload(e, 'formSubmission')} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="coverPicture" className="block text-sm font-medium text-gray-700">
              Change Cover Photo
            </label>
            <input
              type="file"
              name="coverPicture"
              onChange={(e) => handleImageUpload(e, 'coverPicture')}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-gray-700">
              From
            </label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
              Relationship
            </label>
            <select
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="1">Single</option>
              <option value="2">Married</option>
              <option value="3">Divorced</option>
            </select>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#13aff0] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
