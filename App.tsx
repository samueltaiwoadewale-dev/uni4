import React, { useState, useEffect, useRef } from "react";
import { 
  TrendingUp, 
  GraduationCap, 
  MessageSquare, 
  MessageCircle,
  Award, 
  Sparkles,
  Layers,
  HelpCircle,
  Network,
  ChevronRight,
  BookOpen,
  Cpu,
  Radio,
  Smartphone,
  Compass,
  Shield,
  Lock,
  Bell,
  Search,
  User,
  Settings,
  MoreVertical,
  Activity,
  Zap,
  Flame,
  Menu,
  X,
  MapPin,
  Clock,
  Heart,
  Volume2,
  VolumeX,
  Plus,
  PlusCircle,
  Compass as CompassIcon,
  BookOpen as BookIcon,
  FileText,
  DollarSign,
  ShoppingBag,
  CheckCircle,
  Instagram,
  Twitter,
  Facebook
} from "lucide-react";

import AIAcademicTools from "./components/AIAcademicTools";
import CampusBuzz from "./components/CampusBuzz";
import AdvertisementExperience from "./components/AdvertisementExperience";
import Opportunities from "./components/Opportunities";
import { UniVerseLogo } from "./components/Logo";
import SessionalEcosystems from "./components/SessionalEcosystems";
import StudentAuthLoader from "./components/StudentAuthLoader";
import ProfileModal from "./components/ProfileModal";
import CampusChat from "./components/CampusChat";
import MarketplaceHub from "./components/MarketplaceHub";
import ManagementDashboard from "./components/ManagementDashboard";
import PremiumAdSystem from "./components/PremiumAdSystem";
import PDFHouse from "./components/PDFHouse";
import { OriginalFlyerAd } from "./components/OriginalFlyerAd";

