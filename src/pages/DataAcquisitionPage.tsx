import React, { useState } from 'react';
import { UploadCloud, Video, Database, Layers, CheckCircle2, Play, Cpu, ArrowRight } from 'lucide-react';

interface ProcessingStage {
  step: number;
  name: string;
  status: 'pending' | 'processing' | 'completed';
  timeSec: string;
  metric: string;
}

export const DataAcquisitionPage: React.FC<{ onCompleteProcessing?: () => void }> = ({ onCompleteProcessing }) => {
  const [selectedMode, setSelectedMode] = useState<'video' | 'tracking' | 'hybrid'>('hybrid');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const initialStages: ProcessingStage[] = [
    { step: 1, name: 'Video Ingestion', status: 'completed', timeSec: '00:12', metric: '1080p @ 25fps' },
    { step: 2, name: 'Player Detection', status: 'completed', timeSec: '00:45', metric: 'YOLOv8 — 98.2% BBox' },
    { step: 3, name: 'Player Tracking', status: 'completed', timeSec: '02:14', metric: 'DeepSORT — 95.8% Conf' },
    { step: 4, name: 'Team Identification', status: 'completed', timeSec: '00:18', metric: 'Color Histogram Clustering' },
    { step: 5, name: 'Pitch Calibration', status: 'completed', timeSec: '00:32', metric: 'Homography Matrix — 0.43m Error' },
    { step: 6, name: 'Coordinate Transformation', status: 'completed', timeSec: '00:25', metric: 'Pitch 105x68m Mapping' },
    { step: 7, name: 'Game-State Reconstruction', status: 'completed', timeSec: '00:40', metric: 'Continuous Telemetry Frame Stream' },
    { step: 8, name: 'Tactical Pattern Detection', status: 'completed', timeSec: '01:05', metric: 'Convex Hull & Line Spacing' },
    { step: 9, name: 'Evidence Generation', status: 'completed', timeSec: '00:22', metric: 'Synchronized 3-Panel Indexing' },
    { step: 10, name: 'Report Generation', status: 'completed', timeSec: '00:10', metric: 'Dashboard Telemetry Active' }
  ];

  const handleStartPipeline = () => {
    setIsProcessing(true);
    setCurrentStepIndex(0);

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= 9) {
          clearInterval(interval);
          setIsProcessing(false);
          if (onCompleteProcessing) onCompleteProcessing();
          return 9;
        }
        return prev + 1;
      });
    }, 600);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-dark-border pb-4">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <UploadCloud className="w-6 h-6 text-emerald-400" />
          Create New Match Analysis
        </h1>
        <p className="text-xs text-gray-400 mt-1">Select data acquisition modality & launch automated 10-step tactical AI pipeline</p>
      </div>

      {/* 3 ACQUISITION MODES (Section 15) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mode A: Video Analysis */}
        <div
          onClick={() => setSelectedMode('video')}
          className={`p-5 rounded-xl border cursor-pointer transition-all space-y-3 ${
            selectedMode === 'video'
              ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
              : 'bg-dark-card border-dark-border hover:border-dark-borderLight'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-lg bg-dark-bg text-emerald-400 border border-dark-border">
              <Video className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-bg text-gray-400 border border-dark-border">MP4 / MOV</span>
          </div>
          <h2 className="text-base font-bold text-white">Video Analysis</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Upload raw broadcast or tactical camera footage. Optical computer vision extracts player bounding boxes and pitch homography.
          </p>
        </div>

        {/* Mode B: Tracking Data */}
        <div
          onClick={() => setSelectedMode('tracking')}
          className={`p-5 rounded-xl border cursor-pointer transition-all space-y-3 ${
            selectedMode === 'tracking'
              ? 'bg-cyan-950/30 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
              : 'bg-dark-card border-dark-border hover:border-dark-borderLight'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-lg bg-dark-bg text-cyan-400 border border-dark-border">
              <Database className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-bg text-gray-400 border border-dark-border">CSV / JSON</span>
          </div>
          <h2 className="text-base font-bold text-white">Tracking Data</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Upload EPTS / GPS sensor coordinates or pre-computed optical tracking data stream. Skip computer vision extraction step.
          </p>
        </div>

        {/* Mode C: Hybrid Analysis */}
        <div
          onClick={() => setSelectedMode('hybrid')}
          className={`p-5 rounded-xl border cursor-pointer transition-all space-y-3 ${
            selectedMode === 'hybrid'
              ? 'bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-500/10'
              : 'bg-dark-card border-dark-border hover:border-dark-borderLight'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-lg bg-dark-bg text-amber-400 border border-dark-border">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">RECOMMENDED</span>
          </div>
          <h2 className="text-base font-bold text-white">Hybrid Analysis</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Synchronize video feed + wearable sensor dataset for maximum tactical evidence accuracy & physical workload precision.
          </p>
        </div>
      </div>

      {/* WORKFLOW DIAGRAM */}
      <div className="p-4 rounded-xl bg-dark-card border border-dark-border flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <span className="text-emerald-400 font-bold">WORKFLOW STAGES:</span>
        <div className="flex items-center gap-2 text-gray-300">
          <span>Upload</span> <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
          <span>Validate</span> <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
          <span>Calibrate</span> <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
          <span>Track</span> <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
          <span>Synchronize</span> <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-emerald-400 font-bold">Analyze</span>
        </div>

        <button
          onClick={handleStartPipeline}
          disabled={isProcessing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-sans transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-black" />
          <span>{isProcessing ? 'Processing Pipeline...' : 'Run Pipeline Simulation'}</span>
        </button>
      </div>

      {/* 10-STEP SIMULATED AI PROCESSING SCREEN (Section 16) */}
      <div className="bg-dark-card rounded-xl p-5 border border-dark-border space-y-4">
        <div className="flex items-center justify-between border-b border-dark-border pb-3">
          <div className="flex items-center gap-2 font-mono text-sm text-white font-bold">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <span>AI PROCESSING PIPELINE STAGES (10/10)</span>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            {isProcessing ? `Running Step ${currentStepIndex + 1}/10...` : 'Complete'}
          </span>
        </div>

        <div className="space-y-2 font-mono text-xs">
          {initialStages.map((stage, idx) => {
            const isCompleted = !isProcessing || idx <= currentStepIndex;
            const isCurrent = isProcessing && idx === currentStepIndex;

            return (
              <div
                key={stage.step}
                className={`p-3 rounded-lg border transition-all flex items-center justify-between ${
                  isCurrent
                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-md shadow-cyan-500/10'
                    : isCompleted
                    ? 'bg-dark-bg border-dark-border text-gray-200'
                    : 'bg-dark-bg/40 border-dark-border/50 text-gray-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-dark-card text-gray-600'
                  }`}>
                    {stage.step}
                  </span>
                  <div>
                    <span className="font-bold text-white">{stage.name}</span>
                    <span className="text-[10px] text-gray-500 block font-sans">{stage.metric}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-gray-400">{stage.timeSec}</span>
                  <div className={`flex items-center gap-1.5 text-xs font-bold ${
                    isCurrent ? 'text-cyan-400 animate-pulse' : isCompleted ? 'text-emerald-400' : 'text-gray-600'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isCurrent ? 'PROCESSING' : isCompleted ? 'COMPLETED' : 'PENDING'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
