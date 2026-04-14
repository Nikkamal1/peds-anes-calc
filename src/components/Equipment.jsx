import React, { useState } from 'react';
import Footer from './Footer';

const Equipment = ({ result }) => {
  const [selectedCuff, setSelectedCuff] = useState(null);
  const [selectedUnCuff, setSelectedUnCuff] = useState(null);

  // ถ้าไม่มีข้อมูลผู้ป่วย
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 pb-24 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="text-center max-w-sm mx-auto relative">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-700 mb-2">ยังไม่มีข้อมูลอุปกรณ์</h2>
          <p className="text-slate-500 mb-6">กรุณาคำนวณยาก่อนเพื่อดูข้อมูลอุปกรณ์</p>
        </div>
      </div>
    );
  }

  const age = parseFloat(result.age) || 0;
  const weight = parseFloat(result.weight) || 0;

  // สูตรคำนวณ ETT
  const calculateETT = () => {
    const cuffFormula = age / 4 + 3.5;
    const unCuffFormula = age / 4 + 4;
    
    return {
      cuff: {
        formula: 'age/4 + 3.5',
        result: cuffFormula.toFixed(1),
        options: [
          (cuffFormula - 0.5).toFixed(1),
          cuffFormula.toFixed(1),
          (cuffFormula + 0.5).toFixed(1)
        ]
      },
      unCuff: {
        formula: 'age/4 + 4',
        result: unCuffFormula.toFixed(1),
        options: [
          (unCuffFormula - 0.5).toFixed(1),
          unCuffFormula.toFixed(1),
          (unCuffFormula + 0.5).toFixed(1)
        ]
      }
    };
  };

  // สูตรคำนวณ Depth
  const calculateDepth = () => {
    const depth = age / 2 + 12;
    return {
      formula: 'age/2 + 12',
      result: depth.toFixed(1),
      options: [
        (depth - 0.5).toFixed(1),
        depth.toFixed(1),
        (depth + 0.5).toFixed(1)
      ]
    };
  };

  // ตาราง Stylet
  const getStyletSize = () => {
    const ettSize = parseFloat(calculateETT().cuff.result);
    if (ettSize <= 5.5) return '6F';
    if (ettSize <= 6.5) return '10F';
    if (ettSize <= 7.5) return '14F';
    return '14F';
  };

  // ตาราง Suction Catheter
  const getSuctionCatheterSize = () => {
    const ettSize = parseFloat(calculateETT().cuff.result);
    if (ettSize <= 5.0) return '8F';
    if (ettSize <= 6.0) return '10F';
    if (ettSize <= 7.0) return '12F';
    if (ettSize <= 8.0) return '14F';
    return '14F';
  };

  // Laryngoscope Blade Size
  const getLaryngoscopeSize = () => {
    if (age < 1) return { miller: '0', mac: '0' };
    if (age <= 2) return { miller: '1', mac: '1' };
    if (age <= 6) return { miller: '2', mac: '2' };
    if (age <= 12) return { miller: '2-3', mac: '2-3' };
    return { miller: '3', mac: '3' };
  };

  // Face Mask Size
  const getFaceMaskSize = () => {
    if (age < 1) return '0-1';
    if (age <= 3) return '1-2';
    if (age <= 8) return '2-3';
    return '3-4';
  };

  // LMA Size (ใช้ Un-Cuff ETT เป็นฐาน)
  const getLMASize = () => {
    if (weight < 5) return '1';
    if (weight <= 10) return '1.5';
    if (weight <= 20) return '2';
    if (weight <= 30) return '2.5';
    if (weight <= 50) return '3';
    return '4';
  };

  // Self Inflating Bag Size
  const getSelfInflatingBagSize = () => {
    if (weight < 10) return '500 ml';
    if (weight <= 30) return '1000 ml';
    return '1600 ml';
  };

  // Oropharyngeal Airway Size (Guedel)
  const getOropharyngealAirwaySize = () => {
    if (age < 1) return '00-0';
    if (age <= 2) return '0-1';
    if (age <= 6) return '1-2';
    if (age <= 12) return '2-3';
    return '3-4';
  };

  // NIBP Cuff Size
  const getNIBPCuffSize = () => {
    if (age < 1) return 'Infant';
    if (age <= 3) return 'Child Small';
    if (age <= 8) return 'Child';
    if (age <= 12) return 'Child Large';
    return 'Adult Small';
  };

  const ettData = calculateETT();
  const depthData = calculateDepth();
  const laryngoscopeData = getLaryngoscopeSize();
  const faceMaskSize = getFaceMaskSize();
  const lmaSize = getLMASize();
  const bagSize = getSelfInflatingBagSize();
  const oralAirwaySize = getOropharyngealAirwaySize();
  const nibpCuffSize = getNIBPCuffSize();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 pb-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-md mx-auto relative">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 rounded-3xl mb-4 shadow-2xl shadow-amber-500/50 transform hover:scale-110 hover:rotate-3 transition-all duration-300">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-2 tracking-tight">
            Equipment
          </h1>
          <p className="text-slate-600 text-base font-medium">
            อุปกรณ์สำหรับการให้ยาสลบ
          </p>
        </div>

        {/* Patient Info Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-6 transform hover:shadow-3xl transition-all duration-300">
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 px-6 py-5">
            <h2 className="text-xl font-bold text-white flex items-center">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              ข้อมูลผู้ป่วย
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200">
                <div className="text-xs text-slate-600 mb-1">อายุ</div>
                <div className="text-xl font-bold text-slate-800">{result.age} <span className="text-sm">ปี</span></div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
                <div className="text-xs text-slate-600 mb-1">น้ำหนัก</div>
                <div className="text-xl font-bold text-slate-800">{result.weight} <span className="text-sm">กก.</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Endotracheal Tubes Section */}
        <div className="space-y-6">
          {/* ETT Cuff */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 px-6 py-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Endotracheal tube (Cuff)
              </h3>
              <div className="mt-2 text-orange-100 text-sm">
                Formula: <span className="font-mono font-bold">{ettData.cuff.formula}</span> = <span className="font-bold">{ettData.cuff.result}</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {ettData.cuff.options.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCuff(size)}
                    className={`p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedCuff === size
                        ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50 shadow-xl shadow-orange-200/50'
                        : 'border-slate-200 bg-slate-50 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-2xl font-extrabold ${
                        selectedCuff === size ? 'text-orange-600' : 'text-slate-700'
                      }`}>
                        {size}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">mm</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ETT Un-Cuff */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 px-6 py-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Endotracheal tube (Un-Cuff)
              </h3>
              <div className="mt-2 text-green-100 text-sm">
                Formula: <span className="font-mono font-bold">{ettData.unCuff.formula}</span> = <span className="font-bold">{ettData.unCuff.result}</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {ettData.unCuff.options.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedUnCuff(size)}
                    className={`p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedUnCuff === size
                        ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl shadow-green-200/50'
                        : 'border-slate-200 bg-slate-50 hover:border-green-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-2xl font-extrabold ${
                        selectedUnCuff === size ? 'text-green-600' : 'text-slate-700'
                      }`}>
                        {size}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">mm</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Depth */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 px-6 py-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                Depth (cm)
              </h3>
              <div className="mt-2 text-blue-100 text-sm">
                Formula: <span className="font-mono font-bold">{depthData.formula}</span> = <span className="font-bold">{depthData.result} cm</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {depthData.options.map((depth, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-2xl border-2 ${
                      index === 1
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-2xl font-extrabold ${
                        index === 1 ? 'text-blue-600' : 'text-slate-700'
                      }`}>
                        {depth}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">cm</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stylet & Suction Catheter */}
          <div className="grid grid-cols-2 gap-4">
            {/* Stylet */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-4">
                <h3 className="text-base font-bold text-white">Stylet (F)</h3>
              </div>
              
              <div className="p-5">
                <div className="text-center">
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {getStyletSize()}
                  </div>
                  <div className="text-xs text-slate-500">French</div>
                </div>
              </div>
            </div>

            {/* Suction Catheter */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-4">
                <h3 className="text-base font-bold text-white">Suction Catheter</h3>
              </div>
              
              <div className="p-5">
                <div className="text-center">
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                    {getSuctionCatheterSize()}
                  </div>
                  <div className="text-xs text-slate-500">French</div>
                </div>
              </div>
            </div>
          </div>

          {/* Laryngoscope */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 via-cyan-600 to-sky-600 px-6 py-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                Laryngoscope Blade
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Miller */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-5 border-2 border-teal-200">
                  <div className="text-sm font-bold text-teal-800 mb-2">Miller (Straight)</div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-teal-700 mb-1">
                      {laryngoscopeData.miller}
                    </div>
                    <div className="text-xs text-slate-600">Size</div>
                  </div>
                </div>
                
                {/* Mac */}
                <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-2xl p-5 border-2 border-cyan-200">
                  <div className="text-sm font-bold text-cyan-800 mb-2">Mac (Curved)</div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-cyan-700 mb-1">
                      {laryngoscopeData.mac}
                    </div>
                    <div className="text-xs text-slate-600">Size</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Face Mask & LMA */}
          <div className="grid grid-cols-2 gap-4">
            {/* Anesthesia Face Mask */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-4">
                <h3 className="text-sm font-bold text-white">Face Mask</h3>
              </div>
              
              <div className="p-5">
                <div className="text-center">
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {faceMaskSize}
                  </div>
                  <div className="text-xs text-slate-500">Size</div>
                </div>
              </div>
            </div>

            {/* LMA */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-fuchsia-500 to-pink-600 px-4 py-4">
                <h3 className="text-sm font-bold text-white">LMA</h3>
              </div>
              
              <div className="p-5">
                <div className="text-center">
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {lmaSize}
                  </div>
                  <div className="text-xs text-slate-500">Size (Un-Cuff)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Self Inflating Bag */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 px-6 py-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                Self Inflating Bag
              </h3>
            </div>
            
            <div className="p-6">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-200">
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-emerald-700 mb-2">
                    {bagSize}
                  </div>
                  <div className="text-sm text-slate-600">Volume</div>
                </div>
              </div>
            </div>
          </div>

          {/* Oropharyngeal Airway & NIBP Cuff */}
          <div className="grid grid-cols-2 gap-4">
            {/* Oropharyngeal Airway */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-500 to-amber-600 px-4 py-4">
                <h3 className="text-sm font-bold text-white">Oropharyngeal Airway</h3>
              </div>
              
              <div className="p-5">
                <div className="text-center">
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2">
                    {oralAirwaySize}
                  </div>
                  <div className="text-xs text-slate-500">Appropriate size</div>
                </div>
              </div>
            </div>

            {/* NIBP Cuff */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-orange-600 px-4 py-4">
                <h3 className="text-sm font-bold text-white">NIBP Cuff</h3>
              </div>
              
              <div className="p-5">
                <div className="text-center">
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
                    {nibpCuffSize}
                  </div>
                  <div className="text-xs text-slate-500">Appropriate size</div>
                </div>
              </div>
            </div>
          </div>

          {/* Infusion Pump & NSS */}
          <div className="grid grid-cols-2 gap-4">
            {/* Infusion Pump */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-600 to-gray-700 px-4 py-4">
                <h3 className="text-sm font-bold text-white">Infusion Pump</h3>
              </div>
              
              <div className="p-5">
                <div className="text-center">
                  <div className="text-5xl font-extrabold bg-gradient-to-r from-slate-700 to-gray-700 bg-clip-text text-transparent mb-2">
                    1
                  </div>
                  <div className="text-xs text-slate-500">เครื่อง</div>
                </div>
              </div>
            </div>

            {/* NSS 100 ml */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-4">
                <h3 className="text-sm font-bold text-white">NSS 100 ml</h3>
              </div>
              
              <div className="p-5">
                <div className="text-center">
                  <div className="text-5xl font-extrabold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    1
                  </div>
                  <div className="text-xs text-slate-500">ชุด</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Equipment;

