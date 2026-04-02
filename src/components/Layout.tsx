import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart3, 
  CheckSquare, 
  Search, 
  LogOut,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: '대시보드', href: '/' },
    { icon: Users, label: '시니어 기본정보', href: '/residents' },
    { icon: Calendar, label: '전송 데이터 리스트', href: '/data' },
    { icon: BarChart3, label: 'AI 기반 통계리포트', href: '/reports' },
    { icon: CheckSquare, label: '시니어 투두리스트 관리', href: '/todos' },
    { icon: Search, label: '시니어 통합 검색', href: '/search' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-50 border-r border-slate-200 flex flex-col py-6 px-4 z-50">
      <div className="px-4 mb-8">
        <h1 className="text-xl font-extrabold text-primary font-headline">Vitalis Care</h1>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Clinical Portal</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium",
              isActive 
                ? "bg-white shadow-sm border border-slate-200 text-primary font-bold" 
                : "text-slate-600 hover:bg-slate-100 hover:text-primary"
            )}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-200">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:text-error transition-colors text-sm font-medium">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/60 backdrop-blur-md border-b border-slate-200/50 h-16 flex items-center justify-end px-8">
      <div className="flex items-center gap-6">
        <button className="relative text-slate-500 hover:text-primary transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-error border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900">김관리 관리자</p>
            <p className="text-[10px] text-slate-500 font-medium">수석 간호사</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=100&h=100" 
            alt="Admin" 
            className="w-10 h-10 rounded-full object-cover border-2 border-primary/10"
          />
        </div>
      </div>
    </header>
  );
}
