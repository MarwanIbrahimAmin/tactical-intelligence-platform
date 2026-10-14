// ─── Core Insight Object (every insight in the app must use this) ───

export type Confidence = 'High' | 'Medium' | 'Low';
export type DataQuality = 'OK' | 'Uncertain';

export type TacticalPattern =
  | 'Loss of compactness after losing possession'
  | 'Change in attacking width'
  | 'Change in line spacing'
  | 'Candidate pressing structure';

export const TACTICAL_PATTERN_TOOLTIPS: Record<TacticalPattern, string> = {
  'Loss of compactness after losing possession':
    'Compactness = area of the convex hull formed by all outfield players. A spike after losing the ball means the team stretched too far to recover quickly.',
  'Change in attacking width':
    'Width = lateral extent (left-most to right-most outfield player) in metres. A large change signals a shift in how the team uses the flanks.',
  'Change in line spacing':
    'Line spacing = vertical distance between the defensive line and the midfield line, or between midfield and the forward line. Larger gaps can be exploited.',
  'Candidate pressing structure':
    'Pressing structure = count and arrangement of players who push into the opponent\'s build-up zone within a short time window.',
};

export interface Insight {
  id: string;
  statement: string;
  metric: string;           // measured value + baseline, e.g. "Hull area 1,450 m² vs match average 1,100 m²"
  interval: { start: string; end: string; startSec: number; endSec: number };
  confidence: Confidence;
  dataQuality: DataQuality;
  evidence: {
    clipRef: string;        // reference id for video clip
    pitchPlotRef?: string;  // reference id for pitch snapshot
  };
  tacticalPattern: TacticalPattern;
  metricBefore?: string | number;
  metricAfter?: string | number;
  formulaExplanation?: string;
  limitations?: string;
}

// ─── Match Chunk (for Page 2 timeline) ───

export interface MatchChunk {
  id: string;
  title: string;
  summary: string;
  interval: { start: string; end: string; startSec: number; endSec: number };
  keyMetrics: string[];
  dataQuality: DataQuality;
  insightIds: string[];      // links to related insights
  phaseKey: PhaseKey;
}

export type PhaseKey =
  | 'build_up'
  | 'attacking'
  | 'defensive'
  | 'defensive_transition'
  | 'attacking_transition'
  | 'pressing';

// ─── Player ───

export interface PlayerInfo {
  id: number;
  name: string;
  number: number;
  position: string;
  team: 'home' | 'away';
}

export interface PlayerMovementStats {
  playerId: number;
  minutesPlayed: number;
  estimatedDistanceKm: number;   // labeled as "movement estimates from video"
  estimatedAvgSpeedKmH: number;
  estimatedMaxSpeedKmH: number;
  zoneOccupancy: { zone: string; percentage: number }[];
  heatmapPoints: { x: number; y: number; intensity: number }[];
  relatedInsightIds: string[];
}

// ─── Pitch Frame (for PitchMap component) ───

export interface PlayerCoordinate {
  id: number;
  name: string;
  number: number;
  position: string;
  team: 'home' | 'away';
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
  speedKmH: number;
  currentZone: string;
}

export interface PitchFrame {
  timestamp: string;
  timeSec: number;
  phaseLabel: string;
  phaseKey: PhaseKey;
  ball: { x: number; y: number };
  homePlayers: PlayerCoordinate[];
  awayPlayers: PlayerCoordinate[];
  compactnessAreaM2: number;
  teamWidthM: number;
  teamDepthM: number;
  defensiveLineM: number;
  attackingLineM: number;
  centroid: { x: number; y: number };
}

// ─── Match Info ───

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
}

// ─── Opponent Report (Page 1) ───

export interface OpponentTendency {
  id: string;
  title: string;
  description: string;
  matchesAppeared: number;
  totalMatches: number;
  clipRefs: string[];         // one per match where it appeared
  relatedPattern: TacticalPattern;
  confidence: Confidence;
  dataQuality: DataQuality;
}

export interface OpponentWeakness {
  id: string;
  statement: string;
  options: string[];           // candidate ways to exploit, labeled "Options"
  supportingTendencyIds: string[];
  confidence: Confidence;
  dataQuality: DataQuality;
}

// ─── Q&A ───

export interface QAEntry {
  id: string;
  question: string;
  answer: string;
  supportingInsightIds: string[];
  hasEvidence: boolean;
}

// ─── Timeline Event Marker ───

export interface TimelineEventMarker {
  timeSec: number;
  timestamp: string;
  type: 'goal' | 'card' | 'tactical' | 'half';
  title: string;
  insightId?: string;
  team: 'home' | 'away';
}
