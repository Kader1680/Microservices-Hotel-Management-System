import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRoom() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    price: "",
    max_occupation: "",
    image: null, // Store the file object, not a string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const addroom = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("max_occupation", formData.max_occupation);
      formDataToSend.append("image", formData.image);

      const response = await fetch("http://127.0.0.1:8000/api/admin/add-room", {
        method: "POST",
        body: formDataToSend, 
      });

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      navigate("/admin/add-room");
      console.error(error);
    }
  };

 
  const rooms = [
    {
      id: 1,
      name: "Conference Room A",
      capacity: 20,
      status: "Available",
    },
    {
      id: 2,
      name: "Meeting Room B",
      capacity: 10,
      status: "Occupied",
    },
    {
      id: 3,
      name: "Training Room C",
      capacity: 50,
      status: "Available",
    },
    {
      id: 4,
      name: "Board Room D",
      capacity: 15,
      status: "Under Maintenance",
    },
    {
      id: 5,
      name: "Lounge Room E",
      capacity: 30,
      status: "Available",
    },
    {
      id: 6,
      name: "Private Room F",
      capacity: 5,
      status: "Occupied",
    },
  ];


  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "Editor",
      status: "Active",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Eva Green",
      email: "eva.green@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 7,
      name: "Frank White",
      email: "frank.white@example.com",
      role: "Editor",
      status: "Inactive",
    },
    {
      id: 8,
      name: "Grace Hall",
      email: "grace.hall@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 9,
      name: "Henry Wilson",
      email: "henry.wilson@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 10,
      name: "Ivy Clark",
      email: "ivy.clark@example.com",
      role: "Editor",
      status: "Active",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="bg-[#0F172B] text-white w-full md:w-64">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <nav className="mt-4">
         <a href="/admin" class="block py-2 px-4 hover:bg-blue-700">Admin Panel</a>
          
          <a href="/admin/add-room" className="block py-2 px-4 hover:bg-blue-700">Rooms Actions</a>
         <a href="/admin/user-management" class="block py-2 px-4 hover:bg-blue-700">User Management</a>
         
          <a href="#" className="block py-2 px-4 hover:bg-blue-700">Settings</a>
          <a href="#" className="block py-2 px-4 hover:bg-blue-700">Profile</a>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Room</h2>

            <form onSubmit={addroom} encType="multipart/form-data">
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Luxury Suite"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Room Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled>Select Room Type</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite</option>
                  <option value="Family">Family</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price per Night ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="200"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="max_occupation" className="block text-sm font-medium text-gray-700">Max Occupation</label>
                <input
                  type="number"
                  id="max_occupation"
                  name="max_occupation"
                  placeholder="4"
                  value={formData.max_occupation}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Room Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Room
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="p-4">
          <hr></hr>
          <h2 className="text-2xl text-center font-bold mb-4">Rooms Actions & Controls</h2>
          <hr></hr>
          
          <div className="overflow-x-auto mt-10">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Room Name</th>
              <th className="py-2 px-4 border-b">Capacity</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{room.name}</td>
                <td className="py-2 px-4 border-b">{room.capacity}</td>
                <td className="py-2 px-4 border-b">{room.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    // onClick={() => onEdit(room.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    // onClick={() => onView(room.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
        </div>

        <div className="p-4">
        <hr></hr>
          <h2 className="text-2xl text-center font-bold mb-4">User Actions & Controls</h2>
          <hr></hr>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    // onClick={() => onDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Delete
                  </button>
                  {/* <button
                    // onClick={() => onDeactivate(user.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>




      </main>
    </div>
  );
}

export default AddRoom;
