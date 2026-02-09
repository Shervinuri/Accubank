import React from 'react';

export const Toast = ({ message }: { message: string }) => (
  <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-[slideUp_0.3s_ease-out] w-max max-w-[90vw]">
    <div className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl border border-white/20 flex items-center gap-3">
      <i className="fa-solid fa-check-circle text-green-400"></i>
      <span className="font-bold text-sm font-mono truncate">{message}</span>
    </div>
  </div>
);

export const SectionHeader = ({ title, icon, subtitle }: { title: string, icon: string, subtitle: string }) => (
  <div className="mb-6 border-l-4 border-white pl-4 py-1">
    <div className="flex items-center gap-3 mb-1">
      <i className={`fa-solid ${icon} text-white text-xl`}></i>
      <h2 className="text-xl font-black text-white uppercase tracking-tighter">{title}</h2>
    </div>
    <p className="text-xs text-gray-400 font-mono">{subtitle}</p>
  </div>
);

export const GuideBox = ({ children }: { children?: React.ReactNode }) => (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 text-xs text-gray-400 leading-relaxed font-sans">
        <div className="flex items-center gap-2 text-white mb-2 font-bold">
            <i className="fa-solid fa-circle-info text-blue-400"></i>
            <span>راهنما</span>
        </div>
        {children}
    </div>
);

export const Button = ({ onClick, children, variant = 'primary', className = '', disabled = false }: any) => {
  const base = "px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-br from-white to-gray-200 text-black border-gray-300 border-b-4 shadow-[0_4px_12px_rgba(255,255,255,0.2),inset_0_-2px_0_rgba(0,0,0,0.05)] active:border-b-0 active:translate-y-1 hover:to-white transform",
    secondary: "bg-transparent border border-gray-600 text-gray-300 hover:border-white hover:text-white active:scale-95",
    danger: "bg-red-900/20 text-red-400 border border-red-900/50 hover:bg-red-900/40 active:scale-95",
    ghost: "text-gray-500 hover:text-white bg-transparent active:scale-95",
    terminal: "bg-black border border-green-900 text-green-500 font-mono hover:bg-green-900/10 hover:border-green-500 active:scale-95"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${base} ${variants[variant as keyof typeof variants]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{ children?: React.ReactNode; className?: string; noPadding?: boolean }> = ({ children, className = '', noPadding = false }) => (
  <div className={`bg-[#18181b] border border-[#27272a] rounded-xl shadow-sm ${noPadding ? '' : 'p-4'} ${className}`}>
    {children}
  </div>
);