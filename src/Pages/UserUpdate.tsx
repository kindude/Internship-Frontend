import { Navigate, useParams } from 'react-router-dom';
import { User } from '../types/UserResponse';
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/api_instance";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const UserUpdatePage: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get<User>(`/users/${userId}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);
  
    const handleSubmit = async (values: { username: string; password: string }) => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('Access token not found. Please log in.');
          return;
        }
  
        const updatedUser = {
          ...user,
          username: values.username,
          password: values.password,
        };
  
        const response = await axiosInstance.put(`/users/${userId}`, updatedUser, {
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
        {loading ? (
          <p>Loading user data...</p>
        ) : (
          <div>
            <h1>User ID: {user?.id || ""}</h1>
            <Formik
              initialValues={{ username: user?.username || "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div>
                    <label>Username:</label>
                    <Field type="text" name="username" />
                    <ErrorMessage name="username" component="div" />
                  </div>
                  <div>
                    <label>Email:</label>
                    <input type="email" value={user?.email || ""} readOnly />
                  </div>
                  {/* Add other input fields for additional information, password, avatar, etc. */}
                  <div>
                    <label>Password:</label>
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                  </div>
                  <button type="submit">Update</button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    );

};
  export default UserUpdatePage;
  