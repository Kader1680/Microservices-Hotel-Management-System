import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

function SelectPayment() {
  const [paymentMethod, setPaymentMethod] = useState("dahabia");
  const { BookingId } = useParams();
  const bookingId = parseInt(BookingId);
  console.log(bookingId);

  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);

  const [formData, setFormData] = useState({
    card_number: "",
    cle_code: "",
    check_image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitPayment = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`hhtp://localhost:3000/select-payment/17`, {
        id_user: user.id,
        id_booking: 2,
        amount: 100.0,
        payment_method: paymentMethod === "dahabia" ? "cart dahabia" : "check versement",
        ...formData,
      });

      if (response.status === 201) {
        navigate("/");
      } else {
        navigate(`/select-payment/${bookingId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>

      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-l-md ${
            paymentMethod === "dahabia" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setPaymentMethod("dahabia")}
        >
          Cart Dahabia
        </button>
        <button
          className={`px-4 py-2 rounded-r-md ${
            paymentMethod === "versement" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setPaymentMethod("versement")}
        >
          Check Versement
        </button>
      </div>

      <form onSubmit={handleSubmitPayment}>
        {paymentMethod === "dahabia" ? (
          <div>
            <label className="block text-sm font-medium mb-1">Card Number</label>
            <input
              type="text"
              name="card_number"
              value={formData.card_number}
              onChange={handleChange}
              placeholder="Enter your Dahabia card number"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:bg-gray-100"
            />

            <label className="block text-sm font-medium mb-1">Key Code</label>
            <input
              type="text"
              name="cle_code"
              value={formData.cle_code}
              onChange={handleChange}
              placeholder="Enter Key (Password)"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:bg-gray-100"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1">Upload Check Image</label>
            <input
              type="file"
              name="check_image"
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
            />
          </div>
        )}

        <button type="submit" className="px-4 py-2 mt-3 rounded-md bg-green-500 text-white">
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default SelectPayment;
