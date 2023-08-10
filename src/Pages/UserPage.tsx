import { useParams } from 'react-router-dom';
import axiosInstance from '../api/api_instance';
import React, { useEffect, useState, useRef } from "react";
import { User } from '../types/UserResponse';
import Button from "../components/layout/Button";
import { Formik, Form, ErrorMessage, FormikHelpers, FormikProps } from "formik";
import { FormValues } from './UserRegistration';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../types/types';
import { clearUser } from '../reducers/userReducer';
import "../styles/userPage.css";


const UserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);
  
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get<User>(`/users/${userId}`);
        if (response.status === 200) {
          setUser(response.data);
        }
        
      } catch (error) {
        setError("User not found");
      }
    };

    fetchUser();
  }, [userId]);


  const formikRef = useRef<FormikProps<FormValues>>(null);

  const handleEdit = async () => {
    navigate(`/users/update/${user?.id}`);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.delete(`/users/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        dispatch(clearUser());
        navigate("/welcome");
        window.location.reload();

      } else {
        console.error("Error deleting user:", response.data);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if(error){
    return <p>{error}</p>
  }
  if(!user){
    return <p>Loading user data...</p>
  }

  return (
    <div className="user-profile-container">
        <div>
          <div className="user-profile-header">
            <h1>User ID: {user.id}</h1>
            <p>{user.username}</p>
          </div>
          <div className="user-profile-details">
            <p>Email: {user.email}</p>
            <p>City: {user.city}</p>
            <p>Country: {user.country}</p>
            <p>Phone: {user.phone}</p>
          </div>
          {currentUser && currentUser.id === user.id && (
            <div className="user-profile-actions">
              <Button text="Edit" type="submit" onClick={handleEdit} className="edit" />
              <Button text="Delete" type="submit" onClick={handleDelete} className="delete" />
            </div>
          )}
        </div>
    </div>
  );
};

export default UserPage;
