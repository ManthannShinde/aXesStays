import React from 'react';

export default function Perks({selected, onChange}) {

    function handleCbClick(ev){
        const {checked, name} = ev.target;
        if(checked){
            onChange([...selected, name]);
        } else{
            onChange([...selected.filter(selectedName => selectedName != name)]);
        }
    }

  return (
    <>

        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
            <input type="checkbox" checked={selected.includes('spa')} name="spa" onChange= {handleCbClick}/>
            <span>Spa and Wellness</span>
        </label>

        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
            <input type="checkbox" checked={selected.includes('swimming')} name="swimming" onChange= {handleCbClick}/>
            <span>Swimming Pool</span>
        </label>

        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
            <input type="checkbox" checked={selected.includes('pet')} name="pet" onChange= {handleCbClick}/>
            <span>Pet-Friendly Amenities</span>
        </label>

        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
            <input type="checkbox" checked={selected.includes('childcare')} name="childcare" onChange= {handleCbClick}/>
            <span>Child Care Service</span>
        </label>

        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
            <input type="checkbox" checked={selected.includes('limo')} name="limo" onChange= {handleCbClick}/>
            <span>Chauffeur and Limousine Service</span>
        </label>
        
        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
            <input type="checkbox" checked={selected.includes('clubs')} name="clubs" onChange= {handleCbClick}/>
            <span>Nightclubs & Bars</span>
        </label>

    </>
  );
}
