import React, { useEffect, useState } from 'react'

const UseFetchProfile = (profile) => {

    const [personalInfo, setPersonalInfo] = useState({});
    const [showBusinessCard, setShowBusinessCard] = useState(false);

    useEffect(() => {
        console.log('profile', profile);
        setPersonalInfo(personalInfo => personalInfo = profile);
    }, []);

    let handleShowBusinessCard = () => {
        console.log('clicked');
        setShowBusinessCard(showBusinessCard => !showBusinessCard)
    };

    return { personalInfo, showBusinessCard, handleShowBusinessCard };
}

export default UseFetchProfile;
