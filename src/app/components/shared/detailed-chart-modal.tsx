import { X, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { ExportButton } from './export-button';
import { useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DetailedChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartType: string;
  title: string;
  subtitle?: string;
  data: any[];
  exportFilename?: string;
}

export function DetailedChartModal({ 
  isOpen, 
  onClose, 
  chartType,
  title, 
  subtitle, 
  data,
  exportFilename = 'chart-detail' 
}: DetailedChartModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const renderChart = () => {
    switch(chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis 
                dataKey={Object.keys(data[0] || {})[0]} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
              />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={Object.keys(data[0] || {})[1]} 
                stroke="#6366F1" 
                strokeWidth={3} 
                dot={{ fill: '#6366F1', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis 
                dataKey={Object.keys(data[0] || {})[0]} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Legend />
              <Bar 
                dataKey={Object.keys(data[0] || {})[1]} 
                fill="url(#colorGradient)" 
                radius={[8, 8, 0, 0]} 
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  // Calculate statistics
  const calculateStats = () => {
    if (!data || data.length === 0) return null;
    
    const valueKey = Object.keys(data[0])[1];
    const values = data.map(item => item[valueKey]);
    const sum = values.reduce((a: number, b: number) => a + b, 0);
    const avg = sum / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    
    // Calculate trend (comparing last value with first)
    const trend = values.length > 1 ? 
      ((values[values.length - 1] - values[0]) / values[0] * 100).toFixed(1) : 0;
    
    return { avg, max, min, sum, trend };
  };

  const stats = calculateStats();

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-slate-700/50 m-4 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-700/50 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
          <div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            <ExportButton 
              data={data} 
              filename={exportFilename}
              elementId="modal-chart-content"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6" id="modal-chart-content">
          {/* Statistics Summary */}
          {stats && (
            <div className="grid grid-cols-5 gap-4 mb-6">
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
                <div className="text-xs text-gray-400 mb-1">ค่าเฉลี่ย</div>
                <div className="text-2xl font-bold text-white">{stats.avg.toFixed(1)}</div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
                <div className="text-xs text-gray-400 mb-1">สูงสุด</div>
                <div className="text-2xl font-bold text-emerald-400">{stats.max}</div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
                <div className="text-xs text-gray-400 mb-1">ต่ำสุด</div>
                <div className="text-2xl font-bold text-amber-400">{stats.min}</div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
                <div className="text-xs text-gray-400 mb-1">รวมทั้งหมด</div>
                <div className="text-2xl font-bold text-indigo-400">{stats.sum.toLocaleString()}</div>
              </div>
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
                <div className="text-xs text-gray-400 mb-1">แนวโน้ม</div>
                <div className={`text-2xl font-bold flex items-center gap-1 ${
                  Number(stats.trend) > 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {Number(stats.trend) > 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  {stats.trend}%
                </div>
              </div>
            </div>
          )}

          {/* Chart */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-6">
            <h3 className="text-sm font-semibold text-white mb-4">กราฟข้อมูลเต็ม</h3>
            {renderChart()}
          </div>

          {/* Data Table */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">ตารางข้อมูลทั้งหมด</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    {data && data.length > 0 && Object.keys(data[0]).map((key) => (
                      <th key={key} className="text-left text-xs font-semibold text-gray-400 pb-3 px-4">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data && data.map((row, index) => (
                    <tr key={index} className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors">
                      {Object.values(row).map((value: any, i) => (
                        <td key={i} className="text-sm text-white py-3 px-4">
                          {typeof value === 'number' ? value.toLocaleString() : value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
