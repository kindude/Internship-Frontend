import { useParams } from 'react-router-dom';
import axiosInstance from '../api/api_instance';
import React, { useEffect, useState, useRef } from "react";
import  {User} from '../types/UserResponse';
import Button from "../components/layout/Button";
import { Formik, Form, ErrorMessage, FormikHelpers, FormikProps } from "formik";
import { FormValues } from './UserRegistration';
import { useNavigate } from "react-router-dom";



const UserPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get<User>(`/users/${userId}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
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

            navigate("/usersList");
          } else {
            console.error("Error deleting user:", response.data);
          }
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      };
  
    return (
      <div>
        {user ? (
          <div>
            <h1>User ID: {user.id}</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            {/* Display other user information as needed */}
            <Button text="Edit" type="submit" onClick={handleEdit}/>
            <Button text="Delete" type="submit" onClick={handleDelete}/>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

      
      </div>
    );
  };
  
  export default UserPage;
  