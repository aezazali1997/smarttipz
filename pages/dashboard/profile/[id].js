/* eslint-disable react/jsx-key */
import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import logo from '../../../public/profile.jpg';
import { Card, ProfileCard, Rating, TestimonialCard } from '../../../components';
import videos from '../../../utils/VdeoSchema.json';
import testimonialVideo from '../../../utils/testimonialSchema.json';


const UserProfile = () => {
    let router = useRouter();
    const { id } = router.query;

    const gotoMessaging = () => {
        router.push(`/dashboard/messages/${id}`)
    }

    // const [personalInfo, setPersonalInfo] = useState({});

    // useEffect(() => {
    //     console.log('profile', profile);
    //     setPersonalInfo(personalInfo => personalInfo = profile);
    // }, []);

    // const { name, about, accessible, followed, following, rating, username, views, picture, phone, showMessages, accountType } = personalInfo;


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
                    logo={logo}
                    data={''}
                    value={4}
                    otherUser={true}
                />
            </div>
            <div className="hidden md:flex flex-row w-full h-full items-center">
                <div className="flex px-2 py-1">
                    <div className="rounded-2xl w-32 h-44 relative px-2 py-1">
                        <Image src={logo} alt="profile" className="rounded-2xl " layout="fill" />
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    {/* section starts here */}
                    <div className="flex flex-row w-full justify-between px-2 py-2">
                        <div className="flex flex-col w-full lg:w-1/2">
                            <div className="flex w-full">
                                <h1 className=" text-lg lg:text-2xl font-semibold">{'Reena Thomas'}</h1>
                            </div>
                            <h2 className="text-sm text-gray-500">{'+92 1234567890'}</h2>
                            {/* <h2 className="text-sm text-gray-500">Marketing Specialist</h2> */}
                            <div className="flex flex-row justify-between w-full md:max-w-xs mt-1">
                                <span className="flex w-full items-center">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                    &nbsp;<p className="text-xs">{'200'} Views</p></span>
                                <span className="flex w-full items-center">
                                    <Rating value={3} />
                                    &nbsp; <p className="text-xs"> Rating</p></span>
                            </div>
                        </div>
                        {

                        }
                        <div className="flex flex-col lg:w-1/2">
                            <div className="flex lg:justify-end space-x-10">
                                <div className="flex flex-col">
                                    <h1 className="text-md lg:text-3xl font-semibold text-center">{'1.3K'}</h1>
                                    <h2 className="text-sm text-black">Followers</h2>
                                </div>
                                <div className="flex flex-col ">
                                    <h1 className=" text-md lg:text-3xl font-semibold text-center">{'1.8K'}</h1>
                                    <h2 className="text-sm  text-black">Following</h2>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    {/* section ends here */}
                    <div className="flex w-full mt-2 px-2">
                        <p className="text-xs">
                            {'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '}
                        </p>
                    </div>
                    <div className="flex w-full items-center mt-1 px-2 space-x-6">
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
            {/* {accountType === 'Business' ? */}
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

            {/* section ends here */}
        </div>
    )
}

export default UserProfile;
