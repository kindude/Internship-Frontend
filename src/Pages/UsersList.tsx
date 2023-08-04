import React, { useEffect, useState } from "react";
import axiosInstance from "../api/api_instance";

interface User {
  username: string;
  email: string;
  password: string;
  city: string;
  country: string;
  phone: string;
  status: boolean;
  roles: string[];
}

const UsersListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users/all');
        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else if (typeof response.data === 'object' && response.data !== null) {
          const usersData: User[] = Object.values(response.data);
          setUsers(usersData);
        } else {
          console.error('Invalid response data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <div>Username: {user.username}</div>
            <div>Email: {user.email}</div>
            <div>City: {user.city}</div>
            <div>Country: {user.country}</div>
            <div>Phone: {user.phone}</div>
            <div>Status: {user.status ? 'Active' : 'Inactive'}</div>
            <div>Roles: {user.roles.join(', ')}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default UsersListPage;
