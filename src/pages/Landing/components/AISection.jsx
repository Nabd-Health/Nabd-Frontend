import React from 'react';
import { Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

const AISection = () => {
    return (
        <section id="ai-section" className="py-24 bg-[#1F2E3C] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                <div className="absolute top-10 left-10 w-64 h-64 bg-[#1C8B8F] rounded-full blur-[100px]"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#14666A] rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C8B8F]/20 text-[#1C8B8F] border border-[#1C8B8F]/30 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-bold">مدعوم بالذكاء الاصطناعي</span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                            تشخيص أدق، <br />
                            <span className="text-[#1C8B8F]">رعاية أسرع</span>
                        </h2>

                        <p className="text-white text-lg leading-relaxed">
                            يستخدم نبض خوارزميات متقدمة لتحليل الأعراض والتاريخ الطبي، مما يساعد الأطباء في الوصول إلى التشخيص الصحيح بسرعة ودقة، ويقلل من الأخطاء البشرية.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "تحليل فوري للأعراض والعلامات الحيوية",
                                "اقتراح التشخيصات المحتملة بناءً على ملايين الحالات",
                                "تنبيهات للتفاعلات الدوائية الخطيرة",
                                "متابعة ذكية لحالة المريض بعد العلاج"
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3 text-white">
                                    <CheckCircle className="w-5 h-5 text-[#1C8B8F] flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="mt-8 px-8 py-4 bg-[#1C8B8F] text-white rounded-xl font-bold hover:bg-[#14666A] transition flex items-center gap-2 group">
                            جرب النموذج الطبي
                            <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition" />
                        </button>
                    </div>

                    {/* Visual */}
                    <div className="relative">
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
                            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                                <div className="w-12 h-12 bg-[#1C8B8F] rounded-full flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">تحليل الأعراض</h3>
                                    <p className="text-white text-sm">جاري المعالجة...</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white">احتمالية التشخيص</span>
                                        <span className="text-[#1C8B8F] font-bold">95%</span>
                                    </div>
                                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#1C8B8F] w-[95%]"></div>
                                    </div>
                                    <p className="text-white font-bold mt-2">التهاب الشعب الهوائية الحاد</p>
                                </div>

                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white">احتمالية التشخيص</span>
                                        <span className="text-[#1C8B8F] font-bold">82%</span>
                                    </div>
                                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#1C8B8F] w-[82%]"></div>
                                    </div>
                                    <p className="text-white font-bold mt-2">التهاب رئوي</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                                <p className="text-white text-sm">
                                    * هذه النتائج للمساعدة فقط ولا تغني عن استشارة الطبيب
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AISection;
