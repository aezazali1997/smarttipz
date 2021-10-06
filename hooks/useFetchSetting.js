import { useFormik } from 'formik';
import { useS3Upload } from 'next-s3-upload';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import axiosInstance from '../APIs/axiosInstance';
import { AccountInfoValidationSchema } from '../utils/validation_shema';


const initialValues = {
    old: '',
    new: '',
    confirm: ''
}

let update = false;

const UseFetchSetting = (settings) => {

    const [personalLoading, setPersonalLoading] = useState(false);
    const [accountLoading, setAccountLoading] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        phone: '', accessible: '', name: '', email: '', showPhone: '', about: '', username: '',
        accountType: '', showName: '', showUsername: '', tip: ''
    });
    const [updated, setUpdated] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [businessCard, setBusinessCard] = useState('');
    const [countryCode, setCountryCode] = useState('')

    let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

    useEffect(() => {
        const { accountType } = settings;
        if (update !== updated) {
            axiosInstance.profile()
                .then(({ data: { data } }) => {
                    setImageUrl(data?.picture);
                    setPersonalInfo(data);
                    setCountryCode(data?.phone);
                }).catch(e => {
                    console.log('Profile Fetch Failed: ', e.response.data.message)
                })
        }
        else {
            setImageUrl(settings?.picture);
            setCountryCode(settings?.phone);
            setPersonalInfo(settings);
        }
        if (accountType === 'Business') {
            axiosInstance.getBusinessCard().then(({ data: { error, data, message } }) => {
                setBusinessCard(data);
            }).catch(e => {
                console.log('Error in Api BusinessCard: ', e.response.data.message);
            })
        }
    }, [updated]);

    useEffect(() => {
    }, [imageUrl])

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

    let handleFileChange = async file => {
        let { url } = await uploadToS3(file);
        axiosInstance.uploadProfilePic(url)
            .then(({ data: { data: { img } } }) => {
                setImageUrl(img);
            }).catch(e => {
                console.log(e.message);
            })
    };

    let _DeleteImg = () => {
        axiosInstance.removeProfilePic()
            .then(res => {
                setUpdated(true);
            }).catch(error => {
                console.log("API error: ", error)
            })
    }


    const _OnChange = (e) => {
        const { name, value, checked } = e.target;
        let copyOriginal = { ...personalInfo };
        let newObject = (name === 'accessible' || name === 'showPhone' || name === 'showName' ||
            name === 'showUsername' ?
            name === 'showUsername' && checked === true ?
                { ...copyOriginal, showUsername: true, showName: false }
                :
                name === 'showUsername' && checked === false ?
                    { ...copyOriginal, showUsername: false, showName: true } :
                    name === 'showName' && checked === true ?
                        { ...copyOriginal, showUsername: false, showName: true }
                        :
                        name === 'showName' && checked === false ?
                            { ...copyOriginal, showUsername: true, showName: false }
                            :
                            { ...copyOriginal, [name]: checked }
            : { ...copyOriginal, [name]: value });
        setPersonalInfo(newObject);
    }

    const _ChangeCountryCode = value => {
        setCountryCode(value)
    }

    let _Update = () => {
        enablePersonalLoading();
        personalInfo.phone = countryCode;
        console.log('personal: ', personalInfo);
        let payload = {
            data: personalInfo,
            accountType: personalInfo.accountType,
        };
        if (personalInfo.accountType === "Business") {
            const website = businessCard?.website;
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
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: AccountInfoValidationSchema,
        onSubmit: (values, { setSubmitting, setStatus, resetForm }) => {
            enableAccountLoading();
            setTimeout(() => {
                const data = { oldPassword: values.old, newPassword: values.new }
                axiosInstance.changePassword(data)
                    .then(({ data: { message } }) => {
                        swal({
                            text: message,
                            timer: 3000,
                            icon: 'success',
                            dangerMode: true,
                            buttons: false
                        })
                        resetForm(initialValues);
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

    return {
        accountLoading, formik, personalInfo, personalLoading, businessCard, countryCode,
        imageUrl, _Update, _OnChange, _DeleteImg, handleFileChange, FileInput, openFileDialog, _ChangeCountryCode
    }
}

export default UseFetchSetting;
