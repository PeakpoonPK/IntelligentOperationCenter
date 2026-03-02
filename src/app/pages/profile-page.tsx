import { User, Mail, Briefcase, Calendar, Shield, Activity, Phone, Building } from 'lucide-react';
import { useAuth } from '../context/auth-context';

export function ProfilePage() {
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      {/* Header */}
      <div className="flex-1 min-w-0">
        <h2 className="text-base sm:text-lg font-bold text-white mb-1">โปรไฟล์ของฉัน</h2>
        <p className="text-xs text-gray-400 truncate">ข้อมูลส่วนตัวและการตั้งค่าบัญชี</p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 sm:p-6 border border-slate-700/50">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
              ดร.
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 bg-emerald-500 rounded-full border-2 sm:border-4 border-slate-900"></div>
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">นพ.สมชาย ใจดี</h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">ผู้อำนวยการโรงพยาบาล</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
              <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                <div className="text-left overflow-hidden">
                  <div className="text-xs text-gray-500">อีเมล</div>
                  <div className="text-xs sm:text-sm text-white truncate">somchai.j@hospital.th</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">โทรศัพท์</div>
                  <div className="text-xs sm:text-sm text-white">089-123-4567</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <Building className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">แผนก</div>
                  <div className="text-xs sm:text-sm text-white">บริหาร</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">เข้าร่วมเมื่อ</div>
                  <div className="text-xs sm:text-sm text-white">1 ม.ค. 2020</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">เข้าใช้งานล่าสุด</div>
              <div className="text-sm font-semibold text-white">วันนี้</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">รายงานที่ดู</div>
              <div className="text-sm font-semibold text-white">148 รายงาน</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">ระยะเวลาใช้งาน</div>
              <div className="text-sm font-semibold text-white">6 เดือน</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">สิทธิ์การใช้งาน</div>
              <div className="text-sm font-semibold text-white">ผู้ดูแลระบบ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">กิจกรรมล่าสุด</h3>
        <div className="space-y-3">
          {[
            { action: 'ดูรายงานผู้ป่วยนอก (OPD)', time: '5 นาทีที่แล้ว', icon: '📊' },
            { action: 'Export ข้อมูลการเงินเป็น Excel', time: '2 ชั่วโมงที่แล้ว', icon: '📥' },
            { action: 'ดูรายงานการประชุม', time: '5 ชั่วโมงที่แล้ว', icon: '👥' },
            { action: 'เข้าสู่ระบบ', time: 'เมื่อเช้านี้', icon: '🔐' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
              <span className="text-2xl">{activity.icon}</span>
              <div className="flex-1">
                <div className="text-sm text-white">{activity.action}</div>
                <div className="text-xs text-gray-400 mt-0.5">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">ข้อมูลบัญชี</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-slate-700/30">
            <span className="text-sm text-gray-400">รหัสผู้ใช้</span>
            <span className="text-sm text-white">123456</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-700/30">
            <span className="text-sm text-gray-400">วันที่สร้างบัญชี</span>
            <span className="text-sm text-white">1 ก.ย. 2025</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-700/30">
            <span className="text-sm text-gray-400">เข้าใช้งานครั้งล่าสุด</span>
            <span className="text-sm text-white">2 มี.ค. 2026, 14:30 น.</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-sm text-gray-400">สถานะบัญชี</span>
            <span className="text-sm text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              ใช้งานอยู่
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}