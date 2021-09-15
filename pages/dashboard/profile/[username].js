/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { isEmpty } from 'lodash';
import videos from '../../../utils/VdeoSchema.json';
import axiosInstance from 'APIs/axiosInstance';
import { Card, PopupBusinessCard, ProfileCard, Rating, TestimonialCard, Spinner } from '../../../components';


const UserProfile = ({ profile }) => {
    let router = useRouter();
    const [followed, setFollowed] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [personalInfo, setPersonalInfo] = useState({});
    const [isFollowing, setIsFollowing] = useState(false);
    const [canMessage, setCanMessage] = useState(false);
    const [showBusinessCard, setShowBusinessCard] = useState(false);
    const [loadingTestimonial, setLoadingTestimonial] = useState(false);
    const [businessCard, setBusinessCard] = useState('');


    useEffect(() => {
        console.log('profile: ', profile);
        const { accountType, username } = profile;
        setPersonalInfo(profile);
        if (accountType === 'Business') {
            enableLoadTestimonial();
            console.log('business');
            axiosInstance.getSpecificBusinessCard(username).then(({ data: { data } }) => {
                console.log('data', data)
                setBusinessCard(data);
            }).catch(e => {
                console.log('Error in Api BusinessCard: ', e);
            })
            axiosInstance.getSpecificTestimonials(username).then(({ data: { data } }) => {
                setTestimonials(data);
                disableLoadTestimonial();
            }).catch(e => {
                disableLoadTestimonial();
                console.log('Error in Api Testimonials: ', e.response.data.message);
            })
        }
    }, [])

    useEffect(() => {
        const { username } = profile;
        axiosInstance.getSpecificFollow(username).then(({ data: { data: { followers, followed } } }) => {
            console.log(followers, followed);
            setFollowed(followed);
            setFollowers(followers);
            let Followed = followers.filter(user => user?.id === parseInt(localStorage.getItem('id')) && user);
            if (!isEmpty(Followed)) {
                console.log(Followed);
                setIsFollowing(true);
                setCanMessage(true)
            }

        }).catch(e => {
            console.log(e);
        })
    }, [isFollowing, profile])

    const enableLoadTestimonial = () => {
        setLoadingTestimonial(true);
    };

    const disableLoadTestimonial = () => {
        setLoadingTestimonial(false);
    };

    const _Follow = () => {
        axiosInstance.followUser({ username: profile?.username }).then(({ data: { data: { follow } } }) => {
            setIsFollowing(follow);
            setCanMessage(canMessage => canMessage = follow);
        })
            .catch(err => {
                console.log('FollowUser API Failed: ', err);
            })
    }
    let handleShowBusinessCard = () => {
        console.log('clicked');
        setShowBusinessCard(showBusinessCard => !showBusinessCard)
    };

    const gotoMessaging = (id) => {
        router.push(`/dashboard/messages/${id}`)
    }

    const { id, name, about, rating, views, picture, phone, showPhone, email, accountType, username, showName, showUsername } = personalInfo;
    const { website } = businessCard;

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
                    otherUser={true}
                    data={personalInfo}
                    followed={followed}
                    followers={followers}
                    canMessage={canMessage}
                    website={website || ''}
                    isFollowing={isFollowing}
                    showBusinessCard={showBusinessCard}
                    _Follow={_Follow}
                    gotoMessaging={gotoMessaging}
                    handleShowBusinessCard={handleShowBusinessCard}
                />
            </div>
            <div className="hidden md:flex flex-row w-full h-auto">
                <div className="flex w-1/6 px-2 py-1">
                    {/* <div className="rounded-2xl w-28 h-36 relative px-2 py-1"> */}
                    {picture ?
                        <img src={picture} alt="profile" className="rounded-2xl w-30 h-40" />
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
                                <h1 className=" text-md lg:text-2xl font-semibold">{accountType === 'Personal' ? showName ? name : showUsername ? username : '' : name}</h1>
                            </div>
                            <h2 className="text-sm text-gray-500">{showPhone ? phone : ''}</h2>
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
                        {about ?
                            <p className="text-sm">
                                {about}
                            </p> :
                            <p className="text-sm text-gray-400"> {accountType === 'Business' ? 'Intro' : 'About'}</p>
                        }
                    </div>
                    {accountType === "Business" && (
                        <div className="flex w-full mt-2 px-2 " onClick={handleShowBusinessCard}>
                            <p className="text-xs no-underline hover:underline text-indigo-600 cursor-pointer">
                                Virtual Business Card
                            </p>
                        </div>
                    )}
                    <div className="flex w-full mt-3 items-center px-2 space-x-6">
                        <button onClick={_Follow} className={isFollowing ? 'followingBtn' : 'followBtn'}>
                            {isFollowing ? 'Following' : 'Follow'}
                        </button>

                        {canMessage &&
                            <button
                                onClick={() => gotoMessaging(id)}
                                className='followBtn'>
                                Message
                            </button>
                        }
                    </div>
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
                                            views={200}
                                            rating={4.5}
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
                                    views={200}
                                    rating={3.5}
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
                        {
                            loadingTestimonial ? (
                                <div className="flex w-full justify-center">
                                    <span className="flex flex-col items-center">
                                        <Spinner />
                                        <p className="text-sm text-gray-400"> Loading Testimonials</p>
                                    </span>
                                </div>
                            )
                                :
                                isEmpty(testimonials) ? (
                                    <div className="flex w-full justify-center items-center">
                                        <p className="text-gray-500"> No Testimonials Yet</p>
                                    </div>
                                )
                                    :
                                    <div className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                                        {
                                            testimonials.map(({ picture, description, designation, ownerName }) => (
                                                <TestimonialCard
                                                    image={picture}
                                                    name={ownerName}
                                                    designation={designation}
                                                    description={description}
                                                    otherUser={true}
                                                />
                                            ))
                                        }
                                    </div>
                        }
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
    const { query: { username } } = context;
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
        const res = await axios.get(`${process.env.BASE_URL}api/profile/${username}`, { headers: { Authorization: "Bearer " + token } })
        const { data } = res.data;
        return {
            props: {
                profile: data
            }
        }
    }
}

export default UserProfile;
