import React, { useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlaceImg from '../components/PlaceImg';
import BookingDates from '../components/BookingDates';

function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(Response => {
            setBookings(Response.data);
        });
    }, []);

    return (
        <div>
            <AccountNav />
           
            <div className="space-y-4">
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link
                        key={booking.id}
                        to={`/account/bookings/${booking._id}`}
                        className="flex gap-2 pt-2 bg-gray-200 rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:bg-gray-300"
                    >
                        <div className="w-36">
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className="py-2 pr-2 grow">
                            <h2 className="text-lg">{booking.place.title}</h2>
                            <div className="text-lg">
                                <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" />
                                <div className="flex gap-1 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                    <span className="text-xl">
                                        Total price: ${booking.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>



        </div>
    );
}

export default BookingsPage
