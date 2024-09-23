import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Needs Updates Not showing the users not being returned and Admin authentication issues
const AdminViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3002/auth/users", {
          headers: { adminAccessToken: sessionStorage.getItem("adminAccessToken") }
        });
        if (!response.data) {
          throw new Error('Failed to fetch users');
        }
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin View Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>Username:</strong> {user.username}, <strong>Email:</strong> {user.email}, <strong>Age:</strong> {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminViewUsers;