/* eslint-disable @next/next/no-img-element */
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import { VideoPlayer } from '..';

const ContentSection = ({
  stopVideo,
  SharedPost,
  shareCount,
  _HandlePaidVideos,
  _HandleGotoUserProfile,
  _HandleGotoVideoDetails,
  TogglePaymentModal,
  restrict,
  createdAt,
  _handleViewsOnVideo,
	isViewed,
	setIsViewed,
  videoId
}) => {
  const { thumbnail = '', url = '', title = '', User = {}, UserId = '', id = '', videoCost = '' } = SharedPost;

  return (
    <div
      className={`mx-auto max-w-lg pt-2 pb-4 border flex flex-col justify-center rounded-lg overflow-hidden
                bg-white space-y-2`}>
      <div className="flex w-full px-2 space-x-2">
        <img
          src={User?.picture || 'https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png'}
          className="rounded-full w-10 h-10 object-cover"
          alt="avatar"></img>
        <div className="flex flex-col w-full">
          <p
            onClick={() => _HandleGotoUserProfile(UserId, User?.username)}
            className="text-sm font-bold font-sans hover:underline cursor-pointer">
            {User?.name}
          </p>
          <p className="text-sm text-gray-500">
            {moment(createdAt).format('D MMM YYYY')} , {moment(createdAt).format('H:mm')}
          </p>
        </div>
      </div>
      <p
        onClick={() => _HandleGotoVideoDetails(id)}
        className="px-5 text-sm max-w-md hover:underline whitespace-nowrap overflow-ellipsis overflow-hidden cursor-pointer">
        {title}
      </p>
      {videoCost === 'Paid' && restrict === true ? (
        !stopVideo ? (
          <div className="video-wrapper" onClick={_HandlePaidVideos}>
            <VideoPlayer poster={thumbnail} src={url} />
          </div>
        ) : (
          <div className="video-wrapper flex flex-col justify-center items-center">
            <p className="text-md text-gray-500 text-center">To continue watching video</p>
            <button
              onClick={TogglePaymentModal}
              type="button"
              className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              PAY NOW
            </button>
          </div>
        )
      ) : (
        <div
          className="video-wrapper"
          onClick={() => {
            !isViewed && localStorage.getItem('id') != UserId && _handleViewsOnVideo(videoId);
            setIsViewed(true);
          }}>
          <VideoPlayer poster={thumbnail} src={url} />
        </div>
      )}
      <div className="flex justify-end w-full px-5">
        <div className="flex flex-row space-x-2 items-center">
          <span className="flex space-x-2 items-center">
            <FontAwesomeIcon icon={faShareAlt} className="w-6 h-6 text" />
            <p className="">Share{shareCount > 1 ? 's' : null}:</p>
          </span>
          <p className=" cursor-pointer  w-full text-center text-gray-600 group-hover:text-purple-600">
            {shareCount || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
