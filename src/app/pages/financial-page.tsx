import { KPICard } from '../components/shared/kpi-card';
import { ChartCard } from '../components/shared/chart-card';
import { DataTable } from '../components/shared/data-table';
import { StatusBadge } from '../components/shared/status-badge';
import { ExportButton } from '../components/shared/export-button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, Percent, Clock } from 'lucide-react';
import { useFilter } from '../context/filter-context';

const collectionByFundData = [
  { fund: 'สปสช.', billed: 4500, collected: 4230, rate: 94 },
  { fund: 'ประกันสังคม', billed: 4000, collected: 3880, rate: 97 },
  { fund: 'จ่ายเอง', billed: 3200, collected: 2944, rate: 92 },
  { fund: 'บริษัทประกัน', billed: 2500, collected: 2275, rate: 91 },
  { fund: 'อื่นๆ', billed: 1800, collected: 1638, rate: 91 },
];

const revenueByTypeData = [
  { type: 'REP', amount: 8500 },
  { type: 'Statement', amount: 4200 },
  { type: 'Instrument', amount: 2300 },
  { type: 'Adj RW', amount: 1200 },
];

const revenueTrendData = [
  { month: 'ต.ค. 68', revenue: 12500 },
  { month: 'พ.ย. 68', revenue: 13200 },
  { month: 'ธ.ค. 68', revenue: 14100 },
  { month: 'ม.ค. 69', revenue: 13800 },
  { month: 'ก.พ. 69', revenue: 14500 },
  { month: 'มี.ค. 69', revenue: 15200 },
];

const payerMixData = [
  { name: 'สปสช.', value: 35, color: '#6366F1' },
  { name: 'ประกันสังคม', value: 28, color: '#8B5CF6' },
  { name: 'จ่ายเอง', value: 20, color: '#EC4899' },
  { name: 'บริษัทประกัน', value: 12, color: '#F59E0B' },
  { name: 'อื่นๆ', value: 5, color: '#10B981' },
];

const outstandingBillingData = [
  { hn: 'HN12345', patient: 'นายสมชาย ใจดี', fund: 'สปสช.', amount: 45000, days: 45, status: 'pending' },
  { hn: 'HN23456', patient: 'นางสาววิมล รักงาม', fund: 'ประกันสังคม', amount: 38000, days: 32, status: 'pending' },
  { hn: 'HN34567', patient: 'นายประสิทธิ์ มั่นคง', fund: 'บริษัทประกัน', amount: 125000, days: 28, status: 'follow-up' },
  { hn: 'HN45678', patient: 'นางอรุณ สว่างไสว', fund: 'จ่ายเอง', amount: 22000, days: 18, status: 'follow-up' },
  { hn: 'HN56789', patient: 'นายวิชัย เรืองศิลป์', fund: 'สปสช.', amount: 52000, days: 62, status: 'urgent' },
];

const billingColumns = [
  { key: 'hn', label: 'HN', align: 'left' as const },
  { key: 'patient', label: 'ชื่อผู้ป่วย', align: 'left' as const },
  { key: 'fund', label: 'กองทุน', align: 'left' as const },
  { 
    key: 'amount', 
    label: 'ยอดเรียกเก็บ', 
    align: 'right' as const,
    render: (value: number) => (
      <span className="font-semibold text-amber-400">฿{value.toLocaleString()}</span>
    )
  },
  { 
    key: 'days', 
    label: 'รอ (วัน)', 
    align: 'right' as const,
    render: (value: number) => (
      <span className={value > 45 ? 'text-rose-400' : value > 30 ? 'text-amber-400' : 'text-gray-300'}>
        {value}
      </span>
    )
  },
  { 
    key: 'status', 
    label: 'สถานะ', 
    align: 'center' as const,
    render: (value: string) => {
      const statusMap: Record<string, { label: string; status: 'success' | 'warning' | 'danger' | 'info' | 'neutral' }> = {
        'pending': { label: 'รอดำเนินการ', status: 'warning' },
        'follow-up': { label: 'ติดตาม', status: 'info' },
        'urgent': { label: 'ด่วน', status: 'danger' },
      };
      const { label, status } = statusMap[value] || { label: value, status: 'neutral' as const };
      return <StatusBadge status={status} label={label} />;
    }
  },
];

