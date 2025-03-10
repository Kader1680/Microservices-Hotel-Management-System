import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';

function AllGuest() {
    const [employers, setemployers] = useState([])

  
    const {user} = useAuth();
    const isReceptionistt = user?.role === 'Receptionist'
    
    useEffect( () => {
  
  const getEmployers = async () => {
  
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/respsioniste/all-guest');
      const allEmployers = response.data;
      setemployers(allEmployers);
      console.log(allEmployers)
      
    } catch (error) {
      console.error('Error fetching employers:', error);
    }
  
  }
  
  getEmployers();
   
    }, [])
  return (
    
    <div>  
        {
            isReceptionistt ? (
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
            ) : <div>

                <h1>Soory Page Not Found</h1>
            </div>
        }
       
  
  
    </div>
  )
}

export default AllGuest