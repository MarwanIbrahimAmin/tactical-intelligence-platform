import React, { useState } from 'react';
import { OPPONENT_TENDENCIES, OPPONENT_WEAKNESSES } from '../data/demoData';
import { ConfidenceBadge } from '../components/shared/ConfidenceBadge';
import { DataQualityBadge } from '../components/shared/DataQualityBadge';
import { TACTICAL_PATTERN_TOOLTIPS } from '../types/tactical';
import {
  Upload, CheckCircle2, Clock, Film, ChevronRight,
  AlertTriangle, Lightbulb, TrendingUp, Play
} from 'lucide-react';

interface OpponentReportPageProps {
  onOpenEvidence?: (insightId: string) => void;
}

export const OpponentReportPage: React.FC<OpponentReportPageProps> = ({ onOpenEvidence }) => {
  const [uploads] = useState([
    { name: 'Match 1 — Zamalek vs ENPPI (Sep 3)', status: 'complete' as const },
    { name: 'Match 2 — Zamalek vs Ismaily (Sep 10)', status: 'complete' as const },
    { name: 'Match 3 — Zamalek vs Pyramids (Sep 14)', status: 'complete' as const },
  ]);

  const top3 = OPPONENT_TENDENCIES.slice(0, 3);

  return (
    <div className="page-container">
      {/* Page Header */}
      <div style={{ marginBottom: 'var(--space-10)' }}>
        <h1 className="text-page-title" style={{ marginBottom: 'var(--space-3)' }}>
          Opponent Report
        </h1>
        <p className="text-body" style={{ maxWidth: 680 }}>
          Zamalek U19 — recurring tactical tendencies across 3 uploaded matches.
          Only tendencies observed in at least 2 matches are shown.
        </p>
      </div>

      {/* Upload Section */}
      <div className="card" style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
          <Upload size={22} style={{ color: 'var(--tactical-lime)' }} />
          <h2 className="text-card-title">Uploaded Matches</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {uploads.map((u, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--space-4) var(--space-5)',
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Film size={18} style={{ color: 'var(--slate-gray)' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body-sm)', fontWeight: 600, color: 'var(--off-white)' }}>{u.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 600, color: 'var(--success-green)' }}>Processed</span>
              </div>
            </div>
          ))}
        </div>
        {/* Upload button */}
        <div className="upload-area" style={{ marginTop: 'var(--space-5)', padding: 'var(--space-6) var(--space-5)' }}>
          <Upload size={28} style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }} />
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--size-body-sm)', fontWeight: 600, color: 'var(--slate-gray)' }}>
            Drop match video here or click to upload
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-muted)', marginTop: 'var(--space-1)' }}>
            MP4, MOV — up to 3 matches per opponent
          </p>
        </div>
      </div>

      {/* Top 3 Summary */}
      <div className="card" style={{
        marginBottom: 'var(--space-8)',
        background: 'var(--green-50)',
        borderColor: 'var(--green-200)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
          <TrendingUp size={22} style={{ color: 'var(--tactical-lime)' }} />
          <h2 className="text-card-title" style={{ color: 'var(--tactical-lime)' }}>Top 3 Recurring Tendencies</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {top3.map((t, i) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-full)',
                background: 'var(--pitch-green)',
                color: 'var(--off-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-heading)',
                fontSize: '18px',
                fontWeight: 700,
                flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body)', fontWeight: 600, color: 'var(--off-white)' }}>
                  {t.title}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body-sm)', color: 'var(--slate-gray)', marginTop: 4 }}>
                  Seen in {t.matchesAppeared} of {t.totalMatches} matches
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Tendencies */}
      <h2 className="text-section-title" style={{ marginBottom: 'var(--space-5)' }}>
        All Tendencies
      </h2>
      <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', marginBottom: 'var(--space-10)' }}>
        {OPPONENT_TENDENCIES.map((tendency) => {
          const tooltip = TACTICAL_PATTERN_TOOLTIPS[tendency.relatedPattern];
          return (
            <div key={tendency.id} className="card" style={{ cursor: 'default' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-5)' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--size-h3)', fontWeight: 600, color: 'var(--off-white)', marginBottom: 'var(--space-3)' }}>
                    {tendency.title}
                  </h3>
                  <p className="text-body" style={{ marginBottom: 'var(--space-4)' }}>
                    {tendency.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    <ConfidenceBadge confidence={tendency.confidence} />
                    <DataQualityBadge quality={tendency.dataQuality} />
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
                      {tendency.relatedPattern}
                      <span className="tooltip-content">{tooltip}</span>
                    </span>
                  </div>
                </div>
                {/* Match count */}
                <div style={{
                  textAlign: 'center',
                  padding: 'var(--space-4) var(--space-5)',
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  flexShrink: 0,
                }}>
                  <div className="text-metric" style={{ fontSize: 'var(--size-kpi)' }}>
                    {tendency.matchesAppeared}/{tendency.totalMatches}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--slate-gray)', marginTop: 4 }}>
                    matches
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                {tendency.clipRefs.map((clip, ci) => (
                  <button key={clip} className="btn btn-ghost" style={{ fontSize: '14px', padding: '6px 12px' }}>
                    <Play size={14} />
                    Match {ci + 1} clip
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recurring Weaknesses */}
      <h2 className="text-section-title" style={{ marginBottom: 'var(--space-3)' }}>
        Recurring Weaknesses
      </h2>
      <p className="text-body" style={{ marginBottom: 'var(--space-5)', maxWidth: 680 }}>
        Candidate ways to exploit observed tendencies. These are options — the final tactical decision belongs to the coach.
      </p>
      <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {OPPONENT_WEAKNESSES.map((weakness) => (
          <div key={weakness.id} className="card" style={{ cursor: 'default' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
              <Lightbulb size={22} style={{ color: 'var(--alert-amber)', flexShrink: 0, marginTop: 4 }} />
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body)', fontWeight: 600, color: 'var(--off-white)' }}>
                  {weakness.statement}
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                  <ConfidenceBadge confidence={weakness.confidence} />
                  <DataQualityBadge quality={weakness.dataQuality} />
                </div>
              </div>
            </div>
            <div style={{
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4) var(--space-5)',
              marginBottom: 'var(--space-3)',
            }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
                Options
              </div>
              {weakness.options.map((opt, oi) => (
                <div key={oi} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-2)',
                  marginBottom: oi < weakness.options.length - 1 ? 'var(--space-3)' : 0,
                }}>
                  <ChevronRight size={16} style={{ color: 'var(--tactical-lime)', flexShrink: 0, marginTop: 4 }} />
                  <p className="text-body">{opt}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Final decision belongs to the coach.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
