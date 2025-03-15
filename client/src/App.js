import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Navbar from './components/Navbar';
import Profile from './pages/profile';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
 
import Rooms from "./pages/core/Rooms";
import Dashboard from "./pages/admin/dashboard";
import AddRoom from "./pages/admin/addRoom";
import Home from './pages/Home';
import Order from './pages/core/Order';
import Booking from './pages/core/Booking';
import SelectPayment from './pages/payement/selectPayement';
import UserManagement from './pages/admin/UserManagement';
import Roomdetail from './pages/core/roomDetail';
// import Respsioniste from './pages/respsioniste/Respsioniste';
import AddGuest from './pages/respsioniste/addGuest';
import AllGuest from './pages/respsioniste/allGuest';
import ChooseRoom from './pages/respsioniste/chooseRoom';
 
 
// import Bookingres from './pages/respsioniste/Booking';
import Bookingrecepsionist from './pages/respsioniste/Bookingrecepsionist';
import AllBookings from './pages/respsioniste/allBookingGuest';
import Chat from './pages/core/chat';
import Foodmanagement from './pages/core/Foodmanagment';
import Food from './pages/core/Foods';

function App() {
  return (
    <AuthProvider> {/* Wrap with AuthProvider */}
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/Select-payment/:BookingId" element={<SelectPayment />} />

          <Route path="/message/:receiverId" element={<Chat />} />

        
          {/* <Route path="/respsioniste" element={<Respsioniste />} /> */}
          <Route path="/respsioniste/add-guest" element={<AddGuest />} />
          <Route path="/respsioniste/all-guest" element={<AllGuest />} />
          <Route path="/respsioniste/choose-room" element={<ChooseRoom />} />
          <Route path="/respsioniste/bookings" element={<AllBookings />} />

          <Route path="/respsioniste/choose-room/:id" element={<Bookingrecepsionist />} />
          
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:id" element={<Roomdetail/>} />
          <Route path="/orders" element={<Order />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/add-room" element={<AddRoom />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/food-man" element={<Foodmanagement />} />
          <Route path="/food" element={<Food />} />
          
          
          
          
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
