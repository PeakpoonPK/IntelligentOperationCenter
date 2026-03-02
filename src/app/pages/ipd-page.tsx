import { KPICard } from '../components/shared/kpi-card';
import { ChartCard } from '../components/shared/chart-card';
import { DataTable } from '../components/shared/data-table';
import { useFilter } from '../context/filter-context';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BedDouble, TrendingUp, Clock, FileCheck } from 'lucide-react';
import { ExportButton } from '../components/shared/export-button';
import { DetailedChartModal } from '../components/shared/detailed-chart-modal';
import { useState } from 'react';

// KPI Data by period
const kpiByPeriod = {
  'วันนี้': {
    admitToday: 96,
    bedOccupancy: 87,
    avgALOS: 4.7,
    summaryOntime: 89,
  },
  'สัปดาห์นี้': {
    admitToday: 542,
    bedOccupancy: 89,
    avgALOS: 4.5,
    summaryOntime: 91,
  },
  'เดือนนี้': {
    admitToday: 2340,
    bedOccupancy: 85,
    avgALOS: 4.8,
    summaryOntime: 88,
  },
  'กำหนดเอง': {
    admitToday: 7020,
    bedOccupancy: 86,
    avgALOS: 4.6,
    summaryOntime: 89,
  }
};

// KPI Data by department
const kpiByDepartment = {
  'ทุกแผนก': {
    admitToday: 2340,
    bedOccupancy: 85,
    avgALOS: 4.8,
    summaryOntime: 88,
  },
  'ศัลยกรรม': {
    admitToday: 520,
    bedOccupancy: 92,
    avgALOS: 5.2,
    summaryOntime: 89,
  },
  'อายุรกรรม': {
    admitToday: 680,
    bedOccupancy: 88,
    avgALOS: 6.1,
    summaryOntime: 92,
  },
  'กุมารเวชกรรม': {
    admitToday: 380,
    bedOccupancy: 75,
    avgALOS: 3.8,
    summaryOntime: 95,
  },
  'รังสีวิทยา': {
    admitToday: 180,
    bedOccupancy: 65,
    avgALOS: 3.2,
    summaryOntime: 78,
  },
  'ทันตกรรม': {
    admitToday: 120,
    bedOccupancy: 55,
    avgALOS: 2.5,
    summaryOntime: 86,
  },
  'สูติ-นรีเวช': {
    admitToday: 460,
    bedOccupancy: 82,
    avgALOS: 3.1,
    summaryOntime: 91,
  }
};

// KPI Data by fund
const kpiByFund = {
  'ทุกกองทุน': {
    admitToday: 2340,
    bedOccupancy: 85,
    avgALOS: 4.8,
    summaryOntime: 88,
  },
  'สปสช.': {
    admitToday: 1120,
    bedOccupancy: 88,
    avgALOS: 5.2,
    summaryOntime: 86,
  },
  'ประกันสังคม': {
    admitToday: 640,
    bedOccupancy: 85,
    avgALOS: 4.8,
    summaryOntime: 90,
  },
  'จ่ายเอง': {
    admitToday: 380,
    bedOccupancy: 78,
    avgALOS: 4.2,
    summaryOntime: 92,
  },
  'บริษัทประกัน': {
    admitToday: 150,
    bedOccupancy: 82,
    avgALOS: 4.5,
    summaryOntime: 94,
  },
  'อื่นๆ': {
    admitToday: 50,
    bedOccupancy: 70,
    avgALOS: 3.8,
    summaryOntime: 85,
  }
};

const admissionByPeriod = {
  'วันนี้': [
    { date: '08:00', count: 8 },
    { date: '10:00', count: 15 },
    { date: '12:00', count: 28 },
    { date: '14:00', count: 45 },
    { date: '16:00', count: 68 },
    { date: '18:00', count: 82 },
    { date: '20:00', count: 96 },
  ],
  'สัปดาห์นี้': [
    { date: '26 ก.พ.', count: 82 },
    { date: '27 ก.พ.', count: 91 },
    { date: '28 ก.พ.', count: 78 },
    { date: '1 มี.ค.', count: 95 },
    { date: '2 มี.ค.', count: 96 },
  ],
  'เดือนนี้': [
    { date: '1 ก.พ.', count: 75 },
    { date: '7 ก.พ.', count: 82 },
    { date: '14 ก.พ.', count: 88 },
    { date: '21 ก.พ.', count: 91 },
    { date: '28 ก.พ.', count: 95 },
    { date: '2 มี.ค.', count: 96 },
  ],
  'กำหนดเอง': [
    { date: 'ธ.ค.', count: 68 },
    { date: 'ม.ค.', count: 75 },
    { date: 'ก.พ.', count: 88 },
    { date: 'มี.ค.', count: 96 },
  ]
};

