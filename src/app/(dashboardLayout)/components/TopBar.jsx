"use client";

import { useAuth } from "@/providers/AuthProvider";
import React from "react";
import Image from "next/image";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";

const TopBar = ({ onSidebarToggle }) => {
    const { user } = useAuth();

    return (
        <header className="flex items-center justify-between bg-white shadow px-6 py-3 fixed top-0 right-0 left-0 md:left-64 z-20">
            {/* Left: Sidebar toggle + Title */}
            <div className="flex items-center gap-4">
                {/* Sidebar toggle (mobile only) */}
                {onSidebarToggle && (
                    <button
                        className="md:hidden p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                        onClick={onSidebarToggle}
                    >
                        <FaBars className="w-5 h-5 text-gray-700" />
                    </button>
                )}

                {/* Logo */}
                <div className="flex items-center space-x-2 pl-8 md:px-0">
                    <h1 className="text-xl lg:text-2xl font-bold">
                        <span className="text-primary">Class Master</span>
                    </h1>
                </div>
            </div>

            {/* Right: Notifications + Profile */}
            <div className="flex items-center gap-6">
                {/* Notification Icon */}
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                    <FaBell className="w-6 h-6 text-gray-600" />
                    <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile Section */}
                {user ? (
                    <div className="flex items-center gap-3 cursor-pointer">
                        {user.photoURL ? (
                            <Image
                                src={user.photoURL}
                                alt={user.name || "User"}
                                width={40}
                                height={40}
                                className="rounded-full border border-gray-300 object-cover"
                            />
                        ) : (
                            <FaUserCircle className="w-10 h-10 text-gray-600" />
                        )}
                        <span className="hidden md:block text-gray-800 font-medium">
                            {user.name || "User"}
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 cursor-pointer">
                        <FaUserCircle className="w-10 h-10 text-gray-600" />
                        <span className="hidden md:block text-gray-800 font-medium">
                            User
                        </span>
                    </div>
                )}
            </div>
        </header>
    );
};

export default TopBar;
