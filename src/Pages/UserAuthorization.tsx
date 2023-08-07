
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, ErrorMessage, FormikHelpers, FormikProps } from "formik";
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

  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const formikRef = useRef<FormikProps<FormValues>>(null); // Create a ref for Formik

  const handleFormSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    try {

      const response = await axiosInstance.post("/users/login", values);

      const userRep = await callBackendApi(response.data);

      localStorage.setItem('accessToken', response.data);
      dispatch(updateUser(userRep));
      navigate("/welcome");
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : checked,
    }));
  };

  useEffect(() => {
    // Access the formik instance through the ref
    if (formikRef.current && formikRef.current.submitCount > 0) {
      handleFormSubmit(formValues, formikRef.current);
    }
  }, [formValues, navigate, dispatch]);


  const handleFormSubmitAuth0 = async () => {
    try {
      await loginWithRedirect();
      console.log('User is authenticated.');

      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://auth-reg`,
          },
        });
        console.log(user);
        if (accessToken) {
          console.log(accessToken);
          const userRep = await callBackendApi(accessToken);

          localStorage.setItem('accessToken', accessToken);
          

          dispatch(updateUser(userRep));
          navigate("/welcome");

        } else {
          console.error('Access token is undefined or null.');
        }

      }
      else {
        console.log("No token returned");
      }
    } catch (error) {
      console.error("Error during Auth0 login:", error);
    }
  };

  return (
    <Formik
      initialValues={formValues}
      validationSchema={Yup.object().shape({
        ...emailValidation.fields,
      })}
      onSubmit={handleFormSubmit}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
            <ErrorMessage name="password" className="error-message" />
          </div>

          <Button text="Log In" type="submit" />
          <Button type="button" text="Log In with Auth0" onClick={handleFormSubmitAuth0} />
        </Form>
      )}
    </Formik>
  );
};

export default UserAuthorizationPage;
