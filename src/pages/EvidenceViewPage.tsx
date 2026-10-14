import React from 'react';
import { Insight } from '../types/tactical';
import { INSIGHTS } from '../data/demoData';
import { ConfidenceBadge } from '../components/shared/ConfidenceBadge';
import { DataQualityBadge } from '../components/shared/DataQualityBadge';
import { ClipPlayer } from '../components/shared/ClipPlayer';
import { PitchMap } from '../components/shared/PitchMap';
import { TACTICAL_PATTERN_TOOLTIPS, PitchFrame } from '../types/tactical';
import { getFrameAtTime } from '../services/simulationEngine';
import {
  ArrowLeft, Clock, FileText, BarChart3,
  AlertTriangle, Info, ArrowUpDown
} from 'lucide-react';

interface EvidenceViewPageProps {
  insight: Insight | null;
  onBack: () => void;
}

export const EvidenceViewPage: React.FC<EvidenceViewPageProps> = ({ insight, onBack }) => {
  if (!insight) {
    return (
      <div className="page-container">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 className="text-page-title" style={{ marginBottom: 'var(--space-3)' }}>Evidence View</h1>
          <p className="text-body">Click any insight on any page to see its full evidence here.</p>
        </div>

        <div className="card" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 'var(--space-12)',
          textAlign: 'center',
        }}>
          <FileText size={56} style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-5)', opacity: 0.3 }} />
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--size-h3)', fontWeight: 600, color: 'var(--off-white)', marginBottom: 'var(--space-3)' }}>
            No insight selected
          </p>
          <p className="text-body" style={{ maxWidth: 480, marginBottom: 'var(--space-8)' }}>
            Click "View evidence" on any insight card across the Opponent Report, Match & Q&A, or Player Drill-down pages.
          </p>

          <div style={{ width: '100%', maxWidth: 640 }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-4)' }}>
              Or select an insight below
            </p>
            {INSIGHTS.map((ins) => (
              <button
                key={ins.id}
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  marginBottom: 'var(--space-2)',
                  padding: 'var(--space-4) var(--space-5)',
                }}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-evidence', { detail: ins }));
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body-sm)', fontWeight: 600, color: 'var(--off-white)' }}>
                    {ins.statement}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-tertiary)', marginTop: 4 }}>
                    {ins.interval.start} – {ins.interval.end} · {ins.confidence} confidence
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isUncertain = insight.dataQuality === 'Uncertain';
  const patternTooltip = TACTICAL_PATTERN_TOOLTIPS[insight.tacticalPattern];

  let frame: PitchFrame | null = null;
  try {
    frame = getFrameAtTime(insight.interval.startSec);
  } catch {
    // fallback
  }

  return (
    <div className="page-container">
      {/* Back */}
      <button
        className="btn btn-ghost"
        onClick={onBack}
        style={{ marginBottom: 'var(--space-5)', padding: 'var(--space-2) var(--space-4)' }}
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Header */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="text-page-title" style={{ marginBottom: 'var(--space-3)' }}>Evidence View</h1>
        <p className="text-body">Full verification — metric, evidence, and known limitations.</p>
      </div>

      {/* Uncertain warning */}
      {isUncertain && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
          padding: 'var(--space-5)',
          background: 'var(--amber-50)',
          border: '1px solid var(--amber-200)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: 'var(--space-8)',
        }}>
          <AlertTriangle size={24} style={{ color: 'var(--alert-amber)', flexShrink: 0 }} />
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--size-body)', fontWeight: 700, color: 'var(--alert-amber)' }}>
              Data quality is uncertain for this interval
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body-sm)', color: 'var(--alert-amber)', marginTop: 4 }}>
              {insight.limitations || 'Tracking confidence was below normal thresholds. Treat values as approximate.'}
            </p>
          </div>
        </div>
      )}

      {/* Statement + Meta */}
      <div className="card" style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--size-h2)',
          fontWeight: 600,
          color: isUncertain ? 'var(--alert-amber)' : 'var(--off-white)',
          lineHeight: 1.3,
          marginBottom: 'var(--space-4)',
        }}>
          {insight.statement}
        </h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--size-body)',
          fontWeight: 500,
          color: isUncertain ? 'var(--alert-amber)' : 'var(--slate-gray)',
          marginBottom: 'var(--space-5)',
        }}>
          {insight.metric}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <ConfidenceBadge confidence={insight.confidence} />
          <DataQualityBadge quality={insight.dataQuality} />
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--text-tertiary)',
          }}>
            <Clock size={14} />
            {insight.interval.start} – {insight.interval.end}
          </span>
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
      </div>

      {/* Two-column: Video + Pitch */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
        <div>
          <h3 className="text-card-title" style={{ marginBottom: 'var(--space-4)' }}>Video Clip</h3>
          <ClipPlayer clipRef={insight.evidence.clipRef} interval={insight.interval} title={insight.statement} />
        </div>
        <div>
          <h3 className="text-card-title" style={{ marginBottom: 'var(--space-4)' }}>Pitch Plot — {insight.interval.start}</h3>
          {frame ? (
            <PitchMap
              frame={frame}
              showCompactness={insight.tacticalPattern === 'Loss of compactness after losing possession'}
              showLines={insight.tacticalPattern === 'Change in line spacing'}
            />
          ) : (
            <div className="card" style={{
              aspectRatio: '105/68',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--size-body-sm)',
            }}>
              Pitch data not available for this interval
            </div>
          )}
        </div>
      </div>

      {/* Before / After + Formula */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
        {(insight.metricBefore !== undefined && insight.metricAfter !== undefined) && (
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
              <ArrowUpDown size={20} style={{ color: 'var(--tactical-lime)' }} />
              <h3 className="text-card-title">Before & After</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 'var(--space-5)', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
                  Before
                </div>
                <div className="text-metric">{String(insight.metricBefore)}</div>
              </div>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--slate-gray)',
                fontFamily: 'var(--font-heading)',
                fontSize: '20px',
              }}>
                →
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
                  After
                </div>
                <div className="text-metric" style={{
                  color: isUncertain ? 'var(--alert-amber)' : 'var(--tactical-lime)',
                }}>
                  {String(insight.metricAfter)}
                </div>
              </div>
            </div>
          </div>
        )}

        {insight.formulaExplanation && (
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <Info size={20} style={{ color: 'var(--tactical-lime)' }} />
              <h3 className="text-card-title">How This Is Measured</h3>
            </div>
            <p className="text-body" style={{ lineHeight: 1.7 }}>
              {insight.formulaExplanation}
            </p>
          </div>
        )}
      </div>

      {/* Limitations */}
      {insight.limitations && (
        <div className="card" style={{
          background: isUncertain ? 'var(--amber-50)' : 'var(--bg-surface)',
          borderColor: isUncertain ? 'var(--amber-200)' : 'var(--border-subtle)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <AlertTriangle size={20} style={{ color: isUncertain ? 'var(--alert-amber)' : 'var(--slate-gray)' }} />
            <h3 className="text-card-title" style={{
              color: isUncertain ? 'var(--alert-amber)' : 'var(--off-white)',
            }}>
              Known Limitations
            </h3>
          </div>
          <p className="text-body" style={{
            color: isUncertain ? 'var(--alert-amber)' : 'var(--slate-gray)',
          }}>
            {insight.limitations}
          </p>
        </div>
      )}
    </div>
  );
};
