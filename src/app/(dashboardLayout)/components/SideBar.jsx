"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBook, FaPlusCircle, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/providers/AuthProvider";
import Swal from "sweetalert2";

const Sidebar = () => {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Links based on role
    const studentLinks = [
        { name: "Dashboard", path: "/student-dashboard", icon: <FaHome /> },
        { name: "My Courses", path: "/my-course", icon: <FaBook /> },
    ];

    const adminLinks = [
        { name: "Dashboard", path: "/admin-dashboard", icon: <FaHome /> },
        { name: "Add Course", path: "/add-course", icon: <FaPlusCircle /> },
    ];

    const links = user?.role === "admin" ? adminLinks : studentLinks;

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, logout!",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            logout();
            Swal.fire({
                title: "Logged out!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 z-30 w-64 h-screen bg-white shadow-lg transform transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:h-screen md:overflow-y-auto`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 h-[72px] border-b border-primary">
                    <h2 className="text-xl font-bold text-primary">Dashboard</h2>
                    <button className="md:hidden text-xl" onClick={() => setIsOpen(false)}>
                        <FaTimes />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="p-4 flex flex-col gap-3">
                    {links.map((link) => (
                        <Link key={link.name} href={link.path}>
                            <div
                                className={`flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-emerald-200 hover:text-gray-700 hover:text-primary p
                  ${pathname === link.path ? "bg-emerald-600 text-white font-semibold" : "text-gray-700"}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="text-lg">{link.icon}</span>
                                <span>{link.name}</span>
                            </div>
                        </Link>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-0 w-full p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-medium py-2 px-4 rounded-full transition duration-200"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </div>

            {/* Mobile toggle button */}
            {!isOpen && (
                <button
                    className="fixed top-4 left-4 z-40 md:hidden p-2 bg-white rounded-md shadow text-xl"
                    onClick={() => setIsOpen(true)}
                >
                    <FaBars />
                </button>
            )}
        </>
    );
};

export default Sidebar;
