import React, { useState } from 'react';
import { getFrameAtTime, MATCH_KEYFRAMES } from '../services/simulationEngine';
import { PitchFrame } from '../types/tactical';
import { PitchCanvas } from '../components/pitch/PitchCanvas';
import { PitchControls, PitchOverlayMode } from '../components/pitch/PitchControls';
import { PitchTimeline } from '../components/pitch/PitchTimeline';
import { FeatureFusionPanel } from '../components/tactical/FeatureFusionPanel';
import { BrainCircuit, Filter } from 'lucide-react';

export const TacticalAnalysis: React.FC = () => {
  const [currentSec, setCurrentSec] = useState<number>(1394); // Default 23:14
  const [overlayMode, setOverlayMode] = useState<PitchOverlayMode>('actual-vs-expected');
  const [selectedPhase, setSelectedPhase] = useState<'all' | 'attacking' | 'defensive' | 'transition'>('all');
  const [showOpponent, setShowOpponent] = useState<boolean>(true);
  const [showTrails, setShowTrails] = useState<boolean>(false);

  const frame: PitchFrame = getFrameAtTime(currentSec);

  // Filter keyframes by selected phase
  const filteredKeyframes = MATCH_KEYFRAMES.filter(k => {
    if (selectedPhase === 'all') return true;
    if (selectedPhase === 'attacking') return k.phaseKey.includes('attacking') || k.phaseKey === 'build_up';
    if (selectedPhase === 'defensive') return k.phaseKey.includes('defensive') || k.phaseKey === 'pressing';
    if (selectedPhase === 'transition') return k.phaseKey.includes('transition');
    return true;
  });

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Page Title & Phase Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-lg lg:text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <BrainCircuit className="w-6 h-6 text-[#1F9D55]" />
            Tactical Analysis: How Did The Team Play?
          </h1>
          <p className="text-xs lg:text-sm text-slate-500 mt-0.5">
            Unified tactical engine merging Team Shape, Expected vs Actual, and Spatial Telemetry.
          </p>
        </div>

        {/* Phase Selector Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 px-2.5 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Phase:
          </span>
          {[
            { id: 'all', label: 'All Phases' },
            { id: 'attacking', label: 'Attacking' },
            { id: 'defensive', label: 'Defensive' },
            { id: 'transition', label: 'Transition' },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPhase(p.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedPhase === p.id
                  ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sequence Scrubber Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs lg:text-sm font-semibold text-slate-600">
          <span>Match Key Moments ({filteredKeyframes.length} Sequences)</span>
          <span className="text-[#188245] font-bold">Click to jump pitch moment</span>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {filteredKeyframes.map((k) => {
            const isSelected = Math.abs(currentSec - k.timeSec) < 45;
            return (
              <button
                key={k.timeSec}
                onClick={() => setCurrentSec(k.timeSec)}
                className={`p-3.5 rounded-2xl border text-left shrink-0 w-48 transition-all ${
                  isSelected
                    ? 'bg-[#E8F5EE] border-emerald-300 font-semibold shadow-2xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#188245]">{k.timestamp}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200 uppercase font-semibold">
                    {k.phaseKey.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-xs lg:text-sm font-bold text-slate-900 truncate mt-1">{k.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Pitch Engine + Telemetry Panel (~60% Left / ~40% Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Center Pitch View (7 Spans) */}
        <div className="lg:col-span-7 space-y-4">
          <PitchControls
            activeMode={overlayMode}
            onSelectMode={setOverlayMode}
            showOpponent={showOpponent}
            onToggleOpponent={() => setShowOpponent(!showOpponent)}
            showTrails={showTrails}
            onToggleTrails={() => setShowTrails(!showTrails)}
          />

          <PitchCanvas
            frame={frame}
            overlayMode={overlayMode}
            showOpponent={showOpponent}
            showTrails={showTrails}
          />

          <PitchTimeline
            currentSec={currentSec}
            onSeek={setCurrentSec}
          />
        </div>

        {/* Right Side Panel: Telemetry & Feature Fusion (5 Spans) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-3.5">
              <span className="text-xs font-bold text-[#188245] uppercase tracking-wide block">
                {frame.timestamp} — {frame.phaseLabel}
              </span>
              <h2 className="text-base lg:text-lg font-bold text-slate-900 mt-0.5">Moment Tactical Telemetry</h2>
            </div>

            {/* Inferred Model Alignment */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs lg:text-sm font-semibold text-slate-700">
                <span>Model Alignment Score</span>
                <span className="text-[#188245] font-extrabold text-lg">{frame.tacticalAlignmentPct}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-[#1F9D55] h-full transition-all duration-300"
                  style={{ width: `${frame.tacticalAlignmentPct}%` }}
                />
              </div>
            </div>

            {/* Phase Specific Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs lg:text-sm">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-500 text-xs block font-semibold">Compactness Area</span>
                <div className="text-2xl lg:text-3xl font-extrabold text-slate-900">{frame.compactnessAreaM2} <span className="text-xs text-slate-500 font-semibold">m²</span></div>
                <span className="text-xs text-slate-500 font-medium">Exp: {frame.expectedState.tacticalState.compactnessAreaM2} m²</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-500 text-xs block font-semibold">Team Width</span>
                <div className="text-2xl lg:text-3xl font-extrabold text-slate-900">{frame.teamWidthM} <span className="text-xs text-slate-500 font-semibold">m</span></div>
                <span className="text-xs text-slate-500 font-medium">Exp: {frame.expectedState.tacticalState.teamWidthM} m</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-500 text-xs block font-semibold">Team Depth</span>
                <div className="text-2xl lg:text-3xl font-extrabold text-slate-900">{frame.teamDepthM} <span className="text-xs text-slate-500 font-semibold">m</span></div>
                <span className="text-xs text-slate-500 font-medium">Exp: {frame.expectedState.tacticalState.teamDepthM} m</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-500 text-xs block font-semibold">Line Spacing</span>
                <div className="text-2xl lg:text-3xl font-extrabold text-slate-900">{(frame.attackingLineM - frame.defensiveLineM).toFixed(1)} <span className="text-xs text-slate-500 font-semibold">m</span></div>
                <span className="text-xs text-[#188245] font-semibold">Coordinated</span>
              </div>
            </div>
          </div>

          {/* AI Feature Fusion Breakdown Panel */}
          <FeatureFusionPanel
            fusion={frame.featureFusion}
          />
        </div>
      </div>
    </div>
  );
};
