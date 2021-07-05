/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import Link from 'next/link'
import { useFormik } from 'formik';
import Helmet from 'react-helmet';
import { Button, InputField } from '../components';
import { SignupSchema } from '../utils/validation_shema';
// import { signup } from '../APIs/axiosInstance';

const initialValues = {
  username: '',
  email: '',
  password: ''
}


const Signup = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);


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
    initialValues,
    validationSchema: SignupSchema,
    onSubmit: ({ username, email, password }, { setSubmitting }) => {
      console.log('submittedValues', { username, email, password });
      // setLoading(!loading);
      // signup(values).then((res) => {
      //   console.log('res', res.data);
      // })
      //   .catch(error => {
      //     console.log('error', error.response.message);
      //   })
    },
  });


  return (
    <div className="container-fluid py-3">
      {/*SEO Support*/}
      <Helmet>
        <title>SignUp | Smart Tipz</title>

      </Helmet>
      {/*SEO Support End */}
      <div className="flex flex-row justify-between bg-white px-4">
        <div className="flex flex-col flex-start">
          <h1 className="text-purple-800 text-bold text-3xl font-bold">
            ST Platform
          </h1>
          <span className="mt-4 text-gray-500">
            Ut enim ad minim veniam, quis nostrud exercitation <br />
            ullamico laboris nisi ut allquip ex ea commodo.
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row mt-7">
        <div className=" hidden w-full lg:w-1/2 lg:flex h-auto relative" >
          <img src="https://bashooka.com/wp-content/uploads/2019/04/portrait-logo-design-8.jpg" alt="banner" />
        </div>

        <div className="flex flex-col w-full lg:w-1/2  px-7">
          <div className="flex flex-col justify-start ">
            <h1 className="text-3xl text-bold font-bold">
              Sign Up
            </h1>
            <span className="mt-4 text-gray-400 font-semibold">
              Let's create your account
            </span>
          </div>
          <div className="flex w-full lg:max-w-md justify-evenly flex-col mt-6">
            <form className="w-full" onSubmit={formik.handleSubmit}>
              <InputField
                name={"username"}
                type={"text"}
                svg={(
                  <svg className="w-6 h-6 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                )}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && formik.errors.username}
                inputClass={`${getInputClasses(
                  "username"
                )} border bg-gray-100 border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-16`}
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
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                )}
                inputClass={`${getInputClasses(
                  "email"
                )} border bg-gray-100 border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16`}
                label={'Email'}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-700 text-sm mb-4" >{formik.errors.email}</div>
              ) : null}

              <div className={`floating-input ${formik.touched.password && formik.errors.password ? "mb-1" : "mb-5"} relative`}>
                <input
                  type={showPassword ? "text" : "password"}
                  id={'password'}
                  name={'password'}
                  className={`${getInputClasses(
                    "password"
                  )} border bg-gray-50 border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-16`}

                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="name@example.com"
                  autoComplete="off" />
                <label
                  htmlFor="username"
                  className="absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                  Password
                </label>
                <div onClick={() => { setShowPassword(!showPassword) }} className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer ">
                  {
                    showPassword ?
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      :
                      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  }
                </div>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-700 text-sm mb-4" >{formik.errors.password}</div>
              ) : null}

              <Button
                type={"submit"}
                classNames={"flex w-full justify-center bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-md"}
                childrens={'Submit'}
                loading={loading}
              />
              <div className="flex mt-8 text-center items-center">
                <p className="text-md text-gray-500">By creating an account you agree to the{' '}
                  <Link
                    href="/">
                    <a className="text-blue-800 text-sm font-semibold hover:underline"
                    >Terms & Conditions
                    </a>
                  </Link> and{' '}
                  <Link

                    href="/">
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
      </div>
    </div>
  )
}

export default Signup;
