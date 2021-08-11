/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import { InputField } from '../components';
import profile from '../public/profile.jpg';
import { AccountInfoValidationSchema } from '../utils/validation_shema';
import { parseCookies } from 'nookies';
import axios from 'axios';
import axiosInstance from '../APIs/axiosInstance';

const initialValues = {
    old: '',
    new: '',
    confirm: ''
}

const Setting = ({ settings }) => {
    const [personalInfo, setPersonalInfo] = useState({});
    const [image, setImage] = useState('');


    useEffect(() => {
        console.log('settings', settings)
        setPersonalInfo(settings);
    }, [image]);

    const { aboutme, accessible, followed, following, rating, username, views, videos, picture, } = personalInfo;

    let upload = useRef();

    let _OnChangeImg = (event) => {
        const { files } = event.target;
        const img = URL.createObjectURL(files[0]);
        const data = { link: img };
        axiosInstance.uploadProfilePic(data)
            .then(res => {
                setImage(img);
            }).catch(e => {
                console.log(e.message);
            })
    }

    let _BrowseImg = () => {
        upload.current.click();
    }

    let _DeleteImg = (index) => {
        setOrderImages(image => image = '');
    }

    const _OnChange = (e) => {
        const { name, value, checked } = e.target;
        let copyOriginal = { ...personalInfo };
        let newObject = (name === 'message' || name === 'phoneStatus' ?
            { ...copyOriginal, [name]: checked } : { ...copyOriginal, [name]: value });
        setPersonalInfo(newObject);
    }


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
        initialValues: initialValues,
        validationSchema: AccountInfoValidationSchema,
        onSubmit: (values, { setSubmitting, setStatus }) => {
            setTimeout(() => {
                enableLoading();
                console.log({ values });
            }, 1000);
        },
    });

    return (

        <div className="flex flex-col h-full w-full p-3 sm:p-5">
            {/*SEO Support*/}
            <Helmet>
                <title>Setting | Smart Tipz</title>
            </Helmet>
            {/*SEO Support End */}


            <div className="flex flex-col w-full h-auto">
                {/* section starts here*/}
                <div className="flex w-full px-2 py-1">
                    <div className="relative space-y-2">
                        <img src={image} alt="profile" className="rounded-2xl profilePic" />
                        <div className="flex w-full space-x-1">
                            <input
                                type="file"
                                accept='image/*'
                                ref={upload}
                                className="hidden"
                                onChange={_OnChangeImg}
                            />
                            <button
                                onClick={_BrowseImg}
                                type="button"
                                className="px-2 py-1 w-1/2 flex justify-center items-center text-white text-sm bg-indigo-600 rounded-md hover:bg-indigo-700">
                                Edit
                            </button>
                            <button
                                type="button"
                                className="px-2 py-1 w-1/2 flex items-center justify-center text-white text-sm bg-red-600 rounded-md hover:bg-red-700">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                {/* section ends here */}
                {/* section starts here */}
                <form className="w-full" onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col sm:flex-row mt-10 w-full sm:divide-x-2">
                        <div className="flex flex-col w-full lg:w-1/2 space-y-2 px-3">
                            <h1 className="text-lg font-semibold">Personal Information</h1>
                            <div className="flex flex-col w-full">
                                <InputField
                                    name={"name"}
                                    type={"text"}
                                    value={username}
                                    onChange={_OnChange}
                                    svg={(
                                        <svg className="w-6 h-6 text-gray-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>

                                    )}
                                    inputClass={`border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                    label={'Name'}
                                />
                                <InputField
                                    disabled={true}
                                    name={"email"}
                                    type={"text"}
                                    // value={email}
                                    onChange={_OnChange}
                                    svg={(
                                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                    )}
                                    inputClass={`border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                    label={'Email'}
                                />
                                <div className="flex w-full justify-between mb-5">
                                    <div className="flex w-full">
                                        <InputField
                                            name={"phone"}
                                            type={"text"}
                                            // value={phone}
                                            onChange={_OnChange}
                                            svg={(
                                                <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                                            )}
                                            inputClass={`border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3 h-12`}
                                            label={'Phone no'}
                                        />
                                    </div>
                                    <div className="flex flex-row"></div>
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input
                                            checked={accessible}
                                            onChange={_OnChange}
                                            type="checkbox"
                                            name="phoneStatus"
                                            id="phoneStatus"
                                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                                        <label htmlFor="phoneStatus" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
                                </div>
                                <div className='floating-input mb-5 relative'>
                                    <textarea
                                        type="text"
                                        id="aboutme"
                                        rows={5}
                                        name="aboutme"
                                        className={`border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3`}
                                        value={aboutme}
                                        onChange={_OnChange}
                                        placeholder="name@example.com"
                                        autoComplete="off" />
                                    <label
                                        htmlFor="aboutme"
                                        className="absolute top-0 left-0 px-2 py-3 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                                        About me
                                    </label>
                                </div>
                                <InputField
                                    name={"website"}
                                    type={"text"}
                                    // value={website}
                                    onChange={_OnChange}
                                    svg={(
                                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" /></svg>)}
                                    inputClass={`border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                    label={'Website link'}
                                />
                                <div className="flex w-full justify-between mb-5">
                                    <p className="text-md font-normal">Message</p>
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input
                                            // checked={message}
                                            onChange={_OnChange}
                                            type="checkbox"
                                            name="message"
                                            id="message"
                                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                                        <label htmlFor="message" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-end">
                                <button type="button" className="px-3 py-2 flex justify-center items-center text-white text-sm bg-indigo-600 rounded-md hover:bg-indigo-700">
                                    Update
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col w-full lg:w-1/2 space-y-2 mt-10 sm:mt-0 px-3">
                            <h1 className="text-lg font-semibold">Account Information</h1>
                            <div className="flex flex-col w-full">
                                <InputField
                                    name={"old"}
                                    type={"text"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.old && formik.errors.old}
                                    svg={(
                                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" /></svg>

                                    )}
                                    inputClass={`${getInputClasses(
                                        "old"
                                    )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                    label={'Old Password'}
                                />
                                {formik.touched.old && formik.errors.old ? (
                                    <div className="text-red-700 text-sm mb-4" >{formik.errors.old}</div>
                                ) : null}

                                <InputField
                                    name={"new"}
                                    type={"text"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.new && formik.errors.new}
                                    svg={(
                                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" /></svg>

                                    )}
                                    inputClass={` ${getInputClasses(
                                        "new"
                                    )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                    label={'New password'}
                                />
                                {formik.touched.new && formik.errors.new ? (
                                    <div className="text-red-700 text-sm mb-4" >{formik.errors.new}</div>
                                ) : null}
                                <InputField
                                    name={"confirm"}
                                    type={"text"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirm && formik.errors.confirm}
                                    svg={(
                                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" /></svg>
                                    )}
                                    inputClass={`${getInputClasses(
                                        "confirm"
                                    )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                    label={'Confirm password'}
                                />
                                {formik.touched.confirm && formik.errors.confirm ? (
                                    <div className="text-red-700 text-sm mb-4" >{formik.errors.confirm}</div>
                                ) : null}
                            </div>
                            <div className="flex w-full items-center justify-end mt-10">
                                <button type="submit" className="px-3 py-2 flex justify-center items-center text-white text-sm bg-indigo-600 rounded-md hover:bg-indigo-700">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                {/* section ends here */}
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const { token } = parseCookies(context);
    const res = await axios.get(`${process.env.BASE_URL}api/profile`, { headers: { Authorization: "Bearer " + token } })
    const { data } = res.data;
    return {
        props: {
            settings: data
        }
    }
}
export default Setting;
