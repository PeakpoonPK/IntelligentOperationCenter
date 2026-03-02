import { KPICard } from '../components/shared/kpi-card';
import { ChartCard } from '../components/shared/chart-card';
import { DataTable } from '../components/shared/data-table';
import { ExportButton } from '../components/shared/export-button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, TrendingDown, Clock, UserX } from 'lucide-react';

const leaveRateByDeptData = [
  { dept: 'ศัลยกรรม', rate: 4.2, days: 42 },
  { dept: 'อายุรกรรม', rate: 3.8, days: 38 },
  { dept: 'กุมารเวชกรรม', rate: 3.2, days: 28 },
  { dept: 'รังสีวิทยา', rate: 5.1, days: 31 },
  { dept: 'ฉุกเฉิน', rate: 6.2, days: 56 },
  { dept: 'สูติ-นรีเวช', rate: 4.5, days: 41 },
];

const leaveTrendData = [
  { month: 'ต.ค.', rate: 4.8 },
  { month: 'พ.ย.', rate: 5.2 },
  { month: 'ธ.ค.', rate: 6.1 },
  { month: 'ม.ค.', rate: 4.5 },
  { month: 'ก.พ.', rate: 4.2 },
  { month: 'มี.ค.', rate: 4.3 },
];

const overtimeData = [
  { dept: 'ฉุกเฉิน', hours: 180 },
  { dept: 'ศัลยกรรม', hours: 145 },
  { dept: 'ICU', hours: 132 },
  { dept: 'อายุรกรรม', hours: 98 },
  { dept: 'สูติ-นรีเวช', hours: 87 },
  { dept: 'กุมารเวชกรรม', hours: 65 },
];

const staffPatientRatioData = [
  { dept: 'ICU', ratio: '1:2', staff: 20, patients: 40, score: 'excellent' },
  { dept: 'ศัลยกรรม', ratio: '1:8', staff: 15, patients: 120, score: 'good' },
  { dept: 'อายุรกรรม', ratio: '1:10', staff: 18, patients: 180, score: 'good' },
  { dept: 'กุมารเวชกรรม', ratio: '1:6', staff: 12, patients: 72, score: 'excellent' },
  { dept: 'ฉุกเฉิน', ratio: '1:12', staff: 10, patients: 120, score: 'warning' },
  { dept: 'สูติ-นรีเวช', ratio: '1:9', staff: 14, patients: 126, score: 'good' },
];

const leaveTypeData = [
  { type: 'ลาป่วย', days: 145, percent: 35 },
  { type: 'ลากิจ', days: 98, percent: 24 },
  { type: 'ลาพักร้อน', days: 125, percent: 30 },
  { type: 'ลาอื่นๆ', days: 45, percent: 11 },
];

const ratioColumns = [
  { key: 'dept', label: 'แผนก', align: 'left' as const },
  { 
    key: 'ratio', 
    label: 'อัตราส่วน', 
    align: 'center' as const,
    render: (value: string) => (
      <span className="font-semibold text-cyan-400">{value}</span>
    )
  },
  { 
    key: 'staff', 
    label: 'พนักงาน', 
    align: 'right' as const,
    render: (value: number) => (
      <span className="text-gray-300">{value} คน</span>
    )
  },
  { 
    key: 'patients', 
    label: 'ผู้ป่วย', 
    align: 'right' as const,
    render: (value: number) => (
      <span className="text-gray-300">{value} คน</span>
    )
  },
  { 
    key: 'score', 
    label: 'ประเมิน', 
    align: 'center' as const,
    render: (value: string) => {
      const scoreMap: Record<string, { label: string; status: 'success' | 'warning' | 'danger' | 'info' | 'neutral' }> = {
        'excellent': { label: 'ดีเยี่ยม', status: 'success' },
        'good': { label: 'ดี', status: 'info' },
        'warning': { label: 'ควรปรับปรุง', status: 'warning' },
        'poor': { label: 'ต้องปรับปรุง', status: 'danger' },
      };
      const { label, status } = scoreMap[value] || { label: value, status: 'neutral' as const };
      return (
        <span
          className={`inline-flex items-center justify-center rounded-full border font-medium text-xs px-2 py-0.5 ${
            status === 'success' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
            status === 'info' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
            status === 'warning' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
            'bg-gray-500/20 text-gray-400 border-gray-500/30'
          }`}
        >
          {label}
        </span>
      );
    }
  },
];

