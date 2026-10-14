import React, { useState, useEffect } from 'react';
import { Sidebar, PageId } from './components/layout/Sidebar';
import { OpponentReportPage } from './pages/OpponentReportPage';
import { MatchQAPage } from './pages/MatchQAPage';
import { EvidenceViewPage } from './pages/EvidenceViewPage';
import { PlayerDrilldownPage } from './pages/PlayerDrilldownPage';
import { Insight } from './types/tactical';

export function App() {
  const [activePage, setActivePage] = useState<PageId>('match');
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  const handleOpenEvidence = (insight: Insight) => {
    setSelectedInsight(insight);
    setActivePage('evidence');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromEvidence = () => {
    setActivePage('match');
  };

  // Listen for custom event from the Evidence View fallback list
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as Insight;
      if (detail) {
        setSelectedInsight(detail);
      }
    };
    window.addEventListener('open-evidence', handler);
    return () => window.removeEventListener('open-evidence', handler);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={(page) => {
        setActivePage(page);
        if (page !== 'evidence') {
          setSelectedInsight(null);
        }
      }} />

      <main className="main-content">
        {activePage === 'opponent' && (
          <OpponentReportPage onOpenEvidence={(id) => {
            // Opponent report doesn't have full insight objects, just navigate
            setActivePage('evidence');
          }} />
        )}

        {activePage === 'match' && (
          <MatchQAPage onOpenEvidence={handleOpenEvidence} />
        )}

        {activePage === 'evidence' && (
          <EvidenceViewPage
            insight={selectedInsight}
            onBack={handleBackFromEvidence}
          />
        )}

        {activePage === 'player' && (
          <PlayerDrilldownPage onOpenEvidence={handleOpenEvidence} />
        )}
      </main>
    </div>
  );
}

export default App;
