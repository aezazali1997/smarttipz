import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Please enter at least 3 characters")
        .required("Business Name is a required field"),
    username: Yup.string()
        .min(3, "Please enter at least 3 characters")
        .required("Business Username is a required field"),
    // accountType: Yup.string()
    //     .required("Select account is a required field"),
    // businessName:
    //     Yup.string().when('accountType', {
    //         is: 'Business',
    //         then: Yup.string()
    //             .min(3, "Please enter at least 3 characters")
    //             .required("Business name is a required field"),
    //         otherwise: Yup.string()
    //             .min(3, "Please enter at least 3 characters")
    //     }),
    website: Yup.string().url().required("Business Website address is a required field"),

    email: Yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required('Business Email is a required field'),

    // phone: Yup.string().required()
    //     .min(11, "Minimum 11 characters"),

    password: Yup.string()
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required('Password is a required field'),
});

export const PersonalSignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Please enter at least 3 characters")
        .required("Name is a required field"),
    username: Yup.string()
        .min(3, "Please enter at least 3 characters")
        .required("Username is a required field"),

    email: Yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required('Email is a required field'),

    // phone: Yup.string().required()
    //     .min(11, "Minimum 11 characters"),

    password: Yup.string()
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required('Password is a required field'),
});

export const LoginSchema = Yup.object().shape({
    checked: Yup.boolean(),
    email: Yup.string().email()
        .required("Email is a required field"),
    password: Yup.string()
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required('Password is a required field'),
});

export const ForgetPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required('Email is a required field'),
});

export const AuthenticateSchema = Yup.object().shape({
    tab1: Yup.string()
        .required(""),
    tab2: Yup.string()
        .required(''),
    tab3: Yup.string()
        .required(''),
    tab4: Yup.string()
        .required(""),
    tab5: Yup.string()
        .required(''),
    tab6: Yup.string()
        .required(''),
});
export const TestimonialFormSchema = Yup.object().shape({
    ownerName: Yup.string()
        .required("This is a required field"),
    designation: Yup.string()
        .required('This is a required field'),
    description: Yup.string()
        .required('This is a required field'),
});

export const AccountInfoValidationSchema = Yup.object().shape({
    old: Yup.string()
        .required("This is a required field "),
    new: Yup.string()
        .required("This is a required field "),
    confirm: Yup.string()
        .oneOf([Yup.ref("new")], "Confirm password must match with new password")
        .required("This is a required field"),
});