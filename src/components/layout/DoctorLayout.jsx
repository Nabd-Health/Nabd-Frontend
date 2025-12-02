// src/components/layout/DoctorLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import DoctorSidebar from '@/features/doctor/components/DoctorSidebar';
import { SidebarProvider, useSidebar } from '@/features/doctor/context/SidebarContext';

/**
 * Doctor Layout Content Component
 * Handles the layout with dynamic padding based on sidebar state
 * @component
 */
const DoctorLayoutContent = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/20 to-emerald-50/20">
      {/* Sidebar - Fixed on right side */}
      <DoctorSidebar />

      {/* Main Content Area - Scrollable, with dynamic padding to avoid sidebar overlap */}
      <main
        className={`min-h-screen overflow-y-auto transition-all duration-300 ${isCollapsed ? 'pr-20' : 'pr-72'
          }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

/**
 * Doctor Layout Component
 * Wraps content with SidebarProvider
 * @component
 */
const DoctorLayout = () => {
  return (
    <SidebarProvider>
      <DoctorLayoutContent />
    </SidebarProvider>
  );
};

export default DoctorLayout;
