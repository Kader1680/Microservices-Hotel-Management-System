import React, { useState } from "react";

const Order = () => {
  const [userId, setUserId] = useState(1); // Replace with actual user ID from auth
  const booking = {
    id: 1,
    title: "Luxury Suite",
    price: 200,
    image: "https://source.unsplash.com/400x300/?hotel,room",
    nights: 3, // Example booking duration
  };

  const totalPrice = booking.price * booking.nights;

  const handlePayment = () => {
    console.log("Processing payment for:", { userId, booking });
    alert("Payment successful! Your order is confirmed.");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Order Summary</h2>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img src={booking.image} alt={booking.title} className="w-full h-60 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{booking.title}</h3>
          <p className="text-gray-600 mt-2">Price per Night: ${booking.price}</p>
          <p className="text-gray-600">Nights: {booking.nights}</p>
          <p className="text-gray-700 font-semibold mt-2">Total: ${totalPrice}</p>
          <p className="text-gray-700 mt-2">User ID: {userId}</p>
          <button
            onClick={handlePayment}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md w-full"
          >
            Pay Now / Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;