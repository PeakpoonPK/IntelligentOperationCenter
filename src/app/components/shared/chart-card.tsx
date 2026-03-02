interface ChartCardProps {
  title: string;
  subtitle?: string;
  filter?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  onClick?: () => void;
  clickable?: boolean;
}

export function ChartCard({ title, subtitle, filter, children, action, onClick, clickable = false }: ChartCardProps) {
  return (
    <div 
      className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-slate-700/50 shadow-lg ${
        clickable ? 'cursor-pointer hover:border-indigo-500/50 hover:shadow-indigo-500/20 transition-all duration-200' : ''
      }`}
      onClick={clickable ? onClick : undefined}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {filter && (
            <span className="text-xs text-gray-400 bg-slate-800/50 px-2 py-1 rounded border border-slate-700/50">
              {filter}
            </span>
          )}
          {action}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}