const bedOccupancyByWard = {
  'ทุกแผนก': [
    { ward: 'ศัลยกรรม', rate: 92, beds: 40, occupied: 37 },
    { ward: 'อายุรกรรม', rate: 88, beds: 50, occupied: 44 },
    { ward: 'กุมารเวชกรรม', rate: 75, beds: 30, occupied: 23 },
    { ward: 'ICU', rate: 95, beds: 20, occupied: 19 },
    { ward: 'สูติ-นรีเวช', rate: 82, beds: 35, occupied: 29 },
  ],
  'ศัลยกรรม': [
    { ward: 'ศัลยกรรมทั่วไป', rate: 90, beds: 25, occupied: 23 },
    { ward: 'ศัลยกรรมกระดูก', rate: 94, beds: 15, occupied: 14 },
  ],
  'อายุรกรรม': [
    { ward: 'อายุรกรรมทั่วไป', rate: 88, beds: 35, occupied: 31 },
    { ward: 'หัวใจ', rate: 92, beds: 15, occupied: 14 },
  ],
  'กุมารเวชกรรม': [
    { ward: 'กุมารเวชกรรมทั่วไป', rate: 75, beds: 30, occupied: 23 },
  ],
  'รังสีวิทยา': [
    { ward: 'รังสีทั่วไป', rate: 65, beds: 10, occupied: 7 },
  ],
  'ทันตกรรม': [
    { ward: 'ทันตกรรมทั่วไป', rate: 55, beds: 8, occupied: 4 },
  ],
  'สูติ-นรีเวช': [
    { ward: 'สูติกรรม', rate: 85, beds: 20, occupied: 17 },
    { ward: 'นรีเวช', rate: 78, beds: 15, occupied: 12 },
  ]
};

const alosData = [
  { ward: 'ศัลยกรรม', days: 4.2 },
  { ward: 'อายุรกรรม', days: 5.8 },
  { ward: 'กุมารเวชกรรม', days: 3.5 },
  { ward: 'ICU', days: 7.3 },
  { ward: 'สูติ-นรีเวช', days: 2.8 },
];

const dischargeSummaryData = [
  { ward: 'ศัลยกรรม', onTime: 89, late: 11 },
  { ward: 'อายุรกรรม', onTime: 92, late: 8 },
  { ward: 'กุมารเวชกรรม', onTime: 95, late: 5 },
  { ward: 'ICU', onTime: 78, late: 22 },
  { ward: 'สูติ-นรีเวช', onTime: 88, late: 12 },
];

// Top diagnoses by period
const topDiagnosesByPeriod = {
  'วันนี้': [
    { rank: 1, icd: 'J18', disease: 'ปอดอักเสบ', count: 8, alos: 6.2 },
    { rank: 2, icd: 'I21', disease: 'กล้ามเนื้อหัวใจตายเฉียบพลัน', count: 6, alos: 8.5 },
    { rank: 3, icd: 'K80', disease: 'นิ่วในถุงน้ำดี', count: 5, alos: 3.8 },
    { rank: 4, icd: 'O80', disease: 'คลอดปกติ', count: 4, alos: 2.5 },
    { rank: 5, icd: 'N39', disease: 'ติดเชื้อทางเดินปัสสาวะ', count: 3, alos: 4.1 },
  ],
  'สัปดาห์นี้': [
    { rank: 1, icd: 'J18', disease: 'ปอดอักเสบ', count: 32, alos: 6.2 },
    { rank: 2, icd: 'I21', disease: 'กล้ามเนื้อหัวใจตายเฉียบพลัน', count: 28, alos: 8.5 },
    { rank: 3, icd: 'K80', disease: 'นิ่วในถุงน้ำดี', count: 24, alos: 3.8 },
    { rank: 4, icd: 'O80', disease: 'คลอดปกติ', count: 21, alos: 2.5 },
    { rank: 5, icd: 'N39', disease: 'ติดเชื้อทางเดินปัสสาวะ', count: 18, alos: 4.1 },
  ],
  'เดือนนี้': [
    { rank: 1, icd: 'J18', disease: 'ปอดอักเสบ', count: 45, alos: 6.2 },
    { rank: 2, icd: 'I21', disease: 'กล้ามเนื้อหัวใจตายเฉียบพลัน', count: 38, alos: 8.5 },
    { rank: 3, icd: 'K80', disease: 'นิ่วในถุงน้ำดี', count: 32, alos: 3.8 },
    { rank: 4, icd: 'O80', disease: 'คลอดปกติ', count: 28, alos: 2.5 },
    { rank: 5, icd: 'N39', disease: 'ติดเชื้อทางเดินปัสสาวะ', count: 24, alos: 4.1 },
  ],
  'กำหนดเอง': [
    { rank: 1, icd: 'J18', disease: 'ปอดอักเสบ', count: 135, alos: 6.2 },
    { rank: 2, icd: 'I21', disease: 'กล้ามเนื้อหัวใจตายเฉียบพลัน', count: 114, alos: 8.5 },
    { rank: 3, icd: 'K80', disease: 'นิ่วในถุงน้ำดี', count: 96, alos: 3.8 },
    { rank: 4, icd: 'O80', disease: 'คลอดปกติ', count: 84, alos: 2.5 },
    { rank: 5, icd: 'N39', disease: 'ติดเชื้อทางเดินปัสสาวะ', count: 72, alos: 4.1 },
  ]
};

