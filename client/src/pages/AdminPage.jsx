import React, { useState } from 'react';
import { Users, Hotel, Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import HotelsAd from './HotelsAd';

const AdminPage = () => {
  const [selectedHeader, setSelectedHeader] = useState(null);

  const menuItems = [
    { name: 'Pending', icon: <Users size={20} /> },
    { name: 'Hotels', icon: <Hotel size={20} /> },
    { name: 'Notifications', icon: <Bell size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];

  const handleHeaderClick = (header) => {
    setSelectedHeader(header);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#00BFFF] text-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.name} // Add this line

              className="flex items-center px-6 py-3 text-white hover:bg-[#33CCFF] transition-colors duration-200"
            >
              {item.icon}
              <span className="mx-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
          <HotelsAd/>
    </div>
  );
};

export default AdminPage;
