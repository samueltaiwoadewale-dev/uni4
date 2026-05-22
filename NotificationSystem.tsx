import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Sparkles, 
  MessageCircle, 
  FileText, 
  CheckCircle, 
  Flame, 
  Mail, 
  Award, 
  Clock, 
  AlertTriangle, 
  RefreshCw, 
  Send, 
  Sliders, 
  Smartphone, 
  Volume2, 
  ShieldCheck, 
  Heart, 
  Share2, 
  Filter, 
  Star, 
  Info, 
  Moon, 
  Zap, 
  Database, 
  ArrowRight, 
  Settings, 
  Radio,
  Terminal,
  VolumeX,
  ShieldAlert,
  Calendar,
  Layers,
  Check,
  User,
  Plus
} from "lucide-react";

// ==========================================
// MOCK NOTIFICATIONS DATABASE
// ==========================================
interface SessionalNotification {
  id: string;
  category: "reply" | "mention" | "announcement" | "academic" | "gig" | "event";
  title: string;
  senderName: string;
  senderHandle: string;
  message: string;
  time: string;
  read: boolean;
  priority: "high" | "medium" | "low";
  iconName: any;
  subText?: string;
}

const INITIAL_MOCK_NOTIFICATIONS: SessionalNotification[] = [];

export default function NotificationSystem({ 
  userProfile, 
  triggerHapticFeedback 
}: { 
  userProfile?: any;
  triggerHapticFeedback: (freq: number, type?: "sine" | "triangle", duration?: number) => void;
}) {
  const [notifications, setNotifications] = useState<SessionalNotification[]>(INITIAL_MOCK_NOTIFICATIONS);
  const [activePlaybookTab, setActivePlaybookTab] = useState<number>(1);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  
  // Settings Console States
  const [emailDigests, setEmailDigests] = useState<boolean>(true);
  const [pushMentions, setPushMentions] = useState<boolean>(true);
  const [pushReplies, setPushReplies] = useState<boolean>(true);
  const [quietHours, setQuietHours] = useState<boolean>(false);
  const [facultyOnlyAlerts, setFacultyOnlyAlerts] = useState<boolean>(false);
  const [priorityThreshold, setPriorityThreshold] = useState<"all" | "high_only">("all");
  
  // Custom interactive mock simulation states
  const [isAlertSubmitting, setIsAlertSubmitting] = useState<boolean>(false);
  const [customNotifText, setCustomNotifText] = useState<string>("");
  const [customNotifCategory, setCustomNotifCategory] = useState<"reply" | "mention" | "announcement" | "academic" | "gig" | "event">("academic");
  const [customNotifPriority, setCustomNotifPriority] = useState<"high" | "medium" | "low">("high");
  
  // Global Telemetry log logs
  const [sysLogs, setSysLogs] = useState<string[]>([
    "[SYSTEM INITIALIZED] Sessional Notification Delivery Worker booted successfully.",
    "[SSE ROUTE] Listened successfully to push endpoint /api/events/notifications.",
    "[PUSH CHANNELS] Registered Firebase Cloud Messaging (FCM) Web Push device keys."
  ]);

  // Log adding helper
  const addLog = (msg: string) => {
    const timestampStr = new Date().toTimeString().split(" ")[0];
    setSysLogs(prev => [`[${timestampStr}] ${msg}`, ...prev.slice(0, 8)]);
  };

  // Triggering notification simulation helper
  const triggerSimulation = (type: "cbt" | "reply" | "announcement") => {
    triggerHapticFeedback(820, "triangle", 0.15);
    let newNotif: SessionalNotification;

    if (type === "cbt") {
      newNotif = {
        id: `sim-${Date.now()}`,
        category: "academic",
        title: "⚠️ URGENT: CHM 101 Test Postponed",
        senderName: "Exam Board Secretary",
        senderHandle: "@exam_board",
        message: "Due to solar power inverter outages in the CBT hall, the CHM 101 exam slated for 9:00 AM has been shifted to Monday. Please inform your faculty reps.",
        time: "Just now",
        read: false,
        priority: "high",
        iconName: AlertTriangle,
        subText: "Critical: General Science Dept"
      };
      addLog("Broadcast: High-Priority CBT reschedule packet dispatched to Science Hub.");
    } else if (type === "reply") {
      newNotif = {
        id: `sim-${Date.now()}`,
        category: "reply",
        title: "💬 New Comment On Your Post",
        senderName: "Ibiye Akoka",
        senderHandle: "@ibiye_codes",
        message: "Bro, this is legendary! Let's submit this proposal directly to the sessional student union repo.",
        time: "Just now",
        read: false,
        priority: "medium",
        iconName: MessageCircle,
        subText: "Topic: Platform Architecture Plan"
      };
      addLog("Client Push: User reply event synchronized via WebSocket socket.");
    } else {
      newNotif = {
        id: `sim-${Date.now()}`,
        category: "announcement",
        title: "⚡ UNIVERSE: Sessional Updates Alert",
        senderName: "Dean of Student Affairs",
        senderHandle: "@sac_dean",
        message: "Secure hostel gating policies revised for sessional students. Curfew starts strictly at 11:30 PM. Verify biometric registrations.",
        time: "Just now",
        read: false,
        priority: "medium",
        iconName: Flame,
        subText: "Global Announcement Target"
      };
      addLog("Edge Bulletin: Dynamic anycast announce frame deployed to all hostels.");
    }

    setNotifications(prev => [newNotif, ...prev]);
  };

  // Creating custom custom notification
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNotifText.trim()) return;

    setIsAlertSubmitting(true);
    triggerHapticFeedback(650, "sine", 0.1);

    setTimeout(() => {
      const getCategoryIcon = (cat: string) => {
        switch(cat) {
          case "academic": return AlertTriangle;
          case "reply": return MessageCircle;
          case "mention": return Sparkles;
          case "announcement": return Flame;
          case "gig": return Award;
          default: return Calendar;
        }
      };

      const newNotif: SessionalNotification = {
        id: `custom-sim-${Date.now()}`,
        category: customNotifCategory,
        title: `Dynamic ${customNotifCategory.toUpperCase()} Hub Alert`,
        senderName: userProfile?.name || "Sam Dev",
        senderHandle: `@${userProfile?.handle || "sam_dev_oau"}`,
        message: customNotifText,
        time: "Just now",
        read: false,
        priority: customNotifPriority,
        iconName: getCategoryIcon(customNotifCategory),
        subText: `Department: ${userProfile?.level || "300L"} Space Filter`
      };

      setNotifications(prev => [newNotif, ...prev]);
      setCustomNotifText("");
      setIsAlertSubmitting(false);
      addLog(`Custom simulated notif (${customNotifCategory}) emitted targeting [${customNotifPriority.toUpperCase()}] stream.`);
    }, 450);
  };

  // Toggle mark single notification read
  const toggleReadStatus = (id: string) => {
    triggerHapticFeedback(500, "sine", 0.05);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
    addLog(`Adjusted status of notification ${id}.`);
  };

  // Clear all alerts
  const clearAllNotifications = () => {
    triggerHapticFeedback(450, "triangle", 0.15);
    setNotifications([]);
    addLog("Evicted all active notifications from client memory store.");
  };

  const filteredNotifications = notifications.filter(notif => {
    // Filter by Read Settings Filter high_only
    if (priorityThreshold === "high_only" && notif.priority !== "high") return false;
    
    // Filter by Category
    if (activeCategoryFilter !== "all" && notif.category !== activeCategoryFilter) return false;

    // Filter by Priority
    if (priorityFilter !== "all" && notif.priority !== priorityFilter) return false;

    return true;
  });

  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  return (
    <div id="universe-notifications-center" className="space-y-8 animate-fadeIn text-left select-none">
      
      {/* HEADER SECTION PANEL */}
      <div className="bg-gradient-to-r from-indigo-950/20 via-[#101424] to-indigo-950/10 border border-white/10 rounded-2xl p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-indigo-400 animate-ping" />
            <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-black bg-indigo-550/10 px-2.5 py-0.5 border border-indigo-500/15 rounded-full">
              Real-Time Notifications Hub
            </span>
          </div>
          <h2 className="text-2xl font-black text-white font-display tracking-tight uppercase">
            UniVerse Broadcast & Smart Prioritization Center
          </h2>
          <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
            Students face severe notifications fatigue and battery drainage on heavy social networks. Examine our dual **Intelligent Client-Side Prioritization** and **Zero-Spam Exponential Decay** blueprints designed for efficient data transmission.
          </p>
        </div>

        {/* Global Alert Metrics Panel */}
        <div className="bg-zinc-950/80 border border-white/5 p-4 rounded-xl flex items-center gap-6 shrink-0 w-full sm:w-auto">
          <div className="space-y-0.5 text-left">
            <span className="text-[9px] text-zinc-500 uppercase font-bold block leading-none">Unread Alerts</span>
            <span className="text-xl font-black text-rose-400 font-mono block">
              🔔 {getUnreadCount()} <sub className="text-[10px] text-zinc-500">Unread</sub>
            </span>
            <span className="text-[9.5px] text-zinc-400 font-medium block">Active local buffer queue</span>
          </div>

          <div className="h-8 w-px bg-white/10"></div>

          <div className="space-y-0.5 text-left">
            <span className="text-[9px] text-zinc-500 uppercase font-bold block leading-none">Smart Filters</span>
            <span className="text-xl font-black text-[#00E5FF] font-mono block">
              {priorityThreshold === "high_only" ? "Active High" : "Allow All"}
            </span>
            <span className="text-[9.5px] text-[#00E5FF]/80 font-semibold block">Prioritization Active</span>
          </div>
        </div>
      </div>

      {/* THREE SIMULATION CONTROLLERS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ================= LEFT CONTROLS: PRESET DEPLOYERS & PREFERRED SETTINGS ================= */}
        <div className="lg:col-span-4 bg-[#101424] border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-5">
          
          <div className="space-y-4">
            
            <div className="space-y-1">
              <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#00E5FF]" /> Mock Signal Dispatcher
              </h3>
              <p className="text-[11px] text-zinc-500 font-semibold leading-relaxed">
                Fire mock sessional events directly down the telemetry loop to monitor priorities.
              </p>
            </div>

            {/* Quick Presets Deployers */}
            <div className="space-y-2">
              <button 
                onClick={() => triggerSimulation("cbt")}
                className="w-full text-left p-2.5 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 rounded-xl transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-450" />
                  <div>
                    <span className="text-[11.5px] font-bold text-white block">Reschedule Exam CA</span>
                    <span className="text-[9.5px] text-zinc-500 block">Critical • Targets Department</span>
                  </div>
                </div>
                <span className="text-[8.5px] text-rose-450 font-black font-mono border border-rose-550/25 px-1.5 py-0.5 rounded bg-rose-500/10">HIGH</span>
              </button>

              <button 
                onClick={() => triggerSimulation("reply")}
                className="w-full text-left p-2.5 bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20 rounded-xl transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-blue-450" />
                  <div>
                    <span className="text-[11.5px] font-bold text-white block">Sessional Peer Reply</span>
                    <span className="text-[9.5px] text-zinc-500 block">User Event • WebSocket Push</span>
                  </div>
                </div>
                <span className="text-[8.5px] text-blue-450 font-black font-mono border border-blue-550/25 px-1.5 py-0.5 rounded bg-blue-500/10">MED</span>
              </button>

              <button 
                onClick={() => triggerSimulation("announcement")}
                className="w-full text-left p-2.5 bg-purple-500/10 hover:bg-purple-500/15 border border-purple-500/20 rounded-xl transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-purple-440" />
                  <div>
                    <span className="text-[11.5px] font-bold text-white block">Hostel Curfew Shift</span>
                    <span className="text-[9.5px] text-zinc-500 block">Global Info • Regional CDN Cache</span>
                  </div>
                </div>
                <span className="text-[8.5px] text-purple-440 font-black font-mono border border-purple-550/25 px-1.5 py-0.5 rounded bg-purple-500/10">MED</span>
              </button>
            </div>

            {/* Custom Interactive alerts form */}
            <form onSubmit={handleCustomSubmit} className="space-y-3 pt-3 border-t border-white/5 text-left">
              <span className="text-[10px] uppercase tracking-wider font-mono text-zinc-400 font-bold block">
                Deploy Custom Campus Signal
              </span>

              <div className="space-y-1.5">
                <input
                  type="text"
                  required
                  placeholder="Enter dynamic alert message text..."
                  value={customNotifText}
                  onChange={(e) => setCustomNotifText(e.target.value)}
                  className="w-full bg-zinc-950 p-2 text-xs rounded-xl border border-white/10 text-white focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-[8.5px] font-mono text-zinc-550 block uppercase font-bold">Category</span>
                  <select
                    value={customNotifCategory}
                    onChange={(e) => setCustomNotifCategory(e.target.value as any)}
                    className="w-full bg-zinc-950 text-xs p-1.5 rounded-lg border border-white/5 text-zinc-300 outline-none"
                  >
                    <option value="academic">Academic 📚</option>
                    <option value="reply">Comment Reply 💬</option>
                    <option value="mention">Mention Spark ✨</option>
                    <option value="announcement">Bulletin 📢</option>
                    <option value="gig">Careers & Gigs 💼</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="text-[8.5px] font-mono text-zinc-550 block uppercase font-bold">Priority Target</span>
                  <select
                    value={customNotifPriority}
                    onChange={(e) => setCustomNotifPriority(e.target.value as any)}
                    className="w-full bg-zinc-950 text-xs p-1.5 rounded-lg border border-white/5 text-zinc-300 outline-none"
                  >
                    <option value="high">High Channel [ALERT]</option>
                    <option value="medium">Medium Channel [INFO]</option>
                    <option value="low">Low Channel [BATCH]</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isAlertSubmitting || !customNotifText.trim()}
                className="w-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-30 text-black font-extrabold text-[10.5px] uppercase py-2 rounded-xl transition-all cursor-pointer text-center"
              >
                {isAlertSubmitting ? "Transmitting..." : "Emit Dynamic Alert"}
              </button>
            </form>

          </div>

          {/* User Specific Preference Settings Dashboard */}
          <div className="bg-zinc-950/70 border border-white/5 p-4 rounded-xl space-y-3.5 text-left">
            <span className="text-[9.5px] font-mono text-indigo-405 uppercase font-black tracking-widest block">
              🔧 Target User Push Preferences
            </span>

            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer text-zinc-300 hover:text-white transition-colors">
                <span>Enable System Email Digests:</span>
                <input 
                  type="checkbox" 
                  checked={emailDigests} 
                  onChange={(e) => {
                    setEmailDigests(e.target.checked);
                    addLog(`Email digest configurations toggled to: ${e.target.checked}`);
                  }}
                  className="accent-indigo-400 cursor-pointer w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer text-zinc-300 hover:text-white transition-colors">
                <span>Instant Push Mentions:</span>
                <input 
                  type="checkbox" 
                  checked={pushMentions} 
                  onChange={(e) => {
                    setPushMentions(e.target.checked);
                    addLog(`Notifications: Push mentions toggled to: ${e.target.checked}`);
                  }}
                  className="accent-indigo-400 cursor-pointer w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer text-zinc-300 hover:text-white transition-colors">
                <span>Instant Comments Replies:</span>
                <input 
                  type="checkbox" 
                  checked={pushReplies} 
                  onChange={(e) => {
                    setPushReplies(e.target.checked);
                    addLog(`Notifications: Push replies toggled to: ${e.target.checked}`);
                  }}
                  className="accent-indigo-400 cursor-pointer w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer text-zinc-300 hover:text-white transition-colors">
                <span>Sessional Quiet Hour block:</span>
                <input 
                  type="checkbox" 
                  checked={quietHours} 
                  onChange={(e) => {
                    setQuietHours(e.target.checked);
                    addLog(`Quiet hours toggled to: ${e.target.checked}`);
                  }}
                  className="accent-indigo-400 cursor-pointer w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer text-zinc-300 hover:text-white transition-colors">
                <span>Faculty-Only Broadcast Filter:</span>
                <input 
                  type="checkbox" 
                  checked={facultyOnlyAlerts} 
                  onChange={(e) => {
                    setFacultyOnlyAlerts(e.target.checked);
                    addLog(`Hostel broadcast restriction toggled to: ${e.target.checked}`);
                  }}
                  className="accent-indigo-400 cursor-pointer w-4 h-4"
                />
              </label>
            </div>
          </div>

        </div>

        {/* ================= CENTER COLUMN: INTERACTIVE NOTIFICATIONS FEED VIEW (8 COLS) ================= */}
        <div className="lg:col-span-8 bg-[#101424] border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            
            {/* Filter headers panel */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/5 pb-3">
              <div className="space-y-1">
                <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-rose-450 animate-pulse" /> Live Client Alerts Loop
                </h3>
                <p className="text-[11px] text-zinc-500 font-semibold text-left">
                  Managing active notifications. Filter by metadata, urgency, or sessional targets.
                </p>
              </div>

              {/* Action utilities */}
              <div className="flex gap-2 w-full sm:w-auto self-end font-mono">
                <select
                  value={priorityThreshold}
                  onChange={(e) => {
                    setPriorityThreshold(e.target.value as any);
                    triggerHapticFeedback(500, "sine", 0.05);
                  }}
                  className="bg-zinc-950 text-[10px] uppercase font-bold p-1 px-2 border border-white/10 rounded text-amber-400 outline-none"
                >
                  <option value="all">Allow All Priorities</option>
                  <option value="high_only">⚠️ High-Priority Channel Only</option>
                </select>

                <button 
                  onClick={clearAllNotifications}
                  className="text-[10px] text-zinc-500 hover:text-white bg-zinc-950 px-2 py-1 rounded border border-white/5 uppercase transition-all"
                >
                  Empty Loop
                </button>
              </div>
            </div>

            {/* Sub-Category pills bar */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 font-mono text-[9px] uppercase font-bold text-zinc-400">
              {[
                { id: "all", label: "All Alerts 🌐" },
                { id: "academic", label: "Academics 📚" },
                { id: "mention", label: "Mentions ✨" },
                { id: "reply", label: "Comments 💬" },
                { id: "announcement", label: "Bulletins 📢" },
                { id: "gig", label: "Gigs 💼" }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => {
                    setActiveCategoryFilter(pill.id);
                    triggerHapticFeedback(550, "sine", 0.05);
                  }}
                  className={`py-1.5 px-3 rounded-lg border cursor-pointer transition-all shrink-0 ${
                    activeCategoryFilter === pill.id 
                      ? "bg-indigo-550/15 border-indigo-500/30 text-indigo-400" 
                      : "bg-[#101424] hover:bg-white/[0.02] border-white/5 hover:text-white text-zinc-500"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* List notifications panel */}
            <div className="space-y-2 max-h-[310px] overflow-y-auto pr-1">
              {filteredNotifications.length === 0 ? (
                <div className="h-40 bg-zinc-950/40 rounded-xl border border-white/5 flex flex-col items-center justify-center p-4 text-center space-y-2">
                  <ShieldCheck className="w-8 h-8 text-zinc-600" />
                  <div>
                    <span className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">No Alerts Active</span>
                    <span className="text-[10.5px] text-zinc-550 block max-w-xs">
                      All caught up! Active quiet filtering or constraints cleared up the current notifications queue.
                    </span>
                  </div>
                </div>
              ) : (
                filteredNotifications.map((notif) => {
                  const NotifIcon = notif.iconName;
                  return (
                    <div 
                      key={notif.id}
                      className={`p-3.5 rounded-xl border transition-all text-left flex gap-3 items-start relative overflow-hidden ${
                        !notif.read 
                          ? "bg-indigo-500/[0.03] border-indigo-500/25 ring-1 ring-indigo-500/10" 
                          : "bg-zinc-950/20 border-white/5 text-zinc-400"
                      }`}
                    >
                      {/* Priority Left Ribbon indicator */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                        notif.priority === "high" ? "bg-rose-500" :
                        notif.priority === "medium" ? "bg-amber-400" :
                        "bg-zinc-600"
                      }`}></div>

                      {/* Icon */}
                      <div className={`p-2 rounded-lg shrink-0 ${
                        notif.priority === "high" ? "bg-rose-550/15 text-rose-450" :
                        notif.priority === "medium" ? "bg-amber-500/10 text-amber-400" :
                        "bg-white/5 text-zinc-500"
                      }`}>
                        <NotifIcon className="w-4 h-4" />
                      </div>

                      {/* Content details */}
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start flex-wrap gap-1 leading-none">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[12.5px] font-black text-white">{notif.title}</span>
                            <span className="text-[10px] text-zinc-500 font-mono">{notif.senderHandle}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-[9.5px] font-mono text-zinc-500">{notif.time}</span>
                            
                            {/* Read trigger */}
                            <button
                              onClick={() => toggleReadStatus(notif.id)}
                              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                                notif.read 
                                  ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" 
                                  : "border-white/10 text-zinc-600 hover:text-white"
                              }`}
                              title={notif.read ? "Mark as unread" : "Mark as read"}
                            >
                              <Check className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-zinc-300 leading-relaxed font-sans mt-1">
                          {notif.message}
                        </p>

                        {notif.subText && (
                          <div className="pt-1 select-none flex items-center gap-1 text-[9.5px] text-zinc-500 uppercase font-bold font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                            <span>{notif.subText}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Live systems telemetry logger */}
            <div className="bg-zinc-950 border border-white/5 p-3 rounded-xl font-mono text-[10px] text-zinc-500 max-h-[105px] overflow-y-auto space-y-1 relative">
              <span className="absolute top-2 right-2 text-[8px] uppercase tracking-wider font-extrabold text-zinc-650 flex items-center gap-1">
                <Terminal className="w-3 h-3 text-zinc-600" /> log terminal
              </span>

              {sysLogs.map((log, i) => (
                <div key={i} className={`flex items-start gap-1 p-0.5 truncate leading-none ${i === 0 ? "text-[#00E5FF]" : ""}`}>
                  <span className="text-zinc-750 select-none mr-1 inline-block">❯</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Action bar */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-white/5 items-center justify-between">
            <div className="flex items-center gap-2 text-[10.5px] text-zinc-500 font-semibold text-left">
              <ShieldAlert className="w-4 h-4 text-emerald-450 shrink-0" />
              <span>
                System filters alert spikes dynamically using individual <strong>Hostel Broadcast Tokens</strong>.
              </span>
            </div>

            <span className="text-[10px] font-mono font-black text-rose-500 uppercase bg-rose-500/10 border border-rose-500/15 py-1 px-3 rounded-xl">
              Quiet Buffer Status: SAFE ZONE
            </span>
          </div>

        </div>

      </div>

      {/* ========================================================
          10-POINT ARCHITECTURE GUIDELINES FOR REAL-TIME NOTIFS
          ======================================================== */}
      <div className="bg-[#101424] border border-white/10 rounded-2xl p-6 space-y-5">
        
        <div className="border-b border-white/10 pb-4 space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h3 className="text-xs font-black text-white uppercase tracking-widest font-mono">
              Notifications Engineering Blueprint & Specifications (10-Stage Manual)
            </h3>
          </div>
          <p className="text-[11px] text-zinc-550 font-semibold text-left">
            A comprehensive, modular architectural review covering security validation, transport mechanisms, smart decay, and cost optimization.
          </p>
        </div>

        {/* Playbook selectors */}
        <div className="flex flex-wrap gap-1 bg-zinc-950 p-1.5 rounded-xl border border-white/5 font-mono text-[9.5px] uppercase font-bold select-none text-zinc-500">
          {[
            { id: 1, label: "1. PubSub Spec" },
            { id: 2, label: "2. Real-Time WS" },
            { id: 3, label: "3. Prioritize" },
            { id: 4, label: "4. Web Push" },
            { id: 5, label: "5. UX Mockups" },
            { id: 6, label: "6. User Settings" },
            { id: 7, label: "7. Engagement" },
            { id: 8, label: "8. Spam-Filter" },
            { id: 9, label: "9. Node Back" },
            { id: 10, label: "10. Low Host Bills" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePlaybookTab(item.id)}
              className={`flex-1 min-w-[90px] text-center py-2 px-2.5 rounded-lg border cursor-pointer transition-all ${
                activePlaybookTab === item.id 
                  ? "bg-indigo-500 text-black font-black border-transparent shadow-md" 
                  : "bg-transparent hover:text-white hover:bg-white/[0.02] border-transparent"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content detail rendering */}
        <div className="bg-zinc-950/60 rounded-xl p-5 border border-white/5 text-left leading-relaxed text-zinc-350">
          
          {activePlaybookTab === 1 && (
            <div className="space-y-4 animate-fadeIn text-xs sm:text-sm">
              <h4 className="text-sm font-bold text-white uppercase font-display flex items-center gap-2 text-indigo-405 leading-none">
                <Layers className="w-4 h-4" /> 1. Granular PubSub Notification Architecture
              </h4>
              <p className="text-zinc-400 text-xs">
                To route millions of sessional updates with sub-millisecond lag, UniVerse avoids traditional long polar queues in SQL. Instead, we use a decentralized, transactional envelope schema.
              </p>
              
              <ul className="space-y-3 pl-4 list-disc text-xs text-zinc-400">
                <li>
                  <strong className="text-white">Structured Event Envelope Schema:</strong>
                  <pre className="mt-2 p-2 bg-zinc-950 rounded-lg text-[10px] text-indigo-400 font-mono text-left block border border-white/5 whitespace-pre">
{`{
  "eventId": "evt-38491749",
  "topic": "oau:csc:300l:class_cancel",
  "severity": "CRITICAL",
  "payload": {
    "title": "CSC 301 Postponement",
    "message": "Dean shifted compiler laboratory test"
  },
  "recipientTarget": "ROLE_STUDENTS_LEVEL_300L",
  "timestamp": 1779247180
}`}
                  </pre>
                </li>
                <li>
                  <strong className="text-white">Decoupled Channel Hubs:</strong> Target alert distribution dynamically through sub-segment addresses matching school, faculty (e.g., `oau:tech`), department, year, or custom user tags.
                </li>
              </ul>
            </div>
          )}

          {activePlaybookTab === 2 && (
            <div className="space-y-4 animate-fadeIn text-xs sm:text-sm">
              <h4 className="text-sm font-bold text-white uppercase font-display flex items-center gap-2 text-indigo-450 leading-none">
                <Radio className="w-4 h-4" /> 2. Dual Real-time transport (WebSockets & SSE Channels)
              </h4>
              <p className="text-zinc-400 text-xs">
                Maintain optimal throughput levels based on active student connectivity classes.
              </p>
              
              <ul className="space-y-3 pl-4 list-disc text-xs text-zinc-400">
                <li>
                  <strong className="text-white">Server-Sent Events (SSE) for Passive Feeds:</strong> Use unidirectional SSE streams for general feed updates, trending tag spikes, and campus marketplace bids. Highly stable and automatically tries reconnection.
                </li>
                <li>
                  <strong className="text-white">Sticky WebSockets (WS) for Active Conversations:</strong> Switch to bidirectional WS connections exclusively inside Sessional Chat rooms or active CBT collaboration boards, minimizing data loop costs.
                </li>
                <li>
                  <strong className="text-white">Active Heartbeats & Dynamic Backoffs:</strong> Protect battery consumption by checking network ping offsets and backing off connection queries exponentially when signals degrade.
                </li>
              </ul>
            </div>
          )}

          {activePlaybookTab === 3 && (
            <div className="space-y-4 animate-fadeIn text-xs sm:text-sm">
              <h4 className="text-sm font-bold text-white uppercase font-display flex items-center gap-2 text-indigo-405 leading-none">
                <Sliders className="w-4 h-4" /> 3. Smart Urgent Prioritization Channels
              </h4>
              <p className="text-zinc-400 text-xs">
                To shield students from overwhelming notification lists, we separate sessional feeds into 3 strict Priority Rings.
              </p>
              
              <ul className="space-y-3 pl-4 list-disc text-xs text-zinc-400">
                <li>
                  <strong className="text-white">Ring 1 [CRITICAL - Immediate Push]:</strong> CBT reschedules, exam venue allocations, or personal account biometric security locks. Deployed using instant FCM pushes with sound/device screen waking.
                </li>
                <li>
                  <strong className="text-white">Ring 2 [ENGAGEMENT - Batch Alerts]:</strong> Mentions, Direct Message reactions, or department announcements. Bundled together and pushed hourly as quiet summary envelopes.
                </li>
                <li>
                  <strong className="text-white">Ring 3 [BULLETIN - Pull Feeds]:</strong> Gigs allocations, course additions, or general trending interests. These bypass device locks completely and are fetched only when users open the app.
                </li>
              </ul>
            </div>
          )}

          {activePlaybookTab === 4 && (
            <div className="space-y-4 animate-fadeIn text-xs sm:text-sm">
              <h4 className="text-sm font-bold text-white uppercase font-display flex items-center gap-2 text-indigo-405 leading-none">
                <Smartphone className="w-4 h-4" /> 4. High-Efficiency Web Push Protocols (FCM Native Nodes)
              </h4>
              <p className="text-zinc-400 text-xs">
                To wake locked mobile screens without keeping heavy daemon services running in background loops:
              </p>
              
              <ul className="space-y-3 pl-4 list-disc text-xs text-zinc-400">
                <li>
                  <strong className="text-white">Low-Payload FCM Structures:</strong> Encrypt push payloads down to sub-1KB bytes. Mobile browsers decrypt the frames locally via a custom **Service Worker** background file.
                </li>
                <li>
                  <strong className="text-white">Automatic Device Key Handshakes:</strong> Store active push tokens cleanly inside a Redis Key Store index. When students switch devices, evict old certificates automatically to suppress double-receipt loops.
                </li>
                <li>
                  <strong className="text-white">Silent Push Payloads:</strong> Send silent background synchronization signals that update local IndexedDB indexes without triggering vibrate cues, keeping battery usage safe.
                </li>
              </ul>
            </div>
          )}

          {activePlaybookTab === 5 && (
            <div className="space-y-4 animate-fadeIn text-xs sm:text-sm">
              <h4 className="text-sm font-bold text-white uppercase font-display flex items-center gap-2 text-indigo-405 leading-none">
                <Bell className="w-4 h-4" /> 5. Micro-UX & Sessional Alerts organization
              </h4>
              <p className="text-zinc-400 text-xs">
                The UI layout is optimized for high readability, easy dismissal, and zero confusion.
              </p>
              
              <ul className="space-y-3 pl-4 list-disc text-xs text-zinc-400">
                <li>
                  <strong className="text-white">Dynamic Header Badges:</strong> Display a tiny numerical alert indicator on the top navigation bar. Opening the drawer automatically marks high-priority alerts as read to keep clutter low.
                </li>
                <li>
                  <strong className="text-white">Actionable Interactive Triggers:</strong> Include rapid inline interactions like "Join Space" or "Accept Gig" directly within notification cards, skipping load screens.
                </li>
                <li>
                  <strong className="text-white">Aesthetic Grouping:</strong> Group successive alerts targeting the same thread into a unified card block carrying thread avatars, avoiding stream flood.
                </li>
              </ul>
            </div>
          )}

          {activePlaybookTab === 6 && (
            <div className="space-y-4 animate-fadeIn text-xs sm:text-sm">
              <h4 className="text-sm font-bold text-white uppercase font-display flex items-center gap-2 text-indigo-405 leading-none">
                <Settings className="w-4 h-4" /> 6. Fine-grained User Preference settings
              </h4>
              <p className="text-zinc-400 text-xs">
                Let students dominate their feedback rules so the platform feels helpful and respectful.
              </p>
              
              <ul className="space-y-3 pl-4 list-disc text-xs text-zinc-400">
                <li>
                  <strong className="text-white">Quiet Hours Automation:</strong> Allow configuration of quiet slots during study hours (like 11:00 PM - 6:00 AM) where alerts are stored silently in SQL rather than triggering haptics.
                </li>
                <li>
                  <strong className="text-white">Topic Opt-outs:</strong> Enable granular switches to opt-out of high-frequency rooms (like `#gigs-marketplace` or general campus gossips), while keeping academic channels locked.
                </li>
                <li>
                  <strong className="text-white">Dynamic Digests:</strong> Toggle standard push intervals into single daily email updates containing the compilation of matches compiled cleanly.
                </li>
              </ul>
            </div>
          )}

          {activePlaybookTab === 7 && (
            <div className="space-y-4 animate-fadeIn text-xs sm:text-sm">
              <h4 className="text-sm font-bold text-white uppercase font-display flex items-center gap-2 text-indigo-451 leading-none">
                <Flame className="w-4 h-4" /> 7. Engagement Optimizations (Smart digests, event anchors)
              </h4>
              <p className="text-zinc-400 text-xs">
                Re-engage passive users dynamically without using generic, annoying marketing campaigns.
              </p>
              
              <ul className="space-y-3 pl-4 list-disc text-xs text-zinc-400">
                <li>
                  <strong className="text-white">Personalized Weekly Highlights:</strong> Generate personal academic highlights matching the student's department or interests (e.g., "Top 3 compiler note downloads in CompSci this week").
                </li>
                <li>
                  <strong className="text-white">Gamification streak signals:</strong> Alert users when study circles are completing quizzes, prompting them to keep daily continuous check-in milestones.
                </li>
                <li>
                  <strong className="text-white">Urgent Peer-to-Peer Help alerts:</strong> Broadcast micro-signals when team members ask technical questions inside matched courses, prompting collaboration.
                </li>
              </ul>
            </div>
          )}

          {activePlaybookTab === 8 && (
            <div className="space-y-4 animate-fadeIn text-xs sm:text-sm">
              <h4 className="text-sm font-bold text-white uppercase font-display flex items-center gap-2 text-[#00E5FF] leading-none">
                <ShieldAlert className="w-4 h-4" /> 8. Low-Spam Systems (Decay scores, server-side limits)
              </h4>
              <p className="text-zinc-400 text-xs">
                Enforce clean social boundaries to keep the platform professional and sustainable.
              </p>
              
              <ul className="space-y-3 pl-4 list-disc text-xs text-zinc-400">
                <li>
                  <strong className="text-white">Exponential Token-Bucket Limits:</strong> Throttle user-instigated announcements using strict token bucket formulas on the server (e.g., maximum 2 global broadcasts per student per day).
                </li>
                <li>
                  <strong className="text-white">Double-Blast Deduping algorithms:</strong> Automatically group identical mentions or reactions on a single chat frame back-to-back within a 5-minute window, updating only the metrics.
                </li>
                <li>
                  <strong className="text-white">Zero-Spam Sessional Filters:</strong> Filter mentions targeting terms like `@everyone` dynamically on edge handlers unless user permission levels equal "PRO" or "Rep".
                </li>
              </ul>
            </div>
          )}

          {activePlaybookTab === 9 && (
            <div className="space-y-4 animate-fadeIn text-xs sm:text-sm">
              <h4 className="text-sm font-bold text-white uppercase font-display flex items-center gap-2 text-indigo-405 leading-none">
                <Database className="w-4 h-4" /> 9. Serverless Egress-Friendly backend (BullMQ, Node sockets)
              </h4>
              <p className="text-zinc-400 text-xs">
                High throughput requires lightning-fast background task workers decoupled from web API thread pools.
              </p>
              
              <ul className="space-y-3 pl-4 list-disc text-xs text-zinc-400">
                <li>
                  <strong className="text-white">De-coupled Workers via BullMQ:</strong> Route API notification triggers immediately into a Redis-backed queue managed by **BullMQ**. Worker processes fetch, validate and deploy alerts asynchronously.
                </li>
                <li>
                  <strong className="text-white">Stateless SSE Gateways:</strong> Serve SSE channels through lightweight Stateless processes (Node/Fastify or Go), leaving heavy backend processes free to query databases.
                </li>
                <li>
                  <strong className="text-white">PostgreSQL Batch updates:</strong> Buffer non-urgent read indicators in Redis and bulk-write them to Postgres files every 5 minutes, saving thousands of continuous DB write steps.
                </li>
              </ul>
            </div>
          )}

          {activePlaybookTab === 10 && (
            <div className="space-y-4 animate-fadeIn text-xs sm:text-sm">
              <h4 className="text-sm font-bold text-white uppercase font-display flex items-center gap-2 text-indigo-405 leading-none">
                <Zap className="w-4 h-4" /> 10. Bootstrap Financial Shielding (R2, Edge Worker logic, Free push layers)
              </h4>
              <p className="text-zinc-400 text-xs">
                To run a massive university network without draining startup capital:
              </p>
              
              <ul className="space-y-3 pl-4 list-disc text-xs text-zinc-400">
                <li>
                  <strong className="text-white">Zero-Cost FCM Push Layer:</strong> Leverage Google Firebase FCM pushes which are completely free of charge at any transaction scale.
                </li>
                <li>
                  <strong className="text-white">Serverless Edge Handlers (Cloudflare Workers):</strong> Handle pre-flight validation rules on the edge, routing requests only when verified. Keeps monthly hosting budgets under $5 USD.
                </li>
                <li>
                  <strong className="text-white">Egress Alliance Protection:</strong> Deliver cached bulletins out of free egress CDNs to save thousands in data billing.
                </li>
              </ul>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
