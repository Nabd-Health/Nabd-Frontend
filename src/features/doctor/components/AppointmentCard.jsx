import React from 'react';
import {
  FaClock, FaPhone, FaCalendarCheck,
  FaStethoscope, FaCheckCircle, FaSpinner, FaDoorOpen,
  FaCalendarPlus, FaBan, FaPlay, FaArrowRight
} from 'react-icons/fa';
import { formatDate } from '@/utils/helpers';

/**
 * AppointmentCard Component - Clean & Professional
 * Matches the exact design system of TodayAppointments
 */
const AppointmentCard = ({ appointment, onStartAppointment, loading = false }) => {
  // Get patient initials
  const getInitials = () => {
    if (!appointment.patientName) return '؟';
    const names = appointment.patientName.split(' ');
    if (names.length >= 2) {
      return names[0].charAt(0) + names[names.length - 1].charAt(0);
    }
    return names[0].charAt(0);
  };

  // Status Badge Logic
  const getStatusBadge = () => {
    if (appointment.isCancelled) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-bold border border-red-100">
          <FaBan className="text-[10px]" />
          ملغي
        </span>
      );
    }

    if (appointment.apiStatus === 4) { // Completed
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
          <FaCheckCircle className="text-[10px]" />
          مكتمل
        </span>
      );
    }

    if (appointment.apiStatus === 3) { // InProgress
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FEF3C7] text-[#F59E0B] text-xs font-bold border border-[#F59E0B]/20 animate-pulse">
          <FaDoorOpen className="text-[10px]" />
          جاري الآن
        </span>
      );
    }

    // Default (Confirmed/Pending)
    const isRegular = appointment.status === 'كشف عام';
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${isRegular
          ? 'bg-[#F0FDFA] text-[#1C8B8F] border-[#1C8B8F]/20'
          : 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]/20'
        }`}>
        {isRegular ? <FaStethoscope className="text-[10px]" /> : <FaCalendarCheck className="text-[10px]" />}
        {appointment.status}
      </span>
    );
  };

  return (
    <article className={`group bg-white rounded-2xl p-5 border border-[#E7ECEF] hover:border-[#1C8B8F]/50 hover:shadow-md transition-all duration-300 flex flex-col h-full ${appointment.isCancelled ? 'opacity-75 grayscale-[0.5]' : ''
      }`}>
      {/* Header: Time & Status */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-[#1F2E3C]">
          <div className="w-8 h-8 rounded-lg bg-[#F0FDFA] flex items-center justify-center text-[#1C8B8F]">
            <FaClock className="text-sm" />
          </div>
          <span className="text-base font-bold font-mono pt-0.5">{appointment.time}</span>
        </div>
        {getStatusBadge()}
      </div>

      {/* Body: Patient Info */}
      <div className="flex items-start gap-4 mb-6 flex-1">
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 transition-colors ${appointment.isCancelled
            ? 'bg-gray-100 text-gray-400'
            : 'bg-gradient-to-br from-[#1C8B8F] to-[#14666A] text-white shadow-sm'
          }`}>
          {getInitials()}
        </div>

        <div className="min-w-0 pt-0.5">
          <h3 className="text-[#1F2E3C] font-bold text-base truncate mb-1 group-hover:text-[#1C8B8F] transition-colors">
            {appointment.patientName}
          </h3>

          {appointment.phoneNumber && (
            <div className="flex items-center gap-1.5 text-[#64748B] mb-2">
              <FaPhone className="text-[10px] transform flip-x" />
              <span className="text-xs font-medium dir-ltr font-mono">{appointment.phoneNumber}</span>
            </div>
          )}

          {/* Meta Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {appointment.appointmentDate && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#64748B] bg-[#F8FAFC] px-2 py-1 rounded border border-[#E7ECEF]">
                <FaCalendarPlus className="text-[#1C8B8F] text-[10px]" />
                {formatDate(appointment.appointmentDate, 'DD/MM/YYYY')}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#64748B] bg-[#F8FAFC] px-2 py-1 rounded border border-[#E7ECEF]">
              <FaClock className="text-[#1C8B8F] text-[10px]" />
              {appointment.duration} دقيقة
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Action Button */}
      <div className="mt-auto pt-4 border-t border-[#E7ECEF]">
        <button
          onClick={() => onStartAppointment?.(appointment)}
          disabled={loading || appointment.isCancelled}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${loading
              ? 'bg-[#94A3B8] text-white cursor-not-allowed'
              : appointment.isCancelled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                : appointment.apiStatus === 4 // Completed
                  ? 'bg-[#F0FDFA] text-[#1C8B8F] hover:bg-[#1C8B8F] hover:text-white border border-[#1C8B8F]/20'
                  : appointment.apiStatus === 3 // InProgress
                    ? 'bg-[#F59E0B] text-white hover:bg-[#D97706] shadow-sm hover:shadow-md'
                    : 'bg-[#1C8B8F] text-white hover:bg-[#14666A] shadow-sm hover:shadow-md'
            }`}
        >
          {loading ? (
            <FaSpinner className="animate-spin" />
          ) : appointment.isCancelled ? (
            <FaBan />
          ) : appointment.apiStatus === 4 ? (
            <FaCheckCircle />
          ) : appointment.apiStatus === 3 ? (
            <FaArrowRight />
          ) : (
            <FaPlay className="text-xs" />
          )}

          <span>
            {loading
              ? 'جاري التحميل...'
              : appointment.isCancelled
                ? 'تم الإلغاء'
                : appointment.apiStatus === 4
                  ? 'عرض التفاصيل'
                  : appointment.apiStatus === 3
                    ? 'متابعة الجلسة'
                    : 'بدء الجلسة'
            }
          </span>
        </button>
      </div>
    </article>
  );
};

export default AppointmentCard;
