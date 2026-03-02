import { KPICard } from '../components/shared/kpi-card';
import { ChartCard } from '../components/shared/chart-card';
import { DataTable } from '../components/shared/data-table';
import { useFilter } from '../context/filter-context';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { ExportButton } from '../components/shared/export-button';
import { DetailedChartModal } from '../components/shared/detailed-chart-modal';
import { useState } from 'react';

// KPI Data by period
const kpiByPeriod = {
  'วันนี้': {
    totalVisits: 340,
    avgWaitTime: 28,
    doctorOntime: 92,
    revisitRate: 76,
  },
  'สัปดาห์นี้': {
    totalVisits: 1890,
    avgWaitTime: 25,
    doctorOntime: 94,
    revisitRate: 78,
  },
  'เดือนนี้': {
    totalVisits: 8120,
    avgWaitTime: 30,
    doctorOntime: 90,
    revisitRate: 75,
  },
  'กำหนดเอง': {
    totalVisits: 24360,
    avgWaitTime: 29,
    doctorOntime: 91,
    revisitRate: 77,
  }
};

// KPI Data by department
const kpiByDepartment = {
  'ทุกแผนก': {
    totalVisits: 8120,
    avgWaitTime: 30,
    doctorOntime: 90,
    revisitRate: 75,
  },
  'ศัลยกรรม': {
    totalVisits: 1850,
    avgWaitTime: 35,
    doctorOntime: 88,
    revisitRate: 82,
  },
  'อายุรกรรม': {
    totalVisits: 2340,
    avgWaitTime: 28,
    doctorOntime: 92,
    revisitRate: 79,
  },
  'กุมารเวชกรรม': {
    totalVisits: 1420,
    avgWaitTime: 22,
    doctorOntime: 95,
    revisitRate: 68,
  },
  'รังสีวิทยา': {
    totalVisits: 980,
    avgWaitTime: 45,
    doctorOntime: 78,
    revisitRate: 85,
  },
  'ทันตกรรม': {
    totalVisits: 790,
    avgWaitTime: 32,
    doctorOntime: 86,
    revisitRate: 72,
  },
  'สูติ-นรีเวช': {
    totalVisits: 740,
    avgWaitTime: 26,
    doctorOntime: 91,
    revisitRate: 88,
  }
};

// KPI Data by fund
const kpiByFund = {
  'ทุกกองทุน': {
    totalVisits: 8120,
    avgWaitTime: 30,
    doctorOntime: 90,
    revisitRate: 75,
  },
  'สปสช.': {
    totalVisits: 3890,
    avgWaitTime: 32,
    doctorOntime: 89,
    revisitRate: 78,
  },
  'ประกันสังคม': {
    totalVisits: 2140,
    avgWaitTime: 28,
    doctorOntime: 92,
    revisitRate: 74,
  },
  'จ่ายเอง': {
    totalVisits: 1380,
    avgWaitTime: 25,
    doctorOntime: 94,
    revisitRate: 70,
  },
  'บริษัทประกัน': {
    totalVisits: 510,
    avgWaitTime: 22,
    doctorOntime: 96,
    revisitRate: 82,
  },
  'อื่นๆ': {
    totalVisits: 200,
    avgWaitTime: 35,
    doctorOntime: 85,
    revisitRate: 65,
  }
};

