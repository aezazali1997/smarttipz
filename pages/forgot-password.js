/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { useFormik } from 'formik';
import Helmet from 'react-helmet';
import { Button, InputField } from '../components';
import { ForgetPasswordSchema } from '../utils/validation_shema';
import AxiosInstance from '../APIs/axiosInstance';
import logo from '../public/ST-2.png';
import forgetPassword from '../public/forgetPassword.png';
import swal from 'sweetalert';

const initialValues = {
    email: '',
    password: '',
    checked: false
}
const ForgetPassword = () => {


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

    const getInputClasses = (fieldname) => {
        if (formik.touched[fieldname] && formik.errors[fieldname]) {
            return "border-red-500";
        }

        if (formik.touched[fieldname] && !formik.errors[fieldname]) {
            return "border-blue-500";
        }

        return "";
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: ForgetPasswordSchema,
        validateOnBlur: true,
        onSubmit: ({ email }, { setSubmitting, setStatus }) => {
            setTimeout(() => {
                enableLoading();
                AxiosInstance.forgetPassword(email)
                    .then(({ data: { data, message, error } }) => {
                        disableLoading();
                        setError(false);
                        setStatus(message);
                        setShowAlert(true);
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


    return (
        <div className="flex flex-col h-screen pt-5 p-5 xs:p-10 pb-2 space-y-5">
            {/*SEO Support*/}
            <Helmet>
                <title>Forgot Password | Smart Tipz</title>
            </Helmet>
            {/*SEO Support End */}


            <div className="flex flex-col w-full lg:w-1/2">
                <span className="hidden lg:flex">
                    <Image src={logo} alt="brand logo" />
                </span>
            </div>


            <div className="flex flex-col w-full lg:flex-row pt-5 p-5 xs:p-10 pb-2 md:p-16 md:pb-1 md:pt-0">

                <div className="w-full h-full lg:w-1/2">
                    <Image src={forgetPassword} alt="banner" />
                </div>

                <div className="flex flex-col w-full lg:w-1/2 items-center">
                    <div className="flex flex-col w-full lg:max-w-md mt-4 lg:mt-0 space-y-2">
                        <p className=" font-bold text-3xl text-center lg:text-left lg:text-3xl">Forgot Password</p>
                        <p className="text-gray-400 text-md text-center lg:text-left">Enter you email address associated to your account</p>
                    </div>
                    <div className="flex w-full lg:max-w-md justify-evenly flex-col mt-6">
                        <form className="w-full" onSubmit={formik.handleSubmit}>
                            {
                                showAlert === true ? (

                                    <div className={`${error ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'} px-4 py-3 flex flex-row w-full justify-between items-center mb-10 rounded" role="alert`}>
                                        <span className="block sm:inline">{formik.status}</span>
                                        <span className="relative px-4 py-3">
                                            <svg onClick={() => toggleAlert()} className="fill-current h-6 w-6 text-black" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                        </span>
                                    </div>
                                ) : ('')
                            }

                            <InputField
                                name={"email"}
                                type={"email"}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && formik.errors.email}
                                svg={(
                                    <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                )}
                                inputClass={`${getInputClasses(
                                    "email"
                                )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                label={'Email'}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-700 text-sm mb-4" >{formik.errors.email}</div>
                            ) : null}



                            <Button
                                type={"submit"}
                                classNames={"flex w-full mt-5 justify-center bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-md"}
                                childrens={'Next'}
                                loading={loading}
                            />
                            <div className="flex mt-3 w-full ">
                                <p className="text-sm w-full text-gray-500 text-center ">
                                    <Link
                                        href="/forgot-password">
                                        <a className="text-blue-800 text-sm font-semibold hover:underline"
                                        >Try another way
                                        </a>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <span className="flex w-full justify-center lg:hidden pt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-2" width="185" height="6" viewBox="0 0 185 6">
                        <rect id="_-" data-name="-" width="185" height="6" rx="3" fill="#714de1" />
                    </svg>
                </span>
            </div>
        </div>
    )
}

export default ForgetPassword;
