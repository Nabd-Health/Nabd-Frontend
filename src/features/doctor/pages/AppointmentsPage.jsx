import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCalendarAlt, FaFilter, FaSearch, FaTimes, FaChevronDown,
  FaCheck, FaClock, FaCalendarDay, FaChartLine, FaChevronLeft, FaChevronRight,
  FaHourglassHalf, FaPlay, FaUserCheck, FaUserTimes, FaBan
} from 'react-icons/fa';
import AppointmentCard from '../components/AppointmentCard';
import ActiveSessionWarning from '../components/ActiveSessionWarning';
import { useAllAppointments } from '../hooks/useAllAppointments';
import { isAppointmentCompleted } from '@/utils/appointmentStatus';

/**
 * AppointmentsPage - Clean Professional Design
 * Matches the exact design system of Doctor Dashboard
 */
const AppointmentsPage = () => {
  const navigate = useNavigate();
  const {
    appointments,
    loading,
    error,
    pagination,
    statistics,
    goToNextPage,
    goToPreviousPage,
    goToPage
  } = useAllAppointments();

  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const filterRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter appointments by search and type
  const filteredAppointments = appointments?.filter(apt => {
    // Search filter
    const matchesSearch = !searchTerm ||
      apt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phoneNumber?.includes(searchTerm);

    // Type filter
    const matchesType = filterType === 'all' || apt.status === filterType;

    return matchesSearch && matchesType;
  }) || [];

  // Get filter label
  const getFilterLabel = () => {
    const labels = {
      'all': 'الكل',
      'كشف عام': 'كشف عام',
      'متابعة': 'متابعة',
    };
    return labels[filterType] || 'الكل';
  };

  // Handle enter session
  const handleStartAppointment = async (appointment) => {
    // التوجيه مباشرة لصفحة الجلسة الجديدة
    navigate(`/doctor/session/${appointment.id}`);
  };

  // Get stats from API statistics
  const totalAppointments = statistics?.total || pagination?.totalCount || 0;

  const statusCounts = statistics ? {
    pending: statistics.pending || 0,
    confirmed: statistics.confirmed || 0,
    checkedIn: statistics.checkedIn || 0,
    inProgress: statistics.inProgress || 0,
    completed: statistics.completed || 0,
    noShow: statistics.noShow || 0,
    cancelled: statistics.cancelled || 0,
  } : {
    pending: 0, confirmed: 0, checkedIn: 0, inProgress: 0, completed: 0, noShow: 0, cancelled: 0
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]" dir="rtl">
      {/* Active Session Warning */}
      <ActiveSessionWarning />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2E3C] mb-2">إدارة المواعيد</h1>
            <p className="text-[#64748B]">تابع جميع المواعيد والجلسات من مكان واحد</p>
          </div>

          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-[#E7ECEF]">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#1C8B8F]">
              <FaCalendarAlt className="text-lg" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[#64748B] font-medium mb-0.5">تاريخ اليوم</span>
              <span className="text-sm font-bold text-[#1F2E3C]">
                {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid - Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total */}
          <div className="bg-white p-5 rounded-2xl border border-[#E7ECEF] shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium mb-1">إجمالي المواعيد</p>
              <h3 className="text-2xl font-bold text-[#1F2E3C]">{totalAppointments}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#3B82F6]">
              <FaCalendarDay className="text-xl" />
            </div>
          </div>

          {/* Confirmed */}
          <div className="bg-white p-5 rounded-2xl border border-[#E7ECEF] shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium mb-1">مؤكدة</p>
              <h3 className="text-2xl font-bold text-[#1F2E3C]">{statusCounts.confirmed}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#1C8B8F]">
              <FaCheck className="text-xl" />
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white p-5 rounded-2xl border border-[#E7ECEF] shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium mb-1">مكتملة</p>
              <h3 className="text-2xl font-bold text-[#1F2E3C]">{statusCounts.completed}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] flex items-center justify-center text-[#10B981]">
              <FaUserCheck className="text-xl" />
            </div>
          </div>

          {/* Cancelled */}
          <div className="bg-white p-5 rounded-2xl border border-[#E7ECEF] shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium mb-1">ملغية</p>
              <h3 className="text-2xl font-bold text-[#1F2E3C]">{statusCounts.cancelled}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FEF2F2] flex items-center justify-center text-[#EF4444]">
              <FaBan className="text-xl" />
            </div>
          </div>
        </div>

        {/* Search & Filters Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E7ECEF] shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <FaSearch className="text-[#94A3B8]" />
              </div>
              <input
                type="text"
                placeholder="ابحث باسم المريض أو رقم الهاتف..."
                className="w-full pr-11 pl-4 py-2.5 bg-[#F8FAFC] border border-[#E7ECEF] focus:bg-white focus:border-[#1C8B8F] rounded-xl text-[#1F2E3C] placeholder-[#94A3B8] focus:ring-0 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 left-0 pl-4 flex items-center text-[#94A3B8] hover:text-[#EF4444]"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Filter Dropdown */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`h - full px - 5 py - 2.5 rounded - xl flex items - center gap - 3 font - medium transition - all duration - 200 min - w - [160px] justify - between border ${isFilterOpen || filterType !== 'all'
                  ? 'bg-[#F0FDFA] text-[#1C8B8F] border-[#1C8B8F]/30'
                  : 'bg-white text-[#64748B] border-[#E7ECEF] hover:border-[#1C8B8F]/50'
                  } `}
              >
                <div className="flex items-center gap-2">
                  <FaFilter className={filterType !== 'all' ? 'text-[#1C8B8F]' : 'text-[#94A3B8]'} />
                  <span className="text-sm">{getFilterLabel()}</span>
                </div>
                <FaChevronDown className={`w - 3 h - 3 transition - transform duration - 200 ${isFilterOpen ? 'rotate-180' : ''} `} />
              </button>

              {isFilterOpen && (
                <div className="absolute left-0 top-full mt-2 w-full md:w-48 bg-white rounded-xl shadow-lg border border-[#E7ECEF] overflow-hidden z-50 py-1">
                  {['all', 'كشف عام', 'متابعة'].map((type) => (
                    <button
                      key={type}
                      onClick={() => { setFilterType(type); setIsFilterOpen(false); }}
                      className={`w - full flex items - center justify - between px - 4 py - 2.5 text - sm transition - colors ${filterType === type
                        ? 'bg-[#F0FDFA] text-[#1C8B8F] font-semibold'
                        : 'text-[#64748B] hover:bg-[#F8FAFC]'
                        } `}
                    >
                      <span>{type === 'all' ? 'الكل' : type}</span>
                      {filterType === type && <FaCheck className="w-3.5 h-3.5 text-[#1C8B8F]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-4 mb-8 flex items-center gap-3 text-[#B91C1C]">
            <FaBan className="text-xl" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Content Area */}
        {loading ? (
          /* Loading Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-[#E7ECEF] animate-pulse h-64">
                <div className="flex justify-between mb-6">
                  <div className="h-8 w-20 bg-[#F1F5F9] rounded-lg"></div>
                  <div className="h-6 w-16 bg-[#F1F5F9] rounded-lg"></div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#F1F5F9] rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 w-3/4 bg-[#F1F5F9] rounded mb-2"></div>
                    <div className="h-3 w-1/2 bg-[#F1F5F9] rounded"></div>
                  </div>
                </div>
                <div className="h-10 w-full bg-[#F1F5F9] rounded-xl mt-auto"></div>
              </div>
            ))}
          </div>
        ) : filteredAppointments.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl p-16 text-center border border-[#E7ECEF] max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-[#F0FDFA] rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCalendarAlt className="text-3xl text-[#1C8B8F]" />
            </div>
            <h3 className="text-xl font-bold text-[#1F2E3C] mb-2">لا توجد مواعيد</h3>
            <p className="text-[#64748B] mb-6">
              {searchTerm
                ? 'لم يتم العثور على نتائج مطابقة لبحثك.'
                : 'لا توجد مواعيد متاحة حالياً في هذا التصنيف.'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F0FDFA] text-[#1C8B8F] rounded-xl font-bold hover:bg-[#CCFBF1] transition-colors"
              >
                <FaTimes />
                مسح البحث
              </button>
            )}
          </div>
        ) : (
          /* Appointments Grid */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onStartAppointment={handleStartAppointment}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={!pagination.hasPreviousPage}
                  className={`w - 10 h - 10 flex items - center justify - center rounded - xl transition - all ${pagination.hasPreviousPage
                    ? 'bg-white text-[#64748B] hover:bg-[#F0FDFA] hover:text-[#1C8B8F] border border-[#E7ECEF] hover:border-[#1C8B8F]/30'
                    : 'bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed border border-transparent'
                    } `}
                >
                  <FaChevronRight />
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === pagination.totalPages ||
                      (pageNum >= pagination.pageNumber - 1 && pageNum <= pagination.pageNumber + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`w - 10 h - 10 flex items - center justify - center rounded - xl font - bold text - sm transition - all ${pageNum === pagination.pageNumber
                            ? 'bg-[#1C8B8F] text-white shadow-md shadow-[#1C8B8F]/20'
                            : 'bg-white text-[#64748B] hover:bg-[#F0FDFA] hover:text-[#1C8B8F] border border-[#E7ECEF]'
                            } `}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      pageNum === pagination.pageNumber - 2 ||
                      pageNum === pagination.pageNumber + 2
                    ) {
                      return <span key={pageNum} className="text-[#94A3B8] px-1">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={!pagination.hasNextPage}
                  className={`w - 10 h - 10 flex items - center justify - center rounded - xl transition - all ${pagination.hasNextPage
                    ? 'bg-white text-[#64748B] hover:bg-[#F0FDFA] hover:text-[#1C8B8F] border border-[#E7ECEF] hover:border-[#1C8B8F]/30'
                    : 'bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed border border-transparent'
                    } `}
                >
                  <FaChevronLeft />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
