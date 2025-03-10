import React from 'react';
import { useAuth } from '../../context/AuthContext';

function Dashboard() {
  const { user } = useAuth(); 
  const isAdmin = user?.role === 'admin'; 
  console.log(user?.role);  

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {isAdmin ? (
        <div className="flex flex-col md:flex-row w-full">
          {/* Sidebar */}
          <aside className="bg-[#0F172B] text-white w-full md:w-64">
            <div className="p-4">
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <nav className="mt-4">
              <a href="/admin" className="block py-2 px-4 hover:bg-blue-700">Admin Panel</a>
              <a href="/admin/add-room" className="block py-2 px-4 hover:bg-blue-700">Rooms Actions</a>
              <a href="/admin/user-management" className="block py-2 px-4 hover:bg-blue-700">User Management</a>
              <a href="#" className="block py-2 px-4 hover:bg-blue-700">Profile</a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Cards */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Total Users</h2>
                <p className="text-gray-700">1,234</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Revenue</h2>
                <p className="text-gray-700">$12,345</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Active Projects</h2>
                <p className="text-gray-700">45</p>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr key="12345">
                      <td className="px-6 py-4">#12345</td>
                      <td className="px-6 py-4">John Doe</td>
                      <td className="px-6 py-4">$199.99</td>
                      <td className="px-6 py-4 text-green-500">Completed</td>
                    </tr>
                    <tr key="12346">
                      <td className="px-6 py-4">#12346</td>
                      <td className="px-6 py-4">Jane Smith</td>
                      <td className="px-6 py-4">$299.99</td>
                      <td className="px-6 py-4 text-yellow-500">Pending</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-screen">
          <h2 className="text-2xl font-semibold text-red-500">Not Found</h2>
        </div>
      )}
    </div>
  );
}

export default Dashboard;