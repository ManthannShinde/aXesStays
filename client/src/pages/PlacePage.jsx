import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../PlaceGallery';
import AddressLink from '../AddressLink';

export default function PlacePage() {
    const {id} = useParams();
    const [place, setPlace] = useState(null);
    
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    if(!place) return '';

  return (

    <div className='bg-gray-100 w-full'>

    <div  className='p-4 w-full' style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>
        <div className='mt-6 -mx-8 px-8 py-8'>
            
            <h1 className='text-4xl'>{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
       
            <PlaceGallery place={place}/>
          
        </div>

        <div className='pt-4'>
            <h2 className='font-semibold text-2xl'>Description</h2>
            {place.description}
        </div>

        <div className='pt-4'>
            <h2 className='font-semibold text-2xl'>Address</h2>
            {place.address}
        </div>
        
            <h2 className='pt-4 font-semibold text-2xl'>Visit Info : </h2>
        <div className=''>
            <div className='py-1'> 
                Check In : {place.checkIn} hrs<br />
                Check Out : {place.checkOut} hrs<br />
                Guests : {place.maxGuests} <br />
            </div>
        </div>
            <h2 className='pt-4 font-semibold text-2xl'>Extras : </h2>     
        <div>
            {place.extraInfo}
        </div>

            <h2 className='pt-4 font-semibold text-2xl'>Our Special Services :</h2>
        <div className=''>
            <ul>
                {Array.isArray(place.perks) ? (
                place.perks.map((perk, index) => (
                    <li key={index}>{perk.trim()}</li>
                ))
                ) : (
                <li>{place.perks}</li>
                )}
            </ul>
        </div>

                                <br /><br />
            <div>
                <BookingWidget place={place}/>
            </div>                    

</div>
    </div>



   

  );
}
