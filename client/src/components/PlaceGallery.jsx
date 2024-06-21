import React from 'react'
import { useState } from 'react';

function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen p-8 overflow-y-auto">
        <div className="bg-black p-8 rounded-3xl shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
              Close photos
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {place?.photos?.length > 0 && place.photos.map((photo, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                <img
                  className="w-full h-72 object-cover transition-transform duration-500 hover:scale-110 hover:opacity-90"
                  src={'http://localhost:4000/uploads/' + photo}
                  alt=""
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

    );
  }
  return (
    <div>
      <div className="relative w-full max-w-4xl mx-auto mt-8">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden shadow-lg ">
          <div className="relative group transform transition-transform duration-300 hover:scale-105">
            {place.photos?.[0] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="cursor-pointer aspect-square object-cover group-hover:opacity-90 transition duration-300"
                src={'http://localhost:4000/uploads/' + place.photos[0]}
                alt=""
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300"></div>
          </div>
          <div className="grid gap-2">
            {place.photos?.[1] && (
              <div className="relative group transform transition-transform duration-300 hover:scale-105">
                <img
                  className="aspect-square object-cover group-hover:opacity-90 transition duration-300"
                  src={'http://localhost:4000/uploads/' + place.photos[1]}
                  alt=""
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300"></div>
              </div>
            )}
            <div className="relative group transform transition-transform duration-300 hover:scale-105">
              {place.photos?.[2] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="cursor-pointer aspect-square object-cover group-hover:opacity-90 transition duration-300 "
                  src={'http://localhost:4000/uploads/' + place.photos[2]}
                  alt=""
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300"></div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute bottom-2 right-2 px-4 py-2 bg-white rounded-2xl shadow-lg shadow-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          Show more photos
        </button>
      </div>


    </div>
  )
}

export default PlaceGallery
