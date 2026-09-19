import { PitchFrame, PlayerCoordinate, ExpectedState, TacticalDeviation, FeatureFusionVector } from '../types/tactical';

export interface KeyframeData {
  timeSec: number;
  timestamp: string;
  phaseKey: 'build_up' | 'attacking' | 'defensive' | 'defensive_transition' | 'attacking_transition' | 'pressing';
  phaseLabel: string;
  title: string;
  description: string;
  ball: { x: number; y: number };
  homePositions: { id: number; x: number; y: number; speed: number; zone: string }[];
  awayPositions: { id: number; x: number; y: number; speed: number; zone: string }[];
  expectedMetrics: { width: number; depth: number; compactness: number; lineSpacing: number };
}

// Player Roster Baseline Definitions
const HOME_ROSTER = [
  { id: 1, name: 'Mostafa (GK)', number: 1, position: 'Goalkeeper' },
  { id: 2, name: 'Tarek (RB)', number: 2, position: 'Right Back' },
  { id: 3, name: 'Abdelrahman (CB)', number: 4, position: 'Center Back' },
  { id: 4, name: 'Kareem (CB)', number: 5, position: 'Center Back' },
  { id: 5, name: 'Youssef (LB)', number: 3, position: 'Left Back' },
  { id: 6, name: 'Marwan (DM)', number: 6, position: 'Defensive Midfielder' },
  { id: 7, name: 'Ahmed (CM)', number: 8, position: 'Central Midfielder' },
  { id: 8, name: 'Ziad (AM)', number: 10, position: 'Attacking Midfielder' },
  { id: 9, name: 'Hamza (RW)', number: 7, position: 'Right Winger' },
  { id: 10, name: 'Omar (CF)', number: 9, position: 'Center Forward' },
  { id: 11, name: 'Mahmoud (LW)', number: 11, position: 'Left Winger' }
];

const AWAY_ROSTER = [
  { id: 21, name: 'Sobhy (GK)', number: 16, position: 'Goalkeeper' },
  { id: 22, name: 'Hossam (RB)', number: 12, position: 'Right Back' },
  { id: 23, name: 'El-Wensh (CB)', number: 14, position: 'Center Back' },
  { id: 24, name: 'Alaa (CB)', number: 15, position: 'Center Back' },
  { id: 25, name: 'Fattoh (LB)', number: 13, position: 'Left Back' },
  { id: 26, name: 'Nabil (DM)', number: 18, position: 'Defensive Midfielder' },
  { id: 27, name: 'Raoof (CM)', number: 20, position: 'Central Midfielder' },
  { id: 28, name: 'Zizo (RW)', number: 17, position: 'Right Winger' },
  { id: 29, name: 'Shikabala (AM)', number: 22, position: 'Attacking Midfielder' },
  { id: 30, name: 'Jaziri (CF)', number: 19, position: 'Center Forward' },
  { id: 31, name: 'Shalaby (LW)', number: 21, position: 'Left Winger' }
];

