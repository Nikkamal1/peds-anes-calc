import React from 'react';
import AnesthesiaOptions from './AnesthesiaOptions';

const ResultDetail = ({ result, onBack }) => {
  // ฟังก์ชันคำนวณต่างๆ สำหรับ Aesthetics for Pediatric
  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const calculateBSA = (weight, height) => {
    // Mosteller formula
    return Math.sqrt((weight * height) / 3600).toFixed(2);
  };

  const calculateBloodVolume = (weight, height, sex) => {
    // ใช้สูตรสำหรับเด็ก
    const bsa = calculateBSA(weight, height);
    if (sex === 'male') {
      return (bsa * 2.44).toFixed(2);
    } else {
      return (bsa * 2.32).toFixed(2);
    }
  };

  const calculateFluidRequirements = (weight, age) => {
    // 4-2-1 rule for maintenance fluids
    let hourlyRate;
    if (weight <= 10) {
      hourlyRate = weight * 4;
    } else if (weight <= 20) {
      hourlyRate = 40 + (weight - 10) * 2;
    } else {
      hourlyRate = 60 + (weight - 20) * 1;
    }
    return {
      hourly: hourlyRate.toFixed(1),
      daily: (hourlyRate * 24).toFixed(1)
    };
  };

  const calculateAnesthesiaDose = (weight) => {
    // ตัวอย่างการคำนวณยาสลบ (ปรับตามความเหมาะสม)
    return {
      propofol: (weight * 2.5).toFixed(1),
      fentanyl: (weight * 0.001).toFixed(3),
      midazolam: (weight * 0.05).toFixed(2)
    };
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">ไม่พบข้อมูล</h2>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            กลับ
          </button>
        </div>
      </div>
    );
  }

  const bmi = calculateBMI(result.weight, result.height);
  const bsa = calculateBSA(result.weight, result.height);
  const bloodVolume = calculateBloodVolume(result.weight, result.height, result.sex);
  const fluidReqs = calculateFluidRequirements(result.weight, result.age);
  const anesthesiaDose = calculateAnesthesiaDose(result.weight);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 pb-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-md mx-auto relative">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-4 sm:mb-6 transform hover:shadow-3xl transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 sm:px-6 py-4 sm:py-5">
            <div className="flex items-center justify-between">
              <button
                onClick={onBack}
                className="text-white hover:text-blue-100 transition-all duration-300 p-2 sm:p-2.5 rounded-xl hover:bg-white/20 active:scale-95 backdrop-blur-sm flex-shrink-0"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-white text-center flex-1">รายละเอียดการคำนวณ</h1>
              <div className="w-9 sm:w-12"></div>
            </div>
          </div>
          
          <div className="p-4 sm:p-6 md:p-8">
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-4 sm:p-6 border-2 border-blue-100 shadow-lg">
              <div className="flex items-center mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg shadow-blue-500/30 transform hover:rotate-6 transition-transform duration-300 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ข้อมูลผู้ป่วย</h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-1">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></div>
                      <span className="text-[10px] sm:text-xs text-slate-600 font-medium">อายุ</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-800">{result.age}</span>
                    <span className="text-xs sm:text-sm text-slate-600 ml-1">ปี</span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-1">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></div>
                      <span className="text-[10px] sm:text-xs text-slate-600 font-medium">น้ำหนัก</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-800">{result.weight}</span>
                    <span className="text-xs sm:text-sm text-slate-600 ml-1">กก.</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-1">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></div>
                      <span className="text-[10px] sm:text-xs text-slate-600 font-medium">ส่วนสูง</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-800">{result.height}</span>
                    <span className="text-xs sm:text-sm text-slate-600 ml-1">ซม.</span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-red-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-1">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></div>
                      <span className="text-[10px] sm:text-xs text-slate-600 font-medium">HCT</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-800">{result.hct}</span>
                    <span className="text-xs sm:text-sm text-slate-600 ml-1">%</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-pink-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-slate-600 font-medium">เพศ</span>
                    </div>
                    <span className={`text-base sm:text-lg font-bold px-3 sm:px-4 py-1 rounded-lg text-xs sm:text-sm ${
                      result.sex === 'male' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-pink-100 text-pink-700'
                    }`}>
                      {result.sex === 'male' ? 'ชาย' : 'หญิง'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Anesthesia Options */}
        <AnesthesiaOptions result={result} />
      </div>
    </div>
  );
};

export default ResultDetail;
