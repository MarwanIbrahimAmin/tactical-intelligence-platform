import React from 'react';
import { PitchFrame } from '../../types/tactical';
import { PitchCanvas } from './PitchCanvas';
import { BrainCircuit, ArrowRight, ShieldAlert, CheckCircle2, Sliders, Layers } from 'lucide-react';

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
    <div className="bg-dark-card rounded-2xl p-5 border border-dark-border space-y-6 shadow-2xl">
      {/* Header & Alignment Score */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dark-border pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 shadow-inner">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wide">
                TACTICAL STATE MODEL — PROTOTYPE
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                frame.deviationSeverity === 'significant' ? 'bg-rose-950 text-rose-400 border border-rose-500/40' :
                frame.deviationSeverity === 'moderate' ? 'bg-amber-950 text-amber-400 border border-amber-500/40' :
                'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
              }`}>
                {frame.deviationSeverity === 'significant' ? 'Significant Deviation' :
                 frame.deviationSeverity === 'moderate' ? 'Moderate Deviation' : 'Aligned State'}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">Expected vs. Actual Tactical State</h2>
          </div>
        </div>

        {/* Alignment Gauge */}
        <div className="flex items-center gap-4 bg-dark-bg p-3 rounded-xl border border-dark-border">
          <div className="text-right">
            <span className="text-[10px] text-gray-400 font-mono block">TACTICAL ALIGNMENT</span>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono tracking-tight">{frame.tacticalAlignmentPct}%</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs text-white bg-emerald-950/40">
            {frame.tacticalAlignmentPct}%
          </div>
        </div>
      </div>

      {/* SIDE BY SIDE PITCHES (Section 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: EXPECTED TACTICAL STATE */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold bg-dark-bg p-2.5 rounded-lg border border-dark-border">
            <span className="text-cyan-400 flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4" /> EXPECTED STATE (INFERRED MODEL)
            </span>
            <span className="text-gray-400">Phase: {frame.expectedState.reasoningContext.phaseLabel}</span>
          </div>

          <PitchCanvas
            frame={expectedPitchFrame}
            overlayMode="compactness"
            showOpponent={false}
            showTrails={false}
          />

          <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-1">
            <div className="bg-dark-bg p-2 rounded-lg border border-dark-border">
              <span className="text-gray-400 block text-[10px]">EXP COMPACTNESS</span>
              <span className="text-cyan-400 font-bold">{exp.compactnessAreaM2} m²</span>
            </div>
            <div className="bg-dark-bg p-2 rounded-lg border border-dark-border">
              <span className="text-gray-400 block text-[10px]">EXP WIDTH</span>
              <span className="text-white font-bold">{exp.teamWidthM} m</span>
            </div>
            <div className="bg-dark-bg p-2 rounded-lg border border-dark-border">
              <span className="text-gray-400 block text-[10px]">EXP DEPTH</span>
              <span className="text-white font-bold">{exp.teamDepthM} m</span>
            </div>
          </div>
        </div>

        {/* RIGHT: ACTUAL OBSERVED STATE */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold bg-dark-bg p-2.5 rounded-lg border border-dark-border">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> ACTUAL OBSERVED TRACKING STATE
            </span>
            <span className="text-gray-400">Timestamp: {frame.timestamp}</span>
          </div>

          <PitchCanvas
            frame={frame}
            overlayMode="actual-vs-expected"
            showOpponent={true}
            showTrails={false}
          />

          <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-1">
            <div className="bg-dark-bg p-2 rounded-lg border border-dark-border">
              <span className="text-gray-400 block text-[10px]">ACT COMPACTNESS</span>
              <span className="text-emerald-400 font-bold">{act.compactnessAreaM2} m²</span>
            </div>
            <div className="bg-dark-bg p-2 rounded-lg border border-dark-border">
              <span className="text-gray-400 block text-[10px]">ACT WIDTH</span>
              <span className="text-white font-bold">{act.teamWidthM} m</span>
            </div>
            <div className="bg-dark-bg p-2 rounded-lg border border-dark-border">
              <span className="text-gray-400 block text-[10px]">ACT DEPTH</span>
              <span className="text-white font-bold">{act.teamDepthM} m</span>
            </div>
          </div>
        </div>
      </div>

      {/* METRIC COMPARISON TABLE (Section 8) */}
      <div className="bg-dark-bg p-4 rounded-xl border border-dark-border space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-gray-300 font-bold border-b border-dark-border pb-2">
          <span>TACTICAL DIMENSION DEVIATION BREAKDOWN</span>
          <span className="text-gray-500">HOMOGRAPHY PITCH NORMALIZED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="p-3 bg-dark-card rounded-lg border border-dark-border">
            <div className="text-[10px] text-gray-400">COMPACTNESS AREA</div>
            <div className="flex items-center justify-between my-1 text-sm font-bold">
              <span className="text-cyan-400">{exp.compactnessAreaM2} m²</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-emerald-400">{act.compactnessAreaM2} m²</span>
            </div>
            <div className={`text-[11px] font-bold ${act.compactnessAreaM2 - exp.compactnessAreaM2 > 40 ? 'text-rose-400' : 'text-emerald-400'}`}>
              Delta: {act.compactnessAreaM2 - exp.compactnessAreaM2 > 0 ? '+' : ''}{act.compactnessAreaM2 - exp.compactnessAreaM2} m²
            </div>
          </div>

          <div className="p-3 bg-dark-card rounded-lg border border-dark-border">
            <div className="text-[10px] text-gray-400">TEAM WIDTH</div>
            <div className="flex items-center justify-between my-1 text-sm font-bold">
              <span className="text-cyan-400">{exp.teamWidthM} m</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-emerald-400">{act.teamWidthM} m</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-400">
              Delta: {(act.teamWidthM - exp.teamWidthM).toFixed(1)} m
            </div>
          </div>

          <div className="p-3 bg-dark-card rounded-lg border border-dark-border">
            <div className="text-[10px] text-gray-400">TEAM DEPTH</div>
            <div className="flex items-center justify-between my-1 text-sm font-bold">
              <span className="text-cyan-400">{exp.teamDepthM} m</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-emerald-400">{act.teamDepthM} m</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-400">
              Delta: {(act.teamDepthM - exp.teamDepthM).toFixed(1)} m
            </div>
          </div>

          <div className="p-3 bg-dark-card rounded-lg border border-dark-border">
            <div className="text-[10px] text-gray-400">DEFENSIVE LINE HEIGHT</div>
            <div className="flex items-center justify-between my-1 text-sm font-bold">
              <span className="text-cyan-400">28.0 m</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-emerald-400">{frame.defensiveLineM} m</span>
            </div>
            <div className="text-[11px] font-bold text-amber-400">
              Line Gap: {(frame.defensiveLineM - 28.0).toFixed(1)} m
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
