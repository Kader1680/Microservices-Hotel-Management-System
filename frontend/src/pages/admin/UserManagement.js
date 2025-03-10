import axios from "axios";
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function UserManagement() {


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
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        navigate("/admin"); 
      } 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [employers, setemployers] = useState([])

  
  useEffect( () => {

const getEmployers = async () => {

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/admin/user-management/all-employers');
    const allEmployers = response.data;
    setemployers(allEmployers.employers);
    console.log(allEmployers)
    
  } catch (error) {
    console.error('Error fetching employers:', error);
  }

}

getEmployers();
 
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

  

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
        <select
            className="border p-2 rounded w-full"
            name="role"
            value={formData.role}
            onChange={handleChange}  // Correct usage
          >
            <option value="">Select Role</option>
            <option value="Housekeeper">Housekeeping</option>
            <option value="Receptionist">Receptionist</option>
            <option value="restaurate">Food Manager</option>
            <option value="Fitness">Sport Manager</option>
            <option value="Security">Agent Security</option>
            <option value="Store">Store Staff</option>
        </select>


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
      

     
      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No users added yet.
                </td>
              </tr>
            ) : (
              employers.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="border p-2">{user.id}</td>
                  <td className="border p-2">{user.first_name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2">
                    <button
                      // onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
