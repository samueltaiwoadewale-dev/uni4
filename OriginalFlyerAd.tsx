import React from "react";
import { motion } from "motion/react";
import { 
  Zap, 
  Sparkles, 
  Flame, 
  Globe, 
  Cpu, 
  Rocket, 
  ArrowRight,
  Monitor,
  Smartphone,
  Shield,
  Star,
  Users
} from "lucide-react";

export function OriginalFlyerAd() {
  return (
    <div className="w-full max-w-[320px] aspect-[1/1.414] bg-white text-black relative overflow-hidden shadow-2xl rounded-sm font-sans flex flex-col p-6 cursor-default select-none border-t-[8px] border-emerald-500">
      {/* Background Textures */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rotate-45 pointer-events-none" />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black italic tracking-tighter leading-none m-0 p-0 transform -skew-x-12 translate-x-[-2px]">
            Uni<span className="text-emerald-500">Verse</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 font-mono">Official Campus Node</p>
        </div>
        <div className="w-10 h-10 bg-black flex items-center justify-center rounded-lg shadow-lg rotate-12">
          <Zap className="w-6 h-6 text-emerald-400" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight leading-none italic mb-2">
            One Platform.<br />
            Infinite Power for<br />
            <span className="text-white bg-black px-2 py-0.5 inline-block not-italic -rotate-1">Students.</span>
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
             <div className="mt-1 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
             <p className="text-[11px] leading-tight font-bold text-zinc-700">
               <span className="text-black uppercase underline">Campus Buzz:</span> Share updates, leak CBT info, and find study buddies anonymously.
             </p>
          </div>
          <div className="flex items-start gap-2">
             <div className="mt-1 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
             <p className="text-[11px] leading-tight font-bold text-zinc-700">
               <span className="text-black uppercase underline">Gigs Hub:</span> Bid for laundry, coding, or hostel delivery jobs instantly.
             </p>
          </div>
          <div className="flex items-start gap-2">
             <div className="mt-1 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
             <p className="text-[11px] leading-tight font-bold text-zinc-700">
               <span className="text-black uppercase underline">Secure Escrow:</span> Never get scammed on campus again. We hold the funds.
             </p>
          </div>
        </div>

        {/* Dynamic Graphic */}
        <div className="relative h-24 bg-zinc-100 rounded-xl border border-zinc-200 overflow-hidden flex items-center justify-center">
           <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
           <div className="space-y-1 text-center">
             <div className="flex justify-center -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-zinc-300 shadow-sm overflow-hidden bg-center bg-cover" style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${i+10})` }} />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-500 flex items-center justify-center text-[10px] font-black text-black z-10 shadow-lg">
                  +12k
                </div>
             </div>
             <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest pt-2">Students Active at OAU/UNILAG</p>
           </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto space-y-4 pt-4 border-t border-zinc-200">
        <div className="flex items-center justify-between">
           <div className="space-y-0.5">
             <p className="text-[10px] font-black uppercase">Scan to Join Hub</p>
             <p className="text-[8px] text-zinc-500 font-medium">uni-verse.app</p>
           </div>
           <div className="w-12 h-12 bg-white p-1 rounded-md border border-zinc-200 shadow-sm">
             <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://uni-verse.app" alt="QR" className="w-full h-full" />
           </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 py-2 bg-emerald-500 rounded-full shadow-[0_4px_10px_rgba(16,185,129,0.3)]">
          <Sparkles className="w-3 h-3 text-black" />
          <span className="text-[9px] font-black uppercase tracking-widest text-black">Zero-Knowledge Secure Node</span>
        </div>
      </div>

      {/* Extreme Detail: Texture & Subtle Grills */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-300/30" />
    </div>
  );
}
