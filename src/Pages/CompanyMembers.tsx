import { useParams } from 'react-router-dom';
import axiosInstance from '../api/api_instance';
import { User } from '../types/UserResponse';
import { useEffect, useState } from 'react';
import ListUsers from '../components/layout/ListUsers';
import Button from '../components/layout/Button';



export const remove_member = async (companyId: number, userId: number) => {
  try {
    const response = await axiosInstance.post(`/companies/${companyId}/remove_user/${userId}`);
  } catch (error) {
    console.log(error);
  }

}

export const makeAdmin = async (company_id:number, user_id:number) => {
  try {
    const response = await axiosInstance.put(`/companies/${company_id}/add_admin/${user_id}`);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

export const removeAdmin = async (company_id:number, user_id:number) => {
  try {
    const response = await axiosInstance.put(`/companies/${company_id}/remove_admin/${user_id}`);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

const CompanyMembersPage: React.FC = () => {
  const { companyId } = useParams<{ companyId?: string }>();
  const [companyMembers, setCompanyMembers] = useState<User[]>([]);

  const fetchCompanyMembers = async () => {
    try {
      const response = await axiosInstance.get(`/companies/${companyId}/members`);
      if (response.status === 200) {
        setCompanyMembers(response.data.users);

      }
    } catch (error) {
    }
  };

  const fetchCompanyAdmins = async () => {
    try {
      const response = await axiosInstance.get(`/companies/${companyId}/members`);
      if (response.status === 200) {
        setCompanyMembers(response.data.users);

      }
    } catch (error) {
    }
  };


  useEffect(() => {
    if (companyId) {

      fetchCompanyMembers();
    }
  }, [companyId]);



  return (
    <div>
      <h1>Users</h1>
      <ListUsers list={companyMembers} show={false} companyId={Number(companyId)} admin={true} />
    </div>
  )
};

export default CompanyMembersPage;