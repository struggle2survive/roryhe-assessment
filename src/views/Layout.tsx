import React from 'react'
import { Outlet } from 'react-router-dom'

import '@styles/main.scss'

const Layout = () => {
    return (
        <div className='container'>
            <Outlet />
        </div>
    )
}

export default Layout