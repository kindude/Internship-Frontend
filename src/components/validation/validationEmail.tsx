import * as Yup from "yup";


const emailValidation = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
        "Invalid email address"
      )
      .required("Email is required"),
  });

export default emailValidation;