import React from "react";
import Navbar from "./components/Navbar";
import { AuthProvider } from "@/providers/AuthProvider";

const MainLayout = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <main>
          <Navbar />
          <div className="max-w-7xl mx-auto pt-16 px-4 min-h-[calc(100vh-64px)]">
            {children}
          </div>
        </main>
      </AuthProvider>
    </>
  );
};

export default MainLayout;
