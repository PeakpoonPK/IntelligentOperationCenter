import { AlertCircle, Info, TrendingUp, CheckCheck, Trash2, Filter } from 'lucide-react';
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
}

const ALL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'อัตราครองเตียงสูง',
    message: 'วอร์ดศัลยกรรมมีอัตราครองเตียง 95% ใกล้ถึงขีดจำกัด ควรพิจารณาการจัดสรรเตียงเพิ่มเติม',
    time: '5 นาทีที่แล้ว',
    date: '2 มี.ค. 2026',
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'เวลารอนานผิดปกติ',
    message: 'แผนกรังสีวิทยามีเวลารอเฉลี่ย 52 นาที สูงกว่าเป้าหมาย 30 นาที ควรตรวจสอบสาเหตุ',
    time: '15 นาทีที่แล้ว',
    date: '2 มี.ค. 2026',
    read: false,
  },
  {
    id: '3',
    type: 'success',
    title: 'เป้าหมายรายได้บรรลุ',
    message: 'รายได้เดือนนี้เกินเป้าหมาย 12.3% ยอดรวม 14.79 ล้านบาท',
    time: '1 ชั่วโมงที่แล้ว',
    date: '2 มี.ค. 2026',
    read: false,
  },
  {
    id: '4',
    type: 'info',
    title: 'รายงานประจำวันพร้อม',
    message: 'รายงานสรุปผู้ป่วยประจำวันพร้อมแล้ว ผู้ป่วย OPD 340 ราย IPD 96 ราย',
    time: '2 ชั่วโมงที่แล้ว',
    date: '2 มี.ค. 2026',
    read: true,
  },
  {
    id: '5',
    type: 'info',
    title: 'การประชุมวันพรุ่งนี้',
    message: 'ประชุมผู้บริหารเวลา 09:00 น. ห้องประชุมชั้น 3 หัวข้อ: การวางแผนปี 2027',
    time: '3 ชั่วโมงที่แล้ว',
    date: '2 มี.ค. 2026',
    read: true,
  },
  {
    id: '6',
    type: 'warning',
    title: 'ยาคงคลังต่ำ',
    message: 'ยา Paracetamol 500mg เหลือเพียง 15% ควรสั่งซื้อเพิ่มเติม',
    time: '5 ชั่วโมงที่แล้ว',
    date: '2 มี.ค. 2026',
    read: true,
  },
  {
    id: '7',
    type: 'alert',
    title: 'อุปกรณ์ชำรุด',
    message: 'เครื่อง MRI ห้อง 2 มีปัญหา ต้องการการตรวจสอบและซ่อมแซม',
    time: '6 ชั่วโมงที่แล้ว',
    date: '1 มี.ค. 2026',
    read: true,
  },
  {
    id: '8',
    type: 'success',
    title: 'ความพึงพอใจสูง',
    message: 'คะแนนความพึงพอใจผู้ป่วยเดือนนี้ 4.6/5 สูงขึ้น 0.2 คะแนนจากเดือนที่แล้ว',
    time: '1 วันที่แล้ว',
    date: '1 มี.ค. 2026',
    read: true,
  },
  {
    id: '9',
    type: 'info',
    title: 'อัปเดตระบบเสร็จสิ้น',
    message: 'การอัปเดตระบบ HIS เวอร์ชัน 2.5 เสร็จสมบูรณ์ มีฟีเจอร์ใหม่ 12 รายการ',
    time: '1 วันที่แล้ว',
    date: '1 มี.ค. 2026',
    read: true,
  },
  {
    id: '10',
    type: 'warning',
    title: 'ค่าใช้จ่ายสูง',
    message: 'ค่าใช้จ่ายแผนกฉุกเฉินสูงกว่างบประมาณ 8% ควรทบทวนการใช้งาน',
    time: '2 วันที่แล้ว',
    date: '29 ก.พ. 2026',
    read: true,
  },
];

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(ALL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread' | 'alert' | 'warning' | 'success' | 'info'>('all');

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case 'success':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'bg-red-500/10 border-red-500/20';
      case 'warning':
        return 'bg-amber-500/10 border-amber-500/20';
      case 'success':
        return 'bg-emerald-500/10 border-emerald-500/20';
      default:
        return 'bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white mb-1">การแจ้งเตือนทั้งหมด</h2>
          <p className="text-xs text-gray-400">
            {unreadCount} รายการใหม่ จากทั้งหมด {notifications.length} รายการ
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded-lg transition-all duration-200 border border-indigo-500/30 text-sm"
            >
              <CheckCheck className="w-4 h-4" />
              อ่านทั้งหมด
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-400" />
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'ทั้งหมด' },
            { value: 'unread', label: 'ยังไม่อ่าน' },
            { value: 'alert', label: 'เร่งด่วน' },
            { value: 'warning', label: 'แจ้งเตือน' },
            { value: 'success', label: 'สำเร็จ' },
            { value: 'info', label: 'ข้อมูล' },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === f.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Info className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>ไม่มีการแจ้งเตือน</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`bg-slate-800/40 backdrop-blur-sm border rounded-xl p-4 transition-all hover:bg-slate-800/60 ${
                getBgColor(notification.type)
              } ${!notification.read ? 'border-l-4' : ''}`}
            >
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-lg ${getBgColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white">{notification.title}</h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                    </div>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1.5 hover:bg-slate-700/50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-400" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{notification.date}</span>
                    <span>•</span>
                    <span>{notification.time}</span>
                    {!notification.read && (
                      <>
                        <span>•</span>
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-indigo-400 hover:text-indigo-300"
                        >
                          ทำเครื่องหมายว่าอ่านแล้ว
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
