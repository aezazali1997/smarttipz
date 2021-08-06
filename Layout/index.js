import React from 'react'
import { Sidebar } from '../components'

const CustomLayout = ({ children }) => {
    return (
        <div className="flex w-full h-full">
            <Sidebar />
            {children}
        </div>
    )
}

export default CustomLayout;
