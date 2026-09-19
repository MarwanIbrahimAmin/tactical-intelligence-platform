import React, { useState } from 'react';
import { TacticalInsight } from '../../types/tactical';
import { Play, Pause, RotateCcw, Maximize2, ShieldAlert, Crosshair } from 'lucide-react';

interface SynchronizedPlayerProps {
  insight: TacticalInsight;
}

export const SynchronizedPlayer: React.FC<SynchronizedPlayerProps> = ({ insight }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);

  return (
    <div className="bg-dark-card rounded-xl border border-dark-border overflow-hidden flex flex-col justify-between">
      {/* Video Viewport Simulated Stadium Feed */}
      <div className="relative aspect-video bg-[#050B14] overflow-hidden flex items-center justify-center group select-none">
        {/* Pitch Green Synthetic Gradient Background simulating broadcast camera angle */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f2c1d]/40 via-[#071911] to-[#040e0a]" />

        {/* Simulated Broadcast Tactical Overlay Graphics */}
        <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Tactical Highlight Zone */}
          <polygon
            points="220,180 580,160 640,340 180,360"
            fill="rgba(0, 240, 255, 0.12)"
            stroke="#00F0FF"
            strokeWidth="2"
            strokeDasharray="6,4"
          />

          {/* Tracking Bounding Boxes on Simulated Players */}
          {/* Player #8 Ahmed */}
          <g transform="translate(320, 240)">
            <rect x="-20" y="-35" width="40" height="70" fill="none" stroke="#00FF87" strokeWidth="2" />
            <rect x="-24" y="-55" width="80" height="18" fill="rgba(0,0,0,0.8)" rx="4" />
            <text x="-20" y="-42" fill="#00FF87" fontSize="10" fontWeight="bold" fontFamily="monospace">
              #8 Ahmed 22.4 km/h
            </text>
          </g>

          {/* Player #6 Marwan */}
          <g transform="translate(440, 210)">
            <rect x="-20" y="-35" width="40" height="70" fill="none" stroke="#00F0FF" strokeWidth="2" />
            <rect x="-24" y="-55" width="84" height="18" fill="rgba(0,0,0,0.8)" rx="4" />
            <text x="-20" y="-42" fill="#00F0FF" fontSize="10" fontWeight="bold" fontFamily="monospace">
              #6 Marwan 18.1 km/h
            </text>
          </g>

          {/* Player #9 Omar */}
          <g transform="translate(560, 280)">
            <rect x="-20" y="-35" width="40" height="70" fill="none" stroke="#00FF87" strokeWidth="2" />
            <rect x="-24" y="-55" width="76" height="18" fill="rgba(0,0,0,0.8)" rx="4" />
            <text x="-20" y="-42" fill="#00FF87" fontSize="10" fontWeight="bold" fontFamily="monospace">
              #9 Omar 24.8 km/h
            </text>
          </g>

          {/* Detection Alert Marker */}
          <g transform="translate(380, 200)">
            <circle cx="0" cy="0" r="28" fill="none" stroke="#FF0055" strokeWidth="2" className="animate-ping" />
            <text x="-40" y="-35" fill="#FF0055" fontSize="11" fontWeight="bold" fontFamily="monospace">
              EVENT DETECTED: {insight.metricName}
            </text>
          </g>
        </svg>

        {/* Top Video Overlay Telemetry Header */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono bg-dark-bg/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-dark-border">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Crosshair className="w-4 h-4 animate-spin" />
            <span>VIDEO FEED • BROADCAST SYNCHRONIZED</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <span>TIMESTAMP: <strong>{insight.startTime}</strong></span>
            <span className="text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">CONF: {insight.confidencePct}%</span>
          </div>
        </div>

        {/* Big Center Play Icon overlay */}
        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="w-14 h-14 rounded-full bg-emerald-500/90 text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
          >
            <Play className="w-6 h-6 fill-black ml-1" />
          </button>
        )}
      </div>

      {/* Video Transport Controls */}
      <div className="p-3 bg-dark-card border-t border-dark-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
          </button>
          <button
            onClick={() => setIsPlaying(false)}
            className="p-2 rounded-lg bg-dark-bg text-gray-400 hover:text-white border border-dark-border"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Speed selectors */}
          <div className="flex items-center gap-1 ml-2 font-mono text-xs">
            {[0.5, 1.0, 2.0].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-1 rounded ${
                  speed === s ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40 font-bold' : 'text-gray-400 hover:bg-dark-bg'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-gray-400 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Tracking ID Continuity: 96%</span>
        </div>
      </div>
    </div>
  );
};
