import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const { user }= useAuth();  
  const idAuth = user?.id;
  console.log(idAuth)
  // console.log(typeof user);
  // console.log( user.id);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        console.log("Fetching rooms...");
        const response = await axios.get("http://127.0.0.1:8000/api/rooms");
        setRooms(response.data.rooms || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);


 

  const handleBookNow = async (roomId) => {

    if (!user) {
      alert("Please log in to book a room.");
      navigate("/login");
      return;
    }

    try {
 

    const response = await axios.post(
        "http://127.0.0.1:8000/api/bookings",
        {
          id_user: idAuth, 
          id_room: roomId,
          checkin: new Date().toISOString().split("T")[0],
          checkout: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Room booked successfully!");
        navigate("/bookings");
      }
    } catch (error) {
      console.error("Error booking room:", error);
      alert("Failed to book the room. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Available Rooms    </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.length > 0 ? (
          rooms.map((room) => {
            return (
              <div key={room.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                {room.image ? (
                  <img
                    src={`http://127.0.0.1:8000/storage/${room.image}`}
                    alt={room.title}
                    className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-700">{room.title}  </h3>
                  <p className="text-gray-500">Type: {room.type}</p>
                  <p className="text-gray-700 font-semibold">${room.price}/night</p>

                  {/* <button
                    className="mt-3 w-full px-4 py-2 text-white bg-red-700 rounded-lg hover:bg-white border-2 hover:text-[#FEA116] hover:border-[#FEA116] transition"
                    onClick={() => navigate(`/room/${room.id}`)}
                  >
                    View Room
                  </button>

                  <button
                    className="mt-3 w-full px-4 py-2 bg-blue-900 text-white border-2 border-blue-950 rounded-lg hover:text-white transition"
                    onClick={() => handleBookNow(room.id)}
                  >
                    Book Now
                  </button> */}

                  <button
                    className="mt-3 w-full px-4 py-2 text-white bg-red-700 rounded-lg hover:bg-white border-2 hover:text-[#FEA116] hover:border-[#FEA116] transition"
                    onClick={() => navigate(`/room/${room.id}`)}
                  >
                    View Room
                  </button>
                  
                  {
                    idAuth ? (
                      <button
                      className="mt-3 w-full px-4 py-2 bg-blue-900 text-white border-2 border-blue-950 rounded-lg hover:text-white transition"
                      onClick={() => handleBookNow(room.id)}
                    >
                      Book Now
                     </button>
                    ) : (
                      <div className="mt-3 w-full px-4 py-2 text-black bg-gray-300 rounded-lg hover:bg-white border-2 hover:text-[#FEA116] hover:border-[#FEA116] transition">please register or login to book room</div>
                    )
                  }
                 
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-700">No rooms available.</p>
        )}
      </div>
    </div>
  );
};

export default Rooms;
