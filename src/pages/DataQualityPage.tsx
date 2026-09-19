import React from 'react';
import { MOCK_DATA_QUALITY } from '../data/playersData';
import { ShieldCheck, AlertTriangle, CheckCircle2, RefreshCw, Info, Cpu } from 'lucide-react';

export const DataQualityPage: React.FC = () => {
  const quality = MOCK_DATA_QUALITY;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dark-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            Data Quality & Pipeline Integrity
          </h1>
          <p className="text-xs text-gray-400 mt-1">Computer vision tracking verification, calibration metrics & occlusion audit</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 px-3 py-1.5 rounded-lg">
          <CheckCircle2 className="w-4 h-4" />
          <span>OVERALL INTEGRITY: 94% VALIDATED</span>
        </div>
      </div>

      {/* Quality Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
        <div className="p-4 bg-dark-card rounded-xl border border-dark-border space-y-1">
          <span className="text-gray-400 block text-[10px]">TRACKING QUALITY</span>
          <div className="text-2xl font-extrabold text-emerald-400">{quality.trackingQualityPct}%</div>
          <span className="text-[10px] text-gray-500">Optical BBox Precision</span>
        </div>

        <div className="p-4 bg-dark-card rounded-xl border border-dark-border space-y-1">
          <span className="text-gray-400 block text-[10px]">IDENTITY CONSISTENCY</span>
          <div className="text-2xl font-extrabold text-cyan-400">{quality.identityConsistencyPct}%</div>
          <span className="text-[10px] text-gray-500">Player ID Persistence</span>
        </div>

        <div className="p-4 bg-dark-card rounded-xl border border-dark-border space-y-1">
          <span className="text-gray-400 block text-[10px]">MISSING DATA</span>
          <div className="text-2xl font-extrabold text-amber-400">{quality.missingDataPct}%</div>
          <span className="text-[10px] text-gray-500">Interpolated Frames</span>
        </div>

        <div className="p-4 bg-dark-card rounded-xl border border-dark-border space-y-1">
          <span className="text-gray-400 block text-[10px]">ID SWITCHES</span>
          <div className="text-2xl font-extrabold text-gray-200">{quality.idSwitchesCount}</div>
          <span className="text-[10px] text-gray-500">Re-identification events</span>
        </div>

        <div className="p-4 bg-dark-card rounded-xl border border-dark-border space-y-1">
          <span className="text-gray-400 block text-[10px]">TRACK CONTINUITY</span>
          <div className="text-2xl font-extrabold text-emerald-400">{quality.trackContinuityPct}%</div>
          <span className="text-[10px] text-gray-500">Smooth coordinate stream</span>
        </div>

        <div className="p-4 bg-dark-card rounded-xl border border-dark-border space-y-1">
          <span className="text-gray-400 block text-[10px]">CALIBRATION ERROR</span>
          <div className="text-2xl font-extrabold text-cyan-400">{quality.pitchCalibrationErrorMeters} m</div>
          <span className="text-[10px] text-gray-500">Pitch Homography Error</span>
        </div>
      </div>

      {/* Main Grid: Pipeline Checklist & Active Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Processing Pipeline Status Checklist */}
        <div className="bg-dark-card rounded-xl p-5 border border-dark-border space-y-4">
          <h2 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" /> PIPELINE VERIFICATION CHECKLIST
          </h2>

          <div className="space-y-2.5 font-mono text-xs">
            {Object.entries(quality.processingPipeline).map(([stage, status]) => (
              <div key={stage} className="flex items-center justify-between p-3 rounded-lg bg-dark-bg border border-dark-border">
                <span className="text-gray-300 font-semibold uppercase">{stage.replace(/([A-Z])/g, ' $1')}</span>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>VERIFIED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Data Warnings & Occlusion Logs */}
        <div className="bg-dark-card rounded-xl p-5 border border-dark-border space-y-4">
          <h2 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> DATA AUDIT & OCCLUSION LOGS
          </h2>

          <div className="space-y-3">
            {quality.warnings.map((w) => (
              <div
                key={w.id}
                className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between font-mono">
                  <span className="text-amber-400 font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> TIMESTAMP: {w.time}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] uppercase font-bold">
                    SEVERITY: {w.severity}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed font-sans">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
