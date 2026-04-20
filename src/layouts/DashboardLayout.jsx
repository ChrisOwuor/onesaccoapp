import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="h-12"></div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main
        className={`transition-all duration-300 pt-24 p-6 md:p-10 min-h-screen ${isSidebarOpen ? "lg:ml-64" : "lg:ml-64 ml-0"}`}
      >
        <Outlet />
      </main>
    </div>
  );
}
