import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function BookingReceptionist() {
  const [room, setRoomDetail] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [user, setUser] = useState('');
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();
  const roomId = parseInt(id);

   // Fetch guests
  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/respsioniste/all-guest');
        setGuests(response.data);
      } catch (error) {
        setError('Failed to fetch guests. Please try again.');
        console.error(error);
      }
    };
    fetchGuests();
  }, []);

  // Fetch room details
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/room/${roomId}`);
        setRoomDetail(response.data.room);
      } catch (error) {
        setError('Failed to fetch room details. Please try again.');
        console.error(error);
      }
    };
    fetchRoom();
  }, [roomId]);

  // Handle booking submission
  const handleSubmitBooking = async () => {
    if (!user || !checkIn || !checkOut) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/bookings', {
        id_user: user,
        id_room: roomId,
        checkin: checkIn,
        checkout: checkOut,
        total_price: room.price,
        status: 'pending',
      });

      if (response.status === 201) {
        navigate('/');
      } else {
        navigate(`/room/${roomId}`);
      }
    } catch (error) {
      setError('Booking failed. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!room) {
    return <div>Loading room details...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <img
          src={`http://127.0.0.1:8000/storage/${room.image}`}
          alt={room.title}
          className="w-full h-48 object-cover"
        />
        <h2 className="text-2xl font-bold mb-2">{room.title}</h2>
        <p className="text-gray-700">Type: {room.type}</p>
        <p className="text-gray-700">Max Occupation: {room.max_occupation}</p>
        <p className="text-gray-900 font-semibold text-lg mt-2">${room.price} per night</p>

        <div className="mt-4">
          <label className="block mb-2">Check-in Date:</label>
          <input
            type="date"
            className="px-3 py-2 border rounded-md w-full"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Check-out Date:</label>
          <input
            type="date"
            className="px-3 py-2 border rounded-md w-full"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2">Select Guest:</label>
          <select
            className="border p-2 w-full rounded"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          >
            <option value="">Select a user</option>
            {guests.map((guest) => (
              <option key={guest.id} value={guest.id}>
                {guest.first_name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmitBooking}
          disabled={isLoading}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
        >
          {isLoading ? 'Booking...' : 'Book Now'}
        </button>
      </div>
    </div>
  );
}