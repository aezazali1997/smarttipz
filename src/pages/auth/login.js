/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import Image from 'next/image';
import Helmet from 'react-helmet';
import { parseCookies } from 'nookies';
import login from 'public/login.png';
import { getInputClasses } from 'helpers';
import { UseFetchLogin } from 'src/hooks';
import { Button, Footer, InputField } from 'src/components';
import { CloseEye, Email, OpenEye } from 'src/assets/SVGs';

const Login = () => {
  const { toggleAlert, setShowPassword, showPassword, showAlert, formik, loading, error } = UseFetchLogin();

  return (
    <div className="flex flex-col h-full md:h-screen w-full">
      <div className="flex flex-col h-full pt-5 p-5 xs:p-10 pb-2 space-y-5">
        {/*SEO Support*/}
        <Helmet>
          <title>Login | Smart Tipz</title>
        </Helmet>
        {/*SEO Support End */}

        <div className="hidden lg:flex flex-col w-full">
          <span className="flex relative w-48 h-12">
            <Image
              src="https://smart-tipz-data-bucket.s3.ap-southeast-1.amazonaws.com/public/ST-2.svg"
              layout="fill"
              objectFit="cover"
              alt="brand logo"
              priority={true}
            />
          </span>
        </div>

        <div className="flex flex-col w-full h-full lg:flex-row pt-5 p-5 xs:p-10 pb-2 md:p-16 md:pb-1 md:pt-0">
          <div className="flex w-full relative h-52 sm:h-64 lg:h-full">
            <Image src={login} alt="banner" layout="fill" objectFit="contain" priority={true} />
          </div>

          <div className="flex flex-col w-full items-center">
            <div className="flex flex-col w-full lg:max-w-md mt-4 lg:mt-0 space-y-2">
              <p className=" font-bold text-3xl text-center lg:text-left lg:text-3xl">Login</p>
              <p className="text-gray-400 text-md text-center lg:text-left">
                New user?&nbsp;
                <Link href="/auth/signup">
                  <a className="text text-md font-semibold hover:underline">Create an account</a>
                </Link>
              </p>
            </div>
            <div className="flex w-full lg:max-w-md justify-evenly flex-col mt-6">
              <form className="w-full" onSubmit={formik.handleSubmit}>
                {showAlert === true ? (
                  <div
                    className={`${
                      error
                        ? 'bg-red-100 border border-red-400 text-red-700'
                        : 'bg-green-100 border border-green-400 text-green-700'
                    } px-4 py-3 flex flex-row w-full justify-between items-center mb-10 rounded" role="alert`}>
                    <span className="block sm:inline">{formik.status}</span>
                    <span className="relative px-4 py-3">
                      <svg
                        onClick={() => toggleAlert()}
                        className="fill-current h-6 w-6 text-black"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                      </svg>
                    </span>
                  </div>
                ) : (
                  ''
                )}

                <InputField
                  name={'email'}
                  type={'text'}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && formik.errors.email}
                  svg={<Email className={'w-6 h-6 text-gray-500'} />}
                  inputClass={`${getInputClasses(
                    formik,
                    'email'
                  )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                  label={'Email'}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-700 text-sm mb-4">{formik.errors.email}</div>
                ) : null}

                <div
                  className={`floating-input ${
                    formik.touched.password && formik.errors.password ? 'mb-1' : 'mb-5'
                  } relative`}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id={'password'}
                    name={'password'}
                    className={`${getInputClasses(
                      formik,
                      'password'
                    )}   border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="name@example.com"
                    autoComplete="off"
                  />
                  <label
                    htmlFor="password"
                    className="absolute top-0 left-0 px-2 py-3 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                    Password
                  </label>
                  <div
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer ">
                    {showPassword ? (
                      <OpenEye className="w-6 h-6 text-gray-500" />
                    ) : (
                      <CloseEye className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-700 text-sm mb-4">{formik.errors.password}</div>
                ) : null}

                <Button
                  type={'submit'}
                  disabled={loading}
                  classNames={`flex w-full mt-10 justify-center ${
                    loading ? 'btn-disable' : 'btn'
                  } text-white p-3 rounded-md`}
                  childrens={'Login'}
                  loading={loading}
                />

                <div className="flex mt-3 w-full ">
                  <p className="text-sm w-full text-gray-500 text-center ">
                    <Link href="/auth/forgot-password">
                      <a className="text text-sm font-semibold hover:underline">Forgot Password?</a>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};
export const getServerSideProps = async (context) => {
    const { token } = parseCookies(context);
    if (token)
        return {
            redirect: {
                permanent: false,
                destination: "/dashboard/profile",
            },
            props: {},
        };
    else {
        return {
            props: {}
        }
    }
}
export default Login;
