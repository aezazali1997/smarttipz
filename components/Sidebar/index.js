/* eslint-disable @next/next/link-passhref */
import React from 'react'
import logo from '../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faUserCircle, faCog, faPlayCircle, faSignOutAlt, faComment } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';

const Sidebar = ({ logout }) => {

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
        <div className="sidebar">
            <nav
                className='flex flex-col w-full h-full pt-10 px-5 text-white justify-between relative navbar'
                role='navigation'
            >
                <div className="py-5 flex h-20 items-center flex-col ">
                    <Link href='/dashboard/news-feed'>
                        <Image src={logo} alt="brand" />
                    </Link>
                </div>
                <div className=' lg:flex h-80 flex-col space-y-2 overflow-y-auto'>
                    <>
                        <Link href='/dashboard/news-feed' className='p-4  font-sans nav-link nav-link-ltr'>
                            <div className={`flex flex-row items-center py-2 px-3 rounded-lg w-44 font-medium hover:text-indigo-600 hover:bg-white cursor-pointer
                        ${Active('/dashboard/news-feed')}`}>

                                <FontAwesomeIcon icon={faNewspaper} /> &nbsp;News Feed
                            </div>
                        </Link>
                        <Link href='/dashboard/profile' className='p-4 font-sans nav-link nav-link-ltr'>
                            <div className={`py-2 px-3 rounded-lg w-44 font-medium hover:text-indigo-600 hover:bg-white cursor-pointer
                              ${Active('/dashboard/profile')}`}>
                                <FontAwesomeIcon icon={faUserCircle} />&nbsp;Profile
                            </div>
                        </Link>
                        <Link href='/dashboard/videos' className='p-4 font-sans nav-link nav-link-ltr' >
                            <div className={`py-2 px-3 rounded-lg w-44 font-medium hover:text-indigo-600 hover:bg-white cursor-pointer
                            ${Active("/dashboard/videos")}`}>
                                <FontAwesomeIcon icon={faPlayCircle} />&nbsp;Videos
                            </div>
                        </Link>
                        <Link href='/dashboard/messages' className='p-4 font-sans nav-link nav-link-ltr' >
                            <div className={`py-2 px-3 rounded-lg w-44 font-medium hover:text-indigo-600 hover:bg-white cursor-pointer
                            ${Active("/dashboard/messages")}`}>
                                <FontAwesomeIcon icon={faComment} />&nbsp;Messages
                            </div>
                        </Link>
                        <Link href='/dashboard/setting' className='p-4 font-sans nav-link nav-link-ltr' >
                            <div className={`py-2 px-3 rounded-lg w-44 font-medium hover:text-indigo-600 hover:bg-white cursor-pointer
                            ${Active("/dashboard/setting")}`}>
                                <FontAwesomeIcon icon={faCog} />&nbsp;Settings
                            </div>
                        </Link>
                    </>
                </div>
                <div className="flex h-20 items-center">
                    <button onClick={() => logout()}
                        className={`flex flex-row py-2 px-3 rounded-lg w-44 font-medium text-white hover:bg-white hover:text-indigo-600 `} >
                        <div>
                            <FontAwesomeIcon icon={faSignOutAlt} /> &nbsp;Logout
                        </div>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;
