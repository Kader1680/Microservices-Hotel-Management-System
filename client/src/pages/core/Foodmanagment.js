import React, { useState, useEffect } from "react";
import axios from "axios";

const FoodManagement = () => {
  const [foods, setFoods] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: null, // Add image field
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all foods on component mount
  useEffect(() => {
    fetchFoods();
  }, []);

  // Fetch all foods from the API
  const fetchFoods = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/foods");
      setFoods(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch food items.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for text and number fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Store the selected file
    });
  };

  // Add or update food item
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create FormData object to handle file upload
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    if (formData.image) {
      data.append("image", formData.image); // Append the image file
    }

    try {
      if (isEditing) {
        // Update existing food item
        await axios.post(`http://127.0.0.1:8002/api/foods/${formData.id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        });
      } else {
        // Add new food item
        await axios.post("http://127.0.0.1:8001/api/foods", data, {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        });
      }
      fetchFoods(); // Refresh the list
      setFormData({ id: "", name: "", description: "", price: "", image: null }); // Reset form
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError("Failed to save food item.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Edit food item
  const handleEdit = (food) => {
    setFormData({
      id: food.id,
      name: food.name,
      description: food.description,
      price: food.price,
      image: null, // Reset image when editing
    });
    setIsEditing(true);
  };

  // Delete food item
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/foods/${id}`);
      fetchFoods(); // Refresh the list
      setError("");
    } catch (err) {
      setError("Failed to delete food item.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Food Management</h1>

      {/* Display error message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Food Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Food Item" : "Add Food Item"}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg"
            accept="image/*" // Accept only image files
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? "Processing..." : isEditing ? "Update Food" : "Add Food"}
          </button>
        </div>
      </form>

      {/* Food List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Food List</h2>
        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : foods.length === 0 ? (
          <p className="text-gray-500">No food items added yet.</p>
        ) : (
          <div className="space-y-4">
            {foods.map((food) => (
              <div
                key={food.id}
                className="p-4 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{food.name}</h3>
                  <p className="text-gray-600">{food.description}</p>
                  <p className="text-gray-800">${food.price}</p>
                  {food.image && (
                    <img
                      src={`http://127.0.0.1:8002/storage/${food.image}`}
                      alt={food.name}
                      className="w-24 h-24 object-cover mt-2"
                    />
                  )}
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(food)}
                    disabled={loading}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 disabled:bg-yellow-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(food.id)}
                    disabled={loading}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 disabled:bg-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodManagement;