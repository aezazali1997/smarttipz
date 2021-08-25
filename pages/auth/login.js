/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import Image from 'next/image';
import Helmet from 'react-helmet';
import logo from '../../public/ST-2.png';
import login from '../../public/login.png';
import { getInputClasses } from 'helpers';
import { Button, InputField } from 'components';
import { UseFetchLogin } from 'hooks';


const Login = () => {

    const { toggleAlert, showPassword, setShowPassword, showAlert, formik, loading, error } = UseFetchLogin();

    return (
        <div className="flex flex-col h-screen pt-5 p-5 xs:p-10 pb-2 space-y-5">
            {/*SEO Support*/}
            <Helmet>
                <title>Login | Smart Tipz</title>
            </Helmet>
            {/*SEO Support End */}


            <div className="hidden lg:flex flex-col w-full">
                <span className="flex">
                    <Image src={logo} alt="brand logo" />
                </span>
            </div>

            <div className="flex flex-col w-full lg:flex-row pt-5 p-5 xs:p-10 pb-2 md:p-16 md:pb-1 md:pt-0">

                <div className="flex w-full justify-center items-center text-center overflow-hidden">
                    <Image src={login} alt="banner" objectFit="contain" />
                </div>

                <div className="flex flex-col w-full items-center">
                    <div className="flex flex-col w-full lg:max-w-md mt-4 lg:mt-0 space-y-2">
                        <p className=" font-bold text-3xl text-center lg:text-left lg:text-3xl">Login</p>
                        <p className="text-gray-400 text-md text-center lg:text-left">New user?&nbsp;
                            <Link
                                href="/auth/signup">
                                <a className="text-blue-800 text-md font-semibold hover:underline"
                                >Create an account
                                </a>
                            </Link></p>
                    </div>
                    <div className="flex w-full lg:max-w-md justify-evenly flex-col mt-6">
                        <form className="w-full" onSubmit={formik.handleSubmit}>
                            {
                                showAlert === true ? (

                                    <div className={`${error ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'} px-4 py-3 flex flex-row w-full justify-between items-center mb-10 rounded" role="alert`}>
                                        <span className="block sm:inline">{formik.status}</span>
                                        <span className="relative px-4 py-3">
                                            <svg
                                                onClick={() => toggleAlert()}
                                                className="fill-current h-6 w-6 text-black" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title>
                                                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                            </svg>
                                        </span>
                                    </div>
                                ) : ('')
                            }

                            <InputField
                                name={"username"}
                                type={"text"}
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.username && formik.errors.username}
                                svg={(
                                    <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                )}
                                inputClass={`${getInputClasses(
                                    formik, "username"
                                )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                                label={'Username'}
                            />
                            {formik.touched.username && formik.errors.username ? (
                                <div className="text-red-700 text-sm mb-4" >{formik.errors.username}</div>
                            ) : null}


                            <div className={`floating-input ${formik.touched.password && formik.errors.password ? "mb-1" : "mb-5"} relative`}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id={'password'}
                                    name={'password'}
                                    className={`${getInputClasses(
                                        formik, "password"
                                    )}   border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}

                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="name@example.com"
                                    autoComplete="off" />
                                <label
                                    htmlFor="password"
                                    className="absolute top-0 left-0 px-2 py-3 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                                    Password
                                </label>
                                <div onClick={() => { setShowPassword(!showPassword) }}
                                    className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer ">
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

                            {/* <label className="flex items-center">
                                <input type="checkbox"
                                    className={`${getInputClasses(
                                        "checked"
                                    )}  border bg-gray-100 border-gray-200 focus:outline-none rounded-md focus:shadow-sm`}
                                    checked={formik.values.checked}
                                    name="checked"
                                    id="checked"
                                    {...formik.getFieldProps('checked')}
                                />
                                <span className="ml-2 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="124" height="19" viewBox="0 0 124 19">
                                        <text id="Keep_me_checked_in" data-name="Keep me checked in" transform="translate(0 15)" fill="#6d6d6d" fontSize="14" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">Keep me checked in</tspan></text>
                                    </svg>
                                </span>
                            </label> */}

                            <Button
                                type={"submit"}
                                classNames={"flex w-full mt-10 justify-center btn text-white p-3 rounded-md"}
                                childrens={'Login'}
                                loading={loading}
                            />

                            <div className="flex mt-3 w-full ">
                                <p className="text-sm w-full text-gray-500 text-center ">
                                    <Link
                                        href="/auth/forgot-password">
                                        <a className="text-blue-800 text-sm font-semibold hover:underline"
                                        >Forgot Password?
                                        </a>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <span className="flex justify-center lg:hidden pt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="185" height="6" viewBox="0 0 185 6">
                        <rect id="_-" data-name="-" width="185" height="6" rx="3" fill="#714de1" />
                    </svg>
                </span>
            </div>
        </div>
    )
}

export default Login;
