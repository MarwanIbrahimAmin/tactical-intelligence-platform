/**
 * Simplified simulation engine adapter.
 * Wraps the existing deterministic match state engine to produce
 * PitchFrame objects matching the new type definitions.
 * 
 * In production this would come from the actual tracking pipeline.
 * Demo data is simulated from 13 hand-crafted keyframes.
 */

import { PitchFrame, PlayerCoordinate, PhaseKey } from '../types/tactical';

// ─── Player Roster Definitions ───

const HOME_ROSTER = [
  { id: 1, name: 'Mostafa', number: 1, position: 'Goalkeeper' },
  { id: 2, name: 'Tarek', number: 2, position: 'Right Back' },
  { id: 3, name: 'Abdelrahman', number: 4, position: 'Centre Back' },
  { id: 4, name: 'Kareem', number: 5, position: 'Centre Back' },
  { id: 5, name: 'Youssef', number: 3, position: 'Left Back' },
  { id: 6, name: 'Marwan', number: 6, position: 'Defensive Midfielder' },
  { id: 7, name: 'Ahmed', number: 8, position: 'Central Midfielder' },
  { id: 8, name: 'Ziad', number: 10, position: 'Attacking Midfielder' },
  { id: 9, name: 'Hamza', number: 7, position: 'Right Winger' },
  { id: 10, name: 'Omar', number: 9, position: 'Centre Forward' },
  { id: 11, name: 'Mahmoud', number: 11, position: 'Left Winger' },
];

const AWAY_ROSTER = [
  { id: 21, name: 'Sobhy', number: 16, position: 'Goalkeeper' },
  { id: 22, name: 'Hossam', number: 12, position: 'Right Back' },
  { id: 23, name: 'El-Wensh', number: 14, position: 'Centre Back' },
  { id: 24, name: 'Alaa', number: 15, position: 'Centre Back' },
  { id: 25, name: 'Fattoh', number: 13, position: 'Left Back' },
  { id: 26, name: 'Nabil', number: 18, position: 'Defensive Midfielder' },
  { id: 27, name: 'Raoof', number: 20, position: 'Central Midfielder' },
  { id: 28, name: 'Zizo', number: 17, position: 'Right Winger' },
  { id: 29, name: 'Shikabala', number: 22, position: 'Attacking Midfielder' },
  { id: 30, name: 'Jaziri', number: 19, position: 'Centre Forward' },
  { id: 31, name: 'Shalaby', number: 21, position: 'Left Winger' },
];

// ─── Keyframe Data ───

interface Keyframe {
  timeSec: number;
  timestamp: string;
  phaseKey: PhaseKey;
  phaseLabel: string;
  ball: { x: number; y: number };
  homePositions: { id: number; x: number; y: number; speed: number; zone: string }[];
  awayPositions: { id: number; x: number; y: number; speed: number; zone: string }[];
}

