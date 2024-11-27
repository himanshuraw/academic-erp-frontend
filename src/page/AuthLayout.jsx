import { Outlet } from "react-router";
import NavigationBar from "../component/NavigationBar";

function AuthLayout() {
    return (
        <>
            <NavigationBar />
            <div className='flex justify-center mt-20 md:mt-32' >
                <Outlet />
            </div>
        </>

    )
}

export default AuthLayout;