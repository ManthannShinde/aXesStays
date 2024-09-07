import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Card from 'react-bootstrap/Card';
import { Link, useOutletContext } from 'react-router-dom';
 
export default function IndexPage() {

  const passedSearch = useOutletContext();
  const searchedHotels = passedSearch.passedSearch;

  const [places, setPlaces] = useState([]);
  const [debouncedQ, setDebouncedQ] = useState('');
  
  const fetchHotels = async () => {
    try {
        const response = await axios.get('/places', {
            params: { search: searchedHotels || ''}
        });
        setPlaces(response.data);
    } catch (err) {
        console.error("Error fetching hotels:", err);
    }
  }

    useEffect(() => {
        fetchHotels();
    }, [searchedHotels]);



  return (
    <div className='mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 '>
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id} key={place._id}>
        <Card className="rounded-2xl m-2 transition-transform hover:bg-gray-200 hover:scale-95 shadow-lg">
          <Card.Img variant="top" src={`http://localhost:3000/uploads/${place.photos[0]}`} className="rounded-2xl object-cover aspect-square" />
          <Card.Body>
            <Card.Title>{place.title}</Card.Title>
            <Card.Text className="text-sm truncate">
              
              {place.address}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <span>Price : &#8377;{place.price}/-</span>
          </Card.Footer>
        </Card>
        </Link>
      ))}
    </div> 
  );
}
