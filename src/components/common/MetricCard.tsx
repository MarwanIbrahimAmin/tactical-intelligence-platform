import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  subtitle?: string;
  statusText?: string;
  highlight?: boolean;
  statusColor?: 'emerald' | 'amber' | 'rose' | 'neutral';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  trend,
  trendValue,
  subtitle,
  statusText,
  highlight = false,
  statusColor = 'neutral'
}) => {
  const getCardStyle = () => {
    if (highlight || statusColor === 'rose') return 'border-red-200 bg-red-50/20';
    if (statusColor === 'amber') return 'border-amber-200 bg-amber-50/20';
    if (statusColor === 'emerald') return 'border-emerald-200 bg-emerald-50/20';
    return 'border-slate-200 bg-white';
  };

  const getStatusBadgeStyle = () => {
    if (statusColor === 'rose' || highlight) return 'bg-red-100 text-red-700 border-red-200';
    if (statusColor === 'amber') return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-[#E8F5EE] text-[#188245] border-emerald-200';
  };

  return (
    <div className={`rounded-2xl p-4 lg:p-5 border ${getCardStyle()} shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs lg:text-sm font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
            trend === 'up' ? 'text-[#188245] bg-emerald-100' :
            trend === 'down' ? 'text-red-700 bg-red-100' : 'text-slate-600 bg-slate-100'
          }`}>
            {trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
            {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
            {trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      <div className="my-2.5 flex items-baseline gap-1.5">
        <span className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">{value}</span>
        {unit && <span className="text-sm font-semibold text-slate-500">{unit}</span>}
      </div>

      {statusText ? (
        <div className={`text-xs font-semibold px-2.5 py-1 rounded-full border inline-flex items-center gap-1.5 w-fit ${getStatusBadgeStyle()}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          <span>{statusText}</span>
        </div>
      ) : subtitle ? (
        <div className="text-xs text-slate-500 font-medium">
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};
