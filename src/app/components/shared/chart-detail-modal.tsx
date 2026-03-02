import { X } from 'lucide-react';
import { ExportButton } from './export-button';
import { useEffect } from 'react';

interface ChartDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  exportData?: any[];
  exportFilename?: string;
}

export function ChartDetailModal({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  children, 
  exportData,
  exportFilename = 'chart-detail' 
}: ChartDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 m-4 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-700/50">
          <div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {exportData && exportData.length > 0 && (
              <ExportButton 
                data={exportData} 
                filename={exportFilename}
                elementId="modal-chart-content"
              />
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6" id="modal-chart-content">
          {children}
        </div>
      </div>
    </div>
  );
}
