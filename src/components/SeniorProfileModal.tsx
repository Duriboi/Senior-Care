import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Edit, Download, Activity, Droplets, Info, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { generateHealthSummary } from '../services/geminiService';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  senior: any;
}

export function SeniorProfileModal({ isOpen, onClose, senior }: ModalProps) {
  const [aiSummary, setAiSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && senior) {
      const fetchAiSummary = async () => {
        setIsLoading(true);
        // 실제 어르신의 데이터를 기반으로 AI 분석 요청
        const summary = await generateHealthSummary({
          name: senior.name,
          age: senior.age,
          bloodPressure: ['165/105', '142/92', '138/88'], // 예시 데이터
          bloodGlucose: ['115', '152', '108'], // 예시 데이터
          notes: senior.status || ""
        });
        setAiSummary(summary);
        setIsLoading(false);
      };
      fetchAiSummary();
    } else {
      setAiSummary("");
    }
  }, [isOpen, senior]);

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
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Left Sidebar: Profile */}
          <div className="w-full md:w-80 bg-slate-50 p-8 flex flex-col items-center border-r border-slate-200/50">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <img src={senior.photo} alt={senior.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-tertiary border-2 border-white rounded-full"></div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 text-center mb-1">{senior.name} ({senior.age}세)</h3>
            <p className="text-slate-500 font-bold text-sm mb-6 text-center">{senior.room || "302호"} (집중관리)</p>
            
            <div className="w-full space-y-4 pt-6 border-t border-slate-200">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">사는 곳 / 주소</span>
                <p className="text-sm font-bold text-slate-800 leading-snug">{senior.address}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">보호자 연락처</span>
                <p className="text-sm font-bold text-slate-800">{senior.guardianContact}</p>
              </div>
            </div>

            <div className="mt-auto w-full pt-8 space-y-3">
              <button className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-white transition-all flex items-center justify-center gap-2">
                <Edit size={16} />
                정보 수정
              </button>
              <button className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-white transition-all flex items-center justify-center gap-2">
                <Download size={16} />
                보고서 다운로드
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h4 className="text-xl font-black text-slate-900">어르신 맞춤 건강 현황</h4>
                <p className="text-slate-400 text-sm font-medium">최근 업데이트: 방금 전</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <X size={24} />
              </button>
            </div>

            {/* AI Summary */}
            <div className="relative mb-8">
              <div className="absolute -top-3 left-4 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Info size={12} fill="currentColor" /> AI 건강 요약
              </div>
              <div className="bg-primary/5 p-6 pt-8 rounded-2xl border border-primary/10 min-h-[100px] flex items-center">
                {isLoading ? (
                  <div className="flex items-center gap-3 text-primary font-bold text-sm">
                    <Loader2 className="animate-spin" size={18} />
                    Gemini AI가 건강 데이터를 분석하고 있습니다...
                  </div>
                ) : (
                  <p className="text-slate-700 text-base leading-relaxed font-medium">
                    {aiSummary || "데이터를 불러오는 중입니다."}
                  </p>
                )}
              </div>
            </div>

            {/* Health Logs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="text-error" size={20} />
                  <h5 className="font-bold text-sm text-slate-900">최근 혈압 기록</h5>
                </div>
                <div className="space-y-3">
                  {[
                    { time: '오늘 오전 09:12', value: '165/105', alert: true },
                    { time: '어제 오후 08:30', value: '142/92' },
                    { time: '어제 오전 09:05', value: '138/88' }
                  ].map((log, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-200/50 last:border-0">
                      <span className="text-xs text-slate-400 font-medium">{log.time}</span>
                      <span className={cn("font-bold", log.alert ? "text-error" : "text-slate-900")}>{log.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <Droplets className="text-primary" size={20} />
                  <h5 className="font-bold text-sm text-slate-900">최근 혈당 기록</h5>
                </div>
                <div className="space-y-3">
                  {[
                    { time: '오늘 오전 09:12', value: '115', normal: true },
                    { time: '어제 오후 08:30', value: '152' },
                    { time: '어제 오전 09:05', value: '108' }
                  ].map((log, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-200/50 last:border-0">
                      <span className="text-xs text-slate-400 font-medium">{log.time}</span>
                      <span className={cn("font-bold", log.normal ? "text-tertiary" : "text-slate-900")}>{log.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <button className="px-6 py-3 rounded-xl border border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-all flex items-center gap-2">
                상세페이지 바로가기
                <ChevronRight size={16} />
              </button>
              <button onClick={onClose} className="px-8 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                확인 완료
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
