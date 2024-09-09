import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';
import { UserContext } from './UserContext';

export default function Header({searchedHotelsFunc}) {
  const {user} = useContext(UserContext);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery) {
      searchedHotelsFunc(searchQuery);
    } else {
      searchedHotelsFunc('');
    }
  }, [searchQuery, searchedHotelsFunc]); 

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  return (
    <header className="bg-gray-50 rounded-3xl py-2 px-2 shadow-md"
            style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to={'/'} className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="rounded-full shadow-md"
            height={80}
            width={70}
          />
        </Link>

        <div className='flex items-center bg-gray-100 rounded-full py-2 px-4 shadow-md text-gray-700 overflow-hidden'>
          {isSearchExpanded ? (
            <input
            type="text"
            placeholder="Search destinations..."
            className="bg-transparent py-1 px-2 outline-none w-64 text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
            autoFocus
          />
          
          ) : (
            <>
              <div className="border-r border-gray-300 pr-4">Place</div>
              <div className="border-r border-gray-300 px-4">Time</div>
              <div className="pl-4">Guests</div>
            </>
          )}
          <button 
            onClick={toggleSearch}
            className='p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition duration-300 shadow-md ml-2'
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>

        <Link to={user?'/account' : '/login'} className='flex items-center space-x-2 bg-gray-100 rounded-full py-2 px-4 text-gray-700 hover:bg-gray-200 transition duration-300'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>

          <div className='bg-gray-300 rounded-full border border-gray-400 overflow-hidden'> 
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="#4F46E5"
              className="w-6 h-6 relative top-1"
            >
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </div>

          {!!user && (
            <div className="font-medium">
              {user.name}
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}