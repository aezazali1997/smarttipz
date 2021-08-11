/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import logo from '../public/profile.jpg';
import { Card, TestimonialCard } from '../components';
import videos from '../utils/VdeoSchema.json';
import testimonialVideo from '../utils/testimonialSchema.json';
import axiosInstance from '../APIs/axiosInstance';
import { parseCookies } from 'nookies';
import axios from 'axios';


const Profile = ({ profile }) => {
    const router = useRouter();

    const gotoMessaging = () => {
        router.push('/messages')
    }

    const [personalInfo, setPersonalInfo] = useState({});

    useEffect(() => {
        console.log('profile', profile);
        setPersonalInfo(personalInfo => personalInfo = profile);
    }, []);

    const { aboutme, accessible, followed, following, rating, username, views, picture } = personalInfo;


    return (

        <div className="flex flex-col h-full w-full p-3 sm:p-5">
            {/*SEO Support*/}
            <Helmet>
                <title>Profile | Smart Tipz</title>
            </Helmet>
            {/*SEO Support End */}
            {/* section starts here*/}
            <div className="flex flex-row w-full h-auto">
                <div className="flex w-2/6 md:w-1/6  px-2 py-1">
                    <Image src={logo} alt="profile" className="rounded-2xl "
                        width={135} height={200}

                    />
                </div>
                <div className="flex flex-col w-4/6 md:w-5/6 ">
                    {/* section starts here */}
                    <div className="flex justify-between px-2 py-2">
                        <div className="flex flex-col w-1/2">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full md:w-2/3">
                                <h1 className=" text-md lg:text-2xl font-semibold">{username}</h1>
                                <h2 className="text-sm text-gray-500">{accessible ? '+92 3235333140' : ''}</h2>
                            </div>
                            <h2 className="text-sm text-gray-500">Marketing Specialist</h2>
                            <div className="flex justify-between w-full md:w-1/2 mt-1">
                                <span className="flex items-center"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                    &nbsp;<p className="text-xs">{views} Views</p></span>
                                <span className="flex items-center">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    &nbsp;<p className="text-xs">{rating} Reviews</p></span>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <div className="flex justify-end space-x-10">
                                <div className="flex flex-col">
                                    <h1 className="text-md lg:text-3xl font-semibold text-center">{followed?.length}</h1>
                                    <h2 className="text-sm text-black">Followers</h2>
                                </div>
                                <div className="flex flex-col ">
                                    <h1 className=" text-3xl font-semibold text-center">{following?.length}</h1>
                                    <h2 className="text-sm  text-black">Following</h2>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    {/* section ends here */}
                    <div className="flex w-full h-10 mt-2 px-2">
                        <p className="text-xs">
                            {aboutme}
                        </p>
                    </div>
                    <div className="flex w-full mt-3 items-center px-2 space-x-6">
                        <button className="followingBtn">
                            Following
                        </button>
                        <button onClick={gotoMessaging} className="messageBtn">
                            Message
                        </button>
                    </div>
                </div>
            </div>
            {/* section ends here */}
            {/* section starts here */}
            <div className="flex flex-col w-full px-2  mt-8">
                <h1 className="text-md font-medium">My Videos</h1>
                <div className="flex w-full mt-6 justify-center lg:justify-start" >
                    <div className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                        {
                            videos && videos.map(({ title, image, like, comment, share }) => (
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
            </div>
            {/* section ends here */}
            {/* section starts here */}
            <div className="flex flex-col w-full px-2  mt-8">
                <h1 className="text-md font-medium">Customer Testimonials</h1>
                <div className="flex w-full mt-6 justify-center lg:justify-start">
                    <div className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                        {
                            testimonialVideo.map(({ image, description, designation, name }) => (
                                <TestimonialCard
                                    image={image}
                                    name={name}
                                    designation={designation}
                                    description={description}
                                />
                            ))
                        }
                    </div>
                </div>
                {/* section ends here */}
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const { token } = parseCookies(context);
    const res = await axios.get(`${process.env.BASE_URL}api/profile`, { headers: { Authorization: "Bearer " + token } })
    const { data } = res.data;
    return {
        props: {
            profile: data
        }
    }
}
export default Profile;