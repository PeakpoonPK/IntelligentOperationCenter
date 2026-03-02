import { Download, FileText, Table } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { exportToPDF, exportTableToExcel } from '../../utils/export-utils';

interface ExportButtonProps {
  elementId?: string;
  data?: any[];
  filename?: string;
  position?: 'left' | 'right';
}

export function ExportButton({ elementId, data, filename = 'report', position = 'right' }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExportPDF = async () => {
    if (elementId) {
      await exportToPDF(elementId, `${filename}.pdf`);
    }
    setIsOpen(false);
  };

  const handleExportExcel = () => {
    if (data && data.length > 0) {
      exportTableToExcel(data, `${filename}.xlsx`);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative export-ignore" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded-lg transition-all duration-200 border border-indigo-500/30 text-xs font-medium"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Export</span>
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 ${position === 'right' ? 'right-0' : 'left-0'} w-[180px] bg-slate-800 border border-slate-700/50 rounded-lg shadow-xl overflow-hidden z-50`}>
          {elementId && (
            <button
              onClick={handleExportPDF}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-slate-700/50 transition-colors"
            >
              <FileText className="w-4 h-4 text-red-400" />
              <span>Export เป็น PDF</span>
            </button>
          )}
          {data && data.length > 0 && (
            <button
              onClick={handleExportExcel}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-slate-700/50 transition-colors"
            >
              <Table className="w-4 h-4 text-emerald-400" />
              <span>Export เป็น Excel</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}