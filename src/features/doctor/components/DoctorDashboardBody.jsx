import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

/**
 * Doctor Dashboard Body Component
 * Displays statistics cards with modern design matching landing page
 * @component
 */
const DoctorDashboardBody = ({ stats, onStatClick }) => (
  <section className="mb-12" aria-labelledby="stats-heading">
    {/* Header */}
    <header className="text-center mb-8 sm:mb-10">
      <h1
        id="stats-heading"
        className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1F2E3C] mb-3 sm:mb-4"
      >
        لوحة التحكم الطبية
      </h1>
      <p className="text-[#64748B] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        نظرة شاملة على أداء عيادتك وإحصائيات المرضى اليومية
      </p>
    </header>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat) => (
        <article
          key={stat.id}
          className="group relative bg-white rounded-2xl border border-[#E7ECEF] p-6 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
          onClick={() => onStatClick?.(stat)}
          role="button"
          tabIndex={0}
          aria-label={`${stat.label}: ${stat.value}${stat.unit || ''}`}
          onKeyDown={(e) => e.key === 'Enter' && onStatClick?.(stat)}
        >
          {/* Top Indicator */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              backgroundImage: `linear-gradient(to right, ${stat.color || '#1C8B8F'}, ${stat.colorDark || '#14666A'})`
            }}
          ></div>

          {/* Content */}
          <div className="relative">
            {/* Icon and Trend Row */}
            <div className="flex items-start justify-between mb-6">
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: stat.bgColor || '#F0FDFA' }}
              >
                {stat.icon && <stat.icon className="w-6 h-6" style={{ color: stat.color || '#1C8B8F' }} />}
              </div>

              {/* Trend Badge */}
              {stat.trend && (
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${stat.trendUp
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-red-50 text-red-600'
                  }`}>
                  {stat.trendUp ? (
                    <FaArrowUp className="w-3 h-3" />
                  ) : (
                    <FaArrowDown className="w-3 h-3" />
                  )}
                  <span>{stat.trend}</span>
                </div>
              )}
            </div>

            {/* Value */}
            <div className="mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-[#1F2E3C]">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-lg font-bold text-[#64748B]">
                    {stat.unit}
                  </span>
                )}
              </div>
            </div>

            {/* Label and Description */}
            <div className="space-y-1">
              <h3 className="text-[#1F2E3C] font-bold text-base">
                {stat.label}
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          </div>

          {/* Hover Effect - Subtle Shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>
        </article>
      ))}
    </div>
  </section>
);

export default DoctorDashboardBody;
