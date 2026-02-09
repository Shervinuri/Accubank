import React, { useState } from 'react';
import { SectionHeader, Button, Card, GuideBox } from './Shared';
import { extractData, copyToClipboard } from '../utils/parser';
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

  const handleCopyAll = async () => {
      if(results.length === 0) return;
      const blob = results.map(r => r.type === 'account' ? `User: ${r.meta}\nPass: ${r.extra}` : r.content).join('\n\n');
      await copyToClipboard(blob);
      showToast('All items copied');
  };

  const accounts = results.filter(r => r.type === 'account');
  const configs = results.filter(r => r.type === 'config');

  return (
    <div className="animate-fade-in">
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
          <div className="space-y-6 pb-12">
              {/* Stats Bar */}
              <div className="flex gap-4">
                  <div className="flex-1 bg-blue-900/10 border border-blue-900/30 p-3 rounded-lg flex flex-col items-center">
                      <span className="text-2xl font-black text-blue-400">{accounts.length}</span>
                      <span className="text-[10px] text-blue-300/50 uppercase tracking-widest">Accounts</span>
                  </div>
                  <div className="flex-1 bg-purple-900/10 border border-purple-900/30 p-3 rounded-lg flex flex-col items-center">
                      <span className="text-2xl font-black text-purple-400">{configs.length}</span>
                      <span className="text-[10px] text-purple-300/50 uppercase tracking-widest">Configs</span>
                  </div>
              </div>
            
              {results.length > 0 && (
                   <Button onClick={handleCopyAll} variant="secondary" className="w-full text-xs py-3">
                       <i className="fa-regular fa-copy"></i> COPY REFINED RESULTS
                   </Button>
              )}

              {/* Accounts List */}
              {accounts.length > 0 && (
                  <div>
                      <h3 className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2 uppercase tracking-wider pl-2 border-l-2 border-blue-500">
                          Extracted Accounts
                      </h3>
                      <div className="grid gap-2">
                          {accounts.map((acc, i) => (
                              <div key={i} className="bg-[#18181b] border border-[#27272a] p-3 rounded-lg flex flex-col gap-2 group">
                                  <div className="flex justify-between items-center cursor-pointer hover:text-white transition-colors" onClick={() => {copyToClipboard(acc.meta!); showToast('Email Copied');}}>
                                      <code className="text-xs text-gray-400 truncate">{acc.meta}</code>
                                      <i className="fa-regular fa-copy text-gray-700 group-hover:text-white"></i>
                                  </div>
                                  <div className="h-px bg-white/5 w-full"></div>
                                  <div className="flex justify-between items-center cursor-pointer hover:text-white transition-colors" onClick={() => {copyToClipboard(acc.extra!); showToast('Pass Copied');}}>
                                      <code className="text-xs text-white font-bold truncate">{acc.extra}</code>
                                      <i className="fa-solid fa-key text-gray-700 group-hover:text-white"></i>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {/* Configs List */}
              {configs.length > 0 && (
                  <div>
                      <h3 className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2 uppercase tracking-wider pl-2 border-l-2 border-purple-500">
                          Extracted Configs
                      </h3>
                      <div className="grid gap-2">
                          {configs.map((conf, i) => (
                              <div key={i} className="bg-[#18181b] border border-[#27272a] p-3 rounded-lg flex items-center justify-between gap-3 group hover:border-gray-600 transition-colors">
                                  <div className="flex items-center gap-3 overflow-hidden">
                                      <span className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded text-gray-400">{conf.meta}</span>
                                      <code className="text-[10px] text-gray-500 truncate opacity-70 group-hover:opacity-100">{conf.content}</code>
                                  </div>
                                  <button onClick={() => {copyToClipboard(conf.content); showToast('Copied');}} className="text-gray-500 hover:text-white hover:scale-110 transition-all">
                                      <i className="fa-regular fa-copy"></i>
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