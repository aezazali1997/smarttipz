import React from 'react'
import { Sling as Hamburger } from 'hamburger-react'
import Drawer from '../Drawer';

const MobNavbar = ({ isOpen, toggle }) => {

    return (
        <nav
            className='lg:hidden flex justify-between items-center h-16 text-black relative font-mono navbar'
            role='navigation'
        >
            <div className='px-3'>
                <Hamburger toggled={isOpen} onToggle={toggle} color='#714de1' direction="right" duration={0.5} size={28} />
            </div>
            <h1 className="text-2xl font-bold font-sans">Profile</h1>
            <span className="relative px-6 inline-block cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="19.99" height="23.625" viewBox="0 0 19.99 23.625">
                    <path id="Icon_ionic-md-notifications" data-name="Icon ionic-md-notifications" d="M15.62,27a2.364,2.364,0,0,0,2.352-2.362h-4.7A2.364,2.364,0,0,0,15.62,27Zm7.643-7.087v-6.5a7.656,7.656,0,0,0-5.88-7.442V5.147a1.764,1.764,0,1,0-3.528,0v.827a7.656,7.656,0,0,0-5.88,7.442v6.5L5.625,22.275v1.181h19.99V22.275Z" transform="translate(-5.625 -3.375)" />
                </svg>
                <span className="absolute top-1 right-5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full">
                    2
                </span>
            </span>
            {/* <Drawer isOpen={isOpen} toggle={toggle} /> */}
        </nav>
    )
}
export default MobNavbar;
