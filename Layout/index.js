import React, { useEffect } from 'react'
import { Sidebar } from '../components'

const CustomLayout = ({ children, authContext }) => {

    const { authorized, _Logout } = authContext;

    useEffect(() => { }, [authorized]);

    return (
        <div className={`${authorized ? 'flex flex-row' : ''} w-full h-full`}>
            {authorized && <Sidebar logout={_Logout} />}
            <div className={`${authorized ? 'content' : ''}`}>
                {children}
            </div>
        </div>
    )
}

export default CustomLayout;
