import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  AlertTriangle, 
  Activity, 
  Droplets, 
  Pill, 
  ChevronRight, 
  BrainCircuit,
  ArrowRight,
  Loader2,
  Pencil
} from 'lucide-react';
import { cn } from '../lib/utils';
import { SeniorProfileModal } from '../components/SeniorProfileModal';
import { predictRiskSeniors } from '../services/geminiService';

export default function Dashboard() {
  const [selectedSenior, setSelectedSenior] = useState<any>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const redFlags = [
    // ... (기존 데이터 유지)
    {
      type: '고혈압 경고',
      resident: '박명수 어르신 (82세)',
      value: '165 / 105 mmHg',
      time: '15분 전 측정됨',
      color: 'error',
      icon: Activity,
      data: {
        name: '박명수',
        age: 82,
        room: '302호',
        address: '서울특별시 강남구 대치동 123-45',
        guardianContact: '010-1234-5678 (아들 박지성)',
        photo: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80&w=400&h=400'
      }
    },
    {
      type: '저혈당 주의',
      resident: '이영희 어르신 (75세)',
      value: '62 mg/dL',
      time: '방금 전 업데이트',
      color: 'error',
      icon: Droplets,
      data: {
        name: '이영희',
        age: 75,
        room: '205호',
        address: '서울특별시 서초구 반포동 99-1',
        guardianContact: '010-9876-5432 (딸 이나영)',
        photo: 'https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?auto=format&fit=crop&q=80&w=400&h=400'
      }
    },
    {
      type: '복약 비순응',
      resident: '최정호 어르신 (88세)',
      value: '오전 약제 미복용',
      time: '처방: 혈전용해제 외 2종',
      color: 'success',
      icon: Pill,
      data: {
        name: '최정호',
        age: 88,
        room: '401호',
        address: '서울특별시 송파구 잠실동 55-2',
        guardianContact: '010-5555-4444 (배우자 김영자)',
        photo: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=400&h=400'
      }
    }
  ];

  const triageList = [
    // ... (기존 데이터 유지)
    {
      name: '박명수',
      age: 82,
      risk: 'High',
      riskScore: 85,
      todo: '3/5',
      bp: '165/105',
      glucose: '115',
      status: '복약 순응도 낮음',
      photo: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80&w=100&h=100',
      data: {
        name: '박명수',
        age: 82,
        room: '302호',
        address: '서울특별시 강남구 대치동 123-45',
        guardianContact: '010-1234-5678 (아들 박지성)',
        photo: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80&w=400&h=400'
      }
    },
    {
      name: '이영희',
      age: 75,
      risk: 'Mid',
      riskScore: 68,
      todo: '6/7',
      bp: '128/82',
      glucose: '62',
      status: 'To-do 순응도 낮음',
      photo: 'https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?auto=format&fit=crop&q=80&w=100&h=100',
      data: {
        name: '이영희',
        age: 75,
        room: '205호',
        address: '서울특별시 서초구 반포동 99-1',
        guardianContact: '010-9876-5432 (딸 이나영)',
        photo: 'https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?auto=format&fit=crop&q=80&w=400&h=400'
      }
    }
  ];

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsAnalyzing(true);
      const analysis = await predictRiskSeniors(triageList);
      setAiAnalysis(analysis);
      setIsAnalyzing(false);
    };
    fetchAnalysis();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-headline flex items-center gap-2">
            <AlertTriangle className="text-error" fill="currentColor" size={20} />
            이상 징후 알림 (Red Flag)
          </h2>
          <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">실시간 업데이트 중</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {redFlags.map((flag, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedSenior(flag.data)}
              className={cn(
                "bg-white p-5 rounded-xl shadow-sm border-l-4 flex items-start gap-4 cursor-pointer hover:shadow-md transition-all",
                flag.color === 'error' ? "border-error" : "border-success"
              )}
            >
              <div className={cn(
                "p-2.5 rounded-lg",
                flag.color === 'error' ? "bg-error/5 text-error" : "bg-success/5 text-success"
              )}>
                <flag.icon size={22} />
              </div>
              <div className="flex-1">
                <p className={cn(
                  "text-[11px] font-bold mb-1",
                  flag.color === 'error' ? "text-error" : "text-success"
                )}>{flag.type}</p>
                <p className="text-sm font-bold text-slate-900">{flag.resident}</p>
                <p className="text-xl font-black mt-1 text-slate-900 tracking-tight">{flag.value}</p>
                <p className="text-[10px] text-slate-400 mt-1.5">{flag.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-12 gap-8">
        <section className="col-span-12 lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-headline">위험군 트리아지 (Triage)</h2>
            <div className="flex gap-2">
              <button className="bg-slate-100 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors">리스크 순 정렬</button>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-md">일괄 관리</button>
            </div>
          </div>
          <div className="space-y-4">
            {triageList.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedSenior(item.data)}
                className="bg-white p-4 rounded-xl flex items-center justify-between shadow-sm border border-slate-100 hover:border-primary/30 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative flex-shrink-0">
                    <img src={item.photo} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white text-[8px] font-bold text-white uppercase",
                      item.risk === 'High' ? "bg-error" : "bg-primary"
                    )}>
                      {item.risk}
                    </div>
                  </div>
                  <div className="min-w-[140px]">
                    <h3 className="text-sm font-bold text-slate-900">{item.name} ({item.age}세)</h3>
                    <div className="mt-1">
                      <span className={cn(
                        "text-[9px] font-bold px-1.5 py-0.5 rounded",
                        item.risk === 'High' ? "bg-error/10 text-error" : "bg-success/10 text-success"
                      )}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6 px-6 border-x border-slate-100 flex-[2] items-center">
                  <div className="text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">TO-DO</p>
                    <p className="text-xs font-bold text-primary">{item.todo}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">혈압</p>
                    <p className={cn("text-xs font-bold", item.risk === 'High' ? "text-error" : "text-slate-900")}>{item.bp}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">혈당</p>
                    <p className="text-xs font-bold text-slate-900">{item.glucose}</p>
                  </div>
                  <div className={cn(
                    "text-center p-2 rounded-lg border",
                    item.risk === 'High' ? "bg-error/5 border-error/20" : "bg-primary/5 border-primary/20"
                  )}>
                    <p className={cn("text-[8px] font-extrabold uppercase tracking-tighter mb-0.5", item.risk === 'High' ? "text-error" : "text-primary")}>위험도 점수</p>
                    <p className={cn("text-lg font-black", item.risk === 'High' ? "text-error" : "text-primary")}>{item.riskScore}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end pl-6 min-w-[80px]">
                  <button className="text-primary text-[10px] font-bold flex items-center gap-0.5 hover:underline">
                    상세 <ChevronRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="col-span-12 lg:col-span-4 space-y-6">
          <h2 className="text-xl font-bold font-headline">시설 건강 트렌드</h2>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="text-primary" size={20} />
              <h3 className="text-sm font-bold text-slate-900">AI 위험군 예측 알림</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-primary/5 p-5 rounded-xl border-l-4 border-primary min-h-[140px] flex flex-col">
                {isAnalyzing ? (
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <Loader2 className="animate-spin" size={14} />
                    데이터 분석 중...
                  </div>
                ) : (
                  <>
                    <p className="text-[11px] font-bold text-primary mb-2">집중 관찰 권고</p>
                    <p className="text-sm font-bold text-slate-900 mb-2">박명수 어르신 (82세)</p>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      최근 48시간 내 심박수 변동폭이 평소 대비 25% 증가했습니다. 야간 불면 또는 급격한 컨디션 저하가 예상되니 <span className="text-primary font-bold underline">추가 혈압 측정 및 모니터링</span>을 제안합니다.
                    </p>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-slate-400">분석: Vitalis AI Core</span>
                <button className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline">
                  조치 내역 생성 <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-900">현재 미복약 어르신 현황</h3>
              <div className="bg-error/10 text-error px-2 py-0.5 rounded text-[10px] font-bold tracking-tighter">총 8명</div>
            </div>
            <div className="space-y-5">
              {[
                { name: '김철수 어르신', time: '오전 9시 (혈전용해제)', delay: '3시간 지연', status: 'delayed', photo: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80&w=100&h=100' },
                { name: '이영희 어르신', time: '오후 1시 (인슐린)', delay: '대기 중', status: 'waiting', photo: 'https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?auto=format&fit=crop&q=80&w=100&h=100' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={item.photo} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{item.time}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold",
                    item.status === 'delayed' ? "text-error" : "text-slate-400"
                  )}>{item.delay}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-50">
        <Pencil size={24} />
      </button>

      <SeniorProfileModal 
        isOpen={!!selectedSenior} 
        onClose={() => setSelectedSenior(null)} 
        senior={selectedSenior} 
      />
    </div>
  );
}
