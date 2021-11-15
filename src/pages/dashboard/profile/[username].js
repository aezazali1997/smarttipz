/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { isEmpty } from 'lodash';
import swal from 'sweetalert';
import axiosInstance from 'src/APIs/axiosInstance';
import { Card, PopupBusinessCard, ProfileCard, Rating, TestimonialCard, Spinner, NewsfeedCard, Carousel } from 'src/components';


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
    const [fetchingMyVideos, setFetchMyVideos] = useState(true);
    const [myVideos, setMyVideos] = useState([]);
    const [catalogues, setCatalogues] = useState([]);
    const [fetchingCatalogues, setFetchCatalogues] = useState(true);

    useEffect(() => {
        const { accountType, username } = profile;
        setPersonalInfo(profile);
        if (accountType === 'Business') {
            enableLoadTestimonial();
            axiosInstance.getSpecificBusinessCard(username).then(({ data: { data } }) => {
                setBusinessCard(data);
            }).catch(e => {
                console.log('Error in Api BusinessCard: ', e.response.data.message);
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
            setFollowed(followed);
            setFollowers(followers);
            let Followed = followers.filter(user => user?.id === parseInt(localStorage.getItem('id')) && user);
            if (!isEmpty(Followed)) {
                setIsFollowing(true);
                setCanMessage(true)
            }

        }).catch(e => {
            console.log(e);
        })
    }, [isFollowing, profile])



    const fetchCatalogues = async (username) => {
        enableFetchCatalogue();
        try {
            const { data: { data: { catalogues } } } = await axiosInstance.getSpecificCatalogues(username);
            setCatalogues(catalogues);
            disableFetchCatalogue();
        }
        catch ({ response: { data: { message } } }) {
            console.log('Error in catalogue Api: ', message);
            disableFetchCatalogue();
        }
    }

    const fetchMyVideos = async (username) => {
        enableFetchMyVideos();
        try {
            const { data: { data: { videos } } } = await axiosInstance.getSpecificVideos(username);
            setMyVideos(videos);
            disableFetchMyVideos();
        }
        catch ({ response: { data: { message } } }) {
            console.log('Error in videos Api: ', message);
            disableFetchMyVideos();
        }
    }


    useEffect(() => {
        const { username } = profile;
        fetchCatalogues(username);
        fetchMyVideos(username);
    }, []);


    const enableFetchCatalogue = () => {
        setFetchCatalogues(true);
    };

    const disableFetchCatalogue = () => {
        setFetchCatalogues(false);
    };

    const enableFetchMyVideos = () => {
        setFetchMyVideos(true);
    };

    const disableFetchMyVideos = () => {
        setFetchMyVideos(false);
    };

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
        setShowBusinessCard(showBusinessCard => !showBusinessCard)
    };

    const gotoMessaging = (id, accessible) => {
        if (accessible === false) {
            swal({
                buttons: false,
                text: 'This user has turned off messages'
            })
        }
        else {
            router.push(`/dashboard/messages/${id}`)
        }
    }

    const { id, name, about, rating, views, picture, phone, showPhone, email, accountType, username, showName, showUsername, accessible } = personalInfo;
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
                            <div className="flex w-full mt-2 px-2">
                                {about ?
                                    <p className="text-sm text-justify break-words md:max-w-xs">
                                        {about}
                                    </p> :
                                    <p className="text-sm text-gray-400"> {accountType === 'Business' ? 'Intro' : 'About'}</p>
                                }
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

                    {accountType === "Business" && (
                        <div className="flex w-full mt-2 px-2 " onClick={handleShowBusinessCard}>
                            <p className="text-xs no-underline hover:underline text-indigo-600 cursor-pointer">
                                Contact details
                            </p>
                        </div>
                    )}
                    <div className="flex w-full mt-3 items-center px-2 space-x-6">
                        <button onClick={_Follow} className={isFollowing ? 'followingBtn' : 'followBtn'}>
                            {isFollowing ? 'Following' : 'Follow'}
                        </button>

                        {canMessage &&
                            <button
                                onClick={() => gotoMessaging(id, accessible)}
                                className='followBtn'>
                                Message
                            </button>
                        }
                    </div>
                </div>
            </div>
            <>
                <div className="flex flex-col w-full px-2 mt-4">
                    <h1 className="text-md font-medium">
                        {accountType === 'Personal' ? showName ? name + "'s"
                            : showUsername ? username + "'s" : '' : name + "'s"} Catalogue
                    </h1>
                    {
                        fetchingCatalogues ? (
                            <div className="flex w-full justify-center">
                                <span className="flex flex-col items-center">
                                    <Spinner />
                                    <p className="text-sm text-gray-400"> Loading Catalogues</p>
                                </span>
                            </div>
                        )
                            :
                            isEmpty(catalogues) ? (
                                <div className="flex w-full justify-center items-center">
                                    <p className="text-gray-500"> No Catalogues Yet</p>
                                </div>
                            )
                                :
                                <div className="w-auto mt-6 relative">
                                    <Carousel>
                                        {
                                            catalogues.map(({ id, UserId, title, url, mediaType, thumbnail, catalogue, description, User }, index) => (
                                                <div key={index} className="my-2 px-5">
                                                    <NewsfeedCard
                                                        id={id}
                                                        UserId={UserId}
                                                        index={index}
                                                        catalogue={catalogue}
                                                        url={url}
                                                        User={User}
                                                        views={200}
                                                        rating={2.5}
                                                        mediaType={mediaType}
                                                        description={description}
                                                        title={title}
                                                        width={'max-w-xs'}
                                                        thumbnail={thumbnail}
                                                    />
                                                </div>
                                                /* <div key={index}>
                                                  <Card
                                                    image={url}
                                                    title={title}
                                                    views={200}
                                                    mediaType={mediaType}
                                                    thumbnail={thumbnail}
                                                    id={id}
                                                    rating={3.5}
                                                    menu={true}
                                                    catalogue={catalogue}
                                                    UserId={UserId}
                                                    _HandleCatalogue={_HandleCatalogue}
                                                  />
                                                </div> */
                                            ))
                                        }

                                    </Carousel>
                                </div>
                    }
                </div>
            </>
            {/* )} */}
            {/* section ends here */}
            {/* section starts here */}
            <div className="flex flex-col w-full px-2  mt-8">
                <h1 className="text-md font-medium">Videos</h1>
                {
                    fetchingMyVideos ? (
                        <div className="flex w-full justify-center">
                            <span className="flex flex-col items-center">
                                <Spinner />
                                <p className="text-sm text-gray-400"> Loading Videos</p>
                            </span>
                        </div>
                    )
                        :
                        isEmpty(myVideos) ? (
                            <div className="flex w-full justify-center items-center">
                                <p className="text-gray-500"> No Videos Yet</p>
                            </div>
                        )
                            :
                            <div className="w-full mt-6 justify-center lg:justify-start" >
                                <Carousel>
                                    {
                                        myVideos.map(({ title, url, mediaType, thumbnail, like, comment, share, description, id, UserId, catalogue, User }, index) => (
                                            <div key={index} className="my-2 px-5">
                                                <NewsfeedCard
                                                    id={id}
                                                    UserId={UserId}
                                                    index={index}
                                                    catalogue={catalogue}
                                                    url={url}
                                                    User={User}
                                                    views={200}
                                                    rating={2.5}
                                                    mediaType={mediaType}
                                                    description={description}
                                                    title={title}
                                                    isPost={true}
                                                    width={'max-w-xs'}
                                                    thumbnail={thumbnail}
                                                />
                                            </div>
                                            /* <div key={index}>
                                              <Card
                                                image={url}
                                                title={title}
                                                thumbnail={thumbnail}
                                                mediaType={mediaType}
                                                comment={comment}
                                                like={like}
                                                share={share}
                                                views={200}
                                                rating={3.5}
                                                disclaimer={true}
                                                id={id}
                                                catalogue={catalogue}
                                                UserId={UserId}
                                                isPost={true}
                                                menu={true}
                                                index={index}
                                                _HandleCatalogue={_HandleCatalogue}
                                                _HandleDeleteVideo={_HandleDeleteVideo}
                                              />
                                            </div> */
                                        ))
                                    }
                                </Carousel>
                            </div>}
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
                                            testimonials.map(({ picture, description, designation, ownerName, isVisible }) => (
                                                isVisible && (
                                                    <TestimonialCard
                                                        image={picture}
                                                        name={ownerName}
                                                        designation={designation}
                                                        description={description}
                                                        otherUser={true}
                                                    />
                                                )
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
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/profile/${username}`, { headers: { Authorization: "Bearer " + token } })
        const { data } = res.data;
        return {
            props: {
                profile: data
            }
        }
    }
}

export default UserProfile;