const KEYFRAMES: Keyframe[] = [
  {
    timeSec: 0, timestamp: '00:00', phaseKey: 'build_up', phaseLabel: 'Kickoff',
    ball: { x: 50, y: 50 },
    homePositions: [
      { id: 1, x: 5, y: 50, speed: 2, zone: 'Penalty Area' },
      { id: 2, x: 25, y: 15, speed: 8, zone: 'Right Flank' },
      { id: 3, x: 22, y: 38, speed: 5, zone: 'Defensive Third' },
      { id: 4, x: 22, y: 62, speed: 5, zone: 'Defensive Third' },
      { id: 5, x: 25, y: 85, speed: 8, zone: 'Left Flank' },
      { id: 6, x: 38, y: 50, speed: 10, zone: 'Defensive Midfield' },
      { id: 7, x: 45, y: 35, speed: 12, zone: 'Central Midfield' },
      { id: 8, x: 48, y: 65, speed: 12, zone: 'Central Midfield' },
      { id: 9, x: 49, y: 15, speed: 14, zone: 'Right Wing' },
      { id: 10, x: 50, y: 50, speed: 15, zone: 'Centre Circle' },
      { id: 11, x: 49, y: 85, speed: 15, zone: 'Left Wing' },
    ],
    awayPositions: [
      { id: 21, x: 95, y: 50, speed: 2, zone: 'Penalty Area' },
      { id: 22, x: 75, y: 85, speed: 8, zone: 'Right Flank' },
      { id: 23, x: 78, y: 62, speed: 5, zone: 'Defensive Third' },
      { id: 24, x: 78, y: 38, speed: 5, zone: 'Defensive Third' },
      { id: 25, x: 75, y: 15, speed: 8, zone: 'Left Flank' },
      { id: 26, x: 62, y: 50, speed: 10, zone: 'Central Midfield' },
      { id: 27, x: 55, y: 65, speed: 11, zone: 'Central Midfield' },
      { id: 28, x: 52, y: 85, speed: 13, zone: 'Right Wing' },
      { id: 29, x: 55, y: 35, speed: 11, zone: 'Attacking Third' },
      { id: 30, x: 51, y: 50, speed: 14, zone: 'Centre Circle' },
      { id: 31, x: 52, y: 15, speed: 14, zone: 'Left Wing' },
    ],
  },
  {
    timeSec: 1394, timestamp: '23:14', phaseKey: 'defensive_transition', phaseLabel: 'Defensive Transition',
    ball: { x: 48, y: 44 },
    homePositions: [
      { id: 1, x: 8, y: 50, speed: 4, zone: 'Penalty Area' },
      { id: 2, x: 52, y: 8, speed: 19, zone: 'Right Flank' },
      { id: 3, x: 22, y: 35, speed: 12, zone: 'Defensive Third' },
      { id: 4, x: 24, y: 65, speed: 12, zone: 'Defensive Third' },
      { id: 5, x: 54, y: 92, speed: 19, zone: 'Left Flank' },
      { id: 6, x: 48, y: 50, speed: 17, zone: 'Central Midfield' },
      { id: 7, x: 58, y: 28, speed: 15, zone: 'Central Midfield' },
      { id: 8, x: 64, y: 72, speed: 16, zone: 'Central Midfield' },
      { id: 9, x: 76, y: 6, speed: 20, zone: 'Right Wing' },
      { id: 10, x: 80, y: 50, speed: 17, zone: 'Attacking Third' },
      { id: 11, x: 75, y: 94, speed: 22, zone: 'Left Wing' },
    ],
    awayPositions: [
      { id: 21, x: 92, y: 50, speed: 3, zone: 'Penalty Area' },
      { id: 22, x: 72, y: 82, speed: 12, zone: 'Right Flank' },
      { id: 23, x: 78, y: 60, speed: 10, zone: 'Defensive Third' },
      { id: 24, x: 77, y: 40, speed: 10, zone: 'Defensive Third' },
      { id: 25, x: 70, y: 18, speed: 13, zone: 'Left Flank' },
      { id: 26, x: 58, y: 50, speed: 14, zone: 'Central Midfield' },
      { id: 27, x: 48, y: 35, speed: 16, zone: 'Central Midfield' },
      { id: 28, x: 38, y: 86, speed: 22, zone: 'Right Wing' },
      { id: 29, x: 42, y: 50, speed: 17, zone: 'Attacking Third' },
      { id: 30, x: 32, y: 50, speed: 20, zone: 'Penalty Area' },
      { id: 31, x: 38, y: 14, speed: 21, zone: 'Left Wing' },
    ],
  },
  {
    timeSec: 2700, timestamp: '45:00', phaseKey: 'attacking', phaseLabel: 'Halftime',
    ball: { x: 50, y: 50 },
    homePositions: [
      { id: 1, x: 8, y: 50, speed: 3, zone: 'Penalty Area' },
      { id: 2, x: 40, y: 14, speed: 11, zone: 'Right Flank' },
      { id: 3, x: 28, y: 38, speed: 7, zone: 'Defensive Third' },
      { id: 4, x: 28, y: 62, speed: 7, zone: 'Defensive Third' },
      { id: 5, x: 40, y: 86, speed: 12, zone: 'Left Flank' },
      { id: 6, x: 44, y: 50, speed: 11, zone: 'Central Midfield' },
      { id: 7, x: 54, y: 36, speed: 12, zone: 'Central Midfield' },
      { id: 8, x: 56, y: 64, speed: 12, zone: 'Central Midfield' },
      { id: 9, x: 68, y: 12, speed: 16, zone: 'Right Wing' },
      { id: 10, x: 74, y: 50, speed: 15, zone: 'Attacking Third' },
      { id: 11, x: 68, y: 88, speed: 16, zone: 'Left Wing' },
    ],
    awayPositions: [
      { id: 21, x: 94, y: 50, speed: 2, zone: 'Penalty Area' },
      { id: 22, x: 75, y: 82, speed: 9, zone: 'Right Flank' },
      { id: 23, x: 78, y: 60, speed: 7, zone: 'Defensive Third' },
      { id: 24, x: 78, y: 40, speed: 7, zone: 'Defensive Third' },
      { id: 25, x: 75, y: 18, speed: 9, zone: 'Left Flank' },
      { id: 26, x: 62, y: 50, speed: 10, zone: 'Central Midfield' },
      { id: 27, x: 58, y: 65, speed: 11, zone: 'Central Midfield' },
      { id: 28, x: 48, y: 85, speed: 14, zone: 'Right Wing' },
      { id: 29, x: 52, y: 35, speed: 12, zone: 'Attacking Third' },
      { id: 30, x: 42, y: 50, speed: 13, zone: 'Central Midfield' },
      { id: 31, x: 48, y: 15, speed: 14, zone: 'Left Wing' },
    ],
  },
  {
    timeSec: 2887, timestamp: '48:07', phaseKey: 'pressing', phaseLabel: 'High-Block Press',
    ball: { x: 76, y: 25 },
    homePositions: [
      { id: 1, x: 18, y: 50, speed: 5, zone: 'Penalty Area' },
      { id: 2, x: 52, y: 12, speed: 18, zone: 'Right Flank' },
      { id: 3, x: 45, y: 38, speed: 14, zone: 'Central Midfield' },
      { id: 4, x: 45, y: 62, speed: 14, zone: 'Central Midfield' },
      { id: 5, x: 52, y: 88, speed: 19, zone: 'Left Flank' },
      { id: 6, x: 62, y: 50, speed: 18, zone: 'Central Midfield' },
      { id: 7, x: 72, y: 28, speed: 21, zone: 'Attacking Third' },
      { id: 8, x: 74, y: 68, speed: 21, zone: 'Attacking Third' },
      { id: 9, x: 82, y: 15, speed: 25, zone: 'Opponent Box' },
      { id: 10, x: 85, y: 45, speed: 23, zone: 'Opponent Box' },
      { id: 11, x: 82, y: 85, speed: 25, zone: 'Opponent Box' },
    ],
    awayPositions: [
      { id: 21, x: 92, y: 50, speed: 5, zone: 'Penalty Area' },
      { id: 22, x: 82, y: 82, speed: 14, zone: 'Penalty Area' },
      { id: 23, x: 80, y: 60, speed: 13, zone: 'Defensive Third' },
      { id: 24, x: 80, y: 40, speed: 12, zone: 'Defensive Third' },
      { id: 25, x: 82, y: 18, speed: 15, zone: 'Penalty Area' },
      { id: 26, x: 72, y: 50, speed: 16, zone: 'Defensive Third' },
      { id: 27, x: 68, y: 65, speed: 15, zone: 'Central Midfield' },
      { id: 28, x: 55, y: 85, speed: 14, zone: 'Right Wing' },
      { id: 29, x: 60, y: 35, speed: 14, zone: 'Central Midfield' },
      { id: 30, x: 48, y: 50, speed: 12, zone: 'Centre Circle' },
      { id: 31, x: 55, y: 15, speed: 14, zone: 'Left Wing' },
    ],
  },
  {
    timeSec: 3271, timestamp: '54:31', phaseKey: 'attacking', phaseLabel: 'Wide Attacking Progression',
    ball: { x: 70, y: 88 },
    homePositions: [
      { id: 1, x: 10, y: 50, speed: 3, zone: 'Penalty Area' },
      { id: 2, x: 58, y: 6, speed: 19, zone: 'Right Touchline' },
      { id: 3, x: 38, y: 38, speed: 10, zone: 'Defensive Third' },
      { id: 4, x: 38, y: 62, speed: 9, zone: 'Defensive Third' },
      { id: 5, x: 58, y: 94, speed: 20, zone: 'Left Touchline' },
      { id: 6, x: 52, y: 50, speed: 13, zone: 'Central Midfield' },
      { id: 7, x: 64, y: 30, speed: 16, zone: 'Attacking Half-Space' },
      { id: 8, x: 66, y: 70, speed: 16, zone: 'Attacking Half-Space' },
      { id: 9, x: 80, y: 4, speed: 23, zone: 'Right Corner' },
      { id: 10, x: 84, y: 50, speed: 20, zone: 'Penalty Area' },
      { id: 11, x: 80, y: 96, speed: 24, zone: 'Left Corner' },
    ],
    awayPositions: [
      { id: 21, x: 94, y: 50, speed: 2, zone: 'Penalty Area' },
      { id: 22, x: 82, y: 84, speed: 13, zone: 'Penalty Area' },
      { id: 23, x: 85, y: 60, speed: 10, zone: 'Defensive Third' },
      { id: 24, x: 85, y: 40, speed: 10, zone: 'Defensive Third' },
      { id: 25, x: 82, y: 16, speed: 14, zone: 'Penalty Area' },
      { id: 26, x: 72, y: 50, speed: 12, zone: 'Central Midfield' },
      { id: 27, x: 68, y: 65, speed: 12, zone: 'Central Midfield' },
      { id: 28, x: 58, y: 86, speed: 15, zone: 'Right Wing' },
      { id: 29, x: 62, y: 35, speed: 13, zone: 'Attacking Third' },
      { id: 30, x: 50, y: 50, speed: 11, zone: 'Centre Circle' },
      { id: 31, x: 58, y: 14, speed: 14, zone: 'Left Wing' },
    ],
  },
  {
    timeSec: 4051, timestamp: '67:31', phaseKey: 'defensive', phaseLabel: 'Defensive Line Drop',
    ball: { x: 38, y: 52 },
    homePositions: [
      { id: 1, x: 6, y: 50, speed: 4, zone: 'Penalty Area' },
      { id: 2, x: 18, y: 15, speed: 15, zone: 'Defensive Third' },
      { id: 3, x: 15, y: 38, speed: 12, zone: 'Penalty Area' },
      { id: 4, x: 15, y: 62, speed: 12, zone: 'Penalty Area' },
      { id: 5, x: 18, y: 85, speed: 15, zone: 'Defensive Third' },
      { id: 6, x: 42, y: 50, speed: 17, zone: 'Central Midfield' },
      { id: 7, x: 48, y: 35, speed: 15, zone: 'Central Midfield' },
      { id: 8, x: 50, y: 65, speed: 16, zone: 'Central Midfield' },
      { id: 9, x: 62, y: 15, speed: 18, zone: 'Right Wing' },
      { id: 10, x: 68, y: 50, speed: 16, zone: 'Attacking Third' },
      { id: 11, x: 62, y: 85, speed: 18, zone: 'Left Wing' },
    ],
    awayPositions: [
      { id: 21, x: 94, y: 50, speed: 2, zone: 'Penalty Area' },
      { id: 22, x: 65, y: 82, speed: 12, zone: 'Right Flank' },
      { id: 23, x: 72, y: 60, speed: 9, zone: 'Defensive Third' },
      { id: 24, x: 72, y: 40, speed: 9, zone: 'Defensive Third' },
      { id: 25, x: 65, y: 18, speed: 13, zone: 'Left Flank' },
      { id: 26, x: 52, y: 50, speed: 14, zone: 'Central Midfield' },
      { id: 27, x: 40, y: 45, speed: 19, zone: 'Central Pocket' },
      { id: 28, x: 32, y: 85, speed: 21, zone: 'Right Wing' },
      { id: 29, x: 30, y: 50, speed: 22, zone: 'Attacking Third' },
      { id: 30, x: 22, y: 50, speed: 24, zone: 'Penalty Area' },
      { id: 31, x: 32, y: 15, speed: 22, zone: 'Left Wing' },
    ],
  },
  {
    timeSec: 5400, timestamp: '90:00', phaseKey: 'defensive', phaseLabel: 'Final Block',
    ball: { x: 35, y: 50 },
    homePositions: [
      { id: 1, x: 5, y: 50, speed: 2, zone: 'Penalty Area' },
      { id: 2, x: 24, y: 20, speed: 8, zone: 'Defensive Third' },
      { id: 3, x: 20, y: 40, speed: 6, zone: 'Penalty Area' },
      { id: 4, x: 20, y: 60, speed: 6, zone: 'Penalty Area' },
      { id: 5, x: 24, y: 80, speed: 8, zone: 'Defensive Third' },
      { id: 6, x: 30, y: 50, speed: 10, zone: 'Defensive Midfield' },
      { id: 7, x: 34, y: 35, speed: 10, zone: 'Defensive Third' },
      { id: 8, x: 34, y: 65, speed: 10, zone: 'Defensive Third' },
      { id: 9, x: 40, y: 15, speed: 12, zone: 'Central Midfield' },
      { id: 10, x: 45, y: 50, speed: 11, zone: 'Centre Circle' },
      { id: 11, x: 40, y: 85, speed: 12, zone: 'Central Midfield' },
    ],
    awayPositions: [
      { id: 21, x: 92, y: 50, speed: 2, zone: 'Penalty Area' },
      { id: 22, x: 50, y: 84, speed: 10, zone: 'Right Flank' },
      { id: 23, x: 60, y: 60, speed: 7, zone: 'Central Midfield' },
      { id: 24, x: 60, y: 40, speed: 7, zone: 'Central Midfield' },
      { id: 25, x: 50, y: 16, speed: 11, zone: 'Left Flank' },
      { id: 26, x: 42, y: 50, speed: 11, zone: 'Central Midfield' },
      { id: 27, x: 38, y: 65, speed: 13, zone: 'Attacking Third' },
      { id: 28, x: 32, y: 86, speed: 15, zone: 'Right Wing' },
      { id: 29, x: 35, y: 35, speed: 13, zone: 'Attacking Third' },
      { id: 30, x: 28, y: 50, speed: 16, zone: 'Penalty Area' },
      { id: 31, x: 32, y: 14, speed: 15, zone: 'Left Wing' },
    ],
  },
];

