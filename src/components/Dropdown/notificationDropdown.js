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

const NotificationDropDown = () => {
  const [notificDropdown, setNotificDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  // const [userId, setUserId] = useState(l);

  const fetchNotifications = async () => {
    try {
      const rest = await axiosInstance.getNotifications();
    } catch (error) {
      console.log('ERROR:', error.message);
    }
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
        <sup>1</sup> &nbsp;
        <div>
          <span className="font-sans font-medium">Notifications</span>
        </div>
      </div>
      {notificDropdown === true && (
        <div className="bg-white absolute top-14 right-16 text-indigo-700 px-2 py-2 rounded-md">
          someone liked your video
        </div>
      )}
    </>
  );
};

export default NotificationDropDown;
