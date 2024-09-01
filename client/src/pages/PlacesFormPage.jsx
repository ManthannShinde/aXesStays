import React, { useEffect, useState } from 'react';
import Perks from '../Perks';
import PhotosUploader from '../PhotosUploader';
import axios from 'axios';
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';

export default function PlacesFormPage() {

    const {id} =  useParams();
    console.log({id})

    const [title, setTitle] = useState(''); 
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [addedPic, setAddedPic] = useState([]);
    const [perks, setPerks] = useState('');
    const [extraInfo ,setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState();
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setDescription(data.description);
            setAddedPic(data.photos);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);

        });
    }, [id])

    function inputHeader(text){
        return (<h2 className='text-xl mt-6'>{text}</h2>)
    }

    async function savePlace(ev){
        const placeData = {title, address, description, addedPic, perks, extraInfo, checkIn, checkOut, maxGuests, price};
        if(id){
            // update
            await axios.put('/places', {
                id, ...placeData
            })
        } else {
            // new palce
            ev.preventDefault();
            await axios.post('/places', placeData);
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }

  return (
    <div>
        <AccountNav/>

                <form onSubmit={savePlace}>
                    {/* <h2 className='text-xl mt-6'>Title</h2> */}
                    {inputHeader('Title')}
                    <input required type="text" placeholder='Hotel Name' className='border hover:border-primary' value={title} onChange={ev => setTitle(ev.target.value)}/>

                    {inputHeader('Address')}
                    <input required type="text" placeholder='Address of Hotel' className='border hover:border-primary' value={address} onChange={ev => setAddress(ev.target.value)}/>

                    {inputHeader('Photos')}
                        

                    <PhotosUploader required addedPic={addedPic} onChange={setAddedPic} />
                        
                        {inputHeader('Description')}
                    <textarea value={description} onChange={ev => setDescription(ev.target.value)} className='hover:border-primary'/>

                    {inputHeader('Perks')}
                    <div className='grid gap-2 grid-cols-2 md:grid-cols-3'>
                        <Perks selected={perks} onChange={setPerks} />
                    </div>

                    {inputHeader('Extra Information')}
                    <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} className='hover:border-primary'/>

                    <div className='mt-6 flex gap-y-4 gap-x-8 grid-cols-2'>
                        <div>
                            <label required className='mt-2 -mb-1'>Check-In time :</label>
                            <input className='hover:border-primary' type="text" placeholder='12:00 pm' value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                        </div>
                        <div>
                            <label required className='mt-2 -mb-1'>Check-Out Time :</label>
                            <input className='hover:border-primary' type="text" placeholder='10:00 am'value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                        </div>
                        <div >
                            <label required className='mt-2 -mb-1'>Number Of Guests : </label>
                            <input className='hover:border-primary' type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}/>
                        </div>

                        <div>
                            <label required className='mt-2 -mb-1'>Price Per Night: </label>
                            <input className='hover:border-primary' type="text" placeholder="&#8377;" value={price} onChange={ev => setPrice(ev.target.value)}/>
                        </div>
                    </div>


                        <button className='primary mt-6 mb-3'>Save</button>

                </form>
            </div>
  );
}
