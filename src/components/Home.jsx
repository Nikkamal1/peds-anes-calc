import React, { useState, useEffect } from 'react';
import AnesthesiaOptions from './AnesthesiaOptions';

const Home = ({ onCalculate, onClearResults, hasResults }) => {
  // ใช้ localStorage เพื่อเก็บ formData ไม่ให้ถูกรีเซ็ตเมื่อเปลี่ยน tab
  const getStoredFormData = () => {
    try {
      const stored = localStorage.getItem('anesthesiaFormData');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading form data:', e);
    }
    return {
      age: '',
      weight: '',
      height: '',
      hct: '',
      sex: ''
    };
  };

  const [formData, setFormData] = useState(getStoredFormData);
  const [calculationResult, setCalculationResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // บันทึก formData ลง localStorage เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem('anesthesiaFormData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSexChange = (sex) => {
    setFormData(prev => ({
      ...prev,
      sex: sex
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.age && formData.weight && formData.height && formData.hct && formData.sex) {
      const result = {
        ...formData,
        id: Date.now(),
        timestamp: new Date().toLocaleString('th-TH')
      };
      setCalculationResult(result);
      setShowResult(true);
      onCalculate(result);
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  const handleNewCalculation = () => {
    const emptyForm = {
      age: '',
      weight: '',
      height: '',
      hct: '',
      sex: ''
    };
    setFormData(emptyForm);
    localStorage.setItem('anesthesiaFormData', JSON.stringify(emptyForm));
    setCalculationResult(null);
    setShowResult(false);
  };

  const handleClearAll = () => {
    if (onClearResults) {
      const emptyForm = {
        age: '',
        weight: '',
        height: '',
        hct: '',
        sex: ''
      };
      setFormData(emptyForm);
      localStorage.setItem('anesthesiaFormData', JSON.stringify(emptyForm));
      setCalculationResult(null);
      setShowResult(false);
      onClearResults();
    }
  };

  // ฟังก์ชันคำนวณที่เน้นน้ำหนักและอายุ
  const calculatePediatricDoses = (weight, age) => {
    // การคำนวณขนาดยาสำหรับเด็กตามน้ำหนักและอายุ
    const calculations = {
      // Maintenance Fluid (4-2-1 rule)
      fluidRequirements: {
        hourly: weight <= 10 ? (weight * 4).toFixed(1) : 
                weight <= 20 ? (40 + (weight - 10) * 2).toFixed(1) : 
                (60 + (weight - 20) * 1).toFixed(1),
        daily: weight <= 10 ? (weight * 4 * 24).toFixed(1) : 
               weight <= 20 ? ((40 + (weight - 10) * 2) * 24).toFixed(1) : 
               ((60 + (weight - 20) * 1) * 24).toFixed(1)
      },
      
      // Anesthesia Doses (mg/kg)
      anesthesiaDoses: {
        propofol: (weight * 2.5).toFixed(1),
        fentanyl: (weight * 0.001).toFixed(3),
        midazolam: (weight * 0.05).toFixed(2),
        ketamine: (weight * 1).toFixed(1),
        thiopental: age <= 12 ? (weight * 5).toFixed(1) : (weight * 4).toFixed(1)
      },
      
      // Muscle Relaxants (mg/kg)
      muscleRelaxants: {
        succinylcholine: (weight * 1.5).toFixed(1),
        rocuronium: (weight * 0.6).toFixed(1),
        vecuronium: (weight * 0.08).toFixed(2)
      },
      
      // Pain Control (mg/kg)
      painControl: {
        morphine: (weight * 0.1).toFixed(2),
        tramadol: (weight * 1).toFixed(1),
        paracetamol: (weight * 15).toFixed(0)
      },
      
      // Reversal Agents (mg/kg)
      reversalAgents: {
        neostigmine: (weight * 0.05).toFixed(2),
        atropine: (weight * 0.01).toFixed(2),
        naloxone: (weight * 0.01).toFixed(3)
      },
      
      // Equipment Sizes
      equipment: {
        endotrachealTube: age <= 1 ? '3.0-3.5' : 
                         age <= 2 ? '3.5-4.0' : 
                         age <= 4 ? '4.0-4.5' : 
                         age <= 6 ? '4.5-5.0' : 
                         age <= 8 ? '5.0-5.5' : 
                         age <= 10 ? '5.5-6.0' : 
                         age <= 12 ? '6.0-6.5' : '6.5-7.0',
        laryngealMask: age <= 1 ? '1' : 
                      age <= 2 ? '1.5' : 
                      age <= 4 ? '2' : 
                      age <= 6 ? '2.5' : 
                      age <= 8 ? '3' : 
                      age <= 10 ? '3.5' : '4'
      }
    };
    
    return calculations;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 pb-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header Section */}
      <div className="max-w-md mx-auto mb-8 relative">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl mb-4 shadow-2xl shadow-blue-500/50 transform hover:scale-110 hover:rotate-3 transition-all duration-300">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 tracking-tight">
            Anesthesia for Pediatric
          </h1>
          <p className="text-slate-600 text-base font-medium">
            ระบบคำนวณยาสลบสำหรับเด็ก
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              ระบบพร้อมใช้งาน
            </span>
            {hasResults && (
              <button
                onClick={handleClearAll}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                ลบค่าคำนวณ
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-md mx-auto relative">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform hover:shadow-3xl transition-all duration-300">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5">
            <h2 className="text-xl font-bold text-white flex items-center">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              ข้อมูลผู้ป่วย
            </h2>
            <p className="text-blue-100 text-sm mt-1 ml-11">กรอกข้อมูลเพื่อคำนวณยา</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Row 1: Age and Weight */}
            <div className="grid grid-cols-2 gap-5">
              {/* Age */}
              <div className="space-y-2 group">
                <label className="block text-sm font-bold text-slate-700 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  อายุ (ปี)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-slate-800 font-semibold hover:border-slate-300"
                    placeholder="0-18"
                    min="0"
                    max="18"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <span className="text-slate-500 text-sm font-medium">ปี</span>
                  </div>
                </div>
              </div>

              {/* Weight */}
              <div className="space-y-2 group">
                <label className="block text-sm font-bold text-slate-700 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  น้ำหนัก (กก.)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 transition-all duration-300 text-slate-800 font-semibold hover:border-slate-300"
                    placeholder="0.0"
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <span className="text-slate-500 text-sm font-medium">กก.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Height and HCT */}
            <div className="grid grid-cols-2 gap-5">
              {/* Height */}
              <div className="space-y-2 group">
                <label className="block text-sm font-bold text-slate-700 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  ส่วนสูง (ซม.)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-slate-800 font-semibold hover:border-slate-300"
                    placeholder="0.0"
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <span className="text-slate-500 text-sm font-medium">ซม.</span>
                  </div>
                </div>
              </div>

              {/* HCT */}
              <div className="space-y-2 group">
                <label className="block text-sm font-bold text-slate-700 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  HCT (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    name="hct"
                    value={formData.hct}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100 transition-all duration-300 text-slate-800 font-semibold hover:border-slate-300"
                    placeholder="0-100"
                    min="0"
                    max="100"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <span className="text-slate-500 text-sm font-medium">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sex */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mr-2"></span>
                เพศ
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative flex items-center justify-center p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  formData.sex === 'male' 
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 ring-4 ring-blue-200 shadow-lg shadow-blue-200/50' 
                    : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50'
                }`}>
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    checked={formData.sex === 'male'}
                    onChange={() => handleSexChange('male')}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300 ${
                      formData.sex === 'male' 
                        ? 'border-blue-600 bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg' 
                        : 'border-slate-300'
                    }`}>
                      {formData.sex === 'male' && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <span className={`font-bold text-base ${
                      formData.sex === 'male' ? 'text-blue-700' : 'text-slate-600'
                    }`}>ชาย</span>
                  </div>
                </label>
                
                <label className={`relative flex items-center justify-center p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  formData.sex === 'female' 
                    ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-pink-100 ring-4 ring-pink-200 shadow-lg shadow-pink-200/50' 
                    : 'border-slate-200 bg-slate-50 hover:border-pink-300 hover:bg-pink-50'
                }`}>
                  <input
                    type="radio"
                    name="sex"
                    value="female"
                    checked={formData.sex === 'female'}
                    onChange={() => handleSexChange('female')}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300 ${
                      formData.sex === 'female' 
                        ? 'border-pink-600 bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg' 
                        : 'border-slate-300'
                    }`}>
                      {formData.sex === 'female' && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <span className={`font-bold text-base ${
                      formData.sex === 'female' ? 'text-pink-700' : 'text-slate-600'
                    }`}>หญิง</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="relative w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-5 px-6 rounded-2xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-bold text-lg shadow-2xl shadow-blue-500/50 hover:shadow-3xl hover:shadow-blue-600/60 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="relative flex items-center justify-center">
                <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                คำนวณยา
              </div>
            </button>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl p-5 border-2 border-amber-200/50 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/30 rounded-full blur-2xl"></div>
          <div className="relative flex items-start">
            <div className="flex-shrink-0">
              <div className="bg-amber-500/20 p-2.5 rounded-xl">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-slate-700 leading-relaxed">
                <span className="font-bold text-amber-800">⚠️ หมายเหตุสำคัญ:</span>
                <br />
                กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง เพื่อความปลอดภัยในการคำนวณยาสลบ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {showResult && calculationResult && (
        <div className="max-w-md mx-auto mt-8">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Result Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ผลการคำนวณ
                </h2>
                <button
                  onClick={handleNewCalculation}
                  className="text-white hover:text-green-200 transition-colors duration-200 p-2 rounded-lg hover:bg-white/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Patient Info */}
            <div className="p-6">
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">ข้อมูลผู้ป่วย</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm text-slate-600">อายุ:</span>
                      <span className="ml-auto font-semibold text-slate-800">{calculationResult.age} ปี</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-slate-600">น้ำหนัก:</span>
                      <span className="ml-auto font-semibold text-slate-800">{calculationResult.weight} กก.</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-sm text-slate-600">ส่วนสูง:</span>
                      <span className="ml-auto font-semibold text-slate-800">{calculationResult.height} ซม.</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm text-slate-600">HCT:</span>
                      <span className="ml-auto font-semibold text-slate-800">{calculationResult.hct}%</span>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                    <span className="text-sm text-slate-600">เพศ:</span>
                    <span className="ml-auto font-semibold text-slate-800">
                      {calculationResult.sex === 'male' ? 'ชาย' : 'หญิง'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Calculation Results */}
              {(() => {
                const calculations = calculatePediatricDoses(parseFloat(calculationResult.weight), parseFloat(calculationResult.age));
                return (
                  <div className="space-y-4">
                    {/* Fluid Requirements */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                      <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                        Fluid Requirements
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">ต่อชั่วโมง:</span>
                          <span className="font-semibold text-blue-600">{calculations.fluidRequirements.hourly} มล.</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">ต่อวัน:</span>
                          <span className="font-semibold text-blue-600">{calculations.fluidRequirements.daily} มล.</span>
                        </div>
                      </div>
                    </div>

                    {/* Equipment Sizes */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                      <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                        Equipment Sizes
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">ET Tube:</span>
                          <span className="font-semibold text-green-600">{calculations.equipment.endotrachealTube}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">LMA Size:</span>
                          <span className="font-semibold text-green-600">{calculations.equipment.laryngealMask}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Anesthesia Options with calculated doses */}
              {calculationResult && (
                <AnesthesiaOptions 
                  result={calculationResult} 
                  calculations={calculatePediatricDoses(parseFloat(calculationResult.weight), parseFloat(calculationResult.age))} 
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
