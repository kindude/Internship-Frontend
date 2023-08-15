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
import { cancelRequest_user } from '../api/actions/requests_user';
import { rejectInvite_user, acceptInvite_user } from '../api/actions/invites_user';


const UserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);
  const [requests, setRequests] = useState<ActionResponse[]>([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invites, setInvites] = useState<ActionResponse[]>([]);


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

  const fetchInvites = async () => {
    try{
      const token = localStorage.getItem('accessToken');
      const response = await axiosInstance.get(`/action/invites/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInvites(response.data.actions);
      openModal();
    } catch(error){
      console.error("Error fetching invites:", error);
    }
  }

  const formikRef = useRef<FormikProps<FormValues>>(null);

  const handleEdit = async () => {
    navigate(`/users/update/${user?.id}`);
  };

  const cancelRequest = async (request_id:number, company_id:number, user_id:number) => {
    
    cancelRequest_user(request_id, company_id, user_id);
    fetchRequests();
  }

  const acceptInvite = async (request_id:number, company_id:number, user_id:number) => {
    acceptInvite_user(request_id, company_id, user_id);
    fetchInvites();
  }

  const rejectInvite = async (request_id:number, company_id:number, user_id:number) => {
    rejectInvite_user(request_id, company_id, user_id);
    fetchInvites();
  }

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
                  <Button text="Cancel" type="button" onClick={() => cancelRequest(request.id, request.company_id, request.user_id)}/>
                </li>
              ))}
             
            </ul>
            <Button text="Close" type='button' onClick={closeModal}/>
          </Modal>
        )}
        {invites.length > 0  && (
          <Modal windowName='Invites' isOpen={isModalOpen} onClose={closeModal}>
            <h2>My Requests</h2>
            <ul>
              {invites.map(invite => (
                <li key={invite.id}>
                  <h1>Company_id</h1><p>{invite.company_id}</p>
                  <h1>Status</h1><p>{invite.status}</p>
                  <Button text="Accept" type="button" onClick={() => acceptInvite(invite.id, invite.company_id, invite.user_id)}/>
                  <Button text="Reject" type="button" onClick={() => rejectInvite(invite.id, invite.company_id, invite.user_id)}/>
                  <Button text="Close Window" type="button" onClick={closeModal}/>
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
            <Button text="My invites" type="button" onClick={fetchInvites} className='edit'/>
          </div>
        )}


      </div>
    </div>
  );
};

export default UserPage;
