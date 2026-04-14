
import React, { useState, useEffect } from 'react'
import './App.css'
import BottomNavigationBar from './components/BottomNavigationBar'
import Home from './components/Home'
import ResultDetail from './components/ResultDetail'
import Equipment from './components/Equipment'
import VitalSign from './components/VitalSign'
import Footer from './components/Footer'
function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [results, setResults] = useState([])
  const [selectedResultIndex, setSelectedResultIndex] = useState(null)

  const handleCalculate = (formData) => {
    const newResult = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toLocaleString('th-TH')
    }
    setResults(prev => [newResult, ...prev])
    // ไปที่หน้า ResultDetail ทันที โดยเลือกผลการคำนวณล่าสุด (index 0)
    setSelectedResultIndex(0)
    setActiveTab('results')
  }

  const handleBackFromDetail = () => {
    // รีเซ็ต formData ใน localStorage
    localStorage.removeItem('anesthesiaFormData')
    setSelectedResultIndex(null)
    setActiveTab('home') // กลับไปหน้า home
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTabChange = (tab) => {
    // ถ้ากดปุ่ม home และมีผลการคำนวณอยู่ ให้แสดงหน้า results แทน
    if (tab === 'home' && results.length > 0) {
      setActiveTab('results')
      setSelectedResultIndex(0) // แสดงผลการคำนวณล่าสุด
    } else {
      setActiveTab(tab)
      if (tab !== 'results') {
        setSelectedResultIndex(null)
      }
    }
    // Scroll to top เมื่อเปลี่ยน tab
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Scroll to top เมื่อ activeTab เปลี่ยน
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])

  const handleClearResults = () => {
    if (window.confirm('คุณต้องการลบผลการคำนวณทั้งหมดหรือไม่?')) {
      setResults([])
      setSelectedResultIndex(null)
      setActiveTab('home')
    }
  }

  const renderCurrentView = () => {
    // ถ้ามีผลการคำนวณและอยู่ที่หน้า home หรือ results ให้แสดง ResultDetail
    if (results.length > 0 && (activeTab === 'results' || selectedResultIndex !== null)) {
      const indexToShow = selectedResultIndex !== null ? selectedResultIndex : 0
      return (
        <ResultDetail
          result={results[indexToShow]}
          onBack={handleBackFromDetail}
        />
      )
    }

    switch (activeTab) {
      case 'home':
        return <Home onCalculate={handleCalculate} onClearResults={handleClearResults} hasResults={results.length > 0} />
      case 'results':
        // แสดงผลการคำนวณล่าสุด หรือข้อความว่าไม่มีข้อมูล
        if (results.length > 0) {
          return (
            <ResultDetail
              result={results[0]}
              onBack={handleBackFromDetail}
            />
          )
        } else {
          return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 pb-20 flex items-center justify-center">
              <div className="text-center max-w-sm mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-slate-700 mb-2">ยังไม่มีผลการคำนวณ</h2>
                <p className="text-slate-500 mb-6">กรุณาทำการคำนวณก่อนเพื่อดูผลลัพธ์</p>
              </div>
            </div>
          )
        }
      case 'equipment':
        // แสดงหน้า Equipment โดยใช้ข้อมูลจากผลการคำนวณล่าสุด
        return <Equipment result={results.length > 0 ? results[0] : null} />
      case 'vitalsign':
        // แสดงหน้า Vital Sign โดยใช้ข้อมูลจากผลการคำนวณล่าสุด
        return <VitalSign result={results.length > 0 ? results[0] : null} />
      case 'profile':
        return (
          <div className="min-h-screen bg-gray-50 p-4 pb-20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">👤</div>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">โปรไฟล์</h2>
              <p className="text-gray-500">ฟีเจอร์นี้จะมาเร็วๆ นี้</p>
            </div>
          </div>
        )
      default:
        return <Home onCalculate={handleCalculate} />
    }
  }

  return (
    <div className="App">
      {renderCurrentView()}
       <Footer/>  {/* 👈 ใส่ตรงนี้ */}
      <BottomNavigationBar
        activeTab={activeTab === 'results' && results.length > 0 ? 'home' : activeTab}
        onTabChange={handleTabChange}
      />
      
    </div>
  )
}

export default App
