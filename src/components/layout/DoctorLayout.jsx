// src/components/layout/DoctorLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import DoctorSidebar from '@/features/doctor/components/DoctorSidebar';

/**
 * Doctor Layout Component
 * Proper flex layout structure for sidebar + content + footer
 * @component
 */
const DoctorLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/20 to-emerald-50/20">
      {/* Sidebar - Fixed width, full height */}
      <DoctorSidebar />

      {/* Main Content Area - Takes remaining space */}
      <main className="flex-1 flex flex-col min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;
