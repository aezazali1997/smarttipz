/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { createPopper } from '@popperjs/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'src/components';
import { useOutsideClick } from 'src/hooks';
import { DropdownRoutes, Routes } from 'routes';
import { useSearchContext } from 'src/contexts';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from 'src/APIs/axiosInstance';
import moment from 'moment';
import { generateMsg } from 'utils/notificationGen';

const NotificationDropDown = () => {
  const [notificDropdown, setNotificDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  // const [userId, setUserId] = useState(l);

  const fetchNotifications = async () => {
    try {
      const {
        data: { data }
      } = await axiosInstance.getNotifications();
      let totalNotification = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].isRead === false) {
          totalNotification += 1;
        }
      }
      setNotificationCount(totalNotification);

      setNotifications(data);
    } catch (error) {
      console.log('ERROR:', error.message);
    }
  };
  const readAll = async () => {
    console.log('read all');
    await axiosInstance.readAllNotification();
    setNotificationCount(0);
  };
  const readSpecific = async (actor, postId, entityId) => {
    let payload = {
      actor,
      postId,
      entityId
    };
    await axiosInstance.readSpecific(payload);
  };
  useState(() => {
    fetchNotifications();
    // setInterval(() => {
    // }, 3000);
  }, []);
  return (
    <>
      <div
        className="flex relative text-center justify-center items-center cursor-pointer navbar-item px-2 rounded-md"
        onClick={() => {
          setNotificDropdown(!notificDropdown);
        }}>
        <span>
          <FontAwesomeIcon icon={faBell} />{' '}
        </span>
        <sup className={`${notificationCount > 0 ? 'notification-styles' : ''}`}>
          {notificationCount > 0 ? notificationCount : null}
        </sup>{' '}
        &nbsp;
        <div>
          <span className="font-sans font-medium">Notifications</span>
        </div>
      </div>
      {notificDropdown === true && (
        <div className="bg-white absolute top-14 right-16 text-indigo-700 px-2 py-2 rounded-md border">
          {Array.isArray(notifications) &&
            notifications.length > 0 &&
            notifications.map(({ isRead, time, userDetails, postId, entityId }, index) => {
              return (
                <Link href={`http://localhost:3000/dashboard/news-feed/post/${postId}`} passHref key={index}>
                  <a
                    onClick={() => {
                      readSpecific(userDetails.id, postId, entityId);
                      setNotificDropdown(false);
                    }}>
                    <div className="flex w-full items-center bg-white hover:bg-gray-300 py-2 px-2 rounded-md cursor-pointer">
                      <img
                        className="w-10 h-10 mx-2 rounded-3xl"
                        src={
                          userDetails.picture !== null
                            ? userDetails.picture
                            : 'https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg'
                        }
                      />
                      <div className="mx-2">
                        <p className="text-black">
                          {userDetails.name} <b>{generateMsg(entityId)}</b> your post
                        </p>
                        <span className={`${!isRead ? 'text-blue-800' : 'text-black'}`}> {moment(time).fromNow()}</span>
                      </div>
                      {!isRead ? <span className="w-2 h-2 mx-2 -mt-7 bg-blue-800 rounded-2xl"></span> : null}
                    </div>
                  </a>
                </Link>
              );
            })}
        </div>
      )}
    </>
  );
};

export default NotificationDropDown;
