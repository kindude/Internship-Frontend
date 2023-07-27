import React from "react";
import Input from "../components/layout/Input";
import Button from "../components/layout/Button";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailValidation from "../components/validation/validationEmail"
import commonValidation from "../components/validation/validationPassword"

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
 

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        ...commonValidation.fields,
        ...emailValidation.fields,
      })}
      onSubmit={(values: FormValues) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {formik => (
        <Form>
          <Input
            htmlFor="name"
            text="Name:"
            type="text"
            id="name"
            name="name"
            accept="*/*"
          />
          <ErrorMessage name="name" render={msg => <div>{msg}</div>} />

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
            name="confirmPassword" // Corrected name prop
            accept="*/*"
          />
          <ErrorMessage name="confirmPassword" render={msg => <div>{msg}</div>} />

          <Button text="Register" type="submit" />
        </Form>
      )}
    </Formik>
  );
};

export default UserRegistrationPage;
