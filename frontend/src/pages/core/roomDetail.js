import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";

function Roomdetail() {
  const [room, setRomDetail] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookings, setBookings] = useState([]);

  const { user } = useAuth();

  const idAuth = user?.id;
  console.log(idAuth);
  const navigate = useNavigate();

  let { id } = useParams();
  let RoomId = parseInt(id);
  console.log(parseInt(id));
  useEffect(() => {
    const room = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/room/${RoomId}`
        );
        // console.log(response.data.room.id)
        setRomDetail(response.data.room);
      } catch (error) {
        console.log(error);
      }
    };
    room();
  }, []);

  const handelSubmitBooking = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/bookings", {
        id_user: idAuth,
        id_room: RoomId,
        checkin: new Date().toISOString().split("T")[0],
        checkout: new Date(Date.now() + 86400000 * 2)
          .toISOString()
          .split("T")[0],
        total_price: 50.99,
        status: "pending",
      });

      if (response.status == 201) {
        navigate("/bookings");
      } else {
        navigate(`/room/${RoomId}`);
      }
      // console.log(response.data.room.id)
      setRomDetail(response.data.room);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <img
          src={`http://127.0.0.1:8000/storage/${room.image}`}
          alt={room.title}
          className="w-full h-48 object-cover"
        />
        <h2 className="text-2xl font-bold mb-2">{room.title}</h2>
        <p className="text-gray-700">Type: {room.type}</p>
        <p className="text-gray-700">Max Occupation: {room.max_occupation}</p>
        <p className="text-gray-900 font-semibold text-lg mt-2">
          ${room.price} per night
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <div>
            <label className="block mb-2">Check-in Date:</label>
            <input
              type="date"
              className="px-3 py-2 border rounded-md"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2">Check-out Date:</label>
            <input
              type="date"
              className="px-3 py-2 border rounded-md"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handelSubmitBooking}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default Roomdetail;
