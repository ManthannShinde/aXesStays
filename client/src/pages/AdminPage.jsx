import React, { useContext, useState } from 'react';
import { Users, Hotel, Bell, Settings } from 'lucide-react';
import { UserContext } from '../UserContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import HotelsAd from './HotelsAd';
import axios from 'axios';

const AdminPage = () => {
    const baseURL = "https://axesstays.onrender.com"
    // const baseURL = "http://localhost:3000"
    const [activeTab, setActiveTab] = useState('hotels');
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

  function linkClasses(type = null){
      let classes = 'w-full rounded-2xl text-black bg-gray-200 hover:bg-blue-200';
      if (type === activeTab) {
          classes = 'primary ';
      }
      return classes;
  }

  return (
    <div className="px-3 gap-3">

      <div className='flex px-3 gap-3'>
      <button className={linkClasses('hotels')} onClick={HandleHotelClick}>Hotels</button>
      <button className={linkClasses('pending')} onClick={handlePendingClick}>Pending</button>
      <button className='w-full rounded-2xl text-white bg-gray-200 hover:bg-red-500 hover:text-white transition-all duration-200' onClick={logout}>LogOut</button>
      </div>

      {/* Main content */}
        <div className=''>
            {activeTab === 'hotels' && <HotelsAd />}
            {activeTab === 'pending' && 
                <div>
                    <p className='w-full pt-4'>No Hotels Pending</p>
                    <img className='w-full' src="https://cdn2.iconfinder.com/data/icons/line-weather/130/No_Data-512.png" alt="" />
                </div>
            }

        </div>
      
    </div>
  );
};

export default AdminPage;
