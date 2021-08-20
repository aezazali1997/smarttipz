/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import { parseCookies } from 'nookies';
import axios from 'axios';
import swal from 'sweetalert';
import { AccountSetting, BusinessCard, Button, InputField } from '../../components';
// import profile from '../../public/profile.jpg';
import { AccountInfoValidationSchema } from '../../utils/validation_shema';
import axiosInstance from '../../APIs/axiosInstance';
import ReactTooltip from 'react-tooltip';
import { useS3Upload } from 'next-s3-upload';

const initialValues = {
  old: '',
  new: '',
  confirm: ''
}

let update = false;

const Setting = ({ settings }) => {
  const [personalLoading, setPersonalLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    phone: '', accessible: '', name: '', email: '', showPhone: '', about: '', website: '', name: ''
  });
  const [updated, setUpdated] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  useEffect(() => {
    if (update !== updated) {
      axiosInstance.profile()
        .then(({ data: { data } }) => {
          setImageUrl(data?.picture);
          setPersonalInfo(data);
        })
    }
    else {
      setImageUrl(settings.picture);
      setPersonalInfo(settings);
    }
  }, [updated]);

  useEffect(() => {
  }, [imageUrl])


  const { name, email, about, accessible, showPhone, accountType, phone, website } = personalInfo;


  const enablePersonalLoading = () => {
    setPersonalLoading(true);
  };

  const disablePersonalLoading = () => {
    setPersonalLoading(false);
  };

  const enableAccountLoading = () => {
    setAccountLoading(true);
  };

  const disableAccountLoading = () => {
    setAccountLoading(false);
  };

  const enableUploadLoading = () => {
    setUploadLoading(true);
  };

  const disableUploadLoading = () => {
    setUploadLoading(false);
  };

  const enableDeleteLoading = () => {
    setDeleteLoading(true);
  };

  const disableDeleteLoading = () => {
    setDeleteLoading(false);
  };


  // let upload = useRef();

  // let _OnChangeImg = async (event) => {
  //     const { files } = event.target;
  //     const img = URL.createObjectURL(files[0]);
  //     const data = { link: img };
  //     axiosInstance.uploadProfilePic(data)
  //         .then(res => {
  //             setImage(img);
  //         }).catch(e => {
  //             console.log(e.message);
  //         })
  // }

  // let _BrowseImg = () => {
  //     upload.current.click();
  // }


  let handleFileChange = async file => {
    console.log(file);
    enableUploadLoading();
    let { url } = await uploadToS3(file);
    axiosInstance.uploadProfilePic(url)
      .then(({ data: { data: { img } } }) => {
        setImageUrl(img);
        disableUploadLoading();
      }).catch(e => {
        disableUploadLoading();
        console.log(e.message);
      })
  };

  let _DeleteImg = () => {
    enableDeleteLoading();
    axiosInstance.removeProfilePic()
      .then(res => {
        disableDeleteLoading();
        setUpdated(true);
      }).catch(error => {
        disableDeleteLoading();
        console.log("API error: ", error)
      })
  }


  const _OnChange = (e) => {
    const { name, value, checked } = e.target;
    let copyOriginal = { ...personalInfo };
    let newObject = (name === 'accessible' || name === 'showPhone' ?
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

  let _Update = () => {
    enablePersonalLoading();
    let payload = {
      data: personalInfo,
      accountType: accountType,
    };
    if (accountType === "Business") {
      payload.businessCard = {
        website
      }
    }
    axiosInstance.updateProfile(payload)
      .then(({ data: { message } }) => {
        swal({
          text: message,
          timer: 3000,
          icon: 'success',
          dangerMode: true,
          buttons: false
        })
        setUpdated(true);
        disablePersonalLoading();
      })
      .catch(e => {
        swal({
          text: e.response.data.message,
          timer: 3000,
          icon: 'error',
          dangerMode: true,
          buttons: false
        })
        console.log("error in api: ", e.response.data.message);
        disablePersonalLoading();
      })
  }


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: AccountInfoValidationSchema,
    onSubmit: (values, { setSubmitting, setStatus }) => {
      enableAccountLoading();
      setTimeout(() => {
        axiosInstance.updateProfile({ data: { password: values.new } })
          .then(({ data: { message } }) => {
            swal({
              text: message,
              timer: 3000,
              icon: 'success',
              dangerMode: true,
              buttons: false
            })
            disableAccountLoading();
            setUpdated(true);
          })
          .catch(e => {
            console.log("error in api: ", e.response.data.message);
            swal({
              text: e.response.data.message,
              timer: 3000,
              icon: 'error',
              dangerMode: true,
              buttons: false
            })
            disableAccountLoading();
          })
      }, 1000);
    },
  });

  return (

    <div className="flex flex-col h-full w-full p-3 sm:p-5 ">
      {/*SEO Support*/}
      <Helmet>
        <title>Setting | Smart Tipz</title>
      </Helmet>
      {/*SEO Support End */}


      <div className="flex flex-col w-full">
        {/* section starts here*/}
        <div className="flex w-full px-2 py-1">
          <div className="relative space-y-2">
            <div className="rounded-2xl profilePic relative">
              {
                imageUrl ?
                  <img src={imageUrl} alt="Display Pic" layout='fill' />
                  :
                  <img className="rounded-full" src="https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg" alt="" />
              }
            </div>
            <div className="flex w-full space-x-1">
              {/* <input
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
                    Upload
                </button>*/}

              <FileInput onChange={handleFileChange} />

              <button
                onClick={openFileDialog}
                className="px-2 py-1 w-1/2 flex justify-center items-center text-white text-sm bg-indigo-600 rounded-md hover:bg-indigo-700">
                Upload
              </button>
              <button
                onClick={_DeleteImg}
                type="button"
                className="px-2 py-1 w-1/2 flex items-center justify-center text-white text-sm bg-red-600 rounded-md hover:bg-red-700">
                Remove
              </button>
            </div>
          </div>
        </div>
        {/* section ends here */}
        {/* section starts here */}
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col sm:flex-row mt-10 w-full sm:divide-x-2">
            <div className="flex flex-col w-full lg:w-1/2 space-y-2 sm:px-3">
              <h1 className="text-lg font-semibold">Personal Information</h1>
              <div className="flex flex-col w-full">
                <InputField
                  name={"name"}
                  type={"text"}
                  value={name}
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
                  value={email}
                  onChange={_OnChange}
                  svg={(
                    <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                  )}
                  inputClass={`border text-gray-400 bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12 `}
                  label={'Email'}
                />
                <div className="flex w-full justify-between mb-5">
                  <div className="flex w-full">
                    <InputField
                      name={"phone"}
                      type={"text"}
                      value={phone}
                      onChange={_OnChange}
                      svg={(
                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                      )}
                      inputClass={`border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3 h-12`}
                      label={'Phone no'}
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>
                      <svg data-tip data-for="showPhone" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <ReactTooltip id="showPhone" place="top" effect="solid" border={false} borderColor="white" clickable={false}>
                        {showPhone ? 'Click to hide number' : 'Click to show number'}
                      </ReactTooltip>
                    </span>
                    <div className="relative inline-block w-10 mr-2 self-center select-none transition duration-200 ease-in">
                      <input
                        checked={showPhone}
                        onChange={_OnChange}
                        type="checkbox"
                        name="showPhone"
                        id="showPhone"
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                      <label htmlFor="showPhone" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                  </div>
                </div>
                <div className='floating-input mb-5 relative'>
                  <textarea
                    type="text"
                    id="about"
                    rows={5}
                    name="about"
                    className={`border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3`}
                    value={about}
                    onChange={_OnChange}
                    placeholder="name@example.com"
                    autoComplete="off" />
                  <label
                    htmlFor="about"
                    className="absolute top-0 left-0 px-2 py-3 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                    {accountType === "Business" ? 'Intro' : 'About me'}
                  </label>
                </div>
                {
                  accountType === 'Business' ?
                    <InputField
                      name={"website"}
                      type={"text"}
                      value={website || ''}
                      onChange={_OnChange}
                      svg={(
                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" /></svg>)}
                      inputClass={`border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                      label={'Website link'}
                    />
                    : ''
                }
                <div className="flex w-full justify-between mb-5">
                  <p className="text-md font-normal">Message</p>
                  <div className="flex items-center space-x-1">
                    <span>
                      <svg data-tip data-for="accessible" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <ReactTooltip id="accessible" place="top" effect="solid" border={false} borderColor="white" clickable={false}>
                        {accessible ? 'Click to disable messages' : 'Click to enable messages'}
                      </ReactTooltip>
                    </span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                      <input
                        checked={accessible}
                        onChange={_OnChange}
                        type="checkbox"
                        name="accessible"
                        id="accessible"
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                      <label htmlFor="accessible" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center justify-end">
                <Button
                  onSubmit={_Update}
                  type="button"
                  loading={personalLoading}
                  childrens={'Update'}
                  classNames={"px-3 py-2 flex justify-center items-center text-white text-sm btn rounded-md "} />

              </div>
              <div className={accountType === 'Business' ? 'flex flex-col' : 'hidden'}>
                <AccountSetting
                  accountLoading={accountLoading}
                  formik={formik}
                  getInputClasses={getInputClasses}
                />
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 mt-10 sm:mt-0 sm:px-3">
              <div className={accountType === 'Personal' ? 'flex flex-col' : 'hidden'}>
                <AccountSetting
                  accountLoading={accountLoading}
                  formik={formik}
                  getInputClasses={getInputClasses}
                />
              </div>
              <div className={accountType === 'Business' ? "flex flex-col space-y-2" : "hidden"}>
                <h1 className="text-lg font-semibold">Business Card</h1>
                <BusinessCard
                  image={imageUrl}
                  phone={phone}
                  website={website}
                  name={name}
                  email={email}
                />
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
