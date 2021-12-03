import { max } from "lodash";
import * as Yup from "yup";


const Email = (requiredText) => {
    return Yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required(requiredText)
}

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
    website: Yup.string().required("Business Website address is a required field"),

    email: Email('Business Email is a required field'),
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

    email: Email('Email is a required field'),
    // phone: Yup.string().required()
    //     .min(11, "Minimum 11 characters"),

    password: Yup.string()
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required('Password is a required field'),
});

export const LoginSchema = Yup.object().shape({
    checked: Yup.boolean(),
    email: Email('Email is a required field'),
    password: Yup.string()
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required('Password is a required field'),
});

export const ForgetPasswordSchema = Yup.object().shape({
    email: Email('Email is a required field'),
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
export const RequestTestimonialFormSchema = Yup.object().shape({
    email: Email('Email is a required field')
});

export const AddTestimonialFormSchema = Yup.object().shape({
    ownerName: Yup.string()
        .required("This is a required field"),
    designation: Yup.string()
        .required('This is a required field'),
    description: Yup.string()
        .required('This is a required field'),

});

export const UploadVideoSchema = Yup.object().shape({
    // title: Yup.string()
    //     .required("This is a required field"),
    category: Yup.string()
        .required('This is a required field'),
    videoCost: Yup.string()
        .required('This is a required field'),
    description: Yup.string(),
    language: Yup.string()
        .required('This is a required field'),
});

export const UploadPhotoVideoSchema = Yup.object().shape({
    title: Yup.string()
        .required("This is a required field"),
    description: Yup.string(),
    // .required('This is a required field'),
    language: Yup.string()
        .required('This is a required field'),
    mediaType: Yup.string()
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