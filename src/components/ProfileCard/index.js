/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Rating from '../RatingStar';
import Image from 'next/image';
import PopupBusinessCard from '../PopupBusinessCard';
import Spinner from '../Spinner';
import CustomStar from '../CustomStar';
const ProfileCard = ({
  data,
  otherUser,
  handleShowBusinessCard,
  showBusinessCard,
  followed,
  followers,
  website,
  _Follow,
  gotoMessaging,
  isFollowing,
  canMessage,
  _rating,
  _fetching
}) => {
  const {
    id,
    name,
    about,
    rating,
    email,
    views,
    picture,
    phone,
    accountType,
    username,
    showPhone,
    showName,
    showUsername,
    accessible
  } = data;

  return (
    <div className="flex flex-col w-full relative items-center space-y-3">
      {picture ? (
        /* <div class="inline-block h-32 w-28 ring-2 ring-white relative"> */
        <img src={picture} className="rounded-full w-28 h-28 object-cover" alt="" />
      ) : (
        /* </div> */
        <div class="inline-block h-28 w-28 ring-2 ring-white relative">
          <img
            className="rounded-full"
            src="https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg"
            alt=""
          />
        </div>
      )}
      <div className="flex flex-col w-full jusify-center items-center">
        <h1 className="text-black text-lg font-sans font-semibold">
          {accountType === 'Personal' ? (showName ? name : showUsername ? username : '') : name}
        </h1>
        <h1 className=" text-sm font-sans text-gray-400">{otherUser ? (showPhone ? phone : '') : phone}</h1>
      </div>
      {about ? (
        <p className="text-sm text-black text-center max-w-xs">{about}</p>
      ) : (
        <p className="text-sm text-gray-400 text-center"> {accountType === 'Business' ? 'Intro' : 'About'}</p>
      )}
      {accountType === 'Business' && (
        <div className="flex w-full mt-2 px-2 justify-center " onClick={handleShowBusinessCard}>
          <p className="text-xs no-underline hover:underline text-indigo-600 cursor-pointer">Contact details</p>
        </div>
      )}
      <div className="flex w-full justify-between items-center">
        <div className="flex justify-between w-full">
          <span className="flex w-full justify-center items-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            &nbsp;<p className="text-sm">{views} Views</p>
          </span>
          <span className="flex w-full items-center justify-center">
          {
              console.log(_rating)
          }
           {!_fetching ? ( <>
                      <CustomStar value={_rating} isHalf={true} />
                    </>
                  ) : (
                    <Spinner />
                  )
            }
            {/* &nbsp; <p className="text-xs" > Rating</p> */}
          </span>
        </div>
      </div>
      {otherUser ? (
        <>
          <div className="flex w-full justify-between">
            <div className="flex flex-col justify-center w-full">
              <h1 className="text-md lg:text-3xl font-semibold text-center">{followers?.length}</h1>
              <h2 className="text-sm text-center text-black">Followers</h2>
            </div>
            <div className="flex flex-col w-full">
              <h1 className=" text-md lg:text-3xl font-semibold text-center">{followed?.length}</h1>
              <h2 className="text-sm text-center text-black">Following</h2>
            </div>
          </div>
          <div className="flex w-full justify-between space-x-2">
            <button onClick={_Follow} className={`${isFollowing ? 'followingBtn' : 'followBtn'}  w-full`}>
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            {canMessage && (
              <button onClick={() => gotoMessaging(id, accessible)} className="followBtn w-full">
                Message
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="flex w-full bg-gray-200 border">
          <div className="flex flex-col justify-center border-r border-gray-500 w-full">
            <h1 className="text-md lg:text-3xl font-semibold text-center">{followers?.length}</h1>
            <h2 className="text-sm text-center text-black">Followers</h2>
          </div>
          <div className="flex flex-col w-full">
            <h1 className=" text-md lg:text-3xl font-semibold text-center">{followed?.length}</h1>
            <h2 className="text-sm text-center text-black">Following</h2>
          </div>
        </div>
      )}

      {showBusinessCard && (
        <div className="md:hidden flex">
          <PopupBusinessCard
            _ShowCard={handleShowBusinessCard}
            name={name}
            image={picture}
            website={website}
            email={email}
            phone={phone}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
