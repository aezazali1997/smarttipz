/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import axiosInstance from 'src/APIs/axiosInstance';
import {
    VideoPlayer,
    Rating,
    Button,
    ReadLessReadMore,
    CommentCard,
    NewsfeedCard,
    SuggestionCard
} from 'src/components';
import { PostActionDropdown } from 'src/components/Dropdown';
import Swal from 'sweetalert2';
import { TipModal, VideoRatingModal } from 'src/components/Modals';

const VideoDetailScreen = () => {
    const router = useRouter();
    const { id } = router.query;
    const [video, setVideo] = useState({});
    const [posts, setPosts] = useState([]);
    const [catalogueCount, setCatalogueCount] = useState(0);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [showTipModal, setShowTipModal] = useState(false);

    const _GetVideoById = async () => {
        try {
            const {
                data: {
                    data: { video }
                }
            } = await axiosInstance.getVideoById(id);
            console.log('video: ', video);
            setVideo(video);
        } catch (e) {
            console.log('api failed => ', e);
        }
    };

    let GetPosts = async () => {
        try {
            const {
                data: {
                    data: { videos }
                }
            } = await axiosInstance.getNewsFeedPosts();
            setPosts(videos);
            console.log(videos);
            var count = 0;
            for (let i = 0; i < videos.length; i++) {
                if (
                    videos[i].catalogue === true &&
                    videos[i].UserId == parseInt(localStorage.getItem('id'))
                ) {
                    count = count + 1;
                }
            }
            setCatalogueCount(count);
        } catch ({
            response: {
                data: { message }
            }
        }) {
            console.log(message);
        }
    };

    useEffect(() => {
        _GetVideoById();
        GetPosts();
    }, []);

    const _HandleCatalogue = async (videoId, catalogue) => {
        if (catalogueCount < 5 || catalogue === true) {
            console.log('here: ', catalogueCount);
            try {
                const data = await axiosInstance.addToCatalogue({ videoId, catalogue });
                if (catalogue) {
                    setCatalogueCount((catalogueCount) => catalogueCount - 1);
                } else {
                    setCatalogueCount((catalogueCount) => catalogueCount + 1);
                }
                console.log({ data });
                const originalArray = [...posts];
                let newArray = originalArray.map((item, i) => {
                    if (item.id !== videoId) return item;
                    item.catalogue = !catalogue;
                    return item;
                });
                setPosts(newArray);
            } catch ({
                response: {
                    data: { message }
                }
            }) {
                console.log('error in Api: ', message);
            }
        } else {
            Swal.fire({
                text: 'You can add only 5 videos in catalogue, please delete any to proceed',
                // timer: 4000,
                icon: 'info',
                showConfirmButton: true,
                showCancelButton: false,
                buttonsStyling: false,
                customClass: {
                    confirmButton:
                        'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
                }
            });
        }
    };

    const _HandleDeleteVideo = async (index, videoId) => {
        try {
            const res = await axiosInstance.deleteVideo(videoId);
            setCatalogueCount((catalogueCount) => catalogueCount - 1);
            const originalArray = [...posts];
            originalArray.splice(index, 1);
            setPosts(originalArray);
        } catch ({
            response: {
                data: { message }
            }
        }) {
            console.log('Api Failed: ', message);
        }
    };

    const _HandleGotoUserProfile = (id, username) => {
        if (id !== parseInt(localStorage.getItem('id'))) {
            router.push(`/dashboard/profile/${username}`);
        } else {
            router.push(`/dashboard/profile`);
        }
    };

    const _HandleGotoVideoDetails = (id) => {
        router.push(`/dashboard/videos/${id}`);
    };

    const ToggleRatingModal = () => {
        setShowRatingModal(!showRatingModal);
    };

    const _HandleChangeRating = (value) => {
        console.log('value: ', value);
    };

    const ToggleTipModal = () => {
        setShowTipModal(!showTipModal);
    };

    const _HandleChangeTip = (value) => {
        console.log('value: ', value);
    };

    const {
        title,
        url,
        videoType,
        videoCost,
        thumbnail,
        mediaType,
        UserId,
        description,
        User,
        like,
        comment,
        share,
        catalogue
    } = video;

    return (
        <div className="flex flex-col lg:flex-row min-h-screen py-5 px-3 cursor-auto bg-gray-100">
            <div className="w-full lg:w-8/12 flex flex-col">
                <div className="flex w-full py-2 justify-between space-x-2">
                    <div className="flex">
                        <img
                            src={User?.picture ||
                                "https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"}
                            className="rounded-full w-16 h-10 object-cover"
                            alt="avatar"></img>
                        <div className="flex flex-col w-full">
                            <p
                                onClick={() => _HandleGotoUserProfile(UserId, User?.username)}
                                className="text-sm font-bold font-sans hover:underline cursor-pointer">
                                {User?.name}
                            </p>
                            <p className="text-xs text-gray-500">19h</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="flex px-2 h-6 rounded-lg background items-center justify-center">
                            <p className="text-white font-sm">{videoType}</p>
                        </div>
                        <div className="flex px-2 h-6 rounded-lg background items-center justify-center">
                            <p className="text-white font-sm">{videoCost}</p>
                        </div>
                        <svg
                            className="w-6 h-6 text-gray-500 hover:text-purple-600 cursor-pointer"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <div className="flex items-start justify-start">
                            <PostActionDropdown
                                _HandleCatalogue={() => _HandleCatalogue(id, catalogue)}
                                _HandleDeleteVideo={() => _HandleDeleteVideo(index, id)}
                                ToggleRatingModal={ToggleRatingModal}
                                ToggleTipModal={ToggleTipModal}
                                catalogue={catalogue}
                                ownerId={UserId}
                                isPost={true}
                            />
                        </div>
                    </div>
                </div>
                <p
                    // onClick={() => _HandleGotoVideoDetails(id)}
                    className="px-3 pb-1 text-sm max-w-md whitespace-nowrap overflow-ellipsis overflow-hidden">
                    {title}
                </p>
                <div className="detail-page-video-wrapper">
                    <VideoPlayer src={url} poster={thumbnail} />
                </div>
                <div className="w-full flex flex-col md:flex-row justify-center md:justify-between py-2">
                    <div className="flex flex-row justify-between space-x-3">
                        <div className="flex space-x-3">
                            <Button
                                // onSubmit={_OpenUploadModal}
                                type="button"
                                childrens={
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="11.825"
                                            height="11.825"
                                            viewBox="0 0 11.825 11.825">
                                            <path
                                                id="Icon_awesome-thumbs-up"
                                                data-name="Icon awesome-thumbs-up"
                                                d="M2.4,5.173H.554A.554.554,0,0,0,0,5.728v5.543a.554.554,0,0,0,.554.554H2.4a.554.554,0,0,0,.554-.554V5.728A.554.554,0,0,0,2.4,5.173ZM1.478,10.9a.554.554,0,1,1,.554-.554A.554.554,0,0,1,1.478,10.9Zm7.391-9.02c0,.98-.6,1.529-.769,2.184H10.45a1.38,1.38,0,0,1,1.375,1.342,1.672,1.672,0,0,1-.449,1.136l0,0a1.929,1.929,0,0,1-.215,1.835,1.826,1.826,0,0,1-.378,1.727,1.226,1.226,0,0,1-.142,1.031c-.471.677-1.64.687-2.628.687H7.945a6.63,6.63,0,0,1-2.761-.733,3.635,3.635,0,0,0-1.216-.374.277.277,0,0,1-.272-.277V5.5a.277.277,0,0,1,.082-.2C4.692,4.4,5.086,3.446,5.836,2.7a2.8,2.8,0,0,0,.586-1.36C6.525.908,6.74,0,7.206,0,7.76,0,8.869.185,8.869,1.881Z"
                                                fill="#714de1"
                                            />
                                        </svg>
                                        <p
                                            className={`cursor-pointer w-full text-center text-gray-600 group-hover:text-purple-600`}>
                                            Like
                                        </p>
                                    </>
                                }
                                classNames={
                                    'text-xs hover:shadow py-1 px-5 w-20 bg-white flex flex-col m-auto items-center rounded-md '
                                }
                            />
                            <Button
                                // onSubmit={_OpenUploadModal}
                                type="button"
                                childrens={
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="11.824"
                                            height="11.513"
                                            viewBox="0 0 11.824 13.513">
                                            <path
                                                id="Icon_awesome-share-alt"
                                                data-name="Icon awesome-share-alt"
                                                d="M9.29,8.446A2.523,2.523,0,0,0,7.712,9l-2.7-1.691a2.548,2.548,0,0,0,0-1.1l2.7-1.691a2.529,2.529,0,1,0-.9-1.432l-2.7,1.691a2.534,2.534,0,1,0,0,3.965l2.7,1.691A2.534,2.534,0,1,0,9.29,8.446Z"
                                                fill="#714de1"
                                            />
                                        </svg>
                                        <p className="text-xs  cursor-pointer w-full text-center text-gray-600 group-hover:text-purple-600">
                                            Share
                                        </p>
                                    </>
                                }
                                classNames={
                                    'py-1 px-5 hover:shadow w-20 bg-white flex flex-col m-auto items-center rounded-md '
                                }
                            />
                        </div>
                        <div className="flex divide-x divide-gray-500 items-center justify-center space-x-2">
                            <span>
                                <p className="text-sm ">1K Likes</p>
                            </span>
                            <span>
                                <p className="text-sm ml-2">2.2K Shares</p>
                            </span>
                        </div>
                    </div>
                    <div className="flex space-x-3 divide-x divide-gray-500 justify-end md:justify-center items-center">
                        <div>
                            <span className="flex items-center">
                                <Rating value={4} isHalf={true} edit={false} />
                                &nbsp; <p className="text-xs"> Rating</p>
                            </span>
                        </div>
                        <div>
                            <span className="flex items-center ml-2">
                                <svg
                                    className="w-4 h-4 text"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                &nbsp;<p className="text-xs">{200} Views</p>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full space-y-1 mt-3">
                    <p className="font-bold text-md">Description</p>
                    <p className="text-sm break-words">
                        <ReadLessReadMore
                            limit={250}
                            text={`Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged`|| ''}
                        />
                    </p>
                </div>
                <div className="flex flex-col w-full mt-3">
                    <div className="flex justify-between">
                        <p className="font-bold text-md">Comments</p>
                        <p className="text-sm">1.2K Comments</p>
                    </div>
                    <div className="flex items-center border-b border-gray-500 py-2 mb-4">
                        <input
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="text"
                            placeholder="Write comment here..."
                            aria-label="Full name"
                        />
                    </div>
                    <div className="space-y-2 py-2">
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-4/12 flex-flex-col">
                <p className="font-bold text-md mb-3 px-5">Related Videos</p>
                <div className="space-y-2 px-5">
                    {posts &&
                        posts.map(
                            (
                                { id, description, title, url, UserId, thumbnail, PostLikees, catalogue, User, videoType, videoCost },
                                index
                            ) => (
                                <div key={index}>
                                    <SuggestionCard
                                        id={id}
                                        UserId={UserId}
                                        index={index}
                                        catalogue={catalogue}
                                        url={url}
                                        User={User}
                                        views={200}
                                        rating={2.5}
                                        videoCost={videoCost}
                                        videoType={videoType}
                                        mediaType={mediaType}
                                        description={description}
                                        title={title}
                                        isPost={true}
                                        width={'max-w-lg'}
                                        thumbnail={thumbnail}
                                        _HandleGotoUserProfile={_HandleGotoUserProfile}
                                        _HandleGotoVideoDetails={_HandleGotoVideoDetails}
                                        _HandleCatalogue={_HandleCatalogue}
                                        _HandleDeleteVideo={_HandleDeleteVideo}
                                    />
                                </div>
                            )
                        )}
                </div>
            </div>
            {showRatingModal && (
                <VideoRatingModal
                    modalTitle={'Video Rating Modal'}
                    ToggleRatingModal={ToggleRatingModal}
                    _HandleChangeRating={_HandleChangeRating}
                    loading={false}
                    videoRating={2}
                />
            )}
            {showTipModal && (
                <TipModal
                    _HandleChangeTip={_HandleChangeTip}
                    tip={2}
                    ToggleTipModal={ToggleTipModal}
                    loading={false}
                    modalTitle={'Video Tip Modal'}
                />
            )}
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const { token } = parseCookies(context);
    if (!token)
        return {
            redirect: {
                permanent: false,
                destination: '/auth/login'
            },
            props: {}
        };
    else {
        return {
            props: {}
        };
    }
};

export default VideoDetailScreen;