const patientVolumeByPeriod = {
  'วันนี้': [
    { date: '08:00', count: 45 },
    { date: '10:00', count: 78 },
    { date: '12:00', count: 124 },
    { date: '14:00', count: 186 },
    { date: '16:00', count: 245 },
    { date: '18:00', count: 312 },
    { date: '20:00', count: 340 },
  ],
  'สัปดาห์นี้': [
    { date: '26 ก.พ.', count: 245 },
    { date: '27 ก.พ.', count: 268 },
    { date: '28 ก.พ.', count: 290 },
    { date: '1 มี.ค.', count: 312 },
    { date: '2 มี.ค.', count: 340 },
  ],
  'เดือนนี้': [
    { date: '1 ก.พ.', count: 220 },
    { date: '7 ก.พ.', count: 245 },
    { date: '14 ก.พ.', count: 268 },
    { date: '21 ก.พ.', count: 290 },
    { date: '28 ก.พ.', count: 312 },
    { date: '2 มี.ค.', count: 340 },
  ],
  'กำหนดเอง': [
    { date: 'ธ.ค.', count: 198 },
    { date: 'ม.ค.', count: 225 },
    { date: 'ก.พ.', count: 285 },
    { date: 'มี.ค.', count: 340 },
  ]
};

const waitingTimeByDept = {
  'ทุกแผนก': [
    { dept: 'ศัลยกรรม', time: 35 },
    { dept: 'อายุรกรรม', time: 28 },
    { dept: 'กุมารเวชกรรม', time: 22 },
    { dept: 'รังสีวิทยา', time: 45 },
    { dept: 'ฉุกเฉิน', time: 18 },
    { dept: 'ทันตกรรม', time: 32 },
  ],
  'ศัลยกรรม': [
    { dept: 'ศัลยกรรมทั่วไป', time: 32 },
    { dept: 'ศัลยกรรมกระดูก', time: 38 },
    { dept: 'ศัลยกรรมประสาท', time: 35 },
  ],
  'อายุรกรรม': [
    { dept: 'อายุรกรรมทั่วไป', time: 28 },
    { dept: 'หัวใจ', time: 25 },
    { dept: 'ระบบทางเดินอาหาร', time: 30 },
  ],
  'กุมารเวชกรรม': [
    { dept: 'กุมารเวชกรรมทั่วไป', time: 22 },
    { dept: 'กุมารเวชกรรมพิเศษ', time: 26 },
  ],
  'รังสีวิทยา': [
    { dept: 'รังสีทั่วไป', time: 42 },
    { dept: 'รังสีพิเศษ', time: 48 },
  ],
  'ทันตกรรม': [
    { dept: 'ทันตกรรมทั่วไป', time: 30 },
    { dept: 'ทันตกรรมเฉพาะทาง', time: 35 },
  ],
  'สูติ-นรีเวช': [
    { dept: 'ฝากครรภ์', time: 25 },
    { dept: 'ตรวจเฉพาะทาง', time: 32 },
  ]
};

const doctorOntimeData = [
  { dept: 'ศัลยกรรม', rate: 88 },
  { dept: 'อายุรกรรม', rate: 92 },
  { dept: 'กุมารเวชกรรม', rate: 95 },
  { dept: 'รังสีวิทยา', rate: 78 },
  { dept: 'ฉุกเฉิน', rate: 85 },
];

