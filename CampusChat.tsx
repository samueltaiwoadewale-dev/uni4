import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  MessageSquare, 
  Search, 
  Send, 
  Coins, 
  CreditCard, 
  Plus, 
  User, 
  CheckCheck, 
  ShieldAlert, 
  ChevronRight, 
  AlertCircle,
  HelpCircle,
  Clock,
  Zap,
  DollarSign,
  ArrowRight,
  Sparkles,
  FileText,
  Lock,
  Smartphone,
  CheckCircle2,
  LockKeyhole,
  Info
} from "lucide-react";

// ===================================
// PEER STUDENT DIRECTORY DATABASE
// ===================================
interface ChatPeer {
  id: string;
  name: string;
  handle: string;
  department: string;
  level: string;
  online: boolean;
  avatarBg: string;
  bio: string;
}

const PEER_STUDENTS: ChatPeer[] = [
  { id: "peer-1", name: "Tomiwa Ademola", handle: "tomiwa#4152", department: "Computer Science", level: "300L", online: true, avatarBg: "from-emerald-500 to-teal-600", bio: "Hacker, lexer design fan, building compilers." },
  { id: "peer-2", name: "Femi Adebayo", handle: "femi#8392", department: "Civil Engineering", level: "200L", online: true, avatarBg: "from-purple-500 to-indigo-600", bio: "Bridge modeler, searching sessional structural past exams." },
  { id: "peer-3", name: "Chinedu Okeke", handle: "chinedu#1094", department: "Electronic Engineering", level: "400L", online: false, avatarBg: "from-[#00E5FF] to-blue-600", bio: "RF signals enthusiast, tracking sessional shuttle delays." },
  { id: "peer-4", name: "Funmi Alao", handle: "funmi#6683", department: "Chemistry", level: "300L", online: true, avatarBg: "from-rose-500 to-pink-600", bio: "Organic formulas, peer test prep coordinator." },
  { id: "peer-5", name: "Olamide Bakare", handle: "olamide#3559", department: "Agricultural Science", level: "100L", online: false, avatarBg: "from-amber-500 to-yellow-600", bio: "Pre-degree graduate, focusing on general botany manuals." },
  { id: "peer-6", name: "Grace Johnson", handle: "grace#9112", department: "Nursing Science", level: "450L", online: true, avatarBg: "from-teal-400 to-cyan-600", bio: "First-aid taskforce rep for Moz hostel." },
  { id: "peer-7", name: "Mustapha Alawode", handle: "musty_rep#7023", department: "Computer Science", level: "300L", online: true, avatarBg: "from-blue-500 to-violet-600", bio: "Sub-rep, compiler algorithms enthusiast." }
];

interface ChatMessage {
  id: string;
  sender: "user" | "peer";
  text: string;
  timestamp: string;
}

interface CampusChatProps {
  userProfile?: {
    name: string;
    handle: string;
    level: string;
  };
  triggerHapticFeedback?: (freq: number, type?: "sine" | "triangle", duration?: number) => void;
}

// Automatic smart answers that correspond to student topics
const CHAT_SIMULATOR_RESPONSES = [
  "Nice! Actually I'm checking the CSC 305 past questions right now. Did you find the compiler design study guides?",
  "That sounds super. Meet me at Glass House after the Thermodynamics slot so we can double check.",
  "Great Ife! Power is back in Angola hall now. Did you find if Angola water queue has shortened?",
  "Awesome! Just completed the Vite coding task, about to upload past question sheets to the sessional drive.",
  "Confirm! Let's schedule study review loops before the next CBT assessment slot.",
  "Let's sync up later so we can consolidate past CBT question indexes!"
];

