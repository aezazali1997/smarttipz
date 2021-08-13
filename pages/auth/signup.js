/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { useFormik } from 'formik';
import Helmet from 'react-helmet';
import { Button, InputField } from '../../components';
import { SignupSchema } from '../../utils/validation_shema';
import AxiosInstance from '../../APIs/axiosInstance';
import logo from '../../public/ST-2.png';
import reg from '../../public/reg.png';
import swal from 'sweetalert';
import { useRouter } from 'next/router'

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
const Signup = () => {
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);

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
                AxiosInstance.signup(data)
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


    return (
        <>
            {/*SEO Support*/}
            <Helmet>
                <title>SignUp | Smart Tipz</title>
            </Helmet>
            {/*SEO Support End */}

            <div className="flex flex-col w-full lg:flex-row pt-5 p-5 xs:p-10 pb-0">
                <div className="flex flex-col w-full lg:w-1/2 justify-start">
                    <span className="hidden lg:flex">
                        <Image src={logo} alt="brand logo" />
                    </span>
                </div>
                <div className="hidden lg:flex flex-col w-full lg:w-1/2 items-center">
                    <div className="flex flex-col w-full lg:max-w-lg mt-4 lg:mt-0 space-y-1">
                        <p className=" font-bold text-3xl text-center lg:text-left lg:text-3xl">Sign Up</p>
                        <p className="text-gray-400 text-md text-center lg:text-left">Let's create your account</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full lg:flex-row pt-5 p-5 xs:p-10 pb-2 md:p-16 md:pb-1 md:pt-0">

                <div className="w-full h-full flex flex-col lg:w-1/2">
                    <Image src={reg} alt="brand logo" layout="responsive" width={500} height={430} />
                </div>

                <div className="flex flex-col w-full lg:w-1/2 items-center">
                    <div className="flex flex-col w-full lg:hidden mt-4 lg:mt-0 space-y-2">
                        <p className=" font-bold text-3xl text-center lg:text-left lg:text-5xl">Sign Up</p>
                        <p className="text-gray-400 text-lg text-center lg:text-left">Let's create your account</p>
                    </div>
                    <div className="flex w-full lg:max-w-md justify-evenly flex-col mt-6">
                        <form className="w-full" onSubmit={formik.handleSubmit}>
                            <InputField
                                name={"name"}
                                type={"text"}
                                svg={(
                                    <svg className="w-6 h-6 text-gray-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                )}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && formik.errors.name}
                                inputClass={`${getInputClasses(
                                    "name"
                                )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                label={'Name'}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-700 text-sm mb-4" >{formik.errors.name}</div>
                            ) : null}
                            <InputField
                                name={"username"}
                                type={"text"}
                                svg={(
                                    <svg className="w-6 h-6 text-gray-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                )}
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.username && formik.errors.username}
                                inputClass={`${getInputClasses(
                                    "username"
                                )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                label={'Username'}
                            />
                            {formik.touched.username && formik.errors.username ? (
                                <div className="text-red-700 text-sm mb-4" >{formik.errors.username}</div>
                            ) : null}

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

                            <InputField
                                name={"phone"}
                                type={"text"}
                                svg={(
                                    <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                )}
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phone && formik.errors.phone}
                                inputClass={`${getInputClasses(
                                    "phone"
                                )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                label={'Phone number'}
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <div className="text-red-700 text-sm mb-4" >{formik.errors.phone}</div>
                            ) : null}

                            <div className={`floating-input ${formik.touched.password && formik.errors.password ? "mb-1" : "mb-5"} relative`}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id={'password'}
                                    name={'password'}
                                    className={`${getInputClasses(
                                        "password"
                                    )}  border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}

                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="name@example.com"
                                    autoComplete="off" />
                                <label
                                    htmlFor="password"
                                    className="absolute top-0 left-0 px-2 py-3 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out">
                                    Password
                                </label>
                                <div onClick={() => { setShowPassword(!showPassword) }}
                                    className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer">
                                    {
                                        showPassword ?
                                            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                            :
                                            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                            </svg>}
                                </div>
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-700 text-sm mb-4" >{formik.errors.password}</div>
                            ) : null}


                            <div className={`floating-input ${formik.touched.accountType && formik.errors.accountType ? "mb-1" : "mb-5"} relative`}>
                                <select
                                    type={'select'}
                                    id={'accountType'}
                                    name={'accountType'}

                                    className={`${getInputClasses(
                                        "accountType"
                                    )}  border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                    value={formik.values.accountType}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="name@example.com"
                                >
                                    <option value="">Select account</option>
                                    <option value="Business">Business</option>
                                    <option value="Personal">Personal</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500 pointer-events-none" width="19.524" height="19.524" viewBox="0 0 19.524 19.524">
                                        <path id="Icon_ionic-ios-arrow-dropdown-circle" data-name="Icon ionic-ios-arrow-dropdown-circle" d="M3.375,13.137a9.762,9.762,0,0,0,19.524,0c0-3.656-5.248-8.658-5.248-8.658a16.252,16.252,0,0,0-4.514-1.1A9.76,9.76,0,0,0,3.375,13.137ZM16.943,11.1s.929-.352,1.281,0a.9.9,0,0,1,.263.638.91.91,0,0,1-.268.643l-4.426,4.412a.9.9,0,0,1-1.248-.028L8.054,12.287a.906.906,0,0,1,1.281-1.281l3.806,3.844Z" transform="translate(-3.375 -3.375)" fill="#6d6d6d" />
                                    </svg>

                                </div>
                            </div>
                            {formik.touched.accountType && formik.errors.accountType ? (
                                <div className="text-red-700 text-sm mb-4" >{formik.errors.accountType}</div>
                            ) : null}

                            {
                                formik.values.accountType === 'Business' && (
                                    <>
                                        {/* <InputField
                      name={"businessName"}
                      type={"text"}
                      svg={(
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            id="Icon_ionic-md-business"
                            data-name="Icon ionic-md-business"
                            d="M13.372,8.5v-4h-10V22.522H22.9V8.5Zm-6,12.015h-2v-2h2Zm0-4h-2v-2h2Zm0-4h-2v-2h2Zm0-4.008h-2v-2h2Zm4,12.015h-2v-2h2Zm0-4h-2v-2h2Zm0-4h-2v-2h2Zm0-4.008h-2v-2h2ZM20.9,20.518H13.372v-2h2v-2h-2v-2h2v-2h-2v-2H20.9Zm-1.765-8.007h-2v2h2Zm0,4h-2v2h2Z"
                            transform="translate(-3.375 -4.5)" fill="#6d6d6d" />
                        </svg>
                      )}
                      value={formik.values.businessName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.businessName && formik.errors.businessName}
                      inputClass={`${getInputClasses(
                        "businessName"
                      )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                      label={'Business name'}
                    />
                    {formik.touched.businessName && formik.errors.businessName ? (
                      <div className="text-red-700 text-sm mb-4" >{formik.errors.businessName}</div>
                    ) : null} */}

                                        <InputField
                                            name={"website"}
                                            type={"text"}
                                            svg={(
                                                <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                            value={formik.values.website}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.websiteName && formik.errors.website}
                                            inputClass={`${getInputClasses(
                                                "website"
                                            )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                            label={'Website address'}
                                        />
                                        {formik.touched.website && formik.errors.website ? (
                                            <div className="text-red-700 text-sm mb-4" >{formik.errors.website}</div>
                                        ) : null}


                                    </>)
                            }

                            <Button
                                type={"submit"}
                                classNames={"flex w-full justify-center btn text-white p-3 rounded-md"}
                                childrens={'Sign Up'}
                                loading={loading}
                            />
                            <div className="flex mt-8 w-full">
                                <p className="text-sm text-gray-500 text-center">By creating an account you agree to the{' '}
                                    <Link
                                        href="/termsAndConditions">
                                        <a className="text-blue-800 text-sm font-semibold hover:underline"
                                        >Terms & Conditions
                                        </a>
                                    </Link> and{' '}
                                    <Link

                                        href="/privacyPolicy">
                                        <a
                                            className="text-blue-800 text-sm font-semibold hover:underline"
                                        >Privacy Policy
                                        </a>
                                    </Link>.
                                </p>
                            </div>
                        </form>
                    </div>

                </div>
                <span className="flex w-full justify-center lg:hidden pt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="185" height="6" viewBox="0 0 185 6">
                        <rect id="_-" data-name="-" width="185" height="6" rx="3" fill="#714de1" />
                    </svg>
                </span>
            </div>
        </ >
    )
}

export default Signup;
