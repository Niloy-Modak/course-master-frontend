"use client";

import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);


    const navLinks = [
        { name: "Home", to: "/" },
        { name: "All Courses", to: "/all-courses" },
        { name: "Dashboard", to: "/admin-dashboard" },
        { name: "Add course", to: "/add-course" },
    ];

    // Close mobile menu on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsOpen(false);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close mobile menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="bg-white shadow-md w-full fixed top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink:0">
                        <span className="text-xl font-bold text-gray-800">RideNest</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
                        <ul className="flex space-x-8">
                            {navLinks.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.to}
                                        className="text-gray-900 hover:text-gray-600 hover:bg-gray-100 px-3 py-2 text-sm font-medium"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden md:flex md:items-center">
                        {user ? (
                            <div className="flex items-center space-x-3">
                                {/* {user.photoURL && (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full"
                                    />
                                )} */}
                                <span className="text-gray-800 font-medium">{user.name || "User"}</span>
                                <button
                                    onClick={logout}
                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <><div>
                                <Link
                                    href="/login"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm font-medium"
                                >
                                    Register
                                </Link>
                            </div></>
                        )}
                    </div>

                    {/* Mobile Toggle Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-800 hover:text-blue-600 focus:outline-none"
                            aria-label="Toggle menu"
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                        >
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    onClick={closeMenu} // clicking overlay closes sidebar
                    className="fixed top-16 left-0 right-0 bottom-0 bg-black/10 z-40 transition-opacity"
                />
            )}
            {/* Mobile Sidebar Menu */}
            <div
                ref={menuRef}
                id="mobile-menu"
                className={`md:hidden bg-white shadow-lg fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } z-50 overflow-y-auto`}
            >
                <div className="p-4 space-y-2 flex flex-col items-end text-right">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.to}
                            onClick={closeMenu}
                            className="text-gray-800 hover:bg-gray-100 hover:font-bold block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full"
                        >

                            {item.name}
                        </Link>
                    ))}

                    {user ? (
                        <div className="w-full flex flex-col items-end space-y-2">
                            {/* {user.photoURL && (
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full"
                                />
                            )} */}
                            <span className="text-gray-800 font-medium">{user.name || "User"}</span>
                            <button
                                onClick={() => { logout(); closeMenu(); }}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-base font-medium w-full"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            onClick={closeMenu}
                            className="w-full"
                        >
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-base font-medium w-full">

                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
