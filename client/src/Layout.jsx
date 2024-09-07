import React, { useState } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {

  // const [searchedHotels, setSearchedHotels] = useState('');

  // const searchedHotelsFunc = (searchQ) => {
  //   setSearchedHotels(searchQ);
  // }

  return (
    <div className='py-4 px-8 flex flex-col min-h-screen'>
      <Header  /><br /><hr />
      <Outlet/>
    </div>
  );
}
