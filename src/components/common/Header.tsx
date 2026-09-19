import React from 'react';
import { CURRENT_MATCH } from '../../data/matchData';
import { Activity, Shield, Calendar, MapPin, ChevronDown, CheckCircle2, User } from 'lucide-react';

interface HeaderProps {
  currentMatch: typeof CURRENT_MATCH;
  onSelectMatch?: (id: string) => void;
  onOpenUpload?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentMatch, onOpenUpload }) => {
  return (
    <header className="bg-dark-card border-b border-dark-border px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
      {/* Club & Match Context */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-900/40 border border-red-500/30 flex items-center justify-center font-bold text-red-400 text-lg shadow-inner">
            AH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-gray-100 flex items-center gap-2">
                {currentMatch.homeTeam} <span className="text-emerald-400 font-mono text-sm px-2 py-0.5 bg-emerald-950/60 rounded border border-emerald-500/30">{currentMatch.homeScore} — {currentMatch.awayScore}</span> {currentMatch.awayTeam}
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-dark-border text-gray-300 font-medium border border-gray-700">
                {currentMatch.competition}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400 mt-0.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-500" /> {currentMatch.date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-500" /> {currentMatch.venue}
              </span>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white px-2.5 py-1.5 rounded-md bg-dark-bg border border-dark-border hover:border-dark-borderLight transition-colors">
          <span>Switch Match</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Pipeline Status & Upload Trigger */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>{currentMatch.dataSourceStatus}</span>
        </div>

        {onOpenUpload && (
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-sans transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Activity className="w-4 h-4" />
            <span>+ New Match Data</span>
          </button>
        )}

        <div className="flex items-center gap-2 pl-2 border-l border-dark-border">
          <div className="w-8 h-8 rounded-full bg-dark-border flex items-center justify-center text-gray-300 border border-gray-700">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
};
