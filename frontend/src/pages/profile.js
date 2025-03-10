// src/Profile.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>Profile</h1>
            <p>Welcome, {user?.name}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Profile;