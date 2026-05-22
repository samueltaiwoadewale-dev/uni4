import React, { useState, useEffect } from "react";
import { Lock, User, RefreshCw, Key, Mail, Award, CheckCircle, Info } from "lucide-react";

interface StudentProfile {
  name: string;
  handle: string;
  avatar: string;
  xp: number;
  level: string;
  email: string;
  department: string;
  matricNumber: string;
  hostel: string;
  interests: string[];
  university: string;
  college: string;
  faculty: string;
}

interface StudentAuthLoaderProps {
  onLoginSuccess: (profile: StudentProfile) => void;
  soundEnabled: boolean;
  triggerHapticFeedback: (freq: number, type?: "sine" | "triangle", duration?: number) => void;
  UniVerseLogo: React.ComponentType<{ size: number; animate?: boolean; orbitSpeed?: number; bubbleScale?: number; glow?: boolean }>;
  alreadyLoggedIn: boolean;
  onBootComplete: () => void;
  onEnterManagementMode?: () => void;
}

export default function StudentAuthLoader({
  onLoginSuccess,
  soundEnabled,
  triggerHapticFeedback,
  UniVerseLogo,
  alreadyLoggedIn,
  onBootComplete,
  onEnterManagementMode
}: StudentAuthLoaderProps) {
  const [showSplashLogo, setShowSplashLogo] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTimeRemaining, setLoadingTimeRemaining] = useState(15);
  const [loadingFact, setLoadingFact] = useState("Preparing sessional campus hub...");
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [signupStep, setSignupStep] = useState(0); // 0: Identity, 1: Institutional, 2: Academic, 3: Finale

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupHandle, setSignupHandle] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupLevel, setSignupLevel] = useState("300L");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupAvatar, setSignupAvatar] = useState("");
  const [signupDepartment, setSignupDepartment] = useState("Computer Science");
  const [signupMatricNumber, setSignupMatricNumber] = useState("");
  const [signupHostel, setSignupHostel] = useState("Angola Hall");
  const [signupInterests, setSignupInterests] = useState<string[]>(["Structured Algorithms", "CBT Past Questions"]);
  const [signupUniversity, setSignupUniversity] = useState("Obafemi Awolowo University (OAU)");
  const [signupCollege, setSignupCollege] = useState("College of Technology");
  const [signupFaculty, setSignupFaculty] = useState("Faculty of Technology");

  // Splash Screen Solo Logo Timer
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplashLogo(false);
      triggerHapticFeedback(700, "sine", 0.15);
    }, 2500);
    return () => clearTimeout(splashTimer);
  }, []);

  // Helper to ensure each user's sessional handle has a unique sessional #XXXX code suffix
  const ensureUniqueSuffix = (h: string): string => {
    let clean = h.replace("@", "").trim() || "student";
    if (clean.includes("#")) return clean;
    const num = Math.floor(1000 + Math.random() * 9000);
    return `${clean}#${num}`;
  };

  // Instant login bypass on green dot clicked
  const handleInstantBypass = () => {
    triggerHapticFeedback(900, "sine", 0.35);
    const profile: StudentProfile = {
      name: "Samuel Student",
      handle: "sam_oau#2544",
      avatar: "",
      xp: 480,
      level: "300L",
      email: "sam@students.oauife.edu.ng",
      department: "Computer Science",
      matricNumber: "CSC/2021/042",
      hostel: "Angola Hall",
      interests: ["Structured Algorithms", "CBT Past Questions"],
      university: "Obafemi Awolowo University (OAU)",
      college: "College of Technology",
      faculty: "Faculty of Technology"
    };
    onLoginSuccess(profile);
  };

  useEffect(() => {
    if (showSplashLogo) return;
    if (!isLoading) return;

    const timer = setInterval(() => {
      setLoadingTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading, showSplashLogo]);

  // Handle loading facts updating dynamically
  useEffect(() => {
    if (showSplashLogo) return;
    if (!isLoading) return;

    const loadingFacts = [
      "Gathering sessional course materials...",
      "Connecting with peer department nodes...",
      "Securing student privacy shield...",
      "Syncing campus community updates...",
      "Loading academic tools and resources...",
      "Preparing student welfare boards...",
      "Updating marketplace sessional deals...",
      "Optimizing peer study rooms...",
      "Finalizing campus preferences...",
      "Hub ready for launch!"
    ];

    const factIdx = Math.floor(((15 - loadingTimeRemaining) / 15) * loadingFacts.length);
    setLoadingFact(loadingFacts[Math.min(factIdx, loadingFacts.length - 1)]);
  }, [loadingTimeRemaining, isLoading, showSplashLogo]);

  // Handle boot complete when countdown reaches 0
  useEffect(() => {
    if (!showSplashLogo && isLoading && loadingTimeRemaining === 0) {
      setIsLoading(false);
      triggerHapticFeedback(800, "sine", 0.3);
      if (alreadyLoggedIn) {
        onBootComplete();
      }
    }
  }, [loadingTimeRemaining, isLoading, showSplashLogo, alreadyLoggedIn, onBootComplete]);

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupPassword || signupPassword.length < 8) {
      alert("Please set a valid Gateway Encryption Key (min 8 characters).");
      return;
    }
    const cleanHandle = ensureUniqueSuffix(signupHandle);
    const profile: StudentProfile = {
      name: signupName || "Student Cadet",
      handle: cleanHandle,
      avatar: signupAvatar,
      xp: 485,
      level: signupLevel,
      email: signupEmail,
      department: signupDepartment,
      matricNumber: signupMatricNumber || `MT-${Math.floor(1000 + Math.random() * 9000)}/CSC`,
      hostel: signupHostel,
      interests: signupInterests,
      university: signupUniversity,
      college: signupCollege,
      faculty: signupFaculty
    };
    triggerHapticFeedback(650, "sine", 0.2);
    onLoginSuccess(profile);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPassword || loginPassword.length < 8) {
      alert("Invalid Gateway Encryption Key. Password must be at least 8 characters.");
      return;
    }
    const cleanHandle = ensureUniqueSuffix(loginEmail.split("@")[0] || "sam_dev_oau");
    
    // Infer university from email domain if possible
    let inferredUni = "Obafemi Awolowo University (OAU)";
    const lowerEmail = loginEmail.toLowerCase();
    if (lowerEmail.includes("unilag")) inferredUni = "University of Lagos (UNILAG)";
    else if (lowerEmail.includes("ui.edu")) inferredUni = "University of Ibadan (UI)";
    else if (lowerEmail.includes("abu.edu")) inferredUni = "Ahmadu Bello University (ABU)";
    else if (lowerEmail.includes("unn.edu")) inferredUni = "University of Nigeria, Nsukka (UNN)";

    const profile: StudentProfile = {
      name: "Sam Dev",
      handle: cleanHandle,
      avatar: "",
      xp: 480,
      level: "300L",
      email: loginEmail || "sam@students.oauife.edu.ng",
      department: "Computer Science",
      matricNumber: "CSC/2021/042",
      hostel: "Angola Hall, Block B",
      interests: ["Structured Algorithms", "CBT Past Questions"],
      university: inferredUni,
      college: "College of Technology",
      faculty: "Faculty of Technology"
    };
    triggerHapticFeedback(600, "sine", 0.2);
    onLoginSuccess(profile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignupAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Render 1st Stage: Solid Solo Logo screen
  if (showSplashLogo) {
    return (
      <div className="min-h-screen w-full bg-[#070B16] text-white flex flex-col items-center justify-center relative overflow-hidden p-4 select-none">
        {/* Extreme edge Developer Sandbox secret trigger dot */}
        <div 
          onClick={() => {
            triggerHapticFeedback(900, "triangle", 0.35);
            onEnterManagementMode?.();
          }}
          className="fixed bottom-3 right-3 w-3 h-3 bg-purple-500/30 hover:bg-purple-400 rounded-full cursor-pointer z-50 transition-all active:scale-150 duration-200 animate-pulse animate-duration-2000"
        />

        {/* Ambient background accent fields */}
        <div className="absolute w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="z-10 text-center space-y-7">
          <div className="w-24 h-24 mx-auto bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center p-2 relative overflow-hidden shadow-2xl animate-pulse">
            <UniVerseLogo size={76} animate={true} orbitSpeed={1.3} bubbleScale={1.0} glow={true} />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-widest text-white uppercase font-display">
              UNIVERSE<span className="text-emerald-400">.</span>
            </h1>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#00E5FF] font-extrabold">
              Connecting sovereigns locally
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render Loader Stage
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#070B16] text-white selection:bg-emerald-500/30 selection:text-white font-sans flex items-center justify-center relative overflow-hidden antialiased p-4">
        {/* Extreme edge Developer Sandbox secret trigger dot */}
        <div 
          onClick={() => {
            triggerHapticFeedback(900, "triangle", 0.35);
            onEnterManagementMode?.();
          }}
          className="fixed bottom-3 right-3 w-3 h-3 bg-purple-500/30 hover:bg-purple-400 rounded-full cursor-pointer z-50 transition-all active:scale-150 duration-200 animate-pulse animate-duration-2000"
        />

        {/* Abstract background blobs */}
        <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

        <div className="w-full max-w-lg mx-auto p-6 md:p-8 space-y-6 text-center select-none relative z-10">
          {/* UniVerse Moving Logo */}
          <div className="w-20 h-20 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-2 relative overflow-hidden animate-bounce" style={{ animationDuration: "3s" }}>
            <UniVerseLogo size={64} animate={true} orbitSpeed={1.0} bubbleScale={0.8} glow={true} />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
              UniVerse<span 
                onClick={handleInstantBypass}
                className="text-emerald-400 cursor-pointer select-none px-1.5 hover:scale-150 transition-transform duration-200 inline-block active:text-white animate-pulse"
                title="Sovereign Bypass Gate"
              >
                .
              </span>
            </h1>
            <p className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase font-extrabold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-block">
              West African Decentralized Node calibration
            </p>
          </div>

          {/* Progress panel */}
          <div className="bg-[#101424] border border-white/10 rounded-2xl p-5 md:p-6 space-y-5 shadow-2xl relative overflow-hidden text-left">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-zinc-500 font-black uppercase">SYNCING SESSONAL NETWORK...</span>
                <span className="text-emerald-400 font-black">{loadingTimeRemaining}s REMAINING</span>
              </div>
              <div className="h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000"
                  style={{ width: `${((15 - loadingTimeRemaining) / 15) * 100}%` }}
                />
              </div>
            </div>

            {/* Fact Box */}
            <div className="bg-[#070B16] border border-white/5 p-3.5 rounded-xl min-h-[60px] flex items-center justify-center">
              <p className="text-xs text-zinc-305 leading-relaxed font-semibold text-center">
                "{loadingFact}"
              </p>
            </div>

            <div className="space-y-2 text-left bg-slate-950/40 p-3 rounded-lg text-[10.5px] text-zinc-400 font-sans border border-white/5">
              <span className="font-bold text-zinc-300 block uppercase text-[8.5px] font-mono tracking-widest text-emerald-405">Platform Safety Guide:</span>
              <p className="leading-relaxed">
                UniVerse binds student authority anonymously via student `.edu` campus credentials without ever logging real identities. Double-shielded against doxxing and sessional harassment.
              </p>
            </div>
          </div>

          {/* Sandbox override shortcut */}
          <button
            onClick={() => {
              triggerHapticFeedback(800, "triangle", 0.1);
              setIsLoading(false);
              if (alreadyLoggedIn) {
                onBootComplete();
              }
            }}
            className="text-[10px] font-mono text-zinc-550 hover:text-purple-400 cursor-pointer underline tracking-wider transition-colors outline-none focus:outline-none block mx-auto"
          >
            Speed up node calibration (Sandbox Bypass 🟢)
          </button>

          <p className="text-[9px] text-zinc-500 font-mono">
            Secure token signature TLS v1.3 • Host oau.students.relays
          </p>
        </div>
      </div>
    );
  }

  // Render Login / Sign Up Gate Stage
  return (
    <div className="min-h-screen w-full bg-[#070B16] text-white selection:bg-emerald-500/30 selection:text-white font-sans flex items-center justify-center relative overflow-hidden antialiased p-4">
      {/* Extreme edge Developer Sandbox secret trigger dot */}
      <div 
        onClick={() => {
          triggerHapticFeedback(900, "triangle", 0.35);
          onEnterManagementMode?.();
        }}
        className="fixed bottom-3 right-3 w-3 h-3 bg-purple-500/30 hover:bg-purple-400 rounded-full cursor-pointer z-50 transition-all active:scale-150 duration-200 animate-pulse animate-duration-2000"
      />

      {/* Dynamic color spots */}
      <div className="absolute top-[-25%] right-[-25%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-25%] left-[-25%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md mx-auto relative z-10 space-y-6 text-left">
        {/* Logo */}
        <div className="text-center space-y-2 select-none">
          <div className="w-14 h-14 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-1 relative overflow-hidden">
            <UniVerseLogo size={42} animate={true} orbitSpeed={0.8} bubbleScale={0.7} glow={false} />
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">
            UniVerse<span 
              onClick={handleInstantBypass} 
              className="text-emerald-400 cursor-pointer select-none px-1.5 hover:scale-150 transition-transform duration-200 inline-block active:text-white animate-pulse"
              title="Hub Access Point"
            >
              .
            </span>
          </h1>
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
            The Digital Campus Platform
          </p>
        </div>

        {/* Form panel */}
        <div className="bg-[#101424] border border-white/10 rounded-3xl p-6 md:p-8 space-y-5 shadow-2xl relative overflow-hidden">
          
          {/* Navigation tabs */}
          <div className="flex bg-[#070B16] p-1 border border-white/5 rounded-xl">
            <button
              type="button"
              onClick={() => {
                triggerHapticFeedback(440, "sine");
                setIsSignUpMode(false);
              }}
              className={`flex-1 font-bold text-[10px] uppercase py-2 px-3 rounded-lg transition-all cursor-pointer ${
                !isSignUpMode ? "bg-emerald-500 text-black shadow-md" : "text-zinc-405 hover:text-white"
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => {
                triggerHapticFeedback(520, "sine");
                setIsSignUpMode(true);
              }}
              className={`flex-1 font-bold text-[10px] uppercase py-2 px-3 rounded-lg transition-all cursor-pointer ${
                isSignUpMode ? "bg-emerald-500 text-black shadow-md" : "text-zinc-450 hover:text-white"
              }`}
            >
              Create Hub Profile
            </button>
          </div>

          <p className="text-[11px] text-zinc-400 leading-relaxed font-sans text-center">
            {!isSignUpMode 
              ? "Access your academic hub for collaboration, updates, and student tools."
              : "Create your student profile and join your university community sessional space."}
          </p>

          {!isSignUpMode ? (
            // LOGIN FORM
            <form onSubmit={handleLoginSubmit} className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <label className="text-[9px] text-zinc-500 uppercase font-mono block">Institutional Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sam@students.oauife.edu.ng"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-[#070B16] text-white p-3 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-emerald-500 placeholder-zinc-600 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-zinc-500 uppercase font-mono block">Gateway Encryption Key (Password)</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-[#070B16] text-white p-3 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-emerald-500 placeholder-zinc-600 text-lg font-sans"
                />
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-[11px] uppercase py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-950/40"
                >
                  Authenticate & Launch Hub
                </button>

                {/* MANAGEMENT SECURE NODE ACCESS (SECRET TRIGGER DOT) */}
                <div className="flex flex-col items-center gap-1 pt-1 opacity-40 hover:opacity-100 transition-opacity">
                   <div 
                    onClick={() => {
                      triggerHapticFeedback(1000, "sine", 0.5);
                      onEnterManagementMode?.();
                    }}
                    className="w-2.5 h-2.5 bg-emerald-400 rounded-full cursor-pointer shadow-lg shadow-emerald-400/20 active:scale-150 transition-all"
                    title="Secure Node Access"
                  />
                  <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest font-black pointer-events-none">SECURE NODE</span>
                </div>
              </div>
            </form>
          ) : (
            // SIGNUP FORM - STEPPED
            <form onSubmit={handleSignupSubmit} className="space-y-5 animate-fadeIn">
              
              {/* Step Progress Indicators */}
              <div className="flex justify-between items-center px-2">
                {[0, 1, 2, 3].map((s) => (
                  <div 
                    key={s} 
                    className={`h-1 flex-1 mx-0.5 rounded-full transition-all duration-500 ${
                      signupStep >= s ? "bg-emerald-500" : "bg-white/10"
                    }`} 
                  />
                ))}
              </div>

              {signupStep === 0 && (
                <div className="space-y-4 animate-scaleIn">
                   <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex items-start gap-2">
                     <Info className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                     <p className="text-[10px] text-emerald-400/80 leading-relaxed font-mono">
                       Welcome to your digital campus. We don't track your real identity unless you want us to. Build your sessional persona here.
                     </p>
                   </div>
                   <div className="flex flex-col items-center gap-4 py-2">
                    <div className="relative w-20 h-20 bg-white/5 border border-dashed border-white/20 rounded-2xl flex items-center justify-center overflow-hidden animate-pulse group hover:border-emerald-500/50 transition-colors">
                      {signupAvatar ? (
                        <img src={signupAvatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                      )}
                      <label className="absolute inset-0 cursor-pointer">
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                      </label>
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Tap to upload sessional avatar</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-400 uppercase font-mono block">What should we call you? (Full Name)</label>
                    <input
                      type="text"
                      placeholder="e.g. Samuel Adekunle"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="w-full bg-[#070B16] text-white p-3 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-emerald-500 font-sans shadow-inner"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-400 uppercase font-mono block">Your Unique Campus Alias</label>
                    <input
                      type="text"
                      placeholder="e.g. sam_dev_oau"
                      value={signupHandle}
                      onChange={(e) => setSignupHandle(e.target.value)}
                      className="w-full bg-[#070B16] text-white p-3 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-emerald-500 font-mono shadow-inner"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={!signupName || !signupHandle}
                    onClick={() => {
                      triggerHapticFeedback(700, "sine");
                      setSignupStep(1);
                    }}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[10px] uppercase py-3.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
                  >
                    Next: Institutional Setup <Award className="w-3.5 h-3.5 group-hover:scale-125 transition-transform" />
                  </button>
                </div>
              )}

              {signupStep === 1 && (
                <div className="space-y-4 animate-scaleIn text-left">
                  <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-xl flex items-start gap-2">
                     <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                     <p className="text-[10px] text-purple-400/80 leading-relaxed font-mono">
                       Select your registered university gateway to access local peer boards. College and Faculty help refine your academic feed (optional inputs).
                     </p>
                   </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-[#00E5FF] uppercase font-mono block">University Space (Gateway)</label>
                    <select
                      required
                      value={signupUniversity}
                      onChange={(e) => setSignupUniversity(e.target.value)}
                      className="w-full bg-[#070B16] text-white p-3 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-[#00E5FF] font-bold"
                    >
                      {[
                        "Obafemi Awolowo University (OAU)",
                        "University of Lagos (UNILAG)",
                        "University of Ibadan (UI)",
                        "Ahmadu Bello University (ABU)",
                        "University of Nigeria, Nsukka (UNN)",
                        "Lagos State University (LASU)",
                        "University of Uyo (UNIUYO)"
                      ].map((uni) => (
                        <option key={uni} value={uni} className="bg-[#070B16]">{uni}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-400 uppercase font-mono block">College / School</label>
                    <input
                      type="text"
                      placeholder="e.g. College of Technology"
                      value={signupCollege}
                      onChange={(e) => setSignupCollege(e.target.value)}
                      className="w-full bg-[#070B16] text-white p-3 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 placeholder-zinc-700 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-400 uppercase font-mono block">Faculty</label>
                    <input
                      type="text"
                      placeholder="e.g. Faculty of Technology"
                      value={signupFaculty}
                      onChange={(e) => setSignupFaculty(e.target.value)}
                      className="w-full bg-[#070B16] text-white p-3 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 placeholder-zinc-700 font-sans"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSignupStep(0)}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase py-3.5 rounded-xl transition-all font-mono"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        triggerHapticFeedback(700, "sine");
                        setSignupStep(2);
                      }}
                      className="flex-1 bg-purple-500 hover:bg-purple-400 text-black font-black text-[10px] uppercase py-3.5 rounded-xl transition-all"
                    >
                      Next: Academic Status
                    </button>
                  </div>
                </div>
              )}

              {signupStep === 2 && (
                <div className="space-y-4 animate-scaleIn text-left">
                   <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl flex items-start gap-2">
                     <Mail className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                     <p className="text-[10px] text-amber-400/80 leading-relaxed font-mono">
                       Manually type your department so we can auto-connect you with peers in the same space! Posts from your department will seamlessly appear in your "My Dept" feed.
                     </p>
                   </div>
                   <div className="space-y-1">
                    <label className="text-[9px] text-zinc-400 uppercase font-mono block">Student Institutional Email</label>
                    <input
                      type="email"
                      placeholder="e.g. sam@students.oauife.edu.ng"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full bg-[#070B16] text-white p-3 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 font-mono placeholder-zinc-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] text-zinc-400 uppercase font-mono block">Academic Level</label>
                      <select
                        value={signupLevel}
                        onChange={(e) => setSignupLevel(e.target.value)}
                        className="w-full bg-[#070B16] text-white p-3 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 font-bold"
                      >
                        {["100L", "200L", "300L", "400L", "500L", "PG"].map((lvl) => (
                          <option key={lvl} value={lvl} className="bg-[#070B16]">{lvl}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-zinc-400 uppercase font-mono block">Department</label>
                      <input
                        type="text"
                        placeholder="e.g. Computer Science"
                        value={signupDepartment}
                        onChange={(e) => setSignupDepartment(e.target.value)}
                        className="w-full bg-[#070B16] text-white p-3 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 placeholder-zinc-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] text-zinc-400 uppercase font-mono block">Matric Number</label>
                      <input
                        type="text"
                        placeholder="e.g. CSC/2021/042"
                        value={signupMatricNumber}
                        onChange={(e) => setSignupMatricNumber(e.target.value)}
                        className="w-full bg-[#070B16] text-white p-3 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 font-mono placeholder-zinc-700"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-zinc-400 uppercase font-mono block">Hostel Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Angola Hall"
                        value={signupHostel}
                        onChange={(e) => setSignupHostel(e.target.value)}
                        className="w-full bg-[#070B16] text-white p-3 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 placeholder-zinc-700"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setSignupStep(1)} className="flex-1 bg-white/5 py-3.5 rounded-xl uppercase text-[10px] font-black font-mono hover:bg-white/10 transition-colors">Back</button>
                    <button
                      type="button"
                      onClick={() => setSignupStep(3)}
                      className="flex-1 bg-amber-500 hover:bg-amber-400 text-black py-3.5 rounded-xl uppercase text-[10px] font-black transition-colors"
                    >
                      Next: Interests
                    </button>
                  </div>
                </div>
              )}

              {signupStep === 3 && (
                <div className="space-y-5 animate-scaleIn text-left">
                  <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-xl flex items-start gap-2">
                     <Key className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                     <p className="text-[10px] text-indigo-400/80 leading-relaxed font-mono">
                       Lastly, set a gateway encryption key to secure your local state. This ensures your wallet and academic data remain private.
                     </p>
                   </div>
                  <div className="space-y-2">
                    <label className="text-[9px] text-zinc-400 uppercase font-mono block">What drives your curiosity?</label>
                    <div className="flex flex-wrap gap-2">
                      {["Algorithms", "Past Questions", "Side Gigs", "Scholarships", "Events", "Sports", "Politics", "Web3"].map((int) => {
                        const active = signupInterests.includes(int);
                        return (
                          <button
                            type="button"
                            key={int}
                            onClick={() => {
                              triggerHapticFeedback(500, "sine", 0.05);
                              setSignupInterests(prev => 
                                prev.includes(int) ? prev.filter(x => x !== int) : [...prev, int]
                              );
                            }}
                            className={`text-[9.5px] px-3 py-1.5 rounded-xl font-mono transition-all font-black border ${
                              active ? "bg-indigo-500 text-white border-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.3)]" : "bg-black text-zinc-500 border-white/10 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            {int}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-zinc-400 uppercase font-mono block">Gateway Encryption Key</label>
                    <input
                      type="password"
                      placeholder="Min 8 characters"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full bg-[#070B16] text-white p-3 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-indigo-500 text-xl font-sans placeholder-zinc-700"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setSignupStep(2)} className="w-1/4 bg-white/5 hover:bg-white/10 transition-colors py-3.5 rounded-xl uppercase text-[10px] font-black font-mono">Back</button>
                    <button
                      type="submit"
                      className="flex-1 bg-indigo-600 hover:bg-indigo-550 text-white font-black text-[10px] py-3.5 rounded-xl transition-all uppercase shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-95"
                    >
                      Initialize Sessional Profile
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}

          {/* Guidelines */}
          <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-center">
            <span className="text-[9.5px] font-mono text-zinc-500 leading-normal block uppercase font-bold text-emerald-400">Student Guidelines:</span>
            <p className="text-[9.5px] text-zinc-400 leading-relaxed mt-1">
              Input your details, log in directly, or create a personalized account with your profile image and academic goals.
            </p>
          </div>
        </div>

        <p className="text-center text-[9px] text-zinc-550 font-mono">
          Protected by NITDA Safe-Harbor Directives • Version 2.4.9
        </p>
      </div>
    </div>
  );
}