// Top diagnoses by period
const topDiagnosesByPeriod = {
  'วันนี้': [
    { rank: 1, icd: 'J00', disease: 'หวัดธรรมดา (Common cold)', count: 28 },
    { rank: 2, icd: 'E11', disease: 'เบาหวานชนิดที่ 2', count: 22 },
    { rank: 3, icd: 'I10', disease: 'ความดันโลหิตสูง', count: 18 },
    { rank: 4, icd: 'J02', disease: 'เจ็บคอเฉียบพลัน', count: 15 },
    { rank: 5, icd: 'M54', disease: 'ปวดหลัง', count: 12 },
    { rank: 6, icd: 'K29', disease: 'กระเพาะอักเสบ', count: 10 },
    { rank: 7, icd: 'R50', disease: 'ไข้สาเหตุไม่ทราบ', count: 8 },
  ],
  'สัปดาห์นี้': [
    { rank: 1, icd: 'J00', disease: 'หวัดธรรมดา (Common cold)', count: 142 },
    { rank: 2, icd: 'E11', disease: 'เบาหวานชนิดที่ 2', count: 128 },
    { rank: 3, icd: 'I10', disease: 'ความดันโลหิตสูง', count: 115 },
    { rank: 4, icd: 'J02', disease: 'เจ็บคอเฉียบพลัน', count: 98 },
    { rank: 5, icd: 'M54', disease: 'ปวดหลัง', count: 85 },
    { rank: 6, icd: 'K29', disease: 'กระเพาะอักเสบ', count: 72 },
    { rank: 7, icd: 'R50', disease: 'ไข้สาเหตุไม่ทราบ', count: 58 },
  ],
  'เดือนนี้': [
    { rank: 1, icd: 'J00', disease: 'หวัดธรรมดา (Common cold)', count: 245 },
    { rank: 2, icd: 'E11', disease: 'เบาหวานชนิดที่ 2', count: 189 },
    { rank: 3, icd: 'I10', disease: 'ความดันโลหิตสูง', count: 167 },
    { rank: 4, icd: 'J02', disease: 'เจ็บคอเฉียบพลัน', count: 142 },
    { rank: 5, icd: 'M54', disease: 'ปวดหลัง', count: 128 },
    { rank: 6, icd: 'K29', disease: 'กระเพาะอักเสบ', count: 115 },
    { rank: 7, icd: 'R50', disease: 'ไข้สาเหตุไม่ทราบ', count: 98 },
  ],
  'กำหนดเอง': [
    { rank: 1, icd: 'J00', disease: 'หวัดธรรมดา (Common cold)', count: 735 },
    { rank: 2, icd: 'E11', disease: 'เบาหวานชนิดที่ 2', count: 567 },
    { rank: 3, icd: 'I10', disease: 'ความดันโลหิตสูง', count: 501 },
    { rank: 4, icd: 'J02', disease: 'เจ็บคอเฉียบพลัน', count: 426 },
    { rank: 5, icd: 'M54', disease: 'ปวดหลัง', count: 384 },
    { rank: 6, icd: 'K29', disease: 'กระเพาะอักเสบ', count: 345 },
    { rank: 7, icd: 'R50', disease: 'ไข้สาเหตุไม่ทราบ', count: 294 },
  ]
};

