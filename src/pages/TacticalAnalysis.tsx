import React, { useState } from 'react';
import { getFrameAtTime } from '../services/simulationEngine';
import { PitchFrame } from '../types/tactical';
import { ExpectedActualPitch } from '../components/pitch/ExpectedActualPitch';
import { FeatureFusionPanel } from '../components/tactical/FeatureFusionPanel';
import { PitchTimeline } from '../components/pitch/PitchTimeline';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { BrainCircuit, Layers, Shield, Zap, Cpu } from 'lucide-react';

export const TacticalAnalysis: React.FC = () => {
  const [currentSec, setCurrentSec] = useState<number>(1394); // Default 23:14
  const frame: PitchFrame = getFrameAtTime(currentSec);

  const patternOccurrences = [
    { name: 'Defensive Transition', occurrences: 6, avgDuration: '6.4s', confidence: 92 },
    { name: 'Attacking Width Expansion', occurrences: 11, avgDuration: '14.2s', confidence: 89 },
    { name: 'Defensive Line Separation', occurrences: 4, avgDuration: '8.1s', confidence: 94 },
    { name: 'High-Block Pressing', occurrences: 8, avgDuration: '9.8s', confidence: 91 },
    { name: 'Off-Ball Overloads', occurrences: 5, avgDuration: '11.5s', confidence: 86 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-dark-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-cyan-400" />
            Tactical Intelligence & Deviation Engine
          </h1>
          <p className="text-xs text-gray-400 mt-1">Expected vs. Actual Tactical State Inference & Feature Fusion Pipeline</p>
        </div>
      </div>

      {/* Timeline Scrubber Header for Timestamp Selection */}
      <PitchTimeline
        currentSec={currentSec}
        onSeek={setCurrentSec}
      />

      {/* MAJOR SECTION 1: EXPECTED VS ACTUAL TACTICAL STATE (Section 7 & 8) */}
      <ExpectedActualPitch
        frame={frame}
      />

      {/* MAJOR SECTION 2: FEATURE FUSION & DIMENSIONALITY REDUCTION LAYER (Section 10 & 11) */}
      <FeatureFusionPanel
        fusion={frame.featureFusion}
      />

      {/* Pattern Breakdown & Zone Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pattern Occurrence Chart */}
        <div className="bg-dark-card rounded-2xl p-5 border border-dark-border space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <Zap className="w-4 h-4 text-cyan-400" /> PATTERN OCCURRENCE FREQUENCY
            </h2>
            <span className="text-xs font-mono text-gray-400">Match Total: 34 Events</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patternOccurrences} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1F293D" />
                <XAxis type="number" stroke="#9CA3AF" fontSize={11} fontFamily="monospace" />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" fontSize={11} width={150} fontFamily="sans-serif" />
                <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1F293D', fontSize: '12px' }} />
                <Bar dataKey="occurrences" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spatial Zone Occupancy */}
        <div className="bg-dark-card rounded-2xl p-5 border border-dark-border space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <Layers className="w-4 h-4 text-emerald-400" /> SPATIAL ZONE OCCUPANCY %
            </h2>
            <span className="text-xs font-mono text-gray-400">Pitch Normalization</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Central Midfield (Zone 14)', value: 34, color: '#00F0FF' },
                    { name: 'Right Flank', value: 24, color: '#10B981' },
                    { name: 'Left Flank', value: 22, color: '#3B82F6' },
                    { name: 'Attacking Box', value: 20, color: '#F59E0B' }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {[
                    { color: '#00F0FF' },
                    { color: '#10B981' },
                    { color: '#3B82F6' },
                    { color: '#F59E0B' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1F293D', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
