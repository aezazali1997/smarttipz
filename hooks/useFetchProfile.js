import axiosInstance from 'APIs/axiosInstance';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'

const UseFetchProfile = (profile) => {

    // const [personalInfo, setPersonalInfo] = useState({});
    const [showBusinessCard, setShowBusinessCard] = useState(false);
    const [followers, setFollowers] = useState(0);
    const [followed, setFollowed] = useState(0);
    const [businessCard, setBusinessCard] = useState('');
    const [loading, setLoading] = useState(false);

    const initialValues = {
        name: '', designation: '', description: ''
    }

    useEffect(() => {
        const { accountType, username } = profile;
        localStorage.setItem('username', username);
        axiosInstance.getFollow().then(({ data: { error, data: { followers, followed }, message } }) => {
            console.log(followers, followed);
            setFollowed(followed);
            setFollowers(followers);
        }).catch(e => {
            console.log(e.response.data.message);
        })
        if (accountType === 'Business') {
            axiosInstance.getBusinessCard().then(({ data: { error, data, message } }) => {
                setBusinessCard(data);
            }).catch(e => {
                console.log('Error in Api BusinessCard: ', e.response.data.message);
            })
        }
    }, []);

    let handleShowBusinessCard = () => {
        console.log('clicked');
        setShowBusinessCard(showBusinessCard => !showBusinessCard)
    };

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validateOnBlur: true,
        onSubmit: ({ name, designation, description }, { setSubmitting, setStatus }) => {
            // enableLoading();
            setTimeout(() => {
                const data = { name, designation, description };
                console.log(data);
            }, 1000);

        },

    });


    return { followed, followers, businessCard, showBusinessCard, formik, handleShowBusinessCard };
}

export default UseFetchProfile;
