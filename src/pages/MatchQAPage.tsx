import React, { useState } from 'react';
import {
  CURRENT_MATCH,
  MATCH_CHUNKS,
  MATCH_TIMELINE_EVENTS,
  INSIGHTS,
  HALFTIME_FINDINGS,
  HALFTIME_OPTIONS,
  SUGGESTED_QUESTIONS,
  QA_DATABASE,
} from '../data/demoData';
import { Insight, MatchChunk, QAEntry } from '../types/tactical';
import { InsightCard } from '../components/shared/InsightCard';
import { ConfidenceBadge } from '../components/shared/ConfidenceBadge';
import { DataQualityBadge } from '../components/shared/DataQualityBadge';
import {
  Upload, CheckCircle2, Film, Clock, ChevronRight,
  MessageSquare, Send, Lightbulb, AlertTriangle, Zap,
  Target, ArrowRight
} from 'lucide-react';

interface MatchQAPageProps {
  onOpenEvidence: (insight: Insight) => void;
}

export const MatchQAPage: React.FC<MatchQAPageProps> = ({ onOpenEvidence }) => {
  const [questionInput, setQuestionInput] = useState('');
  const [activeQA, setActiveQA] = useState<QAEntry | null>(null);
  const [showNoEvidence, setShowNoEvidence] = useState(false);

  const handleAskQuestion = (question: string) => {
    setShowNoEvidence(false);
    const found = QA_DATABASE.find((qa) =>
      qa.question.toLowerCase() === question.toLowerCase() ||
      question.toLowerCase().includes(qa.question.toLowerCase().replace('?', ''))
    );
    if (found) {
      setActiveQA(found);
    } else {
      setActiveQA(null);
      setShowNoEvidence(true);
    }
    setQuestionInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (questionInput.trim()) {
      handleAskQuestion(questionInput.trim());
    }
  };

  const getInsightById = (id: string) => INSIGHTS.find((i) => i.id === id);

  const phaseColor = (key: string) => {
    switch (key) {
      case 'attacking': case 'attacking_transition': return 'var(--tactical-lime)';
      case 'defensive': case 'defensive_transition': return 'var(--alert-amber)';
      case 'pressing': return 'var(--pitch-green)';
      default: return 'var(--slate-gray)';
    }
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="text-page-title" style={{ marginBottom: 'var(--space-3)' }}>
          Match Chunks & Q&A
        </h1>
        <p className="text-body">
          {CURRENT_MATCH.homeTeam} {CURRENT_MATCH.homeScore} – {CURRENT_MATCH.awayScore} {CURRENT_MATCH.awayTeam}
          <span style={{ color: 'var(--text-muted)', marginLeft: 'var(--space-3)' }}>
            {CURRENT_MATCH.competition} · {CURRENT_MATCH.date}
          </span>
        </p>
      </div>

      {/* Upload Status */}
      <div className="card card-compact" style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Film size={18} style={{ color: 'var(--success-green)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body-sm)', fontWeight: 600, color: 'var(--off-white)' }}>
              Match video uploaded & processed
            </span>
            <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />
          </div>
          <div className="demo-notice">Simulated demo data</div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 'var(--space-8)', alignItems: 'start' }}>

        {/* Left: Timeline + Halftime */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>

          {/* Halftime Summary */}
          <div className="card" style={{
            background: 'var(--green-50)',
            borderColor: 'var(--green-200)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
              <Target size={22} style={{ color: 'var(--tactical-lime)' }} />
              <h2 className="text-card-title" style={{ color: 'var(--tactical-lime)' }}>Halftime Summary</h2>
            </div>

            <div style={{ marginBottom: 'var(--space-5)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: 'var(--tactical-lime)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
                Key First-Half Findings
              </div>
              {HALFTIME_FINDINGS.map((insight) => (
                <div key={insight.id} style={{
                  padding: 'var(--space-4)',
                  background: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-default)',
                  marginBottom: 'var(--space-3)',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s',
                }} onClick={() => onOpenEvidence(insight)}
                   onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--tactical-lime)'}
                   onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-default)'}
                >
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body-sm)', fontWeight: 600, color: 'var(--off-white)', marginBottom: 'var(--space-2)' }}>
                    {insight.statement}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--slate-gray)' }}>
                    {insight.metric}
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                    <ConfidenceBadge confidence={insight.confidence} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                      <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
                      {insight.interval.start} – {insight.interval.end}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4) var(--space-5)',
              border: '1px solid var(--border-default)',
            }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
                Candidate Adjustments — Options
              </div>
              {HALFTIME_OPTIONS.map((opt, oi) => (
                <div key={oi} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-2)',
                  marginBottom: oi < HALFTIME_OPTIONS.length - 1 ? 'var(--space-3)' : 0,
                }}>
                  <ChevronRight size={16} style={{ color: 'var(--tactical-lime)', flexShrink: 0, marginTop: 4 }} />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body-sm)', color: 'var(--slate-gray)' }}>{opt}</p>
                </div>
              ))}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 'var(--space-4)' }}>
                Final decision belongs to the coach.
              </p>
            </div>
          </div>

          {/* Match Timeline */}
          <div>
            <h2 className="text-section-title" style={{ marginBottom: 'var(--space-5)' }}>
              Match Timeline
            </h2>
            <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {MATCH_CHUNKS.map((chunk) => {
                const chunkInsights = chunk.insightIds.map(getInsightById).filter(Boolean) as Insight[];
                const isUncertain = chunk.dataQuality === 'Uncertain';
                return (
                  <div
                    key={chunk.id}
                    className="card card-compact"
                    style={{
                      borderLeft: `4px solid ${phaseColor(chunk.phaseKey)}`,
                      ...(isUncertain ? { background: 'var(--amber-50)', borderColor: 'var(--alert-amber)' } : {}),
                    }}
                  >
                    {isUncertain && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--alert-amber)',
                        marginBottom: 'var(--space-3)',
                      }}>
                        <AlertTriangle size={14} />
                        Data quality uncertain for this interval
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--size-body)', fontWeight: 700, color: 'var(--off-white)', marginBottom: 'var(--space-2)' }}>
                          {chunk.title}
                        </h3>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body-sm)', color: 'var(--slate-gray)', marginBottom: 'var(--space-3)' }}>
                          {chunk.summary}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                            <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
                            {chunk.interval.start} – {chunk.interval.end}
                          </span>
                          <DataQualityBadge quality={chunk.dataQuality} />
                          {chunk.keyMetrics.map((m, mi) => (
                            <span key={mi} className="tag">{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {chunkInsights.length > 0 && (
                      <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
                        {chunkInsights.map((insight) => (
                          <div
                            key={insight.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: 'var(--space-3) var(--space-4)',
                              background: 'var(--bg-elevated)',
                              borderRadius: 'var(--radius-md)',
                              cursor: 'pointer',
                              marginBottom: 'var(--space-2)',
                              transition: 'all 0.15s',
                              border: '1px solid transparent',
                            }}
                            onClick={() => onOpenEvidence(insight)}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--tactical-lime)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent'; }}
                          >
                            <div style={{ flex: 1 }}>
                              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body-sm)', fontWeight: 600, color: 'var(--off-white)' }}>{insight.statement}</p>
                              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
                                <ConfidenceBadge confidence={insight.confidence} />
                              </div>
                            </div>
                            <ArrowRight size={16} style={{ color: 'var(--tactical-lime)', flexShrink: 0 }} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Q&A Panel */}
        <div style={{ position: 'sticky', top: 'var(--space-8)' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
              <MessageSquare size={22} style={{ color: 'var(--tactical-lime)' }} />
              <h2 className="text-card-title">Ask About This Match</h2>
            </div>

            {/* Suggested questions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-5)' }}>
              {SUGGESTED_QUESTIONS.map((q, qi) => (
                <button
                  key={qi}
                  className="btn btn-secondary"
                  style={{ justifyContent: 'flex-start', fontSize: '14px', padding: 'var(--space-3) var(--space-4)' }}
                  onClick={() => handleAskQuestion(q)}
                >
                  <Zap size={14} style={{ color: 'var(--tactical-lime)' }} />
                  {q}
                </button>
              ))}
            </div>

            <div className="divider" />

            {/* Answer area */}
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: 'var(--space-4)' }}>
              {activeQA && (
                <div className="animate-fade-in-up">
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-4)' }}>
                    <div style={{
                      background: 'var(--pitch-green)',
                      color: 'var(--off-white)',
                      padding: 'var(--space-3) var(--space-5)',
                      borderRadius: 'var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--size-body-sm)',
                      fontWeight: 500,
                      maxWidth: '85%',
                    }}>
                      {activeQA.question}
                    </div>
                  </div>

                  <div style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-default)',
                    padding: 'var(--space-5)',
                    borderRadius: 'var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--size-body-sm)',
                    color: 'var(--slate-gray)',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-line',
                    marginBottom: 'var(--space-4)',
                  }}>
                    {activeQA.answer}
                  </div>

                  {activeQA.supportingInsightIds.length > 0 && (
                    <div style={{ marginBottom: 'var(--space-4)' }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
                        Supporting Evidence
                      </div>
                      {activeQA.supportingInsightIds.map((id) => {
                        const insight = getInsightById(id);
                        if (!insight) return null;
                        return (
                          <div
                            key={id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--space-2)',
                              padding: 'var(--space-3) var(--space-4)',
                              background: 'var(--bg-elevated)',
                              borderRadius: 'var(--radius-md)',
                              cursor: 'pointer',
                              marginBottom: 'var(--space-1)',
                              fontFamily: 'var(--font-heading)',
                              fontSize: '14px',
                              fontWeight: 600,
                              color: 'var(--tactical-lime)',
                              transition: 'background 0.15s',
                              border: '1px solid var(--border-subtle)',
                            }}
                            onClick={() => onOpenEvidence(insight)}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-surface-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
                          >
                            <ArrowRight size={14} />
                            View evidence: {insight.interval.start} – {insight.interval.end}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {showNoEvidence && (
                <div className="animate-fade-in-up" style={{
                  background: 'var(--amber-50)',
                  border: '1px solid var(--amber-200)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-5)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-3)',
                }}>
                  <AlertTriangle size={22} style={{ color: 'var(--alert-amber)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--size-body)', fontWeight: 600, color: 'var(--alert-amber)', marginBottom: 'var(--space-2)' }}>
                      Not enough evidence
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--size-body-sm)', color: 'var(--alert-amber)' }}>
                      Not enough evidence in the available data to answer this. Try one of the suggested questions above.
                    </p>
                  </div>
                </div>
              )}

              {!activeQA && !showNoEvidence && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'var(--space-10) var(--space-5)',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                }}>
                  <MessageSquare size={40} style={{ marginBottom: 'var(--space-4)', opacity: 0.3 }} />
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--size-body-sm)', fontWeight: 600 }}>
                    Ask a question about this match
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', marginTop: 'var(--space-2)' }}>
                    Answers are grounded in match data only
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <input
                className="input"
                type="text"
                placeholder="Ask about this match..."
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                style={{ flex: 1 }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!questionInput.trim()}
                style={{ opacity: questionInput.trim() ? 1 : 0.4 }}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