type TabID = 
  | "social" 
  | "chat"
  | "onboarding" 
  | "academic" 
  | "ecosystem" 
  | "opportunities" 
  | "marketplace"
  | "discovery";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("universe_logged_in") === "true";
  });
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem("universe_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
         console.warn(e);
      }
    }
    return {
      name: "Sam Student",
      handle: "sam_oau",
      avatar: "",
      xp: 480,
      level: "300L",
      email: "sam@students.oauife.edu.ng",
      department: "Computer Science",
      matricNumber: "CSC/2021/042",
      hostel: "Angola Hall, Block B",
      interests: ["Structured Algorithms", "CBT Past Questions"]
    };
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(() => {
    return localStorage.getItem("universe_is_premium") === "true";
  });
  const [appBootComplete, setAppBootComplete] = useState(false);
  const [showAdExperience, setShowAdExperience] = useState(false);
  const [viewMode, setViewMode] = useState<"standard" | "management">(() => {
    return (localStorage.getItem("universe_view_mode") as any) || "standard";
  });

  const [adminConfig, setAdminConfig] = useState(() => {
    const saved = localStorage.getItem("universe_admin_config");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      adSkipTime: 15,
      adInterval: 480,
      adsEnabled: true,
      systemHealthy: true,
      flaggedCount: 24,
      loadSpeed: "0.18s",
      activeUsers: 1421,
    };
  });

  const [activeTab, setActiveTab] = useState<TabID>("social");
  const [discoverySubTab, setDiscoverySubTab] = useState<"search" | "feed">("search");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [simulatedLoadSpeed, setSimulatedLoadSpeed] = useState("0.18s");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  // Web audio synthesis context for haptics
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Clock updater
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);
    
    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  // Quick UI feedback sound player
  const triggerHapticFeedback = (freq: number, type: "sine" | "triangle" = "sine", duration = 0.08) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Telemetry chime muted by sandboxed iframe policy.");
    }
  };

  const menuItems: Array<{ id: TabID; label: string; icon: any; category: "feed" | "academic" }> = [
    // Core feeds & students tools
    { id: "social", label: "Campus Feed", icon: Flame, category: "feed" },
    { id: "chat", label: "Sessional Chat", icon: MessageCircle, category: "feed" },
    { id: "academic", label: "AI Study Hub", icon: GraduationCap, category: "academic" },
    { id: "ecosystem", label: "Sessional Spaces", icon: Layers, category: "academic" },
    { id: "marketplace", label: "Market & Gigs", icon: ShoppingBag, category: "academic" },
    { id: "opportunities", label: "Pipeline Hub", icon: Award, category: "academic" },
    { id: "discovery", label: "PDF House", icon: BookOpen, category: "academic" },
  ];

  const handleUpgrade = () => {
    triggerHapticFeedback(900, "sine", 0.3);
    setIsPremium(true);
    localStorage.setItem("universe_is_premium", "true");
    alert("Welcome to UniVerse Premium! All ads have been removed.");
  };

  const handleTabChange = (tabId: TabID) => {
    triggerHapticFeedback(activeTab === "social" ? 440 : 520, "sine", 0.1);
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  // Render Loading + Authentication Gate Flow on every fresh load
  if (!appBootComplete) {
    return (
      <StudentAuthLoader
        alreadyLoggedIn={isLoggedIn}
        onBootComplete={() => {
          setAppBootComplete(true);
          if (!isPremium) setShowAdExperience(true);
        }}
        onLoginSuccess={(profile) => {
          setUserProfile(profile);
          localStorage.setItem("universe_profile", JSON.stringify(profile));
          setIsLoggedIn(true);
          localStorage.setItem("universe_logged_in", "true");
          setAppBootComplete(true);
          if (!isPremium) setShowAdExperience(true);
        }}
        onEnterManagementMode={() => {
          // Secret management node entry point clicked: Log in as official UniVerse account
          const uniVerseProfile = {
            name: "UniVerse Official",
            handle: "universe_hq",
            avatar: "", 
            xp: 9999,
            level: "HQ",
            email: "hq@universe.app",
            department: "System Architect",
            matricNumber: "CORE-001",
            hostel: "Main Server Hub",
            interests: ["Ecosystem Growth", "Student Connectivity"]
          };
          setUserProfile(uniVerseProfile);
          localStorage.setItem("universe_profile", JSON.stringify(uniVerseProfile));
          setIsLoggedIn(true);
          localStorage.setItem("universe_logged_in", "true");
          
          // Optionally switch to management view, but default to social feed to see the update
          setActiveTab("social");
          setAppBootComplete(true);
        }}
        soundEnabled={soundEnabled}
        triggerHapticFeedback={triggerHapticFeedback}
        UniVerseLogo={UniVerseLogo}
      />
    );
  }

  // Cinematic Advertisement Entry Focus (Interactive Flyer)
  if (showAdExperience) {
    return <AdvertisementExperience onLaunchApp={() => setShowAdExperience(false)} />;
  }

  // Render Management Interface face
  if (viewMode === "management") {
    return (
      <ManagementDashboard 
        onExit={() => {
          setViewMode("standard");
          localStorage.setItem("universe_view_mode", "standard");
          setIsLoggedIn(false);
          setAppBootComplete(false);
        }}
        triggerHapticFeedback={triggerHapticFeedback}
        adminConfig={adminConfig}
        onUpdateConfig={(config: any) => {
          setAdminConfig(config);
          localStorage.setItem("universe_admin_config", JSON.stringify(config));
        }}
        isPremium={isPremium}
        onUpdatePremium={(val: boolean) => {
          setIsPremium(val);
          localStorage.setItem("universe_is_premium", val ? "true" : "false");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#070B16] text-white selection:bg-emerald-500/30 selection:text-white font-sans flex justify-center overflow-x-hidden antialiased">
      {adminConfig.adsEnabled && (
        <PremiumAdSystem 
          isPremium={isPremium} 
          onUpgrade={handleUpgrade} 
          triggerHapticFeedback={triggerHapticFeedback} 
          adSkipTime={adminConfig.adSkipTime}
          OriginalFlyerAd={OriginalFlyerAd}
        />
      )}
      <div className="w-full max-w-[1600px] flex relative min-h-screen">
        
        {/* =========================================================
            LEFT COLUMN: TWITTER/X-INSPIRED PREMIUM SIDEBAR (STICKY)
            ========================================================= */}
        <aside className="hidden lg:flex w-64 xl:w-72 flex-col justify-between py-6 px-4 shrink-0 h-screen sticky top-0 border-r border-white/10 select-none bg-gradient-to-b from-[#070B16] to-[#0A0F1E]">
          <div className="space-y-6">
            
            {/* Elegant Header Identifier Logo */}
            <div 
              onClick={() => handleTabChange("social")}
              className="group flex items-center gap-3.5 px-3 py-1.5 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer text-left"
            >
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center p-1 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <UniVerseLogo size={32} animate={true} orbitSpeed={0.8} bubbleScale={0.7} glow={false} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg font-bold text-white font-display tracking-tight leading-none">
                    UniVerse<span className="text-emerald-400">.</span>
                  </h1>
                  <span className="text-[8px] font-mono px-1 bg-emerald-500/20 text-emerald-400 rounded-md border border-emerald-500/30 select-none">
                    MVP
                  </span>
                </div>
                <p className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase font-extrabold leading-none mt-1">
                  West African Sessional Net
                </p>
              </div>
            </div>

            {/* Micro Connectivity Status Indicator */}
            <div className="mx-3 p-3 rounded-xl bg-white/5 border border-white/5 space-y-2 text-left">
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                  Node: OAU.ife
                </span>
                <span>LTE • {adminConfig.loadSpeed || simulatedLoadSpeed}</span>
              </div>
              <p className="text-[10px] text-zinc-400 font-semibold leading-relaxed">
                Seamless local latency routing prevents sessional data leakage.
              </p>
            </div>

            {/* Navigation vertical list stack */}
            <nav className="space-y-0.5 text-left">
              {/* Category 1: Feeds & Community */}
              <div className="px-3 mb-2">
                <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-550 uppercase">Student Universe</span>
              </div>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      active 
                        ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/5 text-emerald-400 border border-emerald-500/25 shadow-md shadow-emerald-950/20" 
                        : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-transform duration-200 ${active ? "text-emerald-400 scale-105" : "text-zinc-500"}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

          </div>

          {/* User Profile Footer Card */}
          <div 
            onClick={() => {
              triggerHapticFeedback(500, "sine", 0.1);
              setIsProfileModalOpen(true);
            }}
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl space-y-3.5 text-left cursor-pointer transition-all hover:scale-[1.01]"
            title="Edit Profile Settings"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {userProfile.avatar ? (
                  <img 
                    src={userProfile.avatar} 
                    alt={userProfile.name} 
                    className="w-8.5 h-8.5 rounded-lg object-cover border border-emerald-400/20"
                  />
                ) : (
                  <div className="w-8.5 h-8.5 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-white text-xs border border-emerald-400/20">
                    {userProfile.name[0]?.toUpperCase() || "S"}
                  </div>
                )}
                <div className="leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="text-[11.5px] font-bold text-white max-w-[100px] truncate">{userProfile.name}</span>
                    <span className="w-2.5 h-2.5 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-[7px] font-black border border-emerald-500/30">✓</span>
                  </div>
                  <p className="text-[9.5px] text-zinc-500 font-mono truncate max-w-[100px]">@{userProfile.handle}</p>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSoundEnabled(!soundEnabled);
                  triggerHapticFeedback(600, "sine", 0.05);
                }}
                className="text-zinc-550 hover:text-white cursor-pointer p-1 rounded-md hover:bg-white/5"
                title="Toggle Audio Feedback"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
              </button>
            </div>
            
            <div className="flex justify-between items-center text-[9px] font-mono text-zinc-550">
              <span>Sessional IQ: <strong className="text-emerald-400 font-black">{userProfile.xp} XP</strong></span>
              <span>Level {userProfile.level}</span>
            </div>
          </div>
        </aside>

        {/* =========================================================
            MIDDLE COLUMN: THE ENERGETIC LIVE WORKSPACE VIEWPORT
            ========================================================= */}
        <main className="flex-1 min-w-0 border-r border-white/10 flex flex-col min-h-screen bg-[#070B16] relative pb-20 lg:pb-6">
          
          {/* Sticky view sub-header */}
          <header className={`h-16 sticky top-0 z-30 bg-[#070B16]/85 backdrop-blur-md border-b border-white/10 px-4 md:px-6 flex items-center justify-between select-none ${viewMode === "management" ? "hidden" : ""}`}>
            
            {/* Left Hand: Logo & Title */}
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={() => {
                  triggerHapticFeedback(440, "sine");
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="lg:hidden p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div 
                onClick={() => handleTabChange("social")}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <UniVerseLogo size={28} animate={true} orbitSpeed={0.8} glow={false} />
                <h1 className="text-lg font-black text-white font-display tracking-tight leading-none hidden sm:block">
                  UniVerse
                </h1>
              </div>
            </div>

            {/* Right side: Actions & Identity */}
            <div className="flex items-center gap-4">
              {/* Chat icon */}
              <button 
                onClick={() => handleTabChange("chat")}
                className="p-2 hover:bg-white/5 rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              {/* Profile Avatar trigger */}
              <button 
                onClick={() => {
                  triggerHapticFeedback(600, "sine", 0.08);
                  setIsProfileModalOpen(true);
                }}
                className="w-8.5 h-8.5 rounded-full overflow-hidden border border-white/10 hover:border-emerald-500/40 p-0.5 transition-all flex items-center justify-center cursor-pointer bg-white/5 ml-1"
                title="Student Identity Hub"
              >
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-black text-white">
                    {userProfile.name[0]}
                  </div>
                )}
              </button>

            </div>
          </header>

          {/* Active section dynamic rendering sandbox */}
          <div className="flex-1 p-3 md:p-6 overflow-y-auto">
            {activeTab === "social" && (
              <CampusBuzz 
                userProfile={userProfile} 
                isPremium={isPremium} 
                onSwitchTab={(id) => setActiveTab(id as any)}
              />
            )}
            {activeTab === "chat" && (
              <CampusChat 
                userProfile={userProfile} 
                triggerHapticFeedback={triggerHapticFeedback} 
              />
            )}
            {activeTab === "ecosystem" && <SessionalEcosystems />}
            {activeTab === "academic" && <AIAcademicTools userProfile={userProfile} />}
            {activeTab === "opportunities" && <Opportunities />}
            {activeTab === "marketplace" && <MarketplaceHub triggerHapticFeedback={triggerHapticFeedback} />}
            {activeTab === "discovery" && <PDFHouse />}
          </div>

        </main>

        {/* =========================================================
            RIGHT COLUMN: STICKY TELEMETRY, TRENDING & BUZZ
            ========================================================= */}
        <aside className="hidden xl:flex w-80 flex-col gap-5 p-6 h-screen sticky top-0 overflow-y-auto select-none shrink-0 border-l border-white/10 bg-[#070B16] scrollbar-none">
          
          {/* Quick Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search sessional hubs..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-[#121829] border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-zinc-500 transition-colors"
            />
          </div>

          {/* Premium Ad & Subscription System */}
          {!isPremium && (
            <div className="bg-gradient-to-br from-[#0A0F1E] to-[#1E1B4B] border border-indigo-500/30 rounded-3xl p-6 space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-2xl group-hover:bg-indigo-500/20 transition-all" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em] font-mono">Premium</span>
                </div>
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Sponsored</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                  <p className="text-[11px] font-bold text-white">This ad appears every 8 mins</p>
                  <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">Upgrade to eliminate interruptions and unlock student superpowers.</p>
                </div>

                <button 
                  onClick={handleUpgrade}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  Remove Ads Now
                </button>

                <button 
                  onClick={() => {
                    triggerHapticFeedback(600, "sine", 0.1);
                    window.dispatchEvent(new CustomEvent("trigger-test-ad"));
                  }}
                  className="w-full py-2 bg-[#121829] hover:bg-[#1E1B4B]/40 text-[#CBD5E1] text-[10px] font-mono border border-dashed border-indigo-500/35 rounded-xl transition-all"
                >
                  ⚙️ Simulation: Trigger 15-Sec Ad Flyer
                </button>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  {[
                    "Ad-free Flow",
                    "Custom Themes",
                    "Priority Chats",
                    "Early Features"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      <span className="text-[9px] font-bold text-zinc-400">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Campaign Playbook Info */}
          <div className="bg-[#121829] border border-white/5 rounded-2xl p-4.5 space-y-3">
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-550 font-black block">Applet Instructions</span>
            <p className="text-[10.5px] text-zinc-400 leading-relaxed text-left">
              <strong>UniVerse MVP</strong> showcases complete architectural layouts, social feeds, and local offline persistence models suitable for highly constrained mobile network environments in West African universities.
            </p>
            
            {/* User Community & Social Connections Section */}
            <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
              <div className="space-y-1 text-center">
                <p className="text-[11px] font-black text-white/40 tracking-[0.2em] uppercase font-mono italic">Social Sync</p>
                <p className="text-[10px] text-zinc-600 font-bold">Connect with the UniVerse network globally</p>
              </div>

              <div className="flex justify-center gap-4">
                {[
                  { icon: Instagram, label: "Instagram", color: "text-rose-500", glow: "shadow-[0_0_15px_rgba(244,63,94,0.2)]" },
                  { icon: Twitter, label: "Twitter", color: "text-sky-400", glow: "shadow-[0_0_15px_rgba(56,189,248,0.2)]" },
                  { icon: Facebook, label: "Facebook", color: "text-blue-600", glow: "shadow-[0_0_15px_rgba(37,99,235,0.2)]" },
                ].map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <button 
                      key={i}
                      onClick={() => {
                        triggerHapticFeedback(440, "sine", 0.1);
                        window.open(`https://www.${social.label.toLowerCase()}.com`, '_blank');
                      }}
                      className={`w-12 h-12 flex items-center justify-center rounded-[1.25rem] bg-white/5 hover:bg-white/10 transition-all border border-white/10 cursor-pointer ${social.color} ${social.glow} hover:scale-110 active:scale-95`}
                      title={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>

              <div className="px-2">
                <button 
                  onClick={() => {
                    triggerHapticFeedback(880, "triangle", 0.2);
                    alert("UniVerse TikTok Feed Coming Soon! Syncing campus content...");
                  }}
                  className="w-full py-4 rounded-[2rem] bg-indigo-500 text-white text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-[0_0_25px_rgba(99,102,241,0.3)] flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <Flame className="w-4 h-4 animate-pulse group-hover:scale-125 transition-transform" />
                  Launch TikTok Feed
                </button>
              </div>

              <div className="flex flex-col items-center gap-3 pt-4 opacity-50 hover:opacity-100 transition-opacity">
                <div className="w-24 h-24 bg-white p-2 rounded-3xl border-4 border-[#070B16] shadow-2xl">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://uni-verse.app" alt="QR Code" className="w-full h-full grayscale hover:grayscale-0 transition-all" />
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.1em] font-mono">Accessible Anywhere</p>
                  <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Scan to Launch Web Platform</p>
                </div>
              </div>
            </div>
          </div>

        </aside>

      </div>

      {/* =========================================================
          MOBILE VIEW NOTIFIED DRAWER / NAVIGATION OVERLAY
          ========================================================= */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex select-none bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-72 bg-[#090D1A] border-r border-white/10 h-full p-5 flex flex-col justify-between space-y-6 text-left relative shadow-2xl">
            
            <button 
              type="button"
              onClick={() => {
                triggerHapticFeedback(300, "sine");
                setIsMobileMenuOpen(false);
              }}
              className="absolute top-4 right-4 p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-2.5">
                <UniVerseLogo size={32} animate={true} orbitSpeed={0.8} glow={false} />
                <h3 className="text-base font-black text-white font-display">UniVerse</h3>
              </div>

              <div className="w-[1px] h-2 bg-transparent" />

              <nav className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-550 block mb-2 px-2">Campus Sectors</span>
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === item.id 
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" 
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-zinc-500 text-[10px] font-mono">
              <p>Device Frame Muted • 5G Status Live</p>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================
          MOBILE BOTTOM NAVIGATION TAB BAR (STICKY)
          ========================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#070B16]/95 backdrop-blur-md border-t border-white/10 h-16 flex items-center justify-around px-2 select-none shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {[
          { id: "social", label: "Home", icon: Flame },
          { id: "ecosystem", label: "Communes", icon: Network },
          { id: "upload", label: "Create", icon: Plus, special: true },
          { id: "chat", label: "Chats", icon: MessageSquare },
          { id: "profile", label: "Profile", icon: User },
        ].map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          
          if (item.special) {
            return (
              <button
                key={item.id}
                onClick={() => {
                   triggerHapticFeedback(600, "triangle", 0.15);
                   setActiveTab("social");
                   setTimeout(() => {
                     window.dispatchEvent(new CustomEvent("open-post-publisher"));
                   }, 50);
                }}
                className="relative -top-5 w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] border-4 border-[#070B16] hover:scale-110 active:scale-95 transition-all cursor-pointer group"
              >
                <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-20 group-hover:block hidden" />
                <Plus className="w-8 h-8" />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "profile") {
                  setIsProfileModalOpen(true);
                } else {
                  handleTabChange(item.id as TabID);
                }
              }}
              className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all cursor-pointer ${
                active ? "text-white" : "text-zinc-550 hover:text-zinc-350"
              }`}
            >
              <Icon className={`w-5.5 h-5.5 ${active ? "text-indigo-400" : ""}`} />
              <span className={`text-[8.5px] font-bold mt-0.5 uppercase tracking-tighter ${active ? "text-indigo-400" : ""}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Profile Management Modal overlay */}
      {isProfileModalOpen && (
        <ProfileModal
          userProfile={userProfile}
          onProfileChange={(newProfile) => {
            setUserProfile(newProfile);
            localStorage.setItem("universe_profile", JSON.stringify(newProfile));
          }}
          onClose={() => setIsProfileModalOpen(false)}
          onLogout={() => {
            localStorage.removeItem("universe_logged_in");
            localStorage.removeItem("universe_developer_mode");
            setIsLoggedIn(false);
            setAppBootComplete(false);
            setIsProfileModalOpen(false);
          }}
          triggerHapticFeedback={triggerHapticFeedback}
        />
      )}

    </div>
  );
}

// Quick Clock Icon Helper Component
function ClockIcon({ className }: { className?: string }) {
  return <Clock className={className} />;
}

// Quick Play Icon Helper Component
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
