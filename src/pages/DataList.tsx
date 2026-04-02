import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Smile, 
  Meh, 
  Pill, 
  Utensils, 
  ArrowRight,
  Calendar as CalendarIcon,
  Search as SearchIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DataList() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black font-headline text-slate-900">전송 데이터 리스트</h2>
      </div>

      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <SearchIcon size={16} className="text-slate-400" />
          <select className="text-sm font-bold bg-transparent border-none p-0 focus:ring-0 outline-none">
            <option>김말순 (82세, 여성)</option>
            <option>이영수 (75세, 남성)</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <CalendarIcon size={16} className="text-slate-400" />
          <input type="date" className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold outline-none" defaultValue="2023-10-24" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* To-Do Log */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-primary" size={20} />
              <h3 className="font-black text-slate-900">To-Do 로그</h3>
            </div>
            <button className="text-xs text-primary font-black flex items-center gap-1 hover:underline">
              View all Log <ArrowRight size={14} />
            </button>
          </div>
          <div className="p-5 space-y-4">
            {[
              { time: '08:15', title: '아침 산책 30분', status: '완료', color: 'tertiary' },
              { time: '10:00', title: '비타민 섭취', status: '완료', color: 'tertiary' },
              { time: '14:30', title: '오후 낮잠 (최대 30분)', status: '미수행', color: 'slate' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50">
                <span className="text-xs font-mono font-bold text-slate-400 mt-1">{item.time}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{item.title}</p>
                  <span className={cn(
                    "inline-block px-2 py-0.5 mt-2 rounded text-[10px] font-black",
                    item.color === 'tertiary' ? "bg-tertiary/10 text-tertiary" : "bg-slate-200 text-slate-600"
                  )}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emotional Diary */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Smile className="text-pink-500" size={20} />
              <h3 className="font-black text-slate-900">감정 일기 내역</h3>
            </div>
            <button className="text-xs text-primary font-black flex items-center gap-1 hover:underline">
              View all Log <ArrowRight size={14} />
            </button>
          </div>
          <div className="p-5 space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-pink-400">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-black text-pink-600">오늘 오후 3:40</span>
                <Smile className="text-pink-400" size={20} />
              </div>
              <p className="text-sm leading-relaxed text-slate-700 font-medium">"오늘 손녀가 전화를 해서 기분이 참 좋았다. 목소리를 들으니 힘이 난다."</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-slate-300">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-black text-slate-500">어제 오전 10:20</span>
                <Meh className="text-slate-400" size={20} />
              </div>
              <p className="text-sm leading-relaxed text-slate-700 font-medium">"날씨가 흐려서 그런지 몸이 조금 찌뿌둥하다. 조용히 음악을 들었다."</p>
            </div>
          </div>
        </section>

        {/* Medication Log */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Pill className="text-orange-500" size={20} />
              <h3 className="font-black text-slate-900">복약 내역</h3>
            </div>
            <button className="text-xs text-primary font-black flex items-center gap-1 hover:underline">
              View all Log <ArrowRight size={14} />
            </button>
          </div>
          <div className="p-5">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-50">
                  <th className="pb-3 font-black uppercase tracking-widest text-[10px]">약물명</th>
                  <th className="pb-3 font-black uppercase tracking-widest text-[10px] text-center">예정</th>
                  <th className="pb-3 font-black uppercase tracking-widest text-[10px] text-center">기록</th>
                  <th className="pb-3 font-black uppercase tracking-widest text-[10px] text-right">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: '혈압약 (아달라트)', sched: '08:00', record: '08:05', status: '정상', color: 'tertiary' },
                  { name: '당뇨약 (메트포민)', sched: '08:00', record: '08:10', status: '정상', color: 'tertiary' },
                  { name: '영양제 (오메가3)', sched: '13:00', record: '14:20', status: '지연', color: 'orange' }
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="py-4 font-bold text-slate-800">{row.name}</td>
                    <td className="py-4 text-center text-slate-500 font-medium">{row.sched}</td>
                    <td className="py-4 text-center text-slate-500 font-medium">{row.record}</td>
                    <td className={cn(
                      "py-4 text-right font-black",
                      row.color === 'tertiary' ? "text-tertiary" : "text-orange-500"
                    )}>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Meal Diary */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Utensils className="text-tertiary" size={20} />
              <h3 className="font-black text-slate-900">식사 일기 내역</h3>
            </div>
            <button className="text-xs text-primary font-black flex items-center gap-1 hover:underline">
              View all Log <ArrowRight size={14} />
            </button>
          </div>
          <div className="p-5 space-y-4">
            {[
              { time: '08:30', title: '아침: 현미밥, 된장국, 나물', status: '기록 완료' },
              { time: '12:45', title: '점심: 생선구이, 콩나물국', status: '기록 완료' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50">
                <span className="text-xs font-mono font-bold text-slate-400 mt-1">{item.time}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{item.title}</p>
                  <span className="inline-block px-2 py-0.5 mt-2 rounded text-[10px] font-black bg-tertiary/10 text-tertiary">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
