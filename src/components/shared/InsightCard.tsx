import React from 'react';
import { Confidence, DataQuality, Insight, TACTICAL_PATTERN_TOOLTIPS } from '../../types/tactical';
import { ConfidenceBadge } from './ConfidenceBadge';
import { DataQualityBadge } from './DataQualityBadge';
import { Clock, Play, ChevronRight, AlertTriangle } from 'lucide-react';

interface InsightCardProps {
  insight: Insight;
  onClick?: (insight: Insight) => void;
  compact?: boolean;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, onClick, compact = false }) => {
  const isUncertain = insight.dataQuality === 'Uncertain';
  const patternTooltip = TACTICAL_PATTERN_TOOLTIPS[insight.tacticalPattern];

  return (
    <div
      className={`insight-card ${isUncertain ? 'insight-card--uncertain' : ''} animate-fade-in-up`}
      onClick={() => onClick?.(insight)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(insight)}
    >
      {/* Warning banner for uncertain data */}
      {isUncertain && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: 'var(--space-2) var(--space-3)',
          marginBottom: 'var(--space-3)',
          background: 'var(--amber-100)',
          borderRadius: 'var(--radius-md)',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--alert-amber)',
        }}>
          <AlertTriangle size={16} />
          Data quality uncertain — treat as approximate
        </div>
      )}

      {/* Statement */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: compact ? 'var(--size-body-sm)' : 'var(--size-body)',
        fontWeight: 600,
        color: 'var(--off-white)',
        lineHeight: 1.5,
        marginBottom: 'var(--space-2)',
      }}>
        {insight.statement}
      </p>

      {/* Metric */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--size-body-sm)',
        color: isUncertain ? 'var(--alert-amber)' : 'var(--slate-gray)',
        marginBottom: 'var(--space-3)',
        fontWeight: 500,
      }}>
        {insight.metric}
      </p>

      {/* Meta row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-2)',
      }}>
        <ConfidenceBadge confidence={insight.confidence} />
        <DataQualityBadge quality={insight.dataQuality} />

        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--text-tertiary)',
        }}>
          <Clock size={14} />
          {insight.interval.start} – {insight.interval.end}
        </span>

        {/* Tactical pattern tag with tooltip */}
        <span className="tooltip-trigger" style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--tactical-lime)',
          background: 'var(--green-100)',
          padding: '3px 10px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--green-200)',
          borderBottom: 'none',
        }}>
          {insight.tacticalPattern}
          <span className="tooltip-content">{patternTooltip}</span>
        </span>
      </div>

      {/* View evidence link */}
      {onClick && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginTop: 'var(--space-3)',
          fontFamily: 'var(--font-heading)',
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--tactical-lime)',
        }}>
          <Play size={14} />
          View evidence
          <ChevronRight size={14} />
        </div>
      )}
    </div>
  );
};
