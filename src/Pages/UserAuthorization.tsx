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
  
  }, [formValues, navigate, dispatch]);


  const handleFormSubmitAuth0 = async () => {
    try {
      await loginWithRedirect();
      console.log('User is authenticated.');

      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_API_AUDIENCE,
          },
        });
        if (accessToken) {
          const userRep = await callBackendApi(accessToken);
          localStorage.setItem('accessToken', accessToken);
          


          dispatch(updateUser(userRep));
          navigate("/welcome");
        } else {
          console.error('Access token is undefined or null.');
        }
      } else {
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
      onSubmit={() => {}}
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
              onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
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
              onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
            />
            <ErrorMessage name="password" className="error-message" />
          </div>

          <Button text="Log In" type="submit" onClick={() => handleFormSubmit(formValues, {} as FormikHelpers<FormValues>)} />
          <Button type="button" text="Log In with Auth0" onClick={handleFormSubmitAuth0} />
        </Form>
      )}
    </Formik>
  );
};

export default UserAuthorizationPage;
