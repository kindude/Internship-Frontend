import React, { useState, useEffect } from "react";
import { Company } from "../types/CompanyResponse";
import axiosInstance from "../api/api_instance";
import { Link } from "react-router-dom";
import Modal from "../components/modal/Modal";
import { Formik } from "formik";
import Input from "../components/layout/Input";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../types/types";
import { FormikHelpers } from "formik";
import { Form } from "formik";
import Button from "../components/layout/Button";
import { useNavigate } from "react-router-dom";

export interface FormValues {
    name: string;
    description: string;
    site: string;
    city: string;
    country: string;
    is_visible: boolean;
    owner_id: number;
};

const CompaniesListPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const initialValues: FormValues = {
        name: "",
        description: "",
        site: "",
        city: "",
        country: "",
        is_visible: false,
        owner_id: user?.id || 0

    };

    const [formData, setFormData] = useState<FormValues>({

        name: "",
        description: "",
        site: "",
        city: "",
        country: "",
        is_visible: false,
        owner_id: user?.id || 0
    });

    const handleFormSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        closeModal();
        const token = localStorage.getItem('accessToken');
        const createdCompany = await axiosInstance.post("/companies/create", values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        navigate("/companies");
        window.location.reload();
    }


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
            <button onClick={openModal}>Create Company</button>
            <Modal windowName="Company Creation" isOpen={isModalOpen} onClose={closeModal}>
                <h2>Company</h2>

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleFormSubmit}
                >
                    {formik => (
                        <Form className="register-form">
                            <div>
                                <Input htmlFor="name" text="Company Name:" type="text" id="companyName" name="name" accept="*/*"></Input>
                            </div>
                            <div>
                                <Input htmlFor="description" text="Description:" type="text" id="description" name="description" accept="*/*"></Input>
                            </div>
                            <div>
                                <Input htmlFor="site" text="Site:" type="text" id="site" name="site" accept="*/*"></Input>
                            </div>
                            <div>
                                <Input htmlFor="city" text="City:" type="text" id="city" name="city" accept="*/*"></Input>
                            </div>
                            <div>
                                <Input htmlFor="country" text="Country:" type="text" id="country" name="country" accept="*/*"></Input>
                            </div>
                            <div>
                                <Input htmlFor="is_visible" text="Visible" type="checkbox" id="is_visible" name="is_visible" accept="*/*"></Input>
                            </div>
                            <Button text="Create" type="submit" />
                        </Form>
                    )}
                </Formik>
            </Modal>
            <h1>Companies List</h1>
            <ul>
                {companies
                    .filter((company) => {
                        if(company.owner_id === user?.id){
                            return company.name
                        }
                        else{
                            return company.is_visible
                        }
                    
                      })
                    .map((company) => (
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