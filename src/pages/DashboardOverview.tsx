import React, { useState } from 'react';
import { getFrameAtTime } from '../services/simulationEngine';
import { PitchFrame, TacticalInsight } from '../types/tactical';
import { TACTICAL_INSIGHTS } from '../data/tacticalEvents';
import { PitchCanvas } from '../components/pitch/PitchCanvas';
import { MetricCard } from '../components/common/MetricCard';
import { Video, ShieldAlert, ArrowRight, CheckCircle2, Clock, Target, Dumbbell } from 'lucide-react';

interface MatchSummaryProps {
  onOpenEvidence: (insight: TacticalInsight) => void;
  onNavigateToTactical: () => void;
}

export const DashboardOverview: React.FC<MatchSummaryProps> = ({
  onOpenEvidence,
  onNavigateToTactical
}) => {
  const [currentSec, setCurrentSec] = useState<number>(1394); // Default 23:14
  const [selectedInsightId, setSelectedInsightId] = useState<string>('insight-001');

  const activeFrame: PitchFrame = getFrameAtTime(currentSec);

  // Timeline incidents (reusing existing TACTICAL_INSIGHTS data)
  const timelineIncidents = [
    { sec: 1394, time: '23:14', id: 'insight-001', label: 'Compactness Loss', type: 'critical' },
    { sec: 2887, time: '48:07', id: 'insight-004', label: 'High Press Success', type: 'success' },
    { sec: 3271, time: '54:31', id: 'insight-002', label: 'Attacking Width', type: 'warning' },
    { sec: 4051, time: '67:31', id: 'insight-003', label: 'Line Separation', type: 'critical' },
  ];

  const handleSelectIncident = (sec: number, id: string) => {
    setCurrentSec(sec);
    setSelectedInsightId(id);
    const element = document.getElementById(`insight-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      {/* HERO BAND: "COACH'S VERDICT" */}
      <div className="bg-[#E8F5EE] rounded-3xl p-6 lg:p-7 border border-emerald-200 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-200/60 pb-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#1F9D55] text-white text-xs font-bold uppercase tracking-wider">
              Coach's Verdict
            </span>
            <span className="text-xs lg:text-sm font-semibold text-[#188245]">
              Al Ahly 2 — 1 Zamalek • U19 Premier League (Matchday 18)
            </span>
          </div>

          {/* 3 Status Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-100 text-[#188245] border border-emerald-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Pressing: Good
            </span>
            <span className="bg-red-100 text-red-700 border border-red-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> Transitions: Weak
            </span>
            <span className="bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" /> Width: Slightly wide
            </span>
          </div>
        </div>

        {/* Big Headline Summary Sentence */}
        <h1 className="text-xl lg:text-2xl xl:text-3xl font-extrabold text-slate-900 leading-snug">
          "Strong pressing execution, but the team lost shape and expanded centrally after losing possession."
        </h1>
      </div>

      {/* MATCH TIMELINE STRIP (0' to 90') */}
      <div className="bg-white rounded-2xl p-4 lg:p-5 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs lg:text-sm font-bold text-slate-800">
          <span className="flex items-center gap-2 text-slate-900">
            <Clock className="w-4 h-4 text-[#1F9D55]" /> Key Incidents Timeline (0' — 90')
          </span>
          <span className="text-slate-500 font-normal text-xs">Click incident marker to jump to breakdown</span>
        </div>

        <div className="relative pt-2 pb-1">
          {/* Main Bar */}
          <div className="w-full h-3 bg-slate-100 rounded-full relative overflow-visible">
            <div className="absolute top-0 bottom-0 left-0 bg-emerald-200 rounded-full w-full" />
            
            {/* Incident Markers */}
            {timelineIncidents.map((item) => {
              const leftPct = (item.sec / 5400) * 100;
              const isSelected = selectedInsightId === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectIncident(item.sec, item.id)}
                  style={{ left: `${leftPct}%` }}
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 z-10 shadow-2xs ${
                    item.type === 'critical'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : item.type === 'warning'
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-[#1F9D55] text-white hover:bg-[#188245]'
                  } ${isSelected ? 'ring-4 ring-emerald-300 scale-110' : ''}`}
                >
                  <span>{item.time}</span>
                  <span className="hidden sm:inline font-normal text-[11px] opacity-90">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* BALANCED 2-COLUMN LAYOUT (~55% Left / ~45% Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN (~55% Width, 7 Cols): 4 Key Takeaways List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-lg lg:text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#1F9D55]" />
              Match Key Takeaways (4 Highlights)
            </h2>
            <span className="text-xs text-slate-500 font-medium">Ranked by Priority</span>
          </div>

          <div className="space-y-4">
            {TACTICAL_INSIGHTS.map((insight, idx) => {
              const isSelected = selectedInsightId === insight.id;
              const isCritical = insight.severity === 'significant';
              const isWarning = insight.severity === 'moderate';

              return (
                <div
                  id={`insight-card-${insight.id}`}
                  key={insight.id}
                  onClick={() => {
                    setCurrentSec(insight.startSec);
                    setSelectedInsightId(insight.id);
                  }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 bg-white shadow-2xs hover:shadow-xs space-y-3 ${
                    isSelected
                      ? 'ring-2 ring-[#1F9D55] border-emerald-300 bg-[#E8F5EE]/30'
                      : isCritical
                      ? 'border-red-200 hover:border-red-300'
                      : isWarning
                      ? 'border-amber-200 hover:border-amber-300'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                          #{idx + 1}
                        </span>
                        <span className={`text-xs font-bold px-3 py-0.5 rounded-full ${
                          isCritical ? 'bg-red-100 text-red-700 border border-red-200' :
                          isWarning ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                          'bg-emerald-100 text-[#188245] border border-emerald-200'
                        }`}>
                          {isCritical ? 'Critical Issue' : isWarning ? 'Tactical Warning' : 'Pattern Success'}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> {insight.startTime}
                        </span>
                      </div>

                      <h3 className="text-base lg:text-lg font-bold text-slate-900 leading-snug">
                        {insight.statement === 'Loss of Defensive Compactness during transition phase'
                          ? `Team lost compactness after losing the ball (${insight.metricValueBefore} m² → ${insight.actualValue} m²)`
                          : insight.statement}
                      </h3>

                      <p className="text-sm lg:text-base text-slate-700 leading-relaxed">
                        {insight.interpretation}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenEvidence(insight);
                      }}
                      className="flex items-center gap-1.5 text-xs lg:text-sm font-semibold px-3.5 py-2.5 rounded-xl bg-[#1F9D55] hover:bg-[#188245] text-white shadow-xs shrink-0 transition-all active:scale-95 mt-1"
                    >
                      <Video className="w-4 h-4" />
                      <span>Watch clip</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN (~45% Width, 5 Cols): Metric Strip + Big Pitch + Suggested Training Focus */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 3-Metric Strip with Fixed Consistent Data & Scale */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <MetricCard
              label="Compactness"
              value={`${activeFrame.compactnessAreaM2}`}
              unit="m²"
              subtitle={`Exp: ${activeFrame.expectedState.tacticalState.compactnessAreaM2} m²`}
              statusText={activeFrame.compactnessAreaM2 > 300 ? `Too stretched (+${activeFrame.compactnessAreaM2 - activeFrame.expectedState.tacticalState.compactnessAreaM2} m²)` : "Optimal shape"}
              statusColor={activeFrame.compactnessAreaM2 > 300 ? "rose" : "emerald"}
              highlight={activeFrame.compactnessAreaM2 > 300}
            />
            <MetricCard
              label="Team Width"
              value={`${activeFrame.teamWidthM}`}
              unit="m"
              subtitle={`Exp: ${activeFrame.expectedState.tacticalState.teamWidthM} m`}
              statusText={activeFrame.teamWidthM > 44 ? `Slightly wide (+${(activeFrame.teamWidthM - activeFrame.expectedState.tacticalState.teamWidthM).toFixed(1)} m)` : "Normal width"}
              statusColor={activeFrame.teamWidthM > 44 ? "amber" : "emerald"}
            />
            <MetricCard
              label="Team Depth"
              value={`${activeFrame.teamDepthM}`}
              unit="m"
              subtitle={`Exp: ${activeFrame.expectedState.tacticalState.teamDepthM} m`}
              statusText={`Optimal depth (+${(activeFrame.teamDepthM - activeFrame.expectedState.tacticalState.teamDepthM).toFixed(1)} m)`}
              statusColor="emerald"
            />
          </div>

          {/* Key Incident Pitch Map */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-semibold text-[#188245] uppercase tracking-wide">
                  Incident Pitch Map
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {activeFrame.timestamp} — {activeFrame.phaseLabel}
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                {activeFrame.timestamp}
              </span>
            </div>

            <PitchCanvas
              frame={activeFrame}
              overlayMode="actual-vs-expected"
              showOpponent={true}
              showTrails={false}
            />

            <button
              onClick={onNavigateToTactical}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs lg:text-sm font-semibold shadow-xs transition-all"
            >
              <span>Explore Full Tactical Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* SUGGESTED FOCUS FOR TRAINING CARD */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-[#1F9D55] border border-emerald-200">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Suggested Focus for Training</h3>
                <p className="text-xs text-slate-500">Action items derived from match tactical deviations</p>
              </div>
            </div>

            <div className="space-y-3 text-xs lg:text-sm text-slate-700">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  1. Defensive Transition Compaction
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-4">
                  Drill immediate central compaction upon losing possession to keep defensive convex hull area under 220 m² and prevent counter-attack channels.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  2. Midfield-to-Defense Line Distance
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-4">
                  Train central midfielders to drop in tandem with the back 4 during deep retreats, maintaining vertical line separation under 15m.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  3. Wing Build-up Support Options
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-4">
                  Ensure fullbacks provide inside passing angles when wingers expand laterally beyond 40m width during build-up phase.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
