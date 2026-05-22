import React from "react";
import { Settings, Plus, User } from "lucide-react";

interface Profile {
  name: string;
  handle: string;
  avatar: string; // Base64 or empty
  xp: number;
  level: string;
  email: string;
  department: string;
  matricNumber: string;
  hostel: string;
  interests: string[];
  university?: string;
  college?: string;
  faculty?: string;
}

interface ProfileModalProps {
  userProfile: Profile;
  onProfileChange: (newProfile: Profile) => void;
  onClose: () => void;
  onLogout: () => void;
  triggerHapticFeedback: (freq: number, type?: "sine" | "triangle", duration?: number) => void;
  marketplaceItems?: any[];
}

export default function ProfileModal({
  userProfile,
  onProfileChange,
  onClose,
  onLogout,
  triggerHapticFeedback,
  marketplaceItems = []
}: ProfileModalProps) {

  const myItems = marketplaceItems.filter(item => item.seller?.handle === userProfile.handle);
  const completedSales = myItems.filter(item => item.status === "sold").length;
  const activeListings = myItems.filter(item => item.status !== "sold").length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = { ...userProfile, avatar: reader.result as string };
        onProfileChange(updated);
        triggerHapticFeedback(800, "sine", 0.12);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4 select-none animate-fadeIn">
      <div className="w-full max-w-md bg-[#090D1A] border border-white/15 rounded-3xl p-6 relative shadow-2xl space-y-5 text-left">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-emerald-400 rotate-animation" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider font-display">Student Identity Hub</h3>
          </div>
          <button 
            onClick={() => {
              triggerHapticFeedback(300, "sine");
              onClose();
            }}
            className="p-1 px-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white cursor-pointer transition-colors text-[10px] font-bold font-mono"
          >
            ESC
          </button>
        </div>

        {/* Change Profile Avatar section with add image support */}
        <div className="space-y-3.5 text-center">
          <div className="relative w-24 h-24 mx-auto">
            <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-dashed border-emerald-400/40 p-1 flex items-center justify-center bg-black/40">
              {userProfile.avatar ? (
                <img src={userProfile.avatar} alt="Profile Avatar" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <div className="w-full h-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-3xl rounded-xl">
                  {userProfile.name[0]?.toUpperCase() || "S"}
                </div>
              )}
            </div>
            
            {/* Input label trigger to ADD/UPLOAD images */}
            <label className="absolute -bottom-2 -right-2 bg-emerald-500 hover:bg-emerald-400 text-black p-1.5 rounded-xl cursor-pointer shadow-md transition-all hover:scale-105 flex items-center justify-center">
              <Plus className="w-4 h-4" />
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div>
            <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">Zero-Knowledge Student Avatar</span>
            <p className="text-[10px] text-zinc-500 mt-1 max-w-xs mx-auto">
              Drag and drop any capture or upload dynamic images. Images are stored fully locally in this preview session.
            </p>
          </div>
        </div>

        {/* Form fields */}
        <div className="space-y-3 font-mono text-xs">
          <div className="space-y-1 text-left">
            <label className="text-[9px] text-zinc-500 uppercase font-black block">Full Name</label>
            <input 
              type="text"
              value={userProfile.name}
              onChange={(e) => {
                onProfileChange({ ...userProfile, name: e.target.value });
              }}
              className="w-full bg-[#101424] text-white p-2 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-emerald-400 font-sans font-bold"
            />
          </div>

          <div className="space-y-1 text-left">
            <label className="text-[9px] text-zinc-500 uppercase font-black block">Sessional Handle</label>
            <input 
              type="text"
              value={userProfile.handle.startsWith("@") ? userProfile.handle : `@${userProfile.handle}`}
              onChange={(e) => {
                const original = e.target.value.replace("@", "");
                onProfileChange({ ...userProfile, handle: original });
              }}
              className="w-full bg-[#101424] text-white p-2 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-emerald-400 font-mono"
            />
          </div>

          <div className="space-y-1 text-left">
            <label className="text-[9px] text-zinc-500 uppercase font-black block">University Space</label>
            <select
              value={userProfile.university || "Obafemi Awolowo University (OAU)"}
              onChange={(e) => {
                onProfileChange({ ...userProfile, university: e.target.value });
              }}
              className="w-full bg-[#101424] text-white p-2 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-emerald-400 font-sans font-bold"
            >
              {[
                "Obafemi Awolowo University (OAU)",
                "University of Lagos (UNILAG)",
                "University of Ibadan (UI)",
                "Ahmadu Bello University (ABU)",
                "University of Nigeria, Nsukka (UNN)"
              ].map((uni) => (
                <option key={uni} value={uni} className="bg-[#090D1A]">{uni}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="space-y-1">
              <label className="text-[9px] text-zinc-500 uppercase font-black block">College / School</label>
              <input 
                type="text"
                placeholder="e.g. College of Technology"
                value={userProfile.college || ""}
                onChange={(e) => {
                  onProfileChange({ ...userProfile, college: e.target.value });
                }}
                className="w-full bg-[#101424] text-white p-2 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-emerald-405 font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-zinc-500 uppercase font-black block">Faculty</label>
              <input 
                type="text"
                placeholder="e.g. Faculty of Technology"
                value={userProfile.faculty || ""}
                onChange={(e) => {
                  onProfileChange({ ...userProfile, faculty: e.target.value });
                }}
                className="w-full bg-[#101424] text-white p-2 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-emerald-405 font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="space-y-1">
              <label className="text-[9px] text-zinc-500 uppercase font-black block">Department</label>
              <input 
                type="text"
                placeholder="e.g. Computer Science"
                value={userProfile.department || ""}
                onChange={(e) => {
                  onProfileChange({ ...userProfile, department: e.target.value });
                }}
                className="w-full bg-[#101424] text-white p-2 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-emerald-400 font-sans font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-zinc-500 uppercase font-black block">Matric Number</label>
              <input 
                type="text"
                value={userProfile.matricNumber || ""}
                onChange={(e) => {
                  onProfileChange({ ...userProfile, matricNumber: e.target.value });
                }}
                className="w-full bg-[#101424] text-white p-2 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1 text-left">
            <label className="text-[9px] text-zinc-500 uppercase font-black block">Hostel & Room Address</label>
            <input 
              type="text"
              value={userProfile.hostel || ""}
              onChange={(e) => {
                onProfileChange({ ...userProfile, hostel: e.target.value });
              }}
              className="w-full bg-[#101424] text-white p-2 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-emerald-400 font-sans"
            />
          </div>

          <div className="space-y-1 text-left">
            <label className="text-[9px] text-zinc-500 uppercase font-black block">Sessional Interests</label>
            <div className="flex flex-wrap gap-1">
              {(userProfile.interests || []).map((int, i) => (
                <span key={i} className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono font-bold">
                  {int}
                </span>
              ))}
              <span 
                onClick={() => {
                  const newInt = prompt("Enter an interest tag to append to profile:");
                  if (newInt) {
                    onProfileChange({ 
                      ...userProfile, 
                      interests: [...(userProfile.interests || []), newInt] 
                    });
                    triggerHapticFeedback(600, "sine", 0.1);
                  }
                }}
                className="text-[9px] bg-white/5 border border-white/10 hover:border-emerald-400/30 text-zinc-400 hover:text-white px-2 py-0.5 rounded-full font-mono cursor-pointer font-bold transition-all"
              >
                + Add tag
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="space-y-1">
              <label className="text-[9px] text-zinc-500 uppercase font-black block">Academic Level</label>
              <select
                value={userProfile.level}
                onChange={(e) => {
                  onProfileChange({ ...userProfile, level: e.target.value });
                }}
                className="w-full bg-[#101424] text-white p-2 text-xs rounded-xl border border-[#ffffff15] focus:outline-none focus:border-emerald-400 font-sans"
              >
                {["100L", "200L", "300L", "400L", "500L", "PG"].map((lvl) => (
                  <option key={lvl} value={lvl} className="bg-[#090D1A]">{lvl}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-zinc-550 uppercase font-black block">Intellect XP</label>
              <div className="w-full bg-[#101424] text-[#FACC15] p-2 text-xs rounded-xl border border-white/10 font-bold font-sans">
                {userProfile.xp} XP
              </div>
            </div>
          </div>

          {/* MERCHANT STAND STATUS */}
          {myItems.length > 0 && (
            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-3.5 space-y-2 text-left">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest border-b border-emerald-500/10 pb-1.5">
                <span>📦 Active Merchant Stand</span>
                <span className="bg-emerald-500 text-black px-1.5 py-0.5 rounded text-[8px] uppercase">VERIFIED</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-black/40 p-2 rounded-xl border border-white/5">
                  <span className="text-[9px] text-zinc-500 uppercase block font-bold">Active Listings</span>
                  <span className="text-xs font-black text-white font-mono">{activeListings} items</span>
                </div>
                <div className="bg-black/40 p-2 rounded-xl border border-white/5">
                  <span className="text-[9px] text-zinc-500 uppercase block font-bold">Sales Completed</span>
                  <span className="text-xs font-black text-emerald-400 font-mono">{completedSales} sold</span>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-3 border-t border-white/5 flex gap-2">
            <button
              type="button"
              onClick={() => {
                triggerHapticFeedback(400, "triangle", 0.2);
                onLogout();
              }}
              className="w-1/3 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white text-[10px] font-black uppercase py-2.5 rounded-xl transition-all border border-rose-550/20 cursor-pointer text-center"
            >
              Log Out
            </button>

            <button
              type="button"
              onClick={() => {
                triggerHapticFeedback(700, "sine");
                onClose();
              }}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-[10px] uppercase py-2.5 rounded-xl transition-all cursor-pointer text-center"
            >
              Confirm Changes
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
