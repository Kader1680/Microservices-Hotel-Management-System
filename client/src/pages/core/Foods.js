import React, { useState, useEffect } from "react";
import axios from "axios";

const Food = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch food items from the API
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8002/api/foods");
        setFoodItems(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch food items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Food Menu</h1>

      {/* Display error message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Loading state */}
      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : (
        /* Food Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={food.image ? `http://127.0.0.1:8000/storage/${food.image}` : "https://via.placeholder.com/300x200?text=No+Image"}
                alt={food.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{food.name}</h2>
                <p className="text-gray-600 mb-4">{food.description}</p>
                <p className="text-lg font-bold text-blue-500">${food.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Food;