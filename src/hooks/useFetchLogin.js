import React, { useEffect, useState } from 'react'
import cookie from 'js-cookie';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import axiosInstance from 'src/APIs/axiosInstance';
import { LoginSchema } from 'utils/validation_shema';



const UseFetchLogin = () => {
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

    const _HandleSubmit = async (email, password, setStatus) => {
        enableLoading();
        const data = { email, password }
        try {
            const { data: { data: { username, token, image, id }, message } } = await axiosInstance.login(data);
            disableLoading();
            setError(false);
            setStatus(message);
            setShowAlert(true);
            cookie.set('token', token);
            cookie.set('username', username);
            localStorage.setItem('image', image);
            localStorage.setItem('id', id);
            router.push('/dashboard/profile');
        }
        catch (e) {
            console.log(e.response.status);
            if (e.response.status === 405) {
                const data = { email: email }
                axiosInstance.resendOTP(data)
                    .then(({ data: { data: { OTPToken } } }) => {
                        swal({
                            title: "Email Not Verified",
                            text: 'Confirmation code sent to email address',
                            buttons: false,
                            dangerMode: true,
                            timer: 5000,
                            icon: 'info'
                        })
                        localStorage.setItem('otpToken', OTPToken);
                        disableLoading();
                        router.push('/auth/authenticate');
                    })
            }
            else {
                setError(true)
                setStatus(e.response.data.message);
                setShowAlert(true);
                disableLoading();
            }
        };
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: LoginSchema,
        validateOnBlur: true,
        onSubmit: ({ email, password }, { setStatus }) => {
            _HandleSubmit(email, password, setStatus)
        },

    });


    return { toggleAlert, showPassword, setShowPassword, showAlert, formik, loading, error };
}

export default UseFetchLogin;
