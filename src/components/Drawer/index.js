/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Sidebar from 'react-sidebar';
import Hamburger from 'hamburger-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faUserCircle, faCog, faPlayCircle, faSignOutAlt, faComment, faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { Badge } from 'src/components';
import { useOutsideClick } from 'src/hooks';
import { Routes, DropdownRoutes } from 'routes';
import GlobalSearchbar from '../GlobalSearchbar';

const Drawer = ({ isOpen, toggle, logout }) => {

    const router = useRouter();
    const { asPath } = router;
    const [dropdown, setShowDropdown] = useState(false);
    const DropdownRef = useRef();

    let Active = (path) => {
        return asPath === path ?
            'bg-white text' : 'sidebar-item'
    }

    useOutsideClick(DropdownRef, () => {
        setShowDropdown(false);
    })

    const toggleDropdown = () => {
        setShowDropdown(!dropdown);
    }


    let ActiveDropdown = (path) => {
        return asPath === path ? 'text-white background' : 'sidebar-dropdown-item';
    }

    let handleClose = () => {
        toggleDropdown();
        toggle();
    }

    return (
        <Sidebar
            sidebar={
                <nav
                    className='flex flex-col w-auto h-full py-5 px-5 text-white justify-between relative navbar'
                    role='navigation'
                >
                    <div className="py-7 flex items-center flex-col relative">
                        <Link href='/dashboard/news-feed'>
                            <a>
                            <Image src='https://smart-tipz-data-bucket.s3.ap-southeast-1.amazonaws.com/public/logo.svg'
                                alt="brand" layout="fill" objectFit="cover" />
                            </a>
                        </Link>
                    </div>
                    <div className='my-4 w-52'>
                        <GlobalSearchbar />
                    </div>
                    <div className=' lg:flex flex-col h-full pt-2 overflow-y-auto'>
                        <div className="mb-1 block lg:hidden">
                            <Link href="/dashboard/news-feed" className='p-4 font-sans nav-link nav-link-ltr'>
                                <a>
                                    <div onClick={toggle} className={`flex justify-between items-center py-2 px-3 rounded-lg w-52 font-medium sidebar-item cursor-pointer
                                                ${Active("/dashboard/news-feed")}`}>
                                        <div>
                                            <FontAwesomeIcon icon={faNewspaper} /> &nbsp;News Feed
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </div>
                        {
                            Routes && Routes.map(({ name, path, icon, badge }, index) => (
                                <div className="mb-1" key={index}>
                                    <Link href={path} className='p-4 font-sans nav-link nav-link-ltr'>
                                        <a>
                                            <div onClick={toggle} className={`flex justify-between items-center py-2 px-3 rounded-lg w-52 font-medium sidebar-item cursor-pointer
                                                ${Active(path)}`}>
                                                <div>
                                                    {icon} &nbsp;{name}
                                                </div>
                                                {badge && <Badge />}
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            ))
                        }
                        <div ref={DropdownRef} className="inline-block relative space-y-1">
                            <button onClick={toggleDropdown} className={`flex items-center justify-between py-2 px-3 rounded-lg w-52 font-medium sidebar-item cursor-pointer
                           ${dropdown ? 'bg-white text' : 'text-white'}`}>
                                <div>
                                    <FontAwesomeIcon icon={faClipboardList} />&nbsp;&nbsp;Policies
                                </div>
                                {
                                    dropdown ?
                                        <svg className="w-6 h-6 pointer-events-none" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        :
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                        </svg>
                                }
                            </button>
                            {
                                dropdown &&
                                <div className="flex flex-col absolute space-y-2 bg-white p-2 w-52 rounded-lg transition delay-100 duration-300 ease-in-out">
                                    {
                                        DropdownRoutes && DropdownRoutes.map(({ path, name }, index) => (
                                            <Link href={path} key={index} className='p-4 font-sans nav-link nav-link-ltr' >
                                                <a>
                                                    <div onClick={() => handleClose()} className={`flex items-center justify-between py-2 px-3 rounded-lg w-48 font-medium sidebar-dropdown-item cursor-pointer
                                                                ${ActiveDropdown(path)}`}>
                                                        <div>
                                                            {name}
                                                        </div>
                                                    </div>
                                                </a>
                                            </Link>
                                        ))
                                    }

                                </div>
                            }
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button onClick={() => logout()}
                            className={`flex flex-row py-2 px-3 rounded-lg w-52 font-medium text-white hover:bg-white hover:text-indigo-600 `} >
                            <div >
                                <FontAwesomeIcon icon={faSignOutAlt} /> &nbsp;Logout
                            </div>
                        </button>
                    </div>
                </nav>
            }
            open={isOpen}
            onSetOpen={toggle}
            styles={{
                sidebar: {
                    background: "#714de1",
                    height: "100vh",
                    position: "fixed",
                    zIndex: 60,
                    overflow: "hidden",
                },
                root: {
                    position: "unset",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: "hidden"
                },
                content: {
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
                    transition: "left .3s ease-out, right .3s ease-out"
                },
                overlay: {
                    zIndex: 50,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                    visibility: "hidden",
                    transition: "opacity .3s ease-out, visibility .3s ease-out",
                    backgroundColor: "rgba(0,0,0,.3)"
                },
            }}
        >
            <nav
                className='lg:hidden flex justify-between items-center h-16 text-black relative font-mono navbar'
                role='navigation'
            >
                <div className='px-3'>
                    <Hamburger toggled={isOpen} onToggle={toggle} color='#714de1' direction="right" duration={0.5} size={28} />
                </div>
                <h1 className="text-2xl font-bold font-sans">
                    {asPath === '/dashboard/setting' ? 'Settings' :
                        asPath === '/dashboard/profile' ? 'Profile' :
                            asPath === '/dashboard/videos' ? 'Videos' :
                                asPath === '/dashboard/messages' ? 'Messages' :
                                    'News Feed'
                    }
                </h1>
                <span className="relative px-6 inline-block cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19.99" height="23.625" viewBox="0 0 19.99 23.625">
                        <path id="Icon_ionic-md-notifications" data-name="Icon ionic-md-notifications" d="M15.62,27a2.364,2.364,0,0,0,2.352-2.362h-4.7A2.364,2.364,0,0,0,15.62,27Zm7.643-7.087v-6.5a7.656,7.656,0,0,0-5.88-7.442V5.147a1.764,1.764,0,1,0-3.528,0v.827a7.656,7.656,0,0,0-5.88,7.442v6.5L5.625,22.275v1.181h19.99V22.275Z" transform="translate(-5.625 -3.375)" />
                    </svg>
                    <span className="absolute top-1 right-5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        2
                    </span>
                </span>
            </nav>
        </Sidebar>
    )
}

export default Drawer;
