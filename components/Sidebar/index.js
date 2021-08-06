/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useState } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import logo from '../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faUserCircle, faCog, faPlayCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';

const Sidebar = () => {

    const router = useRouter();
    const { asPath } = router;

    useEffect(() => {

    }, [])

    let _Logout = () => {
        localStorage.clear();
        router.push('/login');
    }

    return (
        <div className="sidebar">

            <nav
                className='flex flex-col w-full h-full pt-10 px-5 text-white justify-between relative navbar'
                role='navigation'
            >
                <div className="py-5 flex h-20 items-center flex-col ">
                    <Link href='/login'>
                        <Image src={logo} alt="brand" />
                    </Link>
                </div>
                {/* <div className='px-4 lg:hidden'>
                    <Hamburger toggled={isOpen} onToggle={toggle} color='#dc2626' direction="right" duration={0.5} rounded />
                </div> */}

                <div className=' lg:flex h-80 flex-col hidden space-y-2 overflow-y-auto'>
                    {/* {
                        login ? */}
                    <>
                        <Link href='/news-feed' className='p-4  font-sans nav-link nav-link-ltr'>
                            <div className={`flex flex-row items-center py-2 px-3 rounded-lg w-44 font-medium hover:text-indigo-600 hover:bg-white cursor-pointer
                        ${asPath === "/news-feed" ? 'bg-white text-indigo-600' : 'text-white'}`}>

                                <FontAwesomeIcon icon={faNewspaper} /> &nbsp;News Feed
                            </div>
                        </Link>
                        <Link href='/profile' className='p-4 font-sans nav-link nav-link-ltr'>
                            <div className={`py-2 px-3 rounded-lg w-44 font-medium hover:text-indigo-600 hover:bg-white cursor-pointer
                              ${asPath === "/profile" ? 'bg-white text-indigo-600' : 'text-white'}`}>
                                <FontAwesomeIcon icon={faUserCircle} />&nbsp;Profile
                            </div>
                        </Link>
                        <Link href='/setting' className='p-4 font-sans nav-link nav-link-ltr' >
                            <div className={`py-2 px-3 rounded-lg w-44 font-medium hover:text-indigo-600 hover:bg-white cursor-pointer
                            ${asPath === "/setting" ? 'bg-white text-indigo-600' : 'text-white'}`}>
                                <FontAwesomeIcon icon={faCog} />&nbsp;Setting
                            </div>
                        </Link>
                        <Link href='/videos' className='p-4 font-sans nav-link nav-link-ltr' >
                            <div className={`flex- flex-row py-2 px-3 rounded-lg w-44 font-medium hover:text-indigo-600 hover:bg-white cursor-pointer
                            ${asPath === "/videos" ? 'bg-white text-indigo-600' : 'text-white'}`}>

                                <FontAwesomeIcon icon={faPlayCircle} /> &nbsp;Videos
                            </div>
                        </Link>
                    </>
                </div>
                <div className="flex h-20 items-center">
                    <button onClick={() => _Logout()}
                        className={`flex flex-row py-2 px-3 rounded-lg w-44 font-medium text-white hover:bg-white hover:text-indigo-600 `} >
                        <div >

                            <FontAwesomeIcon icon={faSignOutAlt} /> &nbsp;Logout
                        </div>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;
