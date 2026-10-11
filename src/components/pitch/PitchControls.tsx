import React from 'react';
import { Layers, Flame, Move, Maximize2, Shield, UserCheck, BrainCircuit, GitCompare } from 'lucide-react';

export type PitchOverlayMode = 
  | 'positions'
  | 'shape'
  | 'compactness'
  | 'width-depth'
  | 'heatmap'
  | 'movement'
  | 'expected-state'
  | 'actual-vs-expected';

interface PitchControlsProps {
  activeMode: PitchOverlayMode;
  onSelectMode: (mode: PitchOverlayMode) => void;
  showOpponent: boolean;
  onToggleOpponent: () => void;
  showTrails: boolean;
  onToggleTrails: () => void;
}

export const PitchControls: React.FC<PitchControlsProps> = ({
  activeMode,
  onSelectMode,
  showOpponent,
  onToggleOpponent,
  showTrails,
  onToggleTrails
}) => {
  const modes = [
    { id: 'actual-vs-expected', label: 'Expected vs Actual', icon: GitCompare, highlight: true },
    { id: 'shape', label: 'Team Shape', icon: Layers },
    { id: 'compactness', label: 'Compactness', icon: Shield },
    { id: 'width-depth', label: 'Width & Depth', icon: Maximize2 },
    { id: 'heatmap', label: 'Heatmap', icon: Flame },
    { id: 'movement', label: 'Movement Vectors', icon: Move },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
      {/* Layer Toggle Buttons */}
      <div className="flex flex-wrap items-center gap-1.5">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode.id as PitchOverlayMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#1F9D55] text-white font-semibold shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Opponent & Movement Toggles */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleOpponent}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border ${
            showOpponent
              ? 'bg-[#E8F5EE] text-[#188245] border-emerald-200 font-semibold'
              : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {showOpponent ? 'Opponent: On' : 'Opponent: Off'}
        </button>

        <button
          onClick={onToggleTrails}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border ${
            showTrails
              ? 'bg-[#E8F5EE] text-[#188245] border-emerald-200 font-semibold'
              : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {showTrails ? 'Trails: On' : 'Trails: Off'}
        </button>
      </div>
    </div>
  );
};
