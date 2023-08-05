import React, { useEffect, useState, useRef } from "react";
import Input from "../components/layout/Input";
import Button from "../components/layout/Button";
import { Formik, Form, ErrorMessage, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import '../styles/registerPage.css';
import commonValidation from "../components/validation/validationPassword";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../reducers/userReducer";
import { useAuth0 } from "@auth0/auth0-react";
import passwordValidation from "../components/validation/validationPassword";
import axiosInstance from "../api/api_instance";
import callBackendApi from "../api/backend_me";
import { useDispatch } from "react-redux";


export interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  city: string;
  country: string;
  phone: string;
  status: boolean;
  roles: string[];
};

const UserRegistrationPage: React.FC = () => {

  const { loginWithPopup, isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    country: "",
    phone: "",
    status: true,
    roles: ["user"],
  };

  const [formData, setFormData] = useState<FormValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    country: "",
    phone: "",
    status: true,
    roles: ["user"],
  });


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formikRef = useRef<FormikProps<FormValues>>(null);

  const handleFormSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {


    console.log("Form submitted");
    const { username, email, password, city, country, phone, status, roles } = values;

    const requestData = {
      username,
      email,
      password,
      city,
      country,
      phone,
      status,
      roles,
    };

    try {

      const response = await axiosInstance.post('/users/register', requestData);

      console.log(response);

     

      localStorage.setItem('accessToken', response.data);

      // dispatch(updateEmail(userRep.username || ""));
      // dispatch(updateUsername(userRep.email || ""));

      navigate("/auth");

    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
    
  };

  useEffect(() => {

    if (formikRef.current && formikRef.current.submitCount > 0) {
      handleFormSubmit(formData, formikRef.current);
    }
  }, [formData, navigate, dispatch]);


  const handleFormSubmitAuth0 = async () => {
    try {
      await loginWithPopup();
      
      if (isAuthenticated) {
        console.log('User is authenticated.');
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_API_AUDEINCE,
          },
        });
        console.log(user);
        console.log(accessToken);

        const userRep = await callBackendApi(accessToken);

        localStorage.setItem('user', JSON.stringify(userRep));

        localStorage.setItem('accessToken', accessToken);

        dispatch(updateUser(userRep|| ""));
        navigate("/login");

      }
      else {
        console.log("User's not authenticated");
      }
    } catch (error) {
      console.error("Error during Auth0 login:", error);
    }
  };



  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        ...commonValidation.fields,
        ...passwordValidation.fields,
      })}
      onSubmit={handleFormSubmit}
    >
      {formik => (
        <Form className="register-form">
          <div>
            <Input
              htmlFor="username"
              text="Name:"
              type="text"
              id="username"
              name="username"
              accept="*/*"
            />
            <ErrorMessage name="username" className="error-message" render={msg => <div>{msg}</div>} />
          </div>

          <div>
            <Input
              htmlFor="email"
              text="Email:"
              type="email"
              id="email"
              name="email"
              accept="*/*"
            />
            <ErrorMessage name="email" className="error-message" render={msg => <div>{msg}</div>} />
          </div>

          <div>
            <Input
              htmlFor="password"
              text="Password:"
              type="password"
              id="password"
              name="password"
              accept="*/*"
            />
            <ErrorMessage name="password" className="error-message" render={msg => <div>{msg}</div>} />
          </div>

          <div>
            <Input
              htmlFor="confirm-password"
              text="Confirm Password:"
              type="password"
              id="confirm-password"
              name="confirmPassword"
              accept="*/*"
            />
            <ErrorMessage name="confirmPassword" className="error-message" render={msg => <div>{msg}</div>} />
          </div>

          <Input htmlFor="city" text="City:" type="text" id="city" name="city" accept="*/*" />

          <Input
            htmlFor="country"
            text="Country:"
            type="text"
            id="country"
            name="country"
            accept="*/*"
          />
          <div>
            <Input htmlFor="phone" text="Phone:" type="text" id="phone" name="phone" accept="*/*" />
          </div>

          <Button text="Register" type="submit" />
          <Button type="submit" text="Log In with Auth0" onClick={handleFormSubmitAuth0} />
        </Form>
      )}
    </Formik>
  );
};

export default UserRegistrationPage;
