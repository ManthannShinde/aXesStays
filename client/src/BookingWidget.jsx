import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';


export default function BookingWidget({place}) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
      if(user){
        setName(user.name);
      }
    }, [user])

    const calculateTotalPrice = () => {
        
        if (checkIn && checkOut) {
          const checkInDate = new Date(checkIn);
          const checkOutDate = new Date(checkOut);
          const timeDiff = checkOutDate - checkInDate;
          const days = timeDiff / (1000 * 60 * 60 * 24); // Convert milliseconds to days 
          
    
          if (days > 1) {
           
            return place.price * days;
          }
        }
        
        return place.price;
      }
    

      const handleMobileChange = (ev) => {
        const input = ev.target.value;
    
        const cleanInput = input.replace(/\D/g, '');
    
        if (cleanInput.length <= 10) {
          setPhone(cleanInput);
        }
      };  

      async function bookThisPlace(){
        if(!user){
          return alert('Please login to book this place');
        }
        const totalPrice = calculateTotalPrice(); // Calculate the total price
        setTotalPrice(totalPrice);
 
        const response = await axios.post('/bookings', {checkIn, checkOut, maxGuests, name, phone, place : place._id, price : totalPrice, user: user.id});
        const bookingId = response.data._id;
        alert('Booking successful');
        setRedirect(`/`);
      }

      if(redirect){
        return <Navigate to={redirect}/>
      }
  
  return (
    <div>
      <div className='flex items-center justify-center' >
                 <div className='bg-white shadow p-8  text-center rounded-2xl w-1/2'>
                    <h2 className='text-xl font-semibold text-center'>
                        Price : &#8377;{place.price}/per night
                        <br />
                    </h2>
                    <div className='flex gap-1 mt-3 bg-gray-100 p-2 rounded-2xl border'>
                        <label>Check In : </label>
                        <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className='flex gap-1 mt-3 bg-gray-100 p-2 rounded-2xl border'>
                        <label>Check Out : </label>
                        <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                    <div className='text-left gap-1 mt-3 bg-gray-100 p-2 rounded-2xl border'>
                        <label>Number Of Guests :</label>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                    </div> 
                    <div className='text-left gap-1 mt-3 bg-gray-100 p-2 rounded-2xl border'>
                        <label>Your Full Name :</label>
                        <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                    </div> 
                    <div className='text-left gap-1 mt-3 bg-gray-100 p-2 rounded-2xl border'>
                        <label>Phone Number : </label>
                        <input type="text" value={phone} onChange={handleMobileChange} maxLength={10}/>
                    </div> 
                    
                    <br /><hr />

                    <div className='flex gap-2 text-xl font-semibold mt-4 text-left'>
                      Total Price :  &#8377; {calculateTotalPrice()}/- 
                      {/* Total Price :  &#8377; {totalPrice}/-  */}
                      <p className='text-sm text-red-600 text-bottom font-normal'>(Incl. of all taxes)</p>
                    </div>
                    <button onClick={bookThisPlace} className="primary">Book This Place</button>
                </div>
            </div>
    </div>
  );
}
