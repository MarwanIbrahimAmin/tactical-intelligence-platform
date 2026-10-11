import React, { useState } from 'react';
import { FeatureFusionVector } from '../../types/tactical';
import { Cpu, ChevronDown, ChevronUp } from 'lucide-react';

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
    <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-4 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-50 text-[#1F9D55] border border-emerald-200">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900">Feature Fusion Pipeline</h2>
            <p className="text-[10px] text-slate-500">24 Tracking Metrics → 7 Compact Dimensions</p>
          </div>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E8F5EE] text-[#188245] border border-emerald-200">
          7D Active
        </span>
      </div>

      {/* 7 COMPACT TACTICAL DIMENSIONS */}
      <div className="space-y-2">
        <div className="text-[11px] font-semibold text-slate-700">
          Compact Tactical Dimensions
        </div>

        <div className="space-y-2">
          {fusion.dimensions.slice(0, 4).map((dim, idx) => (
            <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-800 font-semibold">{dim.name}</span>
                <span className="text-[#188245] font-bold">{dim.valuePct}%</span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#1F9D55] h-full rounded-full transition-all duration-300"
                  style={{ width: `${dim.valuePct}%` }}
                />
              </div>

              <span className="text-[10px] text-slate-500 block leading-tight">{dim.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Expand Raw Metrics Toggle */}
      <div className="border-t border-slate-100 pt-2">
        <button
          onClick={() => setShowRawMetrics(!showRawMetrics)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-slate-900 py-1"
        >
          <span>Raw Tracking Input Features (24 Metrics)</span>
          {showRawMetrics ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showRawMetrics && (
          <div className="grid grid-cols-2 gap-1.5 mt-2 text-[11px] text-slate-600 pt-1">
            {rawFeaturesList.map((f, i) => (
              <div key={i} className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F9D55]" />
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
