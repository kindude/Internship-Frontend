import React from "react";
import Input from "../components/layout/Input";
import Button from "../components/layout/Button";
import emailValidation from "../components/validation/validationEmail";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateEmail, updateUsername } from "../reducers/slice";

import { useNavigate } from "react-router-dom";

import '../styles/userAuthorization.css'
import commonValidation from "../components/validation/validationPassword";


interface FormValues {
  email: string;
  password: string;
}

const UserAuthorizationPage: React.FC = () => {

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    try {

      const response = await axios.post<String>(
        "http://localhost:8000/users/login",
        {
          email: values.email,
          password: values.password,
        }

      );
      console.log(response);

      dispatch(updateEmail(values.email));
      dispatch(updateUsername(values.email));
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
        <Form className="user-auth-form">
          <div>
            <Input
              htmlFor="email"
              text="Email:"
              type="email"
              id="email"
              name="email"
              accept="*/*"
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
            />
            <ErrorMessage name="password" className="error-message" />
          </div>

          <Button text="Log In" type="submit" />
          <Button type="submit" text="Log In with Auth0" />
        </Form>
      )}
    </Formik>
  );
};

export default UserAuthorizationPage;
