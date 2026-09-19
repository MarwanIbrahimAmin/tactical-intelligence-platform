import React, { useState } from 'react';
import { MATCH_KEYFRAMES, getFrameAtTime } from '../services/simulationEngine';
import { PitchCanvas } from '../components/pitch/PitchCanvas';
import { PitchControls, PitchOverlayMode } from '../components/pitch/PitchControls';
import { Shapes, Clock, Maximize2, Shield, ArrowRightLeft } from 'lucide-react';

export const TeamShapePage: React.FC = () => {
  const [selectedTimeSec, setSelectedTimeSec] = useState<number>(1394); // Default 23:14
  const [overlayMode, setOverlayMode] = useState<PitchOverlayMode>('shape');
  const [showOpponent, setShowOpponent] = useState<boolean>(true);

  // Dynamic pitch frame at selected time
  const frame = getFrameAtTime(selectedTimeSec);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-dark-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Shapes className="w-6 h-6 text-emerald-400" />
            90-Minute Match Shape Evolution
          </h1>
          <p className="text-xs text-gray-400 mt-1">Interactive tactical sequence across key match phases & spatial organization</p>
        </div>
      </div>

      {/* 90-MINUTE MATCH EVOLUTION KEYFRAME CAROUSEL (Part 8 of Revision Prompt) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-gray-400">
          <span>MATCH TACTICAL SEQUENCE (13 KEYFRAMES)</span>
          <span className="text-emerald-400 font-bold">CLICK ANY STATE TO INSPECT PITCH</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {MATCH_KEYFRAMES.map((k) => {
            const isSelected = Math.abs(selectedTimeSec - k.timeSec) < 60;
            return (
              <button
                key={k.timeSec}
                onClick={() => setSelectedTimeSec(k.timeSec)}
                className={`p-3.5 rounded-xl border text-left shrink-0 w-48 transition-all space-y-1.5 ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-500/10 scale-105'
                    : 'bg-dark-card border-dark-border hover:border-dark-borderLight'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">{k.timestamp}</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                    isSelected ? 'bg-emerald-500 text-black' : 'bg-dark-bg text-gray-400'
                  }`}>
                    {k.phaseKey.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-xs font-bold text-white truncate">{k.title}</div>
                <div className="text-[10px] text-gray-400 font-mono truncate">{k.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Pitch Display for Selected Keyframe */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <PitchControls
            activeMode={overlayMode}
            onSelectMode={setOverlayMode}
            showOpponent={showOpponent}
            onToggleOpponent={() => setShowOpponent(!showOpponent)}
            showTrails={false}
            onToggleTrails={() => {}}
          />

          <PitchCanvas
            frame={frame}
            overlayMode={overlayMode}
            showOpponent={showOpponent}
            showTrails={false}
          />
        </div>

        {/* Spatial Metrics Telemetry Panel */}
        <div className="bg-dark-card rounded-2xl p-5 border border-dark-border space-y-5 shadow-xl">
          <div className="border-b border-dark-border pb-3">
            <span className="text-xs font-mono text-emerald-400 font-bold block">{frame.timestamp} — {frame.phaseLabel}</span>
            <h2 className="text-sm font-bold text-white font-mono uppercase mt-0.5">Spatial Telemetry Breakdown</h2>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-dark-bg border border-dark-border space-y-1">
              <span className="text-gray-400 block text-[10px]">TEAM WIDTH</span>
              <div className="text-lg font-extrabold text-emerald-400">{frame.teamWidthM} m</div>
              <div className="text-[10px] text-gray-500">Lateral distance across wingers</div>
            </div>

            <div className="p-3 rounded-xl bg-dark-bg border border-dark-border space-y-1">
              <span className="text-gray-400 block text-[10px]">TEAM DEPTH</span>
              <div className="text-lg font-extrabold text-cyan-400">{frame.teamDepthM} m</div>
              <div className="text-[10px] text-gray-500">Vertical distance defensive to attacking line</div>
            </div>

            <div className="p-3 rounded-xl bg-dark-bg border border-dark-border space-y-1">
              <span className="text-gray-400 block text-[10px]">CONVEX HULL COMPACTNESS</span>
              <div className="text-lg font-extrabold text-amber-400">{frame.compactnessAreaM2} m²</div>
              <div className="text-[10px] text-gray-500">Enclosing outfield polygon area</div>
            </div>

            <div className="p-3 rounded-xl bg-dark-bg border border-dark-border space-y-1">
              <span className="text-gray-400 block text-[10px]">MODEL ALIGNMENT SCORE</span>
              <div className="text-lg font-extrabold text-white">{frame.tacticalAlignmentPct}%</div>
              <div className="text-[10px] text-gray-500">Expected phase model match</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
