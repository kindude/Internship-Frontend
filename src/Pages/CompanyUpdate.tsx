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

const CompanyUpdatePage: React.FC = () => {

  const { companyId } = useParams<{ companyId: string }>();
  const user = useSelector((state: RootState) => state.user.user);
  const [company, setCompany] = useState<Company | undefined>();
  const [error, setError] = useState<string | null>(null);
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
        setError('Company not found');
        console.error('Error fetching company:', error);
      }
    };

    fetchCompany();
  }, [companyId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleFormSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    const token = localStorage.getItem("accessToken");
    values = formValues;
    console.log(values);
    try{
    const updated_company = await axiosInstance.put(`/companies/update/${companyId}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (updated_company.status === 200){
        navigate("/companies");
        window.location.reload();
    }
    if (updated_company.status === 403){
      setError("You are not allowed to edit or delete this company!");
    }

    }
    catch{
      setError("Something went wrong, try again");
    }

  };

  const handleFormDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log(token);


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



  return (
    <div>
      {error ? (
        <p>{error}</p> 
      ) : (
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
                { user && user?.id === company?.owner_id && (
                <Button text="Update" type="submit" />
                )}
                { user && user?.id === company?.owner_id && (
                <Button text="Delete" type="button" onClick={handleFormDelete} />
                )}
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default CompanyUpdatePage;
