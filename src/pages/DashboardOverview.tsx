import React, { useState } from 'react';
import { getFrameAtTime } from '../services/simulationEngine';
import { PitchFrame, PlayerCoordinate, TacticalInsight } from '../types/tactical';
import { MetricCard } from '../components/common/MetricCard';
import { PitchCanvas } from '../components/pitch/PitchCanvas';
import { PitchControls, PitchOverlayMode } from '../components/pitch/PitchControls';
import { PitchTimeline } from '../components/pitch/PitchTimeline';
import { TacticalInsightsPanel } from '../components/insights/TacticalInsightsPanel';
import { TacticalIntelligenceCard } from '../components/tactical/TacticalIntelligenceCard';
import { ExpectedActualPitch } from '../components/pitch/ExpectedActualPitch';

interface DashboardOverviewProps {
  onOpenEvidence: (insight: TacticalInsight) => void;
  onNavigateToTactical?: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onOpenEvidence,
  onNavigateToTactical
}) => {
  const [currentSec, setCurrentSec] = useState<number>(1394); // Default 23:14
  const [overlayMode, setOverlayMode] = useState<PitchOverlayMode>('actual-vs-expected');
  const [showOpponent, setShowOpponent] = useState<boolean>(true);
  const [showTrails, setShowTrails] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerCoordinate | null>(null);

  // DYNAMIC MATCH ENGINE: Returns exact frame interpolated at currentSec
  const activeFrame: PitchFrame = getFrameAtTime(currentSec);

  return (
    <div className="p-6 space-y-6">
      {/* Top Section: Tactical Intelligence Assessment Card (Section 6 of Revision Prompt) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TacticalIntelligenceCard
            frame={activeFrame}
            onInspectDeviation={() => {
              setOverlayMode('actual-vs-expected');
              if (onNavigateToTactical) onNavigateToTactical();
            }}
          />
        </div>

        {/* Telemetry KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            label="Compactness"
            value={activeFrame.compactnessAreaM2}
            unit="m²"
            trend={activeFrame.compactnessAreaM2 > 280 ? 'down' : 'up'}
            trendValue={`Exp: ${activeFrame.expectedState.tacticalState.compactnessAreaM2}m²`}
            subtitle="Convex Hull Area"
            highlight={activeFrame.deviationSeverity === 'significant'}
          />
          <MetricCard
            label="Team Width"
            value={activeFrame.teamWidthM}
            unit="m"
            trend="neutral"
            trendValue={`Exp: ${activeFrame.expectedState.tacticalState.teamWidthM}m`}
            subtitle="Lateral Distance"
          />
          <MetricCard
            label="Team Depth"
            value={activeFrame.teamDepthM}
            unit="m"
            trend="neutral"
            trendValue={`Exp: ${activeFrame.expectedState.tacticalState.teamDepthM}m`}
            subtitle="Vertical Distance"
          />
          <MetricCard
            label="Alignment"
            value={`${activeFrame.tacticalAlignmentPct}%`}
            subtitle="Model Coordination"
            statusColor={activeFrame.tacticalAlignmentPct > 80 ? 'emerald' : 'amber'}
          />
        </div>
      </div>

      {/* Main Dynamic Pitch Engine & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Pitch Engine & Scrubber */}
        <div className="lg:col-span-2 space-y-4">
          <PitchControls
            activeMode={overlayMode}
            onSelectMode={setOverlayMode}
            showOpponent={showOpponent}
            onToggleOpponent={() => setShowOpponent(!showOpponent)}
            showTrails={showTrails}
            onToggleTrails={() => setShowTrails(!showTrails)}
          />

          <PitchCanvas
            frame={activeFrame}
            overlayMode={overlayMode}
            showOpponent={showOpponent}
            showTrails={showTrails}
            onSelectPlayer={setSelectedPlayer}
          />

          <PitchTimeline
            currentSec={currentSec}
            onSeek={setCurrentSec}
            onSelectInsight={(id) => {
              const found = activeFrame.primaryDeviation;
              if (found) setOverlayMode('actual-vs-expected');
            }}
          />
        </div>

        {/* Right Column: AI Tactical Insights Panel */}
        <div className="space-y-4">
          <TacticalInsightsPanel
            onSelectInsight={onOpenEvidence}
          />
        </div>
      </div>
    </div>
  );
};
