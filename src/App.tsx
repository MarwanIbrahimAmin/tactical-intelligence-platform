import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Sidebar, NavItem } from './components/common/Sidebar';
import { CURRENT_MATCH } from './data/matchData';
import { TacticalInsight } from './types/tactical';

import { DashboardOverview } from './pages/DashboardOverview';
import { TacticalAnalysis } from './pages/TacticalAnalysis';
import { TeamShapePage } from './pages/TeamShapePage';
import { PlayerAnalysis } from './pages/PlayerAnalysis';
import { PhysicalPerformance } from './pages/PhysicalPerformance';
import { EvidenceReviewPage } from './pages/EvidenceReviewPage';
import { DataQualityPage } from './pages/DataQualityPage';
import { MatchComparisonPage } from './pages/MatchComparisonPage';
import { DataAcquisitionPage } from './pages/DataAcquisitionPage';
import { BrainCircuit, ArrowDown, Cpu, CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<NavItem>('overview');
  const [selectedInsight, setSelectedInsight] = useState<TacticalInsight | null>(null);
  const [showArchitectureModal, setShowArchitectureModal] = useState<boolean>(false);

  const handleOpenEvidence = (insight: TacticalInsight) => {
    setSelectedInsight(insight);
    setActiveTab('evidence');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col font-sans">
      {/* Header */}
      <Header
        currentMatch={CURRENT_MATCH}
        onOpenUpload={() => setActiveTab('acquisition')}
      />

      {/* Main Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />

        {/* Content View */}
        <main className="flex-1 overflow-y-auto relative">
          {/* FLOATING ARCHITECTURE PIPELINE BUTTON (Part 9 of Revision Prompt) */}
          <div className="sticky top-4 right-6 z-20 flex justify-end px-6 pt-2">
            <button
              onClick={() => setShowArchitectureModal(!showArchitectureModal)}
              className="flex items-center gap-2 text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-500/40 transition-all shadow-lg backdrop-blur-md"
            >
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>How AI Works (ML Pipeline)</span>
            </button>
          </div>

          {activeTab === 'overview' && (
            <DashboardOverview
              onOpenEvidence={handleOpenEvidence}
              onNavigateToTactical={() => setActiveTab('tactical')}
            />
          )}

          {activeTab === 'tactical' && (
            <TacticalAnalysis />
          )}

          {activeTab === 'evidence' && (
            <EvidenceReviewPage
              selectedInsight={selectedInsight}
              onBack={() => setActiveTab('overview')}
            />
          )}

          {activeTab === 'shape' && (
            <TeamShapePage />
          )}

          {activeTab === 'players' && (
            <PlayerAnalysis />
          )}

          {activeTab === 'physical' && (
            <PhysicalPerformance />
          )}

          {activeTab === 'data-quality' && (
            <DataQualityPage />
          )}

          {activeTab === 'matches' && (
            <MatchComparisonPage />
          )}

          {activeTab === 'acquisition' && (
            <DataAcquisitionPage
              onCompleteProcessing={() => setActiveTab('overview')}
            />
          )}

          {activeTab === 'settings' && (
            <div className="p-6 space-y-4">
              <h1 className="text-xl font-bold text-white">Platform Settings</h1>
              <p className="text-xs text-gray-400">Tactical threshold parameters & spatial homography pitch calibration settings.</p>
              <div className="p-4 rounded-xl bg-dark-card border border-dark-border space-y-3 max-w-xl text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span>Compactness Deviation Threshold:</span>
                  <span className="text-emerald-400 font-bold">+50 m²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Width Deviation Threshold:</span>
                  <span className="text-emerald-400 font-bold">+8.0 m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Expected Tactical Model:</span>
                  <span className="text-cyan-400 font-bold">Contextual Phase Inference (Prototype)</span>
                </div>
              </div>
            </div>
          )}

          {/* ML ARCHITECTURE OVERLAY MODAL (Part 9 of Revision Prompt) */}
          {showArchitectureModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in">
              <div className="bg-dark-card border border-purple-500/50 rounded-2xl p-6 max-w-2xl w-full space-y-5 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-dark-border pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-950 text-purple-400 border border-purple-500/40">
                      <BrainCircuit className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white font-mono uppercase">ML Pipeline & AI Architecture</h2>
                      <p className="text-xs text-purple-300 font-mono">How Expected vs. Actual Tactical Intelligence Operates</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowArchitectureModal(false)}
                    className="text-gray-400 hover:text-white px-2.5 py-1 rounded-lg bg-dark-bg border border-dark-border text-xs"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {[
                    { step: '1', title: 'MATCH INPUT', desc: 'Broadcast Video Feed / EPTS Sensor Coordinate Stream' },
                    { step: '2', title: 'DETECTION & TRACKING', desc: 'Optical Bounding Boxes (YOLOv8) + ID Re-identification' },
                    { step: '3', title: 'PITCH CALIBRATION', desc: 'Homography Matrix Mapping to Standard Pitch (105m x 68m)' },
                    { step: '4', title: 'GAME STATE RECONSTRUCTION', desc: 'Continuous Telemetry Frame Generation across 90 Minutes' },
                    { step: '5', title: 'RAW FEATURES EXTRACTION', desc: '24 Raw Features: Positions, Velocities, Accelerations, Centroids' },
                    { step: '6', title: 'FEATURE FUSION LAYER', desc: 'Dimensionality Reduction into 7 Compact Tactical Dimensions' },
                    { step: '7', title: 'EXPECTED TACTICAL STATE MODEL', desc: 'Contextual Model Infers Expected Width, Depth, Compactness' },
                    { step: '8', title: 'ACTUAL VS EXPECTED COMPARISON', desc: 'Euclidean & Spatial Delta Computation at Every Second' },
                    { step: '9', title: 'DEVIATION DETECTION', desc: 'Threshold Evaluation (Aligned, Moderate, Significant)' },
                    { step: '10', title: 'EVIDENCE-LINKED EXPLANATION', desc: '3-Panel Synchronized Video, Pitch & Numerical Proof' }
                  ].map((s) => (
                    <div key={s.step} className="p-2.5 rounded-lg bg-dark-bg border border-dark-border flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-purple-950 text-purple-400 border border-purple-500/40 flex items-center justify-center font-bold text-xs shrink-0">
                        {s.step}
                      </span>
                      <div>
                        <div className="font-bold text-white text-xs">{s.title}</div>
                        <div className="text-[10px] text-gray-400">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
