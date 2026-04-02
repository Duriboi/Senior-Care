import React from 'react';
import { motion } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Download, TrendingUp, Activity, Droplets, CheckCircle2, Pill, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';

const glucoseData = [
  { date: '10.01', post: 145, pre: 110 },
  { date: '10.05', post: 138, pre: 105 },
  { date: '10.10', post: 152, pre: 115 },
  { date: '10.15', post: 148, pre: 108 },
  { date: '10.20', post: 165, pre: 120 },
  { date: '10.25', post: 142, pre: 112 },
  { date: '10.31', post: 155, pre: 118 },
];

const bpData = [
  { date: '10.01', sys: 128, dia: 82 },
  { date: '10.05', sys: 132, dia: 85 },
  { date: '10.10', sys: 125, dia: 78 },
  { date: '10.15', sys: 135, dia: 88 },
  { date: '10.20', sys: 142, dia: 92 },
  { date: '10.25', sys: 130, dia: 80 },
  { date: '10.31', sys: 128, dia: 82 },
];

const adherenceData = [
  { date: '10.01', value: 95 },
  { date: '10.05', value: 98 },
  { date: '10.10', value: 92 },
  { date: '10.15', value: 96 },
  { date: '10.20', value: 90 },
  { date: '10.25', value: 94 },
  { date: '10.31', value: 97 },
];

const todoData = [
  { name: '약복용', value: 94 },
  { name: '산책', value: 75 },
  { name: '식사기록', value: 88 },
  { name: '혈압체크', value: 92 },
  { name: '수분섭취', value: 82 },
];

export default function OverallStatistics() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black font-headline text-slate-900 tracking-tight mb-2">전체 통계</h2>
          <p className="text-slate-500 font-medium">시설 전체의 건강 지표 현황을 확인합니다.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <Download size={18} />
            데이터 내보내기
          </button>
        </div>
      </div>

      <section className="flex flex-wrap items-center gap-4">
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">시니어 이름 선택</label>
          <select className="bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-semibold focus:ring-2 focus:ring-primary/10 outline-none min-w-[200px]">
            <option>전체 시니어</option>
            <option>김영희</option>
            <option>박명수</option>
            <option>이철수</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">기간 선택</label>
          <div className="bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-semibold flex items-center gap-3 min-w-[280px]">
            <span className="material-symbols-outlined text-slate-400 text-lg">calendar_today</span>
            <span>2023.10.01 - 2023.10.31</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '복약 순응도', value: '94.2%', status: 'Stable', trend: '+2.1%', color: 'primary', icon: Pill },
          { label: 'TO-DO 이행률', value: '88.5%', status: 'Good', trend: 'Target: 90%', color: 'slate', icon: CheckCircle2 },
          { label: '평균 혈당 (식후 2h)', value: '142', unit: 'mg/dL', status: 'High Risk', trend: 'Consistent elevation', color: 'error', icon: Droplets },
          { label: '평균 혈압', value: '128/82', status: 'Normal', trend: 'Optimal range', color: 'tertiary', icon: Activity },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-tight">{kpi.label}</p>
            <h3 className={cn(
              "text-3xl font-extrabold font-headline tracking-tight",
              kpi.color === 'primary' ? "text-primary" : kpi.color === 'error' ? "text-error" : "text-slate-900"
            )}>
              {kpi.value}
              {kpi.unit && <span className="text-sm ml-1 font-bold">{kpi.unit}</span>}
            </h3>
            <div className="mt-4 flex items-center gap-2">
              <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-full font-bold border",
                kpi.status === 'High Risk' ? "bg-error-container text-error border-error/10" : "bg-emerald-50 text-emerald-600 border-emerald-100"
              )}>{kpi.status}</span>
              <span className="text-[10px] text-slate-400 font-medium">{kpi.trend}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-bold font-headline flex items-center gap-2.5 text-slate-900">
              <TrendingUp className="text-primary" size={20} />
              혈당 그래프
            </h4>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-error"></span> 식후
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-primary/40"></span> 공복
              </span>
            </div>
          </div>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={glucoseData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="post" stroke="#ba1a1a" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="pre" stroke="#1976D2" strokeWidth={2} strokeDasharray="4 4" opacity={0.4} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-bold font-headline flex items-center gap-2.5 text-slate-900">
              <Activity className="text-primary" size={20} />
              혈압 그래프
            </h4>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-primary"></span> 수축기
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-slate-500"></span> 이완기
              </span>
            </div>
          </div>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bpData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="sys" stroke="#1976D2" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="dia" stroke="#48626e" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-bold font-headline flex items-center gap-2.5 text-slate-900">
              <CheckCircle2 className="text-primary" size={20} />
              복약 순응도 그래프
            </h4>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Target: 100%</span>
          </div>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adherenceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                <YAxis domain={[0, 100]} hide />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#1976D2" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-bold font-headline flex items-center gap-2.5 text-slate-900">
              <BarChart3 className="text-primary" size={20} />
              투두리스트 이행률 그래프
            </h4>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-primary"></span> 이행률 (%)
            </span>
          </div>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={todoData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {todoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#1976D2" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
