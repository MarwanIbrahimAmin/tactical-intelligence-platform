import React, { useState, useEffect } from 'react';
import { MATCH_KEYFRAMES } from '../../services/simulationEngine';
import { Play, Pause, SkipBack, SkipForward, AlertCircle, Goal, BrainCircuit, Activity } from 'lucide-react';

interface PitchTimelineProps {
  currentSec: number;
  onSeek: (timeSec: number) => void;
  onSelectInsight?: (insightId: string) => void;
}

export interface MultiLayerMarker {
  timeSec: number;
  timestamp: string;
  category: 'match_event' | 'tactical_event' | 'model_deviation';
  title: string;
  severity?: 'aligned' | 'moderate' | 'significant';
  insightId?: string;
}

export const MULTI_LAYER_MARKERS: MultiLayerMarker[] = [
  { timeSec: 0, timestamp: '00:00', category: 'tactical_event', title: 'Match Kickoff (4-3-3 Shape)' },
  { timeSec: 510, timestamp: '08:30', category: 'tactical_event', title: 'Controlled Deep Build-Up' },
  { timeSec: 1394, timestamp: '23:14', category: 'model_deviation', title: 'DEVIATION: Loss of Compactness (+126m²)', severity: 'significant', insightId: 'insight-001' },
  { timeSec: 1902, timestamp: '31:42', category: 'match_event', title: 'GOAL! Omar (#9) — Al Ahly 1-0' },
  { timeSec: 2887, timestamp: '48:07', category: 'tactical_event', title: 'High-Block Pressing Synchronized', insightId: 'insight-004' },
  { timeSec: 3271, timestamp: '54:31', category: 'model_deviation', title: 'DEVIATION: Attacking Width (+13.6m)', severity: 'moderate', insightId: 'insight-002' },
  { timeSec: 3840, timestamp: '64:00', category: 'match_event', title: 'GOAL! Jaziri (#19) — Zamalek 1-1' },
  { timeSec: 4051, timestamp: '67:31', category: 'model_deviation', title: 'DEVIATION: Defensive Line Separation (26.8m)', severity: 'significant', insightId: 'insight-003' },
  { timeSec: 5060, timestamp: '84:20', category: 'match_event', title: 'GOAL! Hamza (#7) — Al Ahly 2-1' },
  { timeSec: 5400, timestamp: '90:00', category: 'tactical_event', title: 'Final Closing Block' }
];

export const PitchTimeline: React.FC<PitchTimelineProps> = ({
  currentSec,
  onSeek,
  onSelectInsight
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const totalSec = 5400; // 90 minutes

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        onSeek((currentSec + 3 >= totalSec ? 0 : currentSec + 3));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSec, totalSec, onSeek]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleMarkerClick = (marker: MultiLayerMarker) => {
    onSeek(marker.timeSec);
    if (marker.insightId && onSelectInsight) {
      onSelectInsight(marker.insightId);
    }
  };

  return (
    <div className="bg-dark-card rounded-2xl p-4 border border-dark-border space-y-3 shadow-xl">
      {/* Playback Controls & Timestamp */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSeek(Math.max(0, currentSec - 30))}
            className="p-1.5 rounded-lg bg-dark-bg text-gray-400 hover:text-white border border-dark-border"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-md shadow-emerald-500/20 transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
          </button>
          <button
            onClick={() => onSeek(Math.min(totalSec, currentSec + 30))}
            className="p-1.5 rounded-lg bg-dark-bg text-gray-400 hover:text-white border border-dark-border"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Quick Jump to Keyframe Select */}
          <select
            value={MATCH_KEYFRAMES.find(k => Math.abs(k.timeSec - currentSec) < 300)?.timeSec || 0}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="bg-dark-bg border border-dark-border rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-mono focus:border-emerald-500 outline-none ml-2"
          >
            {MATCH_KEYFRAMES.map((k) => (
              <option key={k.timeSec} value={k.timeSec}>
                {k.timestamp} — {k.title}
              </option>
            ))}
          </select>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[10px] font-mono text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Match Event
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Tactical Event
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400" /> Model Deviation
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="text-emerald-400 font-bold text-base">{formatTime(currentSec)}</span>
          <span className="text-gray-500">/ 90:00</span>
        </div>
      </div>

      {/* Multi-Layer Scrubber Bar */}
      <div className="relative pt-7 pb-2">
        {/* Markers layer */}
        <div className="absolute top-0 left-0 right-0 h-6 pointer-events-none">
          {MULTI_LAYER_MARKERS.map((m, idx) => {
            const leftPct = (m.timeSec / totalSec) * 100;
            return (
              <div
                key={`marker-${idx}`}
                onClick={() => handleMarkerClick(m)}
                style={{ left: `${leftPct}%` }}
                className="absolute -translate-x-1/2 pointer-events-auto cursor-pointer group"
              >
                <div className={`p-1 rounded-full border transition-all hover:scale-125 ${
                  m.category === 'match_event' ? 'bg-amber-500 text-black border-amber-300' :
                  m.category === 'model_deviation' ? 'bg-rose-500 text-white border-rose-300 animate-pulse' :
                  'bg-emerald-500 text-black border-emerald-300'
                }`}>
                  {m.category === 'match_event' ? <Goal className="w-3 h-3" /> :
                   m.category === 'model_deviation' ? <BrainCircuit className="w-3 h-3" /> :
                   <Activity className="w-3 h-3" />}
                </div>

                {/* Hover Tooltip */}
                <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-40 pointer-events-none min-w-[160px]">
                  <div className="bg-dark-bg/95 border border-dark-borderLight text-xs text-gray-100 p-2.5 rounded-xl shadow-2xl text-center space-y-1">
                    <div className="font-mono text-[10px] text-emerald-400 font-bold">{m.timestamp}</div>
                    <div className="font-semibold text-white text-[11px] leading-tight">{m.title}</div>
                    {m.category === 'model_deviation' && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-500/30 uppercase block">
                        Model Deviation
                      </span>
                    )}
                  </div>
                  <div className="w-2 h-2 bg-dark-bg border-r border-b border-dark-borderLight rotate-45 -mt-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Scrubber Slider */}
        <input
          type="range"
          min="0"
          max={totalSec}
          value={currentSec}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="w-full h-2.5 bg-dark-bg rounded-lg appearance-none cursor-pointer accent-emerald-500 border border-dark-border"
        />
      </div>
    </div>
  );
};
