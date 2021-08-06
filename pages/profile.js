import React from 'react'
import { Sidebar } from '../components';
import { Helmet } from 'react-helmet';

const Profile = () => {
    return (
        <div className="flex h-screen w-full justify-center items-center">
            {/*SEO Support*/}
            <Helmet>
                <title>Login | Smart Tipz</title>
            </Helmet>
            {/*SEO Support End */}
            <h1 className="text-black text-2xl text">PROFILE</h1>
        </div>
    )
}

export default Profile;
