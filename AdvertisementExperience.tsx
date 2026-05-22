import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Sparkles, 
  Flame, 
  Globe, 
  Cpu, 
  MessageSquare, 
  Share2, 
  Rocket, 
  ArrowRight,
  Monitor,
  Smartphone,
  CheckCircle,
  Instagram,
  Twitter,
  Facebook,
  Shield
} from "lucide-react";

export default function AdvertisementExperience({ onLaunchApp }: { onLaunchApp: () => void }) {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHoveringLaunch, setIsHoveringLaunch] = useState(false);

  const features = [
    { title: "Campus Feed", desc: "One Campus. Infinite Connections.", icon: Flame, color: "text-rose-500", bg: "bg-rose-500/10" },
    { title: "Academic Hub", desc: "Smart AI tools for the African Student.", icon: Cpu, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "Gigs & GIS", desc: "Build wealth on campus securely.", icon: ZapIcon, color: "text-indigo-400", bg: "bg-indigo-500/10" },
    { title: "Communities", desc: "Find your people, build your world.", icon: Globe, color: "text-sky-400", bg: "bg-sky-500/10" },
  ];

  // Helper for Zap since I don't want to use standard zap if it looks too simple
  function ZapIcon(props: any) { return <Zap {...props} />; }

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center font-display">
      {/* Background Cinematic Lighting */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
      
      <div className="relative w-full max-w-5xl h-full flex flex-col md:flex-row items-center justify-between p-6 md:p-12 gap-12 overflow-y-auto scrollbar-none">
        
        {/* Left Side: Copy & Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 space-y-8 text-center md:text-left z-20"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin-slow" />
            <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Billion Dollar Student Tech</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none italic uppercase">
              Uni<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-500 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">Verse</span>
            </h1>
            <p className="text-lg md:text-2xl font-bold text-zinc-400 tracking-tight leading-snug">
              Your Campus. Your People. <br className="hidden md:block" />
              <span className="text-white underline decoration-emerald-500/50 underline-offset-8">Your World.</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto md:mx-0">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div 
                  key={i}
                  animate={{ scale: activeFeature === i ? 1.05 : 1, opacity: activeFeature === i ? 1 : 0.4 }}
                  className={`p-4 rounded-2xl border ${activeFeature === i ? "border-white/20 bg-white/5" : "border-white/5"} transition-all duration-500`}
                >
                  <div className={`w-10 h-10 ${f.bg} flex items-center justify-center rounded-xl mb-3`}>
                    <Icon className={`w-5 h-5 ${f.color}`} />
                  </div>
                  <p className="text-[11px] font-black text-white uppercase tracking-widest">{f.title}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
            <button 
              onMouseEnter={() => setIsHoveringLaunch(true)}
              onMouseLeave={() => setIsHoveringLaunch(false)}
              onClick={onLaunchApp}
              className="relative group bg-emerald-500 hover:bg-emerald-400 text-black px-10 py-5 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center gap-3 overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.3)] cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              Launch Web App
              <Rocket className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white p-1 rounded-xl shadow-2xl border-4 border-black ring-1 ring-white/10 group cursor-help">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://uni-verse.app" alt="QR" className="w-full h-full grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-white uppercase tracking-widest">Accessible Anywhere</p>
                <p className="text-[9px] text-zinc-500 font-medium">Scan to launch on any device</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Interactive UI Simulation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="flex-1 relative z-10 w-full"
        >
          {/* Glassmorphic Mockup Container */}
          <div className="relative mx-auto w-[280px] sm:w-[320px] aspect-[9/19] bg-[#070B16] rounded-[3rem] border-[8px] border-zinc-800/80 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-white/10">
            {/* Simulation Header */}
            <div className="h-14 border-b border-white/5 flex items-center justify-between px-5 bg-black/40 backdrop-blur-md">
              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-black text-white tracking-widest uppercase">UniVerse</span>
              </div>
              <div className="flex gap-2">
                <div className="w-4 h-4 bg-white/5 rounded-full" />
                <div className="w-4 h-4 bg-white/5 rounded-full" />
              </div>
            </div>

            {/* Simulation Content area */}
            <div className="p-4 space-y-6">
              <div className="flex gap-3 overflow-x-hidden">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-indigo-500 p-0.5 shrink-0 animate-pulse">
                    <div className="w-full h-full bg-zinc-800 rounded-full" />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl h-40 border border-white/10 p-4 space-y-3">
                   <div className="flex items-center gap-2">
                     <div className="w-8 h-8 bg-zinc-800 rounded-lg" />
                     <div className="space-y-1">
                       <div className="w-24 h-2 bg-zinc-800 rounded" />
                       <div className="w-16 h-1.5 bg-zinc-800/50 rounded" />
                     </div>
                   </div>
                   <div className="w-full h-20 bg-zinc-900 rounded-xl animate-pulse" />
                </div>
                <div className="bg-white/5 rounded-2xl h-40 border border-white/10 p-4 space-y-3 opacity-40">
                   <div className="w-full h-32 bg-zinc-900 rounded-xl" />
                </div>
              </div>
            </div>

            {/* Simulation Bottom Tab Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-16 border-t border-white/5 bg-black/60 backdrop-blur-xl flex items-center justify-around px-4">
               {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center ${i === 3 ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" : ""}`}>
                   <div className={`w-3.5 h-3.5 ${i === 3 ? "bg-black" : "bg-white/20"} rounded-sm`} />
                 </div>
               ))}
            </div>
            
            {/* Ad Timing / Premium Note */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6 flex flex-col items-center gap-4 z-30 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-indigo-500 text-white font-black text-[10px] uppercase px-4 py-2 rounded-2xl shadow-2xl border border-white/20 text-center backdrop-blur-xl bg-opacity-90"
                >
                   {features[activeFeature].desc}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-10 -right-4 p-4 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl z-40 hidden sm:block"
          >
             <div className="flex items-center gap-3">
               <Shield className="w-5 h-5 text-emerald-400" />
               <div className="text-left leading-none">
                 <p className="text-[9px] font-black text-white uppercase font-mono">Escrow Secured</p>
                 <p className="text-[8px] text-zinc-500">Transaction protection live</p>
               </div>
             </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-6 -left-10 p-5 bg-indigo-500/10 backdrop-blur-2xl border border-indigo-500/20 rounded-[2rem] z-40 hidden lg:block"
          >
             <div className="flex flex-col gap-3">
               <div className="flex items-center gap-2">
                 <Twitter className="w-4 h-4 text-sky-400" />
                 <span className="text-[9px] font-bold text-white tracking-widest">#UniVerseApp</span>
               </div>
               <div className="h-px bg-white/10 w-full" />
               <p className="text-[10px] text-zinc-400 font-medium">9.2k+ Campus Buzzed today</p>
             </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Premium Banner Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-indigo-950 border-t border-indigo-500/30 flex items-center justify-center overflow-hidden">
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="flex items-center gap-3">
               <span className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Remove Ads with UniVerse Premium</span>
               <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
               <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Ad-Free Experience • Priority Support • Fast Gigs</span>
               <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
             </div>
           ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
