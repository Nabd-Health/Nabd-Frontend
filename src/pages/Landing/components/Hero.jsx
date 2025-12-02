import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Shield, Clock, Sparkles, User, Stethoscope, Heart } from 'lucide-react';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#FFFFFF]">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#1C8B8F 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="text-center lg:text-right space-y-8">
                    <span className="bg-[#1C8B8F]/10 text-[#14666A] border border-[#1C8B8F]/20 px-4 py-1.5 rounded-full text-sm font-bold inline-flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        الجيل الجديد من الرعاية الصحية
                    </span>

                    <h1 className="text-5xl lg:text-7xl font-black leading-tight text-[#1F2E3C]">
                        صحتك في <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C8B8F] to-[#14666A]">
                            أيدٍ ذكية
                        </span> وآمنة
                    </h1>

                    <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        نظام بيئي متكامل يربطك بأفضل الأطباء، يحتفظ بسجلك الطبي، ويستخدم الذكاء الاصطناعي لدعم التشخيص بدقة متناهية.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <button className="px-8 py-4 bg-[#1F2E3C] text-white rounded-2xl font-bold hover:bg-[#14666A] transition flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            onClick={() => navigate('/register')}
                        >
                            <User className="w-5 h-5" />
                            أنا مريض
                        </button>
                        <button className="px-8 py-4 bg-white text-[#1C8B8F] border-2 border-[#1C8B8F]/20 rounded-2xl font-bold hover:bg-[#1C8B8F]/5 transition flex items-center justify-center gap-3"
                            onClick={() => navigate('/register')}
                        >
                            <Stethoscope className="w-5 h-5" />
                            أنا طبيب
                        </button>
                    </div>

                    <div className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-400 font-bold">
                        <span className="flex items-center gap-2"><Shield className="w-5 h-5 text-[#1C8B8F]" /> آمن وموثوق</span>
                        <span className="flex items-center gap-2"><Activity className="w-5 h-5 text-[#1C8B8F]" /> تشخيص ذكي</span>
                        <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-[#1C8B8F]" /> حجز فوري</span>
                    </div>
                </div>

                {/* Visual Content */}
                <div className="relative hidden lg:block">
                    {/* Blobs */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-[#1C8B8F]/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#1F2E3C]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                    {/* Main Card */}
                    <div className="relative bg-white border border-[#E7ECEF] rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition duration-500">
                        {/* Header of Card */}
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="h-2 w-24 bg-gray-100 rounded-full"></div>
                        </div>

                        {/* Doctor/AI Interaction */}
                        <div className="flex gap-4 mb-8">
                            <div className="w-16 h-16 bg-[#1C8B8F]/10 rounded-2xl flex items-center justify-center text-[#1C8B8F]">
                                <Activity className="w-8 h-8" />
                            </div>
                            <div className="flex-1 space-y-3">
                                <div className="h-3 w-1/3 bg-gray-200 rounded-full"></div>
                                <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                                <div className="h-2 w-5/6 bg-gray-100 rounded-full"></div>
                            </div>
                        </div>

                        {/* AI Suggestion Box */}
                        <div className="bg-gradient-to-r from-[#1C8B8F]/5 to-[#14666A]/5 border-r-4 border-[#1C8B8F] p-5 rounded-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-[#1C8B8F]" />
                                <span className="text-xs font-bold text-[#14666A]">اقتراح الذكاء الاصطناعي</span>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-3/4 bg-[#1C8B8F]/20 rounded-full"></div>
                                <div className="h-2 w-1/2 bg-[#1C8B8F]/20 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-lg border border-[#E7ECEF]">
                        <Heart className="w-8 h-8 text-red-500 fill-current animate-heartbeat" />
                    </div>

                    {/* ECG Pulse Line */}
                    <div className="absolute top-1/3 -left-12 bg-white px-6 py-3 rounded-xl shadow-lg border border-[#E7ECEF]">
                        <div className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-[#1C8B8F] animate-pulse-line" />
                            <div className="flex items-center gap-1">
                                <div className="w-1 h-8 bg-[#1C8B8F] rounded animate-pulse-line"></div>
                                <div className="w-1 h-4 bg-[#1C8B8F] rounded animate-pulse-line delay-500"></div>
                                <div className="w-1 h-10 bg-[#1C8B8F] rounded animate-pulse-line"></div>
                                <div className="w-1 h-3 bg-[#1C8B8F] rounded animate-pulse-line delay-500"></div>
                                <div className="w-1 h-6 bg-[#1C8B8F] rounded animate-pulse-line"></div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-8 -right-8 bg-[#1F2E3C] p-4 rounded-2xl shadow-lg text-white">
                        <div className="text-xs opacity-75">عدد الأطباء</div>
                        <div className="text-xl font-bold">+500</div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
