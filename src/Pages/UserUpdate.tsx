import { Navigate, useParams} from 'react-router-dom';
import {User} from '../types/UserResponse';
import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../api/api_instance";
import { useNavigate } from "react-router-dom";



const UserUpdatePage: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [formData, setFormData] = useState({
    // Add other fields you want to edit
    username: "",
    email: "",
    // Add more fields as needed
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get<User>(`/users/${userId}`);
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Access token not found. Please log in.');
        return;
      }

      const response = await axiosInstance.put(`/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
        },
      });

      // Check the response and handle accordingly
      if (response.status === 200) {
        navigate(`/users/${userId}`);
      } else {
        console.error('Error updating user:', response.data);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>User ID: {user.id || ""}</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {/* Add other input fields for additional information, password, avatar, etc. */}
            <button type="submit">Update</button>
          </form>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserUpdatePage;
