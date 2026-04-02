import React from 'react';
import { motion } from 'motion/react';
import { Edit, Phone, AlertCircle, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Residents() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
      <div className="mb-10">
        <h2 className="text-3xl font-black font-headline text-slate-900 tracking-tight mb-2">시니어 기본 정보</h2>
        <p className="text-slate-500 font-medium">환자의 핵심 의료 데이터 및 보호자 연락처를 관리합니다.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">환자 선택</label>
            <select className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-slate-900 font-bold focus:ring-2 focus:ring-primary/20 outline-none">
              <option>김영희 (84세, 여)</option>
              <option>박철수 (79세, 남)</option>
              <option>이순자 (82세, 여)</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group">
            <div className="aspect-square relative">
              <img 
                src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=400&h=400" 
                alt="Senior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="bg-tertiary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">안정적 상태</span>
              </div>
            </div>
            <div className="p-6">
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl transition-all hover:bg-slate-200">
                <Camera size={18} />
                사진 변경
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black font-headline text-slate-900">인적 사항</h3>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-all active:scale-95">
                <Edit size={18} />
                수정
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">이름</label>
                <p className="text-lg font-bold text-slate-900">김영희</p>
                <div className="h-px w-full bg-slate-100"></div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">생년월일</label>
                <p className="text-lg font-bold text-slate-900">1939년 05월 12일</p>
                <div className="h-px w-full bg-slate-100"></div>
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">보호자 연락처</label>
                <div className="flex items-center gap-3 mt-1">
                  <Phone size={20} className="text-primary" />
                  <p className="text-lg font-bold text-slate-900">010-4829-1920 (자녀 김민석)</p>
                </div>
                <div className="h-px w-full bg-slate-100"></div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-error" size={24} />
                <h3 className="text-lg font-black font-headline text-slate-900">특이사항</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-error shrink-0"></div>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    당뇨 조절 중이며 식후 혈당 체크 필수. 가벼운 인지 장애 초기 증상이 있어 복약 지도가 반드시 필요함. 
                    왼쪽 무릎 관절염으로 인해 장거리 보행 시 지팡이 사용 권장.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0"></div>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    견과류 알레르기 있음 (땅콩 주의). 클래식 음악 감상을 선호하며 오후 3시 티타임을 매우 좋아하심.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <p className="text-[10px] font-bold text-slate-400">최종 업데이트: 2023년 10월 24일 14:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
