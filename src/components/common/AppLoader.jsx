import React from 'react';

const AppLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
      <div className="text-center relative z-10">
        {/* Animated ECG Heartbeat Line */}
        <div className="mb-12">
          <svg
            className="w-64 h-32 mx-auto"
            viewBox="0 0 200 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ECG Line Path with Realistic Animation */}
            <path
              d="M 0 30 L 40 30 L 45 20 L 50 40 L 55 10 L 60 50 L 65 30 L 75 30 L 80 25 L 85 35 L 90 30 L 130 30 L 135 20 L 140 40 L 145 10 L 150 50 L 155 30 L 165 30 L 170 25 L 175 35 L 180 30 L 200 30"
              stroke="#1C8B8F"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-ecg"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(28, 139, 143, 0.5))',
              }}
            />
          </svg>
        </div>

        {/* Brand Name */}
        <h1 className="text-6xl font-black text-[#1F2E3C] mb-3 tracking-tight">
          نبض
        </h1>
        <div className="text-3xl font-bold text-[#1C8B8F] mb-4">
          Nabd
        </div>
        <p className="text-gray-600 text-lg mb-8">منصة الرعاية الصحية الذكية</p>

        {/* Modern Loading Animation */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-[#1C8B8F] rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-[#1C8B8F] rounded-full animate-bounce delay-500"></div>
          <div className="w-3 h-3 bg-[#1C8B8F] rounded-full animate-bounce delay-700"></div>
        </div>

        <p className="text-gray-500 text-sm font-medium">جاري التحميل...</p>
      </div>
    </div>
  );
};

export default AppLoader;
