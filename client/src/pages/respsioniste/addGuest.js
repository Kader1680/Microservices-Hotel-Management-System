import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

function AddGuest() {

  
const {user} = useAuth();
const isReceptionistt = user?.role === 'Receptionist'

const navigate = useNavigate()
const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        role: "",  
        email: "",
        password: "",
        phone_number: "",
      });
    

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/respsioniste/add-guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        navigate("/respsioniste/all-guest"); 
      } 
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>

{
            isReceptionistt ? (
             <div>
               <h1 className="text-2xl font-bold text-center">Add New Guest</h1>

 
<form onSubmit={handleRegister}>

<div className="bg-white p-4 rounded-lg shadow-md mb-6">
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
    <input
      type="text"
      placeholder="First Name"
      className="border p-2 rounded w-full"
      value={formData.first_name}
      onChange={handleChange}
      name="first_name"
      required
    />

    <input
      type="text"
      placeholder="Last Name"
      className="border p-2 rounded w-full"
      value={formData.last_name}
      name="last_name"
      onChange={handleChange}
    />


    <input
      type="email"
      placeholder="Email"
      className="border p-2 rounded w-full"
      value={formData.email}
      onChange={handleChange}
      name="email"
    />

    
    <input
      type="text"
      placeholder="phone_number"
      className="border p-2 rounded w-full"
      value={formData.phone_number}
      onChange={handleChange}
      name="phone_number"
    />
  

    <input
      type="password"
      placeholder="Password"
      name="password"
      className="border p-2 rounded w-full"
      value={formData.password}
      onChange={handleChange}
    />


  </div>
  <button
    type="submit"
    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
  >
    Add User
  </button>
</div>
</form>
             </div>
            ) : <div>

                <h1>Soory Page Not Found</h1>
            </div>
        }
        
       
      
    </div>
  )
}

export default AddGuest