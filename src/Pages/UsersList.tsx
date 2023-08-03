import React, { useEffect, useState } from "react";
import axiosInstance from "../api/api_instance";

interface User {
  username: string;
  email: string;
  password: string;
  city: string;
  country: string;
  phone: string,
  status:string,
  roles: []
}

const UsersListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users/all");
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else if (typeof response.data === "object" && response.data !== null) {

          const usersData: User[] = Object.values(response.data);
          setUsers(usersData);
        } else {
          console.error("Invalid response data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="page-title">Users List</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.email}>
            {user.username} - {user.email} - {user.city}, {user.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersListPage;
