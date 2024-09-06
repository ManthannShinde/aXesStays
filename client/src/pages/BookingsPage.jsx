import React, { useEffect, useState } from 'react';
import AccountNav from '../AccountNav';
import axios from 'axios';
import PlaceImg from '../PlaceImg';
import { differenceInCalendarDays, format } from 'date-fns';
import { Link } from 'react-router-dom';
import BookingDates from '../BookingDates';

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        })
    }, []);


  return (
    <div>
        <AccountNav/>
        <div className='flex items-center justify-center pt-4 '>
            {bookings?.length > 0 && bookings.map(booking => (
                <Link to={`/account/bookings/${booking._id}`} className='flex gap-4 bg-gray-100 w-1/2 rounded-2xl shadow overflow-hidden transition-transform hover:bg-gray-200 hover:scale-95'>
                    
                    <div className='w-48'>
                        <PlaceImg place={booking.place}/>
                    </div>
                    <div className=' pr-3 grow'>
                        <div className='py-3 pr-3 grow'>
                            <h2 className='text-xl font-semibold '>{booking.place.title}</h2>

                        <div className='border-t border-gray-400 mt-3 py-2'>
                            <BookingDates booking={booking}/>
                            <div className='pt-2'>
                                Happy Lodging with Axes-Stays
                            </div>
                        </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  );
}
