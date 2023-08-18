import { useParams } from 'react-router-dom';
import axiosInstance from '../api/api_instance';
import { User } from '../types/UserResponse';
import { useEffect, useState } from 'react';
import ListUsers from '../components/layout/ListUsers';
import Button from '../components/layout/Button';


const CompanyAdminsPage: React.FC = () => {
  const { companyId } = useParams<{ companyId?: string }>();
  const [companyAdmins, setCompanyAdmins] = useState<User[]>([]);


  const fetchCompanyAdmins = async () => {
    try {
      const response = await axiosInstance.get(`/companies/${companyId}/admins/all`);
      if (response.status === 200) {
        setCompanyAdmins(response.data.users);

      }
    } catch (error) {
    }
  };


  useEffect(() => {
    if (companyId) {

      fetchCompanyAdmins();
    }
  }, [companyId]);



  return (
    <div>
      <h1>Admins</h1>
      <ListUsers list={companyAdmins} show={false} companyId={Number(companyId)} admin={true} />
    </div>
  )
};

export default CompanyAdminsPage;