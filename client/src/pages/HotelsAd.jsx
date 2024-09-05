import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HotelsAd() {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        axios.get('/places').then(response => {
            setHotels(response.data);
        });
    }, []);

    // Delete hotel function
    const handleDeleteHotel = (hotelId) => {
        axios.delete(`/deletehotels/${hotelId}`)
            .then(response => {
                
                setHotels(hotels.filter(hotel => hotel._id !== hotelId));
                alert("Hotel Deleted");
            })
            .catch(err => console.error("Error deleting hotel:", err));
    };

    return (
        <div className='flex-row items-center justify-center pt-4'>
            {hotels?.length > 0 && hotels.map(hotel => (
                <div key={hotel._id} className='flex-col gap-4 py-3 bg-gray-100 w-full rounded-2xl shadow overflow-hidden transition-transform hover:bg-gray-200 hover:scale-95'>
                    
                    {/* Hotel Info */}
                    <Link to={`/account/places/${hotel._id}`} className='flex gap-4 grow'>
                        <div className='w-48'>
                            {/* Hotel image if available, adjust the `imageUrl` based on your data */}
                            <img src={hotel.imageUrl || '/default-hotel.jpg'} alt={hotel.name} className='object-cover h-full w-full' />
                        </div>
                        <div className='pr-3 grow'>
                            <div className='py-3 pr-3 grow'>
                                <h2 className='text-xl font-semibold'>{hotel.name}</h2>
                                <p>{hotel.address}</p>
                                <p className='mt-2 font-bold'>${hotel.price} per night</p>
                            </div>
                        </div>
                    </Link>

                    {/* Delete Button */}
                    <div className='flex items-center pr-4'>
                        <button
                            onClick={() => handleDeleteHotel(hotel._id)}
                            className='bg-red-500  text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200'
                        >
                            Delete Hotel
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HotelsAd;
