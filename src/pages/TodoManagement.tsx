import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  History, 
  CheckCircle2, 
  Circle, 
  Pill, 
  Activity, 
  Utensils, 
  Smile,
  Edit,
  Info,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AddTodoModal } from '@/components/AddTodoModal';

export default function TodoManagement() {
  const [selectedSenior, setSelectedSenior] = useState('김순자');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const seniors = [
    { name: '김순자', age: 78, gender: '여', status: '주의', color: 'error', photo: 'https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?auto=format&fit=crop&q=80&w=100&h=100' },
    { name: '박정웅', age: 82, gender: '남', status: '안정', color: 'tertiary', photo: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80&w=100&h=100' },
    { name: '이영희', age: 75, gender: '여', status: '안정', color: 'tertiary', photo: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=100&h=100' }
  ];

  const todos = [
    { title: '아침 복약', time: '오전 08:30 완료', status: '완료', icon: Pill },
    { title: '점심 식사 일기', time: '예정 시각 오후 12:30', status: '대기', icon: Utensils },
    { title: '혈압 측정', time: '예정 시각 오후 02:00', status: '대기', icon: Activity }
  ];

  return (
    <div className="flex h-full -m-8 overflow-hidden animate-in fade-in duration-500">
      {/* Left Panel: Seniors List */}
      <section className="w-1/3 border-r border-slate-200 flex flex-col bg-slate-50/50">
        <div className="p-8 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
          <h3 className="text-xl font-black text-slate-900">시니어 목록</h3>
          <p className="text-sm text-slate-500 font-medium mt-1">총 24명의 시니어 관리 중</p>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {seniors.map((senior) => (
            <button
              key={senior.name}
              onClick={() => setSelectedSenior(senior.name)}
              className={cn(
                "w-full text-left p-5 rounded-2xl transition-all flex items-center gap-5",
                selectedSenior === senior.name 
                  ? "bg-white shadow-lg border-l-4 border-primary translate-x-1" 
                  : "hover:bg-white/60"
              )}
            >
              <img src={senior.photo} alt={senior.name} className="w-14 h-14 rounded-full object-cover shadow-sm" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className={cn("text-lg font-black", selectedSenior === senior.name ? "text-slate-900" : "text-slate-700")}>{senior.name}</span>
                  <span className={cn(
                    "text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase",
                    senior.color === 'error' ? "bg-error-container text-error" : "bg-tertiary/10 text-tertiary"
                  )}>{senior.status}</span>
                </div>
                <p className="text-sm text-slate-400 font-bold mt-1">{senior.age}세 / {senior.gender}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Right Panel: TODO Management */}
      <section className="flex-1 flex flex-col bg-white overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black text-slate-900">오늘의 TODO 설정 및 관리</h2>
            <p className="text-sm text-slate-500 font-bold mt-1">{selectedSenior} 님의 일일 맞춤 케어 플랜</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-200 transition-all">
              <History size={18} />
              기록 보기
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
            >
              <Plus size={18} />
              TODO 추가
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {/* Progress Summary */}
          <div className="bg-primary/5 rounded-3xl p-8 flex items-center justify-between border border-primary/10 shadow-sm">
            <div className="flex items-center gap-8">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-slate-100" cx="48" cy="48" fill="transparent" r="42" stroke="currentColor" strokeWidth="8" />
                  <circle className="text-primary" cx="48" cy="48" fill="transparent" r="42" stroke="currentColor" strokeDasharray="263.8" strokeDashoffset="176.7" strokeLinecap="round" strokeWidth="8" />
                </svg>
                <span className="absolute text-xl font-black text-primary">33%</span>
              </div>
              <div>
                <p className="text-lg font-black text-slate-900">오늘의 달성도</p>
                <p className="text-sm text-slate-500 font-bold mt-1">총 3개의 과업 중 <span className="text-primary">1개</span> 완료되었습니다.</p>
                <div className="mt-4 flex gap-2">
                  <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-black rounded-full">정상 진행 중</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full">지연 과업 없음</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">최근 업데이트</p>
              <p className="text-sm font-black text-slate-900">오늘 오전 09:32</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Active TODO List */}
            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={20} />
                  진행 중인 과업
                </h3>
                <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full">실시간 업데이트</span>
              </div>
              <div className="space-y-3">
                {todos.map((todo, i) => (
                  <div key={i} className={cn(
                    "group flex items-center gap-4 p-5 rounded-2xl border transition-all",
                    todo.status === '완료' ? "bg-slate-50 border-transparent" : "bg-white border-slate-100 hover:shadow-md"
                  )}>
                    {todo.status === '완료' ? (
                      <CheckCircle2 className="text-tertiary" size={24} />
                    ) : (
                      <Circle className="text-slate-300 group-hover:text-primary" size={24} />
                    )}
                    <div className="flex-1">
                      <p className="text-base font-bold text-slate-900">{todo.title}</p>
                      <p className="text-xs text-slate-400 font-bold">{todo.time}</p>
                    </div>
                    <span className={cn(
                      "text-[10px] font-black px-3 py-1 rounded-lg",
                      todo.status === '완료' ? "bg-tertiary/10 text-tertiary" : "bg-slate-100 text-slate-500"
                    )}>{todo.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Assign */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-5 flex items-center gap-2">
                  <Plus className="text-primary" size={20} />
                  빠른 To-do 리스트 할당
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: '복약 지도', desc: '약 알림 등록', icon: Pill, color: 'primary' },
                    { label: '활력징후', desc: '혈압/혈당 체크', icon: Activity, color: 'error' },
                    { label: '식사기록', desc: '영양 섭취 확인', icon: Utensils, color: 'tertiary' },
                    { label: '정서지원', desc: '기분/안부 확인', icon: Smile, color: 'secondary' }
                  ].map((item, i) => (
                    <button 
                      key={i} 
                      onClick={() => setIsAddModalOpen(true)}
                      className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all hover:scale-[1.02] border border-transparent hover:border-slate-100"
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        item.color === 'primary' ? "bg-primary/10 text-primary" :
                        item.color === 'error' ? "bg-error/10 text-error" :
                        item.color === 'tertiary' ? "bg-tertiary/10 text-tertiary" : "bg-secondary/10 text-secondary"
                      )}>
                        <item.icon size={20} />
                      </div>
                      <div className="text-left">
                        <span className="block text-sm font-black text-slate-900">{item.label}</span>
                        <span className="text-[10px] text-slate-400 font-bold">{item.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Summary */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="text-slate-400" size={18} />
                  <h4 className="text-sm font-black text-slate-900">AI 요약</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                  "{selectedSenior} 님은 최근 아침 복약을 규칙적으로 수행하고 계십니다. 다만 어지러움증을 가끔 호소하시니 주의 깊게 살펴주세요."
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end">
                  <button className="text-[10px] font-black text-primary flex items-center gap-1 hover:underline">
                    수정하기 <Edit size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="pt-6 pb-12">
            <div className="bg-slate-900 p-10 rounded-3xl text-center space-y-6 shadow-2xl">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                <Plus className="text-white" size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">새로운 과업을 할당하시겠습니까?</h3>
                <p className="text-sm text-slate-400 font-medium max-w-md mx-auto">기존 템플릿을 사용하거나 사용자 맞춤형 과업을 직접 설정하여 시니어분들의 케어 질을 높일 수 있습니다.</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-primary text-white px-12 py-4 rounded-2xl font-black shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-1 flex items-center gap-3 mx-auto"
              >
                <Plus size={20} />
                새로운 TODO 만들기
              </button>
            </div>
          </div>
        </div>
      </section>

      <AddTodoModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}
