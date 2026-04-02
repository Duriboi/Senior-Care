import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  Pill, 
  User,
  ChevronDown,
  Calendar,
  Clock,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AIReport {
  id: string;
  date: string;
  time: string;
  title: string;
  content: string;
  type: 'blood-pressure' | 'medication' | 'activity';
}

const mockReports: AIReport[] = [
  {
    id: '1',
    date: '2023.10.27',
    time: '오전 09:15',
    title: '혈압 추이 분석 및 위험 징후 포착',
    content: '"최근 7일간 오전 혈압이 평소 대비 평균 12% 상승한 145/92mmHg를 기록하고 있습니다. 특히 수면 직후 상승 폭이 두드러지며, 이는 고혈압성 위기 초기 징후일 가능성이 있습니다. 투약 스케줄 재검토와 염분 섭취 제한이 시급히 요구됩니다."',
    type: 'blood-pressure'
  },
  {
    id: '2',
    date: '2023.10.26',
    time: '오후 14:30',
    title: '복약 패턴 변화 및 순응도 보고',
    content: '"오후 2시 혈당 강하제 복약 누락 횟수가 지난주 3회에서 이번 주 0회로 개선되었습니다. 보호자의 알람 연동 이후 순응도가 비약적으로 향상되었으며, 이에 따라 식후 혈당 수치가 140mg/dL 미만으로 안정화되는 긍정적인 상관관계가 관찰됩니다."',
    type: 'medication'
  },
  {
    id: '3',
    date: '2023.10.24',
    time: '오전 11:00',
    title: '활동량 감소 및 야간 수면 질 분석',
    content: '"지난 3일간 평균 걸음 수가 전주 대비 40% 급감(1,200보 미만)하였습니다. 동시에 야간 수면 중 뒤척임 횟수가 2.5배 증가한 것이 센서 데이터를 통해 확인되었습니다. 신체적 통증 혹은 심리적 불안 요인이 있는지 직접 면담을 통한 확인이 권고됩니다."',
    type: 'activity'
  }
];

export default function Statistics() {
  const [selectedSenior, setSelectedSenior] = useState('김영희 (84세, 여)');

  const getTypeStyles = (type: AIReport['type']) => {
    switch (type) {
      case 'blood-pressure':
        return {
          icon: Activity,
          iconBg: 'bg-blue-50',
          iconColor: 'text-blue-600',
          borderColor: 'border-blue-500'
        };
      case 'medication':
        return {
          icon: Pill,
          iconBg: 'bg-green-50',
          iconColor: 'text-green-600',
          borderColor: 'border-green-500'
        };
      case 'activity':
        return {
          icon: User,
          iconBg: 'bg-slate-100',
          iconColor: 'text-slate-600',
          borderColor: 'border-slate-400'
        };
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="mb-10">
        <h2 className="text-3xl font-black font-headline text-slate-900 tracking-tight mb-2">AI 기반 통계 리포트</h2>
        <p className="text-slate-500 font-medium">수집된 데이터를 바탕으로 AI가 분석한 환자별 인사이트 리포트입니다.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Selection & Profile */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">환자 선택</label>
            <div className="relative">
              <select 
                value={selectedSenior}
                onChange={(e) => setSelectedSenior(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-5 text-sm font-bold text-slate-900 appearance-none focus:ring-2 focus:ring-primary/10 outline-none cursor-pointer"
              >
                <option>김영희 (84세, 여)</option>
                <option>박명수 (82세, 남)</option>
                <option>이철수 (78세, 남)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <img 
              src="https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?auto=format&fit=crop&q=80&w=100&h=100" 
              alt="Patient" 
              className="w-16 h-16 rounded-xl object-cover border border-slate-100 shadow-sm"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900">김영희 (SM-88421)</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">최근 분석일: 2023.10.27</p>
            </div>
          </div>
        </div>

        {/* Right Column: AI Reports */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {mockReports.map((report, i) => {
            const styles = getTypeStyles(report.type);
            return (
              <motion.div 
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
              >
                <div className="flex items-start gap-5 mb-6">
                  <div className={cn("p-3 rounded-xl", styles.iconBg, styles.iconColor)}>
                    <styles.icon size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1">
                      <Calendar size={12} />
                      {report.date}
                      <span className="mx-1">•</span>
                      <Clock size={12} />
                      {report.time}
                    </div>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight">{report.title}</h4>
                  </div>
                </div>

                <div className={cn("bg-slate-50 p-6 rounded-2xl border-l-4", styles.borderColor)}>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium italic">
                    {report.content}
                  </p>
                </div>
              </motion.div>
            );
          })}

          <div className="flex justify-center pt-4">
            <button className="bg-white border border-slate-200 px-8 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
              이전 분석 리포트 더보기
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
