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
import OverallStatistics from './pages/OverallStatistics';
import Residents from './pages/Residents';
import DataList from './pages/DataList';
import TodoManagement from './pages/TodoManagement';
import Search from './pages/Search';
import SeniorSearch from './pages/SeniorSearch';
import { cn } from './lib/utils';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname === '/';
  const isOverallStats = location.pathname === '/overall-stats';

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />
        
        <div className="p-8 flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/residents" element={<Residents />} />
            <Route path="/data" element={<DataList />} />
            <Route path="/reports" element={<Statistics />} />
            <Route path="/overall-stats" element={<OverallStatistics />} />
            <Route path="/todos" element={<TodoManagement />} />
            <Route path="/search" element={<Search />} />
            <Route path="/senior-search" element={<SeniorSearch />} />
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
