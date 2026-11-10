import React from 'react';
import { NavTab } from '../types';
import { PlusCircle, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenQuickUpload: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenQuickUpload,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onTabChange('dashboard')}
            className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
              천안 AI 에듀허브
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-slate-500 font-normal">
              천안시 AI 강사 통합 플랫폼
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 Clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onTabChange('dashboard')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'dashboard'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            대시보드
          </button>
          <button
            onClick={() => onTabChange('materials')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'materials'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            교육자료실
          </button>
          <button
            onClick={() => onTabChange('students')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'students'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            수강생 관리
          </button>
          <button
            onClick={() => onTabChange('network')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'network'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            출강 매칭·네트워크
          </button>
          <button
            onClick={() => onTabChange('ai-assistant')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 flex items-center gap-1.5 ${
              activeTab === 'ai-assistant'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            AI 교안 어시스턴트
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenQuickUpload}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>자료 등록</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub Navigation bar */}
      <div className="md:hidden flex items-center gap-1 px-3 py-2 bg-slate-50 border-t border-slate-200 overflow-x-auto text-xs">
        <button
          onClick={() => onTabChange('dashboard')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'dashboard' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          대시보드
        </button>
        <button
          onClick={() => onTabChange('materials')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'materials' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          자료실
        </button>
        <button
          onClick={() => onTabChange('students')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'students' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          수강생
        </button>
        <button
          onClick={() => onTabChange('network')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'network' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          출강매칭
        </button>
        <button
          onClick={() => onTabChange('ai-assistant')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'ai-assistant' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          AI교안
        </button>
      </div>
    </header>
  );
};
