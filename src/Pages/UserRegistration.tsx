import React from "react";
import Input from "../components/layout/Input";
import Button from "../components/layout/Button";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailValidation from "../components/validation/validationEmail";
import commonValidation from "../components/validation/validationPassword";

import axios from "axios";

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  city:string,
  country: string,
  phone: string,
  status: boolean,
  roles: string[]


}

const UserRegistrationPage: React.FC = () => {
  const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword:"",
    city:"",
    country: "",
    phone:"",
    status: true,
    roles: ["user"]

  };

  const handleFormSubmit = async (values: FormValues) => {
    // Exclude confirmPassword from the values object
    const { confirmPassword, ...dataToSend } = values;
  
    try {
      // Send a POST request to the backend API with the user registration data
      const response = await axios.post("http://localhost:8000/users/register", {
        ...dataToSend,
        roles: values.roles,
        status: values.status,
      });
  
      console.log("Response from server:", response.data);
  
      // You can also redirect the user to a different page after successful registration
      // window.location.href = "/success-page";
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        ...commonValidation.fields,
        ...emailValidation.fields,
      })}
      onSubmit={(values: FormValues) => {
        handleFormSubmit(values);
      }}
    >
      {formik => (
        <Form>
          <Input
            htmlFor="username"
            text="Name:"
            type="text"
            id="username"
            name="username"
            accept="*/*"
          />
          <ErrorMessage name="username" render={msg => <div>{msg}</div>} />

          <Input
            htmlFor="email"
            text="Email:"
            type="email"
            id="email"
            name="email"
            accept="*/*"
          />
          <ErrorMessage name="email" render={msg => <div>{msg}</div>} />

          <Input
            htmlFor="password"
            text="Password:"
            type="password"
            id="password"
            name="password"
            accept="*/*"
          />
          <ErrorMessage name="password" render={msg => <div>{msg}</div>} />

          <Input
            htmlFor="confirm-password"
            text="Confirm Password:"
            type="password"
            id="confirm-password"
            name="confirmPassword"
            accept="*/*"
          />
          <ErrorMessage name="confirmPassword" render={msg => <div>{msg}</div>} />


          <Input
            htmlFor="city"
            text="City:"
            type="text"
            id="city"
            name="city"
            accept="*/*"
          />

          <Input
            htmlFor="country"
            text="Country:"
            type="text"
            id="country"
            name="country"
            accept="*/*"
          />
          
          
          <Input
            htmlFor="phone"
            text="Phone:"
            type="text"
            id="phone"
            name="phone"
            accept="*/*"
          />
          
          <Button text="Register" type="submit"/>
          {/* <Button type="submit" text="Register" onClick={() => loginWithRedirect()} /> */}
        </Form>
      )}
    </Formik>
  );
};

export default UserRegistrationPage;
