import React, { useEffect, useState } from 'react'
import { Sidebar, Drawer } from '../components'
import { useRouter } from 'next/router';


const CustomLayout = ({ children }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

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

    const _Logout = () => {
        cookie.remove('token');
        cookie.remove('username');
        router.push('/login')
    }

    return (
        <div className={`flex flex-col lg:flex-row w-full h-full`}>

            <Sidebar logout={_Logout} />
            <Drawer toggle={toggle} isOpen={isOpen} />
            <main className={`Content`}>
                {children}
            </main>
        </div>
    )
}


export default CustomLayout;
