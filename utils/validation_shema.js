import * as Yup from "yup";

export const BusinessSignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Please enter at least 3 characters")
        .required("Username is a required field"),
    businessName: Yup.string()
        .min(3, "Please enter at least 3 characters")
        .required("Business name is a required field"),
    website: Yup.string()
        .required("Website address is a required field"),
    accountType: Yup.string()
        .required("Select account is a required field"),
    email: Yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required('Email is a required field'),

    phone: Yup.string()
        .min(11, "Minimum 3 characters")
        .required('Phone number is a required field'),

    password: Yup.string()
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required('Password is a required field'),
});

export const PersonalSignupSchema = Yup.object().shape({
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
    accountType: Yup.string()
        .required("Select account is a required field"),
});
