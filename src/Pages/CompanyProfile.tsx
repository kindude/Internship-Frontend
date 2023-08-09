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

const CompanyProfilePage: React.FC = () => {

  const { companyId } = useParams<{ companyId: string }>();
  const user = useSelector((state: RootState) => state.user.user);
  const [company, setCompany] = useState<Company | undefined>();
  const [error, setError] = useState<string | null>(null);


  const navigate = useNavigate();


  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axiosInstance.get<Company>(`/companies/${companyId}`);
        setCompany(response.data);
      } catch (error) {
        setError('Company not found');
        console.error('Error fetching company:', error);
      }
    };

    fetchCompany();
  }, [companyId]);


  const handleFormUpdate = () => {
    navigate(`/companies/update/${company?.id}`)

  }
  

  const handleFormDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log(token);


      const response = await axiosInstance.post(`/companies/${companyId}`, company, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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


  return(
    <div><div>
    {error ? (
      <p>{error}</p>
    ) : company ? (
      <div>
        <h1>Company ID: {company.id}</h1>
        <p>Name: {company.name}</p>
        <p>Description: {company.description}</p>
        <p>City: {company.city}</p>
        <p>Country: {company.country}</p>
        <p>Site: {company.site}</p>
        
        {user && user.id === company?.owner_id && (
          <Button text="Edit" type="submit" onClick={handleFormUpdate} />
        )}
        {user && user.id === company?.owner_id && (
          <Button text="Delete" type="submit" onClick={handleFormDelete} />
        )}

      </div>
    ) : (
      <p>Loading user data...</p>
    )}
  </div></div>
  );
};

export default CompanyProfilePage;