// 13 Deterministic Match Keyframes across 90 Mins (5400s)
export const MATCH_KEYFRAMES: KeyframeData[] = [
  // 1. Kickoff (00:00)
  {
    timeSec: 0,
    timestamp: '00:00',
    phaseKey: 'build_up',
    phaseLabel: 'Kickoff & Initial Organization',
    title: 'Match Kickoff',
    description: 'Teams organized in standard 4-3-3 starting shape.',
    ball: { x: 50, y: 50 },
    homePositions: [
      { id: 1, x: 5, y: 50, speed: 2.1, zone: 'Penalty Area' },
      { id: 2, x: 25, y: 15, speed: 8.2, zone: 'Right Flank' },
      { id: 3, x: 22, y: 38, speed: 5.1, zone: 'Defensive Third' },
      { id: 4, x: 22, y: 62, speed: 5.4, zone: 'Defensive Third' },
      { id: 5, x: 25, y: 85, speed: 8.5, zone: 'Left Flank' },
      { id: 6, x: 38, y: 50, speed: 10.2, zone: 'Defensive Midfield' },
      { id: 7, x: 45, y: 35, speed: 11.5, zone: 'Central Midfield' },
      { id: 8, x: 48, y: 65, speed: 12.0, zone: 'Central Midfield' },
      { id: 9, x: 49, y: 15, speed: 14.1, zone: 'Right Wing' },
      { id: 10, x: 50, y: 50, speed: 15.2, zone: 'Center Circle' },
      { id: 11, x: 49, y: 85, speed: 14.5, zone: 'Left Wing' }
    ],
    awayPositions: [
      { id: 21, x: 95, y: 50, speed: 2.0, zone: 'Penalty Area' },
      { id: 22, x: 75, y: 85, speed: 7.5, zone: 'Right Flank' },
      { id: 23, x: 78, y: 62, speed: 5.0, zone: 'Defensive Third' },
      { id: 24, x: 78, y: 38, speed: 4.8, zone: 'Defensive Third' },
      { id: 25, x: 75, y: 15, speed: 7.8, zone: 'Left Flank' },
      { id: 26, x: 62, y: 50, speed: 9.5, zone: 'Central Midfield' },
      { id: 27, x: 55, y: 65, speed: 10.5, zone: 'Central Midfield' },
      { id: 28, x: 52, y: 85, speed: 13.0, zone: 'Right Wing' },
      { id: 29, x: 55, y: 35, speed: 11.2, zone: 'Attacking Third' },
      { id: 30, x: 51, y: 50, speed: 14.0, zone: 'Center Circle' },
      { id: 31, x: 52, y: 15, speed: 13.5, zone: 'Left Wing' }
    ],
    expectedMetrics: { width: 38.0, depth: 30.0, compactness: 230, lineSpacing: 12.0 }
  },

  // 2. Build-Up (08:30)
  {
    timeSec: 510,
    timestamp: '08:30',
    phaseKey: 'build_up',
    phaseLabel: 'Deep Build-Up Phase',
    title: 'Controlled Build-Up',
    description: 'Center-backs split wide; fullbacks advance along touchlines.',
    ball: { x: 28, y: 38 },
    homePositions: [
      { id: 1, x: 8, y: 50, speed: 3.2, zone: 'Penalty Area' },
      { id: 2, x: 38, y: 12, speed: 14.2, zone: 'Right Flank' },
      { id: 3, x: 20, y: 30, speed: 8.5, zone: 'Defensive Third' },
      { id: 4, x: 20, y: 70, speed: 8.2, zone: 'Defensive Third' },
      { id: 5, x: 38, y: 88, speed: 14.8, zone: 'Left Flank' },
      { id: 6, x: 34, y: 50, speed: 11.2, zone: 'Defensive Midfield' },
      { id: 7, x: 48, y: 38, speed: 12.5, zone: 'Central Midfield' },
      { id: 8, x: 52, y: 62, speed: 13.1, zone: 'Central Midfield' },
      { id: 9, x: 65, y: 10, speed: 18.0, zone: 'Right Wing' },
      { id: 10, x: 70, y: 50, speed: 16.5, zone: 'Attacking Third' },
      { id: 11, x: 65, y: 90, speed: 18.2, zone: 'Left Wing' }
    ],
    awayPositions: [
      { id: 21, x: 94, y: 50, speed: 1.8, zone: 'Penalty Area' },
      { id: 22, x: 72, y: 85, speed: 8.0, zone: 'Right Flank' },
      { id: 23, x: 76, y: 60, speed: 6.2, zone: 'Defensive Third' },
      { id: 24, x: 76, y: 40, speed: 6.0, zone: 'Defensive Third' },
      { id: 25, x: 72, y: 15, speed: 8.2, zone: 'Left Flank' },
      { id: 26, x: 60, y: 50, speed: 10.0, zone: 'Central Midfield' },
      { id: 27, x: 52, y: 65, speed: 11.8, zone: 'Central Midfield' },
      { id: 28, x: 45, y: 85, speed: 15.0, zone: 'Right Wing' },
      { id: 29, x: 48, y: 35, speed: 12.0, zone: 'Attacking Third' },
      { id: 30, x: 40, y: 50, speed: 16.0, zone: 'Defensive Midfield' },
      { id: 31, x: 45, y: 15, speed: 14.8, zone: 'Left Wing' }
    ],
    expectedMetrics: { width: 38.4, depth: 32.1, compactness: 245, lineSpacing: 11.2 }
  },

  // 3. Attacking Possession (16:20)
  {
    timeSec: 980,
    timestamp: '16:20',
    phaseKey: 'attacking',
    phaseLabel: 'Attacking Possession Phase',
    title: 'High Attacking Structure',
    description: 'Fullbacks pushed high into half-spaces; wingers hugging touchline.',
    ball: { x: 68, y: 75 },
    homePositions: [
      { id: 1, x: 12, y: 50, speed: 3.5, zone: 'Penalty Area' },
      { id: 2, x: 55, y: 14, speed: 16.5, zone: 'Right Flank' },
      { id: 3, x: 38, y: 38, speed: 9.8, zone: 'Central Midfield' },
      { id: 4, x: 38, y: 62, speed: 9.5, zone: 'Central Midfield' },
      { id: 5, x: 58, y: 86, speed: 17.2, zone: 'Left Flank' },
      { id: 6, x: 50, y: 50, speed: 13.0, zone: 'Central Midfield' },
      { id: 7, x: 62, y: 35, speed: 15.5, zone: 'Attacking Half-Space' },
      { id: 8, x: 68, y: 65, speed: 16.0, zone: 'Attacking Half-Space' },
      { id: 9, x: 78, y: 8, speed: 21.0, zone: 'Right Wing' },
      { id: 10, x: 82, y: 50, speed: 19.5, zone: 'Penalty Area' },
      { id: 11, x: 78, y: 92, speed: 22.4, zone: 'Left Wing' }
    ],
    awayPositions: [
      { id: 21, x: 92, y: 50, speed: 2.5, zone: 'Penalty Area' },
      { id: 22, x: 80, y: 82, speed: 11.0, zone: 'Penalty Area' },
      { id: 23, x: 84, y: 60, speed: 9.0, zone: 'Defensive Third' },
      { id: 24, x: 84, y: 40, speed: 8.8, zone: 'Defensive Third' },
      { id: 25, x: 80, y: 18, speed: 11.5, zone: 'Penalty Area' },
      { id: 26, x: 70, y: 50, speed: 12.5, zone: 'Central Midfield' },
      { id: 27, x: 65, y: 65, speed: 13.0, zone: 'Central Midfield' },
      { id: 28, x: 55, y: 86, speed: 16.5, zone: 'Right Wing' },
      { id: 29, x: 58, y: 35, speed: 14.0, zone: 'Attacking Third' },
      { id: 30, x: 45, y: 50, speed: 15.0, zone: 'Central Midfield' },
      { id: 31, x: 55, y: 14, speed: 16.0, zone: 'Left Wing' }
    ],
    expectedMetrics: { width: 44.0, depth: 34.0, compactness: 270, lineSpacing: 13.5 }
  },

  // 4. Defensive Transition / Loss of Compactness (23:14) -> SIGNIFICANT DEVIATION
  {
    timeSec: 1394,
    timestamp: '23:14',
    phaseKey: 'defensive_transition',
    phaseLabel: 'Defensive Transition Phase',
    title: 'Loss of Defensive Compactness',
    description: 'Possession lost in midfield; team structure over-stretched laterally and vertically.',
    ball: { x: 48, y: 44 },
    homePositions: [
      { id: 1, x: 8, y: 50, speed: 4.2, zone: 'Penalty Area' },
      { id: 2, x: 52, y: 8, speed: 18.5, zone: 'Right Flank' },
      { id: 3, x: 22, y: 35, speed: 12.0, zone: 'Defensive Third' },
      { id: 4, x: 24, y: 65, speed: 11.5, zone: 'Defensive Third' },
      { id: 5, x: 54, y: 92, speed: 19.2, zone: 'Left Flank' },
      { id: 6, x: 48, y: 50, speed: 16.8, zone: 'Central Midfield' },
      { id: 7, x: 58, y: 28, speed: 15.4, zone: 'Central Midfield' },
      { id: 8, x: 64, y: 72, speed: 16.0, zone: 'Central Midfield' },
      { id: 9, x: 76, y: 6, speed: 20.1, zone: 'Right Wing' },
      { id: 10, x: 80, y: 50, speed: 17.0, zone: 'Attacking Third' },
      { id: 11, x: 75, y: 94, speed: 21.5, zone: 'Left Wing' }
    ],
    awayPositions: [
      { id: 21, x: 92, y: 50, speed: 3.0, zone: 'Penalty Area' },
      { id: 22, x: 72, y: 82, speed: 12.0, zone: 'Right Flank' },
      { id: 23, x: 78, y: 60, speed: 10.0, zone: 'Defensive Third' },
      { id: 24, x: 77, y: 40, speed: 9.8, zone: 'Defensive Third' },
      { id: 25, x: 70, y: 18, speed: 12.5, zone: 'Left Flank' },
      { id: 26, x: 58, y: 50, speed: 14.0, zone: 'Central Midfield' },
      { id: 27, x: 48, y: 35, speed: 15.5, zone: 'Central Midfield' },
      { id: 28, x: 38, y: 86, speed: 22.0, zone: 'Right Wing' },
      { id: 29, x: 42, y: 50, speed: 16.8, zone: 'Attacking Third' },
      { id: 30, x: 32, y: 50, speed: 20.4, zone: 'Penalty Area' },
      { id: 31, x: 38, y: 14, speed: 21.0, zone: 'Left Wing' }
    ],
    expectedMetrics: { width: 35.0, depth: 28.0, compactness: 221, lineSpacing: 12.0 }
  },

  // 5. Goal / Reset (31:42)
  {
    timeSec: 1902,
    timestamp: '31:42',
    phaseKey: 'attacking',
    phaseLabel: 'Attacking Finishing Phase',
    title: 'Goal! Omar (#9) Finishing Action',
    description: 'Rapid box penetration leading to goal.',
    ball: { x: 88, y: 48 },
    homePositions: [
      { id: 1, x: 10, y: 50, speed: 2.5, zone: 'Penalty Area' },
      { id: 2, x: 45, y: 15, speed: 12.0, zone: 'Right Flank' },
      { id: 3, x: 35, y: 38, speed: 8.0, zone: 'Defensive Third' },
      { id: 4, x: 35, y: 62, speed: 8.2, zone: 'Defensive Third' },
      { id: 5, x: 45, y: 85, speed: 12.4, zone: 'Left Flank' },
      { id: 6, x: 48, y: 50, speed: 11.5, zone: 'Central Midfield' },
      { id: 7, x: 65, y: 35, speed: 16.2, zone: 'Attacking Third' },
      { id: 8, x: 72, y: 60, speed: 17.5, zone: 'Attacking Third' },
      { id: 9, x: 82, y: 20, speed: 22.0, zone: 'Right Wing' },
      { id: 10, x: 88, y: 48, speed: 25.4, zone: 'Penalty Area' },
      { id: 11, x: 80, y: 78, speed: 21.0, zone: 'Penalty Area' }
    ],
    awayPositions: [
      { id: 21, x: 96, y: 50, speed: 4.5, zone: 'Penalty Area' },
      { id: 22, x: 84, y: 78, speed: 15.0, zone: 'Penalty Area' },
      { id: 23, x: 88, y: 58, speed: 14.0, zone: 'Penalty Area' },
      { id: 24, x: 88, y: 42, speed: 14.2, zone: 'Penalty Area' },
      { id: 25, x: 84, y: 22, speed: 15.2, zone: 'Penalty Area' },
      { id: 26, x: 75, y: 50, speed: 13.0, zone: 'Penalty Area' },
      { id: 27, x: 70, y: 65, speed: 12.0, zone: 'Defensive Third' },
      { id: 28, x: 60, y: 85, speed: 11.0, zone: 'Right Wing' },
      { id: 29, x: 65, y: 35, speed: 10.0, zone: 'Central Midfield' },
      { id: 30, x: 55, y: 50, speed: 9.0, zone: 'Center Circle' },
      { id: 31, x: 60, y: 15, speed: 11.2, zone: 'Left Wing' }
    ],
    expectedMetrics: { width: 41.8, depth: 32.6, compactness: 285, lineSpacing: 12.5 }
  },

  // 6. Controlled Possession (40:00)
  {
    timeSec: 2400,
    timestamp: '40:00',
    phaseKey: 'attacking',
    phaseLabel: 'Midfield Circulation',
    title: 'Possession Control',
    description: 'Patient circulation across the central 40 meters.',
    ball: { x: 54, y: 50 },
    homePositions: [
      { id: 1, x: 8, y: 50, speed: 2.8, zone: 'Penalty Area' },
      { id: 2, x: 40, y: 14, speed: 11.0, zone: 'Right Flank' },
      { id: 3, x: 28, y: 38, speed: 7.2, zone: 'Defensive Third' },
      { id: 4, x: 28, y: 62, speed: 7.0, zone: 'Defensive Third' },
      { id: 5, x: 40, y: 86, speed: 11.5, zone: 'Left Flank' },
      { id: 6, x: 44, y: 50, speed: 10.8, zone: 'Central Midfield' },
      { id: 7, x: 54, y: 36, speed: 12.0, zone: 'Central Midfield' },
      { id: 8, x: 56, y: 64, speed: 12.2, zone: 'Central Midfield' },
      { id: 9, x: 68, y: 12, speed: 16.0, zone: 'Right Wing' },
      { id: 10, x: 74, y: 50, speed: 14.8, zone: 'Attacking Third' },
      { id: 11, x: 68, y: 88, speed: 16.4, zone: 'Left Wing' }
    ],
    awayPositions: [
      { id: 21, x: 94, y: 50, speed: 2.0, zone: 'Penalty Area' },
      { id: 22, x: 75, y: 82, speed: 8.5, zone: 'Right Flank' },
      { id: 23, x: 78, y: 60, speed: 7.0, zone: 'Defensive Third' },
      { id: 24, x: 78, y: 40, speed: 6.8, zone: 'Defensive Third' },
      { id: 25, x: 75, y: 18, speed: 8.8, zone: 'Left Flank' },
      { id: 26, x: 62, y: 50, speed: 10.2, zone: 'Central Midfield' },
      { id: 27, x: 58, y: 65, speed: 11.0, zone: 'Central Midfield' },
      { id: 28, x: 48, y: 85, speed: 13.5, zone: 'Right Wing' },
      { id: 29, x: 52, y: 35, speed: 11.5, zone: 'Attacking Third' },
      { id: 30, x: 42, y: 50, speed: 13.0, zone: 'Central Midfield' },
      { id: 31, x: 48, y: 15, speed: 13.8, zone: 'Left Wing' }
    ],
    expectedMetrics: { width: 40.0, depth: 31.0, compactness: 250, lineSpacing: 11.8 }
  },

  // 7. Pressing Structure (48:07) -> ALIGNED HIGH PRESS
  {
    timeSec: 2887,
    timestamp: '48:07',
    phaseKey: 'pressing',
    phaseLabel: 'Coordinated High-Block Press',
    title: 'High-Block Pressing Execution',
    description: 'Six outfield players push aggressively into opposition build-up zone.',
    ball: { x: 76, y: 25 },
    homePositions: [
      { id: 1, x: 18, y: 50, speed: 4.8, zone: 'Penalty Area' },
      { id: 2, x: 52, y: 12, speed: 18.2, zone: 'Right Flank' },
      { id: 3, x: 45, y: 38, speed: 14.0, zone: 'Central Midfield' },
      { id: 4, x: 45, y: 62, speed: 13.8, zone: 'Central Midfield' },
      { id: 5, x: 52, y: 88, speed: 18.5, zone: 'Left Flank' },
      { id: 6, x: 62, y: 50, speed: 17.5, zone: 'Central Midfield' },
      { id: 7, x: 72, y: 28, speed: 21.0, zone: 'Attacking Third' },
      { id: 8, x: 74, y: 68, speed: 21.4, zone: 'Attacking Third' },
      { id: 9, x: 82, y: 15, speed: 24.5, zone: 'Opponent Box' },
      { id: 10, x: 85, y: 45, speed: 23.0, zone: 'Opponent Box' },
      { id: 11, x: 82, y: 85, speed: 24.8, zone: 'Opponent Box' }
    ],
    awayPositions: [
      { id: 21, x: 92, y: 50, speed: 5.2, zone: 'Penalty Area' },
      { id: 22, x: 82, y: 82, speed: 14.0, zone: 'Penalty Area' },
      { id: 23, x: 80, y: 60, speed: 12.5, zone: 'Defensive Third' },
      { id: 24, x: 80, y: 40, speed: 12.0, zone: 'Defensive Third' },
      { id: 25, x: 82, y: 18, speed: 14.5, zone: 'Penalty Area' },
      { id: 26, x: 72, y: 50, speed: 16.0, zone: 'Defensive Third' },
      { id: 27, x: 68, y: 65, speed: 15.0, zone: 'Central Midfield' },
      { id: 28, x: 55, y: 85, speed: 14.0, zone: 'Right Wing' },
      { id: 29, x: 60, y: 35, speed: 13.5, zone: 'Central Midfield' },
      { id: 30, x: 48, y: 50, speed: 12.0, zone: 'Center Circle' },
      { id: 31, x: 55, y: 15, speed: 13.8, zone: 'Left Wing' }
    ],
    expectedMetrics: { width: 38.0, depth: 36.0, compactness: 280, lineSpacing: 10.5 }
  },

  // 8. Attacking Width Increase (54:31) -> MODERATE DEVIATION
  {
    timeSec: 3271,
    timestamp: '54:31',
    phaseKey: 'attacking',
    phaseLabel: 'Wide Attacking Progression',
    title: 'Increased Attacking Width',
    description: 'Wingers and fullbacks maximize lateral pitch width to 47.8m.',
    ball: { x: 70, y: 88 },
    homePositions: [
      { id: 1, x: 10, y: 50, speed: 3.0, zone: 'Penalty Area' },
      { id: 2, x: 58, y: 6, speed: 19.4, zone: 'Right Touchline' },
      { id: 3, x: 38, y: 38, speed: 9.5, zone: 'Defensive Third' },
      { id: 4, x: 38, y: 62, speed: 9.2, zone: 'Defensive Third' },
      { id: 5, x: 58, y: 94, speed: 19.8, zone: 'Left Touchline' },
      { id: 6, x: 52, y: 50, speed: 12.8, zone: 'Central Midfield' },
      { id: 7, x: 64, y: 30, speed: 15.5, zone: 'Attacking Half-Space' },
      { id: 8, x: 66, y: 70, speed: 16.0, zone: 'Attacking Half-Space' },
      { id: 9, x: 80, y: 4, speed: 23.1, zone: 'Right Corner' },
      { id: 10, x: 84, y: 50, speed: 20.0, zone: 'Penalty Area' },
      { id: 11, x: 80, y: 96, speed: 23.5, zone: 'Left Corner' }
    ],
    awayPositions: [
      { id: 21, x: 94, y: 50, speed: 2.2, zone: 'Penalty Area' },
      { id: 22, x: 82, y: 84, speed: 13.0, zone: 'Penalty Area' },
      { id: 23, x: 85, y: 60, speed: 10.0, zone: 'Defensive Third' },
      { id: 24, x: 85, y: 40, speed: 9.8, zone: 'Defensive Third' },
      { id: 25, x: 82, y: 16, speed: 13.5, zone: 'Penalty Area' },
      { id: 26, x: 72, y: 50, speed: 11.5, zone: 'Central Midfield' },
      { id: 27, x: 68, y: 65, speed: 12.0, zone: 'Central Midfield' },
      { id: 28, x: 58, y: 86, speed: 14.5, zone: 'Right Wing' },
      { id: 29, x: 62, y: 35, speed: 13.0, zone: 'Attacking Third' },
      { id: 30, x: 50, y: 50, speed: 11.0, zone: 'Center Circle' },
      { id: 31, x: 58, y: 14, speed: 14.0, zone: 'Left Wing' }
    ],
    expectedMetrics: { width: 38.0, depth: 34.0, compactness: 260, lineSpacing: 12.0 }
  },

  // 9. Midfield Control (60:00)
  {
    timeSec: 3600,
    timestamp: '60:00',
    phaseKey: 'attacking',
    phaseLabel: 'Midfield Overload',
    title: 'Central Overload Phase',
    description: 'Midfield trio forms tight triangular passing network.',
    ball: { x: 52, y: 48 },
    homePositions: [
      { id: 1, x: 8, y: 50, speed: 2.5, zone: 'Penalty Area' },
      { id: 2, x: 42, y: 15, speed: 10.5, zone: 'Right Flank' },
      { id: 3, x: 30, y: 38, speed: 7.5, zone: 'Defensive Third' },
      { id: 4, x: 30, y: 62, speed: 7.2, zone: 'Defensive Third' },
      { id: 5, x: 42, y: 85, speed: 11.0, zone: 'Left Flank' },
      { id: 6, x: 46, y: 50, speed: 12.0, zone: 'Central Midfield' },
      { id: 7, x: 54, y: 42, speed: 13.5, zone: 'Central Midfield' },
      { id: 8, x: 56, y: 58, speed: 14.0, zone: 'Central Midfield' },
      { id: 9, x: 68, y: 15, speed: 16.5, zone: 'Right Wing' },
      { id: 10, x: 75, y: 50, speed: 15.0, zone: 'Attacking Third' },
      { id: 11, x: 68, y: 85, speed: 16.8, zone: 'Left Wing' }
    ],
    awayPositions: [
      { id: 21, x: 94, y: 50, speed: 1.9, zone: 'Penalty Area' },
      { id: 22, x: 76, y: 82, speed: 8.0, zone: 'Right Flank' },
      { id: 23, x: 78, y: 60, speed: 6.8, zone: 'Defensive Third' },
      { id: 24, x: 78, y: 40, speed: 6.5, zone: 'Defensive Third' },
      { id: 25, x: 76, y: 18, speed: 8.2, zone: 'Left Flank' },
      { id: 26, x: 64, y: 50, speed: 10.5, zone: 'Central Midfield' },
      { id: 27, x: 58, y: 65, speed: 11.2, zone: 'Central Midfield' },
      { id: 28, x: 48, y: 85, speed: 13.0, zone: 'Right Wing' },
      { id: 29, x: 52, y: 35, speed: 11.0, zone: 'Attacking Third' },
      { id: 30, x: 42, y: 50, speed: 12.5, zone: 'Central Midfield' },
      { id: 31, x: 48, y: 15, speed: 13.2, zone: 'Left Wing' }
    ],
    expectedMetrics: { width: 39.0, depth: 31.5, compactness: 240, lineSpacing: 11.5 }
  },

  // 10. Defensive Line Separation (67:31) -> SIGNIFICANT DEVIATION
  {
    timeSec: 4051,
    timestamp: '67:31',
    phaseKey: 'defensive',
    phaseLabel: 'Defensive Line Drop',
    title: 'Defensive Line Separation',
    description: 'Back line drops deep while midfield stays high, creating 26.8m vertical gap.',
    ball: { x: 38, y: 52 },
    homePositions: [
      { id: 1, x: 6, y: 50, speed: 3.8, zone: 'Penalty Area' },
      { id: 2, x: 18, y: 15, speed: 14.5, zone: 'Defensive Third' },
      { id: 3, x: 15, y: 38, speed: 12.0, zone: 'Penalty Area' },
      { id: 4, x: 15, y: 62, speed: 11.8, zone: 'Penalty Area' },
      { id: 5, x: 18, y: 85, speed: 15.0, zone: 'Defensive Third' },
      { id: 6, x: 42, y: 50, speed: 16.5, zone: 'Central Midfield' },
      { id: 7, x: 48, y: 35, speed: 15.2, zone: 'Central Midfield' },
      { id: 8, x: 50, y: 65, speed: 15.8, zone: 'Central Midfield' },
      { id: 9, x: 62, y: 15, speed: 18.0, zone: 'Right Wing' },
      { id: 10, x: 68, y: 50, speed: 16.0, zone: 'Attacking Third' },
      { id: 11, x: 62, y: 85, speed: 18.2, zone: 'Left Wing' }
    ],
    awayPositions: [
      { id: 21, x: 94, y: 50, speed: 2.0, zone: 'Penalty Area' },
      { id: 22, x: 65, y: 82, speed: 12.0, zone: 'Right Flank' },
      { id: 23, x: 72, y: 60, speed: 9.0, zone: 'Defensive Third' },
      { id: 24, x: 72, y: 40, speed: 8.8, zone: 'Defensive Third' },
      { id: 25, x: 65, y: 18, speed: 12.5, zone: 'Left Flank' },
      { id: 26, x: 52, y: 50, speed: 14.0, zone: 'Central Midfield' },
      { id: 27, x: 40, y: 45, speed: 18.5, zone: 'Central Pocket' },
      { id: 28, x: 32, y: 85, speed: 21.0, zone: 'Right Wing' },
      { id: 29, x: 30, y: 50, speed: 22.4, zone: 'Attacking Third' },
      { id: 30, x: 22, y: 50, speed: 24.0, zone: 'Penalty Area' },
      { id: 31, x: 32, y: 15, speed: 21.5, zone: 'Left Wing' }
    ],
    expectedMetrics: { width: 34.0, depth: 26.0, compactness: 200, lineSpacing: 13.0 }
  },

  // 11. Late-Game Defensive Block (76:40)
  {
    timeSec: 4600,
    timestamp: '76:40',
    phaseKey: 'defensive',
    phaseLabel: 'Low Defensive Block',
    title: 'Compact Low Block Defense',
    description: 'Extremely compact low block protecting 1-1 scoreline.',
    ball: { x: 30, y: 40 },
    homePositions: [
      { id: 1, x: 6, y: 50, speed: 3.0, zone: 'Penalty Area' },
      { id: 2, x: 22, y: 22, speed: 10.0, zone: 'Defensive Third' },
      { id: 3, x: 18, y: 40, speed: 8.0, zone: 'Penalty Area' },
      { id: 4, x: 18, y: 60, speed: 7.8, zone: 'Penalty Area' },
      { id: 5, x: 22, y: 78, speed: 10.2, zone: 'Defensive Third' },
      { id: 6, x: 28, y: 50, speed: 11.5, zone: 'Defensive Midfield' },
      { id: 7, x: 32, y: 35, speed: 12.0, zone: 'Defensive Third' },
      { id: 8, x: 32, y: 65, speed: 12.2, zone: 'Defensive Third' },
      { id: 9, x: 42, y: 18, speed: 15.0, zone: 'Central Midfield' },
      { id: 10, x: 48, y: 50, speed: 14.0, zone: 'Center Circle' },
      { id: 11, x: 42, y: 82, speed: 15.2, zone: 'Central Midfield' }
    ],
    awayPositions: [
      { id: 21, x: 92, y: 50, speed: 2.0, zone: 'Penalty Area' },
      { id: 22, x: 55, y: 84, speed: 12.0, zone: 'Right Flank' },
      { id: 23, x: 65, y: 60, speed: 8.0, zone: 'Central Midfield' },
      { id: 24, x: 65, y: 40, speed: 7.8, zone: 'Central Midfield' },
      { id: 25, x: 55, y: 16, speed: 12.5, zone: 'Left Flank' },
      { id: 26, x: 45, y: 50, speed: 13.0, zone: 'Central Midfield' },
      { id: 27, x: 38, y: 65, speed: 14.5, zone: 'Attacking Third' },
      { id: 28, x: 30, y: 86, speed: 18.0, zone: 'Right Wing' },
      { id: 29, x: 34, y: 35, speed: 16.0, zone: 'Attacking Third' },
      { id: 30, x: 24, y: 50, speed: 19.5, zone: 'Penalty Area' },
      { id: 31, x: 30, y: 14, speed: 18.2, zone: 'Left Wing' }
    ],
    expectedMetrics: { width: 31.2, depth: 24.5, compactness: 195, lineSpacing: 10.0 }
  },

  // 12. High Press Counter (84:20)
  {
    timeSec: 5060,
    timestamp: '84:20',
    phaseKey: 'attacking_transition',
    phaseLabel: 'Rapid Counter-Attack',
    title: 'GOAL! Hamza (#7) Counter Finish 2-1',
    description: 'Fast turnover into goal-scoring counter attack.',
    ball: { x: 86, y: 22 },
    homePositions: [
      { id: 1, x: 10, y: 50, speed: 2.8, zone: 'Penalty Area' },
      { id: 2, x: 45, y: 18, speed: 15.0, zone: 'Right Flank' },
      { id: 3, x: 32, y: 38, speed: 9.0, zone: 'Defensive Third' },
      { id: 4, x: 32, y: 62, speed: 8.8, zone: 'Defensive Third' },
      { id: 5, x: 45, y: 82, speed: 15.2, zone: 'Left Flank' },
      { id: 6, x: 50, y: 50, speed: 14.0, zone: 'Central Midfield' },
      { id: 7, x: 72, y: 30, speed: 22.0, zone: 'Attacking Box' },
      { id: 8, x: 75, y: 65, speed: 21.5, zone: 'Attacking Box' },
      { id: 9, x: 86, y: 22, speed: 26.8, zone: 'Penalty Area' },
      { id: 10, x: 85, y: 52, speed: 24.0, zone: 'Penalty Area' },
      { id: 11, x: 80, y: 80, speed: 23.0, zone: 'Penalty Area' }
    ],
    awayPositions: [
      { id: 21, x: 95, y: 50, speed: 5.0, zone: 'Penalty Area' },
      { id: 22, x: 80, y: 82, speed: 18.0, zone: 'Penalty Area' },
      { id: 23, x: 82, y: 58, speed: 17.5, zone: 'Penalty Area' },
      { id: 24, x: 82, y: 42, speed: 17.0, zone: 'Penalty Area' },
      { id: 25, x: 78, y: 18, speed: 19.0, zone: 'Penalty Area' },
      { id: 26, x: 68, y: 50, speed: 16.0, zone: 'Central Midfield' },
      { id: 27, x: 62, y: 65, speed: 15.0, zone: 'Central Midfield' },
      { id: 28, x: 55, y: 85, speed: 14.0, zone: 'Right Wing' },
      { id: 29, x: 58, y: 35, speed: 13.5, zone: 'Attacking Third' },
      { id: 30, x: 48, y: 50, speed: 12.0, zone: 'Center Circle' },
      { id: 31, x: 52, y: 15, speed: 13.8, zone: 'Left Wing' }
    ],
    expectedMetrics: { width: 42.5, depth: 33.0, compactness: 275, lineSpacing: 12.0 }
  },

  // 13. Final Shape (90:00)
  {
    timeSec: 5400,
    timestamp: '90:00',
    phaseKey: 'defensive',
    phaseLabel: 'Final Game Management',
    title: 'Final Defensive Block',
    description: 'Disciplined 4-5-1 closing block securing 2-1 victory.',
    ball: { x: 35, y: 50 },
    homePositions: [
      { id: 1, x: 5, y: 50, speed: 2.0, zone: 'Penalty Area' },
      { id: 2, x: 24, y: 20, speed: 8.0, zone: 'Defensive Third' },
      { id: 3, x: 20, y: 40, speed: 6.0, zone: 'Penalty Area' },
      { id: 4, x: 20, y: 60, speed: 6.2, zone: 'Penalty Area' },
      { id: 5, x: 24, y: 80, speed: 8.2, zone: 'Defensive Third' },
      { id: 6, x: 30, y: 50, speed: 9.5, zone: 'Defensive Midfield' },
      { id: 7, x: 34, y: 35, speed: 10.0, zone: 'Defensive Third' },
      { id: 8, x: 34, y: 65, speed: 10.2, zone: 'Defensive Third' },
      { id: 9, x: 40, y: 15, speed: 12.0, zone: 'Central Midfield' },
      { id: 10, x: 45, y: 50, speed: 11.0, zone: 'Center Circle' },
      { id: 11, x: 40, y: 85, speed: 12.2, zone: 'Central Midfield' }
    ],
    awayPositions: [
      { id: 21, x: 92, y: 50, speed: 1.8, zone: 'Penalty Area' },
      { id: 22, x: 50, y: 84, speed: 10.0, zone: 'Right Flank' },
      { id: 23, x: 60, y: 60, speed: 7.0, zone: 'Central Midfield' },
      { id: 24, x: 60, y: 40, speed: 6.8, zone: 'Central Midfield' },
      { id: 25, x: 50, y: 16, speed: 10.5, zone: 'Left Flank' },
      { id: 26, x: 42, y: 50, speed: 11.0, zone: 'Central Midfield' },
      { id: 27, x: 38, y: 65, speed: 12.5, zone: 'Attacking Third' },
      { id: 28, x: 32, y: 86, speed: 15.0, zone: 'Right Wing' },
      { id: 29, x: 35, y: 35, speed: 13.0, zone: 'Attacking Third' },
      { id: 30, x: 28, y: 50, speed: 16.0, zone: 'Penalty Area' },
      { id: 31, x: 32, y: 14, speed: 15.2, zone: 'Left Wing' }
    ],
    expectedMetrics: { width: 33.0, depth: 25.0, compactness: 210, lineSpacing: 10.2 }
  }
];

