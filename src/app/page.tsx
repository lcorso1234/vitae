"use client";

import React, { useState, useEffect } from 'react';
import { VitaeData } from '@/types/vitae';
import { initialVitaeData } from '@/data/initialState';
import { VitaeForm } from '@/components/VitaeForm';
import { VitaePreview } from '@/components/VitaePreview';
import { CoverLetterPreview } from '@/components/CoverLetterPreview';
import { Checklist } from '@/components/Checklist';

export default function Home() {
  const [data, setData] = useState<VitaeData>(initialVitaeData);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('vitae-data-v4');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.coverLetter && initialVitaeData.coverLetter) {
        parsed.coverLetter = initialVitaeData.coverLetter;
      }
      setData(parsed);
    }
  }, []);

  const handleDataChange = (newData: VitaeData) => {
    setData(newData);
    localStorage.setItem('vitae-data-v4', JSON.stringify(newData));
  };

  const handlePrint = (target: 'vitae' | 'coverLetter') => {
    document.body.setAttribute('data-print-target', target);
    // Give a tiny bit of time for DOM to register the attribute before triggering print.
    setTimeout(() => {
      window.print();
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#050505] print:bg-[#faf9f6] text-zinc-200 font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="no-print fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/r.svg" alt="Logo" className="w-8 h-8 object-contain" />
              <div className="text-xl font-black tracking-tighter text-white uppercase italic">Vitae</div>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] hidden sm:block">ATS Intelligence v2.1</div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handlePrint('coverLetter')}
              className="h-11 px-6 rounded-full bg-indigo-500/10 text-indigo-400 font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Cover Letter
            </button>
            <button 
              onClick={() => handlePrint('vitae')}
              className="h-11 px-8 rounded-full bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-3 group shadow-2xl shadow-white/5 cursor-pointer active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Vitae
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-4 sm:px-6 max-w-[1600px] mx-auto">
        {/* Quick Progress Header (Mobile Only) */}
        <div className="xl:hidden mb-8 no-print">
          <div className="bg-zinc-900 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-400">Vitae Progress</span>
            <div className="flex items-center gap-4">
               <div className="w-32 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                 <div 
                   className="bg-indigo-500 h-full transition-all duration-500" 
                   style={{ width: `${(data.summary.split(/[.!?]/).filter(s => s.trim().length > 0).length >= 3 ? 80 : 40)}%` }} 
                 />
               </div>
               <span className="text-xs font-bold text-white">Live Validation Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr,340px] gap-12 items-start">
          
          {/* Main Content Area */}
          <div className="space-y-12">
            {/* View Switcher (Mobile) */}
            <div className="xl:hidden flex p-1 bg-zinc-900 border border-white/5 rounded-full w-fit mb-8 no-print">
              <button 
                onClick={() => setActiveTab('editor')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'editor' ? 'bg-zinc-800 text-white shadow-xl' : 'text-zinc-500'}`}
              >
                Editor
              </button>
              <button 
                onClick={() => setActiveTab('preview')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === 'preview' ? 'bg-zinc-800 text-white shadow-xl' : 'text-zinc-500'}`}
              >
                Preview
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column: Form (Editor) */}
              <div className={`${activeTab !== 'editor' ? 'hidden' : 'block'} lg:block no-print`}>
                <div className="max-w-2xl mx-auto">
                  <header className="mb-12">
                    <h2 className="text-4xl font-bold tracking-tighter text-white mb-2">Build your Vitae.</h2>
                    <p className="text-zinc-400">Complete the sections below. Your changes are saved automatically.</p>
                  </header>
                  <VitaeForm data={data} onChange={handleDataChange} />
                </div>
              </div>

              <div className={`${activeTab !== 'preview' ? 'hidden' : 'block'} lg:block sticky top-28`}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 no-print" />
                  <div className="relative xl:max-h-[calc(100vh-10rem)] overflow-y-auto rounded-xl scrollbar-hide no-print lg:p-1 bg-black/40 border border-white/5 backdrop-blur-sm">
                    <VitaePreview data={data} />
                    <CoverLetterPreview data={data} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Checklist */}
          <aside className="no-print sticky top-24 hidden xl:block">
             <Checklist data={data} />
          </aside>

          {/* Mobile Checklist (Visible only on small screens at the bottom) */}
          <div className="xl:hidden no-print mt-12 border-t border-white/5 pt-12">
            <Checklist data={data} />
          </div>
        </div>
      </main>

      {/* Footer Meta (No-Print) */}
      <footer className="no-print py-12 border-t border-white/5 mt-20 text-center">
        <p className="text-sm text-zinc-500">© 2026 Vitae Builder | Designed for high-performance job seeking.</p>
      </footer>

      {/* Global Print Optimized Version (Always accessible to print engine) */}
      <div className="hidden print:block absolute top-0 left-0 w-full">
        <VitaePreview data={data} />
        <CoverLetterPreview data={data} />
      </div>
    </div>
  );
}
