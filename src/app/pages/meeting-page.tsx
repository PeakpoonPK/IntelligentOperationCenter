import { KPICard } from '../components/shared/kpi-card';
import { ChartCard } from '../components/shared/chart-card';
import { DataTable } from '../components/shared/data-table';
import { StatusBadge } from '../components/shared/status-badge';
import { ExportButton } from '../components/shared/export-button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, TrendingUp, Calendar, CheckCircle } from 'lucide-react';

const attendanceByDeptData = [
  { dept: 'ศัลยกรรม', rate: 92, attended: 23, total: 25 },
  { dept: 'อายุรกรรม', rate: 88, attended: 22, total: 25 },
  { dept: 'กุมารเวชกรรม', rate: 95, attended: 19, total: 20 },
  { dept: 'รังสีวิทยา', rate: 78, attended: 14, total: 18 },
  { dept: 'ฉุกเฉิน', rate: 72, attended: 13, total: 18 },
  { dept: 'สูติ-นรีเวช', rate: 85, attended: 17, total: 20 },
];

const attendanceTrendData = [
  { month: 'ต.ค.', rate: 78 },
  { month: 'พ.ย.', rate: 82 },
  { month: 'ธ.ค.', rate: 85 },
  { month: 'ม.ค.', rate: 88 },
  { month: 'ก.พ.', rate: 86 },
  { month: 'มี.ค.', rate: 89 },
];

const meetingTypeData = [
  { type: 'กบห.', rate: 92 },
  { type: 'องค์กรแพ��ย์', rate: 85 },
  { type: 'ประชุมแพทย์ประจำเดือน', rate: 88 },
  { type: 'Medical Conference', rate: 76 },
  { type: 'Quality Meeting', rate: 81 },
];

const attendeeData = [
  { name: 'นพ.สมชาย ใจดี', dept: 'ศัลยกรรม', position: 'หัวหน้าแผนก', attended: 10, total: 12, rate: 83, status: 'good' },
  { name: 'พญ.วิมล รักงาม', dept: 'อายุรกรรม', position: 'แพทย์เชี่ยวชาญ', attended: 11, total: 12, rate: 92, status: 'excellent' },
  { name: 'นพ.ประสิทธิ์ มั่นคง', dept: 'กุมารเวชกรรม', position: 'แพทย์เชี่ยวชาญ', attended: 12, total: 12, rate: 100, status: 'excellent' },
  { name: 'พญ.อรุณ สว่างไสว', dept: 'รังสีวิทยา', position: 'หัวหน้าแผนก', attended: 8, total: 12, rate: 67, status: 'warning' },
  { name: 'นพ.วิชัย เรืองศิลป์', dept: 'ฉุกเฉิน', position: 'แพทย์เชี่ยวชาญ', attended: 7, total: 12, rate: 58, status: 'poor' },
  { name: 'พญ.สุดา แจ่มใส', dept: 'สูติ-นรีเวช', position: 'แพทย์เชี่ยวชาญ', attended: 10, total: 12, rate: 83, status: 'good' },
];

const attendeeColumns = [
  { key: 'name', label: 'ชื่อ-นามสกุล', align: 'left' as const },
  { key: 'dept', label: 'แผนก', align: 'left' as const },
  { key: 'position', label: 'ตำแหน่ง', align: 'left' as const },
  { 
    key: 'attended', 
    label: 'เข้าประชุม', 
    align: 'center' as const,
    render: (value: number, row: any) => (
      <span className="text-emerald-400">{value}/{row.total}</span>
    )
  },
  { 
    key: 'rate', 
    label: 'อัตรา (%)', 
    align: 'center' as const,
    render: (value: number) => (
      <span className={`font-semibold ${
        value >= 90 ? 'text-emerald-400' : 
        value >= 75 ? 'text-blue-400' : 
        value >= 60 ? 'text-amber-400' : 
        'text-rose-400'
      }`}>
        {value}%
      </span>
    )
  },
  { 
    key: 'status', 
    label: 'สถานะ', 
    align: 'center' as const,
    render: (value: string) => {
      const statusMap: Record<string, { label: string; status: 'success' | 'warning' | 'danger' | 'info' | 'neutral' }> = {
        'excellent': { label: 'ดีเยี่ยม', status: 'success' },
        'good': { label: 'ดี', status: 'info' },
        'warning': { label: 'ควรปรับปรุง', status: 'warning' },
        'poor': { label: 'ต้องปรับปรุง', status: 'danger' },
      };
      const { label, status } = statusMap[value] || { label: value, status: 'neutral' as const };
      return <StatusBadge status={status} label={label} />;
    }
  },
];

