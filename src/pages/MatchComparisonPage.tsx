import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Trophy, ArrowRightLeft, Shield } from 'lucide-react';

export const MatchComparisonPage: React.FC = () => {
  const matchComparisons = [
    { match: 'vs Zamalek (H)', width: 41.8, depth: 32.6, compactness: 285, events: 17, distance: 108.4 },
    { match: 'vs Pyramids (A)', width: 38.2, depth: 29.4, compactness: 232, events: 12, distance: 104.2 },
    { match: 'vs ENPPI (H)', width: 44.1, depth: 35.0, compactness: 312, events: 21, distance: 110.8 }
  ];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#1F9D55]" />
            Matches Archive & Comparison
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Cross-match benchmarking for spatial metrics & compactness</p>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Width & Depth Comparison */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4 shadow-2xs">
          <h2 className="text-xs font-bold text-slate-900 flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-[#1F9D55]" /> Team Width vs Depth (meters)
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={matchComparisons}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="match" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '12px', fontSize: '12px' }} />
                <Legend />
                <Bar dataKey="width" name="Avg Width (m)" fill="#1F9D55" radius={[4, 4, 0, 0]} />
                <Bar dataKey="depth" name="Avg Depth (m)" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compactness Comparison */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4 shadow-2xs">
          <h2 className="text-xs font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-600" /> Average Compactness Area (m²)
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={matchComparisons}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="match" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="compactness" name="Compactness (m²)" fill="#D97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
