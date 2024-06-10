import React, { useState } from 'react';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
export default function LoginPage() {



  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", registerData);
      if (res.status === 200) {
        toast.success("Registration successful!");
        setIsLogin(true)
      } else {
        toast.error("Registration failed.");
      }
    } catch (err) {
      toast.error( err.message);
    }
  };
  

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", loginData);
      console.log(res.data) 
      if (res.status === 200) {
        console.log("Login successful!");
        localStorage.setItem("token",res.data.accessToken)
        window.location.replace("/")
      } else {
        console.log("Login failed.");
      }
    } catch (err) {
      console.error("Error during registration:", err.message);
    }  };

  const toggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Facebook</h1>
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 mr-2 ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              } rounded-md`}
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button
            className={`px-4 py-2 ml-2 ${isLogin ? 'bg-gray-200 text-gray-600' : 'bg-green-600 text-white'
              } rounded-md`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        <hr className="mb-6" />
        {isLogin ? (
          <form onSubmit={handleSubmitLogin}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email or Phone Number"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Log In
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmitRegister}>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                value={registerData.username}
                onChange={handleRegisterChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleRegisterChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
              >
                Register
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
