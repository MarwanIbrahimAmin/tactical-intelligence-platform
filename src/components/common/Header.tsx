import React, { useState } from 'react';
import { CURRENT_MATCH } from '../../data/matchData';
import { Activity, Calendar, MapPin, ChevronDown, CheckCircle2, User, Cpu, Trophy, UploadCloud, Settings } from 'lucide-react';

interface HeaderProps {
  currentMatch: typeof CURRENT_MATCH;
  onOpenHowAiWorks: () => void;
  onOpenSettings: () => void;
  onOpenAcquisition: () => void;
  onOpenArchive: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMatch,
  onOpenHowAiWorks,
  onOpenSettings,
  onOpenAcquisition,
  onOpenArchive
}) => {
  const [showMatchDropdown, setShowMatchDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
      {/* Club & Match Context */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center font-bold text-red-600 text-sm shadow-2xs">
            AH
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>{currentMatch.homeTeam}</span>
                <span className="text-[#188245] font-semibold text-xs px-2.5 py-0.5 bg-[#E8F5EE] rounded-full border border-emerald-200">
                  {currentMatch.homeScore} — {currentMatch.awayScore}
                </span>
                <span>{currentMatch.awayTeam}</span>
              </h1>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium border border-slate-200">
                {currentMatch.competition}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 mt-0.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> {currentMatch.date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {currentMatch.venue}
              </span>
            </div>
          </div>
        </div>

        {/* Match Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowMatchDropdown(!showMatchDropdown);
              setShowProfileDropdown(false);
            }}
            className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors font-medium"
          >
            <span>Match Switcher</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {showMatchDropdown && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 space-y-1 animate-in fade-in zoom-in-95">
              <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Active Match
              </div>
              <button
                onClick={() => setShowMatchDropdown(false)}
                className="w-full text-left p-2 rounded-lg bg-[#E8F5EE] border border-emerald-200 text-xs font-semibold text-[#188245] flex items-center justify-between"
              >
                <div>
                  <div>{currentMatch.homeTeam} vs {currentMatch.awayTeam}</div>
                  <div className="text-[10px] text-slate-500 font-normal">Matchday 18 (Active)</div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#1F9D55]" />
              </button>

              <div className="border-t border-slate-100 my-1 pt-1 space-y-1">
                <button
                  onClick={() => {
                    setShowMatchDropdown(false);
                    onOpenArchive();
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 text-xs text-slate-700 flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4 text-slate-400" />
                  <span>Matches Archive</span>
                </button>
                <button
                  onClick={() => {
                    setShowMatchDropdown(false);
                    onOpenAcquisition();
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 text-xs text-slate-700 flex items-center gap-2"
                >
                  <UploadCloud className="w-4 h-4 text-slate-400" />
                  <span>+ Import Match Data</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top Bar Actions & Profile Menu */}
      <div className="flex items-center gap-3">
        {/* Small "How AI Works" Button */}
        <button
          onClick={onOpenHowAiWorks}
          className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#188245] border border-emerald-200 transition-all shadow-2xs"
        >
          <Cpu className="w-4 h-4 text-[#1F9D55]" />
          <span>How AI Works</span>
        </button>

        {/* Data Status Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs">
          <span className="w-2 h-2 rounded-full bg-[#1F9D55]" />
          <span>{currentMatch.dataSourceStatus}</span>
        </div>

        {/* Profile Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowMatchDropdown(false);
            }}
            className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-700 transition-colors"
          >
            <User className="w-4 h-4" />
          </button>

          {showProfileDropdown && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 space-y-1 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="text-xs font-bold text-slate-900">Head Coach</div>
                <div className="text-[11px] text-slate-500">Al Ahly Youth Academy</div>
              </div>
              <button
                onClick={() => {
                  setShowProfileDropdown(false);
                  onOpenSettings();
                }}
                className="w-full text-left p-2 rounded-lg hover:bg-slate-50 text-xs text-slate-700 flex items-center gap-2"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Platform Settings</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