// Top diagnoses by department
const topDiagnosesByDept = {
  'ทุกแผนก': [
    { rank: 1, icd: 'J00', disease: 'หวัดธรรมดา (Common cold)', count: 245 },
    { rank: 2, icd: 'E11', disease: 'เบาหวานชนิดที่ 2', count: 189 },
    { rank: 3, icd: 'I10', disease: 'ความดันโลหิตสูง', count: 167 },
    { rank: 4, icd: 'J02', disease: 'เจ็บคอเฉียบพลัน', count: 142 },
    { rank: 5, icd: 'M54', disease: 'ปวดหลัง', count: 128 },
    { rank: 6, icd: 'K29', disease: 'กระเพาะอักเสบ', count: 115 },
    { rank: 7, icd: 'R50', disease: 'ไข้สาเหตุไม่ทราบ', count: 98 },
  ],
  'ศัลยกรรม': [
    { rank: 1, icd: 'M54', disease: 'ปวดหลัง', count: 85 },
    { rank: 2, icd: 'S52', disease: 'กระดูกแขนหัก', count: 68 },
    { rank: 3, icd: 'K40', disease: 'ไส้เลื่อน', count: 52 },
    { rank: 4, icd: 'K80', disease: 'นิ่วในถุงน้ำดี', count: 45 },
    { rank: 5, icd: 'L02', disease: 'ฝีหนอง', count: 38 },
    { rank: 6, icd: 'T14', disease: 'บาดเจ็บ', count: 32 },
    { rank: 7, icd: 'M79', disease: 'เนื้อเยื่ออ่อนอักเสบ', count: 28 },
  ],
  'อายุรกรรม': [
    { rank: 1, icd: 'E11', disease: 'เบาหวานชนิดที่ 2', count: 112 },
    { rank: 2, icd: 'I10', disease: 'ความดันโลหิตสูง', count: 98 },
    { rank: 3, icd: 'J00', disease: 'หวัดธรรมดา', count: 75 },
    { rank: 4, icd: 'K29', disease: 'กระเพาะอักเสบ', count: 65 },
    { rank: 5, icd: 'N18', disease: 'ไตวายเรื้อรัง', count: 52 },
    { rank: 6, icd: 'I50', disease: 'หัวใจล้มเหลว', count: 45 },
    { rank: 7, icd: 'J44', disease: 'ปอดอุดกั้นเรื้อรัง', count: 38 },
  ],
  'กุมารเวชกรรม': [
    { rank: 1, icd: 'J00', disease: 'หวัดธรรมดา', count: 142 },
    { rank: 2, icd: 'J02', disease: 'เจ็บคอเฉียบพลัน', count: 98 },
    { rank: 3, icd: 'R50', disease: 'ไข้สาเหตุไม่ทราบ', count: 78 },
    { rank: 4, icd: 'A09', disease: 'ท้องเสีย', count: 65 },
    { rank: 5, icd: 'J06', disease: 'ติดเชื้อทางเดินหายใจส่วนบน', count: 52 },
    { rank: 6, icd: 'L20', disease: 'ผื่นภูมิแพ้', count: 42 },
    { rank: 7, icd: 'B86', disease: 'หิด', count: 35 },
  ],
  'รังสีวิทยา': [
    { rank: 1, icd: 'Z01', disease: 'ตรวจเอกซเรย์ทั่วไป', count: 185 },
    { rank: 2, icd: 'Z12', disease: 'ตรวจคัดกรองมะเร็ง', count: 92 },
    { rank: 3, icd: 'M54', disease: 'ปวดหลัง', count: 78 },
    { rank: 4, icd: 'S52', disease: 'กระดูกหัก', count: 65 },
    { rank: 5, icd: 'J18', disease: 'ปอดอักเสบ', count: 52 },
    { rank: 6, icd: 'K80', disease: 'นิ่วในถุงน้ำดี', count: 45 },
    { rank: 7, icd: 'N20', disease: 'นิ่วในไต', count: 38 },
  ],
  'ทันตกรรม': [
    { rank: 1, icd: 'K02', disease: 'ฟันผุ', count: 168 },
    { rank: 2, icd: 'K04', disease: 'รากฟันอักเสบ', count: 95 },
    { rank: 3, icd: 'K05', disease: 'เหงือกอักเสบ', count: 78 },
    { rank: 4, icd: 'K08', disease: 'ถอนฟัน', count: 62 },
    { rank: 5, icd: 'K01', disease: 'ฟันคุด', count: 45 },
    { rank: 6, icd: 'K03', disease: 'ฟันสึก', count: 38 },
    { rank: 7, icd: 'K12', disease: 'แผลในปาก', count: 28 },
  ],
  'สูติ-นรีเวช': [
    { rank: 1, icd: 'Z34', disease: 'ฝากครรภ์ปกติ', count: 125 },
    { rank: 2, icd: 'N94', disease: 'ปวดประจำเดือน', count: 82 },
    { rank: 3, icd: 'N76', disease: 'ช่องคลอดอักเสบ', count: 65 },
    { rank: 4, icd: 'N80', disease: 'มดลูกเยื่อบุโตผิดที่', count: 52 },
    { rank: 5, icd: 'N83', disease: 'ซีสต์รังไข่', count: 45 },
    { rank: 6, icd: 'O21', disease: 'คลื่นไส้อาเจียนในครรภ์', count: 38 },
    { rank: 7, icd: 'N92', disease: 'ประจำเดือนมามาก', count: 32 },
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
      <span className="font-semibold text-indigo-400">{value.toLocaleString()}</span>
    )
  },
];

