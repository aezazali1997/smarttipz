/* eslint-disable react/jsx-key */
import React from 'react'
import { Helmet } from 'react-helmet';
import videos from '../utils/VdeoSchema.json';
import { Card } from '../components';
const Videos = () => {
    return (
        <div className="flex h-screen w-full p-5">
            {/*SEO Support*/}
            <Helmet>
                <title>Login | Smart Tipz</title>
            </Helmet>
            {/*SEO Support End */}
            <div className="grid grid-cols-4 gap-3">
                {
                    videos.map(({ title, image, like, comment, share }) => (
                        <Card
                            image={image}
                            title={title}
                            comment={comment}
                            like={like}
                            share={share}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Videos;
