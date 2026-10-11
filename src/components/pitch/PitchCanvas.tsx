import React, { useState } from 'react';
import { PitchFrame, PlayerCoordinate } from '../../types/tactical';
import { PitchOverlayMode } from './PitchControls';
import { X, Zap, MapPin } from 'lucide-react';

interface PitchCanvasProps {
  frame: PitchFrame;
  overlayMode: PitchOverlayMode;
  showOpponent: boolean;
  showTrails: boolean;
  onSelectPlayer?: (player: PlayerCoordinate) => void;
}

export const PitchCanvas: React.FC<PitchCanvasProps> = ({
  frame,
  overlayMode,
  showOpponent,
  showTrails,
  onSelectPlayer
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerCoordinate | null>(null);

  // Helper for computing Convex Hull algorithm (Graham scan) for compactness mode
  const getConvexHull = (players: { x: number; y: number }[]) => {
    const points = players.map(p => ({ x: p.x, y: p.y }));
    if (points.length < 3) return points;

    let pivot = points[0];
    for (let p of points) {
      if (p.y < pivot.y || (p.y === pivot.y && p.x < pivot.x)) pivot = p;
    }

    const sorted = points.filter(p => p !== pivot).sort((a, b) => {
      return Math.atan2(a.y - pivot.y, a.x - pivot.x) - Math.atan2(b.y - pivot.y, b.x - pivot.x);
    });

    const hull = [pivot, sorted[0]];
    for (let i = 1; i < sorted.length; i++) {
      while (hull.length > 1) {
        const p1 = hull[hull.length - 2];
        const p2 = hull[hull.length - 1];
        const p3 = sorted[i];
        const cross = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
        if (cross > 0) break;
        hull.pop();
      }
      hull.push(sorted[i]);
    }
    return hull;
  };

  const outfieldHome = frame.homePlayers.filter(p => p.position !== 'Goalkeeper');
  const hullPoints = getConvexHull(outfieldHome);
  const polygonPointsStr = hullPoints.map(p => `${p.x * 10},${p.y * 6.5}`).join(' ');

  // Expected Hull Points for Expected State overlay
  const expectedOutfield = frame.expectedState?.expectedHomePlayers
    ? frame.expectedState.expectedHomePlayers.filter(p => p.position !== 'Goalkeeper')
    : outfieldHome;
  const expectedHullPoints = getConvexHull(expectedOutfield);
  const expectedPolygonPointsStr = expectedHullPoints.map(p => `${p.x * 10},${p.y * 6.5}`).join(' ');

  const handlePlayerClick = (p: PlayerCoordinate) => {
    setSelectedPlayer(p);
    if (onSelectPlayer) onSelectPlayer(p);
  };

  return (
    <div className="relative w-full aspect-[105/68] bg-[#2D7D46] rounded-2xl overflow-hidden border border-slate-300 shadow-md group select-none">
      {/* SVG Football Pitch Field */}
      <svg
        viewBox="0 0 1050 650"
        className="w-full h-full"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, #2D7D46, #2D7D46 65.6px, #276F3E 65.6px, #276F3E 131.2px)`
        }}
      >
        {/* Outer Boundary & Center Line */}
        <rect x="25" y="25" width="1000" height="600" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3" />
        <line x1="525" y1="25" x2="525" y2="625" stroke="rgba(255,255,255,0.75)" strokeWidth="3" />
        <circle cx="525" cy="325" r="91.5" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3" />
        <circle cx="525" cy="325" r="4" fill="rgba(255,255,255,0.9)" />

        {/* Home Box (Left) */}
        <rect x="25" y="138.5" width="165" height="373" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3" />
        <rect x="25" y="230" width="55" height="190" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3" />
        <circle cx="135" cy="325" r="3" fill="rgba(255,255,255,0.9)" />
        <path d="M 190 262 A 91.5 91.5 0 0 1 190 388" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3" />

        {/* Away Box (Right) */}
        <rect x="860" y="138.5" width="165" height="373" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3" />
        <rect x="970" y="230" width="55" height="190" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3" />
        <circle cx="915" cy="325" r="3" fill="rgba(255,255,255,0.9)" />
        <path d="M 860 262 A 91.5 91.5 0 0 0 860 388" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3" />

        {/* Goals */}
        <rect x="5" y="270" width="20" height="110" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="3" />
        <rect x="1025" y="270" width="20" height="110" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="3" />

        {/* Corner Arcs */}
        <path d="M 25 35 A 10 10 0 0 0 35 25" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3" />
        <path d="M 25 615 A 10 10 0 0 1 35 625" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3" />
        <path d="M 1025 35 A 10 10 0 0 1 1015 25" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3" />
        <path d="M 1025 615 A 10 10 0 0 0 1015 625" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="3" />

        {/* OVERLAY: EXPECTED STATE OR ACTUAL VS EXPECTED */}
        {(overlayMode === 'expected-state' || overlayMode === 'actual-vs-expected') && (
          <g>
            {/* Expected Convex Hull Boundary */}
            <polygon
              points={expectedPolygonPointsStr}
              fill="rgba(59, 130, 246, 0.15)"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeDasharray="4,4"
            />

            {/* Expected Ghost Players */}
            {frame.expectedState.expectedHomePlayers.map(p => (
              <g key={`exp-ghost-${p.id}`} opacity="0.85">
                <circle cx={p.x * 10} cy={p.y * 6.5} r="14" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="3,3" />
                <circle cx={p.x * 10} cy={p.y * 6.5} r="4" fill="#2563EB" />
                <text x={p.x * 10} y={p.y * 6.5 - 18} textAnchor="middle" fill="#1E40AF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  Exp #{p.number}
                </text>
              </g>
            ))}

            {/* DEVIATION VECTORS connecting Expected -> Actual position */}
            {overlayMode === 'actual-vs-expected' && frame.homePlayers.map((actP, idx) => {
              const expP = frame.expectedState.expectedHomePlayers[idx];
              if (!expP) return null;
              const distM = Math.hypot((actP.x - expP.x) * 1.05, (actP.y - expP.y) * 0.68).toFixed(1);

              return (
                <g key={`dev-vec-${actP.id}`}>
                  <line
                    x1={expP.x * 10}
                    y1={expP.y * 6.5}
                    x2={actP.x * 10}
                    y2={actP.y * 6.5}
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeDasharray="4,2"
                  />
                  {Number(distM) > 3.0 && (
                    <text
                      x={(expP.x + actP.x) * 5}
                      y={(expP.y + actP.y) * 3.25 - 6}
                      fill="#B91C1C"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      textAnchor="middle"
                    >
                      +{distM}m
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        )}

        {/* OVERLAY: HEATMAP MODE */}
        {overlayMode === 'heatmap' && (
          <g opacity="0.6">
            <circle cx={frame.centroid.x * 10} cy={frame.centroid.y * 6.5} r="180" fill="rgba(31, 157, 85, 0.45)" filter="blur(20px)" />
            {frame.homePlayers.map(p => (
              <circle key={`heat-${p.id}`} cx={p.x * 10} cy={p.y * 6.5} r="70" fill="rgba(31, 157, 85, 0.35)" filter="blur(10px)" />
            ))}
          </g>
        )}

        {/* OVERLAY: COMPACTNESS (CONVEX HULL) */}
        {(overlayMode === 'compactness' || overlayMode === 'shape') && (
          <g>
            <polygon
              points={polygonPointsStr}
              fill="rgba(255, 255, 255, 0.2)"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeDasharray="6,4"
            />
            {/* Centroid indicator */}
            <circle cx={frame.centroid.x * 10} cy={frame.centroid.y * 6.5} r="8" fill="#FACC15" opacity="0.9" />
            <circle cx={frame.centroid.x * 10} cy={frame.centroid.y * 6.5} r="16" fill="none" stroke="#FACC15" strokeWidth="2" className="animate-ping" />
            <text x={frame.centroid.x * 10 + 12} y={frame.centroid.y * 6.5 - 12} fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              Center ({frame.compactnessAreaM2} m²)
            </text>
          </g>
        )}

        {/* OVERLAY: WIDTH & DEPTH / LINES */}
        {(overlayMode === 'width-depth' || overlayMode === 'shape') && (
          <g fontWeight="bold" fontSize="12" fontFamily="sans-serif">
            {/* Defensive Line */}
            <line
              x1={frame.defensiveLineM * 10}
              y1="25"
              x2={frame.defensiveLineM * 10}
              y2="625"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeDasharray="8,4"
            />
            <text x={frame.defensiveLineM * 10 + 6} y="45" fill="#FEF3C7">Def Line: {frame.defensiveLineM.toFixed(1)}m</text>

            {/* Attacking Line */}
            <line
              x1={frame.attackingLineM * 10}
              y1="25"
              x2={frame.attackingLineM * 10}
              y2="625"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeDasharray="8,4"
            />
            <text x={frame.attackingLineM * 10 - 140} y="45" fill="#FFFFFF">Att Line: {frame.attackingLineM.toFixed(1)}m</text>
          </g>
        )}

        {/* MOVEMENT TRAILS */}
        {(showTrails || overlayMode === 'movement') && (
          <g>
            {frame.homePlayers.map(p => (
              <line
                key={`vector-${p.id}`}
                x1={p.x * 10}
                y1={p.y * 6.5}
                x2={(p.x + (p.speedKmH > 15 ? 4 : 2)) * 10}
                y2={(p.y + (p.id % 2 === 0 ? 2 : -2)) * 6.5}
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeDasharray="4,2"
              />
            ))}
          </g>
        )}

        {/* OPPONENT PLAYERS (ZAMALEK - WHITE & DARK SLATE) */}
        {showOpponent && frame.awayPlayers.map(p => (
          <g key={`away-${p.id}`} className="cursor-pointer" onClick={() => handlePlayerClick(p)}>
            <circle cx={p.x * 10} cy={p.y * 6.5} r="14" fill="#1E293B" stroke="#FFFFFF" strokeWidth="2.5" />
            <text x={p.x * 10} y={p.y * 6.5 + 4} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
              {p.number}
            </text>
          </g>
        ))}

        {/* HOME PLAYERS (AL AHLY - SOLID RED CIRCLE WITH WHITE NUMBER) */}
        {overlayMode !== 'expected-state' && frame.homePlayers.map(p => {
          const isSelected = selectedPlayer?.id === p.id;
          return (
            <g key={`home-${p.id}`} className="cursor-pointer transition-transform hover:scale-125" onClick={() => handlePlayerClick(p)}>
              {isSelected && (
                <circle cx={p.x * 10} cy={p.y * 6.5} r="22" fill="none" stroke="#FACC15" strokeWidth="3" className="animate-pulse" />
              )}
              <circle cx={p.x * 10} cy={p.y * 6.5} r="15" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2.5" />
              <text x={p.x * 10} y={p.y * 6.5 + 4} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                {p.number}
              </text>
            </g>
          );
        })}

        {/* BALL MARKER */}
        <g>
          <circle cx={frame.ball.x * 10} cy={frame.ball.y * 6.5} r="8" fill="#FACC15" stroke="#000000" strokeWidth="2" />
          <circle cx={frame.ball.x * 10} cy={frame.ball.y * 6.5} r="14" fill="none" stroke="#FACC15" strokeWidth="1.5" className="animate-ping" opacity="0.7" />
        </g>
      </svg>

      {/* SELECTED PLAYER TELEMETRY CARD */}
      {selectedPlayer && (
        <div className="absolute top-4 right-4 w-64 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-xl z-20 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <div className="text-xs text-[#1F9D55] font-semibold">Player #{selectedPlayer.number}</div>
              <div className="text-sm font-bold text-slate-900">{selectedPlayer.name}</div>
            </div>
            <button
              onClick={() => setSelectedPlayer(null)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-sans">
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Position</span>
              <span className="text-slate-800 font-semibold">{selectedPlayer.position}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Speed</span>
              <span className="text-[#188245] font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#1F9D55]" /> {selectedPlayer.speedKmH} km/h
              </span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Distance</span>
              <span className="text-slate-800 font-semibold">{selectedPlayer.distanceKm} km</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">High Intensity</span>
              <span className="text-slate-800 font-semibold">{selectedPlayer.highIntensityKm} km</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs bg-[#E8F5EE] text-[#188245] p-2 rounded-xl border border-emerald-100">
            <MapPin className="w-3.5 h-3.5 text-[#1F9D55] shrink-0" />
            <span>Zone: <strong>{selectedPlayer.currentZone}</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
