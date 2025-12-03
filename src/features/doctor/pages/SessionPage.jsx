import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FaArrowRight, FaUser, FaClock, FaPhone, FaStethoscope, FaNotesMedical,
    FaRobot, FaCheck, FaTimes, FaSave, FaSpinner, FaFileMedical, FaPrescriptionBottle,
    FaFlask, FaPlus, FaTrash, FaPrint, FaHistory, FaAllergies, FaHeartbeat,
    FaPills, FaSyringe
} from 'react-icons/fa';
import { useSessionStore } from '../stores/sessionStore';
import { useSessionManager } from '../hooks/useSessionManager';
import useAuth from '@/features/auth/hooks/useAuth';

/**
 * SessionPage - صفحة الجلسة الطبية الشاملة
 */
const SessionPage = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { startOrResumeSession } = useSessionManager();
    const { currentSession, patientInfo, patientMedicalRecord, fetchPatientMedicalRecord, addDocumentation, endSession, createPrescription } = useSessionStore();

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('symptoms'); // symptoms, medical-record, prescription, lab-tests

    // Symptoms & Diagnosis
    const [symptoms, setSymptoms] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [aiDiagnosis, setAiDiagnosis] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [aiConfirmation, setAiConfirmation] = useState(null);

    // Prescription
    const [medications, setMedications] = useState([]);
    const [generalInstructions, setGeneralInstructions] = useState('');

    const [saving, setSaving] = useState(false);

    // تحميل بيانات الجلسة والملف الطبي
    useEffect(() => {
        const loadSession = async () => {
            setLoading(true);
            const result = await startOrResumeSession({ id: appointmentId });

            if (!result.success) {
                alert(result.error);
                navigate('/doctor/appointments');
                return;
            }

            // تحميل الملف الطبي
            if (patientInfo?.patientId) {
                await fetchPatientMedicalRecord();
            }

            setLoading(false);
        };

        loadSession();
    }, [appointmentId]);

    // طلب تشخيص من الذكاء الاصطناعي
    const handleAiDiagnosis = async () => {
        if (!symptoms.trim()) {
            alert('يرجى إدخال أعراض المريض أولاً');
            return;
        }

        setAiLoading(true);

        setTimeout(() => {
            const mockAiResponse = `بناءً على الأعراض المذكورة: "${symptoms}"
      
التشخيص المحتمل:
• احتمالية الإصابة بالتهاب الجهاز التنفسي العلوي
• قد يكون هناك عدوى فيروسية خفيفة

التوصيات:
• فحص درجة الحرارة
• فحص الحلق والأذن
• قد يحتاج المريض لفحص مخبري إذا استمرت الأعراض

ملاحظة: هذا تشخيص أولي ويجب تأكيده من قبل الطبيب`;

            setAiDiagnosis(mockAiResponse);
            setAiLoading(false);
        }, 2000);
    };

    // إضافة دواء للروشتة
    const addMedication = () => {
        setMedications([...medications, {
            id: Date.now(),
            name: '',
            dosage: '',
            frequency: '',
            duration: '',
            instructions: ''
        }]);
    };

    // حذف دواء
    const removeMedication = (id) => {
        setMedications(medications.filter(med => med.id !== id));
    };

    // تحديث بيانات دواء
    const updateMedication = (id, field, value) => {
        setMedications(medications.map(med =>
            med.id === id ? { ...med, [field]: value } : med
        ));
    };

    // حفظ الروشتة
    const handleSavePrescription = async () => {
        if (medications.length === 0) {
            alert('يرجى إضافة دواء واحد على الأقل');
            return;
        }

        setSaving(true);

        const prescriptionData = {
            appointmentId: appointmentId,
            doctorId: user?.id,
            patientId: patientInfo?.patientId,
            medications: medications.map(med => ({
                medicationId: '00000000-0000-0000-0000-000000000000',
                dosage: med.dosage,
                frequency: med.frequency,
                durationDays: parseInt(med.duration) || 7,
                specialInstructions: med.instructions
            })),
            generalInstructions: generalInstructions
        };

        const result = await createPrescription(prescriptionData);

        if (result.success) {
            alert('✅ تم حفظ الروشتة بنجاح');
        } else {
            alert('❌ فشل حفظ الروشتة: ' + result.error);
        }

        setSaving(false);
    };

    // حفظ التوثيق
    const handleSave = async () => {
        if (!symptoms.trim() || !diagnosis.trim()) {
            alert('يرجى إدخال الأعراض والتشخيص');
            return;
        }

        setSaving(true);

        const documentationData = {
            chiefComplaint: symptoms,
            diagnosis: diagnosis,
            aiDiagnosisUsed: aiDiagnosis ? true : false,
            aiDiagnosisConfirmation: aiConfirmation,
            sessionType: 1
        };

        const result = await addDocumentation(documentationData);

        if (result.success) {
            alert('✅ تم حفظ التوثيق بنجاح');
        } else {
            alert('❌ فشل حفظ التوثيق: ' + result.error);
        }

        setSaving(false);
    };

    // إنهاء الجلسة
    const handleEndSession = async () => {
        if (window.confirm('هل تريد إنهاء الجلسة؟')) {
            const result = await endSession();
            if (result.success) {
                navigate('/doctor/appointments');
            }
        }
    };

    // طباعة الروشتة
    const handlePrintPrescription = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-[#1C8B8F] mx-auto mb-4" />
                    <p className="text-[#64748B]">جاري تحميل بيانات الجلسة...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]" dir="rtl">
            {/* Header */}
            <div className="bg-white border-b border-[#E7ECEF] sticky top-0 z-10 shadow-sm print:hidden">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/doctor/appointments')}
                                className="w-10 h-10 rounded-xl bg-[#F8FAFC] hover:bg-[#F0FDFA] flex items-center justify-center text-[#64748B] hover:text-[#1C8B8F] transition-colors"
                            >
                                <FaArrowRight />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-[#1F2E3C]">جلسة كشف طبي</h1>
                                <p className="text-sm text-[#64748B]">معرف الموعد: {appointmentId}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-5 py-2.5 bg-[#1C8B8F] hover:bg-[#14666A] text-white rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                            >
                                {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                                حفظ
                            </button>
                            <button
                                onClick={handleEndSession}
                                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors"
                            >
                                إنهاء الجلسة
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 py-8 max-w-7xl">
                {/* Patient Info Card */}
                <div className="bg-white rounded-2xl border border-[#E7ECEF] p-6 mb-6 shadow-sm">
                    <h2 className="text-lg font-bold text-[#1F2E3C] mb-4 flex items-center gap-2">
                        <FaUser className="text-[#1C8B8F]" />
                        معلومات المريض
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1C8B8F] to-[#14666A] flex items-center justify-center text-white font-bold text-lg">
                                {patientInfo?.patientFullName?.charAt(0) || '؟'}
                            </div>
                            <div>
                                <p className="text-xs text-[#64748B]">اسم المريض</p>
                                <p className="font-bold text-[#1F2E3C]">{patientInfo?.patientFullName || 'غير متوفر'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#1C8B8F]">
                                <FaPhone />
                            </div>
                            <div>
                                <p className="text-xs text-[#64748B]">رقم الهاتف</p>
                                <p className="font-bold text-[#1F2E3C]">{patientInfo?.phoneNumber || 'غير متوفر'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#1C8B8F]">
                                <FaClock />
                            </div>
                            <div>
                                <p className="text-xs text-[#64748B]">مدة الجلسة</p>
                                <p className="font-bold text-[#1F2E3C]">{currentSession?.durationMinutes || 30} دقيقة</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl border border-[#E7ECEF] mb-6 shadow-sm print:hidden">
                    <div className="flex border-b border-[#E7ECEF] overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('symptoms')}
                            className={`flex-1 px-6 py-4 font-bold text-sm transition-colors flex items-center justify-center gap-2 ${activeTab === 'symptoms'
                                    ? 'text-[#1C8B8F] border-b-2 border-[#1C8B8F] bg-[#F0FDFA]'
                                    : 'text-[#64748B] hover:text-[#1C8B8F] hover:bg-[#F8FAFC]'
                                }`}
                        >
                            <FaStethoscope />
                            الأعراض والتشخيص
                        </button>
                        <button
                            onClick={() => setActiveTab('medical-record')}
                            className={`flex-1 px-6 py-4 font-bold text-sm transition-colors flex items-center justify-center gap-2 ${activeTab === 'medical-record'
                                    ? 'text-[#1C8B8F] border-b-2 border-[#1C8B8F] bg-[#F0FDFA]'
                                    : 'text-[#64748B] hover:text-[#1C8B8F] hover:bg-[#F8FAFC]'
                                }`}
                        >
                            <FaFileMedical />
                            الملف الطبي
                        </button>
                        <button
                            onClick={() => setActiveTab('prescription')}
                            className={`flex-1 px-6 py-4 font-bold text-sm transition-colors flex items-center justify-center gap-2 ${activeTab === 'prescription'
                                    ? 'text-[#1C8B8F] border-b-2 border-[#1C8B8F] bg-[#F0FDFA]'
                                    : 'text-[#64748B] hover:text-[#1C8B8F] hover:bg-[#F8FAFC]'
                                }`}
                        >
                            <FaPrescriptionBottle />
                            كتابة روشتة
                        </button>
                        <button
                            onClick={() => setActiveTab('lab-tests')}
                            className={`flex-1 px-6 py-4 font-bold text-sm transition-colors flex items-center justify-center gap-2 ${activeTab === 'lab-tests'
                                    ? 'text-[#1C8B8F] border-b-2 border-[#1C8B8F] bg-[#F0FDFA]'
                                    : 'text-[#64748B] hover:text-[#1C8B8F] hover:bg-[#F8FAFC]'
                                }`}
                        >
                            <FaFlask />
                            طلب تحاليل
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'symptoms' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Symptoms & Diagnosis */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Symptoms Section */}
                            <div className="bg-white rounded-2xl border border-[#E7ECEF] p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-[#1F2E3C] mb-4 flex items-center gap-2">
                                    <FaStethoscope className="text-[#1C8B8F]" />
                                    أعراض المريض
                                </h2>

                                <textarea
                                    value={symptoms}
                                    onChange={(e) => setSymptoms(e.target.value)}
                                    placeholder="اكتب أعراض المريض هنا..."
                                    className="w-full h-40 p-4 bg-[#F8FAFC] border border-[#E7ECEF] rounded-xl text-[#1F2E3C] placeholder-[#94A3B8] focus:border-[#1C8B8F] focus:ring-0 resize-none"
                                />

                                <button
                                    onClick={handleAiDiagnosis}
                                    disabled={aiLoading || !symptoms.trim()}
                                    className="mt-4 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {aiLoading ? <FaSpinner className="animate-spin" /> : <FaRobot />}
                                    {aiLoading ? 'جاري التحليل...' : 'احصل على تشخيص الذكاء الاصطناعي'}
                                </button>
                            </div>

                            {/* Doctor's Diagnosis Section */}
                            <div className="bg-white rounded-2xl border border-[#E7ECEF] p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-[#1F2E3C] mb-4 flex items-center gap-2">
                                    <FaNotesMedical className="text-[#1C8B8F]" />
                                    تشخيص الطبيب
                                </h2>

                                <textarea
                                    value={diagnosis}
                                    onChange={(e) => setDiagnosis(e.target.value)}
                                    placeholder="اكتب تشخيصك للحالة..."
                                    className="w-full h-40 p-4 bg-[#F8FAFC] border border-[#E7ECEF] rounded-xl text-[#1F2E3C] placeholder-[#94A3B8] focus:border-[#1C8B8F] focus:ring-0 resize-none"
                                />
                            </div>
                        </div>

                        {/* Right Column - AI Assistant */}
                        <div className="lg:col-span-1">
                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100 p-6 shadow-sm sticky top-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                                        <FaRobot className="text-xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-[#1F2E3C]">مساعد الذكاء الاصطناعي</h2>
                                        <p className="text-xs text-[#64748B]">تشخيص تلقائي للمساعدة</p>
                                    </div>
                                </div>

                                {aiDiagnosis ? (
                                    <div className="space-y-4">
                                        <div className="bg-white rounded-xl p-4 border border-purple-100 max-h-96 overflow-y-auto">
                                            <p className="text-sm text-[#1F2E3C] whitespace-pre-line leading-relaxed">
                                                {aiDiagnosis}
                                            </p>
                                        </div>

                                        {/* AI Confirmation */}
                                        <div className="bg-white rounded-xl p-4 border border-purple-100">
                                            <p className="text-sm font-bold text-[#1F2E3C] mb-3">هل التشخيص صحيح؟</p>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => setAiConfirmation('correct')}
                                                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${aiConfirmation === 'correct'
                                                            ? 'bg-emerald-500 text-white'
                                                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                                        }`}
                                                >
                                                    <FaCheck className="inline mr-2" />
                                                    صحيح
                                                </button>
                                                <button
                                                    onClick={() => setAiConfirmation('incorrect')}
                                                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${aiConfirmation === 'incorrect'
                                                            ? 'bg-red-500 text-white'
                                                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                                                        }`}
                                                >
                                                    <FaTimes className="inline mr-2" />
                                                    خطأ
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 rounded-full bg-white/50 flex items-center justify-center mx-auto mb-4">
                                            <FaRobot className="text-3xl text-purple-400" />
                                        </div>
                                        <p className="text-sm text-[#64748B]">
                                            اكتب أعراض المريض واضغط على زر "احصل على تشخيص الذكاء الاصطناعي" للحصول على مساعدة تلقائية
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'medical-record' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Chronic Diseases */}
                        <div className="bg-white rounded-2xl border border-[#E7ECEF] p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-[#1F2E3C] mb-4 flex items-center gap-2">
                                <FaHeartbeat className="text-red-500" />
                                الأمراض المزمنة
                            </h3>
                            {patientMedicalRecord?.chronicDiseases?.length > 0 ? (
                                <ul className="space-y-2">
                                    {patientMedicalRecord.chronicDiseases.map((disease, index) => (
                                        <li key={index} className="flex items-center gap-2 p-3 bg-red-50 rounded-xl">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            <span className="text-[#1F2E3C] font-medium">{disease.diseaseName}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-[#94A3B8] text-center py-8">لا توجد أمراض مزمنة مسجلة</p>
                            )}
                        </div>

                        {/* Allergies */}
                        <div className="bg-white rounded-2xl border border-[#E7ECEF] p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-[#1F2E3C] mb-4 flex items-center gap-2">
                                <FaAllergies className="text-orange-500" />
                                الحساسية من الأدوية
                            </h3>
                            {patientMedicalRecord?.drugAllergies?.length > 0 ? (
                                <ul className="space-y-2">
                                    {patientMedicalRecord.drugAllergies.map((allergy, index) => (
                                        <li key={index} className="flex items-center gap-2 p-3 bg-orange-50 rounded-xl">
                                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                            <span className="text-[#1F2E3C] font-medium">{allergy.drugName}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-[#94A3B8] text-center py-8">لا توجد حساسية مسجلة</p>
                            )}
                        </div>

                        {/* Current Medications */}
                        <div className="bg-white rounded-2xl border border-[#E7ECEF] p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-[#1F2E3C] mb-4 flex items-center gap-2">
                                <FaPills className="text-blue-500" />
                                الأدوية الحالية
                            </h3>
                            {patientMedicalRecord?.currentMedications?.length > 0 ? (
                                <ul className="space-y-2">
                                    {patientMedicalRecord.currentMedications.map((med, index) => (
                                        <li key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            <span className="text-[#1F2E3C] font-medium">{med.medicationName}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-[#94A3B8] text-center py-8">لا توجد أدوية حالية</p>
                            )}
                        </div>

                        {/* Previous Surgeries */}
                        <div className="bg-white rounded-2xl border border-[#E7ECEF] p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-[#1F2E3C] mb-4 flex items-center gap-2">
                                <FaSyringe className="text-purple-500" />
                                العمليات الجراحية السابقة
                            </h3>
                            {patientMedicalRecord?.previousSurgeries?.length > 0 ? (
                                <ul className="space-y-2">
                                    {patientMedicalRecord.previousSurgeries.map((surgery, index) => (
                                        <li key={index} className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl">
                                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                            <span className="text-[#1F2E3C] font-medium">{surgery.surgeryName}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-[#94A3B8] text-center py-8">لا توجد عمليات سابقة</p>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'prescription' && (
                    <div className="space-y-6">
                        {/* Digital Prescription */}
                        <div className="bg-white rounded-2xl border-2 border-[#1C8B8F] p-8 shadow-lg" id="prescription-print">
                            {/* Prescription Header */}
                            <div className="border-b-2 border-[#1C8B8F] pb-6 mb-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#1C8B8F] mb-2">روشتة طبية</h2>
                                        <p className="text-sm text-[#64748B]">Medical Prescription</p>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm text-[#64748B]">التاريخ</p>
                                        <p className="font-bold text-[#1F2E3C]">{new Date().toLocaleDateString('ar-EG')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Doctor Info */}
                            <div className="bg-[#F0FDFA] rounded-xl p-4 mb-6">
                                <h3 className="font-bold text-[#1C8B8F] mb-3">بيانات الطبيب</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="text-[#64748B]">الاسم: </span>
                                        <span className="font-bold text-[#1F2E3C]">{user?.fullName || 'د. محمد أحمد'}</span>
                                    </div>
                                    <div>
                                        <span className="text-[#64748B]">التخصص: </span>
                                        <span className="font-bold text-[#1F2E3C]">{user?.specialization || 'طب عام'}</span>
                                    </div>
                                    <div>
                                        <span className="text-[#64748B]">العنوان: </span>
                                        <span className="font-bold text-[#1F2E3C]">{user?.clinicAddress || 'القاهرة، مصر'}</span>
                                    </div>
                                    <div>
                                        <span className="text-[#64748B]">الهاتف: </span>
                                        <span className="font-bold text-[#1F2E3C]">{user?.phoneNumber || '01234567890'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Patient Info */}
                            <div className="bg-[#F8FAFC] rounded-xl p-4 mb-6">
                                <h3 className="font-bold text-[#1F2E3C] mb-3">بيانات المريض</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="text-[#64748B]">الاسم: </span>
                                        <span className="font-bold text-[#1F2E3C]">{patientInfo?.patientFullName}</span>
                                    </div>
                                    <div>
                                        <span className="text-[#64748B]">الهاتف: </span>
                                        <span className="font-bold text-[#1F2E3C]">{patientInfo?.phoneNumber}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Medications List */}
                            <div className="mb-6">
                                <h3 className="font-bold text-[#1F2E3C] mb-4 flex items-center gap-2">
                                    <FaPrescriptionBottle className="text-[#1C8B8F]" />
                                    الأدوية الموصوفة
                                </h3>

                                <div className="space-y-3 mb-4">
                                    {medications.map((med, index) => (
                                        <div key={med.id} className="border border-[#E7ECEF] rounded-xl p-4 print:border-[#1C8B8F]">
                                            <div className="flex items-start justify-between mb-3">
                                                <span className="font-bold text-[#1C8B8F]">#{index + 1}</span>
                                                <button
                                                    onClick={() => removeMedication(med.id)}
                                                    className="text-red-500 hover:text-red-700 print:hidden"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="اسم الدواء"
                                                    value={med.name}
                                                    onChange={(e) => updateMedication(med.id, 'name', e.target.value)}
                                                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E7ECEF] rounded-lg text-[#1F2E3C] placeholder-[#94A3B8] focus:border-[#1C8B8F] focus:ring-0 print:border-0 print:bg-transparent"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="الجرعة (مثال: 500mg)"
                                                    value={med.dosage}
                                                    onChange={(e) => updateMedication(med.id, 'dosage', e.target.value)}
                                                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E7ECEF] rounded-lg text-[#1F2E3C] placeholder-[#94A3B8] focus:border-[#1C8B8F] focus:ring-0 print:border-0 print:bg-transparent"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="عدد المرات (مثال: 3 مرات يومياً)"
                                                    value={med.frequency}
                                                    onChange={(e) => updateMedication(med.id, 'frequency', e.target.value)}
                                                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E7ECEF] rounded-lg text-[#1F2E3C] placeholder-[#94A3B8] focus:border-[#1C8B8F] focus:ring-0 print:border-0 print:bg-transparent"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="المدة (بالأيام)"
                                                    value={med.duration}
                                                    onChange={(e) => updateMedication(med.id, 'duration', e.target.value)}
                                                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E7ECEF] rounded-lg text-[#1F2E3C] placeholder-[#94A3B8] focus:border-[#1C8B8F] focus:ring-0 print:border-0 print:bg-transparent"
                                                />
                                            </div>

                                            <textarea
                                                placeholder="تعليمات خاصة (اختياري)"
                                                value={med.instructions}
                                                onChange={(e) => updateMedication(med.id, 'instructions', e.target.value)}
                                                className="w-full mt-3 px-3 py-2 bg-[#F8FAFC] border border-[#E7ECEF] rounded-lg text-[#1F2E3C] placeholder-[#94A3B8] focus:border-[#1C8B8F] focus:ring-0 resize-none print:border-0 print:bg-transparent"
                                                rows="2"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={addMedication}
                                    className="w-full py-3 border-2 border-dashed border-[#1C8B8F] rounded-xl text-[#1C8B8F] font-bold hover:bg-[#F0FDFA] transition-colors flex items-center justify-center gap-2 print:hidden"
                                >
                                    <FaPlus />
                                    إضافة دواء
                                </button>
                            </div>

                            {/* General Instructions */}
                            <div className="mb-6">
                                <h3 className="font-bold text-[#1F2E3C] mb-3">تعليمات عامة</h3>
                                <textarea
                                    value={generalInstructions}
                                    onChange={(e) => setGeneralInstructions(e.target.value)}
                                    placeholder="اكتب التعليمات العامة للمريض..."
                                    className="w-full h-24 p-4 bg-[#F8FAFC] border border-[#E7ECEF] rounded-xl text-[#1F2E3C] placeholder-[#94A3B8] focus:border-[#1C8B8F] focus:ring-0 resize-none print:border-0 print:bg-transparent"
                                />
                            </div>

                            {/* Signature */}
                            <div className="border-t-2 border-[#E7ECEF] pt-6 mt-6">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-sm text-[#64748B] mb-2">توقيع الطبيب</p>
                                        <div className="w-48 border-b-2 border-[#1C8B8F] pb-2">
                                            <p className="font-bold text-[#1C8B8F]">{user?.fullName || 'د. محمد أحمد'}</p>
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs text-[#94A3B8]">روشتة رقمية - نبض</p>
                                        <p className="text-xs text-[#94A3B8]">Digital Prescription - Nabd</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 print:hidden">
                            <button
                                onClick={handleSavePrescription}
                                disabled={saving || medications.length === 0}
                                className="flex-1 px-6 py-3 bg-[#1C8B8F] hover:bg-[#14666A] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                            >
                                {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                                حفظ الروشتة
                            </button>
                            <button
                                onClick={handlePrintPrescription}
                                disabled={medications.length === 0}
                                className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                            >
                                <FaPrint />
                                طباعة الروشتة
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'lab-tests' && (
                    <div className="bg-white rounded-2xl border border-[#E7ECEF] p-8 shadow-sm">
                        <div className="text-center py-16">
                            <div className="w-20 h-20 rounded-full bg-[#F0FDFA] flex items-center justify-center mx-auto mb-4">
                                <FaFlask className="text-3xl text-[#1C8B8F]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1F2E3C] mb-2">طلب التحاليل الطبية</h3>
                            <p className="text-[#64748B]">هذه الميزة قيد التطوير</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Print Styles */}
            <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #prescription-print, #prescription-print * {
            visibility: visible;
          }
          #prescription-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
};

export default SessionPage;
