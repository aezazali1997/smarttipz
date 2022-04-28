/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Badge, GlobalSearchbar, SmartTipzLogo } from 'src/components';
import { useOutsideClick } from 'src/hooks';
import { NavbarRoutes } from 'routes';
import { NavDropdown } from '../Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotificationDropDown from '../Dropdown/notificationDropdown';

const Sidebar = ({ logout }) => {
  const router = useRouter();

  const { asPath } = router;
  const [dropdown, setShowDropdown] = useState(false);

  const DropdownRef = useRef();

  let Active = (path) => {
    return asPath === path ? 'bg-white text' : 'navbar-item';
  };

  let ActiveDropdown = (path) => {
    return asPath === path ? 'text-white background' : 'sidebar-dropdown-item';
  };
  useOutsideClick(DropdownRef, () => {
    setShowDropdown(false);
  });

  const toggleDropdown = () => {
    setShowDropdown(!dropdown);
  };
  const togggleNotificationDropDown = () => {
    setShowDropdown(false);
  };

  return (
    <div className="sidebar z-50">
      <nav className="flex w-full h-14 py-2 px-2 text-white justify-between navbar" role="navigation">
        <div className="flex space-x-20 w-1/2">
          <Link href={'/dashboard/news-feed/'} passHref={true}>
            <SmartTipzLogo />
          </Link>
          <span className="w-full">
            <GlobalSearchbar />
          </span>
        </div>
        {/* drop down issue */}
        <div className="flex space-x-3">
          <div className="flex space-x-1">
            {NavbarRoutes &&
              NavbarRoutes.map(({ path, name, icon, badge }, index) => (
                <Link href={path} passHref key={index} className="p-4 font-sans nav-link nav-link-ltr">
                  <a>
                    <div
                      className={`flex items-center justify-between py-2 px-3 rounded-lg  font-medium  cursor-pointer
                                            ${Active(path)}`}>
                      <div>
                        {icon}
                        &nbsp;
                        {name}
                      </div>
                      {badge && <Badge />}
                    </div>
                  </a>
                </Link>
              ))}

            <NotificationDropDown />
          </div>

          <NavDropdown
            ActiveDropdown={ActiveDropdown}
            toggleDropdown={toggleDropdown}
            setShowDropdown={setShowDropdown}
            DropdownRef={DropdownRef}
            Active={Active}
            dropdown={dropdown}
            logout={logout}
          />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
