import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Pill, Activity, Utensils, Smile, Clock, Calendar, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTodoModal({ isOpen, onClose }: AddTodoModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h3 className="text-xl font-black text-slate-900">새로운 TODO 추가</h3>
              <p className="text-xs text-slate-500 font-bold mt-1">시니어 맞춤형 케어 과업을 설정합니다.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
              <X size={24} />
            </button>
          </div>

          <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
            {/* Task Type Selection */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">과업 종류 선택</label>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { id: 'med', label: '복약', icon: Pill, color: 'primary' },
                  { id: 'vital', label: '활력징후', icon: Activity, color: 'error' },
                  { id: 'meal', label: '식사일기', icon: Utensils, color: 'tertiary' },
                  { id: 'emotion', label: '정서일기', icon: Smile, color: 'secondary' }
                ].map((type) => (
                  <button 
                    key={type.id}
                    className={cn(
                      "flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all",
                      type.id === 'med' ? "border-primary bg-primary/5" : "border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      type.color === 'primary' ? "bg-primary text-white" :
                      type.color === 'error' ? "bg-error text-white" :
                      type.color === 'tertiary' ? "bg-tertiary text-white" : "bg-secondary text-white"
                    )}>
                      <type.icon size={20} />
                    </div>
                    <span className="text-xs font-black text-slate-900">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Period Settings */}
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={14} /> 시작일
                </label>
                <input type="date" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20" defaultValue="2023-10-24" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Repeat size={14} /> 반복 설정
                </label>
                <select className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20">
                  <option>매일 반복</option>
                  <option>주중 반복 (월-금)</option>
                  <option>주말 반복 (토-일)</option>
                  <option>사용자 지정</option>
                </select>
              </div>
            </div>

            {/* Specific Details (Dynamic based on type) */}
            <div className="space-y-6 pt-6 border-t border-slate-100">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">약제명 입력</label>
                <input type="text" className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-base font-bold outline-none focus:ring-2 focus:ring-primary/20" placeholder="예: 아달라트 (혈압약)" />
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">복용 용량</label>
                  <input type="text" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20" placeholder="예: 1정" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Clock size={14} /> 복용 시각
                  </label>
                  <input type="time" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20" defaultValue="08:30" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">관리자 메모 (선택)</label>
              <textarea 
                className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-none"
                placeholder="어르신께 전달할 주의사항이나 관리 메모를 입력하세요..."
              ></textarea>
            </div>
          </div>

          <div className="p-8 bg-slate-50 flex gap-4">
            <button onClick={onClose} className="flex-1 py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 font-black text-sm hover:bg-slate-100 transition-all">
              취소
            </button>
            <button className="flex-[2] py-4 rounded-2xl bg-primary text-white font-black text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
              TODO 등록하기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
