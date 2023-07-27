import React from "react";
import Input from "../components/layout/Input";
import Button from "../components/layout/Button";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const UserRegistrationPage: React.FC = () => {
  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must have at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: FormValues) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {formik => (
        <Form>
          <div>
            <Input
              htmlFor="name"
              text="Name:"
              type="text"
              id="name"
              name="name"
              accept="*/*"
            />
            <ErrorMessage name="name" render={msg => <div>{msg}</div>} />
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
            <ErrorMessage name="email" render={msg => <div>{msg}</div>} />
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
            <ErrorMessage name="password" render={msg => <div>{msg}</div>} />
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
            <ErrorMessage name="confirmPassword" render={msg => <div>{msg}</div>} />
          </div>

          <Button text="Register" type="submit" />
        </Form>
      )}
    </Formik>
  );
};

export default UserRegistrationPage;
