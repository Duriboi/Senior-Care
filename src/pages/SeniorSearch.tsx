import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  UserPlus, 
  MapPin, 
  Activity, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SeniorSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const searchResults = [
    {
      id: 1,
      name: '김순옥',
      age: 78,
      regId: 'VS-2024-0892',
      address: '서울특별시 강남구',
      subAddress: '대치동 삼성아파트',
      healthInfo: ['고혈압', '골다공증'],
      status: '안정적',
      lastCheck: '2일 전',
      photo: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=100&h=100'
    },
    {
      id: 2,
      name: '박철수',
      age: 82,
      regId: 'VS-2024-1104',
      address: '경기도 성남시',
      subAddress: '분당구 정자동',
      healthInfo: ['당뇨', '심혈관'],
      status: '주의 필요',
      lastCheck: '오늘 오전',
      photo: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80&w=100&h=100'
    }
  ];

  const currentManaged = [
    { name: '김순자', status: '주의', time: '오늘 오전 09:32', photo: 'https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?auto=format&fit=crop&q=80&w=100&h=100' },
    { name: '박정웅', status: '안정', time: '어제 오후 06:15', photo: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80&w=100&h=100' },
    { name: '이영희', status: '안정', time: '오늘 오전 08:45', photo: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=100&h=100' }
  ];

  const toggleSelect = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">시니어 통합 검색 및 등록</h2>
          <p className="text-base text-slate-500 font-bold mt-2">Vitalis 네트워크 내의 모든 시니어를 검색하고 관리 목록으로 등록합니다.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
          <UserPlus size={20} />
          선택 항목 일괄 추가
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-[32px] p-4 shadow-sm border border-slate-100">
        <div className="relative flex items-center">
          <div className="absolute left-6 text-slate-400">
            <Search size={24} />
          </div>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="성함 또는 등록 ID를 입력하여 시니어를 검색하세요..."
            className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-16 pr-32 text-lg font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <button className="absolute right-4 px-6 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-400 hover:text-primary hover:border-primary transition-all">
            ENTER
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="p-8 w-20">
                <div className="flex items-center justify-center">
                  <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                </div>
              </th>
              <th className="p-8 text-sm font-black text-slate-400 uppercase tracking-wider">시니어 정보</th>
              <th className="p-8 text-sm font-black text-slate-400 uppercase tracking-wider">거주 지역</th>
              <th className="p-8 text-sm font-black text-slate-400 uppercase tracking-wider text-center">주요 건강 정보</th>
              <th className="p-8 text-sm font-black text-slate-400 uppercase tracking-wider">현재 상태</th>
              <th className="p-8 text-sm font-black text-slate-400 uppercase tracking-wider text-right">액션</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((senior) => (
              <tr key={senior.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-none">
                <td className="p-8">
                  <div className="flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(senior.id)}
                      onChange={() => toggleSelect(senior.id)}
                      className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer" 
                    />
                  </div>
                </td>
                <td className="p-8">
                  <div className="flex items-center gap-5">
                    <img src={senior.photo} alt={senior.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                    <div>
                      <p className="text-lg font-black text-slate-900">{senior.name}</p>
                      <p className="text-xs text-slate-400 font-bold mt-1">{senior.age}세 · ID: {senior.regId}</p>
                    </div>
                  </div>
                </td>
                <td className="p-8">
                  <div className="flex items-start gap-2">
                    <MapPin size={18} className="text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-black text-slate-900">{senior.address}</p>
                      <p className="text-xs text-slate-400 font-bold mt-1">{senior.subAddress}</p>
                    </div>
                  </div>
                </td>
                <td className="p-8">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {senior.healthInfo.map(tag => (
                      <span key={tag} className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black",
                        tag === '고혈압' || tag === '당뇨' ? "bg-error/10 text-error" : "bg-slate-100 text-slate-500"
                      )}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-8">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      senior.status === '안정적' ? "bg-tertiary" : "bg-error"
                    )} />
                    <div>
                      <p className={cn(
                        "text-sm font-black",
                        senior.status === '안정적' ? "text-tertiary" : "text-error"
                      )}>{senior.status}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1">최근 검진: {senior.lastCheck}</p>
                    </div>
                  </div>
                </td>
                <td className="p-8 text-right">
                  <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all">
                    관리 목록에 추가
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="p-8 border-t border-slate-50 flex justify-between items-center bg-slate-50/30">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
            TOTAL <span className="text-slate-900">1,284</span> RESULTS
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-1">
              {[1, 2, 3].map(page => (
                <button 
                  key={page}
                  className={cn(
                    "w-10 h-10 rounded-xl text-sm font-black transition-all",
                    page === 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:bg-white"
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Managed List */}
      <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <UserPlus size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-900">현재 관리 목록에 포함된 시니어</h3>
            <button className="text-sm font-bold text-primary hover:underline ml-2">전체 보기</button>
          </div>
          <p className="text-sm text-slate-400 font-bold">총 24명 관리 중</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-3 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
            <span>시니어 이름</span>
            <span className="text-center">상태</span>
            <span className="text-right">최근 업데이트</span>
          </div>
          <div className="space-y-2">
            {currentManaged.map((senior, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4 w-1/3">
                  <img src={senior.photo} alt={senior.name} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                  <span className="text-base font-bold text-slate-900">{senior.name}</span>
                </div>
                <div className="flex justify-center w-1/3">
                  <span className={cn(
                    "px-4 py-1 rounded-full text-[10px] font-black",
                    senior.status === '주의' ? "bg-error/10 text-error" : "bg-tertiary/10 text-tertiary"
                  )}>
                    {senior.status}
                  </span>
                </div>
                <div className="w-1/3 text-right">
                  <span className="text-sm font-bold text-slate-500">{senior.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
