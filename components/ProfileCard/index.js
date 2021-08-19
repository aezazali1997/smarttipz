/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Rating from '../RatingStar';
import Image from 'next/image';
import PopupBusinessCard from '../PopupBusinessCard';

const ProfileCard = ({ data, otherUser, handleShowBusinessCard, showBusinessCard }) => {

    const { name, about, accessible, followed, following, rating, website, email, views, picture, phone, showMessages, accountType } = data;

    return (
        <div className="flex flex-col w-full relative items-center space-y-3">
            {picture ?
                <div class="inline-block h-28 w-28 ring-2 ring-white relative">
                    <img src={picture} className="rounded-full" alt="" layout="fill" />
                </div>
                :
                <div class="inline-block h-28 w-28 ring-2 ring-white relative">
                    <img className="rounded-full" src="https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg" alt="" />
                </div>
            }
            <div className="flex flex-col w-full jusify-center items-center">
                <h1 className="text-black text-lg font-sans font-semibold">{name}</h1>
                <h1 className=" text-sm font-sans text-gray-400">{phone}</h1>
            </div>
            <p className="text-xs text-black text-center">{about || 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat pidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</p>
            {accountType === "Business" && (
                <div className="flex w-full mt-2 px-2 justify-center " onClick={handleShowBusinessCard}>
                    <p className="text-xs no-underline hover:underline text-indigo-600 cursor-pointer">
                        Click to See Virtual Business Card
                    </p>
                </div>
            )}
            <div className="flex w-full justify-between items-center">
                <div className="flex justify-between w-full">
                    <span className="flex w-full justify-center items-center">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                        &nbsp;<p className="text-sm">{views} Views</p></span>
                    <span className="flex w-full items-center justify-center">
                        <Rating
                            value={rating}
                        />
                        {/* &nbsp; <p className="text-xs" > Rating</p> */}
                    </span>
                </div>
            </div>
            <div className="flex w-full bg-gray-200 border">
                <div className="flex flex-col justify-center border-r border-gray-500 w-full">
                    <h1 className="text-md lg:text-3xl font-semibold text-center">{followed?.length || '1.3K'}</h1>
                    <h2 className="text-sm text-center text-black">Followers</h2>
                </div>
                <div className="flex flex-col w-full">
                    <h1 className=" text-md lg:text-3xl font-semibold text-center">{following?.length || '1.8K'}</h1>
                    <h2 className="text-sm text-center text-black">Following</h2>
                </div>
            </div>
            {
                otherUser && (
                    <div className="flex w-full justify-center space-x-2">
                        <button className="followingBtn">
                            Following
                        </button>
                        <button className="messageBtn">
                            Message
                        </button>
                    </div>
                )}
            {
                showBusinessCard && (
                    <PopupBusinessCard
                        _ShowCard={handleShowBusinessCard}
                        name={name}
                        image={picture}
                        website={website}
                        email={email}
                        phone={phone}

                    />
                )}
        </div>
    )
}

export default ProfileCard;
