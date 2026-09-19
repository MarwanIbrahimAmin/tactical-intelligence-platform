import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  subtitle?: string;
  highlight?: boolean;
  statusColor?: 'emerald' | 'cyan' | 'amber' | 'neutral';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  trend,
  trendValue,
  subtitle,
  highlight = false,
  statusColor = 'neutral'
}) => {
  const getBorderColor = () => {
    if (highlight) return 'border-emerald-500/50 shadow-lg shadow-emerald-500/10';
    if (statusColor === 'cyan') return 'border-cyan-500/30';
    if (statusColor === 'amber') return 'border-amber-500/30';
    return 'border-dark-border';
  };

  return (
    <div className={`bg-dark-card rounded-xl p-4 border ${getBorderColor()} hover:border-dark-borderLight transition-all flex flex-col justify-between`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
        {trend && (
          <div className={`flex items-center gap-1 text-[11px] font-mono px-1.5 py-0.5 rounded ${
            trend === 'up' ? 'text-emerald-400 bg-emerald-950/60' :
            trend === 'down' ? 'text-rose-400 bg-rose-950/60' : 'text-gray-400 bg-dark-bg'
          }`}>
            {trend === 'up' && <TrendingUp className="w-3 h-3" />}
            {trend === 'down' && <TrendingDown className="w-3 h-3" />}
            {trend === 'neutral' && <Minus className="w-3 h-3" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      <div className="my-2 flex items-baseline gap-1.5">
        <span className="text-2xl font-extrabold text-white font-mono tracking-tight">{value}</span>
        {unit && <span className="text-xs text-gray-400 font-mono font-normal">{unit}</span>}
      </div>

      {subtitle && (
        <div className="text-[11px] text-gray-400 font-sans">
          {subtitle}
        </div>
      )}
    </div>
  );
};
