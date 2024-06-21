import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberofGuest] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user}=useContext(UserContext);

    useEffect(() => {
        if (user) {
          setName(user.name);
        }
      }, [user]);

    let numberofNights = 2;

    if (checkIn && checkOut) {
        numberofNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace() {
        console.log(place._id);
        const response = await axios.post('/bookings', {
            checkIn, checkOut, numberOfGuests, name, phone, place: place._id, price: numberofNights * place.price
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);

    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <div className='bg-white p-4 rounded-2xl shadow'>
                <div className='text-2xl text-center '>
                    price: ${place.price} /per night
                </div>
                <div className="border rounded-2xl mt-4">
                    <div className="flex">
                        <div className=' py-4 px-4'>

                            <p>chech in:</p>
                            <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />

                        </div>
                        <div className='py-4 px-4 border-l'>

                            <p>chech out:</p>
                            <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />

                        </div>
                    </div>
                    <div>
                        <div className='py-4 px-4 border-l'>

                            <label>number of guests :</label>
                            <input type="number" value={numberOfGuests} onChange={ev => setNumberofGuest(ev.target.value)} />

                        </div>
                    </div>
                    {numberofNights > 0 && (
                        <div className='py-4 px-4 border-l'>

                            <label>name: </label>
                            <input type="text" value={name} onChange={ev => setName(ev.target.value)} />

                            <label>phone number: </label>
                            <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} />

                        </div>
                    )}
                </div>

                <button onClick={bookThisPlace} className='primary mt-4'>Book this place
                    {numberofNights > 0 && (
                        <span> ${numberofNights * place.price}</span>
                    )}
                </button>

            </div>
        </div>
    )
}

export default BookingWidget