// Top diagnoses by department
const topDiagnosesByDept = {
  'ทุกแผนก': [
    { rank: 1, icd: 'J18', disease: 'ปอดอักเสบ', count: 45, alos: 6.2 },
    { rank: 2, icd: 'I21', disease: 'กล้ามเนื้อหัวใจตายเฉียบพลัน', count: 38, alos: 8.5 },
    { rank: 3, icd: 'K80', disease: 'นิ่วในถุงน้ำดี', count: 32, alos: 3.8 },
    { rank: 4, icd: 'O80', disease: 'คลอดปกติ', count: 28, alos: 2.5 },
    { rank: 5, icd: 'N39', disease: 'ติดเชื้อทางเดินปัสสาวะ', count: 24, alos: 4.1 },
  ],
  'ศัลยกรรม': [
    { rank: 1, icd: 'K80', disease: 'นิ่วในถุงน้ำดี', count: 28, alos: 3.8 },
    { rank: 2, icd: 'K40', disease: 'ไส้เลื่อน', count: 24, alos: 4.2 },
    { rank: 3, icd: 'S72', disease: 'กระดูกขาหัก', count: 21, alos: 8.5 },
    { rank: 4, icd: 'K35', disease: 'ไส้ติ่งอักเสบ', count: 18, alos: 5.1 },
    { rank: 5, icd: 'C18', disease: 'มะเร็งลำไส้ใหญ่', count: 15, alos: 12.3 },
  ],
  'อายุรกรรม': [
    { rank: 1, icd: 'J18', disease: 'ปอดอักเสบ', count: 38, alos: 6.2 },
    { rank: 2, icd: 'I21', disease: 'กล้ามเนื้อหัวใจตายเฉียบพลัน', count: 32, alos: 8.5 },
    { rank: 3, icd: 'N18', disease: 'ไตวายเรื้อรัง', count: 28, alos: 9.8 },
    { rank: 4, icd: 'I50', disease: 'หัวใจล้มเหลว', count: 24, alos: 7.2 },
    { rank: 5, icd: 'E11', disease: 'เบาหวานแทรกซ้อน', count: 21, alos: 8.1 },
  ],
  'กุมารเวชกรรม': [
    { rank: 1, icd: 'J18', disease: 'ปอดอักเสบ', count: 32, alos: 5.2 },
    { rank: 2, icd: 'A09', disease: 'ท้องร่วงรุนแรง', count: 28, alos: 3.8 },
    { rank: 3, icd: 'J45', disease: 'หอบหืด', count: 24, alos: 4.1 },
    { rank: 4, icd: 'A00', disease: 'อหิวาตกโรค', count: 18, alos: 4.5 },
    { rank: 5, icd: 'P07', disease: 'เด็กคลอดก่อนกำหนด', count: 15, alos: 12.3 },
  ],
  'รังสีวิทยา': [
    { rank: 1, icd: 'C50', disease: 'มะเร็งเต้านม', count: 12, alos: 3.2 },
    { rank: 2, icd: 'C34', disease: 'มะเร็งปอด', count: 10, alos: 3.5 },
    { rank: 3, icd: 'C71', disease: 'มะเร็งสมอง', count: 8, alos: 4.1 },
    { rank: 4, icd: 'C22', disease: 'มะเร็งตับ', count: 6, alos: 2.8 },
    { rank: 5, icd: 'C18', disease: 'มะเร็งลำไส้ใหญ่', count: 5, alos: 3.2 },
  ],
  'ทันตกรรม': [
    { rank: 1, icd: 'K04', disease: 'รากฟันอักเสบรุนแรง', count: 18, alos: 2.1 },
    { rank: 2, icd: 'K10', disease: 'โรคขากรรไกร', count: 15, alos: 3.2 },
    { rank: 3, icd: 'K01', disease: 'ผ่าฟันคุด', count: 12, alos: 1.8 },
    { rank: 4, icd: 'S02', disease: 'กระดูกใบหน้าหัก', count: 8, alos: 4.5 },
    { rank: 5, icd: 'K12', disease: 'แผลในปากรุนแรง', count: 6, alos: 2.5 },
  ],
  'สูติ-นรีเวช': [
    { rank: 1, icd: 'O80', disease: 'คลอดปกติ', count: 85, alos: 2.5 },
    { rank: 2, icd: 'O82', disease: 'คลอดผ่าท้อง', count: 62, alos: 3.8 },
    { rank: 3, icd: 'O03', disease: 'แท้งบุตร', count: 28, alos: 2.1 },
    { rank: 4, icd: 'N83', disease: 'ซีสต์รังไข่', count: 18, alos: 3.2 },
    { rank: 5, icd: 'N80', disease: 'มดลูกเยื่อบุโตผิดที่', count: 15, alos: 4.5 },
  ]
};

