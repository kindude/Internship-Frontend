import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../types/types";
import axiosInstance from "../api/api_instance";
import { Company } from "../types/CompanyResponse";
import { Formik, Form, FormikHelpers } from "formik";
import Input from "../components/layout/Input";
import Button from "../components/layout/Button";
import { useNavigate } from "react-router-dom";
import { ActionResponse } from "../types/ActionResponse";
import Modal from "../components/modal/Modal";
import { acceptRequest_company, rejectRequest_company } from "../api/actions/requests_company";
import ListActions from "../components/layout/ListActions";
import Actions from "../components/layout/Actions";




const CompanyProfilePage: React.FC = () => {

  const { companyId } = useParams<{ companyId: string }>();
  const user = useSelector((state: RootState) => state.user.user);
  const [company, setCompany] = useState<Company | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [requestStatus, setRequestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [requests, setRequests] = useState<ActionResponse[]>([]);
  const [invites, setInvites] = useState<ActionResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenReq, setIsModalOpenReq] = useState(false);

  const navigate = useNavigate();

  const fetchCompany = async () => {
    try {
      const response = await axiosInstance.get<Company>(`/companies/${companyId}`);
      setCompany(response.data);
      if (response.status === 404) {
        setError('Company not found');
      }
    } catch (error) {
      setError('Company not found');
      console.error('Error fetching company:', error);
    }
  };

  useEffect(() => {


    fetchCompany();
  }, [companyId]);


  const handleFormUpdate = () => {
    navigate(`/companies/update/${company?.id}`)

  }


  const handleFormDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");


      const response = await axiosInstance.post(`/companies/${companyId}`, company);

      if (response.status === 200) {
        console.log("Company deleted successfully");
        navigate("/companies");
        window.location.reload();
      } else {
        setError('Company not found');
        console.error("Error deleting company:", response.data);
      }
    } catch (error) {
      setError('Company not found');
    }
  };

  const openModalReq = () => {
    setIsModalOpenReq(true);
  };

  const closeModalReq = () => {
    setIsModalOpenReq(false);
  };


  const fetchRequests = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get(`/companies/${companyId}/requests/all`);
      setRequests(response.data.actions);
      openModalReq();
    } catch (error) {
      console.error('Error fetching requests:', error);
    }

  }

  const fetchInvites = async () => {
    const token = localStorage.getItem("accessToken");


    try {
      const response = await axiosInstance.get(`/companies/${companyId}/invites/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInvites(response.data.actions);
      openModal();

    } catch (error) {
      console.error('Error fetching invites:', error);
    }

  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const acceptRequest = async (request_id: number, company_id: number, user_id: number) => {
    acceptRequest_company(request_id, company_id, user_id);
    fetchRequests();
  }

  const rejectRequest = async (request_id: number, company_id: number, user_id: number) => {
    rejectRequest_company(request_id, company_id, user_id);
    fetchRequests();
  }


  const requestToCompany = async () => {
    try {
      setRequestStatus('loading');
      const token = localStorage.getItem('accessToken');
      const requestData = {
        user_id: user?.id,
        company_id: company?.id,
        status: "PENDING",
        type_of_action: "REQUEST"
      };
      const response = await axiosInstance.post(
        `/action/request/create`,
        requestData
      );

      if (response.status === 200) {
        setRequestStatus('success');
        alert("Request has been sent");
      } else {
        setRequestStatus('error'); // Request failed
      }
    } catch (error) {
      setRequestStatus('error'); // Request failed
    }
  };



  const cancelInvite = async (actionId: number, companyId: number, userId: number) => {
    const requestData = {
      user_id: user?.id,
      company_id: company?.id,
      status: "PENDING",
      type_of_action: "INVITE"
    };

    const response = await axiosInstance.post(
      `/action/invite/cancell`,
      requestData
    );

  };

  const members = (company_id: number) => {
    navigate(`/company-members/${company_id}`);
  };

  const quizzes = (company_id:number) => {
    navigate(`/company/${company_id}/quizzes`);
  };
  
  const admins = (company_id: number) => {
    navigate(`/company-admins/${company_id}`);
  };

  if (error) {
    return <p>{error}</p>
  }

  if (!company) {
    return <p>Loading company data...</p>
  }

  return (
    <div>
      <div>
        {company.owner_id != user?.id && (<Button
          onClick={requestToCompany}
          text="Request to join the company"
          type="button"
          disabled={requestStatus === 'loading' || requestStatus === 'success'}
        />)}


        <h1>Company ID: {company?.id}</h1>
        <p>Name: {company?.name}</p>
        <p>Description: {company?.description}</p>
        <p>City: {company?.city}</p>
        <p>Country: {company?.country}</p>
        <p>Site: {company?.site}</p>

        {user && user.id === company?.owner_id && (
          <Button text="Edit" type="submit" onClick={handleFormUpdate} />
        )}
        {user && user.id === company?.owner_id && (
          <Button text="Delete" type="submit" onClick={handleFormDelete} />
        )}
        {user && user.id === company?.owner_id && (
          <Button text="Company requests" type="button" onClick={fetchRequests} className='edit' />
        )}
        {user && user.id === company?.owner_id && (
          <Button text="Company invites" type="button" onClick={fetchInvites} className='edit' />
        )}
        {user && user.id === company?.owner_id && (
          <Button text="MEMBERS" type="button" className='edit' onClick={() => members(company?.id)} />
        )}
        {user && user.id === company?.owner_id && (
          <Button text="Admins" type="button" className='edit' onClick={() => admins(company?.id)} />
        )}
        <Button text="Quizzes" type="button" className="edit" onClick={() => quizzes(company?.id)} />




        {requests.length > 0 && (
          <Actions
            list={requests}
            text="My Requests"
            isModalOpen={isModalOpenReq}
            closeModal={closeModalReq}
            accept={acceptRequest}
            reject={rejectRequest}
          >
            {(actionId, companyId, userId) => (
              <div>
                <Button
                  text="Accept"
                  type="button"
                  onClick={() => acceptRequest(actionId, companyId, userId)}
                />
                <Button
                  text="Reject"
                  type="button"
                  onClick={() => rejectRequest(actionId, companyId, userId)}
                />
              </div>
            )}
          </Actions>
        )}

        {invites.length > 0 && (
          <Actions
            list={invites}
            text="My Invites"
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            cancel={cancelInvite}
          >
            {(actionId, companyId, userId) => (
              <div>
                <Button
                  text="Cancel"
                  type="button"
                  onClick={() => cancelInvite(actionId, companyId, userId)}
                />
              </div>
            )}
          </Actions>
        )}

      </div>

    </div>
  );
};

export default CompanyProfilePage;