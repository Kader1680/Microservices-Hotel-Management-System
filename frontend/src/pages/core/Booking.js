import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router";

const Booking = () => {
  const { user } = useAuth(); // Get authenticated user
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);

  let {id}  = useParams();
  let BookingId = parseInt(id)
const navigate = useNavigate()
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        console.log("Fetching bookings...");
        const response = await axios.get("http://127.0.0.1:8000/api/bookings");
        setBookings(response.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);


  
 
  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-semibold text-center mb-6">My Bookings</h2>
      
      <div className="flex flex-wrap justify-center gap-4">
        {bookings.filter(booking => user && booking.id_user === user.id).map((booking) => (
          <div key={booking.id} className="bg-white shadow-md rounded-lg overflow-hidden w-64 p-4">
            <h3 className="text-lg font-semibold">Booking ID: {booking.id}</h3>
            <p className="text-gray-600 mt-2">User ID: {booking.id_user}</p>
            <p className="text-gray-600 mt-2">Room ID: {booking.id_room}</p>
         
          <button onClick={()=>{navigate(`/select-payment/${booking.id}`)}}  className="bg-green-600 ps-4 pe-4 pt-1 pb-1 text-white fw-bold">ready to pay</button>

          </div>
          
        ))}


      </div>

    </div>
  );
};

export default Booking;