const diagnosesColumns = [
  { key: 'rank', label: '#', align: 'center' as const },
  { key: 'icd', label: 'รหัส ICD-10', align: 'left' as const },
  { key: 'disease', label: 'ชื่อโรค', align: 'left' as const },
  { 
    key: 'count', 
    label: 'จำนวนผู้ป่วย', 
    align: 'right' as const,
    render: (value: number) => (
      <span className="font-semibold text-purple-400">{value.toLocaleString()}</span>
    )
  },
  { 
    key: 'alos', 
    label: 'ALOS (วัน)', 
    align: 'right' as const,
    render: (value: number) => (
      <span className="text-cyan-400">{value.toFixed(1)}</span>
    )
  },
];

export function IPDPage() {
  const { dateRange, department, fund } = useFilter();

  // Get KPI data based on filters
  const periodKPI = kpiByPeriod[dateRange as keyof typeof kpiByPeriod] || kpiByPeriod['เดือนนี้'];
  const deptKPI = kpiByDepartment[department as keyof typeof kpiByDepartment] || kpiByDepartment['ทุกแผนก'];
  const fundKPI = kpiByFund[fund as keyof typeof kpiByFund] || kpiByFund['ทุกกองทุน'];

  // Combine KPIs (prioritize period, then apply dept and fund filters)
  const finalKPI = {
    admitToday: department !== 'ทุกแผนก' ? deptKPI.admitToday : 
                fund !== 'ทุกกองทุน' ? fundKPI.admitToday : 
                periodKPI.admitToday,
    bedOccupancy: department !== 'ทุกแผนก' ? deptKPI.bedOccupancy : 
                  fund !== 'ทุกกองทุน' ? fundKPI.bedOccupancy : 
                  periodKPI.bedOccupancy,
    avgALOS: department !== 'ทุกแผนก' ? deptKPI.avgALOS : 
             fund !== 'ทุกกองทุน' ? fundKPI.avgALOS : 
             periodKPI.avgALOS,
    summaryOntime: department !== 'ทุกแผนก' ? deptKPI.summaryOntime : 
                   fund !== 'ทุกกองทุน' ? fundKPI.summaryOntime : 
                   periodKPI.summaryOntime,
  };

  const currentAdmissionData = admissionByPeriod[dateRange as keyof typeof admissionByPeriod] || admissionByPeriod['เดือนนี้'];
  const currentBedData = bedOccupancyByWard[department as keyof typeof bedOccupancyByWard] || bedOccupancyByWard['ทุกแผนก'];
  
  // Get diagnosis data by period first, then filter by department
  const periodDiagnoses = topDiagnosesByPeriod[dateRange as keyof typeof topDiagnosesByPeriod] || topDiagnosesByPeriod['เดือนนี้'];
  const currentDiagnosesData = department !== 'ทุกแผนก' 
    ? topDiagnosesByDept[department as keyof typeof topDiagnosesByDept]
    : periodDiagnoses;

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState('');

  const handleChartClick = (chart: string) => {
    setSelectedChart(chart);
    setModalOpen(true);
  };

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      {/* Page Header */}
      <div className="flex-1 min-w-0">
        <h2 className="text-base sm:text-lg font-bold text-white mb-1">ข้อมูลผู้ป่วยใน (IPD)</h2>
        <p className="text-xs text-gray-400 truncate">รายงานและสถิติผู้ป่วยในทั้งหมด - {dateRange}{department !== 'ทุกแผนก' ? ` - ${department}` : ''}{fund !== 'ทุกกองทุน' ? ` - ${fund}` : ''}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KPICard
          title="Admit ทั้งหมด"
          value={finalKPI.admitToday.toLocaleString()}
          trend="up"
          trendValue="5.1%"
          comparison="เทียบกับช่วงก่อนหน้า"
          icon={<BedDouble className="w-4 h-4 text-white" />}
          iconBgColor="from-purple-500 to-pink-500"
        />
        <KPICard
          title="อัตราครองเตียงรวม"
          value={`${finalKPI.bedOccupancy}%`}
          trend="neutral"
          trendValue="0.8%"
          comparison="เทียบกับช่วงก่อนหน้า"
          icon={<TrendingUp className="w-4 h-4 text-white" />}
          iconBgColor="from-emerald-500 to-teal-500"
        />
        <KPICard
          title="ALOS เฉลี่ย"
          value={`${finalKPI.avgALOS.toFixed(1)} วัน`}
          trend="down"
          trendValue="5.3%"
          comparison="ดีขึ้นจากช่วงก่อนหน้า"
          icon={<Clock className="w-4 h-4 text-white" />}
          iconBgColor="from-blue-500 to-cyan-500"
        />
        <KPICard
          title="ส่งสรุปทันเวลา"
          value={`${finalKPI.summaryOntime}%`}
          trend="up"
          trendValue="4.1%"
          comparison="เทียบกับช่วงก่อนหน้า"
          icon={<FileCheck className="w-4 h-4 text-white" />}
          iconBgColor="from-amber-500 to-orange-500"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title="แนวโน้มผู้ป่วย Admit" subtitle={dateRange}>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={currentAdmissionData}>
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
                dataKey="count" 
                stroke="#8B5CF6" 
                strokeWidth={3} 
                dot={{ fill: '#8B5CF6', r: 5, strokeWidth: 2, stroke: '#1e293b' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <ExportButton onClick={() => handleChartClick('admission')} />
        </ChartCard>

        <ChartCard title="อัตราครองเตียงแยกตามวอร์ด" subtitle={`${department} - ข้อมูลปัจจุบัน`}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={currentBedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="ward" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
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
              <Bar dataKey="rate" fill="url(#colorBedOcc)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorBedOcc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={1} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
          <ExportButton onClick={() => handleChartClick('bedOccupancy')} />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard title="ALOS เฉลี่ยแยกตามวอร์ด" subtitle="เดือนนี้ (วัน)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={alosData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="ward" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
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
              <Bar dataKey="days" fill="url(#colorALOS)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorALOS" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity={1} />
                  <stop offset="100%" stopColor="#0891B2" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
          <ExportButton onClick={() => handleChartClick('alos')} />
        </ChartCard>

        <ChartCard title="การส่งสรุปเวชระเบียนแยกตามวอร์ด" subtitle="อัตราส่งทันเวลา (%)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dischargeSummaryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="ward" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="onTime" fill="url(#colorSummary)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorSummary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
          <ExportButton onClick={() => handleChartClick('dischargeSummary')} />
        </ChartCard>
      </div>

      {/* Top Diagnoses Table */}
      <ChartCard title="Top 5 โรคที่ Admit บ่อยใน IPD" subtitle={`${dateRange}${department !== 'ทุกแผนก' ? ` - ${department}` : ''}`}>
        <DataTable columns={diagnosesColumns} data={currentDiagnosesData} />
      </ChartCard>

      {/* Detailed Chart Modal */}
      <DetailedChartModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        chart={selectedChart}
        data={
          selectedChart === 'admission' ? currentAdmissionData :
          selectedChart === 'bedOccupancy' ? currentBedData :
          selectedChart === 'alos' ? alosData :
          selectedChart === 'dischargeSummary' ? dischargeSummaryData :
          []
        }
        title={
          selectedChart === 'admission' ? 'แนวโน้มผู้ป่วย Admit' :
          selectedChart === 'bedOccupancy' ? 'อัตราครองเตียงแยกตามวอร์ด' :
          selectedChart === 'alos' ? 'ALOS เฉลี่ยแยกตามวอร์ด' :
          selectedChart === 'dischargeSummary' ? 'การส่งสรุปเวชระเบียนแยกตามวอร์ด' :
          ''
        }
        subtitle={
          selectedChart === 'admission' ? dateRange :
          selectedChart === 'bedOccupancy' ? `${department} - ข้อมูลปัจจุบัน` :
          selectedChart === 'alos' ? 'เดือนนี้ (วัน)' :
          selectedChart === 'dischargeSummary' ? 'อัตราส่งทันเวลา (%)' :
          ''
        }
      />
    </div>
  );
}