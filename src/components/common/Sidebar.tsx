import React from 'react';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Users, 
  FileCheck2,
  ShieldCheck
} from 'lucide-react';

export type NavItem = 
  | 'summary'
  | 'tactical'
  | 'players'
  | 'evidence';

interface SidebarProps {
  activeTab: NavItem;
  onSelectTab: (tab: NavItem) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const navItems = [
    { 
      id: 'summary', 
      label: 'Match Summary', 
      subtitle: 'What happened?',
      icon: LayoutDashboard 
    },
    { 
      id: 'tactical', 
      label: 'Tactical Analysis', 
      subtitle: 'How did team play?',
      icon: BrainCircuit 
    },
    { 
      id: 'players', 
      label: 'Players', 
      subtitle: 'Who needs attention?',
      icon: Users 
    },
    { 
      id: 'evidence', 
      label: 'Evidence & Insights', 
      subtitle: 'Proof & metrics',
      icon: FileCheck2
    },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col justify-between h-[calc(100vh-65px)] sticky top-[65px] shrink-0 shadow-xs z-20">
      <div className="p-5 space-y-7">
        {/* Brand Identity */}
        <div className="flex items-center gap-3.5 px-2 py-1">
          <div className="w-10 h-10 rounded-2xl bg-[#E8F5EE] border border-emerald-200 flex items-center justify-center text-[#1F9D55] shadow-2xs shrink-0">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <div className="text-base font-bold text-slate-900 tracking-tight">Tactical AI</div>
            <div className="text-xs text-[#188245] font-semibold">Intelligence Engine</div>
          </div>
        </div>

        {/* 4 Main Navigation Items */}
        <div className="space-y-2">
          <div className="px-2.5 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Coach Navigation
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id as NavItem)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 text-left ${
                    isActive
                      ? 'bg-[#E8F5EE] text-[#188245] border border-emerald-200 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className={`w-5 h-5 shrink-0 transition-colors ${
                      isActive ? 'text-[#1F9D55]' : 'text-slate-400'
                    }`} />
                    <div>
                      <div className="text-sm font-bold leading-tight">{item.label}</div>
                      <div className={`text-xs font-normal mt-0.5 ${
                        isActive ? 'text-[#188245]' : 'text-slate-400'
                      }`}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer System Status summary */}
      <div className="p-5 border-t border-slate-100 bg-slate-50/50">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1F9D55]" /> Match Quality
            </span>
            <span className="text-[#188245] font-bold">94% Validated</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-[#1F9D55] h-full w-[94%]" />
          </div>
        </div>
      </div>
    </aside>
  );
};
