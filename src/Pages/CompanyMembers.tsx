import { useParams} from 'react-router-dom';
import axiosInstance from '../api/api_instance';
import { User } from '../types/UserResponse';
import { useEffect, useState } from 'react';
import ListUsers from '../components/layout/ListUsers';



const CompanyMembersPage: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [companyMembers, setCompanyMembers] = useState<User[]>([]);

  useEffect(() => {
    const fetchCompanyMembers = async () => {
      try {
        console.log(companyId);
        const response = await axiosInstance.get(`/companies/${companyId}/members`);
        if (response.status === 200) {
          setCompanyMembers(response.data.users);
        }
      } catch (error) {

      }
    };

    fetchCompanyMembers();
  }, [companyId]);

  return (
    <div>
        <h1>Users</h1>
        <ListUsers list={companyMembers}/>
    </div>
  )
};

export default CompanyMembersPage;