"use client";

import { AuthProvider } from "@/providers/AuthProvider";
import React, { useState } from "react";
import Sidebar from "./components/SideBar";
import TopBar from "./components/TopBar";

const DashBoardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <AuthProvider>
            <div className="relative min-h-screen bg-gray-50">
                {/* Sidebar - always fixed */}
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

                {/* Main content area */}
                <div className="flex flex-col md:ml-64">
                    {/* TopBar - fixed */}
                    <TopBar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />

                    {/* Scrollable main content */}
                    <div className="pt-20 overflow-auto p-4">
                        {children}
                    </div>
                </div>
            </div>
        </AuthProvider>
    );
};

export default DashBoardLayout;
