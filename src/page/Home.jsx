import React, { useEffect } from 'react'
import NavigationBar from '../component/NavigationBar'
import { Outlet, useNavigate } from 'react-router'
import { checkLoginStatus } from '../ulit/checkLoginStatus';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const { isLoggedIn } = checkLoginStatus();
        if (!isLoggedIn) {
            navigate("/login")
        }
    }, [navigate])
    return (
        <>
            <NavigationBar />
            <div className='flex justify-center my-20' >
                <Outlet />
            </div>
        </>

    )
}

export default Home