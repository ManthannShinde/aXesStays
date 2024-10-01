import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

function HotelsAd() {
    const baseURL = "https://axesstays.onrender.com"
    // const baseURL = "http://localhost:3000"
    const [hotels, setHotels] = useState([]);
    const [searchHotel, setSearchHotel] = useState('');
    const [debouncedQ, setDebouncedQ] = useState('');

    const handleDebounce = (item) => {
        setTimeout(() => {
            setDebouncedQ(item);
        }, 2000);
    }
    

    const fetchHotels = async () => {
        try {
            const response = await axios.get('/places', {
                params: { search: debouncedQ }
            });
            // console.log(searchHotel);
            setHotels(response.data);
        } catch (err) {
            console.error("Error fetching hotels:", err);
        }
    };
    
    useEffect(() => {
        fetchHotels();
        handleDebounce(searchHotel);
    }, [searchHotel, debouncedQ]);
    

    const handleDeleteHotel = async (hotelId) => {
        try {
            await axios.delete(`/deletehotels/${hotelId}`);
            setHotels(prevHotels => prevHotels.filter(hotel => hotel._id !== hotelId));
            alert("Hotel Deleted");
        } catch (err) {
            console.error("Error deleting hotel:", err);
        }
    };

    const cachedHotels = useMemo(() => {
        // console.log("Memoizing hotels:", hotels);
        return hotels;
    }, [hotels]);

    return (
        <div className='flex flex-col items-center justify-center pt-4 gap-2 w-full max-w-3xl mx-auto text-left'>
            <input className='border-blue-500 hover:shadow-lg' type="text" placeholder='search hotel' onChange={(e) => setSearchHotel(e.target.value)}/>
            {cachedHotels?.length === 0 && <>
            <p>No Hotels Found</p>
                <img src="https://cdn2.iconfinder.com/data/icons/line-weather/130/No_Data-512.png" alt="" />
            </>}
            {cachedHotels?.length > 0 && cachedHotels.map(hotel => (
                <div key={hotel._id} className='w-full gap-4 overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
                    <Link to={`/account/places/${hotel._id}`} className='flex flex-col sm:flex-row w-full'>
                        <div className='w-full sm:w-48 h-48 sm:h-cover overflow-hidden'>
                            <img 
                                src={`${baseURL}/uploads/${hotel.photos[0]}`}
                                alt={hotel.name} 
                                className='object-cover w-full h-full transition-transform duration-300 hover:scale-110'
                            />
                        </div>
                        <div className='flex flex-col justify-between p-4 grow w-3/4'>
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
