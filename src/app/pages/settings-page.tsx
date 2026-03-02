import { Bell, Lock, Palette, Globe, Database, Shield, Save } from 'lucide-react';
import { useState } from 'react';

export function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      {/* Header */}
      <div className="flex-1 min-w-0">
        <h2 className="text-base sm:text-lg font-bold text-white mb-1">ตั้งค่า</h2>
        <p className="text-xs text-gray-400 truncate">จัดการการตั้งค่าระบบและบัญชีของคุณ</p>
      </div>

      {/* Notifications Settings */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 sm:p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">การแจ้งเตือน</h3>
            <p className="text-xs text-gray-400">จัดการการแจ้งเตือนของระบบ</p>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white">แจ้งเตือนทางอีเมล</div>
              <div className="text-xs text-gray-400 mt-0.5 truncate">รับการแจ้งเตือนทางอีเมล</div>
            </div>
            <button
              onClick={() => setEmailNotif(!emailNotif)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                emailNotif ? 'bg-indigo-600' : 'bg-slate-600'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  emailNotif ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white">แจ้งเตือนแบบ Push</div>
              <div className="text-xs text-gray-400 mt-0.5 truncate">รับการแจ้งเตือนแบบ Push บนอุปกรณ์</div>
            </div>
            <button
              onClick={() => setPushNotif(!pushNotif)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                pushNotif ? 'bg-indigo-600' : 'bg-slate-600'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  pushNotif ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white">รายงานสรุปรายสัปดาห์</div>
              <div className="text-xs text-gray-400 mt-0.5 truncate">รับรายงานสรุปทุกสัปดาห์</div>
            </div>
            <button
              onClick={() => setWeeklyReport(!weeklyReport)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                weeklyReport ? 'bg-indigo-600' : 'bg-slate-600'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  weeklyReport ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Palette className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">ธีมและการแสดงผล</h3>
            <p className="text-xs text-gray-400">ปรับแต่งรูปแบบการแสดงผล</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <div className="text-sm text-white">โหมดมืด</div>
              <div className="text-xs text-gray-400 mt-0.5">ใช้ธีมสีเข้มสำหรับระบบ</div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                darkMode ? 'bg-indigo-600' : 'bg-slate-600'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  darkMode ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          <div className="p-3 bg-slate-700/30 rounded-lg">
            <div className="text-sm text-white mb-2">ขนาดฟอนต์</div>
            <div className="flex gap-2">
              {['เล็ก', 'กลาง', 'ใหญ่'].map(size => (
                <button
                  key={size}
                  className={`flex-1 py-2 rounded-lg text-xs ${
                    size === 'กลาง'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-600/50 text-gray-400 hover:bg-slate-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <Globe className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">ภาษา</h3>
            <p className="text-xs text-gray-400">เลือกภาษาที่ใช้ในระบบ</p>
          </div>
        </div>

        <select className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500">
          <option>ภาษาไทย</option>
          <option>English</option>
        </select>
      </div>

      {/* Security Settings */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
            <Lock className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">ความปลอดภัย</h3>
            <p className="text-xs text-gray-400">จัดการความปลอดภัยของบัญชี</p>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full text-left p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors">
            <div className="text-sm text-white">เปลี่ยนรหัสผ่าน</div>
            <div className="text-xs text-gray-400 mt-0.5">เปลี่ยนรหัสผ่านของคุณ</div>
          </button>

          <button className="w-full text-left p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors">
            <div className="text-sm text-white">การยืนยันตัวตนแบบสองขั้นตอน</div>
            <div className="text-xs text-gray-400 mt-0.5">เพิ่มความปลอดภัยด้วย 2FA</div>
          </button>

          <button className="w-full text-left p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors">
            <div className="text-sm text-white">ประวัติการเข้าสู่ระบบ</div>
            <div className="text-xs text-gray-400 mt-0.5">ดูประวัติการเข้าสู่ระบบ</div>
          </button>
        </div>
      </div>

      {/* Data Settings */}
      <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <Database className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">ข้อมูลและการจัดเก็บ</h3>
            <p className="text-xs text-gray-400">จัดการข้อมูลและแคช</p>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full text-left p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors">
            <div className="text-sm text-white">ล้างแคช</div>
            <div className="text-xs text-gray-400 mt-0.5">ล้างข้อมูลชั่วคราวเพื่อเพิ่มประสิทธิภาพ</div>
          </button>

          <button className="w-full text-left p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors">
            <div className="text-sm text-white">Export ข้อมูลของฉัน</div>
            <div className="text-xs text-gray-400 mt-0.5">ดาวน์โหลดข้อมูลทั้งหมดของคุณ</div>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-200">
          <Save className="w-4 h-4" />
          บันทึกการตั้งค่า
        </button>
      </div>
    </div>
  );
}