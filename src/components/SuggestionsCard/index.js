/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import { Rating, VideoPlayer } from '..';
import { PostActionDropdown } from '../Dropdown';
import ReactTooltip from 'react-tooltip';
import ReactStars from 'react-rating-stars-component';
import moment from 'moment';
import { EmptyStar, FilledStar, HalfStar } from 'src/assets/SVGs';
import { PaymentModal } from 'src/components/Modals';
import Swal from 'sweetalert2';
import axiosInstance from 'src/APIs/axiosInstance';
const SuggestionCard = ({
  index,
  id,
  videoId,
  catalogue,
  UserId,
  isPost,
  name,
  videoType,
  videoCost,
  cost,
  thumbnail,
  url,
  title,
  rating,
  views,
  width,
  User,
  createdAt,
  productLink,
  _HandleCatalogue,
  _HandleDeleteVideo,
  _HandleGotoUserProfile,
  _HandleGotoVideoDetails,
  _handleViewsOnVideo,
  isViewed,
  setIsViewed,
  watchLimit,
  userBalance,
  setUserBalance,
  posts,
  setPosts,
  restrictPaidVideo
}) => {
  //    const EmptyStar = () => (
  //   <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  //     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  //   </svg>
  // );
  // const FilledStar = () => (
  //   <svg className="w-4 h-4 text" fill="#f8b93b" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  //     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  //   </svg>
  // );
  // const HalfStar = () => (
  //   <ReactStars
  //     count={1}
  //     value={0.5}
  //     size={18}
  //     edit={false}
  //     isHalf={true}
  //     halfIcon={<i className="fa fa-star-half-alt"></i>}
  //     activeColor="#f8b93b"
  //   />
  // );

  const [stopVideo, setStopVideo] = useState(false);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [videoPayment, setVideoPayment] = useState(0);
  const [paymentVideoId, setPaymentVideoId] = useState(null);
  const [amountReciever, setAmountReciever] = useState(null);

  const postViewOnVideo = async (VideoId) => {
    try {
      await axiosInstance.viewPost({ VideoId: VideoId });
    } catch (error) {
      console.log('ERROR:', error);
    }
  };
  const displayRatingStars = () => {
    let avgRating = rating;

    if (avgRating !== undefined || rating !== undefined) {
      if (avgRating === 0) {
        avgRating = parseFloat(avgRating).toFixed(2);
      }
      if (avgRating === undefined) {
        avgRating = rating;
      }
      const hasDecimal = String(avgRating).split('.');
      const firstSplittedValue = parseInt(hasDecimal[0]);
      const secondSplittedValue = hasDecimal[1];
      const emptyStars =
        parseInt(secondSplittedValue) > 0 ? 5 - (firstSplittedValue + 1) : 5 - (firstSplittedValue + 0);
      if (!_.isEmpty(secondSplittedValue)) emptyStars - 1;
      return (
        <>
          {[...Array(firstSplittedValue)].map((val, index) => (
            <FilledStar key={index} />
          ))}
          {!_.isEmpty(secondSplittedValue) && parseInt(secondSplittedValue) > 0 && <HalfStar />}
          {[...Array(emptyStars)].map((val, index) => (
            <EmptyStar key={index} />
          ))}
        </>
      );
    }
  };
  const _HandlePaidVideos = async () => {
    !isViewed && localStorage.getItem('id') != UserId && postViewOnVideo(videoId);
    setIsViewed(true);
    setTimeout(() => {
      setStopVideo(true);
      _TogglePaymentModal();
    }, watchLimit);
  };
  let _TogglePaymentModal = () => {
    setVideoPayment(cost);
    setPaymentVideoId(videoId);
    setAmountReciever(UserId);
    setShowAmountModal(!showAmountModal);
  };
  const paymentSubmit = async () => {
    if (videoPayment > userBalance) {
      // adding userBalance functionality
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
      console.log(data);
      let {
        data: { balance }
      } = await axiosInstance.postPaid(data);
      setUserBalance(balance);

      setAmountReciever(null);

      let tempPosts = [...posts];
      for (let i = 0; i < posts.length; i++) {
        if (tempPosts[i].VideoId === paymentVideoId) {
          tempPosts[i].hasPaid = true;
        }
      }
      setPosts(tempPosts);

      //   // uncomment this
      //   // setPaymentVideoId(null);

      //   // GetPosts(0);
      Swal.fire({
        text: 'You can now View the Video',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        showCancelButton: false
      });
    } catch (error) {
      console.log('Error! ', error.message);
      Swal.fire({
        text: error.message,
        icon: 'error',

        showConfirmButton: false,
        showCancelButton: false
      });
    }
    setIsPaying(false);
    _TogglePaymentModal();
  };
  return (
    <>
      <div
        className={`${width} shadow flex flex-col justify-center rounded-lg overflow-hidden
                bg-white space-y-1`}>
        <div className="flex w-full py-1 px-2 justify-between space-x-2">
          <div className="flex space-x-2">
            <img
              src={User?.picture || 'https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png'}
              className="rounded-full w-10 h-10 object-cover"
              alt="avatar"></img>
            <div className="flex flex-col w-full">
              <p
                onClick={() => _HandleGotoUserProfile(UserId, User?.username)}
                className="text-sm w-28 font-bold font-sans hover:underline whitespace-nowrap overflow-ellipsis overflow-hidden cursor-pointer">
                {User?.name}
              </p>
              <p className="text-sm text-gray-500">
                {moment(createdAt).format('D MMM YYYY')}, {moment(createdAt).format('H:mm')}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <span data-for="fav" data-tip onClick={() => HandleFavouritePost(id)}>
              {/* <svg
									xmlns="http://www.w3.org/2000/svg">
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-500 hover:text-purple-600 cursor-pointer"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <ReactTooltip id="fav" place="top" effect="solid" border={false} borderColor="white" clickable={false}>
                Add to favourite
              </ReactTooltip>
            </span>
            <div className="flex items-start justify-start">
              <PostActionDropdown
                _HandleCatalogue={_HandleCatalogue}
                _HandleDeleteVideo={() => _HandleDeleteVideo(index, id)}
                catalogue={catalogue}
                ownerId={UserId}
                isPost={isPost}
              />
            </div>
          </div>
        </div>
        <p
          onClick={() => _HandleGotoVideoDetails(id)}
          className="px-5 text-sm max-w-sm hover:underline  cursor-pointer">
          {title}
        </p>

        {localStorage.getItem('id') != UserId && videoCost === 'Paid' && restrictPaidVideo ? (
          !stopVideo ? (
            <div className="suggestion-video-wrapper" onClick={_HandlePaidVideos}>
              <VideoPlayer poster={thumbnail} src={url} />
            </div>
          ) : (
            <div className="suggestion-video-wrapper flex flex-col justify-center items-center">
              <p className="text-lg text-gray-500 text-center">To continue watching video</p>
              <button
                onClick={_TogglePaymentModal}
                type="button"
                className="mt-3 text-lg w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                PAY NOW
              </button>
            </div>
          )
        ) : (
          <div
            className="suggestion-video-wrapper"
            onClick={() => {
              !isViewed && localStorage.getItem('id') != UserId && _handleViewsOnVideo(videoId);
              setIsViewed(true);
            }}>
            <VideoPlayer poster={thumbnail} src={url} />
          </div>
        )}
        {/* <img src="https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"
                className="w-full h-auto" alt="avatar"></img> */}
        <div className="flex justify-between w-full px-3 pb-1">
          <span className="flex items-center z-0">{displayRatingStars()}</span>
          <span className="flex  items-center">
            <svg className="w-4 h-4 text" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            &nbsp;<p className="text-xs">{views} Views</p>
          </span>
        </div>
        <div className="px-3 flex space-x-2 pb-2">
          <div className="flex px-2 h-6 rounded-lg  background items-center justify-center">
            <p className="text-white font-sm ">{videoType}</p>
          </div>
          {videoCost ? (
            <div className="flex px-2 h-6 max-w-sm background items-center justify-center rounded-lg">
              <p className="text-white font-sm">{videoCost}</p>
            </div>
          ) : (
            productLink && (
              <Link href={productLink} passHref>
                <a target="_blank">
                  <span className="text font-sm hover:underline cursor-pointer">Product Link</span>
                </a>
              </Link>
            )
          )}
        </div>
      </div>
      {showAmountModal && (
        <PaymentModal
          ToggleAmountModal={_TogglePaymentModal}
          loading={isPaying}
          amount={videoPayment}
          paymentSubmit={paymentSubmit}
          paymentError={paymentError}
        />
      )}
    </>
  );
};

export default SuggestionCard;

