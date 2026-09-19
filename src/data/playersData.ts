import { PlayerStats, DataQualityMetrics } from '../types/tactical';

export const AL_AHLY_PLAYERS: PlayerStats[] = [
  {
    id: 7,
    name: 'Ahmed',
    number: 8,
    position: 'Central Midfielder',
    team: 'home',
    minutesPlayed: 90,
    distanceCoveredKm: 10.8,
    avgSpeedKmH: 7.2,
    maxSpeedKmH: 29.4,
    highIntensityKm: 2.3,
    sprintCount: 22,
    accelerations: 48,
    decelerations: 41,
    zoneOccupancy: [
      { zone: 'Central Midfield', percentage: 42 },
      { zone: 'Attacking Half-Space', percentage: 28 },
      { zone: 'Defensive Midfield', percentage: 20 },
      { zone: 'Wide Flank', percentage: 10 }
    ],
    heatmapPoints: [
      { x: 50, y: 40, intensity: 0.9 },
      { x: 55, y: 35, intensity: 0.8 },
      { x: 45, y: 45, intensity: 0.7 },
      { x: 60, y: 50, intensity: 0.6 }
    ]
  },
  {
    id: 6,
    name: 'Marwan',
    number: 6,
    position: 'Defensive Midfielder',
    team: 'home',
    minutesPlayed: 90,
    distanceCoveredKm: 10.1,
    avgSpeedKmH: 6.8,
    maxSpeedKmH: 27.1,
    highIntensityKm: 1.6,
    sprintCount: 14,
    accelerations: 35,
    decelerations: 38,
    zoneOccupancy: [
      { zone: 'Defensive Midfield', percentage: 55 },
      { zone: 'Central Midfield', percentage: 30 },
      { zone: 'Defensive Third', percentage: 15 }
    ],
    heatmapPoints: [
      { x: 42, y: 50, intensity: 0.95 },
      { x: 38, y: 48, intensity: 0.85 },
      { x: 45, y: 52, intensity: 0.75 }
    ]
  },
  {
    id: 11,
    name: 'Mahmoud',
    number: 11,
    position: 'Left Winger',
    team: 'home',
    minutesPlayed: 82,
    distanceCoveredKm: 10.2,
    avgSpeedKmH: 7.5,
    maxSpeedKmH: 33.8,
    highIntensityKm: 2.9,
    sprintCount: 31,
    accelerations: 58,
    decelerations: 52,
    zoneOccupancy: [
      { zone: 'Left Wing', percentage: 60 },
      { zone: 'Attacking Half-Space', percentage: 25 },
      { zone: 'Penalty Area', percentage: 15 }
    ],
    heatmapPoints: [
      { x: 75, y: 88, intensity: 0.98 },
      { x: 82, y: 80, intensity: 0.82 }
    ]
  },
  {
    id: 10,
    name: 'Omar',
    number: 9,
    position: 'Center Forward',
    team: 'home',
    minutesPlayed: 90,
    distanceCoveredKm: 9.2,
    avgSpeedKmH: 6.1,
    maxSpeedKmH: 31.2,
    highIntensityKm: 2.2,
    sprintCount: 26,
    accelerations: 44,
    decelerations: 40,
    zoneOccupancy: [
      { zone: 'Penalty Area', percentage: 50 },
      { zone: 'Attacking Third', percentage: 35 },
      { zone: 'Central Midfield', percentage: 15 }
    ],
    heatmapPoints: [
      { x: 80, y: 50, intensity: 0.9 }
    ]
  }
];

export const MOCK_DATA_QUALITY: DataQualityMetrics = {
  trackingQualityPct: 93,
  identityConsistencyPct: 96,
  missingDataPct: 2.7,
  idSwitchesCount: 14,
  trackContinuityPct: 94,
  pitchCalibrationErrorMeters: 0.43,
  processingPipeline: {
    detection: true,
    tracking: true,
    pitchCalibration: true,
    synchronization: true,
    tacticalDetection: true
  },
  warnings: [
    {
      id: 'warn-1',
      time: '34:12',
      text: '17 seconds of tracking data contain reduced confidence due to player occlusion during corner kick crowded area.',
      severity: 'medium'
    },
    {
      id: 'warn-2',
      time: '61:45',
      text: 'Minor pitch boundary calibration drift detected (0.43m error offset corrected via homography matrix).',
      severity: 'low'
    }
  ]
};
