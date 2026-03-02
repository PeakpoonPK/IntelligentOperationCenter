import { ChevronDown, Calendar as CalendarIcon, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface FilterDropdownHeaderProps {
  icon?: React.ReactNode;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  customDate?: boolean;
  onCustomDateChange?: (start: string, end: string) => void;
  customStartDate?: string;
  customEndDate?: string;
  compact?: boolean;
}

export function FilterDropdownHeader({ 
  icon, 
  value, 
  options, 
  onChange,
  customDate = false,
  onCustomDateChange,
  customStartDate = '',
  customEndDate = '',
  compact = false
}: FilterDropdownHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [startDate, setStartDate] = useState(customStartDate);
  const [endDate, setEndDate] = useState(customEndDate);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCustomDate(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: string) => {
    if (option === 'กำหนดเอง') {
      setShowCustomDate(true);
    } else {
      onChange(option);
      setIsOpen(false);
      setShowCustomDate(false);
    }
  };

  const handleApplyCustomDate = () => {
    if (startDate && endDate && onCustomDateChange) {
      onCustomDateChange(startDate, endDate);
      onChange('กำหนดเอง');
      setIsOpen(false);
      setShowCustomDate(false);
    }
  };

  // Display value for compact mode
  const displayValue = () => {
    if (value === 'กำหนดเอง' && startDate && endDate) {
      const start = new Date(startDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
      const end = new Date(endDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
      return compact ? `${start.split(' ')[0]}/${end.split(' ')[0]}` : `${start} - ${end}`;
    }
    
    if (compact && value.length > 10) {
      return value.substring(0, 8) + '...';
    }
    
    return value;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 
                    hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 
                    ${compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'}
                    whitespace-nowrap`}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="text-gray-200 font-medium">
          {displayValue()}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 ${compact ? 'left-0' : 'right-0'} 
                        min-w-[200px] bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 
                        rounded-xl shadow-2xl overflow-hidden z-[100]
                        animate-in fade-in slide-in-from-top-2 duration-200`}>
          {!showCustomDate ? (
            <div className="py-1.5 max-h-[320px] overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full px-4 py-2.5 text-xs sm:text-sm text-left transition-all duration-150 
                              flex items-center justify-between group
                              ${option === value
                                ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-medium'
                                : 'text-gray-200 hover:bg-slate-700/50'
                              }`}
                >
                  <span>{option}</span>
                  {option === value && (
                    <span className="text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">เลือกช่วงวันที่</span>
                <button 
                  onClick={() => setShowCustomDate(false)}
                  className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">วันที่เริ่มต้น</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700 rounded-lg 
                               text-sm text-gray-200 
                               focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                               transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">วันที่สิ้นสุด</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700 rounded-lg 
                               text-sm text-gray-200 
                               focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                               transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleApplyCustomDate}
                disabled={!startDate || !endDate}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] 
                           text-white text-sm font-medium rounded-lg 
                           hover:shadow-lg hover:shadow-indigo-500/30 
                           active:scale-[0.98]
                           transition-all duration-200 
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                ใช้งาน
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}