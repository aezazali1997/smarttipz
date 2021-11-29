/* eslint-disable @next/next/link-passhref */
import React, { useRef, useState } from 'react';
import { faClipboardList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Badge, GlobalSearchbar } from 'src/components';
import { useOutsideClick } from 'src/hooks';
import { DropdownRoutes, Routes } from 'routes';

const Sidebar = ({ logout }) => {

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

    return (

        <div className="sidebar z-50">
            <nav
                className='flex w-full h-full py-2 px-2 text-white justify-between navbar'
                role='navigation'
            >
                <div className="flex items-center w-36 flex-col relative">
                    <Image src='https://smart-tipz-data-bucket.s3.ap-southeast-1.amazonaws.com/public/logo.svg'
                        alt="brand" layout='fill' objectFit="cover" />
                </div>

                <GlobalSearchbar />
                <div className='flex h-full sidebar-content space-x-1'>
                    {
                        Routes && Routes.map(({ path, name, icon, badge }, index) => (
                            <>
                                <Link href={path} key={index} className='p-4 font-sans nav-link nav-link-ltr' >
                                    <a>
                                        <div className={`flex items-center justify-between py-2 px-3 rounded-lg  font-medium  cursor-pointer
                                            ${Active(path)}`}>
                                            <div>
                                                {icon}&nbsp;{name}
                                            </div>
                                            {badge && <Badge />}
                                        </div>
                                    </a>
                                </Link>
                            </>
                        ))
                    }
                    <div ref={DropdownRef} className="inline-block relative space-y-1">
                        <button onClick={toggleDropdown} className={`flex items-center justify-between py-2 px-3 rounded-lg  font-medium sidebar-item cursor-pointer
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
                            dropdown &&
                            <div className="absolute flex flex-col space-y-2 bg-white p-2  rounded-lg shadow ease-in-out">
                                {
                                    DropdownRoutes && DropdownRoutes.map(({ path, name }, index) => (
                                        <>
                                            <Link href={path} className='p-4 font-sans nav-link nav-link-ltr' >
                                                <a>
                                                    <div onClick={() => toggleDropdown()} className={`flex items-center justify-between py-2 px-3 rounded-lg w-48 font-medium sidebar-dropdown-item cursor-pointer
                                                    ${ActiveDropdown(path)}`}>
                                                        <div>
                                                            {name}
                                                        </div>
                                                    </div>
                                                </a>
                                            </Link>
                                        </>

                                    ))}
                            </div>
                        }
                    </div>

                </div>
                <div className="flex items-center">
                    <button onClick={() => logout()}
                        className={`flex flex-row py-2 px-3 rounded-lg font-medium text-white hover:bg-white hover:text-indigo-600 `} >
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
