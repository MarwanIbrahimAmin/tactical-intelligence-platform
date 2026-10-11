import React, { useState } from 'react';
import { AL_AHLY_PLAYERS } from '../data/playersData';
import { PlayerStats } from '../types/tactical';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Users, Activity, X } from 'lucide-react';

export const PlayerAnalysis: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(AL_AHLY_PLAYERS[0]);

  // Team averages for comparison
  const teamAverages = {
    distanceKm: 9.8,
    maxSpeedKmH: 29.2,
    sprintCount: 21,
    highIntensityKm: 2.1
  };

  const workloadTimeline = [
    { interval: '0-15m', distance: 1.85, sprints: 4 },
    { interval: '15-30m', distance: 1.92, sprints: 6 },
    { interval: '30-45m', distance: 1.74, sprints: 3 },
    { interval: '45-60m', distance: 1.88, sprints: 5 },
    { interval: '60-75m', distance: 1.68, sprints: 3 },
    { interval: '75-90m', distance: 1.73, sprints: 4 }
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-lg lg:text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#1F9D55]" />
            Players: Who Needs Attention?
          </h1>
          <p className="text-xs lg:text-sm text-slate-500 mt-0.5">
            Merged Player Tactical Telemetry, EPTS Workload & Performance Profiles.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs lg:text-sm font-semibold bg-[#E8F5EE] border border-emerald-200 text-[#188245] px-4 py-2 rounded-2xl">
          <Activity className="w-4 h-4 text-[#1F9D55]" />
          <span>EPTS Sensor Stream Active</span>
        </div>
      </div>

      {/* Main Grid: Squad Roster Grid vs Detail Drawer (~60% Left / ~40% Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Squad Roster Cards Grid (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-base lg:text-lg font-bold text-slate-900 uppercase tracking-wide">
              Squad Roster (Al Ahly U19)
            </h2>
            <span className="text-xs lg:text-sm text-slate-500 font-medium">Click player for detailed profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AL_AHLY_PLAYERS.map((p) => {
              const isSelected = selectedPlayer?.id === p.id;
              const isHighWorkload = p.highIntensityKm > 2.5;
              const isTopSpeed = p.maxSpeedKmH > 32;

              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlayer(p)}
                  className={`p-4 lg:p-5 rounded-3xl border text-left transition-all duration-200 space-y-3.5 ${
                    isSelected
                      ? 'bg-[#E8F5EE] border-emerald-300 ring-2 ring-[#1F9D55] shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
                        #{p.number}
                      </span>
                      <div>
                        <div className="font-bold text-slate-900 text-base">{p.name}</div>
                        <div className="text-xs lg:text-sm text-slate-500">{p.position}</div>
                      </div>
                    </div>

                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      isHighWorkload
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : isTopSpeed
                        ? 'bg-emerald-100 text-[#188245] border border-emerald-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isHighWorkload ? 'High Workload' : isTopSpeed ? 'Speed Leader' : 'Optimal'}
                    </span>
                  </div>

                  {/* 3 Key Player Stats */}
                  <div className="grid grid-cols-3 gap-2 text-xs lg:text-sm pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400 text-xs block font-medium">Distance</span>
                      <span className="font-bold text-slate-900">{p.distanceCoveredKm} km</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs block font-medium">Sprints</span>
                      <span className="font-bold text-slate-900">{p.sprintCount}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs block font-medium">Top Speed</span>
                      <span className="font-bold text-[#188245]">{p.maxSpeedKmH} km/h</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Player Detail Drawer / Side Workspace (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedPlayer ? (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-6">
              {/* Profile Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-3xl bg-slate-900 text-white font-extrabold text-xl flex items-center justify-center shrink-0">
                    #{selectedPlayer.number}
                  </div>
                  <div>
                    <h2 className="text-lg lg:text-xl font-bold text-slate-900">{selectedPlayer.name}</h2>
                    <p className="text-xs lg:text-sm text-slate-500 font-medium">{selectedPlayer.position} • {selectedPlayer.minutesPlayed} Mins</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-2xl hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Workload Profile vs Team Average */}
              <div className="space-y-3">
                <h3 className="text-xs lg:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Player vs Team Average
                </h3>

                <div className="space-y-3 text-xs lg:text-sm">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>Total Distance</span>
                      <span className="font-bold">{selectedPlayer.distanceCoveredKm} km <span className="text-slate-400 font-normal text-xs">(Avg: {teamAverages.distanceKm} km)</span></span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-[#1F9D55] h-full rounded-full" style={{ width: `${(selectedPlayer.distanceCoveredKm / 12) * 100}%` }} />
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>Top Speed</span>
                      <span className="text-[#188245] font-bold">{selectedPlayer.maxSpeedKmH} km/h <span className="text-slate-400 font-normal text-xs">(Avg: {teamAverages.maxSpeedKmH} km/h)</span></span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-[#1F9D55] h-full rounded-full" style={{ width: `${(selectedPlayer.maxSpeedKmH / 36) * 100}%` }} />
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>Sprint Count</span>
                      <span className="font-bold">{selectedPlayer.sprintCount} <span className="text-slate-400 font-normal text-xs">(Avg: {teamAverages.sprintCount})</span></span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(selectedPlayer.sprintCount / 35) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Spatial Zone Occupancy */}
              <div className="space-y-3">
                <h3 className="text-xs lg:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Spatial Zone Occupancy
                </h3>

                <div className="space-y-2 text-xs lg:text-sm">
                  {selectedPlayer.zoneOccupancy.map((z, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-700 font-medium">{z.zone}</span>
                      <span className="font-extrabold text-[#188245]">{z.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workload Over Match Timeline */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="text-xs lg:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Match Workload Timeline
                </h3>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={workloadTimeline}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="interval" stroke="#94A3B8" fontSize={11} />
                      <YAxis stroke="#94A3B8" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '12px', fontSize: '12px' }} />
                      <Bar dataKey="distance" fill="#1F9D55" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3 text-slate-400">
              <Users className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-xs lg:text-sm font-semibold text-slate-600">Select a player from squad roster to open profile detail drawer.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
