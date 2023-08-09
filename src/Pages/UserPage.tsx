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

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : user ? (
        <div>
          <h1>User ID: {user.id}</h1>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>City: {user.city}</p>
          <p>Country: {user.country}</p>
          <p>Phone: {user.phone}</p>
          
          {currentUser && currentUser.id === user.id && (
            <Button text="Edit" type="submit" onClick={handleEdit} />
          )}
          {currentUser && currentUser.id === user.id && (
            <Button text="Delete" type="submit" onClick={handleDelete} />
          )}

        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserPage;
