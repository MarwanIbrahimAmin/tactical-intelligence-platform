export interface PlayerCoordinate {
  id: number;
  name: string;
  number: number;
  position: string;
  team: 'home' | 'away';
  x: number; // Pitch percentage 0-100 (0=left goal line, 100=right goal line)
  y: number; // Pitch percentage 0-100 (0=top touch line, 100=bottom touch line)
  speedKmH: number;
  distanceKm: number;
  highIntensityKm: number;
  currentZone: string;
}

export interface TacticalState {
  teamWidthM: number;
  teamDepthM: number;
  compactnessAreaM2: number;
  lineSpacingM: number;
  pressingIntensityPct: number;
  synchronizationPct: number;
  transitionStabilityPct: number;
}

export interface ReasoningContext {
  phase: 'build_up' | 'attacking' | 'defensive' | 'defensive_transition' | 'attacking_transition' | 'pressing';
  phaseLabel: string;
  possessionState: 'home_possession' | 'away_possession' | 'loose_ball';
  ballZone: string;
  scoreContext: string;
}

export interface ExpectedState {
  tacticalState: TacticalState;
  expectedHomePlayers: PlayerCoordinate[];
  confidencePct: number;
  reasoningContext: ReasoningContext;
}

export interface TacticalDeviation {
  metric: string;
  expected: number;
  actual: number;
  deviation: number;
  unit: string;
  severity: 'aligned' | 'moderate' | 'significant';
  description: string;
}

export interface FeatureFusionVector {
  rawFeatureCount: number; // 24 raw tracking features
  compactFeatureCount: number; // 7 compact dimensions
  dimensions: {
    name: string;
    valuePct: number;
    description: string;
  }[];
}

export interface PitchFrame {
  timestamp: string; // e.g. "23:14"
  timeSec: number;
  phaseLabel: string;
  phaseKey: ReasoningContext['phase'];
  ball: { x: number; y: number };
  homePlayers: PlayerCoordinate[];
  awayPlayers: PlayerCoordinate[];
  compactnessAreaM2: number;
  teamWidthM: number;
  teamDepthM: number;
  defensiveLineM: number;
  attackingLineM: number;
  centroid: { x: number; y: number };

  // Core AI Expected vs Actual Intelligence
  expectedState: ExpectedState;
  actualState: TacticalState;
  tacticalAlignmentPct: number;
  alignmentBreakdown: {
    widthAlignmentPct: number;
    depthAlignmentPct: number;
    compactnessAlignmentPct: number;
    lineCoordinationPct: number;
  };
  deviationSeverity: 'aligned' | 'moderate' | 'significant';
  primaryDeviation?: TacticalDeviation;
  featureFusion: FeatureFusionVector;
}

export interface TacticalInsight {
  id: string;
  statement: string;
  tacticalPattern: 'Defensive Transition' | 'Attacking Phase' | 'Pressing Structure' | 'Defensive Line Separation' | 'Off-Ball Movement';
  startTime: string;
  endTime: string;
  startSec: number;
  endSec: number;
  metricName: string;
  expectedValue: number;
  actualValue: number;
  deviationValue: number;
  metricValueBefore: string | number;
  metricValueAfter: string | number;
  unit: string;
  severity: 'aligned' | 'moderate' | 'significant';
  confidencePct: number;
  dataQualityPct: number;
  evidenceRef: string;
  interpretation: string;
  numericalTrend: { time: string; value: number; expected: number }[];
}

export interface PlayerStats {
  id: number;
  name: string;
  number: number;
  position: string;
  team: 'home' | 'away';
  minutesPlayed: number;
  distanceCoveredKm: number;
  avgSpeedKmH: number;
  maxSpeedKmH: number;
  highIntensityKm: number;
  sprintCount: number;
  accelerations: number;
  decelerations: number;
  zoneOccupancy: { zone: string; percentage: number }[];
  heatmapPoints: { x: number; y: number; intensity: number }[];
}

export interface DataQualityMetrics {
  trackingQualityPct: number;
  identityConsistencyPct: number;
  missingDataPct: number;
  idSwitchesCount: number;
  trackContinuityPct: number;
  pitchCalibrationErrorMeters: number;
  processingPipeline: {
    detection: boolean;
    tracking: boolean;
    pitchCalibration: boolean;
    synchronization: boolean;
    tacticalDetection: boolean;
  };
  warnings: { id: string; time: string; text: string; severity: 'low' | 'medium' | 'high' }[];
}

export interface MatchInfo {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  competition: string;
  date: string;
  venue: string;
  durationMins: number;
  dataSourceStatus: string;
}
