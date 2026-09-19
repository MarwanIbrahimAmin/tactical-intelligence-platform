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
    { id: 'positions', label: 'Current Position', icon: UserCheck },
    { id: 'shape', label: 'Team Shape', icon: Layers },
    { id: 'compactness', label: 'Compactness (m²)', icon: Shield },
    { id: 'width-depth', label: 'Width & Depth', icon: Maximize2 },
    { id: 'actual-vs-expected', label: 'Actual vs Expected', icon: GitCompare, highlight: true },
    { id: 'expected-state', label: 'Expected State', icon: BrainCircuit },
    { id: 'heatmap', label: 'Heatmap', icon: Flame },
    { id: 'movement', label: 'Movement Vectors', icon: Move },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-dark-card rounded-xl border border-dark-border">
      {/* Mode Buttons */}
      <div className="flex flex-wrap items-center gap-1.5">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode.id as PitchOverlayMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? mode.highlight
                    ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
                  : mode.highlight
                  ? 'bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900 border border-cyan-500/40'
                  : 'bg-dark-bg text-gray-400 hover:text-white hover:bg-dark-cardHover border border-dark-border'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Display Options */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleOpponent}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
            showOpponent
              ? 'bg-dark-cardHover text-gray-200 border-gray-600'
              : 'bg-dark-bg text-gray-500 border-dark-border'
          }`}
        >
          {showOpponent ? 'Hide Opponent' : 'Show Opponent'}
        </button>

        <button
          onClick={onToggleTrails}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
            showTrails
              ? 'bg-dark-cardHover text-gray-200 border-gray-600'
              : 'bg-dark-bg text-gray-500 border-dark-border'
          }`}
        >
          {showTrails ? 'Trails On' : 'Trails Off'}
        </button>
      </div>
    </div>
  );
};
