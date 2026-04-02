import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Pill, Activity, Utensils, Smile, Calendar, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: TaskType;
}

type TaskType = 'med' | 'vital' | 'meal' | 'emotion';

export function AddTodoModal({ isOpen, onClose, initialType }: AddTodoModalProps) {
  const [selectedType, setSelectedType] = useState<TaskType>(initialType || 'med');
  const [repetition, setRepetition] = useState('매일');
  const [category, setCategory] = useState('고혈압 관리');
  const [startDate, setStartDate] = useState('2024-05-20');
  const [endDate, setEndDate] = useState('2024-06-20');

  // Update selectedType when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setSelectedType(initialType || 'med');
    }
  }, [isOpen, initialType]);
  
  // Medication specific
  const [drugName, setDrugName] = useState('아모디핀정 5mg');
  const [dosage, setDosage] = useState('1정');
  const [times, setTimes] = useState({ morning: true, lunch: false, dinner: false });

  // Diary specific
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const taskTypes = [
    { id: 'med' as TaskType, label: '복약', icon: Pill },
    { id: 'vital' as TaskType, label: '활력징후', icon: Activity },
    { id: 'meal' as TaskType, label: '식사일기', icon: Utensils },
    { id: 'emotion' as TaskType, label: '정서일기', icon: Smile },
  ];

  const getTitle = () => {
    switch(selectedType) {
      case 'med': return '새로운 TODO 추가';
      case 'vital': return '활력징후 TODO 추가';
      case 'meal': return '식사 일기 TODO 추가';
      case 'emotion': return '정서 일기 TODO 추가';
      default: return '새로운 TODO 추가';
    }
  };

  const getDescription = () => {
    switch(selectedType) {
      case 'med': return '환자의 맞춤형 케어 계획을 구성하십시오.';
      case 'vital': return '환자의 활력징후 측정을 위한 태스크를 생성합니다.';
      case 'meal': return '어르신의 영양 섭취 모니터링을 위한 태스크를 생성합니다.';
      case 'emotion': return '입소자의 일일 정서 기록 및 활동 관리를 구성하세요.';
      default: return '환자의 맞춤형 케어 계획을 구성하십시오.';
    }
  };

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
          className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-10 flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-black text-slate-900">{getTitle()}</h3>
              <p className="text-sm text-slate-500 font-bold mt-1">{getDescription()}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-10 pb-10 space-y-10">
            {/* Task Type Selection */}
            <div className="space-y-4">
              <label className="text-sm font-black text-slate-900">태스크 유형 선택</label>
              <div className="grid grid-cols-4 gap-4">
                {taskTypes.map((type) => (
                  <button 
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={cn(
                      "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all",
                      selectedType === type.id 
                        ? "border-primary bg-primary/5 shadow-sm" 
                        : "border-slate-100 hover:border-slate-200 bg-white"
                    )}
                  >
                    <type.icon size={28} className={cn(selectedType === type.id ? "text-primary" : "text-slate-400")} />
                    <span className={cn("text-sm font-black", selectedType === type.id ? "text-primary" : "text-slate-600")}>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Setting */}
            <div className="space-y-4">
              <label className="text-sm font-black text-slate-900">증상 및 카테고리 설정</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-base font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L4 9V21H20V9L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Period & Repetition */}
            <div className="space-y-6">
              <label className="text-sm font-black text-slate-900">기간 및 반복 설정</label>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400">시작일</span>
                  <div className="relative">
                    <input 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                    />
                    <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400">종료일</span>
                  <div className="relative">
                    <input 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                    />
                    <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-6">
                <span className="text-sm font-bold text-slate-500">반복 설정:</span>
                <div className="flex gap-4">
                  {['매일', '매주', '평일', '주말'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="radio" 
                          name="repetition" 
                          checked={repetition === opt}
                          onChange={() => setRepetition(opt)}
                          className="sr-only"
                        />
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 transition-all",
                          repetition === opt ? "border-primary bg-primary" : "border-slate-300 bg-white group-hover:border-slate-400"
                        )} />
                        {repetition === opt && <div className="absolute w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className={cn("text-sm font-bold", repetition === opt ? "text-slate-900" : "text-slate-500")}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic Content */}
            <div className="bg-slate-50/50 rounded-[24px] p-8 border border-slate-100">
              {selectedType === 'med' ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 3H21V21H3V3Z" stroke="white" strokeWidth="2"/>
                          <path d="M3 9H21" stroke="white" strokeWidth="2"/>
                          <path d="M3 15H21" stroke="white" strokeWidth="2"/>
                          <path d="M9 3V21" stroke="white" strokeWidth="2"/>
                          <path d="M15 3V21" stroke="white" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h4 className="text-base font-black text-slate-900">약물 정보 등록</h4>
                    </div>
                    <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                      <PlusCircle size={16} /> 약물 추가
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-6 shadow-sm">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-400">약물 명칭</span>
                        <input 
                          type="text" 
                          value={drugName}
                          onChange={(e) => setDrugName(e.target.value)}
                          className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-400">복용량 (DOSAGE)</span>
                        <input 
                          type="text" 
                          value={dosage}
                          onChange={(e) => setDosage(e.target.value)}
                          className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="space-y-3">
                        <span className="text-xs font-bold text-slate-400">복용 시간</span>
                        <div className="flex gap-6">
                          {(['아침', '점심', '저녁'] as const).map((time) => (
                            <label key={time} className="flex items-center gap-2 cursor-pointer group">
                              <div className="relative flex items-center justify-center">
                                <input 
                                  type="checkbox" 
                                  checked={time === '아침' ? times.morning : time === '점심' ? times.lunch : times.dinner}
                                  onChange={() => {
                                    if (time === '아침') setTimes({ ...times, morning: !times.morning });
                                    if (time === '점심') setTimes({ ...times, lunch: !times.lunch });
                                    if (time === '저녁') setTimes({ ...times, dinner: !times.dinner });
                                  }}
                                  className="sr-only"
                                />
                                <div className={cn(
                                  "w-5 h-5 rounded border-2 transition-all",
                                  (time === '아침' ? times.morning : time === '점심' ? times.lunch : times.dinner)
                                    ? "border-primary bg-primary" 
                                    : "border-slate-300 bg-white group-hover:border-slate-400"
                                )} />
                                {(time === '아침' ? times.morning : time === '점심' ? times.lunch : times.dinner) && (
                                  <svg className="absolute w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </div>
                              <span className={cn("text-sm font-bold", (time === '아침' ? times.morning : time === '점심' ? times.lunch : times.dinner) ? "text-slate-900" : "text-slate-500")}>{time}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">빈도: 매일 1회</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-base font-black text-slate-900">관리자 전달 사항</h4>
                    <span className="text-[10px] text-slate-400 font-bold">생활지원사에게 표시됩니다</span>
                  </div>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white border border-slate-100 rounded-2xl py-5 px-6 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px] resize-none shadow-sm"
                    placeholder={selectedType === 'meal' ? "식사 내용을 기록하도록 요청합니다. 예: 오늘 드신 반찬 이름을 적어주세요." : "오늘 하루 기분이 어떠셨는지, 어떤 활동을 하셨는지 적어주세요."}
                  />
                  {selectedType === 'emotion' && (
                    <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-[10px] font-bold">i</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        기록된 데이터는 시스템에 자동 저장되며, Clinical Portal의 <span className="font-bold">정서 로그</span> 탭에서 시각화된 데이터로 확인 가능합니다.
                      </p>
                    </div>
                  )}
                  {selectedType === 'meal' && (
                    <div className="flex items-center gap-2">
                       <div className="w-4 h-4 bg-slate-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] font-bold">i</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold">입력하신 내용은 어르신 혹은 보호자 앱의 태스크 가이드로 표시됩니다.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-10 flex items-center justify-end gap-10 border-t border-slate-50">
            <button onClick={onClose} className="text-base font-bold text-slate-900 hover:underline">
              취소
            </button>
            <button className="bg-primary text-white px-12 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
              {selectedType === 'med' ? '등록하기' : selectedType === 'meal' ? '태스크 생성하기' : '등록하기'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
