import { Bell, X, CheckCheck, AlertCircle, Info, TrendingUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';

interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'อัตราครองเตียงสูง',
    message: 'วอร์ดศัลยกรรมมีอัตราครองเตียง 95% ใกล้ถึงขีดจำกัด',
    time: '5 นาทีที่แล้ว',
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'เวลารอนานผิดปกติ',
    message: 'แผนกรังสีวิทยามีเวลารอเฉลี่ย 52 นาที สูงกว่าเป้าหมาย',
    time: '15 นาทีที่แล้ว',
    read: false,
  },
  {
    id: '3',
    type: 'success',
    title: 'เป้าหมายรายได้บรรลุ',
    message: 'รายได้เดือนนี้เกินเป้าหมาย 12.3%',
    time: '1 ชั่วโมงที่แล้ว',
    read: false,
  },
  {
    id: '4',
    type: 'info',
    title: 'รายงานประจำวันพร้อม',
    message: 'รายงานสรุปผู้ป่วยประจำวันพร้อมแล้ว',
    time: '2 ชั่วโมงที่แล้ว',
    read: true,
  },
  {
    id: '5',
    type: 'info',
    title: 'การประชุมวันพรุ่งนี้',
    message: 'ประชุมผู้บริหารเวลา 09:00 น. ห้องประชุมชั้น 3',
    time: '3 ชั่วโมงที่แล้ว',
    read: true,
  },
];

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case 'success':
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'bg-red-500/10';
      case 'warning':
        return 'bg-amber-500/10';
      case 'success':
        return 'bg-emerald-500/10';
      default:
        return 'bg-blue-500/10';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 
                   hover:bg-slate-800 hover:border-slate-600 transition-all duration-200"
      >
        <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-gradient-to-r from-red-500 to-pink-500 
                           rounded-full text-[10px] text-white flex items-center justify-center font-semibold
                           shadow-lg shadow-red-500/50">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-[min(380px,calc(100vw-24px))] 
                        bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl 
                        overflow-hidden z-[100]
                        animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">การแจ้งเตือน</h3>
              <p className="text-xs text-gray-400 mt-0.5">{unreadCount} รายการใหม่</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 
                           px-2 py-1 rounded-lg hover:bg-slate-700/50 transition-all"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">อ่านทั้งหมด</span>
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors cursor-pointer ${
                  !notification.read ? 'bg-slate-700/20' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  <div className={`w-8 h-8 rounded-lg ${getBgColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-white">{notification.title}</h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1.5">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-700/50 bg-slate-800/50">
            <button 
              onClick={() => {
                setIsOpen(false);
                navigate('/notifications');
              }}
              className="w-full text-center text-xs text-indigo-400 hover:text-indigo-300 py-2 
                         rounded-lg hover:bg-slate-700/50 transition-all font-medium"
            >
              ดูการแจ้งเตือนทั้งหมด
            </button>
          </div>
        </div>
      )}
    </div>
  );
}