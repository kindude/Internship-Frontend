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
import { ActionResponse } from '../types/ActionResponse';
import Modal from '../components/modal/Modal';


const UserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);
  const [requests, setRequests] = useState<ActionResponse[]>([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
};

const closeModal = () => {
    setIsModalOpen(false);
};


  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axiosInstance.get(`/action/requests/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(response.data.actions);
      openModal();
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const formikRef = useRef<FormikProps<FormValues>>(null);

  const handleEdit = async () => {
    navigate(`/users/update/${user?.id}`);
  };

  const cancelRequest = async (request_id:number, company_id:number) => {
    try {
      const token = localStorage.getItem('accessToken');
      const requestData = {
        id: request_id,
        user_id: user?.id, 
        company_id: company_id, 
        status: "PENDING",
        type_of_action: "REQUEST"
      };

      const response = await axiosInstance.post(`/action/request/cancel`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRequests();
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
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

  if (error) {
    return <p>{error}</p>
  }
  if (!user) {
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
        
        {requests.length > 0 && (
          <Modal windowName='Requests' isOpen={isModalOpen} onClose={closeModal}>
            <h2>My Requests</h2>
            <ul>
              {requests.map(request => (
                <li key={request.id}>
                  <h1>Company_id</h1><p>{request.company_id}</p>
                  <h1>Status</h1><p>{request.status}</p>
                  <Button text="Cancel" type="button" onClick={() => cancelRequest(request.id, request.company_id)}/>
                </li>
              ))}
             
            </ul>
            <Button text="Close" type='button' onClick={closeModal}/>
          </Modal>
        )}

        {currentUser && currentUser.id === user.id && (
          <div className="user-profile-actions">
            <Button text="Edit" type="submit" onClick={handleEdit} className="edit" />
            <Button text="Delete" type="submit" onClick={handleDelete} className="delete" />
            <Button text="My requests" type="button" onClick={fetchRequests} className='edit' />
          </div>
        )}


      </div>
    </div>
  );
};

export default UserPage;
