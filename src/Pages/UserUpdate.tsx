import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axiosInstance from "../api/api_instance";
import Input from "../components/layout/Input";
import { User } from "../types/UserResponse";
import passwordValidation from "../components/validation/validationPassword";
import emailValidation from "../components/validation/validationEmail";
import Button from "../components/layout/Button";


interface FormValues {
  username: string;
  email: string;
  password: string;
  city: string;
  country: string;
  phone: string;
  status:boolean;
  roles:string[];
}

const UserUpdatePage: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get<User>(`/users/${userId}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {

    const requestData = {
      username: values.username,
      email: values.email,
      password: values.password,
      city: values.city,
      country: values.country,
      phone: values.phone,
      status: true,
      roles: ["user"]
    };

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Access token not found. Please log in.");
        return;
      }

      const response = await axiosInstance.put(`/users/update/${userId}`, requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate(`/users/${userId}`);
      } else {
        console.error("Error updating user:", response.data);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
    finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const handleChange = (fieldName: keyof FormValues, formik: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    formik.setFieldValue(fieldName, newValue);
  };

  return (
    <div>
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        <div>
          <h1>User ID: {user?.id || ""}</h1>
          <Formik
            initialValues={{
              username: user?.username || "",
              email: user?.email || "",
              password: "",
              city: user?.city || "",
              country: user?.country || "",
              phone: user?.phone || "",
              status: true,
              roles: ["user"],
            }}
            onSubmit={handleSubmit}
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
                    value={formik.values.username}
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
                    value={formik.values.email}
                    disabled
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

                <Input
                  htmlFor="city"
                  text="City:"
                  type="text"
                  id="city"
                  name="city"
                  value={formik.values.city}
                  onChange={handleChange("city", formik)}
                />

                <Input
                  htmlFor="country"
                  text="Country:"
                  type="text"
                  id="country"
                  name="country"
                  value={formik.values.country}
                  onChange={handleChange("country", formik)}
                />

                <div>
                  <Input
                    htmlFor="phone"
                    text="Phone:"
                    type="text"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={handleChange("phone", formik)}
                  />
                </div>

                <Button text="Update" type="submit" />
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default UserUpdatePage;
