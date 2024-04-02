<div className='flex items-center justify-center' >
                 <div className='bg-white shadow rounded-2xl p-8  text-center rounded-2xl w-1/2'>
                    <h2 className='text-xl font-semibold text-center'>
                        Price : &#8377;{place.price}/per night
                        <br />
                    </h2>
                    <div className='flex gap-1 mt-3 bg-gray-100 p-2 rounded-2xl border'>
                        <label>Check In : </label>
                        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                    </div>
                    <div className='flex gap-1 mt-3 bg-gray-100 p-2 rounded-2xl border'>
                        <label>Check Out : </label>
                        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                    </div>
                    <div className='gap-1 mt-3 bg-gray-100 p-2 rounded-2xl border'>
                        <label>Number Of Guests :</label>
                        <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
                    </div> 
                    
                    <br /><hr />

                    <div className='text-xl font-semibold mt-4 text-left'>
                    Total Price : &#8377; {calculateTotalPrice()}/- 
                    </div>
                    <button className="primary">Book This Place</button>
                </div>
            </div>