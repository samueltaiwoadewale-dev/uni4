import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Flame, 
  GraduationCap, 
  Users, 
  MessageSquare, 
  Award, 
  Calendar, 
  ShoppingBag, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Laptop, 
  Smartphone, 
  Tablet, 
  QrCode, 
  Send, 
  Volume2, 
  VolumeX, 
  CheckCircle, 
  Lock, 
  Heart, 
  ArrowRight,
  TrendingUp,
  Share2,
  ExternalLink,
  Zap,
  Star,
  Download,
  Play,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Plus,
  Compass,
  Bell,
  Search,
  User,
  Check,
  Info
} from "lucide-react";

// --- CUSTOM SAMPLE DATA (NO PLACEHOLDERS) ---

const STORIES = [
  { id: "story-your", name: "Your Story", avatar: "👨‍🎓", isMe: true },
  { id: "story-tolu", name: "Tolu", avatar: "👩‍💻", media: "🏆 Proud of our team winning the Pan-African Hackathon today! Hard work pays off.", color: "from-blue-600 to-indigo-800" },
  { id: "story-debo", name: "Debo", avatar: "🎨", media: "💡 Just posted a free premium Figma resource pack. Grab it on the Marketplace section!", color: "from-purple-600 to-pink-805" },
  { id: "story-zainab", name: "Zainab", avatar: "🧬", media: "🔬 Chem lab reactions going fully viral today. Loving sessional academic life!", color: "from-emerald-600 to-teal-800" },
  { id: "story-favour", name: "Favour", avatar: "🎤", media: "🎸 Jamming in front of the Amphitheatre during student week. Join the session!", color: "from-rose-600 to-orange-800" },
  { id: "story-chinedu", name: "Chinedu", avatar: "⚽", media: "⚽ UI vs OAU football derby tomorrow. Let's turn Angola pitch green!", color: "from-yellow-500 to-red-600" }
];

interface InteractiveAdFlyerProps {
  triggerHapticFeedback?: (freq: number, type?: "sine" | "triangle", duration?: number) => void;
  isStatic?: boolean;
  onUpgrade?: () => void;
}

