import React, { useState } from 'react';
import { SectionHeader, Button, Card, GuideBox } from './Shared';
import { extractData, copyToClipboard, downloadText } from '../utils/parser';
import { ScrapedItem } from '../types';

export const ScraperView = ({ showToast }: { showToast: (msg: string) => void }) => {
  const [input, setInput] = useState('');
  const [depth, setDepth] = useState(5);
  const [mode, setMode] = useState<'config' | 'account'>('config');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<ScrapedItem[]>([]);

  const addLog = (msg: string) => setLogs(prev => [...prev, `> ${msg}`].slice(-8));

  const fetchPage = async (url: string) => {
    const proxies = [
        "https://api.allorigins.win/raw?url=",
        "https://corsproxy.io/?",
        "https://thingproxy.freeboard.io/fetch/"
    ];
    
    for (const proxy of proxies) {
        try {
            const res = await fetch(proxy + encodeURIComponent(url));
            if (res.ok) return await res.text();
        } catch (e) { console.warn('Proxy failed', proxy); }
    }
    return null;
  };

  const startScan = async () => {
    if (!input) return;
    setLoading(true);
    setResults([]);
    setLogs([]);
    
    let channelName = input.replace('https://t.me/', '').replace('@', '').split('/')[0];
    if(input.includes('/s/')) channelName = input.split('/s/')[1].split('/')[0];

    addLog(`INIT: Target ${channelName} | Mode: ${mode.toUpperCase()}`);
    let nextUrl = `https://t.me/s/${channelName}`;
    let maxPages = depth;
    const allItems: ScrapedItem[] = [];
    const seen = new Set();

    for (let i = 0; i < maxPages; i++) {
        addLog(`Scanning Page [${i + 1}/${maxPages}]...`);
        try {
            const html = await fetchPage(nextUrl);
            if (!html) throw new Error('Fetch failed');

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const messages = doc.querySelectorAll('.tgme_widget_message_text');
            const messageNodes = doc.querySelectorAll('.tgme_widget_message');

            messages.forEach(msg => {
                const text = msg.innerHTML.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, ' ');
                // Pass the specific mode to extractor
                const extracted = extractData(text, mode);
                
                extracted.forEach(item => {
                    const key = item.content;
                    if (!seen.has(key)) {
                        seen.add(key);
                        allItems.push(item);
                    }
                });
            });

            addLog(`Found ${allItems.length} items so far...`);

            // Pagination
            let minId = Infinity;
             messageNodes.forEach((m) => {
                const dp = m.getAttribute('data-post');
                if (dp) {
                    const id = parseInt(dp.split('/')[1]);
                    if (id < minId) minId = id;
                }
            });

            if (minId !== Infinity && minId > 1) {
                nextUrl = `https://t.me/s/${channelName}?before=${minId}`;
            } else {
                addLog('Info: End of channel history.');
                break;
            }
            
            await new Promise(r => setTimeout(r, 800));

        } catch (err) {
            addLog('Error: Connection timed out or blocked.');
            break;
        }
    }

    setResults(allItems);
    addLog(`DONE. Total Unique Items: ${allItems.length}`);
    setLoading(false);
  };

  const handleDownload = () => {
      if(results.length === 0) return;
      const content = results.map(r => r.type === 'account' ? `User: ${r.meta}\nPass: ${r.extra}\n----------------` : r.content).join('\n');
      downloadText(content, `shen_dump_${mode}_${Date.now()}.txt`);
  };

  const handleCopyAll = async () => {
      if(results.length === 0) return;
      const content = results.map(r => r.type === 'account' ? `User: ${r.meta}\nPass: ${r.extra}` : r.content).join('\n');
      await copyToClipboard(content);
      showToast('کل نتایج کپی شد');
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader 
        title="CHANNEL SCRAPER" 
        subtitle="Advanced Telegram Harvester"
        icon="fa-spider"
      />

      <GuideBox>
        ابتدا <strong>مود اسکرپر</strong> را انتخاب کنید. اگر دنبال اکانت اکسپرس هستید روی Express Account و اگر دنبال کانفیگ V2ray هستید روی Config قرار دهید. 
        لینک یا آیدی کانال را وارد کرده، عمق جستجو را تنظیم کنید و استارت بزنید. نتایج به صورت تفکیک شده نمایش داده می‌شوند.
      </GuideBox>

      <Card className="mb-6 border-gray-800 bg-black/40">
        <div className="flex flex-col gap-4">
            {/* Mode Switcher */}
            <div className="grid grid-cols-2 gap-2 bg-black/50 p-1 rounded-xl border border-gray-800">
                <button 
                    onClick={() => setMode('config')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${mode === 'config' ? 'bg-white text-black' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    <i className="fa-solid fa-bolt"></i> V2RAY CONFIGS
                </button>
                <button 
                    onClick={() => setMode('account')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${mode === 'account' ? 'bg-white text-black' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    <i className="fa-solid fa-shield-halved"></i> EXPRESS ACCOUNTS
                </button>
            </div>

            {/* Input & Slider */}
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <i className="fa-brands fa-telegram absolute left-4 top-3.5 text-gray-500"></i>
                    <input 
                        dir="ltr"
                        type="text" 
                        placeholder="Target Channel ID (e.g. @ProxyMTProto)"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full bg-[#111] border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-white focus:outline-none font-mono text-white transition-colors placeholder-gray-700"
                    />
                </div>
                
                <div className="bg-[#111] p-3 rounded-xl border border-gray-800 flex items-center justify-between gap-4">
                    <span className="text-xs text-gray-500 font-bold whitespace-nowrap">SCAN DEPTH: <span className="text-white">{depth} Pages</span></span>
                    <input 
                        type="range" 
                        min="1" 
                        max="20" 
                        step="1"
                        value={depth}
                        onChange={(e) => setDepth(parseInt(e.target.value))}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                </div>
            </div>
            
            <Button onClick={startScan} disabled={loading} className="w-full py-4 text-base" variant="primary">
                {loading ? <span className="animate-pulse">SCANNING NODES...</span> : 'START HARVEST'}
            </Button>

            {/* Terminal Log */}
            <div className="bg-[#050505] rounded-lg p-3 font-mono text-[10px] h-32 overflow-y-auto border border-green-900/30 shadow-[inset_0_0_20px_rgba(0,0,0,1)] relative">
                <div className="absolute top-2 right-2 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-green-500/50 mb-2 border-b border-green-900/30 pb-1">root@shen-tool:~# tail -f /var/log/scraper</div>
                {logs.length === 0 ? <span className="text-gray-700 animate-pulse">_waiting_for_command</span> : logs.map((l, i) => <div key={i} className="text-green-500 mb-1 font-bold">{l}</div>)}
            </div>
        </div>
      </Card>

      {/* Results Actions */}
      {results.length > 0 && (
          <div className="flex gap-2 mb-4 animate-slideUp">
              <Button onClick={handleCopyAll} variant="secondary" className="flex-1 text-xs">
                  <i className="fa-regular fa-copy"></i> Copy All
              </Button>
              <Button onClick={handleDownload} variant="secondary" className="flex-1 text-xs">
                  <i className="fa-solid fa-download"></i> Download .TXT
              </Button>
          </div>
      )}

      {/* Results List */}
      {results.length > 0 && (
          <div className="space-y-2 pb-10">
              <div className="text-xs text-gray-500 font-mono mb-2 uppercase text-right">
                  Found {results.length} {mode === 'config' ? 'Configs' : 'Accounts'}
              </div>
              {results.map((item, idx) => (
                  <div key={idx} className="bg-[#18181b] border border-[#27272a] rounded-lg p-3 group relative hover:border-gray-600 transition-colors">
                       {item.type === 'account' ? (
                           <div className="flex flex-col gap-2">
                               <div className="flex justify-between items-center bg-black/40 p-2 rounded cursor-pointer hover:bg-black/60" onClick={() => {copyToClipboard(item.meta || ""); showToast('Email copied');}}>
                                   <span className="font-mono text-xs text-gray-300 truncate max-w-[80%]">{item.meta}</span>
                                   <i className="fa-regular fa-copy text-gray-600 text-xs"></i>
                               </div>
                               <div className="flex justify-between items-center bg-black/40 p-2 rounded cursor-pointer hover:bg-black/60" onClick={() => {copyToClipboard(item.extra || ""); showToast('Pass copied');}}>
                                   <span className="font-mono text-xs font-bold text-white truncate max-w-[80%]">{item.extra}</span>
                                   <i className="fa-solid fa-key text-gray-600 text-xs"></i>
                               </div>
                           </div>
                       ) : (
                           <div className="flex justify-between items-center gap-3">
                               <div className="bg-white/10 text-white text-[10px] px-2 py-1 rounded uppercase font-bold min-w-[50px] text-center border border-white/5">
                                   {item.meta}
                               </div>
                               <div className="flex-1 font-mono text-[10px] text-gray-500 truncate">
                                   {item.content.substring(0, 40)}...
                               </div>
                               <button onClick={() => {copyToClipboard(item.content); showToast('Config copied');}} className="text-white hover:text-green-400 transition-colors px-2">
                                   <i className="fa-regular fa-copy"></i>
                               </button>
                           </div>
                       )}
                  </div>
              ))}
          </div>
      )}
    </div>
  );
};