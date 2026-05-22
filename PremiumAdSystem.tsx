import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  X, 
  Zap, 
  Rocket, 
  Gem, 
  Crown, 
  CheckCircle,
  ShieldCheck,
  TrendingUp,
  Flame,
  Star,
  Lock,
  Unlock,
  Eye
} from "lucide-react";
import InteractiveAdFlyer from "./InteractiveAdFlyer";

interface AdSystemProps {
  isPremium: boolean;
  onUpgrade: () => void;
  triggerHapticFeedback: (freq: number, type?: "sine" | "triangle", duration?: number) => void;
  adSkipTime?: number;
  OriginalFlyerAd: React.FC;
}

export default function PremiumAdSystem({ isPremium, onUpgrade, triggerHapticFeedback, adSkipTime = 15, OriginalFlyerAd }: AdSystemProps) {
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [showSidePopup, setShowSidePopup] = useState(false);
  const [nextAdCountdown, setNextAdCountdown] = useState(480); // 8 minutes in seconds
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  
  // New States for flyer ad presentation
  const [adSkipCountdown, setAdSkipCountdown] = useState(adSkipTime);
  const [isAdStatic, setIsAdStatic] = useState(false);

  const ads = [
    {
      title: "Super-Charge Your Studies",
      desc: "UniVerse AI Hub now supports PDF analysis for African Curriculum. No data needed.",
      cta: "Try AI Beta",
      icon: Zap,
      color: "bg-emerald-500",
      accent: "text-emerald-400"
    },
    {
      title: "Gig Alert: OAU campus",
      desc: "3 new graphic design gigs posted in your vicinity. Secure your first 10k today.",
      cta: "View Gigs",
      icon: TrendingUp,
      color: "bg-indigo-500",
      accent: "text-indigo-400"
    },
    {
      title: "Limited Edition: Star Theme",
      desc: "The 'Celestial' UI theme is only available for the next 2 hours. Claim now.",
      cta: "Unlock Theme",
      icon: Star,
      color: "bg-purple-500",
      accent: "text-purple-400"
    }
  ];

  // Listener for custom test triggers
  useEffect(() => {
    const handleTrigger = () => {
      setShowInterstitial(true);
      triggerHapticFeedback(800, "sine", 0.3);
    };
    window.addEventListener("trigger-test-ad", handleTrigger);
    return () => window.removeEventListener("trigger-test-ad", handleTrigger);
  }, [triggerHapticFeedback]);

  // Main ad cycle generator (every 8 mins)
  useEffect(() => {
    if (isPremium) return;

    const timer = setInterval(() => {
      setNextAdCountdown((prev) => {
        if (prev <= 1) {
          // Trigger Ad
          setShowInterstitial(true);
          triggerHapticFeedback(800, "sine", 0.5);
          return 480; // Reset
        }
        
        // Show side popup 2 minutes before main ad
        if (prev === 120) {
          setShowSidePopup(true);
          triggerHapticFeedback(440, "sine", 0.1);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPremium, triggerHapticFeedback]);

  // Lock bypass timer when Interstitial starts showing
  useEffect(() => {
    if (showInterstitial) {
      setAdSkipCountdown(adSkipTime);
      // Determine if visual ad content is interactive or purely static
      const randomIsStatic = Math.random() < 0.5;
      setIsAdStatic(randomIsStatic);
      
      const interval = setInterval(() => {
        setAdSkipCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showInterstitial, adSkipTime]);

  if (isPremium) return null;

  return (
    <>
      {/* Side Hovering Popup Ad (Prompt) */}
      <AnimatePresence>
        {showSidePopup && !showInterstitial && (
          <motion.div 
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-[100] w-72 bg-[#151B2B] border border-white/10 rounded-3xl p-5 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl text-left"
          >
            <button 
              onClick={() => setShowSidePopup(false)}
              className="absolute top-2 right-2 p-1.5 hover:bg-white/5 rounded-full text-zinc-500 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 ${ads[currentAdIndex].color} rounded-lg flex items-center justify-center`}>
                  {React.createElement(ads[currentAdIndex].icon, { className: "w-4 h-4 text-white" })}
                </div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">UniVerse Pro</span>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white leading-tight">{ads[currentAdIndex].title}</h4>
                <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">{ads[currentAdIndex].desc}</p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button 
                  onClick={() => setShowSidePopup(false)}
                  className="flex-1 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                >
                  {ads[currentAdIndex].cta}
                </button>
                <button 
                  onClick={onUpgrade}
                  className="p-1.5 border border-white/10 hover:border-indigo-500/30 text-zinc-400 hover:text-white rounded-xl transition-all"
                  title="Remove Ads"
                >
                  <Crown className="w-4 h-4" />
                </button>
              </div>

              {/* Dev integration trigger for preview testing */}
              <button 
                onClick={() => {
                  setShowSidePopup(false);
                  setShowInterstitial(true);
                }}
                className="w-full py-1 bg-[#1E1B4B]/60 text-[#CBD5E1] text-[9.5px] font-mono border border-indigo-500/20 rounded-lg text-center hover:bg-[#1E1B4B] hover:text-white transition-all"
              >
                ⚡ Preview Flyer Ad (15s countdown)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Full-Screen Interstitial Ad (Cinematic Hub) */}
      <AnimatePresence>
        {showInterstitial && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-between p-4"
          >
            {/* Cinematic Background Light */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-[#EC4899]/10 blur-[130px] rounded-full pointer-events-none" />

            {/* STICKY CONTROL HUD BAR (TOP) */}
            <div className="w-full max-w-[1600px] bg-slate-950/90 border border-white/10 backdrop-blur-xl px-4 py-3 sm:px-6 sm:py-4 rounded-3xl flex items-center justify-between z-35 relative shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-tr from-[#EC4899] to-indigo-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5 text-white animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-white tracking-tight">Sessional Broadcast Node</span>
                    <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-1.5 py-0.5 rounded leading-none">
                      {isAdStatic ? "Pristine Poster" : "Interactive Flyer"}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-medium leading-none mt-1">
                    Ad presentation respects peer-to-peer sessional curriculum sponsorship
                  </p>
                </div>
              </div>

              {/* Status or instant premium link */}
              {adSkipCountdown === 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    triggerHapticFeedback(510, "sine", 0.1);
                    setShowInterstitial(false);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 rounded-xl text-xs font-black uppercase tracking-tight transition-all cursor-pointer shadow-md hover:scale-105"
                >
                  ✕ Exit Ad / Close
                </button>
              ) : (
                <button 
                  onClick={() => {
                    triggerHapticFeedback(700, "sine", 0.3);
                    onUpgrade();
                    setShowInterstitial(false);
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[9.5px] font-black uppercase tracking-wider rounded-xl transition-all shadow-lg hover:scale-105"
                >
                  <Crown className="w-3.5 h-3.5 fill-black" />
                  Remove All Ads Now
                </button>
              )}
            </div>

            {/* MAIN CENTRAL EXPANDED DEVICE VIEWPORT */}
            <div className="flex-1 w-full max-w-[1600px] my-4 rounded-3xl overflow-y-auto overflow-x-hidden border border-white/10 bg-[#050811] shadow-inner relative scrollbar-thin">
              {isAdStatic ? (
                <div className="p-4 sm:p-8 flex items-center justify-center min-h-full">
                  <OriginalFlyerAd />
                </div>
              ) : (
                <InteractiveAdFlyer 
                  isStatic={isAdStatic} 
                  onUpgrade={() => {
                    onUpgrade(); 
                    setShowInterstitial(false);
                  }} 
                  triggerHapticFeedback={triggerHapticFeedback} 
                />
              )}
            </div>

            {/* FOOTER COUNTDOWN SKIP PANEL */}
            <div className="w-full max-w-[1600px] bg-slate-950/90 border border-white/10 backdrop-blur-xl p-4 sm:p-5 rounded-3xl z-35 relative flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  {adSkipCountdown > 0 ? (
                    <Lock className="w-4 h-4 text-rose-400 animate-pulse" />
                  ) : (
                    <Unlock className="w-4 h-4 text-emerald-400" />
                  )}
                  <span className="text-xs font-black text-white uppercase tracking-tight">
                    {adSkipCountdown > 0 ? "Skip Locked temporarily" : "Skip unlocked successfully"}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 mt-1">
                  {adSkipCountdown > 0 
                    ? `Please appreciate this student-made flyer. You can exit in ${adSkipCountdown} seconds...` 
                    : "Close the ad preview to return back to your live interactive peer panel."
                  }
                </p>
              </div>

              <div className="flex gap-3 items-center w-full sm:w-auto">
                {/* Instant upgrade fallback */}
                <button 
                  onClick={() => {
                    triggerHapticFeedback(700, "sine", 0.3);
                    onUpgrade();
                    setShowInterstitial(false);
                  }}
                  className="sm:hidden flex-1 py-3 px-4 bg-white/5 border border-white/10 text-white text-xs font-black uppercase rounded-2xl"
                >
                  👑 Upgrade Pro
                </button>

                {adSkipCountdown > 0 ? (
                  <button 
                    disabled
                    className="flex-1 sm:flex-none py-3.5 px-8 bg-zinc-900 text-zinc-500 rounded-2xl text-xs font-black uppercase tracking-widest border border-white/5 cursor-not-allowed select-none flex items-center justify-center gap-2"
                  >
                    Skip Ad ({adSkipCountdown}s)
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      triggerHapticFeedback(500, "sine", 0.1);
                      setShowInterstitial(false);
                    }}
                    className="flex-1 sm:flex-none py-3.5 px-10 bg-gradient-to-r from-indigo-500 to-indigo-650 text-white hover:bg-indigo-400 rounded-2xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-xl shadow-indigo-500/20 ring-2 ring-indigo-500/40 animate-pulse flex items-center justify-center gap-1.5"
                  >
                    <span>✓ Continue to UniVerse App</span>
                  </button>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
