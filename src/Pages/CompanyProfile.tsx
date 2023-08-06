import React, {useState, useEffect} from "react";
import Input from "../components/layout/Input";
import { useParams } from 'react-router-dom';
import { Company } from "../types/CompanyResponse";
import axiosInstance from "../api/api_instance";

const CompanyProfilePage: React.FC = () => {
    const { companyId } = useParams<{ companyId: string }>();
    const [company, setCompany] = useState<Company | undefined>();

    useEffect(() => {
      const fetchCompany = async () => {
        try {
          const response = await axiosInstance.get<Company>(`/companies/${companyId}`);
          setCompany(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
  
      fetchCompany();
    }, [companyId]);

    return(
        <div>
            <p>{company?.id || ""}</p>
            <p>{company?.name || ""}</p>
            <p>{company?.description || ""}</p>

        </div> 

    );

};

export default CompanyProfilePage;