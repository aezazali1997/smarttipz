/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import ReactStars from "react-rating-stars-component";
import logo from '../../public/profile.jpg';
import { Card, TestimonialCard } from '../../components';
import videos from '../../utils/VdeoSchema.json';
import testimonialVideo from '../../utils/testimonialSchema.json';
import axiosInstance from '../../APIs/axiosInstance';
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

    const { name, about, accessible, followed, following, rating, username, views, picture, phone, showMessages, accountType } = personalInfo;


    return (

        <div className="flex flex-col h-full w-full p-3 sm:p-5">
            {/*SEO Support*/}
            <Helmet>
                <title>Profile | Smart Tipz</title>
            </Helmet>
            {/*SEO Support End */}
            {/* section starts here*/}
            <div className="flex flex-row w-full h-auto">
                <div className="flex w-2/6  md:w-1/6  px-2 py-1">
                    <Image src={logo} alt="profile" className="rounded-2xl "
                        width={135} height={200}
                    />
                </div>
                <div className="flex flex-col w-4/6 md:w-5/6 ">
                    {/* section starts here */}
                    <div className="flex  flex-col lg:flex-row lg:justify-between px-2 py-2">
                        <div className="flex flex-col w-full lg:w-1/2">
                            <div className="flex justify-between items-start lg:items-end w-full md:w-2/3">
                                <h1 className=" text-md lg:text-2xl font-semibold">{name}</h1>
                            </div>
                            <h2 className="text-sm text-gray-500">{accessible ? phone : ''}</h2>
                            {/* <h2 className="text-sm text-gray-500">Marketing Specialist</h2> */}
                            <div className="flex lg:flex-row lg:justify-between w-full md:max-w-xs mt-1">
                                <span className="flex w-full items-center">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                    &nbsp;<p className="text-xs">{views} Views</p></span>
                                <span className="flex w-full items-center">
                                    <ReactStars
                                        count={5}
                                        value={rating}
                                        size={16}
                                        edit={false}
                                        isHalf={true}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#714de1"
                                    />&nbsp; <p className="hidden md:text-xs" > Rating</p></span>
                            </div>
                        </div>
                        {

                        }
                        <div className="flex flex-col  lg:w-1/2">
                            <div className="flex lg:justify-end space-x-10">
                                <div className="flex flex-col">
                                    <h1 className="text-md lg:text-3xl font-semibold text-center">{followed?.length}</h1>
                                    <h2 className="text-sm text-black">Followers</h2>
                                </div>
                                <div className="flex flex-col ">
                                    <h1 className=" text-md lg:text-3xl font-semibold text-center">{following?.length}</h1>
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
                            {about || 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat pidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
                        </p>
                    </div>
                    <div className="flex w-full mt-3 items-center px-2 space-x-6">
                        <button className="followingBtn">
                            Following
                        </button>

                        {showMessages ? <button onClick={gotoMessaging} className="messageBtn">
                            Message
                        </button> : ''
                        }
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
            {accountType === 'Business' ?
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

                </div>
                : ""
            }
            {/* section ends here */}
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
