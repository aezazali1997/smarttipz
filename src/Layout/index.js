import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { Sidebar, Drawer } from 'src/components'
import { useOutsideClick } from 'src/hooks';
import Swal from 'sweetalert2';
const CustomLayout = ({ children }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setShowDropdown] = useState(false);

  const DropdownRef = useRef();

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 991 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', hideMenu);

    return () => {
      window.removeEventListener('resize', hideMenu);
    };
  });

  useOutsideClick(DropdownRef, () => {
    setShowDropdown(false);
  });

  const toggleDropdown = () => {
    setShowDropdown(!dropdown);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  // useEffect(() => {
  //   setInterval(() => {
  //     console.log('set ime out for 3 seconds');
  //   }, 3000);
  // }, []);

  const _Logout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        cookie.remove('name');
        cookie.remove('token');
        cookie.remove('username');
        localStorage.clear();
        router.push('/auth/login');
      },
      cancelButtonText: 'Cancel',
      buttonsStyling: false,
      customClass: {
        confirmButton:
          'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
        cancelButton:
          'mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text-red-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
      }
    });
  };

  return (
    <div className={`w-full h-full`}>
      <Sidebar logout={_Logout} dropdown={dropdown} dropdownRef={DropdownRef} toggleDropdown={toggleDropdown} />
      <Drawer
        isOpen={isOpen}
        toggle={toggle}
        logout={_Logout}
        dropdown={dropdown}
        dropdownRef={DropdownRef}
        toggleDropdown={toggleDropdown}
      />
      <main className="overflow-x-auto">
        {localStorage.getItem('isApproved') &&
          localStorage.getItem('accountType') &&
          localStorage.getItem('isApproved') === 'false' &&
          localStorage.getItem('accountType') === 'Business' && (
            <p className="w-full flex justify-center text-center items-center bg-red-100 border border-red-400 text-red-700 p-2">
              <svg className="w-6 h-6 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              &nbsp; Your account is not verified yet!
            </p>
          )}
        {children}
      </main>
    </div>
  );
}


export default CustomLayout;
