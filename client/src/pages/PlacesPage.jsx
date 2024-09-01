import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AccountNav from '../AccountNav';
import axios from 'axios';
import PlaceImg from '../PlaceImg';

export default function PlacesPage() { 

    const {action} = useParams();
    const [places, setPlaces] = useState([]);
    

    useEffect(() => {
        axios.get('/user-places')
          .then(({ data }) => {
            setPlaces(data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
      
     ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (   

    <div style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }} className='text-center'>

        <AccountNav/>
            <div className="text-center">
            <Link className='inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full' to={'/account/places/new'}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add New Place
            </Link>
        </div>

        <div className='mt-4 '> 
            {places && places.length > 0 && places.map(place => (
                <Link to={'/account/places/'+place._id} className='flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl transition-transform hover:bg-gray-200 hover:scale-95' style={{ marginBottom: '0.6rem' }}>
                    <div className='flex w-32 h-32 bg-gray-300 shrink-0'>
                        {/* {place.photos.length > 0 && (
                            <img src={'http://localhost:3000/uploads/'+place.photos[0]} alt="..." />
                        )} */}
                        <PlaceImg place={place} />
                    </div>
                    <div className='text-left font-serif'>
                        <h2 className='text-xl'>{place.title}</h2> <hr />
                        <p className='text-sm mt-3 '>{place.description}</p>
                    </div>
                </Link>
            ))}
        </div>

    </div>
  );
}
