import axiosInstance from 'APIs/axiosInstance';
import React, { useEffect, useState } from 'react'

const UseFetchProfile = (profile) => {

    // const [personalInfo, setPersonalInfo] = useState({});
    const [showBusinessCard, setShowBusinessCard] = useState(false);
    const [followers, setFollowers] = useState(0);
    const [followed, setFollowed] = useState(0);
    const [businessCard, setBusinessCard] = useState('');

    useEffect(() => {
        const { accountType } = profile;
        console.log('profile', profile);
        // setPersonalInfo(personalInfo => personalInfo = profile);
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

    return { followed, followers, businessCard, showBusinessCard, handleShowBusinessCard };
}

export default UseFetchProfile;
