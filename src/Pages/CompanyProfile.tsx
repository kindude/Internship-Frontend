import React, { useState, useEffect} from "react";
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




const CompanyProfilePage: React.FC = () => {

  const { companyId } = useParams<{ companyId: string }>();
  const user = useSelector((state: RootState) => state.user.user);
  const [company, setCompany] = useState<Company | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [requestStatus, setRequestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [requests, setRequests] = useState<ActionResponse[]>([]);
  const [invites, setInvites] = useState<ActionResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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


  const fetchRequests = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get(`/companies/${companyId}/requests/all`);
      setRequests(response.data.actions);
      openModal();
    } catch (error) {
      console.error('Error fetching requests:', error);
    }

  }

  const fetchInvites = async () => {
    const token = localStorage.getItem("accessToken");


    try {
      const response = await axiosInstance.get(`/companies/${companyId}/invites/all`,{
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


  const inviteToCompany = async () => {
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
        `/action/invite/create`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setRequestStatus('success'); // Request successful
      } else {
        setRequestStatus('error'); // Request failed
      }
    } catch (error) {
      setRequestStatus('error'); // Request failed
    }
  };

  const members = (company_id:number) => {
    navigate(`/company-members/${company_id}`);
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
          onClick={inviteToCompany}
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


        {requests.length > 0 && (
          <Modal windowName='Requests' isOpen={isModalOpen} onClose={closeModal}>
            <h2>My Requests</h2>
            <ul>
              {requests.map(request => (
                <li key={request.id}>
                  <h1>Company_id</h1><p>{request.company_id}</p>
                  <h1>Status</h1><p>{request.status}</p>
                  <Button text="Accept" type="button" onClick={() => acceptRequest(request.id,request.company_id, request.user_id)} />
                  <Button text="Reject" type="button" onClick={() => rejectRequest(request.id, request.company_id, request.user_id)} />
                  <Button text="Close" type="button" onClick={closeModal} />
                </li>
              ))}

            </ul>
            <Button text="Close" type='button' onClick={closeModal} />
          </Modal>
        )}
        {invites.length > 0 && (
          <Modal windowName='Invites' isOpen={isModalOpen} onClose={closeModal}>
            <h2>My Requests</h2>
            <ul>
              {invites.map(invite => (
                <li key={invite.id}>
                  <h1>Company_id</h1><p>{invite.company_id}</p>
                  <h1>Status</h1><p>{invite.status}</p>
                 
                  <Button text="Close Window" type="button" onClick={closeModal} />
                </li>
              ))}

            </ul>
            <Button text="Close" type='button' onClick={closeModal} />
          </Modal>
        )}

      </div>

    </div>
  );
};

export default CompanyProfilePage;