export function HRPage() {
  // Prepare export data
  const exportData = [
    { 'ตัวชี้วัด': 'อัตราการลาโดยรวม', 'ค่า': '4.3%', 'แนวโน้ม': '-8.5%' },
    { 'ตัวชี้วัด': 'พนักงานทั้งหมด', 'ค่า': '285', 'แนวโน้ม': '+2.2%' },
    { 'ตัวชี้วัด': 'OT รวมเดือนนี้', 'ค่า': '707 ชม.', 'แนวโน้ม': '-12.3%' },
    { 'ตัวชี้วัด': 'อัตราส่วนเฉลี่ย', 'ค่า': '1:8', 'หมายเหตุ': 'พนักงาน:ผู้ป่วย' },
    ...leaveRateByDeptData.map(item => ({
      'แผนก': item.dept,
      'อัตราการลา': `${item.rate}%`,
      'วันลา': `${item.days} วัน`
    })),
    ...overtimeData.map(item => ({
      'แผนก': item.dept,
      'OT (ชั่วโมง)': item.hours
    })),
    ...staffPatientRatioData.map(item => ({
      'แผนก': item.dept,
      'อัตราส่วน': item.ratio,
      'พนักงาน': `${item.staff} คน`,
      'ผู้ป่วย': `${item.patients} คน`
    }))
  ];

  const dateRange = '2 มี.ค. 2026, 14:30 น.';

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5" id="hr-content">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-white mb-1">ทรัพยากรบุคคล</h2>
          <p className="text-xs text-gray-400 truncate">รายงานและสถิติด้านบุคลากร - {dateRange}</p>
        </div>
        <ExportButton 
          elementId="hr-content"
          data={exportData}
          filename={`hr-${dateRange}`}
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KPICard
          title="อัตราการลาโดยรวม"
          value="4.3%"
          trend="down"
          trendValue="8.5%"
          comparison="ลดลงจากเดือนที่แล้ว"
          icon={<UserX className="w-4 h-4 text-white" />}
          iconBgColor="from-amber-500 to-orange-500"
        />
        <KPICard
          title="พนักงานทั้งหมด"
          value="285"
          trend="up"
          trendValue="2.2%"
          comparison="เพิ่มจากเดือนที่แล้ว"
          icon={<Users className="w-4 h-4 text-white" />}
          iconBgColor="from-blue-500 to-cyan-500"
        />
        <KPICard
          title="OT รวมเดือนนี้"
          value="707 ชม."
          trend="down"
          trendValue="12.3%"
          comparison="ลดลงจากเดือนที่แล้ว"
          icon={<Clock className="w-4 h-4 text-white" />}
          iconBgColor="from-purple-500 to-pink-500"
        />
        <KPICard
          title="อัตราส่วนเฉลี่ย"
          value="1:8"
          trend="neutral"
          trendValue="พนักงาน:ผู้ป่วย"
          comparison="ตามเกณฑ์มาตรฐาน"
          icon={<TrendingDown className="w-4 h-4 text-white" />}
          iconBgColor="from-emerald-500 to-teal-500"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title="อัตราการลาแยกตามแผนก" subtitle="ข้อมูลเดือนนี้ (%)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={leaveRateByDeptData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="dept" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => `${value}%`}
              />
              <Bar dataKey="rate" fill="url(#colorLeave)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorLeave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={1} />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="แนวโน้มอัตราการลา" subtitle="6 เดือนล่าสุด (%)">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={leaveTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => `${value}%`}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#F59E0B" 
                strokeWidth={3} 
                dot={{ fill: '#F59E0B', r: 5, strokeWidth: 2, stroke: '#1e293b' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title="ชั่วโมง OT แยกตามแผนก" subtitle="เดือนนี้ (ชั่วโมง)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={overtimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="dept" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => `${value} ชม.`}
              />
              <Bar dataKey="hours" fill="url(#colorOT)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorOT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="การลาแยกตามประเภท" subtitle="เดือนนี้ (วัน)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={leaveTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="type" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => `${value} วัน`}
              />
              <Bar dataKey="days" fill="url(#colorLeaveType)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorLeaveType" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={1} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Staff to Patient Ratio Table */}
      <ChartCard title="อัตราส่วนพนักงานต่อผู้ป่วยแยกตามแผนก" subtitle="ข้อมูลปัจจุบัน">
        <DataTable columns={ratioColumns} data={staffPatientRatioData} />
      </ChartCard>
    </div>
  );
}