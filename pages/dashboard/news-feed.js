import React from 'react'
import { Helmet } from 'react-helmet';

const NewsFeed = () => {
    return (
        <div className="flex h-screen w-full justify-center items-center">
            {/*SEO Support*/}
            <Helmet>
                <title>News Feed | Smart Tipz</title>
            </Helmet>
            {/*SEO Support End */}
            <h1 className="text-black text-2xl">News Feed</h1>
        </div>
    )
}

export default NewsFeed;
