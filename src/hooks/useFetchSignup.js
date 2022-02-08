import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import axiosInstance from 'src/APIs/axiosInstance';
import { SignupSchema, PersonalSignupSchema } from 'utils/validation_shema';

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
        setAgree(!agree);
        // setShowModal(!showModal);
    };
    const _HandlePhone = (value) => {
        setPhone(value);
    };

    const _HandleSubmit = async (name, email, password, username, website, setSubmitting) => {
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
        try {
            const { data: { data: { OTPToken }, message } } = await axiosInstance.signup(data);
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
        }
        catch (e) {
            disableLoading();
            setSubmitting(false);
            swal({
                text: e.response.data.message,
                buttons: false,
                dangerMode: true,
                timer: 3000,
                icon: 'error'
            })
        }
    }


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
        onSubmit: ({ name, email, password, username, website }, { setSubmitting }) => {
            _HandleSubmit(name, email, password, username, website, setSubmitting)
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
        setAccountType(type);
    }

    return { showPassword, loading, formik, showModal, agree, accountType, phone, _HandlePhone, _SelectAccount, setShowPassword, toggleModal, _Confirm, _Cancel };
}

export default UseFetchSignup;
