import React, { useState } from 'react';
import { Users, Hotel, Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import HotelsAd from './HotelsAd';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('hotels');

    const HandleHotelClick = () => {
        setActiveTab('hotels');
    };

    const handlePendingClick = () => {
        setActiveTab('pending');
    };  

  return (
    <div className="px-3 gap-3">
      {/* Sidebar */}
      <div className='flex px-3 gap-3'>
      <button className='primary' onClick={HandleHotelClick}>Hotels</button>
      <button className='primary' onClick={handlePendingClick}>Pending</button>
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
