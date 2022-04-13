/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { createPopper } from '@popperjs/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'src/components';
import { useOutsideClick } from 'src/hooks';
import { DropdownRoutes, Routes } from 'routes';
import { useSearchContext } from 'src/contexts';

const PostActionDropdown = ({ toggleDropdown, DropdownRef, logout, dropdown, setShowDropdown }) => {
	// dropdown props
	const router = useRouter();
	const { asPath } = router;
	const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
	// const [ID, setID] = React.useState(null);
	const btnDropdownRef = React.createRef();
	const popoverDropdownRef = React.createRef();
	const { profilePic } = useSearchContext();

	const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-end',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8]
          }
        }
      ]
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  useOutsideClick(popoverDropdownRef, () => {
    console.log('this closes the active menu');
    setDropdownPopoverShow(false);
  });

  let Active = (path) => {
    return asPath === path ? 'background text-white' : 'sidebar-dropdown-item';
  };

  let ActiveDropdown = (path) => {
    return asPath === path ? 'text-white background' : 'sidebar-dropdown-item';
  };

  const _CloseDropdowns = () => {
    console.log('close drop downs');
    setShowDropdown(false);
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          // dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
          openDropdownPopover();
        }}>
        <div className="items-center flex">
          <img
            className="inline object-cover w-10 h-10 rounded-full"
            src={
              profilePic ||
              localStorage.getItem('image') ||
              'https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg'
            }
            alt="Profile image"
          />
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          dropdownPopoverShow
            ? `flex flex-col bg-white text-base z-10 float-left list-none 
					text-left rounded-lg shadow-lg min-w-48`
            : 'hidden'
        }>
        <div className="flex flex-col h-full sidebar-content space-y-1">
          {Routes &&
            Routes.map(({ path, name, icon, badge }, index) => (
              <div key={index}>
                <Link href={path} className="p-4 font-sans nav-link nav-link-ltr">
                  <a>
                    <div
                      onClick={() => _CloseDropdowns()}
                      className={`flex items-center justify-between py-2 px-3 w-52 rounded-lg  font-medium  cursor-pointer
                       						${Active(path)}`}>
                      <div>
                        {icon}&nbsp;{name}
                      </div>
                      {badge && <Badge />}
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          <div ref={DropdownRef} className="inline-block relative">
            <button
              onClick={toggleDropdown}
              className={`flex items-center justify-between w-52 py-2 px-3 rounded-lg  font-medium sidebar-item cursor-pointer
                           ${dropdown ? 'background text-white' : 'sidebar-dropdown-item'}`}>
              <div>
                <FontAwesomeIcon icon={faClipboardList} />
                &nbsp;Policies
              </div>
              {dropdown ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 pointer-events-none"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            {dropdown && (
              <div className=" flex flex-col space-y-2 bg-white p-2 w-52  rounded-lg ease-in-out">
                {DropdownRoutes &&
                  DropdownRoutes.map(({ path, name }, index) => (
                    <div key={index}>
                      <Link href={path} className="p-4 font-sans nav-link nav-link-ltr">
                        <a>
                          <div
                            onClick={() => _CloseDropdowns()}
                            className={`flex items-center justify-between py-2 px-3 rounded-lg w-48 font-medium sidebar-dropdown-item cursor-pointer
                              ${ActiveDropdown(path)}`}>
                            <div>{name}</div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => logout()}
            className={`flex flex-row py-2 px-3 rounded-lg font-medium text w-52 sidebar-dropdown-item `}>
            <div>
              <FontAwesomeIcon icon={faSignOutAlt} />
              &nbsp;Logout
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default PostActionDropdown;
