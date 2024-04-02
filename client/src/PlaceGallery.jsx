import React, { useState } from 'react';

export default function PlaceGallery({place}) {

    const [showAllPhotos, setShowAllPhotos] = useState(false);
    

    if(showAllPhotos){
        return(
            <div className='absolute bg-[rgba(0,0,0,0.9)] text-white inset-0 px-4 p-4 overflow-y-auto'>
               
                    <div>
                        <button onClick={() => (setShowAllPhotos(false))} className='fixed gap-1 p-3 bg-gray-300  rounded-2xl  font-bold'>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="black" 
                                className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                            </svg>

                        </button>
                    </div>
                <div className='p-8 items-center justify-center grid gap-4'>
                        <h1 className='mt-5 text-3xl'>{place.title}</h1>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div className=''>
                            <img className='w-full h-full object-cover transition-transform hover:bg-gray-200 hover:scale-95 rounded-2xl' src={'http://localhost:3000/uploads/'+photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }


  return (
    <div>
      <div className="relative bg-gray-100">

        <div className="grid gap-2 grid-cols-[2fr_1fr] overflow-hidden rounded-3xl">
            <div>
                {place.photos?.[0] && (
                    <div className=''>
                        <img onClick={() => setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover max-h-full ' src={'http://localhost:3000/uploads/'+place.photos[0]} alt="" />
                    </div>
                )}

            </div>
            <div className='grid'>
                {place.photos?.[1] && (
                    <img onClick={() => setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover ' src={'http://localhost:3000/uploads/'+place.photos[1]} alt="" />
                )}

                <div className='overflow-hidden'>

                {place.photos?.[2] && (
                    <img onClick={() => setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover relative top-1 ' src={'http://localhost:3000/uploads/'+place.photos[2]} alt="" />
                )}
                </div>
            </div>
        </div>
        <button onClick={() => setShowAllPhotos(true)} className='flex gap-1 absolute bg-gray-200 opacity-60 bottom-1 right-1 py-1 px-2 hover:bg-gray-300 rounded-2xl hover:opacity-100'>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>

            Show More Photos
        </button>
        </div>
    </div>
  );
}
