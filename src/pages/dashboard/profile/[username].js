/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { isEmpty } from 'lodash';
import swal from 'sweetalert';
import axiosInstance from 'src/APIs/axiosInstance';
import {
  Card,
  PopupBusinessCard,
  ProfileCard,
  Rating,
  TestimonialCard,
  Spinner,
  NewsfeedCard,
  Carousel
} from 'src/components';
import { useSearchContext } from 'src/contexts';
import { PaymentModal, ShareModal, TipModal, VideoRatingModal } from 'src/components/Modals';
import Swal from 'sweetalert2';
import { calculateAvgRating, checkLikeCount } from 'helpers';
import { AnimatePresence } from 'framer-motion';
import { calProfileRating } from '../../../../utils/rating';
import CustomStar from '../../../components/CustomStar';

const initialRatingData = {
  postId: '',
  oldAvgRating: '',
  newRating: '',
  totalRaters: ''
};

const UserProfile = ({ profile }) => {
  let router = useRouter();
  const { setOtherUserDetail } = useSearchContext();

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
  const [shareData, setShareData] = useState({});
  const [isSharing, setIsSharing] = useState(false);
  const [shareCaption, setShareCaption] = useState('');
  const [showTipModal, setShowTipModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [postRating, setSharePostRating] = useState(0);
  const [tip, setTip] = useState(0);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [videoPayment, setVideoPayment] = useState(0);
  const [ratingData, setRatingData] = useState({ ...initialRatingData });
  const [profileRating, setProfileRating] = useState(0);
  const [userBalance, setUserBalance] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [amountReciever, setAmountReciever] = useState(null);
  const [paymentVideoId, setPaymentVideoId] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [tipError, setTipError] = useState('');

  const getBalance = async () => {
    try {
      let {
        data: { balance }
      } = await axiosInstance.getUserBalance(localStorage.getItem('id'));
      setUserBalance(balance);
    } catch (error) {
      console.log('Error while getting user balance');
    }
  };
  useEffect(() => {
    getBalance();
    const { accountType, username } = profile;
    setPersonalInfo(profile);
    if (accountType === 'Business') {
      enableLoadTestimonial();
      axiosInstance
        .getSpecificBusinessCard(username)
        .then(({ data: { data } }) => {
          setBusinessCard(data);
        })
        .catch((e) => {
          console.log('Error in Api BusinessCard: ', e.response.data.message);
        });
      axiosInstance
        .getSpecificTestimonials(username)
        .then(({ data: { data } }) => {
          setTestimonials(data);
          disableLoadTestimonial();
        })
        .catch((e) => {
          disableLoadTestimonial();
          console.log('Error in Api Testimonials: ', e.response.data.message);
        });
    }
  }, []);

  useEffect(() => {
    const { username } = profile;
    axiosInstance
      .getSpecificFollow(username)
      .then(
        ({
          data: {
            data: { followers, followed, avgProfileRating }
          }
        }) => {
          setFollowed(followed);
          setFollowers(followers);
          setProfileRating(avgProfileRating);
          let Followed = followers.filter((user) => user?.id === parseInt(localStorage.getItem('id')) && user);
          if (!isEmpty(Followed)) {
            setIsFollowing(true);
            setCanMessage(true);
          }
        }
      )
      .catch((e) => {
        console.log(e);
      });
  }, [isFollowing, profile]);

  const fetchCatalogues = async (username) => {
    enableFetchCatalogue();
    try {
      const {
        data: {
          data: { catalogues }
        }
      } = await axiosInstance.getSpecificCatalogues(username);
      setCatalogues(catalogues);
      disableFetchCatalogue();
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('Error in catalogue Api: ', message);
      disableFetchCatalogue();
    }
  };

  const paymentSubmit = async () => {
    if (videoPayment > userBalance) {
      setPaymentError('You do not have the required amount in your wallet. Please top up your wallet from Settings.');
      return;
    }
    setIsPaying(true);

    try {
      const data = {
        senderId: localStorage.getItem('id'),
        receiverId: amountReciever,
        paid: videoPayment,
        videoId: paymentVideoId
      };

      let {
        data: { balance }
      } = await axiosInstance.postPaid(data);
      setUserBalance(balance);
      setIsPaying(false);
      setAmountReciever(null);
      _TogglePaymentModal();

      let tempVideos = [...myVideos];
      for (let i = 0; i < myVideos.length; i++) {
        if (tempVideos[i].VideoId === paymentVideoId) {
          tempVideos[i].hasPaid = true;
        }
      }
      setMyVideos(tempVideos);

      // uncomment this
      // setPaymentVideoId(null);

      // GetPosts(0);
      Swal.fire({
        text: 'You can now View the Video',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        showCancelButton: false
      });
    } catch (error) {
      console.log('Error! ', error.message);
      _TogglePaymentModal();
      Swal.fire({
        text: error.message,
        icon: 'error',

        showConfirmButton: false,
        showCancelButton: false
      });
    }
  };

  const fetchMyVideos = async (username) => {
    enableFetchMyVideos();
    try {
      const {
        data: {
          data: { videos }
        }
      } = await axiosInstance.getSpecificVideos(username);
      setMyVideos(videos);
      disableFetchMyVideos();
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('Error in videos Api: ', message);
      disableFetchMyVideos();
    }
  };

  useEffect(() => {
    const { username } = profile;
    fetchCatalogues(username);
    fetchMyVideos(username);
  }, []);

  // useEffect(()=>{
  // 	if(myVideos) setProfileRating(profileRating => profileRating = calProfileRating(myVideos));
  // },[myVideos])

  const enableFetchCatalogue = () => {
    setFetchCatalogues(true);
  };

  const disableFetchCatalogue = () => {
    setFetchCatalogues(false);
  };

  const enableFetchMyVideos = () => {
    setFetchMyVideos(true);
  };
  const postViewOnVideo = async (VideoId) => {
    try {
      await axiosInstance.viewPost({ VideoId: VideoId });
    } catch (error) {
      console.log('ERROR:', error);
    }
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

  const enableShareLoading = () => {
    setIsSharing(true);
  };

  const disableShareLoading = () => {
    setIsSharing(false);
  };

  const _Follow = async () => {
    try {
      const {
        data: {
          data: { follow }
        }
      } = await axiosInstance.followUser({ username: profile?.username });
      setIsFollowing(follow);
      setCanMessage((canMessage) => (canMessage = follow));
    } catch (err) {
      console.log('FollowUser API Failed: ', err);
    }
  };

  let handleShowBusinessCard = () => {
    setShowBusinessCard((showBusinessCard) => !showBusinessCard);
  };

  const gotoMessaging = (id, accessible) => {
    if (accessible === false) {
      swal({
        buttons: false,
        text: 'This user has turned off messages'
      });
    } else {
      const details = { picture, name, id, username };
      localStorage.setItem('profile', JSON.stringify(details));
      setOtherUserDetail(details);
      router.push(`/dashboard/profile/messages/${id}`);
    }
  };

  const HandleLikePost = async (id, isLiked) => {
    const updatedCatPosts = await checkLikeCount(catalogues, id, isLiked);
    const updatedVideoPosts = await checkLikeCount(myVideos, id, isLiked);
    setCatalogues(updatedCatPosts);
    setMyVideos(updatedVideoPosts);
    try {
      await axiosInstance.likePost({ postId: id });
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('Like Post Api failed: ', message);
    }
  };

  const _HandleCommentCounts = async (postId, operator) => {
    const updatedCatPost = await checkCountById(catalogues, 'commentCount', postId, operator);
    const updatedVideoPost = await checkCountById(myVideos, 'commentCount', postId, operator);
    setCatalogues(updatedCatPost);
    setMyVideos(updatedVideoPost);
  };

  const _HandleGotoVideoDetails = (id) => {
    router.push(`/dashboard/videos/${id}`);
  };

  const handleTipSubmit = async () => {
    if (localStorage.getItem('id') == amountReciever) {
      return;
    }
    if (tip > userBalance) {
      setTipError('You do not have the required amount in your wallet. Please top up your wallet from Settings.');
      return;
    }

    setIsPaying(true);
    setShowCelebration(true);
    try {
      let data = {
        sender: localStorage.getItem('id'),
        reciever: amountReciever,
        video: paymentVideoId,
        tip
      };

      let {
        data: { balance }
      } = await axiosInstance.postTip(data);
      setUserBalance(balance);

      setTip(0);
      setPaymentVideoId(null);
      setAmountReciever(null);
    } catch (error) {
      console.log('ERROR', error.message);
      Swal.fire({
        icon: 'error',
        text: error.message,
        showCancelButton: false,
        showConfirmButton: false
      });
    }
    setIsPaying(false);
    setShowCelebration(false);
    ToggleTipModal();
  };
  let _OpenShareModal = (id, thumbnail, url, picture, name, title) => {
    setShareData({
      videoId: id,
      thumbnail,
      url,
      picture,
      name,
      title
    });
    setShowShareModal(true);
  };

  let _CloseShareModal = () => {
    setShowShareModal(false);
    setShareCaption('');
  };

  const OpenRatingModal = ({ postId, avgRating, totalRaters }) => {
    const data = {
      postId: postId,
      oldAvgRating: avgRating,
      totalRaters: totalRaters,
      newRating: ''
    };
    setRatingData(data);
    setShowRatingModal(true);
  };

  const ToggleRatingModal = () => {
    setRatingData({ ...initialRatingData });
    setShowRatingModal(false);
  };

  const _HandleChangeRating = (value) => {
    setSharePostRating(value);
    const copyRatingData = { ...ratingData };
    copyRatingData.newRating = value;
    setRatingData(copyRatingData);
  };

  const _SubmitRating = async () => {
    const { oldAvgRating = 0, totalRaters = 0, newRating = 0, postId = 1 } = ratingData;
    let rated = false;
    try {
      const {
        data: {
          data: { hasRated, newAvg, profileUpdatedRating }
        }
      } = await axiosInstance.ratePost({ postId: postId, rating: newRating });
      rated = hasRated;
      oldAvgRating = hasRated ? newAvg : oldAvgRating;
      setProfileRating(profileUpdatedRating);
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('in catch of api rating: ', message);
    }

    const updatedCatPosts = calculateAvgRating(
      catalogues,
      postId,
      parseInt(totalRaters),
      parseFloat(oldAvgRating),
      parseFloat(newRating),
      rated
    );
    const updatedVideoPosts = calculateAvgRating(
      myVideos,
      postId,
      parseInt(totalRaters),
      parseFloat(oldAvgRating),
      parseFloat(newRating),
      rated
    );
    setCatalogues((prevState) => (prevState = [...updatedCatPosts]));
    setMyVideos((prevState) => (prevState = [...updatedVideoPosts]));
    ToggleRatingModal();
  };

  const ToggleTipModal = (tip, UserId, id) => {
    setAmountReciever(UserId);
    setTip(tip);
    setPaymentVideoId(id);
    setShowTipModal(!showTipModal);
    setTipError('');
  };

  const _HandleChangeTip = ({ target }) => {
    const { value } = target;
    setTip(value);
  };

  const _HandleSharePost = async () => {
    console.log(shareCaption, shareData);
    enableShareLoading();
    try {
      const {
        data: { data, message }
      } = await axiosInstance.sharePost({ caption: shareCaption, videoId: shareData?.videoId });
      console.log('success: ', message);
      fetchCatalogues();
      fetchMyVideos();
      Swal.fire({
        text: message,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        showCancelButton: false
      });
      disableShareLoading();
      _CloseShareModal();
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log('Share Post Api failed: ', message);
    }
  };

  let _TogglePaymentModal = (cost, UserId, id) => {
    setVideoPayment(cost);
    setAmountReciever(UserId);
    setPaymentVideoId(id);
    setShowAmountModal(!showAmountModal);
  };

  const {
    id,
    name,
    about,
    rating,
    views,
    picture,
    phone,
    showPhone,
    email,
    accountType,
    username,
    showName,
    showUsername,
    accessible
  } = personalInfo;
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
          _rating={profileRating}
          _fetching={fetchingMyVideos}
        />
      </div>
      <div className="hidden md:flex flex-row w-full h-auto">
        <div className="flex w-1/6 px-2 py-1">
          {/* <div className="rounded-2xl w-28 h-36 relative px-2 py-1"> */}
          {picture ? (
            <img src={picture} alt="profile" className="rounded-2xl w-30 h-40" />
          ) : (
            <img
              src="https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg"
              alt=""
              className="rounded-full"
            />
          )}
          {/* </div> */}
        </div>
        <div className="flex flex-col w-4/6 md:w-5/6 ">
          {/* section starts here */}
          <div className="flex flex-row lg:justify-between px-2 ">
            <div className="flex flex-col w-full lg:w-1/2">
              <div className="flex justify-between items-start lg:items-end w-full md:w-2/3">
                <h1 className=" text-md lg:text-2xl font-semibold">
                  {accountType === 'Personal' ? (showName ? name : showUsername ? username : '') : name}
                </h1>
              </div>
              <h2 className="text-sm text-gray-500">{showPhone ? phone : ''}</h2>
              {/* <h2 className="text-sm text-gray-500">Marketing Specialist</h2> */}
              <div className="flex lg:flex-row lg:justify-between w-full md:max-w-xs mt-1">
                <span className="flex w-full items-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  &nbsp;<p className="text-xs">{views} Views</p>
                </span>
                <span className="flex w-full items-center">
                  <CustomStar value={profileRating || 0} isHalf={true} />
                </span>
              </div>
              <div className="flex w-full mt-2 px-2">
                {about ? (
                  <p className="text-sm text-justify break-words md:max-w-xs">{about}</p>
                ) : (
                  <p className="text-sm text-gray-400"> {accountType === 'Business' ? 'Intro' : 'About'}</p>
                )}
              </div>
            </div>
            {}
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
            <div></div>
          </div>
          {/* section ends here */}

          {accountType === 'Business' && (
            <div className="flex w-full mt-2 px-2 " onClick={handleShowBusinessCard}>
              <p className="text-xs no-underline hover:underline text-indigo-600 cursor-pointer">Contact details</p>
            </div>
          )}
          {!fetchingCatalogues ? (
            <div className="flex w-full mt-3 items-center px-2 space-x-6">
              <button onClick={_Follow} className={isFollowing ? 'followingBtn' : 'followBtn'}>
                {isFollowing ? 'Following' : 'Follow'}
              </button>

              {canMessage && (
                <button onClick={() => gotoMessaging(id, accessible)} className="followBtn">
                  Message
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
      {isFollowing ? (
        <>
          <>
            <div className="flex flex-col w-full px-2 mt-4">
              <h1 className="text-md font-medium">
                {accountType === 'Personal'
                  ? showName
                    ? name + "'s"
                    : showUsername
                    ? username + "'s"
                    : ''
                  : name + "'s"}{' '}
                Catalogue
              </h1>
              {fetchingCatalogues ? (
                <div className="flex w-full justify-center">
                  <span className="flex flex-col items-center">
                    <Spinner />
                    <p className="text-sm text-gray-400"> Loading Catalogues</p>
                  </span>
                </div>
              ) : isEmpty(catalogues) ? (
                <div className="flex w-full justify-center items-center">
                  <p className="text-gray-500"> No Catalogues Yet</p>
                </div>
              ) : (
                <div className="w-auto mt-6 relative">
                  <Carousel>
                    {catalogues.map(
                      (
                        {
                          id: postId,
                          isLiked,
                          shareCount,
                          likeCount,
                          commentCount,
                          avgRating,
                          totalRaters,
                          Video: {
                            id,
                            title,
                            url,
                            mediaType,
                            thumbnail,
                            description,
                            UserId,
                            catalogue,
                            User,
                            videoType,
                            videoCost,
                            Shares,
                            productLink,
                            watchLimit,
                            cost,
                            createdAt,
                            views
                          }
                        },
                        index
                      ) => (
                        <div key={index} className="my-2 px-5">
                          <NewsfeedCard
                            id={postId}
                            videoId={id}
                            UserId={UserId}
                            index={index}
                            catalogue={catalogue}
                            url={url}
                            User={User}
                            views={views}
                            createdAt={createdAt}
                            mediaType={mediaType}
                            videoType={videoType}
                            videoCost={videoCost}
                            Shares={Shares}
                            isLiked={isLiked}
                            likeCount={likeCount}
                            commentCount={commentCount}
                            shareCount={shareCount}
                            description={description}
                            title={title}
                            avgRating={avgRating}
                            productLink={productLink}
                            width={'max-w-xs'}
                            watchLimit={watchLimit}
                            thumbnail={thumbnail}
                            restrictPaidVideo={true}
                            ToggleTipModal={() => ToggleTipModal(User?.tip)}
                            _OpenShareModal={_OpenShareModal}
                            _HandleCommentCounts={_HandleCommentCounts}
                            _HandleGotoVideoDetails={_HandleGotoVideoDetails}
                            TogglePaymentModal={() => _TogglePaymentModal(cost, UserId, id)}
                            HandleLikePost={() => HandleLikePost(postId, isLiked)}
                            ToggleRatingModal={() => OpenRatingModal({ postId, avgRating, totalRaters })}
                            _handleViewsOnVideo={postViewOnVideo}
                          />
                        </div>
                      )
                    )}
                  </Carousel>
                </div>
              )}
            </div>
          </>
          {/* )} */}
          {/* section ends here */}
          {/* section starts here */}
          <div className="flex flex-col w-full px-2  mt-8">
            <h1 className="text-md font-medium">Videos</h1>
            {fetchingMyVideos ? (
              <div className="flex w-full justify-center">
                <span className="flex flex-col items-center">
                  <Spinner />
                  <p className="text-sm text-gray-400"> Loading Videos</p>
                </span>
              </div>
            ) : isEmpty(myVideos) ? (
              <div className="flex w-full justify-center items-center">
                <p className="text-gray-500"> No Videos Yet</p>
              </div>
            ) : (
              <div className="w-full mt-6 justify-center lg:justify-start">
                <Carousel>
                  {myVideos.map(
                    (
                      {
                        id: postId,
                        isLiked,
                        shareCount,
                        likeCount,
                        commentCount,
                        avgRating,
                        totalRaters,
                        Video: {
                          id,
                          description,
                          title,
                          url,
                          UserId,
                          thumbnail,
                          catalogue,
                          User,
                          videoType,
                          videoCost,
                          Shares,
                          productLink,
                          watchLimit,
                          cost,
                          createdAt,
                          views
                        },
                        hasPaid
                      },
                      index
                    ) => (
                      <div key={index} className="my-2 px-5">
                        <NewsfeedCard
                          id={postId}
                          videoId={id}
                          UserId={UserId}
                          index={index}
                          catalogue={catalogue}
                          url={url}
                          User={User}
                          views={views}
                          createdAt={createdAt}
                          videoType={videoType}
                          videoCost={videoCost}
                          Shares={Shares}
                          isLiked={isLiked}
                          likeCount={likeCount}
                          commentCount={commentCount}
                          shareCount={shareCount}
                          description={description}
                          title={title}
                          isPost={true}
                          width={'max-w-xs'}
                          productLink={productLink}
                          avgRating={avgRating}
                          watchLimit={watchLimit}
                          thumbnail={thumbnail}
                          restrictPaidVideo={!hasPaid}
                          ToggleTipModal={() => ToggleTipModal(User?.tip, UserId, id)}
                          _OpenShareModal={_OpenShareModal}
                          _HandleCommentCounts={_HandleCommentCounts}
                          _HandleGotoVideoDetails={_HandleGotoVideoDetails}
                          TogglePaymentModal={() => _TogglePaymentModal(cost, UserId, id)}
                          HandleLikePost={() => HandleLikePost(postId, isLiked)}
                          ToggleRatingModal={() => OpenRatingModal({ postId, avgRating, totalRaters })}
                          _handleViewsOnVideo={postViewOnVideo}
                        />
                      </div>
                    )
                  )}
                </Carousel>
              </div>
            )}
          </div>
        </>
      ) : !fetchingCatalogues && !isFollowing ? (
        <p className="text-gray-500 mt-5 text-center"> You are not following this user. Follow to see the content</p>
      ) : null}

      {/* section ends here */}
      {/* section starts here */}

      {accountType === 'Business' && (
        <div className="flex flex-col w-full px-2  mt-8">
          <h1 className="text-md font-medium">Customer Testimonials</h1>
          <div className="flex w-full mt-6 justify-center lg:justify-start">
            {loadingTestimonial ? (
              <div className="flex w-full justify-center">
                <span className="flex flex-col items-center">
                  <Spinner />
                  <p className="text-sm text-gray-400"> Loading Testimonials</p>
                </span>
              </div>
            ) : isEmpty(testimonials) ? (
              <div className="flex w-full justify-center items-center">
                <p className="text-gray-500"> No Testimonials Yet</p>
              </div>
            ) : (
              <div className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                {testimonials.map(
                  ({ picture, description, designation, ownerName, isVisible }) =>
                    isVisible && (
                      <TestimonialCard
                        image={picture}
                        name={ownerName}
                        designation={designation}
                        description={description}
                        otherUser={true}
                      />
                    )
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <AnimatePresence>
        {showBusinessCard && (
          <PopupBusinessCard
            _ShowCard={handleShowBusinessCard}
            name={name}
            image={picture}
            website={website || ''}
            email={email}
            phone={phone}
          />
        )}
        ,
        {showRatingModal && (
          <VideoRatingModal
            loading={false}
            videoRating={postRating}
            modalTitle={'Rate Video'}
            _SubmitRating={_SubmitRating}
            ToggleRatingModal={ToggleRatingModal}
            _HandleChangeRating={_HandleChangeRating}
          />
        )}
        {showTipModal && (
          <TipModal
            _HandleChangeTip={_HandleChangeTip}
            tip={tip}
            ToggleTipModal={ToggleTipModal}
            modalTitle={'Tip Video'}
            loading={isPaying}
            handleTipSubmit={handleTipSubmit}
            showCelebration={showCelebration}
            tipError={tipError}
          />
        )}
        {/* handleTipSubmit={handleTipSubmit} */}
        {showShareModal && (
          <ShareModal
            modalTitle={'Share Post'}
            ToggleShareModal={_CloseShareModal}
            setShareCaption={setShareCaption}
            shareCaption={shareCaption}
            _HandleSubmit={_HandleSharePost}
            loading={isSharing}
            shareData={shareData}
          />
        )}
        {showAmountModal && (
          <PaymentModal
            ToggleAmountModal={_TogglePaymentModal}
            loading={isPaying}
            amount={videoPayment}
            paymentSubmit={paymentSubmit}
            paymentError={paymentError}
          />
        )}
      </AnimatePresence>
      {/* section ends here */}
    </div>
  );
};;

export const getServerSideProps = async (context) => {
  const {
    query: { username }
  } = context;
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
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/profile/${username}`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    const { data } = res.data;
    return {
      props: {
        profile: data
      }
    };
  }
};

export default UserProfile;
