import React, { useState, useEffect } from 'react';
import { useServices } from '../hooks/useServices';
import ServiceCard from './ServiceCard';
import {
  FaStethoscope,
  FaRedoAlt,
  FaDollarSign,
  FaInfoCircle
} from 'react-icons/fa';

/**
 * ServicesSection Component
 * 
 * Features:
 * - Regular checkup service management
 * - Re-examination service management
 * - Edit mode toggle
 * - Validation
 * - Success/Error feedback
 */
const ServicesSection = () => {
  const {
    regularCheckup,
    reExamination,
    loading,
    error,
    success,
    updateRegularCheckup,
    updateReExamination,
    clearErrors,
  } = useServices({ autoFetch: true });

  // Local state for form values
  // Duration is SHARED between all services
  const [sharedDuration, setSharedDuration] = useState(null);

  const [regularCheckupData, setRegularCheckupData] = useState({
    price: null,
  });

  const [reExaminationData, setReExaminationData] = useState({
    price: null,
  });

  // Sync store data to local state
  useEffect(() => {
    setRegularCheckupData({
      price: regularCheckup.price,
    });
    // Set shared duration from regularCheckup (or reExamination if regularCheckup is null)
    if (regularCheckup.duration !== null) {
      setSharedDuration(regularCheckup.duration);
    } else if (reExamination.duration !== null) {
      setSharedDuration(reExamination.duration);
    }
  }, [regularCheckup, reExamination]);

  useEffect(() => {
    setReExaminationData({
      price: reExamination.price,
    });
  }, [reExamination]);

  // Validation
  const isValid = () => {
    const regularValid = regularCheckupData.price > 0;
    const reExamValid = reExaminationData.price > 0;
    const durationValid = sharedDuration >= 5 && sharedDuration <= 120;

    return regularValid && reExamValid && durationValid;
  };

  // Auto-save effect - saves after 3 seconds of inactivity
  useEffect(() => {
    // Skip if data is not loaded yet
    if (regularCheckupData.price === null || reExaminationData.price === null || sharedDuration === null) {
      return;
    }

    // Skip if data is invalid
    if (!isValid()) {
      return;
    }

    // Check if data has changed
    const regularChanged = regularCheckupData.price !== regularCheckup.price;
    const reExamChanged = reExaminationData.price !== reExamination.price;
    const durationChanged = sharedDuration !== regularCheckup.duration && sharedDuration !== reExamination.duration;

    if (!regularChanged && !reExamChanged && !durationChanged) {
      return;
    }

    // Auto-save after 3 seconds
    const timer = setTimeout(async () => {
      try {
        await Promise.allSettled([
          updateRegularCheckup({ ...regularCheckupData, duration: sharedDuration }),
          updateReExamination({ ...reExaminationData, duration: sharedDuration }),
        ]);
      } catch (error) {
        console.error('Auto-save error:', error);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [regularCheckupData, reExaminationData, sharedDuration]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E7ECEF] overflow-hidden">
      {/* Section Header */}
      <div className="bg-[#1C8B8F] px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <FaDollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">الخدمات والأسعار</h3>
              <p className="text-white/80 text-sm">
                إدارة أسعار الخدمات الطبية ومدة الجلسات
              </p>
            </div>
          </div>

          {/* Action Buttons - Removed for auto-save */}
          <div className="flex items-center gap-3">
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Success Messages */}
        {(success.regularCheckup || success.reExamination) && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-green-700 font-medium">
              ✅ {success.regularCheckup || success.reExamination}
            </p>
          </div>
        )}

        {/* Error Messages */}
        {(error.regularCheckup || error.reExamination) && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700 font-medium">
              ❌ {error.regularCheckup || error.reExamination}
            </p>
          </div>
        )}

        {/* Shared Duration Input */}
        <div className="bg-[#F0FDFA] border-2 border-[#1C8B8F]/20 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#1C8B8F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaInfoCircle className="w-6 h-6 text-[#1C8B8F]" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-[#1F2E3C] mb-2">مدة الجلسة الموحدة</h4>
              <p className="text-sm text-slate-600 mb-4">
                المدة التي تحددها هنا ستُطبق على جميع أنواع الكشف (الكشف العادي وإعادة الكشف)
              </p>
              <div className="max-w-xs">
                <label className="block text-sm font-medium text-[#1F2E3C] mb-2">
                  مدة الجلسة المتوقعة <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="5"
                    max="120"
                    step="5"
                    value={sharedDuration || ''}
                    onChange={(e) => setSharedDuration(parseFloat(e.target.value) || null)}
                    disabled={loading.regularCheckup || loading.reExamination}
                    placeholder="أدخل مدة الجلسة"
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 text-left border-[#E7ECEF] focus:border-[#1C8B8F] focus:ring-2 focus:ring-[#1C8B8F]/20 ${!sharedDuration ? 'border-red-300' : ''}`}
                    dir="ltr"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">
                    دقيقة
                  </span>
                </div>
                {!sharedDuration && (
                  <p className="text-xs text-red-500 mt-1">يجب إدخال مدة الجلسة</p>
                )}
                {sharedDuration && (sharedDuration < 5 || sharedDuration > 120) && (
                  <p className="text-xs text-orange-500 mt-1">المدة يجب أن تكون بين 5 و 120 دقيقة</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Regular Checkup */}
          <ServiceCard
            title="الكشف العادي"
            description="الكشف الطبي الأولي والتشخيص"
            icon={FaStethoscope}
            gradientFrom="from-[#F8FAFC]"
            gradientTo="to-[#F8FAFC]"
            iconBg="bg-[#E0F2FE]"
            iconColor="text-[#0284C7]"
            price={regularCheckupData.price}
            duration={sharedDuration}
            onPriceChange={(value) => setRegularCheckupData(prev => ({ ...prev, price: value }))}
            onDurationChange={null}
            isEditing={true}
            loading={loading.regularCheckup}
            hideDuration={true}
          />

          {/* Re-examination */}
          <ServiceCard
            title="إعادة الكشف"
            description="المتابعة والكشف الدوري"
            icon={FaRedoAlt}
            gradientFrom="from-[#F8FAFC]"
            gradientTo="to-[#F8FAFC]"
            iconBg="bg-[#F3E8FF]"
            iconColor="text-[#9333EA]"
            price={reExaminationData.price}
            duration={sharedDuration}
            onPriceChange={(value) => setReExaminationData(prev => ({ ...prev, price: value }))}
            onDurationChange={null}
            isEditing={true}
            loading={loading.reExamination}
            hideDuration={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;