import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import swal from 'sweetalert';
import axiosInstance from '../APIs/axiosInstance';
import { SignupSchema } from '../utils/validation_shema';

const UseFetchSignup = () => {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const initialValues = {
        name: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        // businessName: '',
        website: '',
        accountType: '',
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: SignupSchema,
        validateOnBlur: true,
        onSubmit: ({ name, email, phone, password, username, accountType, website },
            { setSubmitting, setStatus }) => {
            setTimeout(() => {
                enableLoading();
                const data = {
                    name,
                    username,
                    email,
                    phone,
                    password,
                    accountType,
                    // businessName,
                    website
                }
                axiosInstance.signup(data)
                    .then(({ data: { data, error, message } }) => {
                        console.log('res >>', data);
                        disableLoading();
                        swal({
                            title: "User created successfully",
                            text: message,
                            buttons: false,
                            dangerMode: true,
                            timer: 5000,
                            icon: 'success'
                        })
                        localStorage.setItem('username', username);
                        router.push('/auth/authenticate')
                    })
                    .catch((e) => {
                        console.log('Error', e.response.data.message)
                        disableLoading();
                        setSubmitting(false);
                        swal({
                            text: e.response.data.message,
                            buttons: false,
                            dangerMode: true,
                            timer: 3000,
                            icon: 'error'
                        })
                    });
            }, 1000);
        },
    });


    return { showPassword, setShowPassword, loading, formik };
}

export default UseFetchSignup;
