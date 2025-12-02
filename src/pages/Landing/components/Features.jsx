import React from 'react';
import { Brain, FileText, Calendar, ShieldCheck, Smartphone, Users } from 'lucide-react';

const features = [
    {
        icon: <Brain className="w-8 h-8" />,
        title: "مساعد ذكي للأطباء",
        description: "تقليل أخطاء التشخيص باستخدام موديلات AI مدربة تقترح الاحتمالات وتراجع التفاعلات الدوائية.",
        color: "text-[#1C8B8F]",
        bg: "bg-[#1C8B8F]/10"
    },
    {
        icon: <FileText className="w-8 h-8" />,
        title: "سجل طبي موحد",
        description: "تاريخك المرضي، روشتاتك، وتحاليلك في مكان واحد. لا مزيد من الأوراق الضائعة.",
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        icon: <Calendar className="w-8 h-8" />,
        title: "إدارة عيادة متكاملة",
        description: "نظام حجز ذكي، إدارة مواعيد، ومتابعة للمرضى توفر وقت الطبيب والمريض.",
        color: "text-purple-600",
        bg: "bg-purple-50"
    },
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "أمان وخصوصية",
        description: "تشفير كامل للبيانات الطبية لضمان خصوصية المرضى والأطباء.",
        color: "text-green-600",
        bg: "bg-green-50"
    },
    {
        icon: <Smartphone className="w-8 h-8" />,
        title: "تطبيق للمرضى",
        description: "حجز مواعيد، متابعة الأدوية، والتواصل مع الطبيب من هاتفك مباشرة.",
        color: "text-orange-600",
        bg: "bg-orange-50"
    },
    {
        icon: <Users className="w-8 h-8" />,
        title: "مجتمع طبي",
        description: "تواصل مع نخبة من الأطباء وتبادل الخبرات والاستشارات الطبية.",
        color: "text-pink-600",
        bg: "bg-pink-50"
    }
];

const Features = () => {
    return (
        <section id="features" className="py-20 bg-[#FFFFFF]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-black text-[#1F2E3C] mb-4">
                        لماذا تختار <span className="text-[#1C8B8F]">نبض</span>؟
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        نجمع بين التكنولوجيا المتقدمة والخبرة الطبية لتقديم تجربة لا مثيل لها.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-[#F8FAFC] p-8 rounded-3xl hover:shadow-xl transition duration-300 group border border-transparent hover:border-[#1C8B8F]/10">
                            <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center ${feature.color} mb-6 group-hover:scale-110 transition duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#1F2E3C] mb-3">{feature.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
