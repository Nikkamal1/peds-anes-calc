import React from 'react';

const BottomNavigationBar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { 
      id: 'home', 
      label: 'Medicine', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    { 
      id: 'equipment', 
      label: 'Equipment', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    { 
      id: 'vitalsign', 
      label: 'Vital Sign', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-white/80 backdrop-blur-xl border-t-2 border-slate-200 shadow-2xl">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`relative inline-flex flex-col items-center justify-center px-5 py-4 hover:bg-gradient-to-t transition-all duration-300 group ${
              activeTab === tab.id 
                ? 'text-indigo-600 hover:from-indigo-50' 
                : 'text-slate-500 hover:from-slate-100 hover:text-slate-700'
            }`}
          >
            {/* Active Indicator */}
            {activeTab === tab.id && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
            )}
            
            {/* Icon */}
            <div className={`mb-1 transition-all duration-300 ${
              activeTab === tab.id 
                ? 'transform scale-110' 
                : 'group-hover:scale-105'
            }`}>
              {tab.icon}
            </div>
            
            {/* Label */}
            <span className={`text-xs font-bold transition-all duration-300 ${
              activeTab === tab.id ? 'text-indigo-700' : 'text-slate-600 group-hover:text-slate-700'
            }`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigationBar;
