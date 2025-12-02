import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt, FaPlay, FaFilter, FaClock, FaChevronDown, FaCheck, FaSpinner, FaArrowRight } from 'react-icons/fa';

/**
 * Today's Appointments Component
 * Clean modern design matching landing page
 * @component
 */
const TodayAppointments = ({
  appointments,
  filterType = 'all',
  onStartAppointment,
  onFilterChange,
  loading = false,
  sessionLoading = null
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Get filter label in Arabic
   */
  const getFilterLabel = () => {
    const labels = {
      'all': 'الكل',
      'كشف عام': 'كشف عام',
      'متابعة': 'متابعة',
    };
    return labels[filterType] || 'الكل';
  };

  /**
   * Get status badge styling
   */
  const getStatusBadge = (status) => {
    const badges = {
      'كشف عام': {
        bg: 'bg-[#F0FDFA]',
        text: 'text-[#1C8B8F]',
      },
      'متابعة': {
        bg: 'bg-[#FEF3C7]',
        text: 'text-[#F59E0B]',
      },
    };

    return badges[status] || badges['كشف عام'];
  };

  return (
    <section className="mb-8" aria-labelledby="appointments-heading">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E7ECEF] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-[#E7ECEF]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#F0FDFA] rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="w-5 h-5 text-[#1C8B8F]" />
              </div>
              <div>
                <h2 id="appointments-heading" className="text-xl font-bold text-[#1F2E3C] mb-1">
                  مواعيد اليوم
                </h2>
                <p className="text-[#94A3B8] text-sm">
                  {new Date().toLocaleDateString('ar-EG', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Total Count Badge */}
              <div className="bg-[#F0FDFA] px-4 py-2 rounded-xl border border-[#1C8B8F]/20">
                <span className="text-[#1C8B8F] font-bold text-lg">{appointments?.length || 0}</span>
                <span className="text-[#64748B] text-sm mr-2">موعد</span>
              </div>

              {/* Filter Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-white border border-[#E7ECEF] hover:border-[#1C8B8F] px-4 py-2 rounded-xl transition-colors duration-200 flex items-center gap-2"
                >
                  <FaFilter className="w-3.5 h-3.5 text-[#64748B]" />
                  <span className="text-[#1F2E3C] text-sm font-medium">{getFilterLabel()}</span>
                  <FaChevronDown className={`w-3 h-3 text-[#64748B] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg border border-[#E7ECEF] overflow-hidden z-50">
                    <div className="py-1">
                      {['all', 'كشف عام', 'متابعة'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => {
                            onFilterChange(filter);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${filterType === filter
                              ? 'bg-[#F0FDFA] text-[#1C8B8F] font-semibold'
                              : 'text-[#64748B] hover:bg-[#F8FAFC]'
                            }`}
                        >
                          <span>{filter === 'all' ? 'الكل' : filter}</span>
                          {filterType === filter && <FaCheck className="w-3.5 h-3.5 text-[#1C8B8F]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="divide-y divide-[#E7ECEF]">
          {/* Loading State */}
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1C8B8F] mx-auto mb-4"></div>
              <p className="text-[#64748B] font-medium">جاري تحميل المواعيد...</p>
            </div>
          ) : appointments?.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-20 h-20 bg-[#F0FDFA] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="w-10 h-10 text-[#1C8B8F]" />
              </div>
              <p className="text-[#64748B] text-lg font-medium">لا توجد مواعيد اليوم</p>
            </div>
          ) : (
            appointments?.map((appointment) => {
              const isInProgress = appointment.apiStatus === 'InProgress' || appointment.apiStatus === 3;

              return (
                <article
                  key={appointment.id}
                  className={`p-5 transition-all duration-200 ${isInProgress
                      ? 'bg-[#FEF3C7]/30 border-r-4 border-[#F59E0B]'
                      : 'hover:bg-[#F8FAFC]'
                    }`}
                >
                  <div className="flex items-center justify-between gap-6">
                    {/* Patient Info */}
                    <div className="flex items-center gap-4 flex-1">
                      {/* Patient Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-br from-[#1C8B8F] to-[#14666A] rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-lg">
                          {appointment.patientInitial}
                        </span>
                      </div>

                      {/* Patient Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="text-[#1F2E3C] font-bold text-base truncate">
                            {appointment.patientName}
                          </h3>
                          <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${getStatusBadge(appointment.status).bg
                              } ${getStatusBadge(appointment.status).text}`}
                          >
                            {appointment.status}
                          </span>
                          {isInProgress && (
                            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#FEF3C7] text-[#F59E0B] border border-[#F59E0B]/30 animate-pulse">
                              ● جلسة نشطة
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                          {/* Time */}
                          <div className="flex items-center gap-1.5 text-[#64748B]">
                            <FaClock className="w-3.5 h-3.5 text-[#1C8B8F]" />
                            <span className="font-medium">{appointment.time}</span>
                          </div>

                          {/* Duration */}
                          <div className="flex items-center gap-1.5 text-[#94A3B8]">
                            <span className="text-[#E7ECEF]">•</span>
                            <span className="font-medium">{appointment.duration} دقيقة</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => onStartAppointment?.(appointment)}
                      disabled={sessionLoading === appointment.id}
                      className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md ${sessionLoading === appointment.id
                          ? 'bg-[#94A3B8] cursor-not-allowed'
                          : isInProgress
                            ? 'bg-[#F59E0B] hover:bg-[#D97706]'
                            : 'bg-[#1C8B8F] hover:bg-[#14666A]'
                        } text-white`}
                    >
                      {sessionLoading === appointment.id ? (
                        <>
                          <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                          <span>جاري...</span>
                        </>
                      ) : isInProgress ? (
                        <>
                          <FaArrowRight className="w-3.5 h-3.5" />
                          <span>متابعة</span>
                        </>
                      ) : (
                        <>
                          <FaPlay className="w-3.5 h-3.5" />
                          <span>بدء الكشف</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default TodayAppointments;
