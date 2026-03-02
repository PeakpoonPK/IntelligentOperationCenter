import { KPICard } from '../components/shared/kpi-card';
import { ChartCard } from '../components/shared/chart-card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Bed, DollarSign, TrendingUp, Calendar, Percent, Activity, Clock, AlertTriangle, CheckCircle2, UserCheck, FileCheck } from 'lucide-react';
import { useFilter } from '../context/filter-context';
import { ExportButton } from '../components/shared/export-button';

// KPI Data by period
const kpiByPeriod = {
  'วันนี้': {
    totalPatients: 340,
    bedOccupancy: 87,
    revenue: 470,
    avgWaitTime: 28,
  },
  'สัปดาห์นี้': {
    totalPatients: 1890,
    bedOccupancy: 89,
    revenue: 3460,
    avgWaitTime: 25,
  },
  'เดือนนี้': {
    totalPatients: 8120,
    bedOccupancy: 85,
    revenue: 14790,
    avgWaitTime: 30,
  },
  'กำหนดเอง': {
    totalPatients: 24360,
    bedOccupancy: 86,
    revenue: 44340,
    avgWaitTime: 29,
  }
};

// KPI Data by department
const kpiByDepartment = {
  'ทุกแผนก': {
    totalPatients: 8120,
    bedOccupancy: 85,
    revenue: 14790,
    avgWaitTime: 30,
  },
  'ศัลยกรรม': {
    totalPatients: 1850,
    bedOccupancy: 92,
    revenue: 4200,
    avgWaitTime: 35,
  },
  'อายุรกรรม': {
    totalPatients: 2340,
    bedOccupancy: 88,
    revenue: 3850,
    avgWaitTime: 28,
  },
  'กุมารเวชกรรม': {
    totalPatients: 1420,
    bedOccupancy: 75,
    revenue: 2100,
    avgWaitTime: 22,
  },
  'รังสีวิทยา': {
    totalPatients: 980,
    bedOccupancy: 65,
    revenue: 1680,
    avgWaitTime: 45,
  },
  'ทันตกรรม': {
    totalPatients: 790,
    bedOccupancy: 55,
    revenue: 1450,
    avgWaitTime: 32,
  },
  'สูติ-นรีเวช': {
    totalPatients: 740,
    bedOccupancy: 82,
    revenue: 1510,
    avgWaitTime: 26,
  }
};

// KPI Data by fund
const kpiByFund = {
  'ทุกกองทุน': {
    totalPatients: 8120,
    bedOccupancy: 85,
    revenue: 14790,
    avgWaitTime: 30,
  },
  'สปสช.': {
    totalPatients: 3890,
    bedOccupancy: 88,
    revenue: 4200,
    avgWaitTime: 32,
  },
  'ประกันสังคม': {
    totalPatients: 2140,
    bedOccupancy: 85,
    revenue: 3800,
    avgWaitTime: 28,
  },
  'จ่ายเอง': {
    totalPatients: 1380,
    bedOccupancy: 78,
    revenue: 2900,
    avgWaitTime: 25,
  },
  'บริษัทประกัน': {
    totalPatients: 510,
    bedOccupancy: 82,
    revenue: 2100,
    avgWaitTime: 22,
  },
  'อื่นๆ': {
    totalPatients: 200,
    bedOccupancy: 70,
    revenue: 1790,
    avgWaitTime: 35,
  }
};

