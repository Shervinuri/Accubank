import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BankView } from './components/BankView';
import { ScraperView } from './components/ScraperView';
import { CleanerView } from './components/CleanerView';
import { Toast } from './components/Shared';

export type ViewState = 'bank' | 'scraper' | 'cleaner';

export default function App() {
  const [activeView, setActiveView] = useState<ViewState>('bank');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f11] font-sans selection:bg-white selection:text-black">
      {/* Header */}
      <header className="w-full bg-[#0f0f11] border-b border-[#27272a] pt-6 pb-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black text-xl shadow-lg shadow-white/5">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none text-white uppercase">
                ☬SHΞN™ <span className="text-gray-500">ACCUBANKER</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-mono tracking-[0.2em] uppercase mt-1">
                ULTIMATE TOOLKIT V3.0
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Top Navigation */}
      <Navbar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 pb-12">
        <div className={`transition-all duration-300 ${activeView === 'bank' ? 'opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-4'}`}>
          <BankView showToast={showToast} />
        </div>
        <div className={`transition-all duration-300 ${activeView === 'scraper' ? 'opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-4'}`}>
          <ScraperView showToast={showToast} />
        </div>
        <div className={`transition-all duration-300 ${activeView === 'cleaner' ? 'opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-4'}`}>
          <CleanerView showToast={showToast} />
        </div>
      </main>

      {/* Custom Footer */}
      <footer className="w-full border-t border-[#27272a] bg-[#0a0a0a] py-8 mt-auto">
          <div className="max-w-4xl mx-auto text-center">
              <p className="text-xs text-gray-600 font-mono mb-2">Developed with precision.</p>
              <a 
                href="https://T.me/shervini" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-sm font-bold text-gray-400 hover:text-white transition-colors tracking-widest border border-gray-800 rounded-full px-6 py-2 hover:border-white hover:bg-white/5"
              >
                ☬Exclusive SHΞN™ made
              </a>
          </div>
      </footer>

      {/* Global Toast */}
      {toastMsg && <Toast message={toastMsg} />}
    </div>
  );
}