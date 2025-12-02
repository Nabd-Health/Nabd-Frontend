import React from 'react';
import { FaHeart, FaArrowUp } from 'react-icons/fa';

/**
 * Dashboard Footer Component
 * Simple, compact footer
 * @component
 */
const DashboardFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-16 bg-[#1F2E3C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo and Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1C8B8F] to-[#14666A] rounded-xl flex items-center justify-center">
                <FaHeart className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <h3 className="text-lg font-bold text-white">منصة نبض</h3>
                <p className="text-xs text-[#94A3B8]">للخدمات الطبية</p>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-sm text-[#94A3B8]">
                © 2025 منصة نبض. جميع الحقوق محفوظة.
              </p>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-[#1C8B8F] hover:bg-[#14666A] rounded-xl transition-all duration-200 hover:scale-110 flex items-center justify-center"
              aria-label="العودة للأعلى"
            >
              <FaArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
