import React, { useState } from 'react';
import { FeatureFusionVector } from '../../types/tactical';
import { Cpu, ArrowDown, ChevronDown, ChevronUp, Layers, CheckCircle2, Sliders } from 'lucide-react';

interface FeatureFusionPanelProps {
  fusion: FeatureFusionVector;
}

export const FeatureFusionPanel: React.FC<FeatureFusionPanelProps> = ({ fusion }) => {
  const [showRawMetrics, setShowRawMetrics] = useState<boolean>(false);

  const rawFeaturesList = [
    'Player 1-11 X/Y Coordinates',
    'Optical Bounding Box Vectors',
    'Instantaneous Velocity (km/h)',
    'Acceleration Vectors (m/s²)',
    'Convex Hull Area (m²)',
    'Pairwise Inter-Player Distances',
    'Midfield-Defense Line Spacing',
    'Team Centroid X/Y Offset',
    'Zone Occupancy Probabilities',
    'Ball Position X/Y Stream',
    'EPTS Wearable Sensor Load',
    'Homography Pitch Calibration Matrix'
  ];

  return (
    <div className="bg-dark-card rounded-2xl p-5 border border-dark-border space-y-5 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-dark-border pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide uppercase">Feature Fusion & Dimensionality Reduction</h2>
            <p className="text-[11px] text-gray-400 font-mono">24 Raw Tracking Features → 7 Compact Tactical Representation</p>
          </div>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
          7D TACTICAL VECTOR ACTIVE
        </span>
      </div>

      {/* ML PIPELINE VISUALIZATION DIAGRAM (Section 11) */}
      <div className="p-4 bg-dark-bg rounded-xl border border-dark-border space-y-3 font-mono text-xs">
        <div className="text-[10px] text-gray-400 font-bold uppercase text-center tracking-wider">
          TACTICAL MACHINE LEARNING INFERENCE PIPELINE
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-center text-[11px]">
          <div className="p-2 rounded bg-dark-card border border-gray-700 text-gray-300">
            <span className="text-emerald-400 font-bold block">24 RAW FEATURES</span>
            <span>Coordinates & Speeds</span>
          </div>

          <ArrowDown className="w-4 h-4 text-emerald-400 rotate-[-90deg] hidden md:block" />

          <div className="p-2 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold">
            FEATURE FUSION LAYER
          </div>

          <ArrowDown className="w-4 h-4 text-emerald-400 rotate-[-90deg] hidden md:block" />

          <div className="p-2 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-bold">
            7D COMPACT VECTOR
          </div>

          <ArrowDown className="w-4 h-4 text-emerald-400 rotate-[-90deg] hidden md:block" />

          <div className="p-2 rounded bg-purple-950/60 border border-purple-500/40 text-purple-300 font-bold">
            EXPECTED VS ACTUAL
          </div>
        </div>
      </div>

      {/* 7 COMPACT TACTICAL DIMENSIONS (Section 10 & 12) */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-gray-300 font-bold uppercase">
          COMPACT TACTICAL DIMENSIONS (5-7 D)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {fusion.dimensions.map((dim, idx) => (
            <div key={idx} className="p-3 bg-dark-bg rounded-xl border border-dark-border space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold">{dim.name}</span>
                <span className="text-emerald-400 font-extrabold">{dim.valuePct}%</span>
              </div>

              <div className="w-full bg-dark-card rounded-full h-1.5 overflow-hidden border border-dark-border">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${dim.valuePct}%` }}
                />
              </div>

              <span className="text-[10px] text-gray-400 block font-sans leading-tight">{dim.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* UNDERLYING RAW METRICS EXPANDABLE DRAWER (Section 12) */}
      <div className="border-t border-dark-border pt-3">
        <button
          onClick={() => setShowRawMetrics(!showRawMetrics)}
          className="flex items-center justify-between w-full text-xs font-mono text-gray-400 hover:text-white p-2 rounded-lg bg-dark-bg hover:bg-dark-cardHover transition-colors"
        >
          <span>{showRawMetrics ? 'Hide Underlying Raw Feature Stream' : 'View Underlying Raw Metrics (24 Streams)'}</span>
          {showRawMetrics ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showRawMetrics && (
          <div className="mt-3 p-4 bg-dark-bg rounded-xl border border-dark-border grid grid-cols-2 md:grid-cols-3 gap-2 text-[11px] font-mono text-gray-300 animate-in fade-in">
            {rawFeaturesList.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-dark-card rounded border border-dark-border">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
