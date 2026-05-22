import React, { useState } from "react";
import { 
  Shield, 
  Activity, 
  BarChart3, 
  AlertTriangle, 
  Settings, 
  Bell, 
  Database, 
  Cpu, 
  Globe, 
  LogOut,
  LayoutDashboard,
  Server,
  Zap,
  TrendingUp,
  FileText
} from "lucide-react";

interface ManagementDashboardProps {
  onExit: () => void;
  triggerHapticFeedback: (f: number, t?: "sine" | "triangle", d?: number) => void;
  adminConfig: {
    adSkipTime: number;
    adInterval: number;
    adsEnabled: boolean;
    systemHealthy: boolean;
    flaggedCount: number;
    loadSpeed: string;
    activeUsers: number;
  };
  onUpdateConfig: (config: any) => void;
  isPremium: boolean;
  onUpdatePremium: (val: boolean) => void;
}

export default function ManagementDashboard({ 
  onExit, 
  triggerHapticFeedback, 
  adminConfig, 
  onUpdateConfig, 
  isPremium, 
  onUpdatePremium 
}: ManagementDashboardProps) {
  const [activeView, setActiveView] = useState<"overview" | "moderation" | "nodes" | "economy">("overview");

  const STATS = [
    { label: "Active Sessional Nodes", value: "142 Nodes", trend: "+12%", icon: Server, color: "text-emerald-400" },
    { label: "Community Trust Index", value: "98.4%", trend: "+0.2%", icon: Shield, color: "text-blue-400" },
    { label: "24h Volume (Platform Fee)", value: "₦142,500", trend: "+24%", icon: BarChart3, color: "text-purple-400" },
    { label: "Flagged Content", value: `${adminConfig.flaggedCount}`, trend: "-15%", icon: AlertTriangle, color: "text-red-400" },
  ];

  return (
    <div className="min-h-screen bg-[#070B16] text-white flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* PROFESSIONAL MANAGEMENT HEADER */}
      <header className="h-16 border-b border-white/10 bg-[#0F172A]/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <LayoutDashboard className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-widest text-white leading-none">Management Console</h1>
              <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-tighter mt-1">
                Auth Code: <span className="text-indigo-400">SESSION-ADMIN-PRIME</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <div className={`w-1.5 h-1.5 rounded-full ${adminConfig.systemHealthy ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
            <span className={`text-[10px] font-mono font-bold uppercase ${adminConfig.systemHealthy ? 'text-emerald-400' : 'text-red-400'}`}>
              {adminConfig.systemHealthy ? "SYSTEM HEALTHY" : "DEGRADED ALERTS"}
            </span>
          </div>
          
          <button 
            type="button"
            onClick={onExit}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-rose-600 hover:text-white border border-rose-500/30 rounded-xl text-rose-400 text-[10px] font-black uppercase transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>← Exit Console</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR NAVIGATION */}
        <nav className="w-20 md:w-64 border-r border-white/10 bg-[#070B16] flex flex-col p-4 space-y-2">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "moderation", label: "Trust & Safety", icon: Shield },
            { id: "nodes", label: "Core Control Desk", icon: Globe },
            { id: "economy", label: "Escrow Flows", icon: BarChart3 },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => { triggerHapticFeedback(440); setActiveView(item.id as any); }}
                className={`w-full flex items-center justify-center md:justify-start gap-3 px-3.5 py-3 rounded-xl transition-all group cursor-pointer ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-white' : 'group-hover:text-indigo-400'}`} />
                <span className="hidden md:inline text-xs font-black uppercase tracking-wider">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto bg-[#020617] p-5 sm:p-8 space-y-8 custom-scrollbar">
          
          {/* WELCOME SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-1 text-left">
              <span className="text-[9px] font-mono text-indigo-400 uppercase font-black tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                System Operator Suite
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight uppercase italic">
                Active Desk Oversight
              </h2>
              <p className="text-[11px] text-zinc-500 max-w-xl leading-relaxed">
                Direct control over sessional ad count frequency, student verification logs, live delay streams, and sessional transactional economy.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={() => {
                  triggerHapticFeedback(600, "sine", 0.1);
                  alert(`Audit report prepared for sessional latency deviation (${adminConfig.loadSpeed}).`);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                Generate Audit Report
              </button>
            </div>
          </div>

          {/* CONDITIONAL SECTIONS */}
          {activeView === "overview" && (
            <div className="space-y-8">
              {/* KEY PERFORMANCE INDICATORS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-[#0F172A] border border-white/5 rounded-2xl p-5 space-y-4 hover:border-indigo-500/30 transition-all group text-left">
                      <div className="flex justify-between items-start">
                        <div className={`p-2.5 bg-zinc-950 rounded-xl border border-white/10 ${stat.color} group-hover:scale-110 transition-transform`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${stat.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>
                          {stat.trend}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-mono text-zinc-500 uppercase font-black tracking-widest leading-none">{stat.label}</h4>
                        <p className="text-lg font-black text-white mt-1.5">{stat.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FLOW GRAPH */}
                <div className="lg:col-span-2 bg-[#0F172A] border border-white/5 rounded-3xl p-6 space-y-6 relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div className="space-y-0.5">
                      <h3 className="text-xs font-black text-white uppercase tracking-tight font-display">Sessional Student Flow Pulse</h3>
                      <p className="text-[9px] text-zinc-500 font-mono tracking-wider">REAL-TIME DATA PULSE • {adminConfig.activeUsers} STUDENTS ACTIVE</p>
                    </div>
                    <span className="text-[9px] font-mono bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 font-bold uppercase">
                      Devi: {adminConfig.loadSpeed}
                    </span>
                  </div>

                  <div className="h-44 flex items-end gap-2 pt-2">
                    {[35, 48, 40, 68, 85, 55, 75, 52, 60, 80, 48, 62, 78, 42, 70, 92, 58, 40, 82].map((val, i) => (
                      <div key={i} className="flex-1 space-y-1 group relative h-full flex flex-col justify-end">
                        <div className="group-hover:block hidden absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-black px-1.5 py-0.5 rounded shadow-xl z-20">
                          {val}%
                        </div>
                        <div 
                          className={`w-full rounded-t-sm transition-all duration-1005 bg-gradient-to-t from-indigo-900/60 to-indigo-500 ${i % 2 === 0 ? 'opacity-40' : 'opacity-90'}`}
                          style={{ height: `${val}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-[8px] font-mono text-zinc-600 uppercase font-black px-1">
                    <span>Morning Loop</span>
                    <span>Noon Lectures</span>
                    <span>Hostel Sessional Spike</span>
                  </div>
                </div>

                {/* LOGS OVERVIEW PANEL */}
                <div className="bg-[#0F172A] border border-white/5 rounded-3xl p-6 space-y-5 text-left flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-[10px] font-black uppercase text-indigo-400 font-mono tracking-wider">Escrow Ledger Audit</span>
                      <TrendingUp className="w-4 h-4 text-[#FACC15]" />
                    </div>
                    
                    <div className="space-y-2.5 font-mono text-[10px] text-zinc-400">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>STU.PAY FEE LEVEL</span>
                        <span className="text-emerald-400 font-bold font-sans">₦242,500</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span>CAMPUS AD SYSTEM</span>
                        <span className={adminConfig.adsEnabled ? "text-indigo-400 font-black" : "text-rose-500 font-black"}>
                          {adminConfig.adsEnabled ? `LIVE (${adminConfig.adSkipTime}s)` : "MUTED"}
                        </span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span>BYPASS ACCOUNT LEVEL</span>
                        <span className={isPremium ? "text-[#FACC15] font-black" : "text-zinc-500 font-bold"}>
                          {isPremium ? "GOLD PREM" : "STANDARD"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-white/5 space-y-2 mt-4">
                    <span className="text-[9px] font-mono font-black text-indigo-400 uppercase tracking-widest block">Core Gateway Switch</span>
                    <p className="text-[10px] text-zinc-400 font-bold leading-normal">
                      Click standard nodes section in left vertical sidebar to edit these operational switches.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === "moderation" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
              {/* ALERTS QUEUE */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-[#0F172A] border border-white/5 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-xs font-black text-white uppercase font-display tracking-widest">Reports Moderation Queue</h3>
                    <span className="text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-1 rounded-full font-mono font-black">
                      {adminConfig.flaggedCount} Unresolved Claims
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: 1, user: "@jake_law_oau", reason: "Copyrighted Past Questions download leak", date: "Just now" },
                      { id: 2, user: "@rebecca_oau", reason: "Spam invitation requests", date: "5m ago" },
                      { id: 3, user: "@csc_tutor", reason: "False report congestion", date: "15m ago" }
                    ].map((rep) => (
                      <div key={rep.id} className="p-4 bg-zinc-950/60 rounded-2xl border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all hover:border-white/10">
                        <div className="space-y-1">
                          <span className="text-xs font-black text-white font-mono">{rep.user}</span>
                          <p className="text-[11px] text-zinc-400 leading-normal">{rep.reason}</p>
                          <span className="text-[9px] text-zinc-650 font-mono block">{rep.date}</span>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button 
                            type="button"
                            onClick={() => {
                              triggerHapticFeedback(500, "sine", 0.1);
                              onUpdateConfig({ ...adminConfig, flaggedCount: Math.max(0, adminConfig.flaggedCount - 1) });
                              alert("Content approved safely. Flag dismissed.");
                            }}
                            className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 border border-emerald-500/30 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer"
                          >
                            Dismiss
                          </button>
                          <button 
                            type="button"
                            onClick={() => {
                              triggerHapticFeedback(700, "sine", 0.15);
                              onUpdateConfig({ ...adminConfig, flaggedCount: Math.max(0, adminConfig.flaggedCount - 1) });
                              alert(`Sessional handle flagged or restricted.`);
                            }}
                            className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 border border-rose-500/30 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer"
                          >
                            Ban Handle
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECURITY CONFIGS */}
              <div className="bg-[#0F172A] border border-white/5 rounded-3xl p-6 space-y-6">
                <h4 className="text-xs font-black text-white uppercase italic tracking-widest">Verification Constraints</h4>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono block">Tighten Domain Shield</span>
                    <button 
                      type="button"
                      onClick={() => {
                        triggerHapticFeedback(600, "sine", 0.1);
                        alert("Domain verification constraints tightened to .edu.ng students only.");
                      }}
                      className="w-full py-3 bg-slate-950 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-left px-4 rounded-xl text-xs font-black text-zinc-300 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>Tighten Domain Guard</span>
                      <Shield className="w-4 h-4 text-emerald-400" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono block">Toggle System Alert Banner</span>
                    <button 
                      type="button"
                      onClick={() => {
                        triggerHapticFeedback(600, "sine", 0.1);
                        onUpdateConfig({ ...adminConfig, systemHealthy: !adminConfig.systemHealthy });
                      }}
                      className={`w-full py-3 border text-left px-4 rounded-xl text-xs font-black transition-all flex items-center justify-between cursor-pointer ${
                        adminConfig.systemHealthy ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-400"
                      }`}
                    >
                      <span>{adminConfig.systemHealthy ? "SYSTEM HEALTHY" : "DEGRADED NETWORK ALERT"}</span>
                      <Activity className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === "nodes" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
              {/* CORE ACTIVE SWITCH BOARD */}
              <div className="lg:col-span-2 bg-[#0F172A] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider font-display italic">Desk Live Operations Panel</h3>
                  <p className="text-[11px] text-zinc-500 mt-1">Directly patch global configurations across standard client applet layers.</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-black text-white uppercase">Sessional Ad Flyer Switch</h4>
                        <p className="text-[10.5px] text-zinc-500">Mutes or forces periodic ad interstitial displays for all students</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          triggerHapticFeedback(655, "sine", 0.15);
                          onUpdateConfig({ ...adminConfig, adsEnabled: !adminConfig.adsEnabled });
                        }}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer ${
                          adminConfig.adsEnabled 
                            ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 hover:scale-105" 
                            : "bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20"
                        }`}
                      >
                        {adminConfig.adsEnabled ? "Ads Powered ON" : "Ads Powered OFF"}
                      </button>
                    </div>

                    {adminConfig.adsEnabled && (
                      <div className="space-y-2.5">
                        <label className="text-[9px] text-zinc-500 uppercase font-mono block font-black">Ad Skip Timer Duration</label>
                        <div className="grid grid-cols-4 gap-2">
                          {[5, 10, 15, 30].map((sec) => (
                            <button
                              key={sec}
                              type="button"
                              onClick={() => {
                                triggerHapticFeedback(510, "sine", 0.1);
                                onUpdateConfig({ ...adminConfig, adSkipTime: sec });
                              }}
                              className={`p-3 rounded-xl border font-mono text-xs font-black transition-all cursor-pointer ${
                                adminConfig.adSkipTime === sec
                                  ? "bg-indigo-600 border-indigo-500 text-white shadow-md"
                                  : "bg-black/60 border-white/5 text-zinc-400 hover:border-white/10"
                              }`}
                            >
                              {sec}s Timer
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* OVERRIDE CARD */}
              <div className="bg-[#0F172A] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#FACC15] font-black italic">Bypass Direct Override</h4>
                  <p className="text-[10px] text-zinc-500 mt-1 uppercase">Force student state alterations instantly</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-3 text-left">
                    <div className="flex justify-between items-center text-[11px] font-mono">
                      <span className="text-zinc-400">SAM ACCT OVERLAY:</span>
                      <span className={isPremium ? "text-[#FACC15] font-black" : "text-zinc-500 font-bold"}>
                        {isPremium ? "GOLD PREM" : "STANDARD"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        triggerHapticFeedback(750, "sine", 0.2);
                        onUpdatePremium(!isPremium);
                      }}
                      className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] text-white font-black text-[10px] rounded-xl uppercase tracking-widest transition-all shadow-lg cursor-pointer"
                    >
                      Toggle Gold Premium
                    </button>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2 text-left">
                    <label className="text-[9px] text-zinc-500 uppercase font-mono block">Simulate Students Traffic Count</label>
                    <div className="flex gap-2">
                      <input 
                        type="number"
                        className="bg-black text-white px-3 py-1.5 rounded-lg w-20 border border-white/10 font-mono text-center text-xs font-bold"
                        value={adminConfig.activeUsers}
                        onChange={(e) => {
                          onUpdateConfig({ ...adminConfig, activeUsers: Number(e.target.value) || 1200 });
                        }}
                      />
                      <span className="text-zinc-500 text-[10px] uppercase font-mono shrink-0 self-center font-black">Active Pupils</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === "economy" && (
            <div className="space-y-6 text-left">
              <div className="bg-[#0F172A] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-4">
                <h3 className="text-sm font-black text-white uppercase italic tracking-wider font-display">Sessional Transaction ledger</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Stupay local escrow transactions matching process. Calculates fees at 2.5% per item to host autonomous sessional relays.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
                  {[
                    { title: "Sessional Volume Flow", amt: "₦142,500 Generated" },
                    { title: "Escrow Reserve Held", amt: "₦421,000 Safe" },
                    { title: "Platform Sessional Fees (OAU)", amt: "₦4,922 Total" }
                  ].map((ecc, i) => (
                    <div key={i} className="bg-zinc-950 p-5 rounded-2xl border border-white/5">
                      <span className="text-[9px] text-indigo-400 font-mono tracking-widest block uppercase font-black">{ecc.title}</span>
                      <span className="text-lg font-mono text-white mt-1.5 font-bold block">{ecc.amt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* GLOBAL FOOTER DEBUG */}
      <footer className="h-10 bg-black border-t border-white/5 px-6 flex items-center justify-between text-[9px] font-mono text-zinc-600 uppercase font-black">
        <div className="flex items-center gap-6">
          <span className="hidden sm:flex items-center gap-2">
            <Database className="w-3 h-3 text-emerald-500" />
            Sessional Caching Memory: <span className="text-emerald-400 font-bold">CONNECTED</span>
          </span>
          <span className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-indigo-400 animate-pulse" />
            Escrow Arbitrage: <span className="text-indigo-400 font-extrabold">ONLINE</span>
          </span>
        </div>
        <div className="text-zinc-500 flex items-center gap-4">
          <span>Uptime: 48:12:44</span>
          <span className="text-zinc-800 font-normal">|</span>
          <span>v2.8.0-PRIME</span>
        </div>
      </footer>
    </div>
  );
}
