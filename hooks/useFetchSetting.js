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
    const [uploadLoading, setUploadLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        phone: '', accessible: '', name: '', email: '', showPhone: '', about: '', username: '',
        accountType: ''
    });
    const [updated, setUpdated] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [businessCard, setBusinessCard] = useState('');

    let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

    useEffect(() => {
        const { accountType } = settings;
        if (update !== updated) {
            axiosInstance.profile()
                .then(({ data: { data } }) => {
                    setImageUrl(data?.picture);
                    setPersonalInfo(data);
                })
        }
        else {
            setImageUrl(settings?.picture);
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

    let _Update = () => {
        enablePersonalLoading();
        let payload = {
            data: personalInfo,
            accountType: personalInfo.accountType,
        };
        if (personalInfo.accountType === "Business") {
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
                axiosInstance.updateProfile({ data: { password: values.new } })
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
        uploadLoading, accountLoading, formik, uploadLoading, personalInfo, personalLoading, businessCard,
        deleteLoading, imageUrl, _Update, _OnChange, _DeleteImg, handleFileChange, FileInput, openFileDialog
    }
}

export default UseFetchSetting;