export function FinancialPage() {
  const { dateRange, department, fund } = useFilter();

  // Prepare export data
  const exportData = [
    { 'ตัวชี้วัด': 'รายได้รวมเดือนนี้', 'ค่า': '฿15.2M', 'แนวโน้ม': '+10.5%' },
    { 'ตัวชี้วัด': 'อัตราจัดเก็บเงิน', 'ค่า': '94.2%', 'แนวโน้ม': '+1.8%' },
    { 'ตัวชี้วัด': 'A/R Days', 'ค่า': '38 วัน', 'แนวโน้ม': '-8.2%' },
    { 'ตัวชี้วัด': 'ค้างชำระ', 'ค่า': '฿282K', 'แนวโน้ม': '-12.3%' },
    ...collectionByFundData.map(item => ({
      'กองทุน': item.fund,
      'Billed': `฿${item.billed}K`,
      'Collected': `฿${item.collected}K`,
      'อัตราจัดเก็บ': `${item.rate}%`
    })),
    ...outstandingBillingData.map(item => ({
      'HN': item.hn,
      'ชื่อผู้ป่วย': item.patient,
      'กองทุน': item.fund,
      'ยอดเรียกเก็บ': `฿${item.amount.toLocaleString()}`,
      'รอ (วัน)': item.days
    }))
  ];

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5" id="financial-content">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-white mb-1">ข้อมูลการเงิน</h2>
          <p className="text-xs text-gray-400 truncate">รายงานและสถิติด้านการเงินทั้งหมด - {dateRange}{department !== 'ทุกแผนก' ? ` - ${department}` : ''}{fund !== 'ทุกกองทุน' ? ` - ${fund}` : ''}</p>
        </div>
        <ExportButton 
          elementId="financial-content"
          data={exportData}
          filename={`financial-${dateRange}-${department}-${fund}`}
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KPICard
          title="รายได้รวมเดือนนี้"
          value="฿15.2M"
          trend="up"
          trendValue="10.5%"
          comparison="เทียบกับเดือนที่แล้ว"
          icon={<DollarSign className="w-4 h-4 text-white" />}
          iconBgColor="from-emerald-500 to-teal-500"
        />
        <KPICard
          title="อัตราจัดเก็บเงิน"
          value="94.2%"
          trend="up"
          trendValue="1.8%"
          comparison="เทียบกับเดือนที่แล้ว"
          icon={<Percent className="w-4 h-4 text-white" />}
          iconBgColor="from-blue-500 to-cyan-500"
        />
        <KPICard
          title="A/R Days"
          value="38 วัน"
          trend="down"
          trendValue="8.2%"
          comparison="ดีขึ้นจากเดือนที่แล้ว"
          icon={<Clock className="w-4 h-4 text-white" />}
          iconBgColor="from-purple-500 to-pink-500"
        />
        <KPICard
          title="ค้างชำระ"
          value="฿282K"
          trend="down"
          trendValue="12.3%"
          comparison="ลดลงจากเดือนที่แล้ว"
          icon={<TrendingUp className="w-4 h-4 text-white" />}
          iconBgColor="from-amber-500 to-orange-500"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title="อัตราการจัดเก็บเงินแยกตามกองทุน" subtitle="ข้อมูลเดือนนี้">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={collectionByFundData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="fund" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
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
              <Bar dataKey="rate" fill="url(#colorCollection)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorCollection" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={1} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="รายได้แยกตามประเภท" subtitle="เดือนนี้ (พันบาท)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueByTypeData}>
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
                formatter={(value: number) => `฿${value.toLocaleString()}K`}
              />
              <Bar dataKey="amount" fill="url(#colorRevType)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorRevType" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title="แนวโน้มรายได้รวม" subtitle="6 เดือนล่าสุด (พันบาท)">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueTrendData}>
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
                formatter={(value: number) => `฿${value.toLocaleString()}K`}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={3} 
                dot={{ fill: '#10B981', r: 5, strokeWidth: 2, stroke: '#1e293b' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="สัดส่วนกองทุน (Payer Mix)" subtitle="ข้อมูลเดือนนี้">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={payerMixData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {payerMixData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => `${value}%`}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Outstanding Billing Table */}
      <ChartCard title="รายการค้างชำระที่ต้องติดตาม" subtitle={`มี ${outstandingBillingData.length} รายการ`}>
        <DataTable columns={billingColumns} data={outstandingBillingData} />
      </ChartCard>
    </div>
  );
}