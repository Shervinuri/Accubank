import React, { useState } from 'react';
import { SectionHeader, Button, Card, GuideBox } from './Shared';
import { extractData, copyToClipboard, downloadText } from '../utils/parser';
import { ScrapedItem } from '../types';

export const CleanerView = ({ showToast }: { showToast: (msg: string) => void }) => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<ScrapedItem[]>([]);
  const [processed, setProcessed] = useState(false);

  const handleProcess = () => {
      if(!text.trim()) return;
      const data = extractData(text, 'mixed');
      setResults(data);
      setProcessed(true);
      showToast(`Processed: ${data.length} items found`);
  };

  const handleClear = () => {
      setText('');
      setResults([]);
      setProcessed(false);
  };

  const accounts = results.filter(r => r.type === 'account');
  const configs = results.filter(r => r.type === 'config');

  const copySection = async (items: ScrapedItem[], type: 'account' | 'config') => {
      if(items.length === 0) return;
      let text = "";
      if (type === 'account') {
          text = items.map(r => `User: ${r.meta}\nPass: ${r.extra}`).join('\n\n');
      } else {
          text = items.map(r => r.content).join('\n');
      }
      await copyToClipboard(text);
      showToast(`${type === 'account' ? 'Accounts' : 'Configs'} Copied`);
  };

  const downloadSection = (items: ScrapedItem[], type: 'account' | 'config') => {
      if(items.length === 0) return;
      let text = "";
      if (type === 'account') {
          text = items.map(r => `User: ${r.meta}\nPass: ${r.extra}`).join('\n\n');
      } else {
          text = items.map(r => r.content).join('\n');
      }
      downloadText(text, `shen_${type}s_${Date.now()}.txt`);
  };

  return (
    <div className="animate-fade-in w-full max-w-full overflow-hidden">
      <SectionHeader 
        title="DATA REFINERY" 
        subtitle="Cleaner & Extractor Tool"
        icon="fa-filter"
      />

      <GuideBox>
          متن‌های درهم و شلوغ کپی شده از تلگرام یا سایر منابع را اینجا قرار دهید. این ابزار به صورت هوشمند کانفیگ‌ها و اکانت‌های اکسپرس را شناسایی کرده، متون اضافی را حذف می‌کند و لیستی تمیز و مرتب جهت استفاده یا کپی ارائه می‌دهد.
      </GuideBox>

      {/* Input Area */}
      <Card className="mb-6 bg-[#111]">
          <textarea
            dir="ltr"
            className="w-full h-48 bg-[#0a0a0a] border border-[#333] rounded-xl p-4 text-xs font-mono text-gray-300 focus:outline-none focus:border-white resize-none placeholder-gray-700 leading-relaxed"
            placeholder="Paste raw content containing V2Ray configs or User:Pass accounts here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
              <Button onClick={handleProcess} variant="primary">
                  <i className="fa-solid fa-wand-magic-sparkles"></i> START PROCESS
              </Button>
              <Button onClick={handleClear} variant="secondary">
                  <i className="fa-solid fa-trash"></i> CLEAR DATA
              </Button>
          </div>
      </Card>

      {/* Results */}
      {processed && (
          <div className="space-y-8 pb-12 w-full">
            
              {/* Stats Bar */}
              <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${accounts.length > 0 ? 'bg-blue-900/10 border-blue-500/30' : 'bg-[#18181b] border-[#27272a] opacity-50'}`}>
                      <span className={`text-3xl font-black ${accounts.length > 0 ? 'text-blue-400' : 'text-gray-600'}`}>{accounts.length}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Accounts</span>
                  </div>
                  <div className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${configs.length > 0 ? 'bg-purple-900/10 border-purple-500/30' : 'bg-[#18181b] border-[#27272a] opacity-50'}`}>
                      <span className={`text-3xl font-black ${configs.length > 0 ? 'text-purple-400' : 'text-gray-600'}`}>{configs.length}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Configs</span>
                  </div>
              </div>

              {/* Accounts Section */}
              {accounts.length > 0 && (
                  <div className="animate-slideUp w-full">
                      <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-2">
                          <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Extracted Accounts
                          </h3>
                          <div className="flex gap-2">
                              <button onClick={() => downloadSection(accounts, 'account')} title="Download Accounts" className="w-8 h-8 rounded-lg bg-[#222] border border-[#333] text-gray-400 hover:text-white hover:border-white transition-all flex items-center justify-center">
                                <i className="fa-solid fa-download text-xs"></i>
                              </button>
                              <button onClick={() => copySection(accounts, 'account')} title="Copy Accounts" className="w-8 h-8 rounded-lg bg-[#222] border border-[#333] text-gray-400 hover:text-white hover:border-white transition-all flex items-center justify-center">
                                <i className="fa-regular fa-copy text-xs"></i>
                              </button>
                          </div>
                      </div>
                      
                      <div className="grid gap-3">
                          {accounts.map((acc, i) => (
                              <div key={i} className="bg-[#18181b] border border-[#27272a] p-4 rounded-xl flex flex-col gap-3 group hover:border-blue-500/30 transition-colors w-full overflow-hidden relative">
                                  <div className="absolute top-3 right-3 text-[9px] text-gray-700 font-mono">#{i+1}</div>
                                  
                                  <div className="flex flex-col gap-1 cursor-pointer w-full" onClick={() => {copyToClipboard(acc.meta!); showToast('Email Copied');}}>
                                      <span className="text-[9px] text-gray-500 uppercase tracking-widest text-left">Username</span>
                                      <div className="flex justify-between items-center gap-2 bg-black/20 p-2 rounded-lg border border-white/5 group-hover:border-white/10 w-full overflow-hidden">
                                        <code className="text-xs text-blue-300 font-mono truncate select-all">{acc.meta}</code>
                                        <i className="fa-regular fa-copy text-[10px] text-gray-600 shrink-0"></i>
                                      </div>
                                  </div>
                                  
                                  <div className="flex flex-col gap-1 cursor-pointer w-full" onClick={() => {copyToClipboard(acc.extra!); showToast('Pass Copied');}}>
                                      <span className="text-[9px] text-gray-500 uppercase tracking-widest text-left">Password</span>
                                      <div className="flex justify-between items-center gap-2 bg-black/20 p-2 rounded-lg border border-white/5 group-hover:border-white/10 w-full overflow-hidden">
                                        <code className="text-xs text-white font-mono truncate select-all">{acc.extra}</code>
                                        <i className="fa-solid fa-key text-[10px] text-gray-600 shrink-0"></i>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {/* Configs Section */}
              {configs.length > 0 && (
                  <div className="animate-slideUp w-full">
                      <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-2">
                          <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                              <span className="w-2 h-2 rounded-full bg-purple-500"></span> Extracted Configs
                          </h3>
                          <div className="flex gap-2">
                              <button onClick={() => downloadSection(configs, 'config')} title="Download Configs" className="w-8 h-8 rounded-lg bg-[#222] border border-[#333] text-gray-400 hover:text-white hover:border-white transition-all flex items-center justify-center">
                                <i className="fa-solid fa-download text-xs"></i>
                              </button>
                              <button onClick={() => copySection(configs, 'config')} title="Copy Configs" className="w-8 h-8 rounded-lg bg-[#222] border border-[#333] text-gray-400 hover:text-white hover:border-white transition-all flex items-center justify-center">
                                <i className="fa-regular fa-copy text-xs"></i>
                              </button>
                          </div>
                      </div>

                      <div className="grid gap-3">
                          {configs.map((conf, i) => (
                              <div key={i} className="bg-[#18181b] border border-[#27272a] p-3 rounded-xl flex items-center gap-3 group hover:border-purple-500/30 transition-colors w-full overflow-hidden">
                                  <div className="w-8 h-8 shrink-0 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-xs border border-purple-500/20">
                                    {i+1}
                                  </div>
                                  <div className="flex-1 min-w-0 flex flex-col gap-1 overflow-hidden">
                                      <div className="flex items-center gap-2">
                                          <span className="text-[9px] font-bold bg-white/5 px-1.5 py-0.5 rounded text-gray-400 border border-white/5">{conf.meta}</span>
                                      </div>
                                      <code className="text-[10px] text-gray-500 truncate font-mono block w-full">{conf.content}</code>
                                  </div>
                                  <button onClick={() => {copyToClipboard(conf.content); showToast('Config Copied');}} className="w-8 h-8 shrink-0 rounded-lg bg-[#222] border border-[#333] text-gray-400 hover:text-white hover:border-white transition-all flex items-center justify-center">
                                      <i className="fa-regular fa-copy text-xs"></i>
                                  </button>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
          </div>
      )}
    </div>
  );
};