export function MeetingPage() {
  // Prepare export data
  const exportData = [
    { 'ตัวชี้วัด': 'อัตราเข้าประชุมรวม', 'ค่า': '85%', 'แนวโน้ม': '+3.5%' },
    { 'ตัวชี้วัด': 'จำนวนการประชุม', 'ค่า': '12', 'แนวโน้ม': '+20%' },
    { 'ตัวชี้วัด': 'ผู้เข้าร่วมเฉลี่ย', 'ค่า': '78%', 'แนวโน้ม': '+5.2%' },
    { 'ตัวชี้วัด': 'แผนกที่ดีที่สุด', 'ค่า': '95% - กุมารเวชกรรม', 'หมายเหตุ': 'อัตราเข้าประชุม' },
    ...attendanceByDeptData.map(item => ({
      'แผนก': item.dept,
      'อัตราเข้าร่วม': `${item.rate}%`,
      'เข้าประชุม': `${item.attended}/${item.total}`
    })),
    ...attendeeData.map(item => ({
      'ชื่อ-นามสกุล': item.name,
      'แผนก': item.dept,
      'ตำแหน่ง': item.position,
      'เข้าประชุม': `${item.attended}/${item.total}`,
      'อัตรา': `${item.rate}%`
    }))
  ];

  const dateRange = '2 มี.ค. 2026';

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5" id="meeting-content">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-white mb-1">การประชุม</h2>
          <p className="text-xs text-gray-400 truncate">รายงานการเข้าร่วมประชุมและการติดตามเรื่อง - {dateRange}</p>
        </div>
        <ExportButton 
          elementId="meeting-content"
          data={exportData}
          filename={`meeting-${dateRange}`}
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KPICard
          title="อัตราเข้าประชุมรวม"
          value="85%"
          trend="up"
          trendValue="3.5%"
          comparison="เทียบกับเดือนที่แล้ว"
          icon={<Users className="w-4 h-4 text-white" />}
          iconBgColor="from-blue-500 to-cyan-500"
        />
        <KPICard
          title="จำนวนการประชุม"
          value="12"
          trend="up"
          trendValue="20%"
          comparison="เดือนนี้"
          icon={<Calendar className="w-4 h-4 text-white" />}
          iconBgColor="from-purple-500 to-pink-500"
        />
        <KPICard
          title="ผู้เข้าร่วมเฉลี่ย"
          value="78%"
          trend="up"
          trendValue="5.2%"
          comparison="ต่อการประชุม"
          icon={<CheckCircle className="w-4 h-4 text-white" />}
          iconBgColor="from-emerald-500 to-teal-500"
        />
        <KPICard
          title="แผนกที่ดีที่สุด"
          value="95%"
          trend="neutral"
          trendValue="กุมารเวชกรรม"
          comparison="อัตราเข้าประชุม"
          icon={<TrendingUp className="w-4 h-4 text-white" />}
          iconBgColor="from-amber-500 to-orange-500"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title="อัตราเข้าร่วมประชุมแยกตามแผนก" subtitle="ข้อมูลเดือนนี้">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={attendanceByDeptData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="dept" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-15} textAnchor="end" height={70} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => `${value}%`}
              />
              <Bar dataKey="rate" fill="url(#colorAttendance)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="แนวโน้มอัตราเข้าประชุม" subtitle="6 เดือนล่าสุด">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={attendanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
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
                stroke="#10B981" 
                strokeWidth={3} 
                dot={{ fill: '#10B981', r: 5, strokeWidth: 2, stroke: '#1e293b' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Meeting Type Chart */}
      <ChartCard title="อัตราเข้าประชุมแยกตามประเภทการประชุม" subtitle="ข้อมูลเดือนนี้">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={meetingTypeData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
            <YAxis dataKey="type" type="category" width={140} tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number) => `${value}%`}
            />
            <Bar dataKey="rate" fill="url(#colorMeetingType)" radius={[0, 6, 6, 0]} />
            <defs>
              <linearGradient id="colorMeetingType" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1} />
                <stop offset="100%" stopColor="#EC4899" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Attendee Table */}
      <ChartCard title="รายชื่อผู้เข้าร่วมประชุมและสถิติ" subtitle="ข้อมูล 12 การประชุมล่าสุด">
        <DataTable columns={attendeeColumns} data={attendeeData} />
      </ChartCard>
    </div>
  );
}