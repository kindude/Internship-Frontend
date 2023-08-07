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

export interface FormValues {
  name: string;
  description: string;
  site: string;
  city: string;
  country: string;
  is_visible: boolean;
  owner_id: number;
}

const CompanyProfilePage: React.FC = () => {

  const { companyId } = useParams<{ companyId: string }>();
  const user = useSelector((state: RootState) => state.user.user);
  const [company, setCompany] = useState<Company | undefined>();

  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    description: "",
    site: "",
    city: "",
    country: "",
    is_visible: false,
    owner_id: user?.id || 0,
  });

  const navigate = useNavigate();


  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axiosInstance.get<Company>(`/companies/${companyId}`);
        setCompany(response.data);
        setFormValues(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchCompany();
  }, [companyId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    console.log(value);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  

  const handleFormSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    const token = localStorage.getItem("accessToken");    
    const updated_company = axiosInstance.put(`/companies/update/${companyId}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleFormDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const deleted_company = await axiosInstance.delete(`/companies/${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("Company deleted successfully");
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };


  return (
    <div>
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
            <Button text="Update" type="submit" />
            <Button text="Delete" type="button" onClick={handleFormDelete}/>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyProfilePage;
