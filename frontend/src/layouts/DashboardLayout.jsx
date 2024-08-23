import React, { useEffect, useState } from 'react'
import SideNav from '../components/sideNav'
import { useAuth } from '../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/navbar'
import { useSelector } from 'react-redux'


const DashboardLayout = () => {
    const token = useSelector((state) => state.auth.token);
    const location = useLocation()
    const [isOpen, setisOpen] = useState(false)

    return (
        <main className='w-full h-screen'>
            <SideNav setisOpen={setisOpen} isOpen={isOpen} />
            <div className={`duration-500 ${!isOpen ? "collapse-mainDashboard" : "mainDashboard"}  relative`}>
                <Navbar />
                <main className={`${location.pathname !== "/form" && 'p-[2rem]'}`}>
                    {token !== '' ? <Outlet /> : <Navigate to='/login' />}
                </main>
            </div>
        </main>
    )
}

export default DashboardLayout