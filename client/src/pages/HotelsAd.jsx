import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

function HotelsAd() {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        // Fetch the initial data on mount
        const fetchHotels = async () => {
            try {
                const response = await axios.get('/places');
                setHotels(response.data);
            } catch (err) {
                console.error("Error fetching hotels:", err);
            }
        };

        fetchHotels();
    }, []);

    const handleDeleteHotel = async (hotelId) => {
        try {
            await axios.delete(`/deletehotels/${hotelId}`);
            setHotels(prevHotels => prevHotels.filter(hotel => hotel._id !== hotelId));
            alert("Hotel Deleted");
        } catch (err) {
            console.error("Error deleting hotel:", err);
        }
    };

    // Use useMemo to cache the hotels data
    const cachedHotels = useMemo(() => {
        console.log("Memoizing hotels:", hotels);
        return hotels;
    }, [hotels]);

    return (
        <div className='flex flex-col items-center justify-center pt-4 gap-4 w-full max-w-3xl mx-auto text-left'>
            {cachedHotels?.length > 0 && cachedHotels.map(hotel => (
                <div key={hotel._id} className='w-full gap-4 overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
                    <Link to={`/account/places/${hotel._id}`} className='flex flex-col sm:flex-row w-full'>
                        <div className='w-full sm:w-48 h-48 sm:h-full overflow-hidden'>
                            <img 
                                src={hotel.imageUrl || '/default-hotel.jpg'} 
                                alt={hotel.name} 
                                className='object-cover w-full h-full transition-transform duration-300 hover:scale-110'
                            />
                        </div>
                        <div className='flex flex-col justify-between p-4 grow'>
                            <div>
                                <h2 className='text-xl font-semibold mb-2'>{hotel.title}</h2><hr />
                                <p className='text-gray-600 mb-2'>{hotel.address}</p>
                            </div>
                            <p className='text-lg font-bold '>${hotel.price} <span className='text-sm font-bold text-gray-600'>per night</span></p>
                        </div>
                    </Link>
                    <button
                        onClick={() => handleDeleteHotel(hotel._id)}
                        className='w-full bg-red-500 text-white py-3 flex items-center justify-center hover:bg-red-600 transition-colors duration-200'
                    >
                        <Trash2 size={20} className="mr-2" />
                        Delete Hotel
                    </button>
                </div>
            ))}
        </div>
    );
}

export default HotelsAd;
