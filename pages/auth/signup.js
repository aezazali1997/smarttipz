/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import Helmet from 'react-helmet';
import reg from '../../public/reg.png';
import logo from '../../public/ST-2.png';
import { getInputClasses } from 'helpers';
import { Button, InputField, Modal, Footer, PhoneInput } from 'components';
import { UseFetchSignup } from 'hooks';
import { parseCookies } from 'nookies';
import { CloseEye, Email, OpenEye, PhoneSVG, User, GlobeSVG } from 'assets/SVGs';


const Signup = () => {

	const { loading, showPassword, formik, agree, showModal, accountType, phone, _HandlePhone,
		setShowPassword, toggleModal, _Confirm, _Cancel, _SelectAccount } = UseFetchSignup();

	return (
		<div className="flex flex-col w-full h-full lg:h-screen">
			{/*SEO Support*/}
			<Helmet>
				<title>SignUp | Smart Tipz</title>
			</Helmet>
			{/*SEO Support End */}

			<div className="hidden lg:flex flex-col w-full lg:flex-row pt-5 p-5 xs:p-10 pb-0">
				<div className="flex flex-col w-full lg:w-1/2 justify-start">
					<span className="flex relative w-48 h-11">
						<Image src='https://smart-tipz-data-bucket.s3.ap-southeast-1.amazonaws.com/public/ST-2.png'
							layout="fill" objectFit="contain" alt="brand logo" priority={true} />
					</span>
				</div>
				<div className="flex flex-col w-full lg:w-1/2 items-center">
					<div className="flex flex-col w-full lg:max-w-lg mt-4 lg:mt-0 space-y-1 px-2">
						<p className=" font-bold text-3xl text-center lg:text-left lg:text-3xl">Sign Up</p>
						<p className="text-gray-400 text-md text-center lg:text-left">Let's create your account</p>
						<p className="text-gray-400 text-sm lg:text-left">Already have an account? <Link href='/auth/login'>
							<a className="cursor-pointer font-semibold text no-underline hover:underline hover:text-indigo-700">
								Login</a>
						</Link>
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col h-full w-full lg:flex-row pt-5 p-5 xs:p-10 pb-2 md:p-16 md:pb-1 md:pt-0">

				<div className="flex w-full relative h-52 sm:h-64 lg:h-full">
					<Image src={reg} alt="brand logo" layout="fill" objectFit="contain" priority={true} />
				</div>

				<div className="flex flex-col w-full items-center">
					<div className="flex flex-col w-full lg:hidden mt-4 lg:mt-0 space-y-2">
						<p className=" font-bold text-3xl text-center lg:text-left lg:text-5xl">Sign Up</p>
						<p className="text-gray-400 text-lg text-center lg:text-left">Let's create your account</p>
						<p className="text-gray-400 text-sm text-center lg:text-left">Already have an account? <Link href='/auth/login'>
							<a className="cursor-pointer font-semibold text no-underline hover:underline hover:text-indigo-700">
								Login</a>
						</Link>
						</p>
					</div>
					<div className="flex w-full lg:max-w-md justify-evenly flex-col mt-6">
						<form className="w-full" onSubmit={formik.handleSubmit}>
							<div className="flex w-full mb-5 space-x-1">
								<Button
									onSubmit={() => _SelectAccount('Personal')}
									type={"button"}
									classNames={`flex w-full ${accountType === 'Personal' ? 'bg-purple-600 text-white' : 'text-indigo-600 bg-white'}
									 justify-center  hover:text-white hover:bg-purple-600 p-3
									rounded-md`}
									childrens={'Personal Account'}
								/>
								<Button
									onSubmit={() => _SelectAccount('Business')}
									type={"button"}
									classNames={`flex w-full ${accountType === 'Business' ? 'bg-purple-600 text-white' : 'text-indigo-600 bg-white'} justify-center hover:text-white hover:bg-purple-600
									p-3 rounded-md`}
									childrens={'Business Account'}
								/>
							</div>
							<InputField
								name={"name"}
								type={"text"}
								svg={(
									<User className={'w-6 h-6 text-gray-500'} />
								)}
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.name && formik.errors.name}
								inputClass={`${getInputClasses(
									formik, "name"
								)} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
								label={accountType === 'Personal' ? 'Name' : 'Business Name'}
							/>
							{formik.touched.name && formik.errors.name ? (
								<div className="text-red-700 text-sm mb-4" >{formik.errors.name}</div>
							) : null}
							<InputField
								name={"username"}
								type={"text"}
								svg={(
									<User className={'w-6 h-6 text-gray-500'} />
								)}
								value={formik.values.username}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.username && formik.errors.username}
								inputClass={`${getInputClasses(
									formik, "username"
								)} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
								label={accountType === 'Personal' ? 'Username' : 'Business Username'}
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
									<Email className="w-6 h-6 text-gray-500" />
								)}
								inputClass={`${getInputClasses(
									formik, "email"
								)} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
								label={accountType === 'Personal' ? 'Email' : 'Business Email'}
							/>
							{formik.touched.email && formik.errors.email ? (
								<div className="text-red-700 text-sm mb-4" >{formik.errors.email}</div>
							) : null}

							<div className={`relative ${formik.touched.phone && formik.errors.phone ? "mb-1" : "mb-5"} w-full`}>
								<PhoneInput
									value={phone}
									onChange={_HandlePhone}
								/>
								<PhoneSVG className="absolute right-2 top-3 w-6 h-6 pointer-events-none text-gray-500" />
								{formik.touched.phone && formik.errors.phone ? (
									<div className="text-red-700 text-sm mb-4" >{formik.errors.phone}</div>
								) : null}
							</div>

							<div className={`floating-input ${formik.touched.password && formik.errors.password ? "mb-1" : "mb-5"} relative`}>
								<input
									type={showPassword ? "text" : "password"}
									id={'password'}
									name={'password'}
									className={`${getInputClasses(
										formik, "password"
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
											<OpenEye className="w-6 h-6 text-gray-500" /> :
											<CloseEye className="w-6 h-6 text-gray-500" />
									}
								</div>
							</div>
							{formik.touched.password && formik.errors.password ? (
								<div className="text-red-700 text-sm mb-4" >{formik.errors.password}</div>
							) : null}

							{
								accountType === 'Business' && (
									<>
										<InputField
											name={"website"}
											type={"text"}
											svg={(
												<GlobeSVG className="h-6 w-6 text-gray-500" />
											)}
											value={formik.values.website}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.websiteName && formik.errors.website}
											inputClass={`${getInputClasses(
												formik, "website"
											)} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
											label={'Business Website address'}
										/>
										{formik.touched.website && formik.errors.website ? (
											<div className="text-red-700 text-sm mb-4" >{formik.errors.website}</div>
										) : null}

									</>)
							}
							<div className="flex mb-5" >
								<label
									className="flex items-center text-sm cursor-pointer text  font-semibold">
									<input onChange={toggleModal} type="checkbox" color={'#714de1'} checked={agree} className="form-checkbox" />
									<span className="ml-2">I agree to the terms and conditions</span>
								</label>
							</div>

							<Button
								type={"submit"}
								disable={agree ? false : true}
								classNames={`flex w-full justify-center ${agree ? 'btn' : 'btn-disable'} text-white p-3 rounded-md`}
								childrens={'Sign Up'}
								loading={loading}
							/>
							{/* <div className="flex mt-8 w-full">
										<p className="text-sm text-gray-500 text-center">By creating an account you agree to the{' '}
												<Link
													href="/auth/terms-and-conditions">
													<a className="text-blue-800 text-sm font-semibold hover:underline"
													>terms & conditions
													</a>
											</Link> and{' '} 
											<Link

													href="/auth/privacy-policy">
													<a
															className="text-blue-800 text-sm font-semibold hover:underline"
													>Privacy Policy
													</a>
											</Link>.
									</p>
							</div> */}
						</form>
					</div>
				</div>
				{/* <span className="flex w-full justify-center lg:hidden pt-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="185" height="6" viewBox="0 0 185 6">
						<rect id="_-" data-name="-" width="185" height="6" rx="3" fill="#714de1" />
					</svg>
				</span> */}
			</div>
			{/* {
				showModal && (
					<Modal
						title={'Terms and Conditions'}
						body={(
							<div className="flex flex-col w-full h-full py-5 text-justify">
								<p>
									What is Lorem Ipsum?
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

								</p><br />
								<p>
									What is Lorem Ipsum?
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

								</p><br />
								<p>
									What is Lorem Ipsum?
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
								</p>
							</div>
						)}
						confirmButton={'I Agree'}
						confirmBtnType={'button'}
						handleModal={toggleModal}
						handleConfirm={_Confirm}
						handleCancel={_Cancel}
					/>
				)
			} */}
			<Footer logo={logo} />
		</div>
	)
}

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

export default Signup;
