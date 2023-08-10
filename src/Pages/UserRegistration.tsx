import React from "react";
import Input from "../components/layout/Input";
import Button from "../components/layout/Button";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
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
import emailValidation from "../components/validation/validationEmail";

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
}

const UserRegistrationPage: React.FC = () => {
  const { loginWithPopup, isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

        const userRep = await callBackendApi(accessToken);

        localStorage.setItem('accessToken', accessToken);

        dispatch(updateUser(userRep.data));
        navigate("/login");
        window.location.reload();
      } else {
        console.log("User's not authenticated");
      }
    } catch (error) {
      console.error("Error during Auth0 login:", error);
    }
  };

  const handleFormSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    const requestData = {
      username: values.username,
      email: values.email,
      password: values.password,
      city: values.city,
      country: values.country,
      phone: values.phone,
      status: values.status,
      roles: values.roles,
    };

    try {
      const response = await axiosInstance.post('/users/register', requestData);
      const values = {
        email: response.data.email,
        password: requestData.password
      }
      const token = await axiosInstance.post("/users/login", values);
      localStorage.setItem('accessToken', token.data);

      navigate("/auth");
      window.location.reload();
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const handleChange = (fieldName: keyof FormValues, formik: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    formik.setFieldValue(fieldName, newValue);
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        city: "",
        country: "",
        phone: "",
        status: true,
        roles: ["user"],
      }}
      validationSchema={Yup.object().shape({
        ...emailValidation.fields,
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
              onChange={handleChange("username", formik)}
            />
            <ErrorMessage name="username" className="error-message" component="div" />
          </div>

          <div>
            <Input
              htmlFor="email"
              text="Email:"
              type="email"
              id="email"
              name="email"
              onChange={handleChange("email", formik)}
            />
            <ErrorMessage name="email" className="error-message" component="div" />
          </div>

          <div>
            <Input
              htmlFor="password"
              text="Password:"
              type="password"
              id="password"
              name="password"
              onChange={handleChange("password", formik)}
            />
            <ErrorMessage name="password" className="error-message" component="div" />
          </div>

          <div>
            <Input
              htmlFor="confirmPassword"
              text="Confirm Password:"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange("confirmPassword", formik)}
            />
            <ErrorMessage name="confirmPassword" className="error-message" component="div" />
          </div>

          <Input
            htmlFor="city"
            text="City:"
            type="text"
            id="city"
            name="city"
            onChange={handleChange("city", formik)}
          />

          <Input
            htmlFor="country"
            text="Country:"
            type="text"
            id="country"
            name="country"
            onChange={handleChange("country", formik)}
          />

          <div>
            <Input
              htmlFor="phone"
              text="Phone:"
              type="text"
              id="phone"
              name="phone"
              onChange={handleChange("phone", formik)}
            />
          </div>

          <Button text="Register" type="submit" />
          <Button type="button" text="Log In with Auth0" onClick={handleFormSubmitAuth0} />
        </Form>
      )}
    </Formik>
  );
};

export default UserRegistrationPage;
