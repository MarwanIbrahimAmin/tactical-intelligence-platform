import React from 'react';
import { PitchFrame } from '../../types/tactical';
import { PitchCanvas } from './PitchCanvas';
import { BrainCircuit, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ExpectedActualPitchProps {
  frame: PitchFrame;
  onOpenEvidence?: () => void;
}

export const ExpectedActualPitch: React.FC<ExpectedActualPitchProps> = ({ frame, onOpenEvidence }) => {
  const exp = frame.expectedState.tacticalState;
  const act = frame.actualState;
  const dev = frame.primaryDeviation;

  // Frame representing expected state for Left Pitch
  const expectedPitchFrame: PitchFrame = {
    ...frame,
    compactnessAreaM2: exp.compactnessAreaM2,
    teamWidthM: exp.teamWidthM,
    teamDepthM: exp.teamDepthM,
    homePlayers: frame.expectedState.expectedHomePlayers
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-6 shadow-2xs">
      {/* Header & Alignment Score */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#1F9D55] shadow-2xs">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#188245] font-semibold uppercase tracking-wide">
                Tactical Model Comparison
              </span>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
                frame.deviationSeverity === 'significant' ? 'bg-red-100 text-red-700 border border-red-200' :
                frame.deviationSeverity === 'moderate' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                'bg-emerald-100 text-[#188245] border border-emerald-200'
              }`}>
                {frame.deviationSeverity === 'significant' ? 'Significant Deviation' :
                 frame.deviationSeverity === 'moderate' ? 'Moderate Deviation' : 'Aligned State'}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">Expected vs. Actual Structure</h2>
          </div>
        </div>

        {/* Alignment Gauge */}
        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="text-right">
            <span className="text-[11px] text-slate-500 font-medium block">Tactical Alignment</span>
            <span className="text-2xl font-bold text-[#188245] tracking-tight">{frame.tacticalAlignmentPct}%</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-200 flex items-center justify-center font-bold text-xs text-[#188245] bg-emerald-50">
            {frame.tacticalAlignmentPct}%
          </div>
        </div>
      </div>

      {/* SIDE BY SIDE PITCHES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: EXPECTED TACTICAL STATE */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-blue-700 flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4" /> Expected Model Shape
            </span>
            <span className="text-slate-500">Phase: {frame.expectedState.reasoningContext.phaseLabel}</span>
          </div>

          <PitchCanvas
            frame={expectedPitchFrame}
            overlayMode="compactness"
            showOpponent={false}
            showTrails={false}
          />

          <div className="grid grid-cols-3 gap-2 text-xs pt-1">
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-slate-500 block text-[10px]">Expected Area</span>
              <span className="text-blue-700 font-bold">{exp.compactnessAreaM2} m²</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-slate-500 block text-[10px]">Expected Width</span>
              <span className="text-slate-800 font-semibold">{exp.teamWidthM} m</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-slate-500 block text-[10px]">Expected Depth</span>
              <span className="text-slate-800 font-semibold">{exp.teamDepthM} m</span>
            </div>
          </div>
        </div>

        {/* RIGHT: ACTUAL OBSERVED STATE */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[#188245] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Actual Observed Pitch State
            </span>
            <span className="text-slate-500">Timestamp: {frame.timestamp}</span>
          </div>

          <PitchCanvas
            frame={frame}
            overlayMode="actual-vs-expected"
            showOpponent={true}
            showTrails={false}
          />

          <div className="grid grid-cols-3 gap-2 text-xs pt-1">
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-slate-500 block text-[10px]">Actual Area</span>
              <span className="text-[#188245] font-bold">{act.compactnessAreaM2} m²</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-slate-500 block text-[10px]">Actual Width</span>
              <span className="text-slate-800 font-semibold">{act.teamWidthM} m</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-slate-500 block text-[10px]">Actual Depth</span>
              <span className="text-slate-800 font-semibold">{act.teamDepthM} m</span>
            </div>
          </div>
        </div>
      </div>

      {/* DEVIATION AUDIT BANNER */}
      {dev && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold flex items-center gap-2">
              <span>Primary Tactical Deviation Detected: {dev.metric}</span>
              <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-mono text-[10px]">
                Exp {dev.expected}{dev.unit} → Act {dev.actual}{dev.unit} (+{dev.deviation}{dev.unit})
              </span>
            </div>
            <p className="text-amber-800 text-xs">{dev.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
