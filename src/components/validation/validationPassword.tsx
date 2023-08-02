import * as Yup from "yup";


const passwordValidation = Yup.object({
    password: Yup.string()
      .min(8, "Password must have at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

export default passwordValidation;