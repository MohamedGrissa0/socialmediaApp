import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Home from './Pages/Home';
import { VisibilityProvider } from './VisibilityContext';
import ProfilePage from './Pages/ProfilePage';
import ProfileSettings from './Pages/ProfileSettings';
import { ToastContainer, c, toast } from 'react-toastify';
import Search from './Pages/Search';
import ChatInterface from './Pages/ChatInterface ';

function App() {
  const userToken = localStorage.getItem("token")
  return (
    <VisibilityProvider>
      <div className="b">
        <Router>
          <Routes>
            <Route path="/" element={userToken ? <Home/> : <LoginPage />} />
            <Route path="/login" element={userToken ? <Home/> :<LoginPage />} />
            <Route path="/profile" element={userToken? <ProfilePage/> :<LoginPage />} />
            <Route path="/setting" element={userToken? <ProfileSettings/> :<LoginPage />} />
            <Route path="/search" element={userToken? <Search/> :<LoginPage />} />
            <Route path="/chat" element={userToken? <ChatInterface/> :<LoginPage />} />

            
          </Routes>
        </Router>
        <ToastContainer/>
      </div>
    </VisibilityProvider>
  );
}

export default App;