// ─── Convex Hull Area ───

function calculateCompactnessArea(players: { x: number; y: number }[]): number {
  if (players.length < 3) return 200;
  const pts = players.map(p => ({ x: (p.x / 100) * 105, y: (p.y / 100) * 68 }));

  let pivot = pts[0];
  for (const p of pts) {
    if (p.y < pivot.y || (p.y === pivot.y && p.x < pivot.x)) pivot = p;
  }
  const sorted = pts.filter(p => p !== pivot).sort((a, b) =>
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

  let area = 0;
  for (let i = 0; i < hull.length; i++) {
    const j = (i + 1) % hull.length;
    area += hull[i].x * hull[j].y;
    area -= hull[j].x * hull[i].y;
  }
  return Math.round(Math.abs(area) / 2);
}

// ─── Interpolation Engine ───

export function getFrameAtTime(timeSec: number): PitchFrame {
  const clamped = Math.max(0, Math.min(5400, timeSec));

  // Find bounding keyframes
  let kA = KEYFRAMES[0];
  let kB = KEYFRAMES[KEYFRAMES.length - 1];

  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (clamped >= KEYFRAMES[i].timeSec && clamped <= KEYFRAMES[i + 1].timeSec) {
      kA = KEYFRAMES[i];
      kB = KEYFRAMES[i + 1];
      break;
    }
  }

  const duration = kB.timeSec - kA.timeSec;
  const t = duration > 0 ? (clamped - kA.timeSec) / duration : 0;
  const st = t * t * (3 - 2 * t); // smooth ease

  // Interpolate home players
  const homePlayers: PlayerCoordinate[] = HOME_ROSTER.map((meta, idx) => {
    const posA = kA.homePositions[idx] || kA.homePositions[0];
    const posB = kB.homePositions[idx] || kB.homePositions[0];
    return {
      id: meta.id,
      name: meta.name,
      number: meta.number,
      position: meta.position,
      team: 'home' as const,
      x: Number((posA.x + st * (posB.x - posA.x)).toFixed(1)),
      y: Number((posA.y + st * (posB.y - posA.y)).toFixed(1)),
      speedKmH: Number((posA.speed + st * (posB.speed - posA.speed)).toFixed(1)),
      currentZone: posB.zone,
    };
  });

  // Interpolate away players
  const awayPlayers: PlayerCoordinate[] = AWAY_ROSTER.map((meta, idx) => {
    const posA = kA.awayPositions[idx] || kA.awayPositions[0];
    const posB = kB.awayPositions[idx] || kB.awayPositions[0];
    return {
      id: meta.id,
      name: meta.name,
      number: meta.number,
      position: meta.position,
      team: 'away' as const,
      x: Number((posA.x + st * (posB.x - posA.x)).toFixed(1)),
      y: Number((posA.y + st * (posB.y - posA.y)).toFixed(1)),
      speedKmH: Number((posA.speed + st * (posB.speed - posA.speed)).toFixed(1)),
      currentZone: posB.zone,
    };
  });

  // Ball
  const ball = {
    x: Number((kA.ball.x + st * (kB.ball.x - kA.ball.x)).toFixed(1)),
    y: Number((kA.ball.y + st * (kB.ball.y - kA.ball.y)).toFixed(1)),
  };

  // Metrics
  const outfield = homePlayers.filter(p => p.position !== 'Goalkeeper');
  const compactnessAreaM2 = calculateCompactnessArea(outfield);

  const xs = outfield.map(p => p.x);
  const ys = outfield.map(p => p.y);
  const teamWidthM = Number(((Math.max(...ys) - Math.min(...ys)) * 0.68).toFixed(1));
  const teamDepthM = Number(((Math.max(...xs) - Math.min(...xs)) * 1.05).toFixed(1));
  const defensiveLineM = Number((Math.min(...xs) * 1.05).toFixed(1));
  const attackingLineM = Number((Math.max(...xs) * 1.05).toFixed(1));

  const centroid = {
    x: Number((homePlayers.reduce((a, p) => a + p.x, 0) / homePlayers.length).toFixed(1)),
    y: Number((homePlayers.reduce((a, p) => a + p.y, 0) / homePlayers.length).toFixed(1)),
  };

  const mins = Math.floor(clamped / 60);
  const secs = Math.floor(clamped % 60);
  const timestamp = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return {
    timestamp,
    timeSec: clamped,
    phaseLabel: kA.phaseLabel,
    phaseKey: kA.phaseKey,
    ball,
    homePlayers,
    awayPlayers,
    compactnessAreaM2,
    teamWidthM,
    teamDepthM,
    defensiveLineM,
    attackingLineM,
    centroid,
  };
}
