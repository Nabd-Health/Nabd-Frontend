import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaCalendarAlt,
    FaUsers,
    FaStar,
    FaUser,
    FaSignOutAlt,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaHeart,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import useAuth from '@/features/auth/hooks/useAuth';

/**
 * Doctor Sidebar Component
 * Fixed width sidebar that doesn't overlap content
 * @component
 */
const DoctorSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Navigation items
    const navItems = [
        {
            path: '/doctor/dashboard',
            icon: FaHome,
            label: 'الرئيسية',
            exact: true
        },
        {
            path: '/doctor/appointments',
            icon: FaCalendarAlt,
            label: 'المواعيد'
        },
        {
            path: '/doctor/patients',
            icon: FaUsers,
            label: 'المرضى'
        },
        {
            path: '/doctor/reviews',
            icon: FaStar,
            label: 'التقييمات'
        },
        {
            path: '/doctor/profile',
            icon: FaUser,
            label: 'الملف الشخصي'
        }
    ];

    const handleLogout = () => {
        if (window.confirm('هل أنت متأكد من تسجيل الخروج؟')) {
            logout();
            navigate('/login');
        }
    };

    const isActive = (path, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-[#1C8B8F] text-white rounded-xl shadow-lg hover:bg-[#14666A] transition-colors"
            >
                {isMobileOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar - Fixed width, doesn't overlap */}
            <aside
                className={`
          flex-shrink-0 bg-gradient-to-b from-[#1F2E3C] to-[#14666A] text-white
          transition-all duration-300 shadow-2xl
          ${isCollapsed ? 'w-20' : 'w-72'}
          ${isMobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          fixed lg:relative right-0 top-0 h-screen z-40
          flex flex-col
        `}
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        {!isCollapsed && (
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                    <FaHeart className="w-6 h-6 text-[#1C8B8F] fill-current" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black">نبض</h1>
                                    <p className="text-xs text-white/70">Nabd</p>
                                </div>
                            </div>
                        )}
                        {isCollapsed && (
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto">
                                <FaHeart className="w-6 h-6 text-[#1C8B8F] fill-current" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Collapse Button - Desktop Only */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex absolute -left-4 top-6 w-8 h-8 bg-white rounded-full items-center justify-center text-[#1C8B8F] hover:bg-[#1C8B8F] hover:text-white transition-all duration-200 shadow-lg border-2 border-[#1C8B8F]"
                    title={isCollapsed ? 'فتح القائمة' : 'إغلاق القائمة'}
                >
                    {isCollapsed ? <FaAngleDoubleLeft className="w-4 h-4" /> : <FaAngleDoubleRight className="w-4 h-4" />}
                </button>

                {/* Navigation - Scrollable if needed */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path, item.exact);

                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={() => setIsMobileOpen(false)}
                                        className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${active
                                                ? 'bg-white text-[#1C8B8F] shadow-lg'
                                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                                            }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                                        title={isCollapsed ? item.label : ''}
                                    >
                                        <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} />
                                        {!isCollapsed && (
                                            <span className="font-bold text-sm">{item.label}</span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout Button - Stays at bottom */}
                <div className="p-4 border-t border-white/10 flex-shrink-0">
                    <button
                        onClick={handleLogout}
                        className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl
              bg-red-500/20 text-red-300 hover:bg-red-500/30 hover:text-white
              transition-all duration-200
              ${isCollapsed ? 'justify-center' : ''}
            `}
                        title={isCollapsed ? 'تسجيل الخروج' : ''}
                    >
                        <FaSignOutAlt className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} />
                        {!isCollapsed && (
                            <span className="font-bold text-sm">تسجيل الخروج</span>
                        )}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default DoctorSidebar;
