import React from 'react'
import { Helmet } from 'react-helmet';

const Setting = () => {
    return (
        <div className="flex h-screen w-full justify-center items-center">
            {/*SEO Support*/}
            <Helmet>
                <title>Setting | Smart Tipz</title>
            </Helmet>
            {/*SEO Support End */}

            <h1 className="text-2xl font-semibold">Setting</h1>
        </div>
    )
}

export default Setting;
