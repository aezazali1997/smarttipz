import axiosInstance from 'APIs/axiosInstance';
import { useFormik } from 'formik';
import { useS3Upload } from 'next-s3-upload';
import React, { useEffect, useState } from 'react'
import { TestimonialFormSchema } from 'utils/validation_shema';

const initialValues = {
    name: '', designation: '', description: ''
}

const UseFetchProfile = (profile) => {

    const [showBusinessCard, setShowBusinessCard] = useState(false);
    const [followers, setFollowers] = useState(0);
    const [followed, setFollowed] = useState(0);
    const [businessCard, setBusinessCard] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [testimonial, setTestimonial] = useState([]);
    let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();


    useEffect(() => {
        console.log('profile: ', profile);
        const { accountType, username } = profile;
        localStorage.setItem('username', username);
        axiosInstance.getFollow().then(({ data: { data: { followers, followed } } }) => {
            console.log(followers, followed);
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
                console.log("Testimonials: ", data);
                setTestimonial(data);
            }).catch(e => {
                console.log('Error in Api BusinessCard: ', e.message);
            })

        }
    }, []);


    useEffect(() => { }, [testimonial])

    let handleShowBusinessCard = () => {
        console.log('clicked');
        setShowBusinessCard(showBusinessCard => !showBusinessCard)
    };

    let handleFileChange = async file => {
        console.log(file);
        let { url } = await uploadToS3(file);
        setImageUrl(url);
    };

    let _DeleteImg = () => {

    }

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: TestimonialFormSchema,
        validateOnBlur: true,
        onSubmit: ({ name, designation, description }, { setSubmitting, setStatus }) => {
            enableLoading();
            setTimeout(() => {
                const data = { name, designation, description, image: imageUrl };
                console.log(data);
                axiosInstance.addTestimonial(data).then(({ data: { data } }) => {
                    console.log("Testimonials: ", data);
                    let copyTestimonial = [...testimonial];
                    let newArray = [...copyTestimonial, { ownerName: name, designation, description, picture: imageUrl }];
                    setTestimonial(newArray);
                    disableLoading();
                }).catch(e => {
                    console.log('Error in Api BusinessCard: ', e.message);
                    disableLoading();
                })
            }, 1000);
        },

    });


    return {
        followed, followers, businessCard, showBusinessCard, formik, imageUrl, loading, testimonial,
        handleShowBusinessCard, _DeleteImg, handleFileChange, FileInput, openFileDialog
    }
}

export default UseFetchProfile;