export default function InteractiveAdFlyer({ 
  triggerHapticFeedback = () => {},
  isStatic = false,
  onUpgrade
}: InteractiveAdFlyerProps) {
  // --- STATE SYSTEM ---
  const [activeAdSection, setActiveAdSection] = useState<string>("feed");
  const [premiumActivated, setPremiumActivated] = useState<boolean>(false);
  const [adTimerSecs, setAdTimerSecs] = useState<number>(480); // 8 minutes = 480 seconds
  const [likeCount, setLikeCount] = useState<number>(234);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "loading" | "complete">("idle");
  const [activeStory, setActiveStory] = useState<any>(null);
  
  // Follow/Join status states
  const [socialConnection, setSocialConnection] = useState({
    facebook: false,
    whatsapp: false,
    twitter: false,
    instagram: false,
    tiktok: false
  });

  const [activeDeviceTab, setActiveDeviceTab] = useState<string>("For You");
  const [soundOn, setSoundOn] = useState<boolean>(!isStatic);

  // Countdown timer simulation for "appears every 8 minutes"
  useEffect(() => {
    if (premiumActivated) return;
    const interval = setInterval(() => {
      setAdTimerSecs(prev => {
        if (prev <= 1) {
          triggerHapticFeedback(800, "triangle", 0.3);
          return 480; // reload back
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [premiumActivated]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remaining.toString().padStart(2, "0")}`;
  };

  const handleLike = () => {
    triggerHapticFeedback(600, "sine", 0.1);
    if (hasLiked) {
      setLikeCount(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikeCount(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleDownloadResource = () => {
    if (downloadStatus !== "idle") return;
    triggerHapticFeedback(440, "sine", 0.05);
    setDownloadStatus("loading");
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadStatus("complete");
          triggerHapticFeedback(880, "sine", 0.2);
          return 100;
        }
        triggerHapticFeedback(300 + prev * 2, "sine", 0.02);
        return prev + 10;
      });
    }, 120);
  };

  const handleSocialClick = (platform: keyof typeof socialConnection) => {
    triggerHapticFeedback(550, "triangle", 0.1);
    setSocialConnection(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const handleUpgradePremium = () => {
    triggerHapticFeedback(1000, "sine", 0.4);
    setPremiumActivated(true);
    if (onUpgrade) {
      onUpgrade();
    }
  };

  return (
    <div className="bg-[#050811] text-white min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center select-none antialiased">
      {/* GLOWING AMBIENCE & METEOR LINES */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl rounded-full" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#EC4899]/10 via-pink-400/5 to-transparent blur-3xl rounded-full" />
      
      {/* HIGH-END INTERACTIVE MUSIC & SOUND CHIME TOGGLE */}
      <div className="absolute top-4 right-4 z-40 bg-[#0F172A]/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 text-[10px] font-mono shadow-xl">
        <span className="text-zinc-500">SFX CHIMES:</span>
        <button 
          onClick={() => { setSoundOn(!soundOn); triggerHapticFeedback(600); }}
          className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase transition-all cursor-pointer ${soundOn ? 'bg-emerald-500 text-black' : 'bg-red-500/20 text-red-400'}`}
        >
          {soundOn ? "ACTIVE" : "MUTED"}
        </button>
      </div>

      {/* FLYER CONTAINER */}
      <div className="w-full max-w-5xl lg:max-w-7xl space-y-12 relative z-10">
        
        {/* =========================================================
            1. FLYER BANNER TOP HEADER SECTION
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center border-b border-white/10 pb-8">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-pink-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20 relative">
              <span className="text-2xl font-black italic text-black font-mono">U</span>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#050811] animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black uppercase tracking-tighter text-white font-display">UniVerse</span>
                <span className="text-[9px] font-mono tracking-widest font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded leading-none">WEB PLATFORM</span>
              </div>
              <p className="text-[10px] font-mono text-zinc-400 mt-1 uppercase tracking-wide">
                One Campus. <span className="text-emerald-400 font-extrabold italic">Infinite Connections.</span>
              </p>
            </div>
          </div>

          {/* Web App Access Indicator */}
          <div className="flex justify-center">
            <div className="bg-slate-950/60 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-lg">
              <Globe className="w-5 h-5 text-indigo-400" />
              <div className="text-left">
                <span className="text-[10px] font-black uppercase text-white block">Accessible Anywhere</span>
                <span className="text-[9px] text-zinc-500 font-mono block leading-none mt-0.5">Works on any browser. No installs.</span>
              </div>
            </div>
          </div>

          {/* Built For Students Authority Badges */}
          <div className="flex justify-end gap-2.5">
            {[
              { label: "Safe", desc: "Peer verified" },
              { label: "Verified", desc: "Z-Knowledge" },
              { label: "Secure", desc: "Secure node" },
              { label: "Private", desc: "Encryption" }
            ].map(b => (
              <div key={b.label} className="bg-[#121829] border border-white/5 py-1 px-3 rounded-lg text-center font-mono">
                <span className="text-[9px] text-emerald-400 font-black uppercase block leading-none">{b.label}</span>
                <span className="text-[7.5px] text-zinc-500 block font-bold uppercase mt-0.5">{b.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            2. CORE HERO BANNER DISPLAY ("YOUR CAMPUS. YOUR PEOPLE. YOUR WORLD.")
            ========================================================= */}
        <div className="text-center space-y-4">
          <div className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-500/15 to-pink-500/15 border border-indigo-500/20 rounded-full text-[10px] font-black text-indigo-300 uppercase tracking-widest animate-pulse">
            ★ UNIVERSE WEB SERVICE PORTAL INTERACTIVE ADVERTISING ★
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none font-display">
            YOUR CAMPUS. <span className="bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent italic font-extrabold">YOUR PEOPLE.</span> <br />
            <span className="bg-gradient-to-r from-[#EC4899] to-pink-500 bg-clip-text text-transparent">YOUR WORLD.</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            UniVerse is the ultimate student-managed web platform hosting sessional micro-ecosystems across major West African universities. <span className="text-white font-extrabold">Connect. Learn. Grow. Build.</span>
          </p>
        </div>

        {/* =========================================================
            3. MAIN VISUAL GRID (LEFT CAPABILITIES - CENTER LAPTOP - RIGHT ADS)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* A. LEFT COLUMN: CAPABILITIES MENU (INTERACTIVE FEED SELECTOR) */}
          <div className="space-y-4 lg:col-span-3 order-2 lg:order-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-2 block font-black">
              EXPLORE EVERY SECTOR
            </span>
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-4 rounded-3xl space-y-2">
              {[
                { id: "feed", label: "Campus Feed", icon: Flame, desc: "Sessional Student Buzz, news & live updates." },
                { id: "academic", label: "Academic Hub", icon: GraduationCap, desc: "Collaborate on course notes & practice packs." },
                { id: "communities", label: "Communities", icon: Users, desc: "Department & sessional affinity communes." },
                { id: "chats", label: "Sessional Chats", icon: MessageSquare, desc: "Instant low-latency sessional direct messaging." },
                { id: "opportunities", label: "Opportunities", icon: Award, desc: "Sessional Internships & academic scholarships." },
                { id: "events", label: "Campus Events", icon: Calendar, desc: "Sessional events, exhibitions & parties." },
                { id: "marketplace", label: "Marketplace", icon: ShoppingBag, desc: "Trust escrow campus commerce & direct gigs." },
                { id: "media", label: "Media Feeds", icon: Cpu, desc: "Video CDN platforms built for low internet bandwidths." }
              ].map(feat => {
                const Icon = feat.icon;
                const active = activeAdSection === feat.id;
                return (
                  <button
                    key={feat.id}
                    onClick={() => {
                      triggerHapticFeedback(500, "sine", 0.08);
                      setActiveAdSection(feat.id);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer group flex items-start gap-3 ${
                      active 
                        ? 'bg-gradient-to-r from-indigo-500/20 to-indigo-600/10 border-indigo-500 shadow-lg shadow-indigo-500/10' 
                        : 'bg-[#111827]/40 border-white/5 hover:bg-slate-950 hover:border-white/10'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${active ? 'bg-indigo-500 text-white' : 'bg-white/5 text-zinc-400 group-hover:text-white'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-[11px] font-bold uppercase block leading-none ${active ? 'text-indigo-400' : 'text-zinc-300'}`}>
                        {feat.label}
                      </span>
                      <p className="text-[9.5px] text-zinc-500 leading-tight mt-1 line-clamp-1">{feat.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* B. CENTER COLUMN (LAPTOP MOCKUP WITH ACTIVE LIVE FEED COMPONENT) */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            
            {/* STYLED LAPTOP BEZEL OUTLINE */}
            <div className={`relative bg-[#0F172A] border rounded-3xl p-3 shadow-[0_45px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-700 ${premiumActivated ? 'border-amber-400/60 shadow-amber-500/10 ring-2 ring-amber-400/10' : 'border-zinc-700 shadow-indigo-500/10'}`}>
              
              {/* WEBCAM & SENSORS */}
              <div className="absolute top-[8px] left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-black border border-white/5" />
                <div className="w-1 h-1 rounded-full bg-blue-500/50" />
                <div className="w-1 h-1 rounded-full bg-red-400/20" />
              </div>

              {/* LIVE SCREEN CONTAINER - Responsive Aspect Ratio */}
              <div className="bg-[#070B16] rounded-2xl overflow-hidden aspect-[9/16] lg:aspect-video min-h-[460px] lg:min-h-[580px] border border-white/5 flex flex-col relative shadow-inner">
                
                {/* 1. TOP NAV OF APPMOCKUP (Browser-like) */}
                <div className="bg-[#1E293B] border-b border-white/5 px-4 py-3 flex items-center justify-between z-30">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5 mr-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                       <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[10px] font-black text-white/50 uppercase italic tracking-widest hidden sm:inline">UniVerse Connect</span>
                  </div>
                  
                  {/* Mock search Bar */}
                  <div className="hidden sm:flex w-32 md:w-48 bg-black/40 rounded-lg p-1 border border-white/5 items-center gap-1">
                    <Search className="w-3 h-3 text-zinc-500" />
                    <span className="text-[8.5px] font-mono text-zinc-600 block">Global Campus Search...</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1">
                      <div className="w-4 h-4 rounded-full bg-blue-500 border border-black" />
                      <div className="w-4 h-4 rounded-full bg-emerald-500 border border-black" />
                    </div>
                    <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center text-[10px] font-black text-white border border-[#0F172A]">
                      S
                    </div>
                  </div>
                </div>

                {/* Main Content Area: Responsive side-by-side or stacked */}
                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
                  
                  {/* Sidebar inside screen (Only visible on lg) */}
                  <div className="hidden lg:flex w-44 bg-[#0F172A]/50 border-r border-white/5 p-4 flex-col gap-4">
                     <div className="space-y-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400 flex items-center gap-2">
                           <Compass className="w-3.5 h-3.5" />
                           <span className="text-[9px] font-black uppercase">Dashboard</span>
                        </div>
                        {["Academic", "Network", "Wallets", "Archive"].map(item => (
                          <div key={item} className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group">
                             <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-zinc-400" />
                             <span className="text-[9px] font-bold uppercase">{item}</span>
                          </div>
                        ))}
                     </div>
                     <div className="mt-auto bg-black/40 rounded-xl p-3 border border-white/5">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase block mb-1">Peer Cloud</span>
                        <div className="flex items-center gap-1">
                           <TrendingUp className="w-3 h-3 text-emerald-400" />
                           <span className="text-[9px] font-black text-white">94% LOAD</span>
                        </div>
                     </div>
                  </div>

                  {/* 2. LIVE APPMOCKUP SCROLL AREA */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-5 lg:space-y-6 scrollbar-thin text-left select-none relative z-10 pb-20">
                    
                    {/* STORY SECTION INSIDE THE FLIGHT SCREEN */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between pr-2">
                        <p className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-widest pl-1 font-black leading-none">PEER STORIES</p>
                        <Plus className="w-3 h-3 text-zinc-500 cursor-pointer" />
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
                        {STORIES.map(story => (
                          <div 
                            key={story.id}
                            onClick={() => {
                              triggerHapticFeedback(440, "sine", 0.05);
                              setActiveStory(story);
                            }}
                            className="flex flex-col items-center gap-1.5 cursor-pointer group"
                          >
                            <div className={`w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-tr ${story.isMe ? 'from-zinc-800 to-zinc-900 border-zinc-700' : 'from-pink-500 via-indigo-500 to-emerald-500'} p-[2px] transition-transform group-hover:scale-105`} >
                              <div className="w-full h-full rounded-2xl bg-zinc-950 flex items-center justify-center text-base border border-black overflow-hidden relative">
                                {story.avatar}
                                {story.isMe && (
                                   <div className="absolute bottom-1 right-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-black flex items-center justify-center">
                                      <Plus className="w-2 h-2 text-white" />
                                   </div>
                                )}
                              </div>
                            </div>
                            <span className="text-[8.5px] font-bold text-zinc-400 leading-none truncate w-12 text-center group-hover:text-white transition-colors">{story.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FEED TAB CONTROLLER (Internal) */}
                    <div className="flex bg-black/60 backdrop-blur-md rounded-xl p-1 border border-white/5 gap-1 select-none text-[9px] sticky top-0 z-20">
                      {["For You", "Campus", "Following", "Archived"].map(tab => (
                        <button 
                          key={tab}
                          onClick={() => {
                            triggerHapticFeedback(400);
                            setActiveDeviceTab(tab);
                          }}
                          className={`flex-1 text-center py-2 rounded-lg font-black uppercase tracking-wider transition-all cursor-pointer ${activeDeviceTab === tab ? 'bg-indigo-500 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* MOCKUP CONTENT DISPLAY VALUE MAPPED FROM SIDEBAR */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeAdSection}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 md:space-y-6"
                      >
                        {activeAdSection === "feed" && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Post 1 (by Tolu_Ade) */}
                            <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-4 space-y-3 relative hover:border-white/10 transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-xs font-black text-white border border-white/10 uppercase shadow-lg shadow-indigo-900/40">T</div>
                                  <div className="leading-none">
                                    <span className="text-[11px] font-black text-white block">Tolu_Ade</span>
                                    <span className="text-[8px] text-zinc-500 font-mono font-bold uppercase">Comp Sci • UNILAG</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                  <span className="text-[8px] text-emerald-400 font-mono font-black">LIVE</span>
                                </div>
                              </div>

                              <p className="text-[10.5px] text-zinc-300 leading-relaxed font-medium">
                                🚀 Pan-African Hackathon win! Sessional student dev cohort pushing all-nighters. Check our open-source node!
                              </p>

                              <div className="h-28 lg:h-32 bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center border border-white/5">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                                <div className="text-center z-10 px-4">
                                  <div className="bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full mb-1 inline-block">
                                     <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest font-black">PLATFORM DEMO</span>
                                  </div>
                                  <p className="text-[12px] font-black italic text-white uppercase font-display leading-tight tracking-tighter">LAGOS ACCELERATOR</p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-1">
                                <button 
                                  onClick={handleLike}
                                  className={`flex items-center gap-1.5 transition-colors cursor-pointer text-[10px] ${hasLiked ? 'text-rose-500 font-black' : 'text-zinc-500 hover:text-white font-bold'}`}
                                >
                                  <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                                  <span>{likeCount}</span>
                                </button>
                                <div className="flex gap-4 text-zinc-500 font-mono text-[9px] font-black">
                                  <span className="hover:text-white cursor-pointer transition-colors uppercase">42 Chats</span>
                                  <span className="hover:text-white cursor-pointer transition-colors uppercase">18 Buzz</span>
                                </div>
                              </div>
                            </div>

                            {/* Post 2: DeboCodes 305L UI Resource Pack */}
                            <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-4 space-y-4 hover:border-white/10 transition-colors hidden lg:block">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-xs font-black text-white border border-white/10 uppercase shadow-lg shadow-purple-900/40">D</div>
                                  <div className="leading-none">
                                    <span className="text-[11px] font-black text-white block">DeboCodes</span>
                                    <span className="text-[8px] text-zinc-500 font-mono font-bold uppercase">UI Builder • OAU</span>
                                  </div>
                                </div>
                                <span className="text-[8px] text-[#A855F7] font-mono tracking-widest font-black uppercase bg-[#A855F7]/10 px-2 py-0.5 rounded border border-[#A855F7]/20">GOLD NODE</span>
                              </div>

                              <p className="text-[10.5px] text-zinc-300 leading-relaxed font-medium">
                                Sharing the definitive 2026 UI/UX Resources Pack for sessional projects. Inside: wireframe kit, premium styles, and components.
                              </p>

                              <div className="bg-black/60 border border-[#A855F7]/20 rounded-xl p-3 flex items-center justify-between">
                                <div className="space-y-1">
                                  <span className="text-[9.5px] font-black text-white block truncate w-32">Design_System_Node_V4.fig</span>
                                  <span className="text-[8px] font-mono text-zinc-500 block font-black">SIZE: 14.8 MB • PEER VERIFIED</span>
                                </div>
                                <button 
                                  onClick={handleDownloadResource}
                                  className={`px-3 py-1.5 rounded-lg text-[8.5px] font-black uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                                    downloadStatus === "idle" ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40" :
                                    downloadStatus === "loading" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                                    "bg-emerald-500 text-black shadow-lg shadow-emerald-900/40"
                                  }`}
                                >
                                  {downloadStatus === "idle" && <Download className="w-3 h-3" />}
                                  {downloadStatus === "loading" ? `SYNCING ${downloadProgress}%` : downloadStatus === "complete" ? "READY ✓" : "FETCH"}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeAdSection === "academic" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="bg-gradient-to-br from-indigo-950/40 to-slate-950 p-5 rounded-2xl border border-white/5 space-y-3">
                               <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-widest font-black">STUDY MATRIX DIRECTORY</span>
                               <h4 className="text-sm font-black text-white uppercase leading-tight font-display tracking-tight">Academic Resource Console</h4>
                               <p className="text-[10.5px] text-zinc-500 leading-relaxed font-medium">
                                 Access real historical exam papers, past test formulas, and collaborative voice revision slots uploaded by elite academic tutors.
                               </p>
                               <div className="pt-2">
                                  <div className="p-3 bg-black/60 border border-white/5 rounded-xl flex justify-between items-center group cursor-pointer hover:border-indigo-500/30 transition-colors">
                                    <div className="flex items-center gap-3">
                                       <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                          <ShieldCheck className="w-4 h-4" />
                                       </div>
                                       <div>
                                          <span className="text-[10px] font-black text-white uppercase block">CHM 101 Formulas</span>
                                          <span className="text-[8px] text-zinc-500 font-mono font-bold uppercase">Vetted by 12 Nodes</span>
                                       </div>
                                    </div>
                                    <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                                  </div>
                               </div>
                             </div>
                             
                             <div className="bg-slate-900/30 p-5 rounded-2xl border border-white/5 space-y-4 hidden lg:block">
                                <div className="flex items-center justify-between">
                                   <span className="text-[8.5px] font-black text-zinc-500 uppercase font-mono">Live Study Sessions</span>
                                   <div className="px-2 py-0.5 bg-rose-500/10 rounded-full border border-rose-500/20">
                                      <span className="text-[8px] text-rose-400 font-black">8 ACTIVE</span>
                                   </div>
                                </div>
                                <div className="space-y-2">
                                   {[1, 2].map(i => (
                                     <div key={i} className="flex items-center gap-3 p-2 bg-black/40 rounded-xl border border-white/5">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
                                        <div className="flex-1 space-y-1">
                                           <div className="h-2 w-20 bg-zinc-800 rounded" />
                                           <div className="h-1.5 w-12 bg-zinc-800/50 rounded" />
                                        </div>
                                        <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center cursor-pointer">
                                           <Volume2 className="w-3 h-3 text-zinc-600" />
                                        </div>
                                     </div>
                                   ))}
                                </div>
                             </div>
                          </div>
                        )}

                        {activeAdSection === "communities" && (
                          <div className="bg-[#121829]/90 backdrop-blur-xl border border-white/5 p-5 rounded-2xl space-y-4">
                            <div className="flex justify-between items-center">
                              <div className="space-y-1">
                                <span className="text-[8px] font-mono text-rose-400 uppercase tracking-widest font-black italic">AFFINITY CIRCLES</span>
                                <h4 className="text-sm font-black text-white uppercase font-display leading-none tracking-tighter">Choose Your Sessional Guild</h4>
                              </div>
                              <Plus className="w-5 h-5 text-rose-400 cursor-pointer hover:rotate-90 transition-transform" />
                            </div>
                            <p className="text-[10.5px] text-zinc-500 leading-relaxed font-medium max-w-lg">
                              Join over 80 active student organizations, local tech guilds, departmental boards, and athletic cliques representing the peer community nodes.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-[10px] font-black uppercase font-mono">
                              <button className="p-3 bg-slate-950 rounded-xl border border-white/5 hover:border-rose-500/40 hover:text-rose-400 transition-all cursor-pointer">GDSC HUB</button>
                              <button className="p-3 bg-slate-950 rounded-xl border border-white/5 hover:border-rose-500/40 hover:text-rose-400 transition-all cursor-pointer">Law Society</button>
                              <button className="p-3 bg-slate-950 rounded-xl border border-white/5 hover:border-rose-500/40 hover:text-rose-400 transition-all cursor-pointer">Akoka Tech</button>
                              <button className="p-3 bg-slate-900 border-indigo-500/40 border rounded-xl text-indigo-400 animate-pulse cursor-pointer">Moremi Hall</button>
                            </div>
                          </div>
                        )}

                        {activeAdSection === "chats" && (
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                            {/* Directory Pane */}
                            <div className="lg:col-span-1 bg-black/40 rounded-2xl border border-white/5 p-3 space-y-3 hidden lg:block">
                               <div className="flex items-center gap-2 px-1">
                                  <Search className="w-3.5 h-3.5 text-zinc-600" />
                                  <span className="text-[9px] font-black text-zinc-500 uppercase font-mono">Search Peers...</span>
                               </div>
                               <div className="space-y-2">
                                  {["zainab_chem", "femi_dev", "tolu_arts"].map(p => (
                                    <div key={p} className={`flex items-center gap-2 p-2 rounded-xl transition-all cursor-pointer ${p === 'zainab_chem' ? 'bg-indigo-500/10 border border-indigo-500/20' : 'hover:bg-white/5 border border-transparent'}`}>
                                       <div className="w-7 h-7 rounded-lg bg-zinc-800" />
                                       <div className="leading-none flex-1 overflow-hidden">
                                          <span className="text-[10px] font-black text-white block truncate">@{p}</span>
                                          <span className="text-[7.5px] font-mono text-zinc-500 uppercase tracking-widest font-black leading-none">Online</span>
                                       </div>
                                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                  ))}
                               </div>
                            </div>

                            {/* Chat Thread */}
                            <div className="lg:col-span-2 flex flex-col h-full bg-[#111827]/40 rounded-2xl border border-white/5 overflow-hidden min-h-[300px]">
                              <div className="bg-[#0F172A] p-3 border-b border-white/5 flex items-center justify-between">
                                 <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                    <span className="text-[10px] font-black text-white uppercase italic tracking-wider">SECURE CHANNEL: @zainab_chem</span>
                                 </div>
                                 <Lock className="w-3.5 h-3.5 text-zinc-600" />
                              </div>
                              <div className="flex-1 p-4 space-y-4">
                                <div className="p-3 bg-zinc-900/80 rounded-2xl rounded-tl-none text-[10.5px] max-w-[85%] text-left border border-white/5 font-medium leading-relaxed">
                                  <span className="text-[8px] text-emerald-400 font-black block mb-1 uppercase tracking-widest">zainab_chem</span>
                                  Anyone got the formula notes for atomic weights study session tonight at Glass House?
                                </div>
                                <div className="p-3 bg-indigo-600/90 text-white rounded-2xl rounded-tr-none text-[10.5px] max-w-[85%] ml-auto text-right shadow-lg shadow-indigo-900/20 leading-relaxed">
                                  <span className="text-[8px] text-zinc-200 block mb-1 uppercase tracking-widest font-black italic">You</span>
                                  Just shared the revision sheet link inside the Academic Hub, Zainab! Checking it now 🧬
                                </div>
                              </div>
                              <div className="p-3 border-t border-white/5 flex gap-2">
                                 <div className="flex-1 bg-black/40 rounded-xl px-4 py-2 text-[10px] font-mono text-zinc-600 border border-white/5 flex items-center">
                                    Type securely...
                                 </div>
                                 <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg">
                                    <Send className="w-4 h-4" />
                                 </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeAdSection === "opportunities" && (
                          <div className="bg-[#121829]/90 border border-white/5 p-5 rounded-2xl space-y-4">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <span className="text-[8px] font-mono text-yellow-500 uppercase tracking-widest font-black italic underline decoration-yellow-500/30">CAREER INTEGRATIONS</span>
                                <h4 className="text-sm font-black text-white uppercase font-display leading-none tracking-tight">Launch Your Sessional Pipeline</h4>
                              </div>
                              <div className="p-1 px-3 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                                 <span className="text-[8px] text-yellow-500 font-black">LOCALIZED GIGS</span>
                              </div>
                            </div>
                            <p className="text-[10.5px] text-zinc-500 leading-relaxed font-medium">
                              Unfiltered access to vetted student internships, technical sponsorships, and localized sessional gigs designed strictly around your studies.
                            </p>
                            <div className="p-3 bg-black/60 rounded-xl border border-yellow-500/25 text-xs flex justify-between items-center group transition-all hover:bg-black/80">
                              <div className="flex items-center gap-3">
                                 <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/10">
                                    <CheckCircle className="w-4.5 h-4.5" />
                                 </div>
                                 <div>
                                   <span className="font-black text-white uppercase block text-[11px]">Flutterwave Sessional Intern</span>
                                   <span className="text-[8.5px] font-mono text-zinc-500 block font-black">STIPEND: ₦180,000/Mo • REMOTE READY</span>
                                 </div>
                              </div>
                              <button className="px-4 py-2 bg-yellow-500 text-black text-[9px] font-black uppercase rounded-lg hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-yellow-900/20">APPLY NOW</button>
                            </div>
                          </div>
                        )}

                        {activeAdSection === "events" && (
                          <div className="bg-[#121829] border border-white/5 p-5 rounded-2xl space-y-4">
                            <div className="flex justify-between items-center">
                              <div className="space-y-1">
                                <span className="text-[8px] font-mono text-pink-500 uppercase tracking-widest font-black">SESSIONAL CALENDAR</span>
                                <h4 className="text-sm font-black text-white uppercase font-display leading-none tracking-tight">Matriculation & Week Events</h4>
                              </div>
                              <Calendar className="w-5 h-5 text-pink-500" />
                            </div>
                            <p className="text-[10.5px] text-zinc-500 leading-relaxed font-medium">
                              Never miss out on student week schedules, gaming tournaments, sessional hackathons, or hostel elections across campus.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                               {[
                                 { name: "OAU HACK", date: "FEB 12", color: "border-indigo-500/30" },
                                 { name: "UI DINNER", date: "MAR 04", color: "border-pink-500/30" },
                                 { name: "LAUTECH PR", date: "MAR 21", color: "border-emerald-500/30" }
                               ].map(ev => (
                                 <div key={ev.name} className={`p-2.5 rounded-xl border bg-black/40 ${ev.color} text-center space-y-1`}>
                                    <span className="text-[9.5px] font-black text-white block uppercase">{ev.name}</span>
                                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-black">{ev.date}</span>
                                 </div>
                               ))}
                            </div>
                          </div>
                        )}

                        {activeAdSection === "marketplace" && (
                          <div className="bg-[#121829]/95 backdrop-blur-xl border border-white/5 p-5 rounded-2xl space-y-4 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
                            <div className="flex justify-between items-start relative z-10">
                              <div className="space-y-1">
                                <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest font-black italic">TRUST ESCROW COMMERCE</span>
                                <h4 className="text-sm font-black text-white uppercase font-display leading-none tracking-tight">Peer-to-Peer Marketplace</h4>
                              </div>
                              <ShoppingBag className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl italic">
                              <p className="text-[10px] text-emerald-400/80 leading-relaxed font-bold">
                                "Funds are securely locked inside sessional escrow contract nodes until you confirm the asset delivery. Peer safety as a protocol."
                              </p>
                            </div>
                            <div className="space-y-2 relative z-10">
                              {[
                                { name: "MacBook Pro M1 (Nigeria-Used)", price: "₦650,000", status: "VERIFIED" },
                                { name: "Hostel Space (Akoka - Swap)", price: "₦85,000", status: "NEW" }
                              ].map(item => (
                                <div key={item.name} className="p-3 bg-black/40 border border-white/5 rounded-xl flex justify-between items-center group transition-colors hover:border-emerald-500/30">
                                  <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-lg bg-zinc-800" />
                                     <div>
                                        <span className="text-[10px] font-black text-white uppercase block">{item.name}</span>
                                        <span className="text-[8.5px] font-mono text-emerald-400/60 font-black">{item.status} NODE</span>
                                     </div>
                                  </div>
                                  <span className="text-[11px] font-mono font-black text-emerald-400 italic">{item.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeAdSection === "media" && (
                          <div className="bg-gradient-to-br from-purple-950/20 to-[#1E1B4B]/30 p-5 rounded-2xl border border-white/5 space-y-4">
                            <div className="flex justify-between items-center">
                              <div className="space-y-1">
                                <span className="text-[8px] font-mono text-purple-400 uppercase tracking-widest font-black underline decoration-purple-500/40">LOW BANDWIDTH MEDIA</span>
                                <h4 className="text-sm font-black text-white uppercase font-display leading-none tracking-tight italic">Nodal CDN Streams</h4>
                              </div>
                              <Play className="w-5 h-5 text-purple-400 fill-purple-400/20" />
                            </div>
                            <p className="text-[10.5px] text-zinc-500 leading-relaxed font-medium">
                              Custom media video formats transcoded to play seamlessly on campus cellular repeaters, reducing student data expenditures by 60%.
                            </p>
                            <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/5 shadow-2xl flex items-center justify-center group cursor-pointer">
                               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                               <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform">
                                  <Play className="w-5 h-5 fill-white ml-1" />
                               </div>
                               <div className="absolute bottom-3 left-3 text-left">
                                  <span className="text-[9px] font-black text-white uppercase block leading-none">Sessional VLOG #12</span>
                                  <span className="text-[8px] text-zinc-400 font-mono font-bold uppercase tracking-widest mt-1 block">3:42 • Peer-Cast 048</span>
                               </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                  </div>
                </div>

                {/* 3. BOTTOM TAB NAV INSIDE APPMOCKUP SCREEN (Mobile Only, or hidden in Laptop view) */}
                <div className="lg:hidden bg-[#0F172A] border-t border-white/5 h-14 flex items-center justify-around text-zinc-500 px-2 select-none relative z-30 text-[9px] shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
                  <div className="flex flex-col items-center cursor-pointer hover:text-white transition-colors">
                    <span className="text-lg">🏠</span>
                    <span className="scale-75 origin-top mt-0.5 font-bold uppercase">Feed</span>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer hover:text-white transition-colors">
                    <span className="text-lg">👥</span>
                    <span className="scale-75 origin-top mt-0.5 font-bold uppercase">Gigs</span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-600/30 cursor-pointer hover:scale-110 active:scale-95 transition-all">
                    +
                  </div>
                  <div className="flex flex-col items-center cursor-pointer hover:text-white transition-colors">
                    <span className="text-lg">💬</span>
                    <span className="scale-75 origin-top mt-0.5 font-bold uppercase">Chat</span>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer hover:text-white transition-colors">
                    <span className="text-lg">👤</span>
                    <span className="scale-75 origin-top mt-0.5 font-bold uppercase">Profile</span>
                  </div>
                </div>

              </div>
            </div>

            {/* LAPTOP KEYBOARD/WELL DETAIL (More robust for PC view) */}
            <div className={`h-8 w-[104%] -ml-[2%] bg-gradient-to-b from-[#1E293B] to-[#0F172A] border-x-8 border-zinc-800 rounded-b-[2.5rem] relative flex items-center justify-center shadow-[0_25px_50px_-5px_rgba(0,0,0,0.8)] transition-all duration-750 ${premiumActivated ? 'border-amber-500' : 'border-zinc-800'}`}>
              <div className="absolute top-0 inset-x-0 h-[3px] bg-white/5" />
              <div className="w-32 h-2 bg-black rounded-full border border-white/10 shadow-inner relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              </div>
              {/* Subtle light bar for high-end feel */}
              <div className="absolute -bottom-1 w-[70%] h-0.5 bg-indigo-500/30 blur-md" />
            </div>

            {/* UNIFIED LAUNCH CALL-TO-ACTION BILLBOARD BUTTON */}
            <div className="pt-2 text-center space-y-4">
              <div className="flex justify-center items-center gap-4">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-indigo-500/50" />
                <button 
                  onClick={() => {
                    triggerHapticFeedback(880, "sine", 0.3);
                    alert("Handshake complete! Redirecting to the primary UniVerse Nodal Hub...");
                  }}
                  className="px-12 py-4.5 bg-gradient-to-r from-indigo-700 via-indigo-500 to-pink-500 hover:from-indigo-500 hover:to-pink-600 rounded-2xl text-xs font-black uppercase tracking-[0.25em] text-white shadow-[0_15px_30px_-5px_rgba(79,70,229,0.4)] hover:shadow-pink-500/20 border border-white/10 flex items-center gap-3 transition-all hover:scale-105 active:scale-95 cursor-pointer relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-in-out" />
                  <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
                  Launch Secure Hub
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-indigo-500/50" />
              </div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block leading-none font-bold italic">
                One Login. <span className="text-indigo-400">Unlimited Campus Nodes.</span>
              </p>
            </div>

          </div>

          {/* C. RIGHT COLUMN: PREMIER AD SYSTEM & SPONSORS BILLING */}
          <div className="space-y-6 lg:col-span-3 order-3">
            
            {/* TIRED OF ADS PANEL (FUTURISTIC BOX) */}
            <div className={`relative rounded-3xl p-6 border transition-all duration-500 flex flex-col justify-between h-auto lg:min-h-[580px] ${
              premiumActivated 
                ? 'bg-gradient-to-b from-amber-500/20 to-black border-amber-400/50 shadow-amber-500/5' 
                : 'bg-[#0F172A]/70 backdrop-blur-md border-white/10 shadow-2xl'
            }`}>
              {/* Optional absolute top corner glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono text-pink-500 uppercase tracking-widest font-bold">Premium Sessional Sponsor</span>
                    <h3 className="text-base font-black text-white uppercase italic tracking-tight font-display">Tired of Ads?</h3>
                  </div>
                  <div 
                    onClick={() => { triggerHapticFeedback(300); alert("Universe Premium offers seamless university hub access."); }}
                    className="p-1 text-zinc-500 hover:text-white cursor-pointer select-none text-xs"
                  >
                    ✕
                  </div>
                </div>

                <div className="bg-black/50 rounded-2xl p-4 border border-white/5 space-y-2 relative overflow-hidden">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Cycle Refresh System</span>
                  </div>
                  <h4 className="text-md font-black text-[#EC4899] font-mono tracking-tight leading-none uppercase italic">
                    {premiumActivated ? 'LIFETIME FREE' : 'APPEARS EVERY 8MIN'}
                  </h4>
                  <p className="text-[9.5px] text-zinc-500 leading-normal font-medium">
                    {premiumActivated 
                      ? "Congratulations! You have obtained full, unrestricted access to all Premium Student Tools of the UniVerse network."
                      : "Sessional adverts fund low-latency regional server clusters. Support students by subscribing or enabling free ads."
                    }
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Cycle Counter</span>
                    <span className="text-xs font-black text-emerald-400 font-mono italic">
                      {premiumActivated ? 'UNLOCKED ⭐' : formatTimer(adTimerSecs)}
                    </span>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-3.5 pt-1">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block leading-none font-bold">Premium Tier Benefits</span>
                  {[
                    { label: "Ad-Free Sessional Navigation", val: "Continuous learning without intervals." },
                    { label: "Enhanced Profile Customization", val: "Obtain gold verified creators badges." },
                    { label: "Ultimate Academic Study Tools", val: "Priority access to past university papers." },
                    { label: "Low-Bandwidth CDN Nodes", val: "Save 60% cellular data on student chats." },
                    { label: "Verified Peer Verification Badge", val: "Boost trust scores on Marketplace Gigs." }
                  ].map((ben, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-left">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-[10px] font-bold text-white block uppercase leading-none">{ben.label}</span>
                        <p className="text-[9px] text-zinc-500 mt-1 leading-none">{ben.val}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* UPGRADE INTERACTIVE BUTTON */}
              <div className="pt-6">
                {premiumActivated ? (
                  <div className="w-full text-center p-3.5 bg-emerald-500 text-black font-black text-[10.5px] uppercase rounded-2xl shadow-lg border border-transparent">
                    ✓ UniVerse Premium Active
                  </div>
                ) : (
                  <button 
                    onClick={handleUpgradePremium}
                    className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:scale-105 active:scale-95 transition-all text-black font-black text-[10.5px] uppercase py-3.5 rounded-2xl cursor-pointer shadow-xl shadow-amber-500/10 tracking-widest border border-white/10 flex items-center justify-center gap-1.5"
                  >
                    <Star className="w-4 h-4 fill-black text-black" />
                    Subscribe to UniVerse Premium
                  </button>
                )}
                
                <span className="text-[7.5px] font-mono text-zinc-600 block text-center uppercase tracking-widest mt-2">
                  SECURED SSL TRANSACTION GATEWAY
                </span>
              </div>
            </div>

            {/* ADVERT AD APPEARS NOTICE */}
            <div className="bg-[#121829] border border-white/5 rounded-2xl p-4 text-center text-[9px] font-mono text-zinc-500 uppercase leading-relaxed font-semibold">
              ⚠️ PREVENT EXPOSURE DISRUPTIONS BY REGISTERING AS A VERIFIED PEER STUDENT VENDOR FOR PLATFORM-WIDE COMMERCE GAINS.
            </div>

          </div>

        </div>

        {/* =========================================================
            4. SOCIAL MEDIA PIPELINE CONNECTIONS (CONNECTED CHANNELS)
            ========================================================= */}
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-[9.5px] font-mono text-indigo-400 uppercase tracking-widest block font-black">
              CONNECTED PEER PIPELINES
            </span>
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight font-display mt-1">
              Follow UniVerse Everywhere
            </h3>
            <p className="text-[10px] text-zinc-500 max-w-lg mx-auto leading-relaxed mt-1">
              Link up with verified sessional communication channels and stay updated on the latest software versions. Join now!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { id: "facebook", label: "Facebook", username: "@UniVerseOfficial", icon: Facebook, color: "hover:border-blue-500 hover:shadow-blue-500/5 text-blue-400" },
              { id: "whatsapp", label: "WhatsApp", username: "@UniVerseChannel", icon: MessageCircle, color: "hover:border-emerald-500 hover:shadow-emerald-505/5 text-emerald-400", isGroup: true },
              { id: "twitter", label: "Twitter / X", username: "@UniVerseOfficial", icon: Twitter, color: "hover:border-white hover:shadow-white/5 text-white" },
              { id: "instagram", label: "Instagram", username: "@universe.official", icon: Instagram, color: "hover:border-pink-500 hover:shadow-pink-500/5 text-pink-400" },
              { id: "tiktok", label: "TikTok", username: "@universe.official", icon: Cpu, color: "hover:border-teal-400 hover:shadow-teal-400/5 text-teal-400" }
            ].map(social => {
              const Icon = social.icon;
              const connected = (socialConnection as any)[social.id];
              return (
                <div 
                  key={social.id}
                  className={`bg-[#111827]/40 border rounded-2xl p-4 text-center transition-all duration-300 relative group flex flex-col justify-between h-36 ${
                    connected 
                      ? 'border-emerald-500 shadow-lg shadow-emerald-500/10' 
                      : `border-white/5 ${social.color}`
                  }`}
                >
                  <div className="space-y-1">
                    <div className="mx-auto w-9 h-9 bg-slate-950 rounded-xl border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110 mb-2">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-white block uppercase leading-none">{social.label}</span>
                    <span className="text-[8.5px] font-mono text-zinc-500 block leading-tight">{social.username}</span>
                  </div>

                  <button 
                    onClick={() => handleSocialClick(social.id as any)}
                    className={`w-full py-1.5 rounded-lg text-[8.5px] font-black uppercase tracking-wider cursor-pointer border transition-colors ${
                      connected 
                        ? 'bg-emerald-500 text-black border-transparent' 
                        : 'bg-white/5 text-zinc-400 border-white/5 group-hover:bg-white/10'
                    }`}
                  >
                    {connected ? "CONNECTED ✓" : (social.isGroup ? "JOIN CHANNEL" : "FOLLOW US")}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            5. QR CODE GATEWAY & MORE FEATURES INFO (BOTTOM ROW)
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          {/* QR Code scanning panel */}
          <div className="md:col-span-1 bg-slate-950/60 border border-white/10 p-6 rounded-3xl flex flex-col items-center text-center relative overflow-hidden min-h-[260px] justify-between">
            {/* Holographic LASER Scanner line mock */}
            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent top-1/4 select-none pointer-events-none animate-bounce" />
            
            <div className="space-y-1">
              <span className="text-[8.5px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">QR SCANNING NODAL GATEWAY</span>
              <h4 className="text-xs font-black text-white uppercase font-display leading-tight">Access on Mobile Devices</h4>
            </div>

            <div className="p-3 bg-white rounded-2xl relative w-24 h-24 flex items-center justify-center">
              <QrCode className="w-20 h-20 text-black" strokeWidth={1.5} />
            </div>

            <div className="leading-none mt-1">
              <span className="text-[8.5px] text-zinc-500 block font-mono">SCAN PACKET WITH MOBILE CAMERA</span>
              <span className="text-[9.5px] font-black uppercase tracking-wider text-cyan-400 block mt-1 font-mono">NODE CONNECTS IMMEDIATE</span>
            </div>
          </div>

          {/* Sessional info blocks */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Card 1: WEB BASED */}
            <div className="bg-[#111827]/40 border border-white/5 p-5 rounded-3xl flex flex-col justify-between">
              <div className="space-y-2">
                <div className="p-2.5 bg-slate-950 border border-white/10 rounded-xl w-10 h-10 flex items-center justify-center text-blue-400">
                  <Laptop className="w-5 h-5" />
                </div>
                <h5 className="text-[11px] font-black uppercase text-white leading-none font-display">60Hz Web Based</h5>
                <p className="text-[9.5px] text-zinc-500 leading-relaxed">
                  Zero memory footprints. No software compilation files or device updates needed. Access directly from local browser tabs.
                </p>
              </div>
              <span className="text-[8px] font-mono text-zinc-400 uppercase block font-bold">NODE PROTOCOL NOMINAL ✓</span>
            </div>

            {/* Card 2: ANY DEVICE */}
            <div className="bg-[#111827]/40 border border-white/5 p-5 rounded-3xl flex flex-col justify-between">
              <div className="space-y-2">
                <div className="p-2.5 bg-slate-950 border border-white/10 rounded-xl w-10 h-10 flex items-center justify-center text-emerald-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h5 className="text-[11px] font-black uppercase text-white leading-none font-display">Multi-Device Ready</h5>
                <p className="text-[9.5px] text-zinc-500 leading-relaxed">
                  Responsive design matrix adapts layout cleanly across laptops, tablets, or iOS/Android web view formats concurrently.
                </p>
              </div>
              <span className="text-[8px] font-mono text-zinc-400 uppercase block font-bold">CROSS INTEROP NOMINAL ✓</span>
            </div>

            {/* Card 3: MADE BY STUDENTS FOR STUDENTS */}
            <div className="bg-[#111827]/40 border border-white/5 p-5 rounded-3xl flex flex-col justify-between">
              <div className="space-y-2">
                <div className="p-2.5 bg-slate-950 border border-white/10 rounded-xl w-10 h-10 flex items-center justify-center text-pink-500">
                  <Users className="w-5 h-5" />
                </div>
                <h5 className="text-[11px] font-black uppercase text-white leading-none font-display">Built For Students</h5>
                <p className="text-[9.5px] text-zinc-500 leading-relaxed">
                  Authored by local sessional students aiming to simplify campus learning, gig commerce, and connection nodes.
                </p>
              </div>
              <span className="text-[8px] font-mono text-zinc-400 uppercase block font-bold">COMMUNE ACTIVE ✓</span>
            </div>

          </div>
        </div>

        {/* =========================================================
            6. BOTTOM SIGN-OFF FOOTER ("Built for students",drawn heart)
            ========================================================= */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500 text-[10px] font-mono">
          <div className="space-y-1 text-left">
            <span className="text-white capitalize block font-bold text-xs uppercase italic tracking-wider">
              Be Part of Something <span className="text-pink-500 font-extrabold">BIGGER.</span>
            </span>
            <p className="text-zinc-500 text-[10px]">
              Every single node operates directly under joint administrative student control structures.
            </p>
          </div>

          <div className="flex bg-[#0F172A] border border-white/5 px-6 py-2.5 rounded-full items-center gap-2">
            <span className="text-rose-400 font-black animate-pulse">❤</span>
            <span>Made with precision code in Nigeria for OAU, UNILAG & UI.</span>
          </div>

          <div className="text-right">
             <span>© 2026 UniVerse. Infinite Sessional Connections.</span>
             <span className="block text-[8px] text-zinc-600 font-black mt-1 uppercase">AUTH CODE: BLB-64-AD-VERIFIED</span>
          </div>
        </div>

      </div>

      {/* --- FLOATING MOCK STORY FULL SCREEN CAROUSEL (IF ACTIVE) --- */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fadeIn">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-zinc-900 to-black border border-white/10 rounded-3xl p-6 space-y-6 overflow-hidden animate-scaleIn">
              {/* Story progress bars */}
              <div className="flex gap-1 h-1">
                <div className="flex-1 bg-emerald-500 rounded-full" />
                <div className="flex-1 bg-white/10 rounded-full" />
                <div className="flex-1 bg-white/10 rounded-full" />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-sm">
                    {activeStory.avatar}
                  </div>
                  <div>
                    <span className="text-xs font-black text-white block">@{activeStory.name}</span>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase leading-none mt-0.5">Sessional Storyteller</span>
                  </div>
                </div>

                <button 
                  onClick={() => { triggerHapticFeedback(300); setActiveStory(null); }}
                  className="p-1 text-zinc-500 hover:text-white border border-white/10 rounded-full bg-white/5 cursor-pointer text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Story visual media simulation with cool vibrant gradient block */}
              <div className={`h-80 bg-gradient-to-tr ${activeStory.color || "from-zinc-800 to-zinc-900"} rounded-2xl p-6 flex items-center justify-center text-center relative overflow-hidden shadow-inner border border-white/10`}>
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                <p className="text-sm font-extrabold text-white uppercase italic leading-tight tracking-tight max-w-xs z-10 leading-relaxed font-display p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5">
                  "{activeStory.media || "Just sharing some sessional student codes on the hub!"}"
                </p>
              </div>

              <button 
                onClick={() => { triggerHapticFeedback(600); setActiveStory(null); }}
                className="w-full py-3 bg-white text-black text-xs font-black uppercase rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
              >
                Close Story Bubble
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* If isStatic is active, render an absolutely-positioned transparent full overlay over the flyer to block clicks, but keep the visual graphic fully visible as a pristine poster! */}
      {isStatic && (
        <div className="absolute inset-0 z-[100] bg-transparent cursor-default pointer-events-auto select-none">
          {/* Subtle glass badge overlay to inform users */}
          <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-[#EC4899] uppercase font-black">
              Poster Display Mode (Non-interactive)
            </span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}
