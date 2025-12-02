import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-20 bg-[#F8FAFC]">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl lg:text-5xl font-black text-[#1F2E3C] mb-6">
                    ابدأ رحلتك الصحية <span className="text-[#1C8B8F]">اليوم</span>
                </h2>

                <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
                    انضم إلى آلاف المستخدمين الذين يثقون في نبض لإدارة صحتهم بذكاء وأمان
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/register" className="px-10 py-5 bg-[#1C8B8F] text-white rounded-2xl font-bold hover:bg-[#14666A] transition shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 group">
                        سجل الآن مجاناً
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
                    </Link>
                    <Link to="/contact" className="px-10 py-5 bg-white text-[#1C8B8F] border-2 border-[#1C8B8F] rounded-2xl font-bold hover:bg-[#1C8B8F] hover:text-white transition flex items-center justify-center gap-3">
                        تواصل معنا
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTA;