// Chart Data for different time periods
const dataByPeriod = {
  'วันนี้': {
    opdIpd: [
      { date: '00:00', OPD: 12, IPD: 2 },
      { date: '04:00', OPD: 8, IPD: 1 },
      { date: '08:00', OPD: 45, IPD: 8 },
      { date: '12:00', OPD: 98, IPD: 12 },
      { date: '16:00', OPD: 125, IPD: 15 },
      { date: '20:00', OPD: 52, IPD: 8 },
    ],
    revenue: [
      { fund: 'สปสช.', revenue: 140 },
      { fund: 'ประกันสังคม', revenue: 125 },
      { fund: 'จ่ายเอง', revenue: 95 },
      { fund: 'บริษัทประกัน', revenue: 68 },
      { fund: 'อื่นๆ', revenue: 42 },
    ]
  },
  'สัปดาห์นี้': {
    opdIpd: [
      { date: '24 ก.พ.', OPD: 220, IPD: 75 },
      { date: '25 ก.พ.', OPD: 235, IPD: 80 },
      { date: '26 ก.พ.', OPD: 248, IPD: 78 },
      { date: '27 ก.พ.', OPD: 265, IPD: 85 },
      { date: '28 ก.พ.', OPD: 280, IPD: 90 },
      { date: '1 มี.ค.', OPD: 310, IPD: 88 },
      { date: '2 มี.ค.', OPD: 340, IPD: 96 },
    ],
    revenue: [
      { fund: 'สปสช.', revenue: 980 },
      { fund: 'ประกันสังคม', revenue: 890 },
      { fund: 'จ่ายเอง', revenue: 680 },
      { fund: 'บริษัทประกัน', revenue: 490 },
      { fund: 'อื่นๆ', revenue: 420 },
    ]
  },
  'เดือนนี้': {
    opdIpd: [
      { date: '1 มี.ค.', OPD: 245, IPD: 82 },
      { date: '5 มี.ค.', OPD: 268, IPD: 91 },
      { date: '10 มี.ค.', OPD: 290, IPD: 78 },
      { date: '15 มี.ค.', OPD: 312, IPD: 95 },
      { date: '20 มี.ค.', OPD: 285, IPD: 88 },
      { date: '25 มี.ค.', OPD: 325, IPD: 102 },
      { date: '2 มี.ค.', OPD: 340, IPD: 96 },
    ],
    revenue: [
      { fund: 'สปสช.', revenue: 4200 },
      { fund: 'ประกันสังคม', revenue: 3800 },
      { fund: 'จ่ายเอง', revenue: 2900 },
      { fund: 'บริษัทประกัน', revenue: 2100 },
      { fund: 'อื่นๆ', revenue: 1790 },
    ]
  },
  'กำหนดเอง': {
    opdIpd: [
      { date: 'ธ.ค.', OPD: 198, IPD: 70 },
      { date: 'ม.ค.', OPD: 225, IPD: 82 },
      { date: 'ก.พ.', OPD: 285, IPD: 88 },
      { date: 'มี.ค.', OPD: 340, IPD: 96 },
    ],
    revenue: [
      { fund: 'สปสช.', revenue: 12600 },
      { fund: 'ประกันสังคม', revenue: 11400 },
      { fund: 'จ่ายเอง', revenue: 8700 },
      { fund: 'บริษัทประกัน', revenue: 6300 },
      { fund: 'อื่นๆ', revenue: 5340 },
    ]
  }
};

