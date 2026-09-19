import React from 'react';
import { 
  LayoutDashboard, 
  Trophy, 
  BrainCircuit, 
  Users, 
  Shapes, 
  Activity, 
  FileSearch, 
  ShieldCheck, 
  Settings,
  UploadCloud
} from 'lucide-react';

export type NavItem = 
  | 'overview'
  | 'matches'
  | 'tactical'
  | 'players'
  | 'shape'
  | 'physical'
  | 'evidence'
  | 'data-quality'
  | 'acquisition'
  | 'settings';

interface SidebarProps {
  activeTab: NavItem;
  onSelectTab: (tab: NavItem) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const navItems = [
    { id: 'overview', label: 'Match Overview', icon: LayoutDashboard },
    { id: 'tactical', label: 'Tactical Analysis', icon: BrainCircuit },
    { id: 'evidence', label: 'Evidence Review', icon: FileSearch, badge: 'AI' },
    { id: 'shape', label: 'Team Shape', icon: Shapes },
    { id: 'players', label: 'Player Analysis', icon: Users },
    { id: 'physical', label: 'Physical Performance', icon: Activity },
    { id: 'data-quality', label: 'Data Quality', icon: ShieldCheck, badge: '94%' },
    { id: 'acquisition', label: 'Match Acquisition', icon: UploadCloud },
    { id: 'matches', label: 'Matches Archive', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-dark-card border-r border-dark-border flex flex-col justify-between h-[calc(100vh-65px)] sticky top-[65px] shrink-0">
      <div className="p-4 space-y-6">
        {/* Brand identity */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-wide">TACTICAL AI</div>
            <div className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase">Intelligence Engine</div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id as NavItem)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold shadow-sm'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-dark-cardHover'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-emerald-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    item.badge === 'AI' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer System Status */}
      <div className="p-4 border-t border-dark-border">
        <div className="p-3 rounded-lg bg-dark-bg border border-dark-border space-y-2">
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <span>PIPELINE ENGINE</span>
            <span className="text-emerald-400 font-semibold">ACTIVE</span>
          </div>
          <div className="w-full bg-dark-border rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-400 h-full w-[94%]" />
          </div>
          <div className="text-[10px] text-gray-500 flex justify-between font-mono">
            <span>Homography: 0.43m</span>
            <span>FPS: 25.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
