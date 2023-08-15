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
import ListCompanies from "../components/layout/ListCompanies";
import Pagination from "../components/layout/Pagination";
import { get_companies } from "../api/get_companies";
import "../styles/companiesList.css";


export interface FormValues {
    name: string;
    description: string;
    site: string;
    city: string;
    country: string;
    is_visible: boolean;
    owner_id: number;
};

interface Pagination {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;

}

const CompaniesListPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        per_page: 5,
        total: 0,
        total_pages: 0
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [formValues, setFormValues] = useState<FormValues>({
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
        values = formValues;
        console.log(values);
        const token = localStorage.getItem('accessToken');
        const createdCompany = await axiosInstance.post("/companies/create", values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        navigate("/companies");
        fetchCompanies();
        window.location.reload();
        
    }
        
    const fetchCompanies = async () => {
        const response = await get_companies(pagination.page, pagination.per_page);
        setCompanies(response?.companies); 
        console.log(response?.companies);
        setPagination((prevPagination) => ({
            ...prevPagination,
            page: response?.page ?? prevPagination.page,
            per_page: response?.per_page ?? prevPagination.per_page,
            total: response?.total ?? prevPagination.total,
            total_pages: response?.total_pages ?? prevPagination.total_pages,
          }));
    };
        

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        console.log(value);
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handlePageChange = (pageNumber: number) => {
        setPagination((prevPagination) => ({
          ...prevPagination,
          page: pageNumber,
        }));
      };

    useEffect(() => {
        

        fetchCompanies();
    }, [pagination.page, pagination.per_page]);


    return (
        <div className="page-container">
           <button className="create-button" onClick={openModal}>Create Company</button>
            <Modal windowName="Company Creation" isOpen={isModalOpen} onClose={closeModal}>
                <h2>Company</h2>

                <Formik
                    initialValues={formValues}
                    onSubmit={handleFormSubmit}
                >
                    {formik => (
                        <Form className="register-form">
                            <div>
                                <Input
                                    htmlFor="name"
                                    text="Company Name:"
                                    type="text"
                                    id="companyName"
                                    name="name"
                                    accept="*/*"
                                    value={formValues.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Input
                                    htmlFor="description"
                                    text="Description:"
                                    type="text"
                                    id="description"
                                    name="description"
                                    accept="*/*"
                                    value={formValues.description}
                                    onChange={handleChange}

                                />
                            </div>
                            <div>
                                <Input
                                    htmlFor="site"
                                    text="Site:"
                                    type="text"
                                    id="site"
                                    name="site"
                                    accept="*/*"
                                    value={formValues.site}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Input
                                    htmlFor="city"
                                    text="City:"
                                    type="text"
                                    id="city"
                                    name="city"
                                    accept="*/*"
                                    value={formValues.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Input
                                    htmlFor="country"
                                    text="Country:"
                                    type="text"
                                    id="country"
                                    name="country"
                                    accept="*/*"
                                    value={formValues.country}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Input
                                    htmlFor="is_visible"
                                    text="Visible"
                                    type="checkbox"
                                    id="is_visible"
                                    name="is_visible"
                                    accept="*/*"
                                    checked={formValues.is_visible}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button text="Create" type="submit" />
                            <Button text="Cancel" type="button" onClick={closeModal}/>
                        </Form>
                    )}
                </Formik>
            </Modal>
            <h1 className="page-header">Companies List</h1>
            <ListCompanies list={companies} user={user} showLink={true}/>
            <div className="pagination-container">
                <Pagination
                    totalPages={pagination.total_pages}
                    currentPage={pagination.page}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );

};

export default CompaniesListPage;