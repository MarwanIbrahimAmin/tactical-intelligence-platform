import React, { useState } from 'react';
import { TACTICAL_INSIGHTS } from '../data/tacticalEvents';
import { TacticalInsight, PitchFrame } from '../types/tactical';
import { SynchronizedPlayer } from '../components/evidence/SynchronizedPlayer';
import { PitchCanvas } from '../components/pitch/PitchCanvas';
import { ExpectedActualPitch } from '../components/pitch/ExpectedActualPitch';
import { getFrameAtTime } from '../services/simulationEngine';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceDot } from 'recharts';
import { FileSearch, CheckCircle2, ShieldCheck, ArrowLeft, Info, BrainCircuit, GitCompare } from 'lucide-react';

interface EvidenceReviewPageProps {
  selectedInsight?: TacticalInsight | null;
  onBack?: () => void;
}

export const EvidenceReviewPage: React.FC<EvidenceReviewPageProps> = ({
  selectedInsight: initialInsight,
  onBack
}) => {
  const [activeInsight, setActiveInsight] = useState<TacticalInsight>(
    initialInsight || TACTICAL_INSIGHTS[0]
  );

  const [showExpectedActualComparison, setShowExpectedActualComparison] = useState<boolean>(false);

  // Get dynamic pitch frame at the start time of active insight
  const frame: PitchFrame = getFrameAtTime(activeInsight.startSec || 1394);

  return (
    <div className="p-6 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dark-border pb-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-dark-card hover:bg-dark-cardHover border border-dark-border text-gray-300 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 uppercase font-bold">
                EVIDENCE REVIEW WORKSPACE
              </span>
              <span className="text-xs font-mono text-gray-400">REF: {activeInsight.evidenceRef}</span>
            </div>
            <h1 className="text-xl font-bold text-white mt-1">{activeInsight.statement}</h1>
          </div>
        </div>

        {/* Insight Selector Dropdown & View Switch */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowExpectedActualComparison(!showExpectedActualComparison)}
            className={`flex items-center gap-2 text-xs font-mono font-bold px-3 py-1.5 rounded-lg border transition-all ${
              showExpectedActualComparison
                ? 'bg-cyan-500 text-black border-cyan-400 shadow-md'
                : 'bg-dark-card text-cyan-400 border-cyan-500/40 hover:bg-cyan-950'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            <span>{showExpectedActualComparison ? 'Show Standard 3-Panel' : 'Compare Expected vs Actual'}</span>
          </button>

          <select
            value={activeInsight.id}
            onChange={(e) => {
              const found = TACTICAL_INSIGHTS.find(i => i.id === e.target.value);
              if (found) setActiveInsight(found);
            }}
            className="bg-dark-card border border-dark-border rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-cyan-500 outline-none"
          >
            {TACTICAL_INSIGHTS.map((i) => (
              <option key={i.id} value={i.id}>
                {i.startTime} — {i.statement}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PART 4 — AI DEVIATION EXPLANATION STRUCTURE */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 p-4 bg-dark-card rounded-2xl border border-dark-border text-xs font-mono">
        <div>
          <span className="text-gray-400 block text-[10px]">PATTERN</span>
          <span className="text-cyan-400 font-bold">{activeInsight.tacticalPattern}</span>
        </div>
        <div>
          <span className="text-gray-400 block text-[10px]">EXPECTED METRIC</span>
          <span className="text-cyan-400 font-bold">{activeInsight.expectedValue} {activeInsight.unit}</span>
        </div>
        <div>
          <span className="text-gray-400 block text-[10px]">ACTUAL METRIC</span>
          <span className="text-emerald-400 font-bold">{activeInsight.actualValue} {activeInsight.unit}</span>
        </div>
        <div>
          <span className="text-gray-400 block text-[10px]">DEVIATION DELTA</span>
          <span className="text-rose-400 font-bold">+{activeInsight.deviationValue} {activeInsight.unit}</span>
        </div>
        <div>
          <span className="text-gray-400 block text-[10px]">MODEL CONFIDENCE</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {activeInsight.confidencePct}%
          </span>
        </div>
        <div>
          <span className="text-gray-400 block text-[10px]">DATA QUALITY</span>
          <span className="text-cyan-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> {activeInsight.dataQualityPct}%
          </span>
        </div>
      </div>

      {showExpectedActualComparison ? (
        /* EXPECTED VS ACTUAL COMPARISON WORKSPACE */
        <ExpectedActualPitch frame={frame} />
      ) : (
        /* 3 SYNCHRONIZED EVIDENCE PANELS (Section 8) */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PANEL A: VIDEO EVIDENCE */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-300">
              <span className="flex items-center gap-2 text-cyan-400">
                <FileSearch className="w-4 h-4" /> PANEL A: VIDEO EVIDENCE
              </span>
              <span className="text-gray-500">Camera 1 • Main Stand</span>
            </div>
            <SynchronizedPlayer insight={activeInsight} />
          </div>

          {/* PANEL B: PITCH EVIDENCE */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-300">
              <span className="flex items-center gap-2 text-emerald-400">
                <FileSearch className="w-4 h-4" /> PANEL B: PITCH EVIDENCE
              </span>
              <span className="text-gray-500">Pitch Normalized Telemetry</span>
            </div>
            <PitchCanvas
              frame={frame}
              overlayMode="actual-vs-expected"
              showOpponent={true}
              showTrails={true}
            />
          </div>

          {/* PANEL C: NUMERICAL EVIDENCE */}
          <div className="space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-300">
              <span className="flex items-center gap-2 text-amber-400">
                <FileSearch className="w-4 h-4" /> PANEL C: NUMERICAL EVIDENCE
              </span>
              <span className="text-gray-500">{activeInsight.metricName} Curve</span>
            </div>

            <div className="bg-dark-card rounded-2xl p-4 border border-dark-border h-full flex flex-col justify-between space-y-4 shadow-xl">
              <div className="space-y-1">
                <div className="text-xs text-gray-400 font-mono">EXPECTED VS ACTUAL METRIC STREAM</div>
                <div className="text-sm font-bold text-white">Detection Window: {activeInsight.startTime}</div>
              </div>

              {/* Recharts Chart */}
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activeInsight.numericalTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1F293D" />
                    <XAxis dataKey="time" stroke="#9CA3AF" fontSize={10} fontFamily="monospace" />
                    <YAxis stroke="#9CA3AF" fontSize={10} fontFamily="monospace" />
                    <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1F293D', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="value" name="Actual" stroke="#00F0FF" strokeWidth={3} dot={{ fill: '#00F0FF', r: 5 }} />
                    <Line type="monotone" dataKey="expected" name="Expected Model" stroke="#10B981" strokeWidth={2} strokeDasharray="4 4" />
                    <ReferenceDot x="23:18" y={347} r={7} fill="#FF0055" stroke="#FFFFFF" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="p-3 rounded-xl bg-dark-bg border border-dark-border text-xs text-gray-300 space-y-1 font-mono">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <Info className="w-4 h-4" /> MODEL DEVIATION EXPLANATION
                </div>
                <p className="text-[11px] leading-relaxed text-gray-300 font-sans">
                  The Tactical State Model expected a compact defensive structure of {activeInsight.expectedValue} {activeInsight.unit}. Actual observed state was {activeInsight.actualValue} {activeInsight.unit}, producing a +{activeInsight.deviationValue} {activeInsight.unit} deviation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
