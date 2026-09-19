import React from 'react';
import { PitchFrame } from '../../types/tactical';
import { BrainCircuit, ArrowRight, ShieldAlert, CheckCircle2, Eye, Activity } from 'lucide-react';

interface TacticalIntelligenceCardProps {
  frame: PitchFrame;
  onInspectDeviation: () => void;
}

export const TacticalIntelligenceCard: React.FC<TacticalIntelligenceCardProps> = ({
  frame,
  onInspectDeviation
}) => {
  const exp = frame.expectedState.tacticalState;
  const act = frame.actualState;

  return (
    <div className="bg-dark-card rounded-2xl p-5 border border-cyan-500/40 shadow-xl space-y-4 relative overflow-hidden group">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-dark-border pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-400">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide uppercase">Tactical Intelligence Overview</h2>
            <p className="text-[11px] text-gray-400 font-mono">Expected vs. Actual Tactical Assessment</p>
          </div>
        </div>

        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border uppercase ${
          frame.deviationSeverity === 'significant' ? 'bg-rose-950 text-rose-400 border-rose-500/40' :
          frame.deviationSeverity === 'moderate' ? 'bg-amber-950 text-amber-400 border-amber-500/40' :
          'bg-emerald-950 text-emerald-400 border-emerald-500/40'
        }`}>
          {frame.deviationSeverity === 'significant' ? 'Significant Deviation' :
           frame.deviationSeverity === 'moderate' ? 'Moderate Deviation' : 'Aligned State'}
        </span>
      </div>

      {/* Grid Status */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
        <div className="p-3 bg-dark-bg rounded-xl border border-dark-border space-y-1">
          <span className="text-gray-400 block text-[10px]">CURRENT PHASE</span>
          <span className="text-white font-bold text-sm block truncate">{frame.phaseLabel}</span>
        </div>

        <div className="p-3 bg-dark-bg rounded-xl border border-dark-border space-y-1">
          <span className="text-gray-400 block text-[10px]">MODEL ASSESSMENT</span>
          <span className={`font-bold text-sm block capitalize ${
            frame.deviationSeverity === 'significant' ? 'text-rose-400' :
            frame.deviationSeverity === 'moderate' ? 'text-amber-400' : 'text-emerald-400'
          }`}>
            {frame.deviationSeverity} Deviation
          </span>
        </div>

        <div className="p-3 bg-dark-bg rounded-xl border border-dark-border space-y-1 col-span-2 sm:col-span-1">
          <span className="text-gray-400 block text-[10px]">TACTICAL ALIGNMENT</span>
          <span className="text-emerald-400 font-extrabold text-base block">{frame.tacticalAlignmentPct}%</span>
        </div>
      </div>

      {/* Expected vs Actual Comparison Metrics */}
      <div className="p-3.5 bg-dark-bg rounded-xl border border-dark-border space-y-2 font-mono text-xs">
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
          EXPECTED → ACTUAL METRIC COMPARISON
        </div>

        <div className="flex items-center justify-between text-xs py-1 border-b border-dark-border/50">
          <span className="text-gray-400">Compactness Area:</span>
          <span className="text-white font-bold flex items-center gap-1.5">
            <span className="text-cyan-400">{exp.compactnessAreaM2} m²</span>
            <ArrowRight className="w-3 h-3 text-gray-500" />
            <span className="text-emerald-400">{act.compactnessAreaM2} m²</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-xs py-1 border-b border-dark-border/50">
          <span className="text-gray-400">Team Width:</span>
          <span className="text-white font-bold flex items-center gap-1.5">
            <span className="text-cyan-400">{exp.teamWidthM} m</span>
            <ArrowRight className="w-3 h-3 text-gray-500" />
            <span className="text-emerald-400">{act.teamWidthM} m</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-xs py-1">
          <span className="text-gray-400">Team Depth:</span>
          <span className="text-white font-bold flex items-center gap-1.5">
            <span className="text-cyan-400">{exp.teamDepthM} m</span>
            <ArrowRight className="w-3 h-3 text-gray-500" />
            <span className="text-emerald-400">{act.teamDepthM} m</span>
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-gray-400 font-mono">Timestamp: {frame.timestamp}</span>
        <button
          onClick={onInspectDeviation}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-sans text-xs transition-all shadow-md shadow-cyan-500/20 active:scale-95"
        >
          <Eye className="w-4 h-4" />
          <span>Inspect Expected vs Actual</span>
        </button>
      </div>
    </div>
  );
};