// Chart Data by department
const opdIpdByDepartment = {
  'ทุกแผนก': [
    { date: '1 มี.ค.', OPD: 245, IPD: 82 },
    { date: '5 มี.ค.', OPD: 268, IPD: 91 },
    { date: '10 มี.ค.', OPD: 290, IPD: 78 },
    { date: '15 มี.ค.', OPD: 312, IPD: 95 },
    { date: '20 มี.ค.', OPD: 285, IPD: 88 },
    { date: '25 มี.ค.', OPD: 325, IPD: 102 },
    { date: '2 มี.ค.', OPD: 340, IPD: 96 },
  ],
  'ศัลยกรรม': [
    { date: '1 มี.ค.', OPD: 62, IPD: 28 },
    { date: '5 มี.ค.', OPD: 68, IPD: 32 },
    { date: '10 มี.ค.', OPD: 71, IPD: 29 },
    { date: '15 มี.ค.', OPD: 78, IPD: 35 },
    { date: '20 มี.ค.', OPD: 72, IPD: 31 },
    { date: '25 มี.ค.', OPD: 81, IPD: 38 },
    { date: '2 มี.ค.', OPD: 85, IPD: 36 },
  ],
  'อายุรกรรม': [
    { date: '1 มี.ค.', OPD: 78, IPD: 25 },
    { date: '5 มี.ค.', OPD: 85, IPD: 28 },
    { date: '10 มี.ค.', OPD: 92, IPD: 24 },
    { date: '15 มี.ค.', OPD: 98, IPD: 29 },
    { date: '20 มี.ค.', OPD: 88, IPD: 26 },
    { date: '25 มี.ค.', OPD: 102, IPD: 31 },
    { date: '2 มี.ค.', OPD: 108, IPD: 28 },
  ],
  'กุมารเวชกรรม': [
    { date: '1 มี.ค.', OPD: 45, IPD: 12 },
    { date: '5 มี.ค.', OPD: 52, IPD: 15 },
    { date: '10 มี.ค.', OPD: 58, IPD: 11 },
    { date: '15 มี.ค.', OPD: 62, IPD: 16 },
    { date: '20 มี.ค.', OPD: 55, IPD: 13 },
    { date: '25 มี.ค.', OPD: 65, IPD: 18 },
    { date: '2 มี.ค.', OPD: 68, IPD: 14 },
  ],
  'รังสีวิทยา': [
    { date: '1 มี.ค.', OPD: 32, IPD: 8 },
    { date: '5 มี.ค.', OPD: 35, IPD: 9 },
    { date: '10 มี.ค.', OPD: 38, IPD: 7 },
    { date: '15 มี.ค.', OPD: 41, IPD: 10 },
    { date: '20 มี.ค.', OPD: 36, IPD: 8 },
    { date: '25 มี.ค.', OPD: 42, IPD: 11 },
    { date: '2 มี.ค.', OPD: 45, IPD: 9 },
  ],
  'ทันตกรรม': [
    { date: '1 มี.ค.', OPD: 28, IPD: 3 },
    { date: '5 มี.ค.', OPD: 32, IPD: 4 },
    { date: '10 มี.ค.', OPD: 35, IPD: 2 },
    { date: '15 มี.ค.', OPD: 38, IPD: 5 },
    { date: '20 มี.ค.', OPD: 34, IPD: 3 },
    { date: '25 มี.ค.', OPD: 40, IPD: 4 },
    { date: '2 มี.ค.', OPD: 42, IPD: 4 },
  ],
  'สูติ-นรีเวช': [
    { date: '1 มี.ค.', OPD: 22, IPD: 15 },
    { date: '5 มี.ค.', OPD: 25, IPD: 18 },
    { date: '10 มี.ค.', OPD: 28, IPD: 14 },
    { date: '15 มี.ค.', OPD: 31, IPD: 19 },
    { date: '20 มี.ค.', OPD: 26, IPD: 16 },
    { date: '25 มี.ค.', OPD: 33, IPD: 21 },
    { date: '2 มี.ค.', OPD: 35, IPD: 18 },
  ]
};

// Revenue by fund (detail)
const revenueByFund = {
  'ทุกกองทุน': [
    { fund: 'สปสช.', revenue: 4200 },
    { fund: 'ประกันสังคม', revenue: 3800 },
    { fund: 'จ่ายเอง', revenue: 2900 },
    { fund: 'บริษัทประกัน', revenue: 2100 },
    { fund: 'อื่นๆ', revenue: 1790 },
  ],
  'สปสช.': [
    { fund: 'สปสช.', revenue: 4200 },
  ],
  'ประกันสังคม': [
    { fund: 'ประกันสังคม', revenue: 3800 },
  ],
  'จ่ายเอง': [
    { fund: 'จ่ายเอง', revenue: 2900 },
  ],
  'บริษัทประกัน': [
    { fund: 'บริษัทประกัน', revenue: 2100 },
  ],
  'อื่นๆ': [
    { fund: 'อื่นๆ', revenue: 1790 },
  ]
};