export function OPDPage() {
  const { dateRange, department, fund } = useFilter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState<{
    type: string;
    title: string;
    subtitle: string;
    data: any[];
    filename: string;
  } | null>(null);

  // Get KPI data based on filters
  const periodKPI = kpiByPeriod[dateRange as keyof typeof kpiByPeriod] || kpiByPeriod['เดือนนี้'];
  const deptKPI = kpiByDepartment[department as keyof typeof kpiByDepartment] || kpiByDepartment['ทุกแผนก'];
  const fundKPI = kpiByFund[fund as keyof typeof kpiByFund] || kpiByFund['ทุกกองทุน'];

  // Combine KPIs (prioritize period, then apply dept and fund filters)
  const finalKPI = {
    totalVisits: department !== 'ทุกแผนก' ? deptKPI.totalVisits : 
                 fund !== 'ทุกกองทุน' ? fundKPI.totalVisits : 
                 periodKPI.totalVisits,
    avgWaitTime: department !== 'ทุกแผนก' ? deptKPI.avgWaitTime : 
                 fund !== 'ทุกกองทุน' ? fundKPI.avgWaitTime : 
                 periodKPI.avgWaitTime,
    doctorOntime: department !== 'ทุกแผนก' ? deptKPI.doctorOntime : 
                  fund !== 'ทุกกองทุน' ? fundKPI.doctorOntime : 
                  periodKPI.doctorOntime,
    revisitRate: department !== 'ทุกแผนก' ? deptKPI.revisitRate : 
                 fund !== 'ทุกกองทุน' ? fundKPI.revisitRate : 
                 periodKPI.revisitRate,
  };

  const currentPatientData = patientVolumeByPeriod[dateRange as keyof typeof patientVolumeByPeriod] || patientVolumeByPeriod['เดือนนี้'];
  const currentWaitingData = waitingTimeByDept[department as keyof typeof waitingTimeByDept] || waitingTimeByDept['ทุกแผนก'];
  
  // Get diagnosis data by period first, then filter by department
  const periodDiagnoses = topDiagnosesByPeriod[dateRange as keyof typeof topDiagnosesByPeriod] || topDiagnosesByPeriod['เดือนนี้'];
  const currentDiagnosesData = department !== 'ทุกแผนก' 
    ? topDiagnosesByDept[department as keyof typeof topDiagnosesByDept]
    : periodDiagnoses;

  // Prepare export data
  const exportData = [
    ...currentPatientData.map(item => ({
      'ช่วงเวลา': item.date,
      'จำนวนผู้ป่วย': item.count
    })),
    ...currentWaitingData.map(item => ({
      'แผนก': item.dept,
      'เวลารอ (นาที)': item.time
    })),
    ...doctorOntimeData.map(item => ({
      'แผนก': item.dept,
      'อัตราเข้าตรงเวลา (%)': item.rate
    })),
    ...currentDiagnosesData.map(item => ({
      'อันดับ': item.rank,
      'รหัส ICD': item.icd,
      'ชื่อโรค': item.disease,
      'จำนวนผู้ป่วย': item.count
    }))
  ];

  const handleChartClick = (type: string, title: string, data: any[], filename: string) => {
    setSelectedChart({
      type,
      title,
      subtitle: `${dateRange}${department !== 'ทุกแผนก' ? ` - ${department}` : ''}${fund !== 'ทุกกองทุน' ? ` - ${fund}` : ''}`,
      data,
      filename
    });
    setModalOpen(true);
  };

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5" id="opd-page-content">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-white mb-1">ข้อมูลผู้ป่วยนอก (OPD)</h2>
          <p className="text-xs text-gray-400 truncate">รายงานและสถิติผู้ป่วยนอกทั้งหมด - {dateRange}{department !== 'ทุกแผนก' ? ` - ${department}` : ''}{fund !== 'ทุกกองทุน' ? ` - ${fund}` : ''}</p>
        </div>
        <ExportButton 
          elementId="opd-page-content"
          data={exportData}
          filename={`opd-${dateRange}-${department}-${fund}`}
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KPICard
          title="ผู้ป่วยนอกทั้งหมด"
          value={finalKPI.totalVisits.toLocaleString()}
          trend="up"
          trendValue="6.8%"
          comparison="เทียบกับช่วงก่อนหน้า"
          icon={<Users className="w-4 h-4 text-white" />}
          iconBgColor="from-[#6366F1] to-[#8B5CF6]"
        />
        <KPICard
          title="เวลารอเฉลี่ย"
          value={`${finalKPI.avgWaitTime} นาที`}
          trend="down"
          trendValue="8.2%"
          comparison="ดีขึ้นจากช่วงก่อนหน้า"
          icon={<Clock className="w-4 h-4 text-white" />}
          iconBgColor="from-emerald-500 to-teal-500"
        />
        <KPICard
          title="แพทย์เข้าตรงเวลา"
          value={`${finalKPI.doctorOntime}%`}
          trend="up"
          trendValue="3.1%"
          comparison="เทียบกับช่วงก่อนหน้า"
          icon={<CheckCircle className="w-4 h-4 text-white" />}
          iconBgColor="from-cyan-500 to-blue-500"
        />
        <KPICard
          title="อัตราการกลับมาตรวจ"
          value={`${finalKPI.revisitRate}%`}
          trend="up"
          trendValue="2.3%"
          comparison="เทียบกับช่วงก่อนหน้า"
          icon={<TrendingUp className="w-4 h-4 text-white" />}
          iconBgColor="from-amber-500 to-orange-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard 
          title="ปริมาณผู้ป่วยนอก" 
          subtitle={`${dateRange} - คลิกเพื่อดูรายละเอียด`}
          clickable={true}
          onClick={() => handleChartClick('line', 'ปริมาณผู้ป่วยนอก', currentPatientData, 'opd-patient-volume')}
        >
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={currentPatientData}>
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
                stroke="#6366F1" 
                strokeWidth={3} 
                dot={{ fill: '#6366F1', r: 5, strokeWidth: 2, stroke: '#1e293b' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="เวลารอเฉลี่ยแยกตามแผนก" 
          subtitle={`${department} (นาที) - คลิกเพื่อดูรายละเอียด`}
          clickable={true}
          onClick={() => handleChartClick('bar', 'เวลารอเฉลี่ยแยกตามแผนก', currentWaitingData, 'opd-waiting-time')}
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={currentWaitingData}>
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
                formatter={(value: number) => `${value} นาที`}
              />
              <Bar dataKey="time" fill="url(#colorWaitTime)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorWaitTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={1} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCard 
          title="อัตราแพทย์เข้าตรงเวลา" 
          subtitle="แยกตามแผนก (%) - คลิกเพื่อดูรายละเอียด"
          clickable={true}
          onClick={() => handleChartClick('bar', 'อัตราแพทย์เข้าตรงเวลา', doctorOntimeData, 'opd-doctor-ontime')}
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={doctorOntimeData}>
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
              <Bar dataKey="rate" fill="url(#colorOntime)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="colorOntime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity={1} />
                  <stop offset="100%" stopColor="#0891B2" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top Diagnoses Table */}
        <ChartCard title="Top 7 โรคที่พบบ่อยใน OPD" subtitle={`${dateRange}${department !== 'ทุกแผนก' ? ` - ${department}` : ''}`}>
          <DataTable columns={diagnosesColumns} data={currentDiagnosesData} />
        </ChartCard>
      </div>

      {/* Chart Detail Modal */}
      {selectedChart && (
        <DetailedChartModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          chartType={selectedChart.type}
          title={selectedChart.title}
          subtitle={selectedChart.subtitle}
          data={selectedChart.data}
          exportFilename={selectedChart.filename}
        />
      )}
    </div>
  );
}