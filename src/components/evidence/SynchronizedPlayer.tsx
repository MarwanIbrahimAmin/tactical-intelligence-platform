import React, { useState } from 'react';
import { TacticalInsight } from '../../types/tactical';
import { Play, Pause, RotateCcw, Video } from 'lucide-react';

interface SynchronizedPlayerProps {
  insight: TacticalInsight;
}

export const SynchronizedPlayer: React.FC<SynchronizedPlayerProps> = ({ insight }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-2xs">
      {/* Video Viewport Simulated Stadium Feed */}
      <div className="relative aspect-video bg-[#1E293B] overflow-hidden flex items-center justify-center group select-none">
        {/* Pitch Green Synthetic Gradient Background simulating broadcast camera angle */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b5e20]/60 via-[#184e1b] to-[#0d3310]" />

        {/* Simulated Broadcast Tactical Overlay Graphics */}
        <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Tactical Highlight Zone */}
          <polygon
            points="220,180 580,160 640,340 180,360"
            fill="rgba(255, 255, 255, 0.15)"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="6,4"
          />

          {/* Tracking Bounding Boxes on Simulated Players */}
          {/* Player #8 Ahmed */}
          <g transform="translate(320, 240)">
            <rect x="-20" y="-35" width="40" height="70" fill="none" stroke="#22C55E" strokeWidth="2.5" />
            <rect x="-24" y="-55" width="84" height="18" fill="rgba(0,0,0,0.85)" rx="4" />
            <text x="-20" y="-42" fill="#22C55E" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
              #8 Ahmed 22.4 km/h
            </text>
          </g>

          {/* Player #6 Marwan */}
          <g transform="translate(440, 210)">
            <rect x="-20" y="-35" width="40" height="70" fill="none" stroke="#60A5FA" strokeWidth="2.5" />
            <rect x="-24" y="-55" width="84" height="18" fill="rgba(0,0,0,0.85)" rx="4" />
            <text x="-20" y="-42" fill="#60A5FA" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
              #6 Marwan 18.1 km/h
            </text>
          </g>

          {/* Detection Alert Marker */}
          <g transform="translate(380, 200)">
            <circle cx="0" cy="0" r="28" fill="none" stroke="#EF4444" strokeWidth="2.5" className="animate-ping" />
            <text x="-50" y="-35" fill="#EF4444" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
              EVENT: {insight.metricName}
            </text>
          </g>
        </svg>

        {/* Top Video Overlay Telemetry Header */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-sans bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl text-white border border-slate-700">
          <div className="flex items-center gap-2 text-[#22C55E] font-bold">
            <Video className="w-4 h-4" />
            <span>Match Clip Synchronized</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Time: <strong>{insight.startTime}</strong></span>
            <span className="text-[#22C55E] bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Confidence: {insight.confidencePct}%
            </span>
          </div>
        </div>

        {/* Big Center Play Icon overlay */}
        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="w-14 h-14 rounded-full bg-[#1F9D55] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
          >
            <Play className="w-6 h-6 fill-white ml-1" />
          </button>
        )}
      </div>

      {/* Video Transport Controls */}
      <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-[#1F9D55] hover:bg-[#188245] text-white font-semibold shadow-2xs"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>
          <button
            onClick={() => setIsPlaying(false)}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          {[0.5, 1, 1.5, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                speed === s ? 'bg-[#E8F5EE] text-[#188245] border border-emerald-200' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
