import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Sidebar, NavItem } from './components/common/Sidebar';
import { CURRENT_MATCH } from './data/matchData';
import { TacticalInsight } from './types/tactical';

import { DashboardOverview } from './pages/DashboardOverview';
import { TacticalAnalysis } from './pages/TacticalAnalysis';
import { PlayerAnalysis } from './pages/PlayerAnalysis';
import { EvidenceReviewPage } from './pages/EvidenceReviewPage';
import { MatchComparisonPage } from './pages/MatchComparisonPage';
import { DataAcquisitionPage } from './pages/DataAcquisitionPage';
import { BrainCircuit, Cpu, X, Settings } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<NavItem>('summary');
  const [selectedInsight, setSelectedInsight] = useState<TacticalInsight | null>(null);

  // Modals state for top bar actions (non-main navigation)
  const [showArchitectureModal, setShowArchitectureModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showArchiveModal, setShowArchiveModal] = useState<boolean>(false);
  const [showAcquisitionModal, setShowAcquisitionModal] = useState<boolean>(false);

  const handleOpenEvidence = (insight: TacticalInsight) => {
    setSelectedInsight(insight);
    setActiveTab('evidence');
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-slate-800 flex flex-col font-sans antialiased">
      {/* Top Header */}
      <Header
        currentMatch={CURRENT_MATCH}
        onOpenHowAiWorks={() => setShowArchitectureModal(true)}
        onOpenSettings={() => setShowSettingsModal(true)}
        onOpenAcquisition={() => setShowAcquisitionModal(true)}
        onOpenArchive={() => setShowArchiveModal(true)}
      />

      {/* Main Body */}
      <div className="flex flex-1">
        {/* Sidebar (Exactly 4 Main Pages) */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />

        {/* Content View */}
        <main className="flex-1 overflow-y-auto relative pb-12">
          {activeTab === 'summary' && (
            <DashboardOverview
              onOpenEvidence={handleOpenEvidence}
              onNavigateToTactical={() => setActiveTab('tactical')}
            />
          )}

          {activeTab === 'tactical' && (
            <TacticalAnalysis />
          )}

          {activeTab === 'players' && (
            <PlayerAnalysis />
          )}

          {activeTab === 'evidence' && (
            <EvidenceReviewPage
              selectedInsight={selectedInsight}
              onBack={() => setActiveTab('summary')}
            />
          )}

          {/* AI ARCHITECTURE MODAL (Part 9 of Revision Prompt - Triggered by button in top bar) */}
          {showArchitectureModal && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-6 animate-in fade-in">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl w-full space-y-5 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-emerald-50 text-[#1F9D55] border border-emerald-200">
                      <BrainCircuit className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">How AI Works (ML Pipeline)</h2>
                      <p className="text-xs text-slate-500">Expected vs. Actual Tactical Intelligence Engine</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowArchitectureModal(false)}
                    className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
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
                    <div key={s.step} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#1F9D55] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {s.step}
                      </span>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{s.title}</div>
                        <div className="text-[11px] text-slate-500">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS MODAL */}
          {showSettingsModal && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-6 animate-in fade-in">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                      <Settings className="w-5 h-5" />
                    </div>
                    <h2 className="text-base font-bold text-slate-900">Platform Settings</h2>
                  </div>
                  <button
                    onClick={() => setShowSettingsModal(false)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Compactness Deviation Threshold:</span>
                    <span className="text-[#188245] font-bold">+50 m²</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Width Deviation Threshold:</span>
                    <span className="text-[#188245] font-bold">+8.0 m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Expected Tactical Model:</span>
                    <span className="text-blue-700 font-semibold">Contextual Phase Inference</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MATCHES ARCHIVE MODAL */}
          {showArchiveModal && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-6 animate-in fade-in overflow-y-auto">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-4xl w-full space-y-5 shadow-2xl relative my-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900">Matches Archive & Benchmarking</h2>
                  <button
                    onClick={() => setShowArchiveModal(false)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <MatchComparisonPage />
              </div>
            </div>
          )}

          {/* DATA ACQUISITION MODAL */}
          {showAcquisitionModal && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-6 animate-in fade-in overflow-y-auto">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-4xl w-full space-y-5 shadow-2xl relative my-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900">Import & Process New Match Data</h2>
                  <button
                    onClick={() => setShowAcquisitionModal(false)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <DataAcquisitionPage
                  onCompleteProcessing={() => {
                    setShowAcquisitionModal(false);
                    setActiveTab('summary');
                  }}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
