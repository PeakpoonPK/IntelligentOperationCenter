import { Link, useLocation } from 'react-router';
import { LayoutDashboard, Stethoscope, BedDouble, DollarSign, Users, Briefcase, HeartPulse, X } from 'lucide-react';
import { useSidebar } from '../../context/sidebar-context';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

function SidebarItem({ icon, label, to, active }: SidebarItemProps) {
  return (
    <Link
      to={to}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
        active
          ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg shadow-indigo-500/30'
          : 'text-gray-300 hover:bg-slate-800/50 hover:text-white'
      }`}
    >
      <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const location = useLocation();
  const { isOpen, close } = useSidebar();
  
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={close}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen w-[240px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 
        border-r border-slate-700/50 flex flex-col z-50 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 lg:hidden w-8 h-8 flex items-center justify-center 
                     rounded-lg hover:bg-slate-800 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="h-[60px] flex items-center px-5 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <HeartPulse className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white text-sm">ระบบรายงาน รพ.</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5">
          <SidebarItem 
            icon={<LayoutDashboard />} 
            label="ภาพรวม" 
            to="/" 
            active={location.pathname === '/'} 
          />
          <SidebarItem 
            icon={<Stethoscope />} 
            label="ผู้ป่วยนอก (OPD)" 
            to="/opd" 
            active={location.pathname === '/opd'} 
          />
          <SidebarItem 
            icon={<BedDouble />} 
            label="ผู้ป่วยใน (IPD)" 
            to="/ipd" 
            active={location.pathname === '/ipd'} 
          />
          <SidebarItem 
            icon={<DollarSign />} 
            label="การเงิน" 
            to="/financial" 
            active={location.pathname === '/financial'} 
          />
          <SidebarItem 
            icon={<Users />} 
            label="การประชุม" 
            to="/meeting" 
            active={location.pathname === '/meeting'} 
          />
          <SidebarItem 
            icon={<Briefcase />} 
            label="ทรัพยากรบุคคล" 
            to="/hr" 
            active={location.pathname === '/hr'} 
          />
        </nav>
        
        {/* Footer */}
        <div className="p-3 border-t border-slate-700/50">
          <div className="text-xs text-gray-400 px-3">
            <div>เวอร์ชัน 1.0.0</div>
            <div className="text-gray-500 mt-0.5">© 2026 Hospital Dashboard</div>
          </div>
        </div>
      </aside>
    </>
  );
}