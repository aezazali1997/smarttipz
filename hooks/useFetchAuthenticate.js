import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import swal from 'sweetalert';
import axiosInstance from '../APIs/axiosInstance';
import { AuthenticateSchema } from '../utils/validation_shema';

const UseFetchAuthenticate = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

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
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: AuthenticateSchema,
        validateOnBlur: true,
        onSubmit: ({ tab1, tab2, tab3, tab4, tab5, tab6 }, { setSubmitting, setStatus }) => {
            setTimeout(() => {
                if (localStorage.getItem('username')) {
                    enableLoading();
                    const data = {
                        varificationCode: `${tab1}${tab2}${tab3}${tab4}${tab5}${tab6}`,
                        username: localStorage.getItem('username')
                    }
                    console.log(data);
                    axiosInstance.authenticate(data)
                        .then(({ data: { error, data, message } }) => {
                            disableLoading();
                            console.log(message, error, data);
                            swal({
                                text: message,
                                buttons: false,
                                dangerMode: true,
                                timer: 3000,
                                icon: 'success'
                            })
                            router.push('/auth/login');
                        })
                        .catch((e) => {
                            console.log('Error', e)
                            disableLoading();
                            setSubmitting(false);
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

    return { loading, formik }

}

export default UseFetchAuthenticate;
