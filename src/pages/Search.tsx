import React from 'react';
import { motion } from 'motion/react';
import { Search as SearchIcon, MapPin, Activity, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Search() {
  const searchResults = [
    {
      id: 'VS-2024-0892',
      name: '김순옥',
      age: 78,
      location: '서울특별시 강남구',
      subLocation: '대치동 삼성아파트',
      tags: ['고혈압', '골다공증'],
      status: '안정적',
      lastCheck: '2일 전',
      photo: 'https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?auto=format&fit=crop&q=80&w=100&h=100'
    },
    {
      id: 'VS-2024-1104',
      name: '박철수',
      age: 82,
      location: '경기도 성남시',
      subLocation: '분당구 정자동',
      tags: ['당뇨', '심혈관'],
      status: '주의 필요',
      lastCheck: '오늘 오전',
      photo: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80&w=100&h=100'
    }
  ];

  const managedSeniors = [
    { name: '김순자', status: '주의', time: '오늘 오전 09:32', photo: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=100&h=100' },
    { name: '박정웅', status: '안정', time: '어제 오후 06:15', photo: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80&w=100&h=100' },
    { name: '이영희', status: '안정', time: '오늘 오전 08:45', photo: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=100&h=100' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black font-headline text-slate-900 tracking-tight mb-2">시니어 통합 검색 및 등록</h2>
          <p className="text-slate-500 font-medium">Vitalis 네트워크 내의 모든 시니어를 검색하고 관리 목록으로 등록합니다.</p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-primary text-white font-black text-sm shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
          <UserPlus size={20} />
          선택 항목 일괄 추가
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <SearchIcon className="text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
          </div>
          <input 
            type="text" 
            className="block w-full pl-14 pr-4 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-base font-bold placeholder:text-slate-400"
            placeholder="성함 또는 등록 ID를 입력하여 시니어를 검색하세요..."
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-black text-slate-400 bg-white border border-slate-200 rounded-lg">ENTER</kbd>
          </div>
        </div>
      </div>

      {/* Search Results Table */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-5 w-12 text-center">
                  <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                </th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">시니어 정보</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">거주 지역</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">주요 건강 정보</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">현재 상태</th>
                <th className="p-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {searchResults.map((result) => (
                <tr key={result.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 text-center">
                    <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <img src={result.photo} alt={result.name} className="w-12 h-12 rounded-full object-cover border border-slate-100" />
                      <div>
                        <div className="font-black text-slate-900 text-base">{result.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold">{result.age}세 · ID: {result.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                        <MapPin size={14} className="text-slate-400" />
                        <span>{result.location}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold mt-0.5 ml-5">{result.subLocation}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-wrap gap-1.5">
                      {result.tags.map((tag, i) => (
                        <span key={i} className={cn(
                          "px-2 py-0.5 rounded-full text-[9px] font-black uppercase",
                          tag === '고혈압' || tag === '당뇨' || tag === '심혈관' ? "bg-error/10 text-error" : "bg-slate-100 text-slate-500"
                        )}>{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        result.status === '안정적' ? "bg-tertiary" : "bg-error animate-pulse"
                      )}></div>
                      <span className={cn(
                        "text-sm font-black",
                        result.status === '안정적' ? "text-tertiary" : "text-error"
                      )}>{result.status}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-bold">최근 검진: {result.lastCheck}</div>
                  </td>
                  <td className="p-5 text-right">
                    <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-black hover:bg-primary hover:text-white transition-all active:scale-95 border border-slate-200">
                      관리 목록에 추가
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-5 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TOTAL <span className="text-slate-900">1,284</span> RESULTS</div>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white hover:text-primary transition-all"><ChevronLeft size={18} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-black">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-black text-slate-500 hover:bg-white hover:text-primary transition-all">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-black text-slate-500 hover:bg-white hover:text-primary transition-all">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white hover:text-primary transition-all"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      {/* Managed Seniors List */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-2 rounded-xl">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-900">현재 관리 목록에 포함된 시니어</h3>
          </div>
          <span className="text-xs font-black text-slate-400">총 24명 관리 중</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">시니어 이름</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">상태</th>
                <th className="pb-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">최근 업데이트</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {managedSeniors.map((senior, i) => (
                <tr key={i}>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img src={senior.photo} alt={senior.name} className="w-8 h-8 rounded-full object-cover" />
                      <span className="font-black text-slate-900">{senior.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black",
                      senior.status === '주의' ? "bg-error-container text-error" : "bg-tertiary/10 text-tertiary"
                    )}>
                      <div className={cn("w-1.5 h-1.5 rounded-full", senior.status === '주의' ? "bg-error" : "bg-tertiary")}></div>
                      {senior.status}
                    </span>
                  </td>
                  <td className="py-4 text-right text-sm text-slate-400 font-bold">{senior.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
