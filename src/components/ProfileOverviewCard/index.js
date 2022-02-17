/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Button,CustomStar } from 'src/components';
import axiosInstance from 'src/APIs/axiosInstance';
import { useRouter } from 'next/router';
import { useSearchContext } from 'src/contexts';


const ProfileOverviewCard = ({
  id,
  username,
  name,
  picture,
  accessible,
  Follower,
  _HandleGotoUserProfile,
  profileRating
}) => {
  const router = useRouter();
  const { setOtherUserDetail } = useSearchContext();
  const [isFollowing, setIsFollowing] = useState(false);
  const [canMessage, setCanMessage] = useState(false);

  const _CheckFollowed = () => {
    let Followed = Follower.filter(
      (user) => user?.id === parseInt(localStorage.getItem('id')) && user
    );
    if (!isEmpty(Followed)) {
      setIsFollowing(true);
      setCanMessage(true);
    }
  };

  useEffect(() => {
    _CheckFollowed();
  }, []);

  const _FollowUnfollow = () => {
    axiosInstance
      .followUser({ username })
      .then(
        ({
          data: {
            data: { follow }
          }
        }) => {
          setIsFollowing(follow);
          setCanMessage((canMessage) => (canMessage = follow));
        }
      )
      .catch((err) => {
        console.log('FollowUser API Failed: ', err);
      });
  };

  const gotoMessaging = () => {
    if (accessible === false) {
      swal({
        buttons: false,
        text: 'This user has turned off messages'
      });
    } else {
      const details = {
        id,
        name,
        username,
        picture
      };
      localStorage.setItem('profile', JSON.stringify(details));
      setOtherUserDetail(details);
      router.push(`/dashboard/profile/messages/${id}`);
    }
  };

  return (
    <div
      className={`mx-auto max-w-lg shadow flex flex-col justify-center rounded-lg overflow-hidden
                bg-white space-y-2`}>
       <div className='flex flex-row justify-between'>         
      <div className="flex w-full py-2 px-2 justify-between space-x-2">
        <img src={picture} className="rounded-full w-10 h-10 object-cover" alt="avatar"></img>
        <div className="flex flex-col w-full">
          <p
            onClick={_HandleGotoUserProfile}
            className="text-sm font-bold font-sans hover:underline cursor-pointer">
            {name}
          </p>
          <p className="text-xs text-gray-500">
            {Follower?.length} {Follower?.length > 1 ? 'Followers' : 'Follower'}
          </p>
        </div>
      </div>
      <div className='mr-2 mt-2'>
      	<span className="flex w-full items-center ">
                      <CustomStar value={profileRating || 0} isHalf={true} /> 
								</span>
      </div>
      </div>
      <div className="p-2 flex space-x-2">
        <Button
          onClick={_FollowUnfollow}
          type="button"
          childrens={isFollowing ? 'Unfollow' : 'Follow'}
          classNames={
            'px-3 py-2 flex w-full  justify-center items-center text-white w-28 text-sm btn rounded-md '
          }
        />
        {canMessage && (
          <Button
            type="button"
            onClick={() => gotoMessaging(id, accessible)}
            childrens={'Message'}
            classNames={
              'px-3 py-2 flex w-full  justify-center items-center text-white w-28 text-sm btn rounded-md '
            }
          />
        )}
      </div>
    </div>
  );
};

export default ProfileOverviewCard;
