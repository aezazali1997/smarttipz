import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import axiosInstance from '../APIs/axiosInstance';
import { SignupSchema, PersonalSignupSchema } from '../utils/validation_shema';

const UseFetchSignup = () => {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [agree, setAgree] = useState(false);
    const [accountType, setAccountType] = useState('Personal');
    const [phone, setPhone] = useState('');


    useEffect(() => { }, [accountType])

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const _HandlePhone = (value) => {
        setPhone(value);
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
        validationSchema: (accountType === 'Business' ? SignupSchema : PersonalSignupSchema),
        validateOnBlur: true,
        onSubmit: ({ name, email, password, username, website },
            { setSubmitting }) => {
            setTimeout(() => {
                enableLoading();
                const data = {
                    name,
                    username,
                    email,
                    phone: phone,
                    password,
                    accountType: accountType,
                    // businessName,
                    website: website || ''
                }
                console.log(data);
                axiosInstance.signup(data)
                    .then(({ data: { data: { OTPToken }, message } }) => {
                        console.log('res >>', OTPToken);
                        disableLoading();
                        swal({
                            text: message,
                            buttons: false,
                            dangerMode: true,
                            timer: 5000,
                            icon: 'success'
                        })
                        localStorage.setItem('otpToken', OTPToken);
                        router.push({ pathname: '/auth/authenticate', state: { email } })
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

    const _Confirm = () => {
        setAgree(true);
        toggleModal();
    }

    const _Cancel = () => {
        setAgree(false);
        toggleModal();
    }

    const _SelectAccount = (type) => {
        console.log('type: ', type);
        setAccountType(type);
    }

    return { showPassword, loading, formik, showModal, agree, accountType, phone, _HandlePhone, _SelectAccount, setShowPassword, toggleModal, _Confirm, _Cancel };
}

export default UseFetchSignup;
