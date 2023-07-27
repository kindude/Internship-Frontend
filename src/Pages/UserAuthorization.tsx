import React from "react";
import Input from "../components/layout/Input";
import Button from "../components/layout/Button";
import emailValidation from "../components/validation/validationEmail";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
}

const UserAuthorizationPage: React.FC = () => {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        ...emailValidation.fields,
      })}
      onSubmit={(values: FormValues) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {formik => (
        <Form>
          <div>
            <Input
              htmlFor="email"
              text="Email:"
              type="email"
              id="email"
              name="email"
              accept="*/*"
            />
            <ErrorMessage name="email" />
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
            <ErrorMessage name="password" />
          </div>

          <Button text="Log In" type="submit" />
        </Form>
      )}
    </Formik>
  );
};

export default UserAuthorizationPage;
