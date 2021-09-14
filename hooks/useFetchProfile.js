import axiosInstance from 'APIs/axiosInstance';
import { useFormik } from 'formik';
import { useS3Upload } from 'next-s3-upload';
import React, { useEffect, useState } from 'react'
import { TestimonialFormSchema } from 'utils/validation_shema';
import Swal from 'sweetalert2';

const initial = {
    ownerName: '', designation: '', description: ''
};

const UseFetchProfile = (profile) => {

    const [showBusinessCard, setShowBusinessCard] = useState(false);
    const [followers, setFollowers] = useState(0);
    const [followed, setFollowed] = useState(0);
    const [businessCard, setBusinessCard] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loadingTestimonial, setLoadingTestimonial] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [testimonial, setTestimonial] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Add Testimonial');
    const [initialValues, setInitialValues] = useState(initial);

    let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

    useEffect(() => {
        const { accountType, username, isApproved } = profile;
        enableLoadTestimonial();
        localStorage.setItem('isApproved', isApproved);
        localStorage.setItem('username', username);
        localStorage.setItem('accountType', accountType);
        axiosInstance.getFollow().then(({ data: { data: { followers, followed } } }) => {
            setFollowed(followed);
            setFollowers(followers);
        }).catch(e => {
            console.log(e.response.data.message);
        })
        if (accountType === 'Business') {
            axiosInstance.getBusinessCard().then(({ data: { data } }) => {
                setBusinessCard(data);
            }).catch(e => {
                console.log('Error in Api BusinessCard: ', e.response.data.message);
            })
            axiosInstance.getTestimonial().then(({ data: { data } }) => {
                setTestimonial(data);
                disableLoadTestimonial();
            }).catch(e => {
                disableLoadTestimonial();
                console.log('Error in Api Testimonials: ', e.response.data.message);
            })

        }
    }, []);

    useEffect(() => { }, [testimonial])

    let handleShowBusinessCard = () => {
        setShowBusinessCard(showBusinessCard => !showBusinessCard)
    };

    let handleFileChange = async file => {
        enableUploading();
        let { url } = await uploadToS3(file);
        setImageUrl(url);
        disableUploading();
    };

    const _DeleteImg = () => {
        setImageUrl('');
    };

    const _AddTestimonial = () => {
        setModalTitle('Add Testimonial');
        setInitialValues(initial);
        setImageUrl('');
        setShowModal(true);
    }

    const _EditTestimonial = (data) => {
        setModalTitle('Edit Testimonial');
        setInitialValues(data);
        setImageUrl(data?.picture);
        setShowModal(true);
    }

    const _DeleteTestimonial = (data) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
                cancelButton: 'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.deleteTestimonial(data?.id).then(({ data: { message } }) => {
                    Swal.fire({
                        text: message,
                        icon: 'success',
                        timer: 3000,
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                    let copyOriginal = [...testimonial];
                    let updatedArray = copyOriginal.filter(item => item.id !== data?.id ? item : '');
                    setTestimonial(updatedArray);
                })
                    .catch(e => {
                        Swal.fire({
                            text: e.response.data.message,
                            icon: 'error',
                            timer: 3000,
                            showCancelButton: false,
                            showConfirmButton: false
                        })
                    })
            }
        })
    }

    const handleShowModal = () => {
        setShowModal(!showModal);
    }

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const enableUploading = () => {
        setUploading(true);
    };

    const disableUploading = () => {
        setUploading(false);
    };
    const enableLoadTestimonial = () => {
        setLoadingTestimonial(true);
    };

    const disableLoadTestimonial = () => {
        setLoadingTestimonial(false);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: TestimonialFormSchema,
        validateOnBlur: true,
        onSubmit: (res, { resetForm }) => {
            enableLoading();
            setTimeout(() => {
                const payload = {
                    ownerName: res.ownerName,
                    designation: res.designation,
                    description: res.description,
                    picture: imageUrl
                };
                if (modalTitle === 'Add Testimonial') {
                    axiosInstance.addTestimonial(payload).then(({ data: { data } }) => {
                        let copyTestimonial = [...testimonial];
                        let newArray = [payload, ...copyTestimonial];
                        setTestimonial(newArray);
                        disableLoading();
                        resetForm(initial)
                        setImageUrl('');
                        handleShowModal();
                    }).catch(e => {
                        console.log('Error in Api Testimonial: ', e.response.data.message);
                        disableLoading();
                    })
                }
                else if (modalTitle === 'Edit Testimonial') {
                    payload.id = res.id;
                    axiosInstance.updateTestimonial(payload).then(({ data: { message } }) => {
                        let copyTestimonial = [...testimonial];
                        let newArray = copyTestimonial.map((item) => {
                            if (item.id !== payload?.id) return item;
                            else {
                                const { ownerName, designation, description, picture } = payload;
                                item.ownerName = ownerName;
                                item.designation = designation;
                                item.description = description;
                                item.picture = picture;
                                return item;
                            }
                        });
                        setTestimonial(newArray);
                        disableLoading();
                        resetForm(initial)
                        setImageUrl('');
                        handleShowModal();
                    }).catch(e => {
                        console.log('Error in Api Testimonial: ', e.response.data.message);
                        disableLoading();
                    })
                }
            }, 1000);
        },
    });


    return {
        followed, followers, showModal, businessCard, showBusinessCard, formik, imageUrl, loading, testimonial, uploading,
        modalTitle, loadingTestimonial, _AddTestimonial, handleShowBusinessCard, _EditTestimonial, _DeleteImg, handleFileChange,
        FileInput, openFileDialog, handleShowModal, _DeleteTestimonial
    }
}

export default UseFetchProfile;
