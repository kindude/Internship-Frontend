import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import Input from "../components/layout/Input";
import Button from "../components/layout/Button";
import emailValidation from "../components/validation/validationEmail";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/api_instance";
import '../styles/userAuthorization.css'
import callBackendApi from "../api/backend_me";
import { useAuth0 } from "@auth0/auth0-react";

interface FormValues {
  email: string;
  password: string;
}

const UserAuthorizationPage: React.FC = () => {

  const { loginWithPopup, isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveTokenToLocalStorage = (token: string) => {
    localStorage.setItem('accessToken', token);
  }

  const handleFormSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    try {
      console.log(values);
      const response = await axiosInstance.post("/users/login", values);
      saveTokenToLocalStorage(response.data);
      navigate("/welcome");
      window.location.reload();
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const handleChange = (fieldName: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, type, checked } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {

  }, [formValues, navigate, dispatch]);


  const handleFormSubmitAuth0 = async () => {
    try {
      await loginWithPopup();
      console.log('User is authenticated.');
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_API_AUDIENCE,
          },
        });
        localStorage.setItem('accessToken', accessToken);
        navigate("/welcome");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during Auth0 login:", error);
    }
  };

  return (
    <Formik
      initialValues={formValues}
      onSubmit={() => { }}
    >
      {formik => (
        <Form className="user-auth-form">
          <div>
            <Input
              htmlFor="email"
              text="Email:"
              type="email"
              id="email"
              name="email"
              accept="*/*"
              value={formValues.email}
              onChange={handleChange("email")}
            />
            <ErrorMessage name="email" className="error-message" />
          </div>

          <div>
            <Input
              htmlFor="password"
              text="Password:"
              type="password"
              id="password"
              name="password"
              accept="*/*"
              value={formValues.password}
              onChange={handleChange("password")}
            />
            <ErrorMessage name="password" className="error-message" />
          </div>

          <Button text="Log In" type="submit" onClick={() => handleFormSubmit(formValues, formik)} />
          <Button type="button" text="Log In with Auth0" onClick={handleFormSubmitAuth0} />
        </Form>
      )}
    </Formik>
  );
};

export default UserAuthorizationPage;