// Helper: Calculates Convex Hull polygon area in m² (scaled to 105m x 68m pitch)
export function calculateCompactnessArea(players: { x: number; y: number }[]): number {
  if (players.length < 3) return 200;
  // Convert percentage (0-100) to pitch meters (105m x 68m)
  const pts = players.map(p => ({ x: (p.x / 100) * 105, y: (p.y / 100) * 68 }));
  
  // Sort points for Shoelace formula on convex polygon
  let pivot = pts[0];
  for (let p of pts) {
    if (p.y < pivot.y || (p.y === pivot.y && p.x < pivot.x)) pivot = p;
  }
  const sorted = pts.filter(p => p !== pivot).sort((a, b) => {
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

  // Shoelace formula for area
  let area = 0;
  for (let i = 0; i < hull.length; i++) {
    const j = (i + 1) % hull.length;
    area += hull[i].x * hull[j].y;
    area -= hull[j].x * hull[i].y;
  }
  return Math.round(Math.abs(area) / 2);
}

// DETERMINISTIC MATCH STATE INTERPOLATION ENGINE
export function getFrameAtTime(timeSec: number): PitchFrame {
  // Clamp time
  const clampedSec = Math.max(0, Math.min(5400, timeSec));

  // Find bounding keyframes A and B
  let kA = MATCH_KEYFRAMES[0];
  let kB = MATCH_KEYFRAMES[MATCH_KEYFRAMES.length - 1];

  for (let i = 0; i < MATCH_KEYFRAMES.length - 1; i++) {
    if (clampedSec >= MATCH_KEYFRAMES[i].timeSec && clampedSec <= MATCH_KEYFRAMES[i + 1].timeSec) {
      kA = MATCH_KEYFRAMES[i];
      kB = MATCH_KEYFRAMES[i + 1];
      break;
    }
  }

  // Linear Interpolation factor (0.0 to 1.0)
  const duration = kB.timeSec - kA.timeSec;
  const t = duration > 0 ? (clampedSec - kA.timeSec) / duration : 0;

  // Smooth ease-in-ease-out curve t' = t*t*(3 - 2*t)
  const smoothT = t * t * (3 - 2 * t);

  // Interpolate Home Players
  const homePlayers: PlayerCoordinate[] = HOME_ROSTER.map((meta, idx) => {
    const posA = kA.homePositions[idx] || kA.homePositions[0];
    const posB = kB.homePositions[idx] || kB.homePositions[0];

    const x = Number((posA.x + smoothT * (posB.x - posA.x)).toFixed(1));
    const y = Number((posA.y + smoothT * (posB.y - posA.y)).toFixed(1));
    const speedKmH = Number((posA.speed + smoothT * (posB.speed - posA.speed)).toFixed(1));

    return {
      id: meta.id,
      name: meta.name,
      number: meta.number,
      position: meta.position,
      team: 'home',
      x,
      y,
      speedKmH,
      distanceKm: Number((4.0 + (clampedSec / 5400) * 6.8).toFixed(1)),
      highIntensityKm: Number((0.2 + (clampedSec / 5400) * 2.1).toFixed(1)),
      currentZone: posB.zone
    };
  });

  // Interpolate Away Players
  const awayPlayers: PlayerCoordinate[] = AWAY_ROSTER.map((meta, idx) => {
    const posA = kA.awayPositions[idx] || kA.awayPositions[0];
    const posB = kB.awayPositions[idx] || kB.awayPositions[0];

    const x = Number((posA.x + smoothT * (posB.x - posA.x)).toFixed(1));
    const y = Number((posA.y + smoothT * (posB.y - posA.y)).toFixed(1));
    const speedKmH = Number((posA.speed + smoothT * (posB.speed - posA.speed)).toFixed(1));

    return {
      id: meta.id,
      name: meta.name,
      number: meta.number,
      position: meta.position,
      team: 'away',
      x,
      y,
      speedKmH,
      distanceKm: Number((3.5 + (clampedSec / 5400) * 6.5).toFixed(1)),
      highIntensityKm: Number((0.1 + (clampedSec / 5400) * 2.0).toFixed(1)),
      currentZone: posB.zone
    };
  });

  // Interpolate Ball Position
  const ball = {
    x: Number((kA.ball.x + smoothT * (kB.ball.x - kA.ball.x)).toFixed(1)),
    y: Number((kA.ball.y + smoothT * (kB.ball.y - kA.ball.y)).toFixed(1))
  };

  // Derive Actual Team Spatial Metrics
  const outfieldHome = homePlayers.filter(p => p.position !== 'Goalkeeper');
  const compactnessAreaM2 = calculateCompactnessArea(outfieldHome);

  const minX = Math.min(...outfieldHome.map(p => p.x));
  const maxX = Math.max(...outfieldHome.map(p => p.x));
  const minY = Math.min(...outfieldHome.map(p => p.y));
  const maxY = Math.max(...outfieldHome.map(p => p.y));

  const teamWidthM = Number(((maxY - minY) * 0.68).toFixed(1));
  const teamDepthM = Number(((maxX - minX) * 1.05).toFixed(1));
  const defensiveLineM = Number((minX * 1.05).toFixed(1));
  const attackingLineM = Number((maxX * 1.05).toFixed(1));

  const centroid = {
    x: Number((homePlayers.reduce((acc, p) => acc + p.x, 0) / homePlayers.length).toFixed(1)),
    y: Number((homePlayers.reduce((acc, p) => acc + p.y, 0) / homePlayers.length).toFixed(1))
  };

  // Derive Expected Metrics based on Phase Context
  const expWidth = Number((kA.expectedMetrics.width + smoothT * (kB.expectedMetrics.width - kA.expectedMetrics.width)).toFixed(1));
  const expDepth = Number((kA.expectedMetrics.depth + smoothT * (kB.expectedMetrics.depth - kA.expectedMetrics.depth)).toFixed(1));
  const expCompactness = Math.round(kA.expectedMetrics.compactness + smoothT * (kB.expectedMetrics.compactness - kA.expectedMetrics.compactness));
  const expLineSpacing = Number((kA.expectedMetrics.lineSpacing + smoothT * (kB.expectedMetrics.lineSpacing - kA.expectedMetrics.lineSpacing)).toFixed(1));

  // Compute Expected Player Positions (Ghost Markers)
  const expectedHomePlayers: PlayerCoordinate[] = homePlayers.map(p => {
    // Expected position pulls slightly towards expected tactical centroid & width
    const widthOffset = (p.y - 50) * (expWidth / Math.max(1, teamWidthM));
    const depthOffset = (p.x - centroid.x) * (expDepth / Math.max(1, teamDepthM));
    return {
      ...p,
      x: Math.max(5, Math.min(95, Number((centroid.x + depthOffset).toFixed(1)))),
      y: Math.max(5, Math.min(95, Number((50 + widthOffset).toFixed(1))))
    };
  });

  // Calculate Tactical Alignment Score & Deviations
  const compactnessDev = Math.abs(compactnessAreaM2 - expCompactness);
  const widthDev = Math.abs(teamWidthM - expWidth);
  const depthDev = Math.abs(teamDepthM - expDepth);

  const widthAlignment = Math.max(40, Math.min(100, Math.round(100 - (widthDev / expWidth) * 100)));
  const depthAlignment = Math.max(40, Math.min(100, Math.round(100 - (depthDev / expDepth) * 100)));
  const compactnessAlignment = Math.max(35, Math.min(100, Math.round(100 - (compactnessDev / expCompactness) * 100)));
  const lineCoordination = Math.max(50, Math.min(100, Math.round(100 - (Math.abs(defensiveLineM - 28) / 28) * 50)));

  const tacticalAlignmentPct = Math.round((widthAlignment + depthAlignment + compactnessAlignment + lineCoordination) / 4);

  // Classify Severity
  let deviationSeverity: 'aligned' | 'moderate' | 'significant' = 'aligned';
  if (compactnessDev > 75 || widthDev > 8 || depthDev > 7) {
    deviationSeverity = 'significant';
  } else if (compactnessDev > 35 || widthDev > 4 || depthDev > 4) {
    deviationSeverity = 'moderate';
  }

  // Primary Deviation Object
  const primaryDeviation: TacticalDeviation = {
    metric: compactnessDev > 50 ? 'Compactness Area' : widthDev > 6 ? 'Team Width' : 'Team Depth',
    expected: expCompactness,
    actual: compactnessAreaM2,
    deviation: compactnessAreaM2 - expCompactness,
    unit: compactnessDev > 50 ? 'm²' : 'm',
    severity: deviationSeverity,
    description: deviationSeverity === 'significant'
      ? `Observed compactness (${compactnessAreaM2}m²) expanded by +${compactnessAreaM2 - expCompactness}m² beyond expected model state.`
      : deviationSeverity === 'moderate'
      ? `Moderate tactical divergence detected in lateral team width.`
      : `Team spatial organization is closely aligned with expected phase model.`
  };

  // Feature Fusion 7-Dimension Compact Vector
  const featureFusion: FeatureFusionVector = {
    rawFeatureCount: 24,
    compactFeatureCount: 7,
    dimensions: [
      { name: 'Spatial Width', valuePct: Math.round((teamWidthM / 55) * 100), description: 'Lateral coverage dimension' },
      { name: 'Spatial Depth', valuePct: Math.round((teamDepthM / 45) * 100), description: 'Vertical line length dimension' },
      { name: 'Compactness', valuePct: Math.round((compactnessAreaM2 / 400) * 100), description: 'Convex hull polygon density' },
      { name: 'Line Coordination', valuePct: lineCoordination, description: 'Synchronized movement between units' },
      { name: 'Pressing Intensity', valuePct: Math.round(55 + (clampedSec % 40)), description: 'Closing speed & high-block pressure' },
      { name: 'Team Synchronization', valuePct: tacticalAlignmentPct, description: 'Spatial coherence with expected model' },
      { name: 'Transition Stability', valuePct: Math.max(30, 100 - compactnessDev), description: 'Rest-defense & recovery structure' }
    ]
  };

  const mins = Math.floor(clampedSec / 60);
  const secs = Math.floor(clampedSec % 60);
  const timestamp = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return {
    timestamp,
    timeSec: clampedSec,
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

    expectedState: {
      tacticalState: {
        teamWidthM: expWidth,
        teamDepthM: expDepth,
        compactnessAreaM2: expCompactness,
        lineSpacingM: expLineSpacing,
        pressingIntensityPct: 82,
        synchronizationPct: 88,
        transitionStabilityPct: 85
      },
      expectedHomePlayers,
      confidencePct: 91,
      reasoningContext: {
        phase: kA.phaseKey,
        phaseLabel: kA.phaseLabel,
        possessionState: 'home_possession',
        ballZone: kA.homePositions[7]?.zone || 'Central Midfield',
        scoreContext: 'Al Ahly 2-1 Zamalek'
      }
    },

    actualState: {
      teamWidthM,
      teamDepthM,
      compactnessAreaM2,
      lineSpacingM: Number(((teamDepthM / 3)).toFixed(1)),
      pressingIntensityPct: Math.round(55 + (clampedSec % 40)),
      synchronizationPct: tacticalAlignmentPct,
      transitionStabilityPct: Math.max(30, 100 - compactnessDev)
    },

    tacticalAlignmentPct,
    alignmentBreakdown: {
      widthAlignmentPct: widthAlignment,
      depthAlignmentPct: depthAlignment,
      compactnessAlignmentPct: compactnessAlignment,
      lineCoordinationPct: lineCoordination
    },
    deviationSeverity,
    primaryDeviation,
    featureFusion
  };
}
