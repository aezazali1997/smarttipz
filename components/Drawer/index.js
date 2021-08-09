import React from 'react'
import Sidebar from 'react-sidebar';

const Drawer = ({ isOpen, toggle }) => {
    return (
        <Sidebar
            sidebar={<b>Sidebar content</b>}
            open={isOpen}
            onSetOpen={toggle}
            styles={{ sidebar: { background: "#714de1" } }}
        >

        </Sidebar>
    )
}

export default Drawer;
