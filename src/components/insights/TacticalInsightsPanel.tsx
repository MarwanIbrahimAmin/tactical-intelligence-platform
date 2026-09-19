import React from 'react';
import { TACTICAL_INSIGHTS } from '../../data/tacticalEvents';
import { TacticalInsight } from '../../types/tactical';
import { BrainCircuit, Clock, ShieldCheck, ArrowRight, Eye, CheckCircle } from 'lucide-react';

interface TacticalInsightsPanelProps {
  onSelectInsight: (insight: TacticalInsight) => void;
  selectedInsightId?: string;
}

export const TacticalInsightsPanel: React.FC<TacticalInsightsPanelProps> = ({
  onSelectInsight,
  selectedInsightId
}) => {
  return (
    <div className="bg-dark-card rounded-xl p-5 border border-dark-border space-y-4">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-dark-border pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">AI Tactical Insights</h2>
            <p className="text-xs text-gray-400">Evidence-linked automated tactical pattern detection</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 font-mono border border-emerald-500/30">
          {TACTICAL_INSIGHTS.length} Patterns Validated
        </span>
      </div>

      {/* Cards List */}
      <div className="space-y-3">
        {TACTICAL_INSIGHTS.map((insight) => {
          const isSelected = selectedInsightId === insight.id;
          return (
            <div
              key={insight.id}
              className={`p-4 rounded-xl border transition-all space-y-3 ${
                isSelected
                  ? 'bg-dark-cardHover border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                  : 'bg-dark-bg border-dark-border hover:border-dark-borderLight'
              }`}
            >
              {/* Pattern Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 uppercase">
                      {insight.tacticalPattern}
                    </span>
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-500" /> {insight.startTime} – {insight.endTime}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-100">{insight.statement}</h3>
                </div>

                <div className="flex flex-col items-end text-right shrink-0">
                  <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> {insight.confidencePct}% Conf.
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">Data Q: {insight.dataQualityPct}%</span>
                </div>
              </div>

              {/* Evidence Metric Delta */}
              <div className="p-2.5 rounded-lg bg-dark-card border border-dark-border flex items-center justify-between text-xs font-mono">
                <span className="text-gray-400">{insight.metricName}:</span>
                <span className="text-white font-bold flex items-center gap-1.5">
                  <span className="text-gray-400">{insight.metricValueBefore} {insight.unit}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-emerald-400">{insight.metricValueAfter} {insight.unit}</span>
                </span>
              </div>

              {/* Interpretation */}
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                {insight.interpretation}
              </p>

              {/* Action Button */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => onSelectInsight(insight)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 transition-all hover:scale-105"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View Evidence</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
