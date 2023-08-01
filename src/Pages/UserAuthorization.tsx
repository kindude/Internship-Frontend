import React, {useEffect} from "react";
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

import { useAuth0 } from "@auth0/auth0-react";

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

  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  
  const handleFormSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    try {
      const response = await axios.post<string>(
        "http://localhost:8000/users/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      console.log(response.data);
      callBackendApi(response.data);
      dispatch(updateEmail(values.email));
      dispatch(updateUsername(values.email));
      navigate("/welcome");
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };


  const callBackendApi = async (token: string) => {

    console.log()

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.post("http://localhost:8000/me", {}, config);
      console.log("Backend Response:", response.data);
    } catch (error) {
      console.error("Error during backend API call:", error);
    }
  };
  

  
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

        } else {
          console.error('Access token is undefined or null.');
        }
        
        localStorage.setItem('accessToken', accessToken);

        console.log(accessToken);

        const userRep = callBackendApi(accessToken);

        localStorage.setItem('user', JSON.stringify(userRep));

      }
      else{
        console.log("No token returned");
      }
    } catch (error) {
      console.error("Error during Auth0 login:", error);
    }
  };



  // const handleFormSubmitAuth0 = async () => {
  //   try {
  //     await loginWithRedirect();
  //     console.log('User is authenticated.');
  //   } catch (error) {
  //     console.error("Error during Auth0 login:", error);
  //   }
  // };
  
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     console.log('User is authenticated.');
  //     const fetchData = async () => {
  //       try {
  //         const accessToken = await getAccessTokenSilently();
  //         console.log("Access Token:", accessToken);
  
  //         callBackendApi(accessToken);
  //       } catch (error) {
  //         console.error("Error fetching access token:", error);
  //       }
  //     };
  
  //     fetchData();
  //   } else {
  //     console.log("User is not authenticated.");
  //   }
  // }, [isAuthenticated]);




  return (
    <Formik
      initialValues={initialValues}
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
          <Button type="button" text="Log In with Auth0" onClick={handleFormSubmitAuth0} />
        </Form>
      )}
    </Formik>
  );
};

export default UserAuthorizationPage;
