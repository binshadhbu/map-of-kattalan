import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces([...response.data, ...response.data, ...response.data, ...response.data]);
    });
  }, []);
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {places.length > 0 && places.map(place => (
        <Link
          className="flex flex-col gap-2 bg-gray-200 rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:bg-gray-300 shadow-lg"
          key={place._id}
          to={'/place/' + place._id}
        >
          <div className="bg-gray-500 mb-2 rounded-2xl overflow-hidden">
            {place.photos?.[0] && (
              <img className="w-full h-48 object-cover" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="" />
            )}
          </div>
          <div className="p-2">
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </div>
        </Link>
      ))}
    </div>


  )
}

export default IndexPage