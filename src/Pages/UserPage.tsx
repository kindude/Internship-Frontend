import { useParams } from 'react-router-dom';
import axiosInstance from '../api/api_instance';
import React, { useEffect, useState } from "react";
import { User } from '../types/UserResponse';
import Button from "../components/layout/Button";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/types';
import { clearUser } from '../reducers/userReducer';
import "../styles/userPage.css";
import { ActionResponse } from '../types/ActionResponse';
import Modal from '../components/modal/Modal';
import { cancelRequest_user } from '../api/actions/requests_user';
import { rejectInvite_user, acceptInvite_user } from '../api/actions/invites_user';
import { Company } from '../types/CompanyResponse';
import ListCompanies from '../components/layout/ListCompanies';
import { useNavigate } from "react-router-dom";
import Actions from '../components/layout/Actions';
import { Notification } from '../types/NotificationResponse';
import ListNotifications from '../components/layout/ListNotifications';
import { handleExport } from '../utils/handleExport';
import { LastQuizCompletion } from '../types/LastQuizCompletion';
import { ListLastQuizCompletion } from '../types/LastQuizCompletion';
import { Line } from 'react-chartjs-2';
import { fetchAnalytics } from '../utils/UserAverages';
import MyChart from '../components/layout/MyChart';



export const leaveCompany = async (company_id: number) => {
  const response = axiosInstance.post(`/action/leave_company/${company_id}`);
}

const UserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.user);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [requests, setRequests] = useState<ActionResponse[]>([]);
  const [invites, setInvites] = useState<ActionResponse[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isModalOpenReq, setIsModalOpenReq] = useState(false);
  const [isModalOpenInv, setIsModalOpenInv] = useState(false);
  const [isModalOpenCompanies, setIsModalOpenCompanies] = useState(false);
  const [isModalOpenNotifs, setIsModalOpenNotifs] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');
  const [lastQuizCompletions, setLastQuizCompletions] = useState<LastQuizCompletion[]>([]);
  const [chartData, setChartData] = useState<any | null>(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAnalytics(`/user/me/get-quizzes-averages`);
        setChartData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);


  useEffect(() => {
    const fetchLastQuizCompletions = async () => {
      try {
        const response = await axiosInstance.get<ListLastQuizCompletion>('/user/me/get-quizzes_and-times');
        if (response.status === 200) {
          setLastQuizCompletions(response.data.completions);
        }
      } catch (error) {
        console.error('Error fetching last quiz completions:', error);
      }
    };

    fetchLastQuizCompletions();
  }, []);

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

  const closeModal = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(false);
  };

  const fetchRequests = async () => {
    try {
      const response = await axiosInstance.get(`/action/requests/all`);
      setRequests(response.data.actions);
      openModalReq();
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const fetchInvites = async () => {
    try {
      const response = await axiosInstance.get(`/action/invites/all`);
      setInvites(response.data.actions);
      if (response.data.actions.length === 0) {
        alert("No invites available.");
      } else {
        openModalInv();
      }
    } catch (error) {
      console.error("Error fetching invites:", error);
    }
  };


  const openModalReq = () => {
    setIsModalOpenReq(true);
  };

  const openModalInv = () => {
    setIsModalOpenInv(true);
  };


  const fetchCompaniesImIn = async () => {
    try {
      const response = await axiosInstance.get("/companies/user/in");
      if (response.status === 200) {
        const companiesImIn = response.data.companies;
        setCompanies(companiesImIn);
        if (companiesImIn.length === 0) {
          alert("You are not in any companies .");
        }
        openModalCompanies();
      }
    } catch (error) {
      console.error("Error fetching companies I'm in:", error);
    }
  };

  const openModalNotifs = () => {
    setIsModalOpenNotifs(true);
  };

  const closeModalNotifs = () => {
    setIsModalOpenNotifs(false);
  };


  const fetchNotifications = async () => {
    try {

      const response = await axiosInstance.get("/user/notifications/get");
      if (response.status === 200) {
        const notifications = response.data;  
        setNotifications(notifications);
        if (notifications.length === 0) {
          alert("You don't have notifications .");
        }
        openModalNotifs();
      }

    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  }

  const openModalCompanies = () => {
    setIsModalOpenCompanies(true);
  };

  const handleEdit = () => {
    navigate(`/users/update/${user?.id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/users/${user?.id}`);
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

  const cancelRequest = async (request_id: number, company_id: number, user_id: number) => {
    cancelRequest_user(request_id, company_id, user_id);
    fetchRequests();
  };

  const acceptInvite = async (request_id: number, company_id: number, user_id: number) => {
    acceptInvite_user(request_id, company_id, user_id);
    fetchInvites();
  };

  const rejectInvite = async (request_id: number, company_id: number, user_id: number) => {
    rejectInvite_user(request_id, company_id, user_id);
    fetchInvites();
  };

  const handleExportFile = async () => {

    await handleExport(`/export/user-results/${userId}/${exportFormat}`, exportFormat, "user_results");

  };


  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading user data...</p>;
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

        {lastQuizCompletions.length > 0 && (
          <div className="last-quiz-completions">
            <h2>Last Quiz Completions</h2>
            <ul>
              {lastQuizCompletions.map((completion, index) => (
                <li key={index}>
                  Quiz ID: {completion.quiz_id}, Last Completion Time: {completion.last_completion_time}
                </li>
              ))}
            </ul>
          </div>
        )}

        {requests.length > 0 && (
          <Actions
            list={requests}
            text="My Requests"
            isModalOpen={isModalOpenReq}
            closeModal={() => closeModal(setIsModalOpenReq)}
            cancel={cancelRequest}
          >
            {(actionId, companyId, userId) => (
              <div>
                <h1>Company_id</h1>
                <p>{companyId}</p>
                <h1>Status</h1>
                <p>{status}</p>
                <Button
                  text="Cancel"
                  type="button"
                  onClick={() => cancelRequest(actionId, companyId, userId)}
                />
              </div>
            )}
          </Actions>
        )}

        {invites.length > 0 && (
          <Actions
            list={invites}
            text="My Invites"
            isModalOpen={isModalOpenInv}
            closeModal={() => closeModal(setIsModalOpenInv)}
          >
            {(actionId, companyId, userId) => (
              <div>
                <h1>Company_id</h1>
                <p>{companyId}</p>
                <h1>Status</h1>
                <p>{status}</p>
                <Button
                  text="Accept"
                  type="button"
                  onClick={() => acceptInvite(actionId, companyId, userId)}
                />
                <Button
                  text="Reject"
                  type="button"
                  onClick={() => rejectInvite(actionId, companyId, userId)}
                />
              </div>
            )}
          </Actions>
        )}

        {companies.length > 0 && (
          <Modal
            windowName="Companies I'm In"
            isOpen={isModalOpenCompanies}
            onClose={() => closeModal(setIsModalOpenCompanies)}
          >
            <h2>Companies I'm In</h2>
            <ListCompanies list={companies} user={user} showLink={false} showLeave={true} />
            <Button text="Close" type="button" onClick={() => closeModal(setIsModalOpenCompanies)} />
          </Modal>
        )}

        {notifications.length > 0 && (
          <Modal
            windowName="Notifications"
            isOpen={isModalOpenNotifs}
            onClose={() => closeModal(setIsModalOpenNotifs)}
          >
            <h2>My notifications</h2>
            <ListNotifications list={notifications} />
            <Button text="Close" type="button" onClick={() => closeModal(closeModalNotifs)} />
          </Modal>
        )}

        {currentUser && currentUser.id === user.id && (
          <div className="user-profile-actions">
            <Button text="Edit" type="submit" onClick={handleEdit} className="edit" />
            <Button text="Delete" type="submit" onClick={handleDelete} className="delete" />
            <Button text="My requests" type="button" onClick={fetchRequests} className='edit' />
            <Button text="My invites" type="button" onClick={fetchInvites} className='edit' />
            <Button text="Companies I'm in" type="button" onClick={fetchCompaniesImIn} className='edit' />
            <Button type="button" text="Export JSON" onClick={() => setExportFormat('json')}/>
            <Button type="button" text="Export CSV" onClick={() => setExportFormat('csv')}/>
            <Button type="button" text="Export Data"onClick={handleExportFile}/>
            <Button type="button" text="My Notifications" onClick={fetchNotifications}/>

          </div>
        )}
      </div>

      <div>
      <h1>Мой график по квизам</h1>

      {chartData && (
        <MyChart chartData={chartData}/>
      )}
    </div>
    </div>
  );
};

export default UserPage;
