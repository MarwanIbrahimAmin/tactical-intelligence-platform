import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Trophy, ArrowRightLeft, Layers, Shield } from 'lucide-react';

export const MatchComparisonPage: React.FC = () => {
  const matchComparisons = [
    { match: 'vs Zamalek (H)', width: 41.8, depth: 32.6, compactness: 285, events: 17, distance: 108.4 },
    { match: 'vs Pyramids (A)', width: 38.2, depth: 29.4, compactness: 232, events: 12, distance: 104.2 },
    { match: 'vs ENPPI (H)', width: 44.1, depth: 35.0, compactness: 312, events: 21, distance: 110.8 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dark-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-emerald-400" />
            Multi-Match Tactical Comparison
          </h1>
          <p className="text-xs text-gray-400 mt-1">Cross-match benchmarking for spatial metrics, compactness & physical load</p>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Width & Depth Comparison */}
        <div className="bg-dark-card rounded-xl p-5 border border-dark-border space-y-4">
          <h2 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-emerald-400" /> Team Width vs Depth Comparison (meters)
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={matchComparisons}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F293D" />
                <XAxis dataKey="match" stroke="#9CA3AF" fontSize={11} fontFamily="sans-serif" />
                <YAxis stroke="#9CA3AF" fontSize={11} fontFamily="monospace" />
                <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1F293D', fontSize: '12px' }} />
                <Legend />
                <Bar dataKey="width" name="Avg Width (m)" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="depth" name="Avg Depth (m)" fill="#00F0FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compactness Comparison */}
        <div className="bg-dark-card rounded-xl p-5 border border-dark-border space-y-4">
          <h2 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" /> Average Compactness Area (m²)
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={matchComparisons}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F293D" />
                <XAxis dataKey="match" stroke="#9CA3AF" fontSize={11} fontFamily="sans-serif" />
                <YAxis stroke="#9CA3AF" fontSize={11} fontFamily="monospace" />
                <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1F293D', fontSize: '12px' }} />
                <Bar dataKey="compactness" name="Compactness (m²)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
