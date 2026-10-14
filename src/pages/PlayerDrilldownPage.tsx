import React, { useState, useMemo } from 'react';
import { HOME_ROSTER, PLAYER_STATS, INSIGHTS } from '../data/demoData';
import { Insight, PlayerInfo, PlayerMovementStats } from '../types/tactical';
import { PitchMap } from '../components/shared/PitchMap';
import { ConfidenceBadge } from '../components/shared/ConfidenceBadge';
import { DataQualityBadge } from '../components/shared/DataQualityBadge';
import { getFrameAtTime } from '../services/simulationEngine';
import {
  User, MapPin, Footprints, Gauge, Clock, ArrowRight, Info
} from 'lucide-react';

interface PlayerDrilldownPageProps {
  onOpenEvidence: (insight: Insight) => void;
}

export const PlayerDrilldownPage: React.FC<PlayerDrilldownPageProps> = ({ onOpenEvidence }) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number>(7);

  const player = HOME_ROSTER.find((p) => p.id === selectedPlayerId) || HOME_ROSTER[1];
  const stats = PLAYER_STATS.find((s) => s.playerId === selectedPlayerId);

  const midFrame = useMemo(() => getFrameAtTime(2700), []);

  const relatedInsights = useMemo(() => {
    if (!stats) return [];
    return stats.relatedInsightIds
      .map((id) => INSIGHTS.find((i) => i.id === id))
      .filter(Boolean) as Insight[];
  }, [stats]);

  const selectablePlayers = HOME_ROSTER.filter((p) => p.position !== 'Goalkeeper');

  const maxZonePercentage = stats
    ? Math.max(...stats.zoneOccupancy.map((z) => z.percentage))
    : 100;

  return (
    <div className="page-container">
      {/* Page Header */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="text-page-title" style={{ marginBottom: 'var(--space-3)' }}>
          Player Drill-down
        </h1>
        <p className="text-body">
          Individual movement and zone data. No ratings or judgments — context for coaching decisions.
        </p>
      </div>

      {/* Player Selector */}
      <div className="card card-compact" style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <User size={20} style={{ color: 'var(--tactical-lime)' }} />
          <span className="text-label">Select Player</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {selectablePlayers.map((p) => {
            const isActive = p.id === selectedPlayerId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlayerId(p.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${isActive ? 'var(--tactical-lime)' : 'var(--border-default)'}`,
                  background: isActive ? 'var(--green-50)' : 'var(--bg-elevated)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '16px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--tactical-lime)' : 'var(--slate-gray)',
                  transition: 'all 0.15s ease',
                }}
              >
                <span style={{
                  width: 26,
                  height: 26,
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? 'var(--tactical-lime)' : 'var(--bg-surface)',
                  color: isActive ? 'var(--deep-navy)' : 'var(--text-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {p.number}
                </span>
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Player Detail */}
      {player && stats && (
        <div className="animate-fade-in-up">
          {/* Player header */}
          <div className="card" style={{
            marginBottom: 'var(--space-8)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-6)',
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: 'var(--radius-full)',
              background: 'var(--tactical-lime)',
              color: 'var(--deep-navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-heading)',
              fontSize: '28px',
              fontWeight: 800,
              flexShrink: 0,
            }}>
              {player.number}
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--size-h2)', fontWeight: 700, color: 'var(--off-white)' }}>
                {player.name}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body)', color: 'var(--slate-gray)', fontWeight: 500 }}>
                {player.position} · {stats.minutesPlayed} minutes
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--space-5)',
            marginBottom: 'var(--space-8)',
          }}>
            {[
              { icon: <Footprints size={22} />, value: stats.estimatedDistanceKm, label: 'km covered', color: 'var(--tactical-lime)' },
              { icon: <Gauge size={22} />, value: stats.estimatedAvgSpeedKmH, label: 'avg km/h', color: 'var(--tactical-lime)' },
              { icon: <Gauge size={22} />, value: stats.estimatedMaxSpeedKmH, label: 'max km/h', color: 'var(--alert-amber)' },
              { icon: <Clock size={22} />, value: stats.minutesPlayed, label: 'minutes', color: 'var(--slate-gray)' },
            ].map((stat, si) => (
              <div key={si} className="card card-compact" style={{ textAlign: 'center' }}>
                <div style={{ color: stat.color, marginBottom: 'var(--space-3)' }}>{stat.icon}</div>
                <div className="text-metric">{stat.value}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--slate-gray)', marginTop: 'var(--space-2)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Movement estimates notice */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            padding: 'var(--space-3) var(--space-4)',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: 'var(--space-8)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--text-tertiary)',
          }}>
            <Info size={16} style={{ flexShrink: 0 }} />
            Distance and speed are movement estimates from video tracking, not physiological measurements.
          </div>

          {/* Two-column: Heatmap + Zone Occupancy */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
            <div>
              <h3 className="text-card-title" style={{ marginBottom: 'var(--space-4)' }}>Heatmap</h3>
              <PitchMap
                frame={midFrame}
                showOpponent={false}
                highlightPlayerId={selectedPlayerId}
                heatmapPoints={stats.heatmapPoints}
              />
            </div>

            <div>
              <h3 className="text-card-title" style={{ marginBottom: 'var(--space-4)' }}>Zone Occupancy</h3>
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {stats.zoneOccupancy.map((zone, zi) => (
                  <div key={zi}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--size-body-sm)', fontWeight: 600, color: 'var(--off-white)' }}>
                        {zone.zone}
                      </span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body-sm)', fontWeight: 700, color: 'var(--tactical-lime)' }}>
                        {zone.percentage}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-bar__fill"
                        style={{ width: `${(zone.percentage / maxZonePercentage) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Position Relative to Team Shape */}
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <h3 className="text-card-title" style={{ marginBottom: 'var(--space-4)' }}>
              Position Relative to Team Shape
            </h3>
            <PitchMap
              frame={midFrame}
              showCompactness={true}
              highlightPlayerId={selectedPlayerId}
            />
          </div>

          {/* Related Insights */}
          {relatedInsights.length > 0 && (
            <div>
              <h3 className="text-card-title" style={{ marginBottom: 'var(--space-4)' }}>
                Detected Patterns Involving This Player
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {relatedInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className="card card-compact"
                    style={{ cursor: 'pointer', transition: 'border-color 0.15s' }}
                    onClick={() => onOpenEvidence(insight)}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'var(--tactical-lime)'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body)', fontWeight: 600, color: 'var(--off-white)', marginBottom: 'var(--space-2)' }}>
                          {insight.statement}
                        </p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body-sm)', color: 'var(--slate-gray)', marginBottom: 'var(--space-2)' }}>
                          {insight.metric}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                          <ConfidenceBadge confidence={insight.confidence} />
                          <DataQualityBadge quality={insight.dataQuality} />
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--text-tertiary)' }}>
                            <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
                            {insight.interval.start} – {insight.interval.end}
                          </span>
                        </div>
                      </div>
                      <ArrowRight size={18} style={{ color: 'var(--tactical-lime)', flexShrink: 0 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {relatedInsights.length === 0 && (
            <div className="card" style={{
              textAlign: 'center',
              padding: 'var(--space-8)',
              color: 'var(--text-muted)',
            }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body)', fontWeight: 500 }}>
                No detected tactical patterns specifically involving this player in this match.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
