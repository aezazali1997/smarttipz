import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import cookie from 'js-cookie';
import axiosInstance from 'src/APIs/axiosInstance';
import { AuthenticateSchema } from 'utils/validation_shema';
import { useSearchContext } from 'src/contexts';

const UseFetchAuthenticate = () => {

    const { setProfilePic } = useSearchContext();
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

    const _HandleSubmit = async (values) => {
        const { tab1, tab2, tab3, tab4, tab5, tab6 } = values;

        if (localStorage.getItem('otpToken')) {
            enableLoading();
            const data = {
                varificationCode: `${tab1}${tab2}${tab3}${tab4}${tab5}${tab6}`,
                OTPToken: localStorage.getItem('otpToken')
            }
            try {
                const { data: { data: { token, username, image, id }, message } } = await axiosInstance.authenticate(data);
                disableLoading();
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
                setProfilePic(image);
                localStorage.removeItem('otpToken');
                router.push('/dashboard/news-feed');
            }
            catch ({ response: { data: { message } } }) {
                console.log('Error', message)
                disableLoading();
                swal({
                    text: message,
                    buttons: false,
                    dangerMode: true,
                    timer: 3000,
                    icon: 'error'
                })
            }
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: AuthenticateSchema,
        validateOnBlur: true,
        onSubmit: (values, { setSubmitting, setStatus }) => {
            _HandleSubmit(values);
        }
    });

    return { loading, formik, verified, resendOTP };

}

export default UseFetchAuthenticate;
