import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useLocation 
} from 'react-router-dom';
import { Sidebar, Header } from './components/Layout';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import Residents from './pages/Residents';
import DataList from './pages/DataList';
import TodoManagement from './pages/TodoManagement';
import Search from './pages/Search';
import { cn } from './lib/utils';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname === '/';
  const isStats = location.pathname === '/reports';

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />
        
        {/* Sub-navigation Tabs */}
        {(isDashboard || isStats) && (
          <div className="bg-white/60 backdrop-blur-md px-8 flex gap-8 h-10 items-end border-b border-slate-200/50 shrink-0">
            <button className={cn(
              "text-sm font-medium pb-2 px-2 transition-colors hover:text-primary",
              isDashboard && "active-tab"
            )}>대시보드</button>
            <button className={cn(
              "text-sm font-medium pb-2 px-2 transition-colors hover:text-primary",
              isStats && "active-tab"
            )}>전체 통계</button>
          </div>
        )}

        <div className="p-8 flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/residents" element={<Residents />} />
            <Route path="/data" element={<DataList />} />
            <Route path="/reports" element={<Statistics />} />
            <Route path="/todos" element={<TodoManagement />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
