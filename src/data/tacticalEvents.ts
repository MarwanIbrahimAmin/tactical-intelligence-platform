import { TacticalInsight } from '../types/tactical';

export const TACTICAL_INSIGHTS: TacticalInsight[] = [
  {
    id: 'insight-001',
    statement: 'Loss of Defensive Compactness during transition phase',
    tacticalPattern: 'Defensive Transition',
    startTime: '23:14',
    endTime: '23:20',
    startSec: 1394,
    endSec: 1400,
    metricName: 'Convex Hull Compactness',
    expectedValue: 221,
    actualValue: 347,
    deviationValue: 126,
    metricValueBefore: 218,
    metricValueAfter: 347,
    unit: 'm²',
    severity: 'significant',
    confidencePct: 91,
    dataQualityPct: 94,
    evidenceRef: 'EVD-2314-DEF-COMP',
    interpretation: 'The Tactical State Model expected a compact defensive structure (221 m²) after possession loss. The actual observed state expanded to 347 m² (+126 m² deviation), creating open central spaces.',
    numericalTrend: [
      { time: '23:10', value: 221, expected: 220 },
      { time: '23:12', value: 236, expected: 221 },
      { time: '23:14', value: 281, expected: 221 },
      { time: '23:16', value: 312, expected: 222 },
      { time: '23:18', value: 347, expected: 221 },
      { time: '23:20', value: 338, expected: 220 }
    ]
  },
  {
    id: 'insight-002',
    statement: 'Increased Attacking Width in build-up progression',
    tacticalPattern: 'Attacking Phase',
    startTime: '54:31',
    endTime: '54:48',
    startSec: 3271,
    endSec: 3288,
    metricName: 'Team Width',
    expectedValue: 38.0,
    actualValue: 47.8,
    deviationValue: 9.8,
    metricValueBefore: 34.2,
    metricValueAfter: 47.8,
    unit: 'm',
    severity: 'moderate',
    confidencePct: 87,
    dataQualityPct: 96,
    evidenceRef: 'EVD-5431-ATT-WDTH',
    interpretation: 'The attacking structure expanded laterally across the pitch beyond expected width model (38.0m expected vs 47.8m actual), opening wing channels.',
    numericalTrend: [
      { time: '54:25', value: 34.2, expected: 38.0 },
      { time: '54:28', value: 36.5, expected: 38.0 },
      { time: '54:31', value: 40.1, expected: 38.0 },
      { time: '54:35', value: 44.2, expected: 38.0 },
      { time: '54:40', value: 47.8, expected: 38.0 },
      { time: '54:48', value: 46.5, expected: 38.0 }
    ]
  },
  {
    id: 'insight-003',
    statement: 'Defensive Line Separation exceeding target threshold',
    tacticalPattern: 'Defensive Line Separation',
    startTime: '67:31',
    endTime: '67:45',
    startSec: 4051,
    endSec: 4065,
    metricName: 'Midfield-to-Defense Gap',
    expectedValue: 13.0,
    actualValue: 26.8,
    deviationValue: 13.8,
    metricValueBefore: 14.2,
    metricValueAfter: 26.8,
    unit: 'm',
    severity: 'significant',
    confidencePct: 94,
    dataQualityPct: 92,
    evidenceRef: 'EVD-6731-LINE-GAP',
    interpretation: 'Defensive backline dropped to 15m while midfield pivot remained elevated at 42m, creating a +13.8m line separation deviation from model.',
    numericalTrend: [
      { time: '67:25', value: 14.2, expected: 13.0 },
      { time: '67:28', value: 16.0, expected: 13.0 },
      { time: '67:31', value: 20.4, expected: 13.0 },
      { time: '67:35', value: 24.1, expected: 13.0 },
      { time: '67:40', value: 26.8, expected: 13.0 },
      { time: '67:45', value: 25.0, expected: 13.0 }
    ]
  },
  {
    id: 'insight-004',
    statement: 'Coordinated High-Block Pressing Structure execution',
    tacticalPattern: 'Pressing Structure',
    startTime: '48:07',
    endTime: '48:22',
    startSec: 2887,
    endSec: 2902,
    metricName: 'Opponent Third Occupancy',
    expectedValue: 6,
    actualValue: 6,
    deviationValue: 0,
    metricValueBefore: 3,
    metricValueAfter: 6,
    unit: 'players',
    severity: 'aligned',
    confidencePct: 89,
    dataQualityPct: 95,
    evidenceRef: 'EVD-4807-HIGH-PRESS',
    interpretation: 'Observed pressing structure fully matches expected high-block tactical model (6 players pushing into opposition build-up zone).',
    numericalTrend: [
      { time: '48:00', value: 3, expected: 6 },
      { time: '48:03', value: 3, expected: 6 },
      { time: '48:07', value: 4, expected: 6 },
      { time: '48:12', value: 5, expected: 6 },
      { time: '48:17', value: 6, expected: 6 },
      { time: '48:22', value: 6, expected: 6 }
    ]
  }
];

export interface TimelineEventMarker {
  timeSec: number;
  timestamp: string;
  type: 'goal' | 'card' | 'tactical' | 'possession';
  title: string;
  insightId?: string;
  team: 'home' | 'away';
}

export const MATCH_TIMELINE_EVENTS: TimelineEventMarker[] = [
  { timeSec: 720, timestamp: '12:00', type: 'possession', title: 'High-Press Phase Al Ahly', team: 'home' },
  { timeSec: 1394, timestamp: '23:14', type: 'tactical', title: 'Loss of Compactness (218 → 347m²)', insightId: 'insight-001', team: 'home' },
  { timeSec: 1902, timestamp: '31:42', type: 'goal', title: 'GOAL! Omar (#9) - Al Ahly 1-0', team: 'home' },
  { timeSec: 2520, timestamp: '42:00', type: 'card', title: 'Yellow Card - Marwan (#6)', team: 'home' },
  { timeSec: 2887, timestamp: '48:07', type: 'tactical', title: 'Pressing Structure Synchronized', insightId: 'insight-004', team: 'home' },
  { timeSec: 3271, timestamp: '54:31', type: 'tactical', title: 'Increased Attacking Width (+13.6m)', insightId: 'insight-002', team: 'home' },
  { timeSec: 3840, timestamp: '64:00', type: 'goal', title: 'GOAL! Jaziri (#19) - Zamalek 1-1', team: 'away' },
  { timeSec: 4051, timestamp: '67:31', type: 'tactical', title: 'Defensive Line Separation (26.8m)', insightId: 'insight-003', team: 'home' },
  { timeSec: 4860, timestamp: '81:00', type: 'goal', title: 'GOAL! Hamza (#7) - Al Ahly 2-1', team: 'home' }
];
