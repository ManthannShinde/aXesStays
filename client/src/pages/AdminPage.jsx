import React, { useContext, useState } from 'react';
import { Users, Hotel, Bell, Settings } from 'lucide-react';
import { UserContext } from '../UserContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import HotelsAd from './HotelsAd';
import axios from 'axios';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('hotels');
    // const [redirect, setRedirect] = useState(null);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const HandleHotelClick = () => {
        setActiveTab('hotels');
    };

    const handlePendingClick = () => {
        setActiveTab('pending');
    };  

    const logout = async () => {
      try {
          await axios.post('/logout');
          navigate('/');
          setUser(null);
          
      } catch (error) {
          console.error('Logout failed', error);
      }
  };
  

  //   if (redirect) {
  //     return <Navigate to={redirect} />;
  // }

  return (
    <div className="px-3 gap-3">
      {/* Sidebar */}
      <div className='flex px-3 gap-3'>
      <button className='primary' onClick={HandleHotelClick}>Hotels</button>
      <button className='primary' onClick={handlePendingClick}>Pending</button>
      <button className='w-full rounded-2xl text-white bg-red-500' onClick={logout}>Log Out</button>
      </div>

      {/* Main content */}
        <div className=''>
            {activeTab === 'hotels' && <HotelsAd />}
            {activeTab === 'pending' && <div>Pending</div>}

        </div>
      
    </div>
  );
};

export default AdminPage;