const meetingDataByDept = {
  'ทุกแผนก': [
    { dept: 'ศัลยกรรม', rate: 92 },
    { dept: 'กุมารเวชกรรม', rate: 88 },
    { dept: 'อายุรกรรม', rate: 85 },
    { dept: 'รังสีวิทยา', rate: 78 },
    { dept: 'ฉุกเฉิน', rate: 72 },
  ],
  'ศัลยกรรม': [
    { dept: 'ศัลยกรรมทั่วไป', rate: 95 },
    { dept: 'ศัลยกรรมกระดูก', rate: 92 },
    { dept: 'ศัลยกรรมประสาท', rate: 88 },
  ],
  'อายุรกรรม': [
    { dept: 'อายุรกรรม', rate: 85 },
    { dept: 'หัวใจ', rate: 90 },
    { dept: 'ระบบทางเดินอาหาร', rate: 82 },
  ],
  'กุมารเวชกรรม': [
    { dept: 'กุมารเวชกรรมทั่วไป', rate: 88 },
    { dept: 'กุมารเวชกรรมพิเศษ', rate: 85 },
  ],
  'รังสีวิทยา': [
    { dept: 'รังสีวิทยา', rate: 78 },
    { dept: 'รังสีรักษา', rate: 82 },
  ],
  'ทันตกรรม': [
    { dept: 'ทันตกรรมทั่วไป', rate: 86 },
    { dept: 'ทันตกรรมเฉพาะทาง', rate: 90 },
  ],
  'สูติ-นรีเวช': [
    { dept: 'สูติกรรม', rate: 92 },
    { dept: 'นรีเวชกรรม', rate: 88 },
  ]
};

