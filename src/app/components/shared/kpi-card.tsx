import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  comparison?: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
}

export function KPICard({ 
  title, 
  value, 
  trend, 
  trendValue, 
  comparison, 
  icon, 
  iconBgColor = 'from-indigo-500 to-purple-500' 
}: KPICardProps) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200 shadow-lg">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs text-gray-400">{title}</span>
        {icon && (
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${iconBgColor} flex items-center justify-center shadow-lg`}>
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-end gap-2 mb-1.5">
        <span className="text-2xl font-bold text-white">{value}</span>
        {trend && (
          <div className={`flex items-center gap-1 pb-0.5 ${
            trend === 'up' ? 'text-emerald-400' : 
            trend === 'down' ? 'text-rose-400' : 
            'text-gray-400'
          }`}>
            {trend === 'up' ? <ArrowUp className="w-3.5 h-3.5" /> : 
             trend === 'down' ? <ArrowDown className="w-3.5 h-3.5" /> : 
             <Minus className="w-3.5 h-3.5" />}
            <span className="text-xs font-semibold">{trendValue}</span>
          </div>
        )}
      </div>
      
      {comparison && (
        <p className="text-xs text-gray-500">{comparison}</p>
      )}
    </div>
  );
}
