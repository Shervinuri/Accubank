import React from 'react';
import { ViewState } from '../App';

interface NavbarProps {
  activeView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'bank', icon: 'fa-server', label: 'Express Bank' },
    { id: 'scraper', icon: 'fa-spider', label: 'Scraper' },
    { id: 'cleaner', icon: 'fa-filter', label: 'Cleaner' },
  ];

  return (
    <div className="w-full bg-[#18181b] border-y border-[#27272a] mb-6">
      <div className="max-w-4xl mx-auto flex">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as ViewState)}
              className={`flex-1 py-4 flex flex-col md:flex-row items-center justify-center gap-2 transition-all relative overflow-hidden group outline-none ${
                isActive 
                  ? 'text-white bg-white/5' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
              }`}
            >
              <i className={`fa-solid ${item.icon} ${isActive ? 'scale-110' : ''} transition-transform`}></i>
              <span className="text-xs md:text-sm font-bold font-mono tracking-wider uppercase">{item.label}</span>
              
              {/* Active Indicator Line */}
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};