/* eslint-disable @next/next/link-passhref */
import React, { useState, useEffect } from 'react'
import logo from '../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faUserCircle, faCog, faPlayCircle, faSignOutAlt, faComment, faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';
// import Badge from 'components/Badge';

const Sidebar = ({ logout }) => {

    const router = useRouter();
    const { asPath } = router;
    const [dropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        asPath === '/privacy-policy' || asPath === '/terms-and-conditions' || asPath === '/copyrights'
            || asPath === '/trademark-license'
            ? setShowDropdown(true) : setShowDropdown(false);
    }, [])

    let Active = (path) => {
        return asPath === path ?
            'bg-white text' : 'sidebar-item'
    }

    const toggleDropdown = () => {
        setShowDropdown(!dropdown);
    }

    let ActiveDropdown = (path) => {
        return asPath === path ? 'text-white background' : 'sidebar-dropdown-item';
    }

    return (
        <div className="sidebar">
            <nav
                className='flex flex-col w-full h-full py-5 px-5 text-white justify-between relative navbar'
                role='navigation'
            >
                <div className="py-5 flex items-center flex-col ">
                    <Link href='/dashboard/news-feed'><a>
                        <Image src={logo} alt="brand" /></a>
                    </Link>
                </div>
                <div className='lg:flex h-full flex-col space-y-2 overflow-y-auto'>
                    <>
                        <Link href='/dashboard/news-feed' className='p-4  font-sans nav-link nav-link-ltr'>
                            <div className={`flex flex-row items-center py-2 px-3 rounded-lg w-52 font-medium cursor-pointer
                            ${Active('/dashboard/news-feed')}`}>

                                <FontAwesomeIcon icon={faNewspaper} /> &nbsp;News Feed
                            </div>
                        </Link>
                        <Link href='/dashboard/profile' className='p-4 font-sans nav-link nav-link-ltr'>
                            <div className={`py-2 px-3 rounded-lg w-52 font-medium  cursor-pointer
                              ${Active('/dashboard/profile')}`}>
                                <FontAwesomeIcon icon={faUserCircle} />&nbsp;Profile
                            </div>
                        </Link>
                        <Link href='/dashboard/videos' className='p-4 font-sans nav-link nav-link-ltr' >
                            <div className={`py-2 px-3 rounded-lg w-52 font-medium  cursor-pointer
                            ${Active("/dashboard/videos")}`}>
                                <FontAwesomeIcon icon={faPlayCircle} />&nbsp;Videos
                            </div>
                        </Link>
                        <Link href='/dashboard/messages' className='p-4 font-sans nav-link nav-link-ltr' >
                            <div className={`flex items-center justify-between py-2 px-3 rounded-lg w-52 font-medium  cursor-pointer
                            ${Active("/dashboard/messages")}`}>
                                <div>
                                    <FontAwesomeIcon icon={faComment} />&nbsp;Messages
                                </div>
                                {/* <Badge /> */}
                            </div>
                        </Link>
                        <div className="inline-block relative space-y-1">
                            <button onClick={toggleDropdown} className={`flex items-center justify-between py-2 px-3 rounded-lg w-52 font-medium sidebar-item cursor-pointer
                           ${dropdown ? 'bg-white text' : 'text-white'}`} >
                                <div>
                                    <FontAwesomeIcon icon={faClipboardList} />&nbsp;Policies
                                </div>
                                {
                                    dropdown ?
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                        </svg> :
                                        <svg className="w-6 h-6 pointer-events-none" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                }
                            </button>
                            {
                                dropdown ? (
                                    <div className="absolute flex flex-col space-y-2 bg-white p-2 w-52 rounded-lg z-40 ease-in-out">
                                        <Link href='/privacy-policy' className='p-4 font-sans nav-link nav-link-ltr' >
                                            <div className={`flex items-center justify-between py-2 px-3 rounded-lg w-48 font-medium sidebar-dropdown-item cursor-pointer
                            ${ActiveDropdown("/privacy-policy")}`}>
                                                <div>
                                                    Privacy Policy
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href='/terms-and-conditions' className='p-4 font-sans nav-link nav-link-ltr' >
                                            <div className={`flex items-center justify-between py-2 px-3 rounded-lg w-48 font-medium sidebar-dropdown-item cursor-pointer
                            ${ActiveDropdown("/terms-and-conditions")}`}>
                                                <div>
                                                    Terms & Conditions
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href='/copyrights' className='p-4 font-sans nav-link nav-link-ltr' >
                                            <div className={`flex items-center justify-between py-2 px-3 rounded-lg w-48 font-medium sidebar-dropdown-item cursor-pointer
                            ${ActiveDropdown("/copyrights")}`}>
                                                <div>
                                                    Copyrights
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href='/trademark-license' className='p-4 font-sans nav-link nav-link-ltr' >
                                            <div className={`flex items-center justify-between py-2 px-3 rounded-lg w-48 font-medium sidebar-dropdown-item cursor-pointer
                            ${ActiveDropdown("/trademark-license")}`}>
                                                <div>
                                                    Trademark License
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ) : ('')}
                        </div>
                        <Link href='/dashboard/setting' className='p-4 font-sans nav-link nav-link-ltr' >
                            <div className={`py-2 px-3 rounded-lg w-52 font-medium sidebar-item cursor-pointer
                            ${Active("/dashboard/setting")}`}>
                                <FontAwesomeIcon icon={faCog} />&nbsp;Settings
                            </div>
                        </Link>
                    </>
                </div>
                <div className="flex items-center">
                    <button onClick={() => logout()}
                        className={`flex flex-row py-2 px-3 rounded-lg w-52 font-medium text-white hover:bg-white hover:text-indigo-600 `} >
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
