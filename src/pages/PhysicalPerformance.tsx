import React from 'react';
import { MetricCard } from '../components/common/MetricCard';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { Activity, ShieldCheck, Zap, Gauge, Info } from 'lucide-react';

export const PhysicalPerformance: React.FC = () => {
  const workloadTimeline = [
    { interval: '0-15m', distance: 1.85, highSpeed: 0.38, sprints: 4 },
    { interval: '15-30m', distance: 1.92, highSpeed: 0.42, sprints: 6 },
    { interval: '30-45m', distance: 1.74, highSpeed: 0.29, sprints: 3 },
    { interval: '45-60m', distance: 1.88, highSpeed: 0.41, sprints: 5 },
    { interval: '60-75m', distance: 1.68, highSpeed: 0.31, sprints: 3 },
    { interval: '75-90m', distance: 1.73, highSpeed: 0.35, sprints: 4 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dark-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-cyan-400" />
            Physical Workload & EPTS Analytics
          </h1>
          <p className="text-xs text-gray-400 mt-1">High-speed running thresholds, accelerations & metabolic load tracking</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>DATA SOURCE: EPTS / SENSOR SYNCHRONIZED</span>
        </div>
      </div>

      {/* Distinction Banner */}
      <div className="p-4 rounded-xl bg-dark-card border border-dark-border flex items-start gap-3 text-xs text-gray-300">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-white">EPTS / Wearable Sensor Data Integration</div>
          <p className="text-gray-400 text-[11px] leading-relaxed">
            Physical performance metrics (high-speed running, sprint distance, accelerations/decelerations) are derived from integrated EPTS sensor feeds when available. Video-only tracking automatically falls back to optical speed estimation.
          </p>
        </div>
      </div>

      {/* Physical Telemetry KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <MetricCard label="Total Distance" value="108.4" unit="km" trend="up" trendValue="+3.2%" subtitle="Team Total" />
        <MetricCard label="High-Speed Run" value="18.6" unit="km" trend="up" trendValue="+1.8%" subtitle=">19.8 km/h" statusColor="emerald" />
        <MetricCard label="Sprint Distance" value="4.2" unit="km" trend="neutral" trendValue="0.0%" subtitle=">25.2 km/h" statusColor="amber" />
        <MetricCard label="Accelerations" value="412" subtitle=">3.0 m/s²" />
        <MetricCard label="Decelerations" value="389" subtitle="<-3.0 m/s²" />
        <MetricCard label="Max Speed" value="33.8" unit="km/h" subtitle="Mahmoud (#11)" statusColor="emerald" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workload Distance Over Match Time */}
        <div className="bg-dark-card rounded-xl p-5 border border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white font-mono">Distance Covered per 15-Min Interval (km)</h2>
            <span className="text-xs font-mono text-cyan-400">EPTS Telemetry</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={workloadTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F293D" />
                <XAxis dataKey="interval" stroke="#9CA3AF" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#9CA3AF" fontSize={11} fontFamily="monospace" />
                <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1F293D', fontSize: '12px' }} />
                <Area type="monotone" dataKey="distance" stroke="#00F0FF" fill="rgba(0, 240, 255, 0.2)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* High-Speed Running & Sprint Counts */}
        <div className="bg-dark-card rounded-xl p-5 border border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white font-mono">Sprint Counts per 15-Min Interval</h2>
            <span className="text-xs font-mono text-amber-400">Threshold &gt;25.2 km/h</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workloadTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F293D" />
                <XAxis dataKey="interval" stroke="#9CA3AF" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#9CA3AF" fontSize={11} fontFamily="monospace" />
                <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1F293D', fontSize: '12px' }} />
                <Bar dataKey="sprints" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
