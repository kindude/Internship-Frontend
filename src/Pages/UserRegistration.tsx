import React from "react";
import Input from "../components/layout/Input";
import Button from "../components/layout/Button";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import emailValidation from "../components/validation/validationEmail";
import axios from "axios";
import '../styles/registerPage.css';
import commonValidation from "../components/validation/validationPassword";
import { useNavigate } from "react-router-dom";


interface FormValues {
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
  
  interface UserResponse {
    id: number;
    username: string;
    email: string;
    password: string;
    city: string;
    country: string;
    phone: string;
    status: boolean;
    roles: string[];
  };


  const navigate = useNavigate();

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

      const response = await axios.post<UserResponse>(
        "http://localhost:8000/users/register",
        requestData
      );
      console.log(response);


      console.log(response);

      navigate("/welcome");

    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      formikHelpers.setSubmitting(false);
    }

  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        ...commonValidation.fields,
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
        </Form>
      )}
    </Formik>
  );
};

export default UserRegistrationPage;
