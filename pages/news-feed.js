import React from 'react'
import { Helmet } from 'react-helmet';

const NewsFeed = () => {
    return (
        <div className="flex flex-col h-full w-full p-5">
            {/*SEO Support*/}
            <Helmet>
                <title>Login | Smart Tipz</title>
            </Helmet>
            {/*SEO Support End */}
            <div className="flex flex-row w-full h-56 bg-gray-50">
                <div className="flex w-1/4">

                </div>
                <div className="flex flex-col w-3/4">

                </div>

            </div>
        </div>
    )
}

export default NewsFeed;
