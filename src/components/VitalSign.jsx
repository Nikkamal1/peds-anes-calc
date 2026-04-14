import React, { useState } from 'react';

const VitalSign = ({ result }) => {
  const [showVitalSign, setShowVitalSign] = useState(true);
  const [showMABL, setShowMABL] = useState(true);

  // ข้อมูล Vital Sign ตามอายุ
  const vitalSignData = [
    { age: 'Premature', hr: '110-170', sbp: '55-75', dbp: '35-45', rr: '40-70' },
    { age: '0-3 months', hr: '110-160', sbp: '65-85', dbp: '45-55', rr: '35-55' },
    { age: '3-6 months', hr: '110-160', sbp: '70-90', dbp: '50-65', rr: '30-45' },
    { age: '6-12 months', hr: '90-160', sbp: '80-100', dbp: '55-65', rr: '22-38' },
    { age: '1-3 years', hr: '80-150', sbp: '90-105', dbp: '55-70', rr: '22-30' },
    { age: '3-6 years', hr: '70-120', sbp: '95-110', dbp: '60-75', rr: '20-24' },
    { age: '6-12 years', hr: '60-110', sbp: '100-120', dbp: '60-75', rr: '16-22' },
    { age: '>12 years', hr: '60-100', sbp: '110-135', dbp: '65-85', rr: '12-20' },
  ];

  // คำนวณ EBV (Estimated Blood Volume) ตาม weight
  const calculateEBV = () => {
    if (!result) return 0;
    const weight = parseFloat(result.weight);
    const age = parseFloat(result.age);
    
    // EBV based on age
    let ebvPerKg = 70; // default for adult
    if (age < 1) {
      ebvPerKg = 80; // Neonate/Infant
    } else if (age < 12) {
      ebvPerKg = 75; // Child
    }
    
    return (weight * ebvPerKg).toFixed(1);
  };

  // คำนวณ MABL (Maximal Allowable Blood Loss)
  const calculateMABL = (acceptableHct) => {
    if (!result) return 0;
    const ebv = parseFloat(calculateEBV());
    const hi = parseFloat(result.hct);
    const hf = acceptableHct;
    
    // MABL = EBV × (Hi - Hf) / Hi
    const mabl = (ebv * (hi - hf)) / hi;
    return mabl.toFixed(1);
  };

  // ค่า HCT ที่ยอมรับได้แต่ละระดับ
  const acceptableHctLevels = [
    { label: 'HCT 25%', value: 25, color: 'from-green-500 to-emerald-600' },
    { label: 'HCT 20%', value: 20, color: 'from-yellow-500 to-amber-600' },
    { label: 'HCT 15%', value: 15, color: 'from-orange-500 to-red-600' },
  ];

  // หาค่าปกติตามอายุของผู้ป่วย
  const getNormalRangeByAge = () => {
    if (!result) return null;
    const age = parseFloat(result.age);
    
    if (age < 0.25) return vitalSignData[1]; // 0-3 months
    if (age < 0.5) return vitalSignData[2]; // 3-6 months
    if (age < 1) return vitalSignData[3]; // 6-12 months
    if (age < 3) return vitalSignData[4]; // 1-3 years
    if (age < 6) return vitalSignData[5]; // 3-6 years
    if (age < 12) return vitalSignData[6]; // 6-12 years
    return vitalSignData[7]; // >12 years
  };

  const normalRange = getNormalRangeByAge();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 pb-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in px-2">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-600 via-pink-600 to-rose-600 rounded-3xl mb-3 sm:mb-4 shadow-2xl shadow-red-500/50 transform hover:scale-110 hover:rotate-3 transition-all duration-300">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2 tracking-tight">
            Vital Signs & MABL
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            สัญญาณชีพและปริมาณเลือดเสียสูงสุด
          </p>
        </div>

        <div className="space-y-6">
          {/* 1. Vital Sign Section */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-lime-200 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-0">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-lg sm:text-xl font-bold text-slate-800">1. Vital Sign</span>
                  <div className="bg-lime-100 text-lime-700 px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold">
                    Age-Based
                  </div>
                </div>
                
                {/* Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showVitalSign}
                    onChange={() => setShowVitalSign(!showVitalSign)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-slate-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-lime-600 peer-checked:to-green-600 relative shadow-inner transition-all duration-300 peer-checked:shadow-lg peer-checked:shadow-lime-500/50">
                    <div className="absolute top-[3px] left-[3px] w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 peer-checked:translate-x-[28px] peer-checked:shadow-lg"></div>
                  </div>
                </label>
              </div>

              {/* Vital Sign Table */}
              {showVitalSign && (
                <div className="mt-6 animate-slide-in-up">
                  <div className="bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 rounded-2xl p-4 sm:p-6 border-2 border-lime-200 shadow-lg">
                    <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-lime-700 to-green-700 bg-clip-text text-transparent mb-3 sm:mb-4">
                      Normal Age-Based Range of Heart Rate, Blood Pressure, and Respiration Rate
                    </h3>
                    
                    {/* Display Normal Values by Age */}
                    {normalRange && result && (
                      <div className="mb-6 space-y-4">
                        <div className="bg-gradient-to-br from-lime-100 to-green-100 rounded-xl p-4 border-2 border-lime-300 shadow-md">
                          <div className="text-sm font-bold text-lime-800 mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            ค่าปกติตามอายุ: {result.age} ปี (ช่วงอายุ: {normalRange.age})
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Systolic Blood Pressure */}
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border-2 border-lime-200 shadow-sm">
                              <div className="text-xs sm:text-sm font-bold text-slate-700 mb-2">
                                Systolic Blood Pressure (mmHg)
                              </div>
                              <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
                                {normalRange.sbp}
                              </div>
                            </div>

                            {/* Diastolic Blood Pressure */}
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border-2 border-lime-200 shadow-sm">
                              <div className="text-xs sm:text-sm font-bold text-slate-700 mb-2">
                                Diastolic Blood Pressure (mmHg)
                              </div>
                              <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
                                {normalRange.dbp}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            {/* Heart Rate */}
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border-2 border-lime-200 shadow-sm">
                              <div className="text-xs sm:text-sm font-bold text-slate-700 mb-2">
                                Heart Rate (Breaths/min)
                              </div>
                              <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
                                {normalRange.hr}
                              </div>
                            </div>

                            {/* Respiratory Rate */}
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border-2 border-lime-200 shadow-sm">
                              <div className="text-xs sm:text-sm font-bold text-slate-700 mb-2">
                                Respiratory Rate (Breaths/min)
                              </div>
                              <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
                                {normalRange.rr}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {!result && (
                      <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
                        <p className="text-sm text-amber-700">
                          <span className="font-semibold">หมายเหตุ:</span> กรุณาทำการคำนวณยาก่อนเพื่อดูค่าปกติตามอายุ
                        </p>
                      </div>
                    )}
                    
                    {/* Table */}
                    {/* <div className="overflow-x-auto -mx-2 sm:mx-0">
                      <div className="inline-block min-w-full align-middle">
                        <table className="min-w-full text-xs sm:text-sm">
                          <thead>
                            <tr className="bg-gradient-to-r from-lime-600 to-green-600 text-white">
                              <th className="px-2 sm:px-4 py-3 text-left rounded-tl-xl font-bold text-xs sm:text-sm">Age</th>
                              <th className="px-2 sm:px-4 py-3 text-center font-bold text-xs sm:text-sm">
                                Heart Rate<br/>
                                <span className="text-[10px] sm:text-xs font-normal">(Breaths/min)</span>
                              </th>
                              <th className="px-2 sm:px-4 py-3 text-center font-bold text-xs sm:text-sm">
                                Systolic Blood Pressure<br/>
                                <span className="text-[10px] sm:text-xs font-normal">(mmHg)</span>
                              </th>
                              <th className="px-2 sm:px-4 py-3 text-center font-bold text-xs sm:text-sm">
                                Diastolic Blood Pressure<br/>
                                <span className="text-[10px] sm:text-xs font-normal">(mmHg)</span>
                              </th>
                              <th className="px-2 sm:px-4 py-3 text-center rounded-tr-xl font-bold text-xs sm:text-sm">
                                Respiratory Rate<br/>
                                <span className="text-[10px] sm:text-xs font-normal">(Breaths/min)</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {vitalSignData.map((row, index) => (
                              <tr
                                key={index}
                                className={`${
                                  index % 2 === 0 ? 'bg-white/80' : 'bg-lime-50/50'
                                } hover:bg-lime-100/80 transition-colors`}
                              >
                                <td className="px-2 sm:px-4 py-3 font-semibold text-slate-800 text-xs sm:text-sm whitespace-nowrap">{row.age}</td>
                                <td className="px-2 sm:px-4 py-3 text-center text-slate-700 text-xs sm:text-sm">{row.hr}</td>
                                <td className="px-2 sm:px-4 py-3 text-center text-slate-700 text-xs sm:text-sm">{row.sbp}</td>
                                <td className="px-2 sm:px-4 py-3 text-center text-slate-700 text-xs sm:text-sm">{row.dbp}</td>
                                <td className="px-2 sm:px-4 py-3 text-center text-slate-700 text-xs sm:text-sm">{row.rr}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div> */}

                    {/* Note */}
                    <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <span className="font-semibold text-blue-700">หมายเหตุ:</span> ค่าปกติของสัญญาณชีพจะแตกต่างกันตามช่วงอายุ 
                        ควรใช้เป็นแนวทางในการประเมินและติดตามสัญญาณชีพของผู้ป่วยเด็ก
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. Maximal Allowable Blood Loss Section */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-rose-200 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-0">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-base sm:text-xl font-bold text-slate-800">2. Maximal Allowable Blood Loss</span>
                  <div className="bg-rose-100 text-rose-700 px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold">
                    MABL
                  </div>
                </div>
                
                {/* Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showMABL}
                    onChange={() => setShowMABL(!showMABL)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-slate-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-rose-600 peer-checked:to-red-600 relative shadow-inner transition-all duration-300 peer-checked:shadow-lg peer-checked:shadow-rose-500/50">
                    <div className="absolute top-[3px] left-[3px] w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 peer-checked:translate-x-[28px] peer-checked:shadow-lg"></div>
                  </div>
                </label>
              </div>

              {/* MABL Calculation */}
              {showMABL && (
                <div className="mt-6 animate-slide-in-up">
                  <div className="bg-gradient-to-br from-rose-50 via-red-50 to-pink-50 rounded-2xl p-4 sm:p-6 border-2 border-rose-200 shadow-lg">
                    {result ? (
                      <>
                        <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-rose-700 to-red-700 bg-clip-text text-transparent mb-3 sm:mb-4">
                          การคำนวณปริมาณเลือดเสียสูงสุดที่ยอมรับได้
                        </h3>

                        {/* EBV Display */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border-2 border-rose-200 shadow-md mb-4 sm:mb-5">
                          <div className="flex items-center justify-between gap-2 sm:gap-4">
                            <div className="flex-1">
                              <div className="text-xs sm:text-sm text-slate-600 mb-1">Estimated Blood Volume (EBV)</div>
                              <div className="text-[10px] sm:text-xs text-slate-500">น้ำหนัก × 70-80 ml/kg</div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl sm:text-3xl font-extrabold text-rose-700">
                                {calculateEBV()}
                              </div>
                              <div className="text-xs sm:text-sm text-slate-600">ml</div>
                            </div>
                          </div>
                        </div>

                        {/* Patient HCT */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border-2 border-blue-200 shadow-md mb-4 sm:mb-5">
                          <div className="flex items-center justify-between gap-2 sm:gap-4">
                            <div className="flex-1">
                              <div className="text-xs sm:text-sm text-slate-600 mb-1">HCT ของผู้ป่วย (Hi)</div>
                              <div className="text-[10px] sm:text-xs text-slate-500">Hematocrit</div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">
                                {result.hct}
                              </div>
                              <div className="text-xs sm:text-sm text-slate-600">%</div>
                            </div>
                          </div>
                        </div>

                        {/* MABL Calculations */}
                        <div className="space-y-3">
                          <h4 className="text-sm sm:text-base font-bold text-slate-800 mb-3 flex items-center">
                            <div className="w-2 h-2 bg-rose-500 rounded-full mr-2"></div>
                            <span className="text-xs sm:text-base">MABL = EBV × (Hi - Hf) / Hi</span>
                          </h4>
                          
                          {acceptableHctLevels.map((level, index) => (
                            <div
                              key={index}
                              className="bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 border-2 border-slate-200 shadow-sm hover:shadow-lg hover:border-rose-300 transition-all duration-300"
                            >
                              <div className="flex items-center justify-between gap-2 sm:gap-4">
                                <div className="flex items-center flex-1 min-w-0">
                                  <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r ${level.color} rounded-full mr-2 sm:mr-3 shadow-md flex-shrink-0`}></div>
                                  <div className="min-w-0">
                                    <div className="text-sm sm:text-base font-bold text-slate-800 truncate">{level.label}</div>
                                    <div className="text-[10px] sm:text-xs text-slate-500">Acceptable Hematocrit</div>
                                  </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <div className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
                                    {calculateMABL(level.value)}
                                  </div>
                                  <div className="text-[10px] sm:text-xs text-slate-600">ml</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Formula Explanation */}
                        <div className="mt-5 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
                          <p className="text-xs text-slate-600 leading-relaxed">
                            <span className="font-semibold text-amber-700">สูตรการคำนวณ:</span>
                            <br/>• <strong>EBV</strong> = Estimated Blood Volume (ปริมาณเลือดโดยประมาณ)
                            <br/>• <strong>Hi</strong> = HCT เริ่มต้นของผู้ป่วย
                            <br/>• <strong>Hf</strong> = HCT ต่ำสุดที่ยอมรับได้ (25%, 20%, 15%)
                            <br/>• <strong>MABL</strong> = ปริมาณเลือดเสียสูงสุดที่ยอมรับได้ก่อนต้องให้เลือด
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-slate-500 text-base">
                          กรุณาทำการคำนวณยาก่อนเพื่อดูข้อมูล MABL
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalSign;

