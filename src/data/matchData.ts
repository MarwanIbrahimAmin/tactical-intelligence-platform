import { MatchInfo, PitchFrame } from '../types/tactical';
import { getFrameAtTime } from '../services/simulationEngine';

export const CURRENT_MATCH: MatchInfo = {
  id: 'match-2026-001',
  homeTeam: 'Al Ahly Academy',
  awayTeam: 'Zamalek Academy',
  homeScore: 2,
  awayScore: 1,
  competition: 'U19 Premier League — Matchday 18',
  date: '2026-09-17',
  venue: 'Ahly Youth Complex, Cairo',
  durationMins: 90,
  dataSourceStatus: 'Hybrid Video + EPTS (94% Quality)'
};

export const sampleFrames: PitchFrame[] = [
  getFrameAtTime(1394), // 23:14 Loss of Compactness
  getFrameAtTime(1398), // 23:18 Peak Dispersion
  getFrameAtTime(1902), // 31:42 Goal
  getFrameAtTime(3271)  // 54:31 Attacking Width Expansion
];
