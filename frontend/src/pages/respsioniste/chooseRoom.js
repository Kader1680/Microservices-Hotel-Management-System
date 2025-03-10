import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router";

export default function ChooseRoom() {
  const [rooms, setrooms] = useState([]);

  const [guests, setguest] = useState([]);
  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/rooms");
        const allRooms = response.data.rooms;
        setrooms(allRooms);
        console.log(allRooms);
      } catch (error) {
        console.error("Error fetching allRooms:", error);
      }
    };

    getRooms();
  }, []);

  useEffect(() => {
    const getGuests = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/respsioniste/booking-guest"
        );
        const allguests = response.data;
        setguest(allguests);
        console.log(allguests);
      } catch (error) {
        console.error("Error fetching allguests:", error);
      }
    };

    getGuests();
  }, []);


// console.log(guests.filter(el => el.id = 3));

  const [selectedUser, setSelectedUser] = useState(null);

  // const handleBooking = (roomId) => {
  //   if (!selectedUser) {
  //     alert("Please select a user first.");
  //     return;
  //   }
  //   setSelectedRoom(roomId);
  //   alert(`Room ${roomId} booked for user ${selectedUser}`);
  // };

  
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookings, setBookings] = useState([]);
  const [user, setuser] = useState("")

  const navigate = useNavigate();

  const handelSubmitBooking = async (idroom) => {
    console.log(idroom)
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/respsioniste/booking-guest",
        {
          id_user: user,
          id_room: idroom,
          checkin: new Date().toISOString().split("T")[0],
          checkout: new Date(Date.now() + 86400000 * 2)
            .toISOString()
            .split("T")[0],
          total_price: 50.99,
          status: "pending",
        }
      );

      if (response.status == 201) {
        navigate("/all-guest");
      } else {
        navigate("/respsioniste/booking-guest");
      }
       
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Room Booking</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.map((room) => (
          <div key={room.id} className="border p-4 rounded-lg shadow-md">
            <img
              src={`http://127.0.0.1:8000/storage/${room.image}`}
              alt={room.title}

              className="w-full h-40 object-cover rounded" />

            <h3 className="text-lg font-semibold mt-2">{room.title}</h3>
            <p className="text-gray-600">{room.type}</p>
            <p className="text-green-600 font-bold">{room.price}</p>

            {/* <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
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
  </div> */}


            <div className="mb-4">
              {/* <label className="block mb-2">Select Guest:</label>
        <select
          className="border p-2 w-full rounded"
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select a user</option>
          {guests.map((guest) => (
            <option key={guest.id} onChange={() => setuser(guest.id)} value={user}>
              {guest.first_name}
            </option>
          ))}
        </select> */}

              {/* <button
          onClick={() => handelSubmitBooking(room.id)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Book Now
        </button> */}

              <button
                onClick={() => navigate(`/respsioniste/choose-room/${room.id}`)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full"
              >
              
                view & Bookings
              
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
