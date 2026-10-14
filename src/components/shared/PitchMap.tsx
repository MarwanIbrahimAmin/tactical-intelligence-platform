import React from 'react';
import { PitchFrame, PlayerCoordinate } from '../../types/tactical';

interface PitchMapProps {
  frame: PitchFrame;
  showOpponent?: boolean;
  showCompactness?: boolean;
  showLines?: boolean;
  highlightPlayerId?: number;
  width?: string;
  heatmapPoints?: { x: number; y: number; intensity: number }[];
}

export const PitchMap: React.FC<PitchMapProps> = ({
  frame,
  showOpponent = true,
  showCompactness = false,
  showLines = false,
  highlightPlayerId,
  width = '100%',
  heatmapPoints,
}) => {
  const getConvexHull = (players: { x: number; y: number }[]) => {
    const points = players.map(p => ({ x: p.x, y: p.y }));
    if (points.length < 3) return points;
    let pivot = points[0];
    for (const p of points) {
      if (p.y < pivot.y || (p.y === pivot.y && p.x < pivot.x)) pivot = p;
    }
    const sorted = points.filter(p => p !== pivot).sort((a, b) =>
      Math.atan2(a.y - pivot.y, a.x - pivot.x) - Math.atan2(b.y - pivot.y, b.x - pivot.x)
    );
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
  const polygonStr = hullPoints.map(p => `${p.x * 10},${p.y * 6.5}`).join(' ');

  return (
    <div style={{
      width,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--border-default)',
      boxShadow: 'var(--shadow-md)',
    }}>
      <svg
        viewBox="0 0 1050 650"
        style={{ width: '100%', height: 'auto', display: 'block', background: '#1A5C3A' }}
      >
        {/* Grass stripes */}
        <defs>
          <pattern id="grassStripes" patternUnits="userSpaceOnUse" width="131" height="650">
            <rect width="65.5" height="650" fill="#1A5C3A" />
            <rect x="65.5" width="65.5" height="650" fill="#17523A" />
          </pattern>
        </defs>
        <rect width="1050" height="650" fill="url(#grassStripes)" />

        {/* Field markings */}
        <rect x="25" y="25" width="1000" height="600" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <line x1="525" y1="25" x2="525" y2="625" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <circle cx="525" cy="325" r="91.5" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <circle cx="525" cy="325" r="3.5" fill="rgba(255,255,255,0.7)" />

        {/* Penalty areas */}
        <rect x="25" y="138.5" width="165" height="373" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <rect x="25" y="230" width="55" height="190" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <circle cx="135" cy="325" r="3" fill="rgba(255,255,255,0.7)" />
        <path d="M 190 262 A 91.5 91.5 0 0 1 190 388" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <rect x="860" y="138.5" width="165" height="373" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <rect x="970" y="230" width="55" height="190" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <circle cx="915" cy="325" r="3" fill="rgba(255,255,255,0.7)" />
        <path d="M 860 262 A 91.5 91.5 0 0 0 860 388" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />

        {/* Goals */}
        <rect x="5" y="270" width="20" height="110" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <rect x="1025" y="270" width="20" height="110" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />

        {/* Corner arcs */}
        <path d="M 25 35 A 10 10 0 0 0 35 25" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <path d="M 25 615 A 10 10 0 0 1 35 625" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <path d="M 1025 35 A 10 10 0 0 1 1015 25" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <path d="M 1025 615 A 10 10 0 0 0 1015 625" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />

        {/* Heatmap overlay */}
        {heatmapPoints && heatmapPoints.map((pt, i) => (
          <circle
            key={`heat-${i}`}
            cx={pt.x * 10}
            cy={pt.y * 6.5}
            r={60 + pt.intensity * 40}
            fill={`rgba(184, 240, 90, ${pt.intensity * 0.3})`}
            style={{ filter: 'blur(8px)' }}
          />
        ))}

        {/* Compactness hull */}
        {showCompactness && (
          <g>
            <polygon
              points={polygonStr}
              fill="rgba(184, 240, 90, 0.1)"
              stroke="rgba(184, 240, 90, 0.6)"
              strokeWidth="2"
              strokeDasharray="6,4"
            />
            <circle cx={frame.centroid.x * 10} cy={frame.centroid.y * 6.5} r="7" fill="#B8F05A" opacity={0.9} />
            <text
              x={frame.centroid.x * 10 + 12}
              y={frame.centroid.y * 6.5 - 10}
              fill="#B8F05A"
              fontSize="12"
              fontWeight="bold"
              fontFamily="Inter, sans-serif"
            >
              {frame.compactnessAreaM2} m²
            </text>
          </g>
        )}

        {/* Defensive / attacking lines */}
        {showLines && (
          <g>
            <line
              x1={frame.defensiveLineM * 10} y1="25"
              x2={frame.defensiveLineM * 10} y2="625"
              stroke="#F2B84B" strokeWidth="2" strokeDasharray="8,4"
            />
            <text x={frame.defensiveLineM * 10 + 6} y="48" fill="#F2B84B" fontSize="12" fontWeight="bold" fontFamily="Barlow, sans-serif">
              Def {frame.defensiveLineM.toFixed(0)}m
            </text>
            <line
              x1={frame.attackingLineM * 10} y1="25"
              x2={frame.attackingLineM * 10} y2="625"
              stroke="#B8F05A" strokeWidth="2" strokeDasharray="8,4"
            />
            <text x={frame.attackingLineM * 10 - 85} y="48" fill="#B8F05A" fontSize="12" fontWeight="bold" fontFamily="Barlow, sans-serif">
              Att {frame.attackingLineM.toFixed(0)}m
            </text>
          </g>
        )}

        {/* Opponent players */}
        {showOpponent && frame.awayPlayers.map(p => (
          <g key={`away-${p.id}`}>
            <circle cx={p.x * 10} cy={p.y * 6.5} r="14" fill="#F4F6F3" stroke="#8A98A5" strokeWidth="2" />
            <text x={p.x * 10} y={p.y * 6.5 + 4.5} textAnchor="middle" fill="#101820" fontSize="10" fontWeight="bold" fontFamily="Barlow, sans-serif">
              {p.number}
            </text>
          </g>
        ))}

        {/* Home players — Tactical Lime for highlighted, Pitch Green for others */}
        {frame.homePlayers.map(p => {
          const isHighlighted = highlightPlayerId === p.id;
          return (
            <g key={`home-${p.id}`}>
              {isHighlighted && (
                <circle cx={p.x * 10} cy={p.y * 6.5} r="22" fill="none" stroke="#B8F05A" strokeWidth="3" opacity={0.8}>
                  <animate attributeName="r" values="19;24;19" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={p.x * 10}
                cy={p.y * 6.5}
                r="14"
                fill={isHighlighted ? '#B8F05A' : '#1F6B45'}
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={p.x * 10}
                y={p.y * 6.5 + 4.5}
                textAnchor="middle"
                fill={isHighlighted ? '#101820' : 'white'}
                fontSize="10"
                fontWeight="bold"
                fontFamily="Barlow, sans-serif"
              >
                {p.number}
              </text>
            </g>
          );
        })}

        {/* Ball */}
        <circle cx={frame.ball.x * 10} cy={frame.ball.y * 6.5} r="8" fill="#B8F05A" stroke="#101820" strokeWidth="2.5" />
      </svg>
    </div>
  );
};
