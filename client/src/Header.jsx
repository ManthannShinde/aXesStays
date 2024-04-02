import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';
import { UserContext } from './UserContext';

export default function Header() {
  const {user} = useContext(UserContext);
  return (
    <header className=' flex justify-between bg-white'
            style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>
      <Link to={'/'}>
          <img
            src={logo}
            alt="Logo"
            className="flex rounded-full shadow-md shadow-grey-500"
            height={80}
            width={70}
          />
      </Link>

          <div className='flex gap-8 border border-grey-300 rounded-full py-2 px-3 shadow-md shadow-grey-500 items-center'>
            <div className="border-r pr-4">Place</div>
            
            <div className="border-r pr-4">Time</div>
            
            <div>Guests</div>
            <button className=' p-2 bg-primary text-white  rounded-full'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
          <Link to={user?'/account' : '/login'} className='flex gap-2 border border-grey-300 rounded-full py-2 px-3 items-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <div className='bg-grey-500 rounded-full border border-grey overflow-hidden'> 
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6 relative top-1">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>

            {!!user && (
              <div>
                {user.name}
              </div>
            )}
          </Link>
          
        </header>
        
  );
}
