import * as Yup from "yup";


const commonValidation = Yup.object({
    password: Yup.string()
      .min(8, "Password must have at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
      "Invalid email address"
    )
    .required("Email is required"),
  });

export default commonValidation;