import React, { useEffect, useState } from 'react'
import { Sidebar, MobNavbar } from '../components'

const CustomLayout = ({ children, authContext }) => {

    const { authorized, _Logout } = authContext;
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => { }, [authorized]);

    useEffect(() => {

        const hideMenu = () => {
            if (window.innerWidth > 991 && isOpen) {
                setIsOpen(false);
                console.log('i resized');
            }
        };

        window.addEventListener('resize', hideMenu);

        return () => {
            window.removeEventListener('resize', hideMenu);
        };
    });


    const toggle = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className={`${authorized ? 'flex flex-col lg:flex-row' : ''} w-full h-full`}>
            {authorized && (
                <>
                    <Sidebar logout={_Logout} />
                    <MobNavbar toggle={toggle} isOpen={isOpen} />
                </>
            )
            }
            <div className={`${authorized ? 'content' : ''}`}>
                {children}
            </div>
        </div>
    )
}

export default CustomLayout;
