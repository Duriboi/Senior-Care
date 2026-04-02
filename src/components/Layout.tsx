import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
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
    { icon: Users, label: '시니어 기본정보', href: '/residents' },
    { icon: Calendar, label: '전송 데이터 리스트', href: '/data' },
    { icon: BarChart3, label: 'AI 기반 통계리포트', href: '/reports' },
    { icon: CheckSquare, label: '시니어 투두리스트 관리', href: '/todos' },
    { icon: Search, label: '시니어 통합 검색 및 등록', href: '/senior-search' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-50 border-r border-slate-200 flex flex-col py-6 px-4 z-50">
      <div className="px-4 mb-10">
        <h1 className="text-xl font-extrabold text-primary font-headline tracking-tight">Vitalis Care</h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Clinical Portal</p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium",
              isActive 
                ? "text-primary font-bold" 
                : "text-slate-600 hover:text-primary"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={cn("transition-colors", isActive ? "text-primary" : "text-slate-400")} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-200">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-error transition-colors text-sm font-medium">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export function Header() {
  const location = useLocation();
  const isDashboard = location.pathname === '/';
  const isOverallStats = location.pathname === '/overall-stats';

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100">
      <div className="h-16 flex items-center justify-end px-8 gap-6">
        <button className="relative text-slate-400 hover:text-primary transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900">김관리 관리자</p>
            <p className="text-[10px] text-slate-400 font-medium">수석 간호사</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=100&h=100" 
            alt="Admin" 
            className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
          />
        </div>
      </div>
      
      <div className="px-8 flex gap-8 h-12 items-end">
        <Link 
          to="/" 
          className={cn(
            "text-sm font-bold pb-3 px-2 transition-all border-b-2",
            isDashboard ? "text-primary border-primary" : "text-slate-400 border-transparent hover:text-slate-600"
          )}
        >
          대시보드
        </Link>
        <Link 
          to="/overall-stats" 
          className={cn(
            "text-sm font-bold pb-3 px-2 transition-all border-b-2",
            isOverallStats ? "text-primary border-primary" : "text-slate-400 border-transparent hover:text-slate-600"
          )}
        >
          전체 통계
        </Link>
      </div>
    </header>
  );
}