export function OverviewPage() {
  const { dateRange, department, fund } = useFilter();

  // Get KPI data based on filters
  const periodKPI = kpiByPeriod[dateRange as keyof typeof kpiByPeriod] || kpiByPeriod['เดือนนี้'];
  const deptKPI = kpiByDepartment[department as keyof typeof kpiByDepartment] || kpiByDepartment['ทุกแผนก'];
  const fundKPI = kpiByFund[fund as keyof typeof kpiByFund] || kpiByFund['ทุกกองทุน'];

  // Combine KPIs (prioritize period, then apply dept and fund filters)
  const finalKPI = {
    totalPatients: department !== 'ทุกแผนก' ? deptKPI.totalPatients : 
                   fund !== 'ทุกกองทุน' ? fundKPI.totalPatients : 
                   periodKPI.totalPatients,
    bedOccupancy: department !== 'ทุกแผนก' ? deptKPI.bedOccupancy : 
                  fund !== 'ทุกกองทุน' ? fundKPI.bedOccupancy : 
                  periodKPI.bedOccupancy,
    revenue: department !== 'ทุกแผนก' ? deptKPI.revenue : 
             fund !== 'ทุกกองทุน' ? fundKPI.revenue : 
             periodKPI.revenue,
    avgWaitTime: department !== 'ทุกแผนก' ? deptKPI.avgWaitTime : 
                 fund !== 'ทุกกองทุน' ? fundKPI.avgWaitTime : 
                 periodKPI.avgWaitTime,
  };

  // Get chart data
  const currentData = dataByPeriod[dateRange as keyof typeof dataByPeriod] || dataByPeriod['เดือนนี้'];
  const currentOpdIpdData = department !== 'ทุกแผนก' 
    ? opdIpdByDepartment[department as keyof typeof opdIpdByDepartment] 
    : currentData.opdIpd;
  const currentMeetingData = meetingDataByDept[department as keyof typeof meetingDataByDept] || meetingDataByDept['ทุกแผนก'];

  // Filter revenue data by fund
  const filteredRevenue = revenueByFund[fund as keyof typeof revenueByFund] || currentData.revenue;

  // Prepare export data
  const exportData = [
    {
      'ตัวชี้วัด': 'ผู้ป่วยทั้งหมด',
      'ค่า': finalKPI.totalPatients,
      'หน่วย': 'ราย',
      'แนวโน้ม': '+8.2%'
    },
    {
      'ตัวชี้วัด': 'อัตราครองเตียง',
      'ค่า': finalKPI.bedOccupancy,
      'หน่วย': '%',
      'แนวโน้ม': '+3.5%'
    },
    {
      'ตัวชี้วัด': 'รายได้',
      'ค่า': finalKPI.revenue,
      'หน่วย': 'K บาท',
      'แนวโน้ม': '+12.3%'
    },
    {
      'ตัวชี้วัด': 'เวลารอเฉลี่ย',
      'ค่า': finalKPI.avgWaitTime,
      'หน่วย': 'นาที',
      'แนวโน้ม': '-5.1%'
    },
    ...currentOpdIpdData.map(item => ({
      'วันที่': item.date,
      'OPD': item.OPD,
      'IPD': item.IPD
    })),
    ...filteredRevenue.map(item => ({
      'กองทุน': item.fund,
      'รายได้': item.revenue + ' K'
    }))
  ];

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5" id="overview-content">
      {/* Page Header with Key Insights */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-3 sm:p-4 md:p-5">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-white mb-1">ภาพรวมโรงพยาบาล</h2>
            <p className="text-xs sm:text-sm text-gray-300 truncate">สรุปข้อมูลสำคัญสำหรับผู้บริหาร - {dateRange}{department !== 'ทุกแผนก' ? ` - ${department}` : ''}{fund !== 'ทุกกองทุน' ? ` - ${fund}` : ''}</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
            <ExportButton 
              elementId="overview-content"
              data={exportData}
              filename={`overview-${dateRange}-${department}-${fund}`}
            />
            <div className="text-right export-ignore hidden sm:block">
              <div className="text-xs text-gray-400">อัพเดทล่าสุด</div>
              <div className="text-sm font-semibold text-white">2 มี.ค. 2026, 14:30 น.</div>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4">
          <div className="bg-slate-800/50 rounded-lg p-2 sm:p-3 border border-slate-700/50">
            <div className="text-xs text-gray-400 mb-1">อัตราครองเตียง</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400">{finalKPI.bedOccupancy}%</div>
            <div className="text-xs text-gray-500 mt-1">เป้าหมาย 80-90%</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-2 sm:p-3 border border-slate-700/50">
            <div className="text-xs text-gray-400 mb-1">การเติบโตของรายได้</div>
            <div className="text-xl sm:text-2xl font-bold text-amber-400">+12.3%</div>
            <div className="text-xs text-gray-500 mt-1">เทียบเดือนที่แล้ว</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-2 sm:p-3 border border-slate-700/50">
            <div className="text-xs text-gray-400 mb-1">ความพึงพอใจผู้ป่วย</div>
            <div className="text-xl sm:text-2xl font-bold text-purple-400">4.6/5</div>
            <div className="text-xs text-gray-500 mt-1">จาก 2,340 รีวิว</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-2 sm:p-3 border border-slate-700/50">
            <div className="text-xs text-gray-400 mb-1">ประสิทธิภาพบุคลากร</div>
            <div className="text-xl sm:text-2xl font-bold text-cyan-400">92%</div>
            <div className="text-xs text-gray-500 mt-1">แพทย์เข้าตรงเวลา</div>
          </div>
        </div>
      </div>

      {/* KPI Grid - 4 columns for more compact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KPICard
          title="ผู้ป่วยทั้งหมด"
          value={finalKPI.totalPatients.toLocaleString()}
          trend="up"
          trendValue="8.2%"
          comparison="เทียบกับเดือนที่แล้ว"
          icon={<Users className="w-4 h-4 text-white" />}
          iconBgColor="from-[#6366F1] to-[#8B5CF6]"
        />
        <KPICard
          title="อัตราครองเตียง"
          value={`${finalKPI.bedOccupancy}%`}
          trend="up"
          trendValue="3.5%"
          comparison="เทียบกับเดือนที่แล้ว"
          icon={<Bed className="w-4 h-4 text-white" />}
          iconBgColor="from-emerald-500 to-teal-500"
        />
        <KPICard
          title="รายได้"
          value={`${finalKPI.revenue.toLocaleString()}K`}
          trend="up"
          trendValue="12.3%"
          comparison="เทียบกับเดือนที่แล้ว"
          icon={<DollarSign className="w-4 h-4 text-white" />}
          iconBgColor="from-amber-500 to-orange-500"
        />
        <KPICard
          title="เวลารอเฉลี่ย"
          value={`${finalKPI.avgWaitTime} นาที`}
          trend="down"
          trendValue="5.1%"
          comparison="ดีขึ้นจากเดือนที่แล้ว"
          icon={<Clock className="w-4 h-4 text-white" />}
          iconBgColor="from-blue-500 to-cyan-500"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Patient Flow Chart */}
        <ChartCard title="แนวโน้มผู้ป่วย OPD & IPD" subtitle={`ข้อมูล${dateRange}${department !== 'ทุกแผนก' ? ` - ${department}` : ''}`}>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={currentOpdIpdData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="OPD" 
                stroke="#6366F1" 
                strokeWidth={3} 
                dot={{ fill: '#6366F1', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="IPD" 
                stroke="#8B5CF6" 
                strokeWidth={3} 
                dot={{ fill: '#8B5CF6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Revenue by Fund */}
        <ChartCard title="รายได้แยกตามแหล่งเบิกงบ" subtitle={`${fund !== 'ทุกกองทุน' ? fund : 'ทุกกองทุน'} - ${dateRange}`}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={filteredRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="fund" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => `${value.toLocaleString()} K`}
              />
              <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={1} />
                  <stop offset="100%" stopColor="#D97706" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Meeting Attendance Rate */}
        <ChartCard title="อัตราการเข้าร่วมประชุม" subtitle={`${department} - ${dateRange}`}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={currentMeetingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="dept" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
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
              <Bar dataKey="rate" fill="url(#colorMeeting)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorMeeting" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-400">อัตราการกลับมาตรวจซ้ำ</div>
                <div className="text-xl font-bold text-white">78%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500" style={{ width: '78%' }}></div>
              </div>
              <span className="text-xs text-emerald-400">+2.3%</span>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-400">ความพึงพอใจโดยรวม</div>
                <div className="text-xl font-bold text-white">4.6/5</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-purple-500" style={{ width: '92%' }}></div>
              </div>
              <span className="text-xs text-emerald-400">+0.2</span>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-400">อัตราการส่งต่อผู้ป่วย</div>
                <div className="text-xl font-bold text-white">12%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: '12%' }}></div>
              </div>
              <span className="text-xs text-red-400">-1.2%</span>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-400">บุคลากรเข้าเวรครบ</div>
                <div className="text-xl font-bold text-white">96%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: '96%' }}></div>
              </div>
              <span className="text-xs text-emerald-400">+1.5%</span>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-400">อัตราส่งสรุปทันเวลา</div>
                <div className="text-xl font-bold text-white">89%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: '89%' }}></div>
              </div>
              <span className="text-xs text-emerald-400">+4.1%</span>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <FileCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-400">เคลมผ่านครั้งแรก</div>
                <div className="text-xl font-bold text-white">94%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: '94%' }}></div>
              </div>
              <span className="text-xs text-emerald-400">+3.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}