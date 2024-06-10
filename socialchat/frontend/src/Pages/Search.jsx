import React, { useEffect, useState } from 'react';
import Navbar1 from '../Components/Navbar1';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Search() {
  const [res, setRes] = useState([]);
  const [user, setUser] = useState({});
  const userToken = localStorage.getItem('token');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const text = queryParams.get('search');
  const [friend, setFriend] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/search/${text}`, {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });

        if (response.status === 200) {
          setRes(response.data);
          console.log(response.data);
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchOnline = async () => {
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
        console.log(response.data)
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchOnline();

    fetchUser();
  }, [text, userToken]);



  const handleFriend = async (friendid, userid) => {
    console.log(friendid)
    console.log(userid)
    try {
      const response = await axios.post(`http://localhost:8000/api/users/request/${friendid}/${userid}`)
      if (response.status === 200) {
        toast.success("Request Sent")
      }
    }
    catch (err) {
      toast.error(err.message)
    }



  }


  const getButtonText = (item) => {
    const follower = item.Requetes.find(f => f.id === user._id);
    const follower1 = item.followers.find(f => f.id === user._id);

    if (follower) {
      return 'Request Sent'
    }
    if (follower1) {
      return 'Friends';
    }


    else {
      return 'Add Friend';

    }

  };


  return (
    <div className='h-screen bg-gray-100 dark:bg-[#222222]'>
      <Navbar1 />
      <div className="text-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-black">More people</h3>
            <div className="bg-white rounded-lg shadow-lg p-4 space-y-4">
              {res.map((item, index) => (
                user._id != item._id && (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-full">
                        <img
                          src={`http://localhost:8000/${item.profilePicture}`}
                          className='object-cover w-full h-full'
                          alt=''
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-black">{item.username}</h4>
                      </div>
                    </div>
                    <button
                      className={`bg-blue-600 text-white py-2 px-4 rounded ${getButtonText(item) === "Friends" || "Request Sent" ? "disabled" : ""}`}
                      onClick={() => handleFriend(item._id, user._id)}
                      disabled={getButtonText(item) === "Friends"}
                    >
                      {getButtonText(item)}
                    </button>

                  </div>
                )
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
