import React, { useState } from 'react';
import { TACTICAL_INSIGHTS } from '../data/tacticalEvents';
import { TacticalInsight, PitchFrame } from '../types/tactical';
import { SynchronizedPlayer } from '../components/evidence/SynchronizedPlayer';
import { PitchCanvas } from '../components/pitch/PitchCanvas';
import { getFrameAtTime } from '../services/simulationEngine';
import { MOCK_DATA_QUALITY } from '../data/playersData';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { FileCheck2, ShieldCheck, CheckCircle2, Video, ArrowLeft } from 'lucide-react';

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

  const frame: PitchFrame = getFrameAtTime(activeInsight.startSec || 1394);
  const dataQuality = MOCK_DATA_QUALITY;

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Top Header & Data Quality Summary Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <FileCheck2 className="w-6 h-6 text-[#1F9D55]" />
              Evidence & AI Insights: Can I Trust This?
            </h1>
            <p className="text-xs lg:text-sm text-slate-500 mt-0.5">
              Synchronized 3-Panel Proof: Broadcast Video Clip, Pitch Coordinates & Metric Trend.
            </p>
          </div>
        </div>

        {/* Data Quality Small Summary Banner */}
        <div className="flex items-center gap-3 bg-[#E8F5EE] border border-emerald-200 p-3 rounded-2xl text-xs lg:text-sm text-[#188245]">
          <ShieldCheck className="w-6 h-6 text-[#1F9D55] shrink-0" />
          <div>
            <div className="font-bold flex items-center gap-2">
              <span>Data Quality & Integrity: 94% Validated</span>
              <span className="bg-[#1F9D55] text-white px-2.5 py-0.5 rounded-full text-xs">High Confidence</span>
            </div>
            <div className="text-xs text-slate-600 font-normal">
              Optical tracking ID persistence: {dataQuality.identityConsistencyPct}% • Calibration error: {dataQuality.pitchCalibrationErrorMeters}m
            </div>
          </div>
        </div>
      </div>

      {/* Insight Selector Pills */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
        <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Select Tactical Event Clip to Verify:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TACTICAL_INSIGHTS.map((i) => {
            const isSelected = activeInsight.id === i.id;
            return (
              <button
                key={i.id}
                onClick={() => setActiveInsight(i)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 space-y-2 ${
                  isSelected
                    ? 'bg-[#E8F5EE] border-emerald-300 ring-2 ring-[#1F9D55] shadow-2xs font-semibold'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs lg:text-sm">
                  <span className="font-bold text-[#188245]">{i.startTime}</span>
                  <span className="text-xs bg-white text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full font-semibold">
                    {i.confidencePct}% Conf
                  </span>
                </div>
                <div className="text-xs lg:text-sm font-bold text-slate-900 truncate">{i.metricName}</div>
                <div className="text-xs text-slate-500 truncate">{i.statement}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3-Panel Synchronized Evidence Grid (5 Cols / 4 Cols / 3 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Panel 1: Video Clip Player (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs lg:text-sm font-bold text-slate-900">
            <span className="flex items-center gap-2 text-[#188245]">
              <Video className="w-5 h-5" /> 1. Video Evidence Feed
            </span>
            <span className="text-slate-500 font-medium text-xs">Ref: {activeInsight.evidenceRef}</span>
          </div>

          <SynchronizedPlayer insight={activeInsight} />
        </div>

        {/* Panel 2: Pitch Coordinates Canvas (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs lg:text-sm font-bold text-slate-900">
            <span className="flex items-center gap-2 text-[#188245]">
              <CheckCircle2 className="w-5 h-5" /> 2. Synchronized Pitch Map
            </span>
            <span className="text-slate-500 font-medium text-xs">{activeInsight.startTime}</span>
          </div>

          <PitchCanvas
            frame={frame}
            overlayMode="actual-vs-expected"
            showOpponent={true}
            showTrails={false}
          />
        </div>

        {/* Panel 3: Numerical Trend & Metrics Breakdown (3 Cols) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between text-xs lg:text-sm font-bold text-slate-900">
            <span className="text-[#188245]">3. Metric Audit</span>
            <span className="text-slate-500 font-medium text-xs">Delta Proof</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-4 text-xs lg:text-sm">
            <div className="space-y-2.5 border-b border-slate-100 pb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Metric Name:</span>
                <span className="font-bold text-slate-900">{activeInsight.metricName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Expected Model Value:</span>
                <span className="font-bold text-blue-700">{activeInsight.expectedValue} {activeInsight.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Actual Observed Value:</span>
                <span className="font-bold text-[#188245]">{activeInsight.actualValue} {activeInsight.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Deviation Delta:</span>
                <span className="font-bold text-red-600">+{activeInsight.deviationValue} {activeInsight.unit}</span>
              </div>
            </div>

            {/* Numerical Trend Line Chart */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                {activeInsight.metricName} Trend
              </span>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activeInsight.numericalTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '12px', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="value" stroke="#1F9D55" strokeWidth={2.5} name="Actual" />
                    <Line type="monotone" dataKey="expected" stroke="#2563EB" strokeWidth={2.5} strokeDasharray="4 4" name="Expected" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
