/* eslint-disable @next/next/link-passhref */
import React from 'react'
import Sidebar from 'react-sidebar';
import Hamburger from 'hamburger-react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faUserCircle, faCog, faPlayCircle, faSignOutAlt, faComment } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';
import Badge from 'components/Badge';

const Drawer = ({ isOpen, toggle, logout }) => {

    const router = useRouter();
    const { asPath } = router;

    let Active = (path) => {
        if (asPath === path) {
            return 'bg-white text-indigo-600'
        }
        else {
            return 'text-white'
        }
    }

    return (
        <Sidebar
            sidebar={
                <nav
                    className='flex flex-col w-auto h-full pt-10 px-5 text-white justify-between relative navbar'
                    role='navigation'
                >
                    <div className="py-5 flex h-20 items-center flex-col ">
                        <Link href='/dashboard/news-feed'>
                            <Image src={logo} alt="brand" />
                        </Link>
                    </div>
                    <div className=' lg:flex h-80 flex-col space-y-2 overflow-y-auto'>
                        <>
                            <Link href='/dashboard/news-feed' className='p-4 font-sans nav-link nav-link-ltr'>
                                <div onClick={toggle} className={`flex flex-row items-center py-2 px-3 rounded-lg w-44 font-medium hover:text-indigo-600 hover:bg-white cursor-pointer
                                    ${Active('/dashboard/news-feed')}`}>
                                    <FontAwesomeIcon icon={faNewspaper} /> &nbsp;News Feed
                                </div>
                            </Link>
                            <Link href='/dashboard/profile' className='p-4 font-sans nav-link nav-link-ltr'>
                                <div onClick={toggle} className={`py-2 px-3 rounded-lg w-44 font-medium hover:text-indigo-600 hover:bg-white cursor-pointer
                                    ${Active('/dashboard/profile')}`}>
                                    <FontAwesomeIcon icon={faUserCircle} />&nbsp;Profile
                                </div>
                            </Link>
                            <Link href='/dashboard/videos' className='p-4 font-sans nav-link nav-link-ltr' >
                                <div onClick={toggle} className={`py-2 px-3 rounded-lg w-44 font-medium hover:text-indigo-600 hover:bg-white cursor-pointer
                                    ${Active("/dashboard/videos")}`}>
                                    <FontAwesomeIcon icon={faPlayCircle} />&nbsp;Videos
                                </div>
                            </Link>
                            <Link href='/dashboard/messages' className='p-4 font-sans nav-link nav-link-ltr' >
                                <div onClick={toggle} className={`flex justify-between items-center py-2 px-3 rounded-lg w-44 font-medium hover:text-indigo-600 hover:bg-white cursor-pointer
                                    ${Active("/dashboard/messages")}`}>
                                    <div>
                                        <FontAwesomeIcon icon={faComment} />&nbsp;Messages
                                    </div>
                                    {/* <Badge /> */}
                                </div>
                            </Link>
                            <Link href='/dashboard/setting' className='p-4 font-sans nav-link nav-link-ltr' >
                                <div onClick={toggle} className={`py-2 px-3 rounded-lg w-44 font-medium hover:text-indigo-600 hover:bg-white cursor-pointer
                                ${Active("/dashboard/setting")}`}>
                                    <FontAwesomeIcon icon={faCog} />&nbsp;Settings
                                </div>
                            </Link>
                        </>
                    </div>
                    <div className="flex h-20 items-center">
                        <button onClick={() => logout()}
                            className={`flex flex-row py-2 px-3 rounded-lg w-44 font-medium text-white hover:bg-white hover:text-indigo-600 `} >
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
                    zIndex: 35,
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