export default function CampusChat({
  userProfile,
  triggerHapticFeedback = () => {}
}: CampusChatProps) {
  // Chat Credit system. Starts at 50 free, saves to localStorage
  const [chatCredit, setChatCredit] = useState<number>(() => {
    const saved = localStorage.getItem("universe_chat_credit");
    if (saved !== null) {
      return parseInt(saved, 10);
    }
    return 50; // First use is free up to 50 messages
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [activePeer, setActivePeer] = useState<ChatPeer>(PEER_STUDENTS[0]);
  const [typedMessage, setTypedMessage] = useState("");
  const [conversations, setConversations] = useState<{ [peerId: string]: ChatMessage[] }>({});

  // Paywall states
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"form" | "loading" | "success">("form");
  const [selectedMobileNetwork, setSelectedMobileNetwork] = useState("card");

  // Mock billing values
  const [paymentCardNum, setPaymentCardNum] = useState("");
  const [paymentExpiry, setPaymentExpiry] = useState("");
  const [paymentCVV, setPaymentCVV] = useState("");

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversations, activePeer]);

  // Handle sessional credit saves
  useEffect(() => {
    localStorage.setItem("universe_chat_credit", chatCredit.toString());
  }, [chatCredit]);

  // Filter colleague directory
  const filteredPeers = useMemo(() => {
    return PEER_STUDENTS.filter(peer => {
      const q = searchQuery.toLowerCase();
      return (
        peer.name.toLowerCase().includes(q) ||
        peer.handle.toLowerCase().includes(q) ||
        peer.department.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const activeMessages = useMemo(() => {
    return conversations[activePeer.id] || [];
  }, [conversations, activePeer]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    // Check message quota limit
    if (chatCredit <= 0) {
      triggerHapticFeedback(330, "triangle", 0.3);
      setShowPaywallModal(true);
      return;
    }

    const newMessageId = `msg-user-${Date.now()}`;
    const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const freshMessage: ChatMessage = {
      id: newMessageId,
      sender: "user",
      text: typedMessage.trim(),
      timestamp: nowStr
    };

    triggerHapticFeedback(750, "sine", 0.08);

    // Consume 1 token from balance!
    const nextLimit = Math.max(0, chatCredit - 1);
    setChatCredit(nextLimit);

    // Append to conversation
    setConversations(prev => {
      const peerMsgs = prev[activePeer.id] || [];
      return {
        ...prev,
        [activePeer.id]: [...peerMsgs, freshMessage]
      };
    });

    setTypedMessage("");

    // Simulate instant peer response after 1.5s delay
    const targetPeerId = activePeer.id;
    setTimeout(() => {
      const responsePool = CHAT_SIMULATOR_RESPONSES;
      const responseText = responsePool[Math.floor(Math.random() * responsePool.length)];
      const peerResponse: ChatMessage = {
        id: `msg-peer-${Date.now()}`,
        sender: "peer",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setConversations(prev => {
        const peerMsgs = prev[targetPeerId] || [];
        return {
          ...prev,
          [targetPeerId]: [...peerMsgs, peerResponse]
        };
      });
      triggerHapticFeedback(600, "sine", 0.1);
    }, 1500);
  };

  const handleRechargeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHapticFeedback(600, "sine", 0.1);
    setIsProcessingPayment(true);
    setPaymentStep("loading");

    setTimeout(() => {
      triggerHapticFeedback(880, "sine", 0.35);
      setChatCredit(prev => prev + 100);
      setPaymentStep("success");
      setIsProcessingPayment(false);
    }, 3000);
  };

  const resetPaymentState = () => {
    setPaymentStep("form");
    setIsProcessingPayment(false);
    setShowPaywallModal(false);
    setPaymentCardNum("");
    setPaymentExpiry("");
    setPaymentCVV("");
  };

  return (
    <div className="space-y-6 text-left" id="universe-secure-chat-system">
      
      {/* Top Banner mapping usage quota */}
      <div className="bg-[#101424] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono tracking-wider font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              SECURE STUDENT CHAT
            </span>
          </div>
          <h3 className="text-sm font-bold text-white uppercase font-display select-none">
            Peer messaging portal
          </h3>
          <p className="text-[11px] text-zinc-500 font-semibold leading-relaxed">
            Message your colleagues securely. Look up colleague unique suffix codes (e.g. <strong className="text-zinc-300">#4152</strong>) to start chatting instantly.
          </p>
        </div>

        {/* Quota Indicators */}
        <div className="bg-zinc-950/65 border border-white/5 p-3 rounded-xl flex items-center gap-3 shrink-0 w-full sm:w-auto self-stretch sm:self-auto justify-between">
          <div className="space-y-0.5 text-left font-mono">
            <span className="text-[9px] text-zinc-500 uppercase font-black block">Available Quota:</span>
            <div className="flex items-center gap-1.5">
              <span className={`text-base font-black ${chatCredit > 10 ? "text-emerald-400" : "text-amber-500 animate-pulse"}`}>
                {chatCredit}
              </span>
              <span className="text-[10px] text-zinc-400 font-semibold">Messages Remaining</span>
            </div>
            {chatCredit <= 50 && chatCredit > 0 && (
              <span className="text-[8.5px] text-amber-500 font-bold block">First use: 50 free active texts!</span>
            )}
            {chatCredit === 0 && (
              <span className="text-[8.5px] text-rose-500 font-extrabold block">MESSAGE LIMIT EXHAUSTED</span>
            )}
          </div>

          <button
            onClick={() => {
              triggerHapticFeedback(700, "sine", 0.08);
              setPaymentStep("form");
              setShowPaywallModal(true);
            }}
            className="bg-emerald-500 hover:bg-emerald-400 text-black px-3 py-2 rounded-lg text-[10px] font-extrabold uppercase tracking-wider cursor-pointer transition-all flex items-center gap-1 shrink-0"
          >
            <Coins className="w-3.5 h-3.5" /> Recharge ₦500
          </button>
        </div>
      </div>

      {/* Main Grid: Left directory / Right Active session */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[500px] items-stretch">
        
        {/* Left Side: Directory search */}
        <div className="lg:col-span-4 bg-[#101424] border border-white/10 rounded-2xl flex flex-col justify-start overflow-hidden xl:min-h-[500px]">
          <div className="p-4 border-b border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5 text-left">
              <User className="w-4 h-4 text-emerald-400" /> Peer Directory ({filteredPeers.length})
            </h4>

            {/* Suffix Search bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute top-3 left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search name, handle (e.g. #4152)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-white/5 text-xs text-white p-2.5 pl-9 rounded-xl focus:outline-none focus:border-emerald-500 placeholder-zinc-500 font-semibold"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute top-3 right-3 text-zinc-500 hover:text-white text-xs cursor-pointer font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Directory listings */}
          <div className="flex-1 overflow-y-auto max-h-[350px] lg:max-h-[420px] divide-y divide-white/5 p-2 scrollbar-thin">
            {filteredPeers.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 font-mono text-xs">
                No verified colleague matched. Ensure code suffix is accurate.
              </div>
            ) : (
              filteredPeers.map(peer => {
                const isActive = activePeer.id === peer.id;
                return (
                  <button
                    key={peer.id}
                    onClick={() => {
                      triggerHapticFeedback(550, "sine", 0.08);
                      setActivePeer(peer);
                    }}
                    className={`w-full p-3 flex items-center gap-3 transition-colors rounded-xl text-left cursor-pointer ${
                      isActive ? "bg-white/5 border border-white/10" : "hover:bg-white/[0.02] border border-transparent"
                    }`}
                  >
                    {/* Circle Avatar */}
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${peer.avatarBg} shrink-0 flex items-center justify-center font-bold text-xs text-black uppercase relative shadow-inner`}>
                      {peer.name.charAt(0)}
                      {peer.online && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#101424] rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex justify-between items-baseline gap-1.5">
                        <span className="text-xs font-bold text-zinc-100 uppercase truncate">
                          {peer.name}
                        </span>
                        <span className="text-[8.5px] font-mono text-emerald-400 font-extrabold shrink-0">
                          {peer.level}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[10.5px] font-semibold text-zinc-500 font-mono">
                        <span className="truncate">@{peer.handle}</span>
                        <span className="text-[9px] text-zinc-600 truncate max-w-[80px]">{peer.department.split(" ")[0]}</span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Active screen */}
        <div className="lg:col-span-8 bg-[#101424] border border-white/10 rounded-2xl flex flex-col justify-between overflow-hidden relative xl:min-h-[500px]">
          
          {/* Channel Header */}
          <div className="p-4 border-b border-white/10 bg-slate-950/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${activePeer.avatarBg} flex items-center justify-center font-bold text-xs text-black uppercase relative shadow`}>
                {activePeer.name.charAt(0)}
                {activePeer.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#101424] rounded-full animate-ping" />
                )}
              </div>
              <div className="text-left">
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                  {activePeer.name} <span className="text-[9px] font-mono text-emerald-400">@{activePeer.handle}</span>
                </h4>
                <p className="text-[10px] text-zinc-500 font-semibold truncate max-w-xs block">
                  {activePeer.bio}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                activePeer.online ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-800 text-zinc-500"
              }`}>
                {activePeer.online ? "Encrypted Live Link" : "Offline Relay Cache"}
              </span>
            </div>
          </div>

          <div className="bg-indigo-500/10 border-b border-indigo-500/20 px-4 py-2 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
            <p className="text-[9.5px] text-indigo-300 font-mono leading-relaxed">
              <strong>Marketplace Policy:</strong> A seller must have successfully recharged their chat credit at least twice on the app before they can view buyer messages.
            </p>
          </div>

          {/* Chat thread box */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[300px] lg:max-h-[360px] bg-zinc-950/20 scrollbar-thin"
          >
            {activeMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                <MessageSquare className="w-8 h-8 text-zinc-700 animate-bounce" />
                <p className="text-xs text-zinc-500 font-sans font-semibold">
                  Start a conversation.
                </p>
                <p className="text-[10.5px] text-zinc-600 font-mono">
                  Type a hello below to say hi to your colleague!
                </p>
              </div>
            ) : (
              activeMessages.map(msg => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-1.5`}
                  >
                    {!isUser && (
                      <div className={`w-5 h-5 rounded bg-gradient-to-tr ${activePeer.avatarBg} text-[8px] font-black text-black flex items-center justify-center shrink-0`}>
                        {activePeer.name.charAt(0)}
                      </div>
                    )}

                    <div className="space-y-0.5 max-w-[75%] text-left">
                      <div className={`p-3 text-xs rounded-2xl leading-relaxed ${
                        isUser 
                          ? "bg-emerald-500 text-black font-extrabold rounded-br-none" 
                          : "bg-zinc-900 border border-white/5 text-zinc-200 font-medium rounded-bl-none"
                      }`}>
                        {msg.text}
                      </div>

                      <div className={`text-[8.5px] font-mono text-zinc-600 flex items-center gap-1 leading-none pt-0.5 ${isUser ? "justify-end" : "justify-start"}`}>
                        <span>{msg.timestamp}</span>
                        {isUser && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Secure text keyboard container */}
          <div className="p-3 border-t border-white/10 bg-slate-950/20 relative">
            
            {/* Limit Banner overlap when credits exhausted */}
            {chatCredit <= 0 && (
              <div className="absolute inset-0 bg-slate-950/90 flex items-center justify-between p-4 z-40">
                <div className="flex items-center gap-2.5">
                  <Lock className="w-4 h-4 text-amber-400 animate-pulse" />
                  <div className="text-left font-sans">
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      Messaging Locked: Limit Exhausted
                    </p>
                    <p className="text-[10.5px] text-zinc-400 font-semibold">
                      Your 50 free messages ended. Please recharge ₦500 for 100 messages.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    triggerHapticFeedback(700, "sine", 0.08);
                    setPaymentStep("form");
                    setShowPaywallModal(true);
                  }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black px-3 py-1.5 rounded-lg text-[9.5px] font-black uppercase tracking-wider cursor-pointer select-none transition-all flex items-center gap-1"
                >
                  <Coins className="w-3.5 h-3.5" /> RECHARGE ₦500 NOW
                </button>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                placeholder={chatCredit > 0 ? "Type securely... (calls & voice notes disabled)" : "Locked - Please recharge"}
                disabled={chatCredit <= 0}
                className="flex-1 bg-zinc-950 border border-white/5 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-emerald-500 placeholder-zinc-600 font-semibold"
              />
              <button
                type="submit"
                disabled={chatCredit <= 0 || !typedMessage.trim()}
                className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-900 disabled:text-zinc-600 text-black text-xs font-black uppercase px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 select-none"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* ========================================================
          PAYMENT PROCESSOR DIALOG OVERLAY (DRAWER)
          ======================================================== */}
      {showPaywallModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn select-none">
          <div className="bg-[#101424] border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            
            <button
              onClick={resetPaymentState}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer hover:rotate-90 transition-transform h-6 w-6 flex items-center justify-center bg-white/5 rounded-full"
            >
              ✕
            </button>

            {paymentStep === "form" && (
              <form onSubmit={handleRechargeSubmit} className="space-y-4 text-left">
                <div className="space-y-1.5 text-center pb-2 border-b border-white/10">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce" style={{ animationDuration: "3s" }}>
                    <LockKeyhole className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-display">
                    Secure Checkout
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-semibold">
                    You are recharging <strong className="text-emerald-400">100 messages</strong> for your account.
                  </p>
                </div>

                {/* Secure Price Indicator */}
                <div className="bg-[#070B16] border border-white/5 p-3 rounded-xl flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-semibold">Subscription Fee:</span>
                  <strong className="text-emerald-400 text-sm font-black">₦500.00</strong>
                </div>

                {/* Network Selection tab */}
                <div className="grid grid-cols-2 gap-2 bg-[#070B16] p-1 border border-white/5 rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      triggerHapticFeedback(550, "sine");
                      setSelectedMobileNetwork("card");
                    }}
                    className={`text-[9.5px] uppercase font-bold py-1.5 rounded transition-all cursor-pointer ${
                      selectedMobileNetwork === "card" ? "bg-emerald-500 text-black" : "text-zinc-400"
                    }`}
                  >
                    ATM Card
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      triggerHapticFeedback(550, "sine");
                      setSelectedMobileNetwork("transfer");
                    }}
                    className={`text-[9.5px] uppercase font-bold py-1.5 rounded transition-all cursor-pointer ${
                      selectedMobileNetwork === "transfer" ? "bg-emerald-500 text-black" : "text-zinc-400"
                    }`}
                  >
                    Bank Transfer
                  </button>
                </div>

                {selectedMobileNetwork === "card" ? (
                  <div className="space-y-3 font-mono text-[10.5px]">
                    <div className="space-y-1">
                      <label className="text-[9px] text-zinc-500 uppercase block">16-Digit ATM Card Number</label>
                      <input
                        type="text"
                        required
                        placeholder="5399 2142 9811 0942"
                        value={paymentCardNum}
                        onChange={(e) => setPaymentCardNum(e.target.value)}
                        className="w-full bg-[#070B16] text-white p-2.5 rounded-lg border border-white/10 focus:outline-none focus:border-emerald-500 text-center text-xs"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 uppercase block">Expiry Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={paymentExpiry}
                          onChange={(e) => setPaymentExpiry(e.target.value)}
                          className="w-full bg-[#070B16] text-white p-2.5 rounded-lg border border-white/10 focus:outline-none focus:border-emerald-500 text-center text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 uppercase block">Secret CVV</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          placeholder="•••"
                          value={paymentCVV}
                          onChange={(e) => setPaymentCVV(e.target.value)}
                          className="w-full bg-[#070B16] text-white p-2.5 rounded-lg border border-white/10 focus:outline-none focus:border-emerald-500 text-center text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-zinc-950/80 rounded-xl space-y-2 border border-white/5 font-mono text-[10.5px] text-zinc-300 text-left">
                    <span className="text-[9px] text-emerald-400 block">SIMULATION DEPOSIT DESTINATION:</span>
                    <p className="font-bold">Bank Name: <span className="text-white">UniVerse Secure Escrow Ltd</span></p>
                    <p className="font-bold">Account Number: <span className="text-white">994 021 3371</span></p>
                    <p className="text-[9.5px] text-zinc-500">
                      Transfer exactly ₦500 from your banking application, then click the handshake trigger below.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-[11px] uppercase py-3 rounded-xl transition-all cursor-pointer mt-2"
                >
                  Pay secure ₦500.00
                </button>
              </form>
            )}

            {paymentStep === "loading" && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                <p className="text-xs text-zinc-200 uppercase font-mono tracking-wider font-extrabold animate-pulse">
                  Processing Payment...
                </p>
                <p className="text-[10.5px] text-zinc-500">
                  Connecting to secure payment gateway.
                </p>
              </div>
            )}

            {paymentStep === "success" && (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center animate-ping" style={{ animationDuration: "2s" }}>
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-white uppercase font-display">
                    ₦500.00 Paid Successfully!
                  </h4>
                  <p className="text-xs text-emerald-400 font-mono font-bold">
                    +100 New Messages Credited
                  </p>
                  <p className="text-[10.5px] text-zinc-500 leading-relaxed font-semibold max-w-xs block mx-auto pt-1 font-sans">
                    Your credit now stands at <strong className="text-white">{chatCredit}</strong>. Continue looking up colleague unique suffix codes on your campus hub.
                  </p>
                </div>

                <button
                  onClick={resetPaymentState}
                  className="bg-white/10 hover:bg-white/15 border border-white/5 text-white px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                >
                  Return to sessional board
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
