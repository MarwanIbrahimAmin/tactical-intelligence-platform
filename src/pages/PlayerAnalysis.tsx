import React, { useState } from 'react';
import { AL_AHLY_PLAYERS } from '../data/playersData';
import { PlayerStats } from '../types/tactical';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Users, Zap, Activity, Flame, Shield, ArrowRightLeft } from 'lucide-react';

export const PlayerAnalysis: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats>(AL_AHLY_PLAYERS[0]);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [comparePlayer, setComparePlayer] = useState<PlayerStats>(AL_AHLY_PLAYERS[1]);

  const radarData = [
    { metric: 'Distance', P1: selectedPlayer.distanceCoveredKm * 9, P2: comparePlayer.distanceCoveredKm * 9 },
    { metric: 'Max Speed', P1: selectedPlayer.maxSpeedKmH * 2.8, P2: comparePlayer.maxSpeedKmH * 2.8 },
    { metric: 'High Intensity', P1: selectedPlayer.highIntensityKm * 32, P2: comparePlayer.highIntensityKm * 32 },
    { metric: 'Sprints', P1: selectedPlayer.sprintCount * 3, P2: comparePlayer.sprintCount * 3 },
    { metric: 'Accelerations', P1: selectedPlayer.accelerations * 1.5, P2: comparePlayer.accelerations * 1.5 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dark-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-400" />
            Player Tactical & Physical Analysis
          </h1>
          <p className="text-xs text-gray-400 mt-1">Individual tracking telemetry & head-to-head comparison</p>
        </div>

        <button
          onClick={() => setCompareMode(!compareMode)}
          className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border transition-all ${
            compareMode
              ? 'bg-cyan-950 text-cyan-400 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
              : 'bg-dark-card text-gray-300 border-dark-border hover:border-dark-borderLight'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>{compareMode ? 'Exit Comparison' : 'Compare Players'}</span>
        </button>
      </div>

      {/* Main Grid: Roster Sidebar vs Analysis View */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Player Roster Left Column */}
        <div className="bg-dark-card rounded-xl p-4 border border-dark-border space-y-3">
          <div className="text-xs font-mono text-gray-400 font-bold uppercase tracking-wider">
            SQUAD ROSTER (AL AHLY U19)
          </div>

          <div className="space-y-1.5">
            {AL_AHLY_PLAYERS.map((p) => {
              const isSelected = selectedPlayer.id === p.id;
              const isComparing = compareMode && comparePlayer.id === p.id;

              return (
                <button
                  key={p.id}
                  onClick={() => {
                    if (compareMode && selectedPlayer.id !== p.id) {
                      setComparePlayer(p);
                    } else {
                      setSelectedPlayer(p);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-xs transition-all ${
                    isSelected
                      ? 'bg-emerald-500/15 border border-emerald-500/50 text-white font-bold'
                      : isComparing
                      ? 'bg-cyan-500/15 border border-cyan-500/50 text-white font-bold'
                      : 'bg-dark-bg border border-dark-border text-gray-300 hover:bg-dark-cardHover'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-dark-card border border-dark-border flex items-center justify-center font-mono font-bold text-emerald-400">
                      #{p.number}
                    </span>
                    <div className="text-left">
                      <div className="font-semibold text-white">{p.name}</div>
                      <div className="text-[10px] text-gray-400 font-sans">{p.position}</div>
                    </div>
                  </div>

                  <span className="font-mono text-emerald-400 font-bold">{p.distanceCoveredKm} km</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Player Profile / Comparison Workspace */}
        <div className="lg:col-span-3 space-y-6">
          {!compareMode ? (
            /* SINGLE PLAYER ANALYSIS */
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-dark-card rounded-xl p-5 border border-dark-border flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-extrabold text-2xl">
                    #{selectedPlayer.number}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedPlayer.name}</h2>
                    <p className="text-xs text-emerald-400 font-mono">{selectedPlayer.position} • {selectedPlayer.minutesPlayed} Mins Played</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="bg-dark-bg p-2.5 rounded-lg border border-dark-border">
                    <span className="text-gray-400 block text-[10px]">TOTAL DISTANCE</span>
                    <span className="text-emerald-400 font-bold text-base">{selectedPlayer.distanceCoveredKm} km</span>
                  </div>
                  <div className="bg-dark-bg p-2.5 rounded-lg border border-dark-border">
                    <span className="text-gray-400 block text-[10px]">MAX SPEED</span>
                    <span className="text-cyan-400 font-bold text-base">{selectedPlayer.maxSpeedKmH} km/h</span>
                  </div>
                  <div className="bg-dark-bg p-2.5 rounded-lg border border-dark-border">
                    <span className="text-gray-400 block text-[10px]">HIGH INTENSITY</span>
                    <span className="text-amber-400 font-bold text-base">{selectedPlayer.highIntensityKm} km</span>
                  </div>
                  <div className="bg-dark-bg p-2.5 rounded-lg border border-dark-border">
                    <span className="text-gray-400 block text-[10px]">SPRINT COUNT</span>
                    <span className="text-white font-bold text-base">{selectedPlayer.sprintCount}</span>
                  </div>
                </div>
              </div>

              {/* Zone Occupancy Breakdown */}
              <div className="bg-dark-card rounded-xl p-5 border border-dark-border space-y-4">
                <h3 className="text-sm font-bold text-white font-mono uppercase">Zone Occupancy Distribution %</h3>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedPlayer.zoneOccupancy}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F293D" />
                      <XAxis dataKey="zone" stroke="#9CA3AF" fontSize={11} fontFamily="sans-serif" />
                      <YAxis stroke="#9CA3AF" fontSize={11} fontFamily="monospace" />
                      <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1F293D', fontSize: '12px' }} />
                      <Bar dataKey="percentage" fill="#00F0FF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : (
            /* DUAL PLAYER COMPARISON MODE */
            <div className="space-y-6">
              <div className="bg-dark-card rounded-xl p-4 border border-dark-border flex items-center justify-between text-xs font-mono">
                <div className="text-emerald-400 font-bold">
                  PLAYER 1: #{selectedPlayer.number} {selectedPlayer.name} ({selectedPlayer.position})
                </div>
                <div className="text-cyan-400 font-bold">
                  PLAYER 2: #{comparePlayer.number} {comparePlayer.name} ({comparePlayer.position})
                </div>
              </div>

              {/* Head to Head Radar Chart */}
              <div className="bg-dark-card rounded-xl p-5 border border-dark-border space-y-4">
                <h3 className="text-sm font-bold text-white font-mono uppercase text-center">Head-to-Head Performance Radar</h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#1F293D" />
                      <PolarAngleAxis dataKey="metric" stroke="#9CA3AF" fontSize={11} />
                      <PolarRadiusAxis stroke="#1F293D" />
                      <Radar name={selectedPlayer.name} dataKey="P1" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
                      <Radar name={comparePlayer.name} dataKey="P2" stroke="#00F0FF" fill="#00F0FF" fillOpacity={0.4} />
                      <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1F293D', fontSize: '12px' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
