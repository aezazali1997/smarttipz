/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { parseCookies } from 'nookies';
import { UseFetchProfile } from 'hooks';
import videos from 'utils/VdeoSchema.json';
import testimonialVideo from 'utils/testimonialSchema.json';
import { Card, PopupBusinessCard, ProfileCard, Rating, TestimonialCard } from 'components';
import axiosInstance from 'APIs/axiosInstance';
import cookie from 'js-cookie';

const Profile = ({ profile }) => {

    const { handleShowBusinessCard, showBusinessCard, followed, followers, businessCard } = UseFetchProfile(profile);
    const { name, about, rating, views, picture, phone, email, accountType, username, showUsername, showName } = profile;
    const { website } = businessCard;

    useEffect(() => {
        cookie.set('name', name);
    }, [])

    return (
        <div className="flex flex-col h-full w-full p-3 sm:p-5">
            {/*SEO Support*/}
            <Helmet>
                <title>Profile | Smart Tipz</title>
            </Helmet>
            {/*SEO Support End */}
            {/* section starts here*/}
            <div className="md:hidden flex flex-col w-full">
                <ProfileCard
                    data={profile}
                    followed={followed}
                    followers={followers}
                    website={website || ''}
                    handleShowBusinessCard={handleShowBusinessCard}
                    showBusinessCard={showBusinessCard}
                />
            </div>
            <div className="hidden md:flex flex-row w-full h-auto">
                <div className="flex w-1/6 px-2 py-1">
                    {/* <div className="rounded-2xl w-28 h-36 relative px-2 py-1"> */}
                    {picture ?
                        <img src={picture} alt="profile" className="rounded-2xl w-30 h-40" layout="fill" />
                        :
                        <img
                            src="https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg" alt=""
                            className="rounded-full"
                        />
                    }
                    {/* </div> */}
                </div>
                <div className="flex flex-col w-4/6 md:w-5/6 ">
                    {/* section starts here */}
                    <div className="flex flex-row lg:justify-between px-2 ">
                        <div className="flex flex-col w-full lg:w-1/2">
                            <div className="flex justify-between items-start lg:items-end w-full md:w-2/3">
                                <h1 className=" text-md lg:text-2xl font-semibold">{accountType === 'Personal' ? showName ? name : showUsername ? username : '' : username}</h1>
                            </div>
                            <h2 className="text-sm text-gray-500">{phone}</h2>
                            {/* <h2 className="text-sm text-gray-500">Marketing Specialist</h2> */}
                            <div className="flex lg:flex-row lg:justify-between w-full md:max-w-xs mt-1">
                                <span className="flex w-full items-center">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                    &nbsp;<p className="text-xs">{views} Views</p></span>
                                <span className="flex w-full items-center">
                                    <Rating
                                        value={rating}
                                    />
                                    &nbsp; <p className="text-xs"> Rating</p></span>
                            </div>
                        </div>
                        {

                        }
                        <div className="flex flex-col  lg:w-1/2">
                            <div className="flex lg:justify-end space-x-10">
                                <div className="flex flex-col">
                                    <h1 className="text-md lg:text-3xl font-semibold text-center">{followers?.length}</h1>
                                    <h2 className="text-sm text-black">Followers</h2>
                                </div>
                                <div className="flex flex-col ">
                                    <h1 className=" text-md lg:text-3xl font-semibold text-center">{followed?.length}</h1>
                                    <h2 className="text-sm  text-black">Following</h2>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    {/* section ends here */}
                    <div className="flex w-full mt-2 px-2">
                        <p className="text-sm">
                            {about || 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat pidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
                        </p>
                    </div>
                    {accountType === "Business" && (
                        <div className="flex w-full mt-2 px-2 " onClick={handleShowBusinessCard}>
                            <p className="text-xs no-underline hover:underline text-indigo-600 cursor-pointer">
                                Virtual Business Card
                            </p>
                        </div>
                    )}
                    {/* <div className="flex w-full mt-3 items-center px-2 space-x-6">
                        <button className="followingBtn">
                            Following
                        </button>

                        {showMessages ? <button onClick={gotoMessaging} className="messageBtn">
                            Message
                        </button> : ''
                        }
                    </div> */}
                </div>
            </div>
            {/* section ends here */}
            {/* section starts here */}{
                accountType === 'Business' && (
                    <div className="flex flex-col w-full px-2  mt-8">
                        <h1 className="text-md font-medium">My Catalogue</h1>
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
                )}
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
            {accountType === 'Business' && (
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
            )}
            {
                showBusinessCard && (
                    <PopupBusinessCard
                        _ShowCard={handleShowBusinessCard}
                        name={name}
                        image={picture}
                        website={website || ''}
                        email={email}
                        phone={phone}

                    />
                )}
            {/* section ends here */}
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const { token } = parseCookies(context);
    if (!token)
        return {
            redirect: {
                permanent: false,
                destination: "/auth/login",
            },
            props: {},
        };
    else {
        const res = await axios.get(`${process.env.BASE_URL}api/profile`, { headers: { Authorization: "Bearer " + token } })
        const { data } = res.data;
        return {
            props: {
                profile: data
            }
        }
    }
}
export default Profile;
