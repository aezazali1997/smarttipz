import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import axiosInstance from '../APIs/axiosInstance';
import { ForgetPasswordSchema } from '../utils/validation_shema';

const UseForgotPassword = () => {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {

    }, [showAlert])

    const toggleAlert = () => {
        setShowAlert(false);
    }

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const initialValues = {
        email: '',
        password: '',
        checked: false
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: ForgetPasswordSchema,
        validateOnBlur: true,
        onSubmit: ({ email }, { setSubmitting, setStatus }) => {
            setTimeout(() => {
                enableLoading();
                axiosInstance.forgetPassword(email)
                    .then(({ data: { data, message, error } }) => {
                        disableLoading();
                        setError(false);
                        setStatus(message);
                        setShowAlert(true);
                        router.push('/auth/login');
                    })
                    .catch((e) => {
                        console.log('Error', e)
                        setError(true)
                        disableLoading();
                        setSubmitting(false);
                        setStatus(e.response.data.message);
                        setShowAlert(true);
                    });
            }, 1000);
        },
    });



    return { loading, toggleAlert, showAlert, showPassword, setShowPassword, error, formik };
}

export default UseForgotPassword;
