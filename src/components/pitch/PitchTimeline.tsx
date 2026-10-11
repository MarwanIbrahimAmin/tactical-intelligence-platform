import React, { useState, useEffect } from 'react';
import { MATCH_KEYFRAMES } from '../../services/simulationEngine';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

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
  { timeSec: 1394, timestamp: '23:14', category: 'model_deviation', title: 'Loss of Compactness (218 → 347m²)', severity: 'significant', insightId: 'insight-001' },
  { timeSec: 1902, timestamp: '31:42', category: 'match_event', title: 'GOAL! Omar (#9) — Al Ahly 1-0' },
  { timeSec: 2887, timestamp: '48:07', category: 'tactical_event', title: 'High-Block Pressing Synchronized', insightId: 'insight-004' },
  { timeSec: 3271, timestamp: '54:31', category: 'model_deviation', title: 'Attacking Width (+13.6m)', severity: 'moderate', insightId: 'insight-002' },
  { timeSec: 3840, timestamp: '64:00', category: 'match_event', title: 'GOAL! Jaziri (#19) — Zamalek 1-1' },
  { timeSec: 4051, timestamp: '67:31', category: 'model_deviation', title: 'Defensive Line Separation (26.8m)', severity: 'significant', insightId: 'insight-003' },
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
    <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-3 shadow-2xs">
      {/* Playback Controls & Timestamp */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSeek(Math.max(0, currentSec - 30))}
            className="p-1.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-[#1F9D55] hover:bg-[#188245] text-white font-semibold shadow-xs transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>
          <button
            onClick={() => onSeek(Math.min(totalSec, currentSec + 30))}
            className="p-1.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Quick Jump to Keyframe Select */}
          <select
            value={MATCH_KEYFRAMES.find(k => Math.abs(k.timeSec - currentSec) < 300)?.timeSec || 0}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-[#188245] font-semibold focus:border-[#1F9D55] outline-none ml-2"
          >
            {MATCH_KEYFRAMES.map((k) => (
              <option key={k.timeSec} value={k.timeSec}>
                {k.timestamp} — {k.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
          <span className="text-slate-400">Match Time:</span>
          <span className="px-2.5 py-1 rounded-full bg-[#E8F5EE] text-[#188245] font-mono text-sm border border-emerald-200">
            {formatTime(currentSec)} / 90:00
          </span>
        </div>
      </div>

      {/* Interactive Timeline Bar */}
      <div className="relative pt-4 pb-2">
        <input
          type="range"
          min={0}
          max={totalSec}
          value={currentSec}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="w-full accent-[#1F9D55] h-2 bg-slate-100 rounded-lg cursor-pointer"
        />

        {/* Multi-Layer Event Pins */}
        <div className="relative h-6 mt-2">
          {MULTI_LAYER_MARKERS.map((marker, idx) => {
            const leftPct = (marker.timeSec / totalSec) * 100;
            const isNear = Math.abs(marker.timeSec - currentSec) < 45;

            return (
              <button
                key={idx}
                onClick={() => handleMarkerClick(marker)}
                style={{ left: `${leftPct}%` }}
                className={`absolute top-0 -translate-x-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold transition-all hover:scale-110 z-10 ${
                  marker.category === 'model_deviation'
                    ? marker.severity === 'significant'
                      ? 'bg-red-100 text-red-700 border border-red-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                    : marker.category === 'match_event'
                    ? 'bg-emerald-100 text-[#188245] border border-emerald-300'
                    : 'bg-slate-100 text-slate-700 border border-slate-300'
                } ${isNear ? 'ring-2 ring-[#1F9D55] font-bold shadow-xs' : ''}`}
                title={`${marker.timestamp} - ${marker.title}`}
              >
                <span>{marker.timestamp}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
