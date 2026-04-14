import React, { useState } from 'react';

const AnesthesiaOptions = ({ result, calculations }) => {
  const [options, setOptions] = useState({
    induction: true, // เปิดไว้เป็นค่าเริ่มต้น
    muscleRelaxation: false,
    painControl: false,
    inhalation: false,
    reversalAgent: false,
    ponvprohylaxis: false
  });

  const handleToggle = (option) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const optionLabels = {
    induction: 'Induction',
    muscleRelaxation: 'Muscle Relaxation (Rout vein)',
    painControl: 'Pain control (Rout vein)',
    inhalation: 'Inhalation',
    reversalAgent: 'Reversal agent (Rout vein)',
    ponvprohylaxis: 'PONV prophylaxis',
  };

  const getOptionDetails = () => {
    const weight = parseFloat(result.weight) || 0;
    const age = parseFloat(result.age) || 0;
    const formatDose = (num) => {
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
};
    return {
      induction: [
        {
          name: 'Thiopental',
          formula: '5-6 mg/kg (age 1-12 year)',
          result: age >= 1 && age <= 12 ? `${formatDose(5 * weight)}-${formatDose(6 * weight)} mg` : 'ไม่แนะนำสำหรับอายุนี้',
        },
        {
          name: 'Propofol',
          formula: '2.5-3.5 mg/kg (age more than 3 year)',
          result: age > 3 ? `${formatDose(2.5 * weight)}-${formatDose(3.5 * weight)} mg` : 'ไม่แนะนำสำหรับอายุนี้',
        },
        {
          name: 'Ketamine',
          formula: '1-2 mg/kg',
          result: `${formatDose(1 * weight)}-${formatDose(2 * weight)} mg`,
          formula2: 'Sedation 0.5-2 mg/kg',
          result2: `${formatDose(0.5 * weight)}-${formatDose(2 * weight)} mg`,
        },
        {
          name: 'Etomidate',
          formula: '0.2-0.6 mg/kg',
          result: `${formatDose(0.2 * weight)}-${formatDose(0.6 * weight)} mg`,
        },
        {
          name: 'Midazolam',
          formula:'0.05-0.1 mg/kg (max 6mg) age 6 mounts to 5 year',
          result: age >= 6 && age <= 5 ? `${formatDose(0.05 * weight)}-${formatDose(0.1 * weight)} mg` : 'ไม่แนะนำสำหรับอายุนี้',
          formula2:'0.025-0.05 mg/kg (max 10 mg) age 5 to 12 year',
          result2: age >= 5 && age <= 12 ? `${formatDose(0.025 * weight)}-${formatDose(0.05 * weight)} mg` : 'ไม่แนะนำสำหรับอายุนี้',
        },
      ],
      muscleRelaxation: [
        {
          name: 'Succinylcholine',
          formula: '1-2 mg/kg',
          result: `${formatDose(1 * weight)}-${formatDose(2 * weight)} mg`,
        },
        {
          name: 'Atracurium',
          formula: '0.5-0.6 mg/kg',
          result: `${formatDose(0.5 * weight)}-${formatDose(0.6 * weight)} mg`,
          formula2: 'Maintenance. 0.2-0.3 mg/kg',
          result2: `${formatDose(0.2 * weight)}-${formatDose(0.3 * weight)} mg`,
        },
        {
          name: 'Cisatracurium',
          formula: '0.1-0.2 mg/kg',
          result: `${formatDose(0.1 * weight)}-${formatDose(0.2 * weight)} mg`,
          formula2: 'Maintenance. 0.02-0.05 mg/kg',
          result2: `${formatDose(0.02 * weight)}-${formatDose(0.05 * weight)} mg`,
        },
        {
          name: 'Rocuronium',
          formula: '0.6-1.2 mg/kg',
          result: `${formatDose(0.6 * weight)}-${formatDose(1.2 * weight)} mg`,
          formula2: 'Maintenance. 0.1-0.15 mg/kg',
          result2: `${formatDose(0.1 * weight)}-${formatDose(0.15 * weight)} mg`,
        },
      ],
      painControl: [
        {
          name: 'Morphine',
          formula: '0.05-0.1 mg/kg',
          result: `${formatDose(0.05 * weight)}-${formatDose(0.1 * weight)} mg`,
        },
        {
          name: 'Pethidine',
          formula: '0.5-1 mg/kg',
          result: `${formatDose(0.5 * weight)}-${formatDose(1 * weight)} mg`,
        },
        {
          name: 'Fentanyl',
          formula: '1-2 mcg/kg',
          result: `${formatDose(1 * weight)}-${formatDose(2 * weight)} mcg`,
        },
        {
          name: 'Acetaminophen',
          formula: '10-15 mg/kg',
          result: `${formatDose(10 * weight)}-${formatDose(15 * weight)} mg`,
        },
      ],
      inhalation: [
            {
              name: 'Sevoflurane',
              formula: 'Neonates 3.3%, 1-6 months 3.2%, 6-12 months 2.5%, 1-3 years 2.6%, 2-12 years 2.3-2.5%',
              result: 
                     age >= 1 && age <= 3 ? '2.6' : 
                     age >= 4 && age <= 12 ? '2.3-2.5' : 
                    'ไม่แนะนำสำหรับอายุนี้',
            },
            {
              name: 'Desflurane',
              formula: 'Neonates 9.16%, 1-6 months 9.42%, 6-12 months 9.92%, 1-3 years 8.72%, 3-5 years 8.62%, 5-12 years 7.98%',
              result: age >= 1 && age <= 3 ? '8.72' : 
                     age >= 4 && age <= 5 ? '8.62' : 
                     age >= 6 && age <= 12 ? '7.98' : 
                     'ไม่แนะนำสำหรับอายุนี้',
            },
      ],
      reversalAgent: [
        {
          group: 'Anticholinesterase',
          drugs: [
            {
              name: 'Neostigmine',
              formula: '0.05-0.07 mg/kg',
              result: `${formatDose(0.05 * weight)}-${formatDose(0.07 * weight)} mg`,
            },
            {
              name: 'Edrophonium',
              formula: '1 mg/kg',
              result: `${formatDose(1 * weight)} mg`,
            },
          ],
        },
        {
          group: 'Anticholinergic',
          drugs: [
            {
              name: 'Atropine',
              formula: '0.01-0.02 mg/kg',
              result: `${formatDose(0.01 * weight)}-${formatDose(0.02 * weight)} mg`,
            },
            {
              name: 'Glycopyrrolate',
              formula: '0.005-0.01 mg/kg',
              result: `${formatDose(0.005 * weight)}-${formatDose(0.01 * weight)} mg`,
            },
            
          ],
        },
        {
          group: 'Etc.',
          drugs: [
            {
              name: 'Sugammadex',
              formula: '2 mg/kg (TOF count 2)',
              result: `${2 * weight} mg`,
              formula2:'4 mg/kg (Post tetanic count 1-2)',
              result2: `${4 * weight} mg`,
              formula3:'16 mg/kg (3-5min post NMBDs/No response to TOF.)',
              result3: `${16 * weight} mg`,
            },
          ],
        },
         {
           group: 'Opiod Reversal IV Bolus',
           drugs: [
             {
               name: 'Naloxone',
               formula: '0.1 mg/kg For patients >5 years old >20kg use 2 mg per dose',
               result: age >= 5 && weight > 20 
               ? '2 mg per dose' : `${0.1 * weight} mg` ,
             },
           ],
         },
         {
           group: 'Benzodiazepines Reversal iv bolus',
           drugs: [
             {
               name: 'Flumazenil',
               formula: '0.01 mg/kg (up to maximum of 0.2 mg) Maximum total dose: 0.05 mg/kg หรือ 1 mg',
               result: Math.min(0.01 * weight, 0.2) <= 0.2 ? `${Math.min(0.01 * weight, 0.2)} mg` : 'ไม่เกิน 0.2 mg',
             },
           ],
         },
      ],
      ponvprohylaxis: [
        {
          name: 'Ondansetron',
          formula: '0.15 mg/kg *MAX 16 mg',
          result: Math.min(0.15 * weight, 16) <= 16 ? `${Math.min(0.15 * weight, 16)} mg` : 'ไม่เกิน 16 mg',
        },
        {
          name: 'Dexamethasone',
          formula: '0.1- 0.15 mg/kg',
          result: `${formatDose(0.1 * weight)}-${formatDose(0.15 * weight)} mg`,
        },
        {
          name: 'Metoclopramide',
          formula: '0.2 mg/kg',
          result: `${formatDose(0.2 * weight)} mg`,
        },
      ],
    };
  };

  const optionDetails = getOptionDetails();

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden mt-4 sm:mt-6 transform hover:shadow-3xl transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4 sm:px-6 py-4 sm:py-5">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
          <div className="bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <span className="text-sm sm:text-lg md:text-xl">ตัวเลือกยาสลบ</span>
        </h3>
        <p className="text-purple-100 text-xs sm:text-sm mt-1 ml-8 sm:ml-11">เลือกตัวเลือกที่ต้องการใช้ในการให้ยาสลบ</p>
      </div>

      <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5">
        {Object.entries(optionLabels).map(([key, label]) => (
          <div
            key={key}
            className={`rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.01] ${
              options[key]
                ? 'border-indigo-400 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-xl shadow-indigo-200/50'
                : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:shadow-lg'
            }`}
          >
            <div className="p-4 sm:p-5">
              <div 
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => handleToggle(key)}
              >
                <div className="flex items-center flex-1">
                  <div
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2 sm:mr-3 transition-all duration-300 flex-shrink-0 ${
                      options[key] 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/50' 
                        : 'bg-slate-400'
                    }`}
                  ></div>
                  <span
                    className={`font-bold text-sm sm:text-base ${
                      options[key] ? 'text-indigo-900' : 'text-slate-700'
                    }`}
                  >
                    {label}
                  </span>
                </div>
                <label 
                  className="relative inline-flex items-center cursor-pointer group flex-shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={options[key]}
                    onChange={() => handleToggle(key)}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 sm:w-14 sm:h-7 bg-slate-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-purple-600 relative shadow-inner transition-all duration-300 peer-checked:shadow-lg peer-checked:shadow-indigo-500/50">
                    <div className="absolute top-[2px] left-[2px] sm:top-[3px] sm:left-[3px] w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md transition-all duration-300 peer-checked:translate-x-[24px] sm:peer-checked:translate-x-[28px] peer-checked:shadow-lg"></div>
                  </div>
                </label>
              </div>

              {options[key] && (
                <div className="mt-4 sm:mt-5 p-4 sm:p-5 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-indigo-200 shadow-lg">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="bg-indigo-100 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-indigo-900 text-sm sm:text-base">รายละเอียดยาและขนาด</h4>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    {optionDetails[key].map((item, index) => (
                      <div key={index} className="mb-2 sm:mb-3">
                        {item.group ? (
                          <>
                            {item.group && (
                              <h5 className="font-bold text-indigo-800 mb-2 sm:mb-3 flex items-center text-xs sm:text-sm">
                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2 flex-shrink-0"></div>
                                {item.group}
                              </h5>
                            )}
                            {item.drugs.map((detail, subIndex) => (
                        <div key={subIndex} className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-3 sm:p-4 border-2 border-slate-200 mb-2 sm:mb-3 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2">
                            <h5 className="font-bold text-slate-800 text-sm sm:text-base">{detail.name}</h5>
                            <span className={`font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${
                              detail.result.includes('ไม่แนะนำสำหรับอายุนี้')
                                ? 'text-red-700 bg-red-50 border border-red-300'
                                : 'text-slate-800 bg-green-100 border border-green-200'
                            }`}>{detail.result}</span>
                          </div>
                          <div className="flex items-start sm:items-center justify-end mt-1 text-[10px] sm:text-xs text-slate-600">
                            <span className="bg-slate-100 px-2 py-1 rounded break-words sm:break-normal">({detail.formula})</span>
                          </div>
                          {detail.result2 && detail.formula2 && detail.result3 && detail.formula3 && (
                            <>
                              <div className="flex items-center justify-end mt-1.5 sm:mt-1">
                                <span className={`font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${
                                  detail.result2.includes('ไม่แนะนำสำหรับอายุนี้')
                                    ? 'text-red-700 bg-red-50 border border-red-300'
                                    : 'text-slate-800 bg-green-100 border border-green-200'
                                }`}>{detail.result2}</span>
                              </div>
                              <div className="flex items-start sm:items-center justify-end mt-1 text-[10px] sm:text-xs text-slate-600">
                                <span className="bg-slate-100 px-2 py-1 rounded break-words sm:break-normal">({detail.formula2})</span>
                              </div>
                              <div className="flex items-center justify-end mt-1.5 sm:mt-1">
                                <span className={`font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${
                                  detail.result3.includes('ไม่แนะนำสำหรับอายุนี้')
                                    ? 'text-red-700 bg-red-50 border border-red-300'
                                    : 'text-slate-800 bg-green-100 border border-green-200'
                                }`}>{detail.result3}</span>
                              </div>
                              <div className="flex items-start sm:items-center justify-end mt-1 text-[10px] sm:text-xs text-slate-600">
                                <span className="bg-slate-100 px-2 py-1 rounded break-words sm:break-normal">({detail.formula3})</span>
                              </div>
                            </>
                          )}
                        </div>
                            ))}
                          </>
                        ) : (
                          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-3 sm:p-4 border-2 border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2">
                              <h5 className="font-bold text-slate-800 text-sm sm:text-base">{item.name}</h5>
                              <span className={`font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${
                                item.result.includes('ไม่แนะนำสำหรับอายุนี้')
                                  ? 'text-red-700 bg-red-50 border border-red-300'
                                  : 'text-slate-800 bg-green-100 border border-green-200'
                              }`}>{item.result}</span>
                            </div>
                            <div className="flex items-start sm:items-center justify-end mt-1 text-[10px] sm:text-xs text-slate-600">
                              <span className="bg-slate-100 px-2 py-1 rounded break-words sm:break-normal">({item.formula})</span>
                            </div>
                            {item.result2 && item.formula2 && item.result3 && item.formula3 && (
                              <>
                                <div className="flex items-center justify-end mt-1.5 sm:mt-1">
                                  <span className={`font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${
                                    item.result2.includes('ไม่แนะนำสำหรับอายุนี้')
                                      ? 'text-red-700 bg-red-50 border border-red-300'
                                      : 'text-slate-800 bg-green-100 border border-green-200'
                                  }`}>{item.result2}</span>
                                </div>
                                <div className="flex items-start sm:items-center justify-end mt-1 text-[10px] sm:text-xs text-slate-600">
                                  <span className="bg-slate-100 px-2 py-1 rounded break-words sm:break-normal">({item.formula2})</span>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      {/* <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="font-semibold text-slate-700">ตัวเลือกที่เลือก:</span>
          </div>
          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
            {Object.entries(options).filter(([_, selected]) => selected).length} รายการ
          </span>
        </div>
        <div className="mt-2 text-sm text-slate-600">
          {Object.entries(options).filter(([_, selected]) => selected).length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {Object.entries(options)
                .filter(([_, selected]) => selected)
                .map(([key]) => (
                  <span
                    key={key}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium"
                  >
                    {optionLabels[key]}
                  </span>
                ))}
            </div>
          ) : (
            <span className="text-slate-400 italic">ยังไม่ได้เลือกตัวเลือกใด</span>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default AnesthesiaOptions;
