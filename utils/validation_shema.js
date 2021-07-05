import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Please enter at least 3 characters")
        .required("Username is a required field"),
    email: Yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required('Email is a required field'),
    password: Yup.string()
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required('Password is a required field'),
});
