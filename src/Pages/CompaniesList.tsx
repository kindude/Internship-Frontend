import React, { useState, useEffect } from "react";
import { Company } from "../types/CompanyResponse";
import axiosInstance from "../api/api_instance";
import { Link } from "react-router-dom";

const CompaniesListPage: React.FC = () => {

    const [companies, setCompanies] = useState<Company[]>([]);


    const get_companies = async () => {
        try {
            const response = await axiosInstance.get(`/companies/all`);
            if (response.data.companies) {
                setCompanies(response.data.companies);

                // dispatch(updateUsers(response.data.users))

            } else {
                console.error("Invalid response data format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    useEffect(() => {
        const fetchCompanies = async () => {
            get_companies();
        };

        fetchCompanies();
    }, []);
    return (
        <div>
        <h1>Companies List</h1>
        <ul>
            {companies.map(company => (
                <li key={company.id} className="company-item">
                    <div>
                        <Link to={`/companyPage/${company.id}`}>{company.id}</Link>
                    </div>
                    <div>{company.name} {company.description}</div>
                </li>
            ))}
        </ul>
    </div>
    );

};

export default CompaniesListPage;