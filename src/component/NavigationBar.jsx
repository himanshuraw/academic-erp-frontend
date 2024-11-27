import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router";
import { checkLoginStatus } from "../ulit/checkLoginStatus";

function NavigationBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const { isLoggedIn, username } = checkLoginStatus();
        setIsLoggedIn(isLoggedIn);
        if (isLoggedIn) {
            setUsername(username);
        }
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setShowDropdown(false);
    };

    return (
        <nav className="text-white shadow-lg pt-8">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <NavLink to="/" className="transition-all">
                        AcademicERP
                    </NavLink>
                </div>

                <div className="flex space-x-6 items-center text-lg">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${isActive ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" : ""} transition-all`
                        }
                    >
                        Home
                    </NavLink>

                    {!isLoggedIn ? (
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `${isActive ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" : ""} transition-all`
                            }
                        >
                            Login
                        </NavLink>
                    ) : (
                        <div className="relative" ref={dropdownRef}>
                            <span
                                className="font-semibold cursor-pointer"
                                onClick={() => setShowDropdown((prev) => !prev)}
                            >
                                Hello, {username}
                            </span>
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 bg-[#090909]">
                                    <button
                                        className="block w-full px-4 py-2 text-left"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
