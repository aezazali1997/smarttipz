import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import axiosInstance from '../APIs/axiosInstance';
import { AuthenticateSchema } from '../utils/validation_shema';
import cookie from 'js-cookie';

const UseFetchAuthenticate = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [verified, setIsVerified] = useState(null);

    useEffect(() => {
        setIsVerified(localStorage.getItem('otpToken'));
        !localStorage.getItem('otpToken') && router.push('/auth/login')
    }, [verified])


    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const initialValues = {
        tab1: '',
        tab2: '',
        tab3: '',
        tab4: '',
        tab5: '',
        tab6: '',
    }

    const resendOTP = () => {
        if (localStorage.getItem('otpToken')) {
            const data = {
                Token: localStorage.getItem('otpToken')
            }
            axiosInstance.resendOTP(data)
                .then(() => {
                    swal({
                        text: 'Confirmation code sent to email address',
                        buttons: false,
                        dangerMode: true,
                        timer: 5000,
                        icon: 'info'
                    })
                })
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: AuthenticateSchema,
        validateOnBlur: true,
        onSubmit: ({ tab1, tab2, tab3, tab4, tab5, tab6 }, { setSubmitting, setStatus }) => {
            setTimeout(() => {
                if (localStorage.getItem('otpToken')) {
                    enableLoading();
                    const data = {
                        varificationCode: `${tab1}${tab2}${tab3}${tab4}${tab5}${tab6}`,
                        OTPToken: localStorage.getItem('otpToken')
                    }
                    console.log(data);
                    axiosInstance.authenticate(data)
                        .then(({ data: { error, data: { token, username, image, id }, message } }) => {
                            disableLoading();
                            console.log(message, error, data);
                            swal({
                                text: message,
                                buttons: false,
                                dangerMode: true,
                                timer: 3000,
                                icon: 'success'
                            })
                            cookie.set('token', token);
                            localStorage.setItem('id', id);
                            cookie.set('username', username);
                            localStorage.setItem('image', image);
                            localStorage.removeItem('otpToken');
                            router.push('/dashboard/profile');
                        })
                        .catch((e) => {
                            console.log('Error', e)
                            disableLoading();
                            swal({
                                text: e.response.data.message,
                                buttons: false,
                                dangerMode: true,
                                timer: 3000,
                                icon: 'error'
                            })
                        })
                }
            }, 1000);
        },
    });

    return { loading, formik, verified, resendOTP };

}

export default UseFetchAuthenticate;
