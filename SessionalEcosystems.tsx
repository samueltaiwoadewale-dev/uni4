import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  Database,
  Network,
  Cpu,
  Bookmark,
  ChevronRight,
  UserCheck,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Briefcase,
  TrendingUp,
  Sliders,
  Smartphone,
  BookOpen,
  Eye,
  Lock,
  Flame,
  Zap,
  Radio,
  Share2,
  Heart,
  Volume2,
  Plus,
  RefreshCw,
  Search,
  ClipboardList,
  MessageSquare,
  Award,
  Book,
  FileText,
  Server,
  CloudLightning,
  SmartphoneNfc,
  Filter,
  Check
} from "lucide-react";
import { UniVerseLogo } from "./Logo";

// ==========================================
// TYPE DEFINITIONS for Sessional Ecosystems
// ==========================================
interface SessionalDepartment {
  id: string;
  name: string;
  code: string;
  faculty: string;
  studentCount: number;
  featuredCourseCount: number;
  popularCourse: string;
  activityRate: string;
  hodName: string;
  description: string;
}

interface SessionalCourse {
  id: string;
  code: string;
  title: string;
  units: number;
  departmentId: string;
  enrolledLevel: number; // 100 to 500
  downloadCount: number;
  difficultyClass: "Core" | "Elective" | "Practical Lab";
  resources: {
    pastQuestionsCount: number;
    slidesCount: number;
  };
}

interface CampusPulsePost {
  id: string;
  universityId: string;
  departmentId: string;
  level: number;
  category: "HODRadar" | "RepRadio" | "Academic" | "Buzz" | "Gig";
  title: string;
  author: string;
  role: "HOD" | "Class Rep" | "Student" | "Lecturer";
  time: string;
  content: string;
  likes: number;
  comments: number;
  karmaValue: number;
}

const DEPARTMENTS: { [key: string]: SessionalDepartment[] } = {
  lasu: [
    {
      id: "lasu-cs",
      name: "Computer Science",
      code: "CSC",
      faculty: "Science",
      studentCount: 380,
      featuredCourseCount: 18,
      popularCourse: "CSC 301 - Structured Programming",
      activityRate: "94% Active",
      hodName: "Prof. Gbadamosi K.",
      description: "Focuses on computer architecture, web frameworks, and compilers for the Lagos Tech Corridor."
    },
    {
      id: "lasu-law",
      name: "Jurisprudence and International Law",
      code: "LAW",
      faculty: "Law",
      studentCount: 520,
      featuredCourseCount: 14,
      popularCourse: "LAW 312 - Constitutional Law",
      activityRate: "89% Active",
      hodName: "Dr. Mrs. Folashade Coker",
      description: "Prepares world-class advocates for institutional tribunals, maritime legislation, and civil disputes."
    },
    {
      id: "lasu-med",
      name: "Medicine & Surgery",
      code: "MED",
      faculty: "Clinical Sciences (LASUCOM)",
      studentCount: 290,
      featuredCourseCount: 22,
      popularCourse: "MED 401 - Systemic Pathology",
      activityRate: "97% Active",
      hodName: "Prof. Ogedengbe S.",
      description: "Elite cohort based at the Ikeja Medical Complex utilizing physical lab routines."
    }
  ],
  funaab: [
    {
      id: "funaab-agro",
      name: "Plant Physiology and Crop Production",
      code: "PCP",
      faculty: "Plant Science & Crop Production",
      studentCount: 460,
      featuredCourseCount: 16,
      popularCourse: "PCP 402 - Agro-Meteorology",
      activityRate: "88% Active",
      hodName: "Dr. Olawale Adeyemi",
      description: "Scientific methodologies tailored to maximizing seasonal tropical harvests and storage systems."
    },
    {
      id: "funaab-fst",
      name: "Food Science and Technology",
      code: "FST",
      faculty: "Food Science & Human Ecology",
      studentCount: 350,
      featuredCourseCount: 12,
      popularCourse: "FST 201 - Principles of Preservation",
      activityRate: "91% Active",
      hodName: "Prof. Mrs. Adewusi O.",
      description: "Focus on biological preservation systems, food security mechanics, and scaling agro-processing."
    },
    {
      id: "funaab-aen",
      name: "Agricultural and Environmental Engineering",
      code: "AEN",
      faculty: "Engineering",
      studentCount: 410,
      featuredCourseCount: 15,
      popularCourse: "AEN 311 - Farm Power & Machinery",
      activityRate: "93% Active",
      hodName: "Engr. Dr. Babatunde Sowunmi",
      description: "Hydrological grid design, automated furrow systems, and mechanical tractor mechanics training."
    }
  ]
};

const COURSES: SessionalCourse[] = [
  // LASU Computer Science
  { id: "c-1", code: "CSC 301", title: "Structured Programming & Data", units: 3, departmentId: "lasu-cs", enrolledLevel: 300, downloadCount: 840, difficultyClass: "Core", resources: { pastQuestionsCount: 12, slidesCount: 5 } },
  { id: "c-2", code: "CSC 305", title: "Compilers & Automata Theory", units: 4, departmentId: "lasu-cs", enrolledLevel: 300, downloadCount: 710, difficultyClass: "Core", resources: { pastQuestionsCount: 8, slidesCount: 4 } },
  { id: "c-3", code: "CSC 411", title: "Web Application Frameworks", units: 3, departmentId: "lasu-cs", enrolledLevel: 400, downloadCount: 950, difficultyClass: "Practical Lab", resources: { pastQuestionsCount: 15, slidesCount: 7 } },
  { id: "c-4", code: "CSC 201", title: "Introduction to Digital Logic", units: 2, departmentId: "lasu-cs", enrolledLevel: 200, downloadCount: 1240, difficultyClass: "Core", resources: { pastQuestionsCount: 19, slidesCount: 3 } },

  // LASU Law
  { id: "c-5", code: "LAW 312", title: "Constitutional Law of Nigeria", units: 4, departmentId: "lasu-law", enrolledLevel: 300, downloadCount: 410, difficultyClass: "Core", resources: { pastQuestionsCount: 6, slidesCount: 8 } },
  { id: "c-6", code: "LAW 420", title: "Commercial Transactions & Sale", units: 3, departmentId: "lasu-law", enrolledLevel: 400, downloadCount: 380, difficultyClass: "Core", resources: { pastQuestionsCount: 9, slidesCount: 4 } },
  { id: "c-7", code: "LAW 111", title: "Legal Method and Reasoning", units: 2, departmentId: "lasu-law", enrolledLevel: 100, downloadCount: 620, difficultyClass: "Elective", resources: { pastQuestionsCount: 14, slidesCount: 2 } },

  // LASU Medicine
  { id: "c-8", code: "MED 401", title: "Systemic Pathology & Organs", units: 6, departmentId: "lasu-med", enrolledLevel: 400, downloadCount: 290, difficultyClass: "Practical Lab", resources: { pastQuestionsCount: 4, slidesCount: 12 } },
  { id: "c-9", code: "MED 302", title: "Human Neuroanatomy", units: 5, departmentId: "lasu-med", enrolledLevel: 300, downloadCount: 340, difficultyClass: "Core", resources: { pastQuestionsCount: 7, slidesCount: 8 } },

  // FUNAAB Plant Physiology
  { id: "c-10", code: "PCP 402", title: "Agro-Meteorology & Microclimates", units: 3, departmentId: "funaab-agro", enrolledLevel: 400, downloadCount: 520, difficultyClass: "Core", resources: { pastQuestionsCount: 11, slidesCount: 6 } },
  { id: "c-11", code: "PCP 301", title: "Crop Physiology & Photosynthesis", units: 3, departmentId: "funaab-agro", enrolledLevel: 300, downloadCount: 430, difficultyClass: "Practical Lab", resources: { pastQuestionsCount: 8, slidesCount: 5 } },
  { id: "c-12", code: "PCP 201", title: "Principles of Agriculture", units: 2, departmentId: "funaab-agro", enrolledLevel: 200, downloadCount: 1450, difficultyClass: "Elective", resources: { pastQuestionsCount: 22, slidesCount: 4 } },

  // FUNAAB Food Science
  { id: "c-13", code: "FST 201", title: "Principles of Food Preservation", units: 3, departmentId: "funaab-fst", enrolledLevel: 200, downloadCount: 780, difficultyClass: "Core", resources: { pastQuestionsCount: 15, slidesCount: 5 } },
  { id: "c-14", code: "FST 311", title: "Food Chemistry & Micronutrients", units: 4, departmentId: "funaab-fst", enrolledLevel: 300, downloadCount: 640, difficultyClass: "Core", resources: { pastQuestionsCount: 10, slidesCount: 7 } },

  // FUNAAB Agricultural Engineering
  { id: "c-15", code: "AEN 311", title: "Farm Power & Tractor Operation", units: 3, departmentId: "funaab-aen", enrolledLevel: 300, downloadCount: 490, difficultyClass: "Practical Lab", resources: { pastQuestionsCount: 13, slidesCount: 8 } },
  { id: "c-16", code: "AEN 412", title: "Silt and Hydrological Drainage", units: 4, departmentId: "funaab-aen", enrolledLevel: 400, downloadCount: 320, difficultyClass: "Core", resources: { pastQuestionsCount: 6, slidesCount: 9 } }
];

const FEED_DATABASE: CampusPulsePost[] = [
  {
    id: "fp-1",
    universityId: "lasu",
    departmentId: "lasu-cs",
    level: 300,
    category: "HODRadar",
    title: "Official Deferment of CSC 305 Mock Lab Exam",
    author: "Prof. Gbadamosi K.",
    role: "HOD",
    time: "32 mins ago",
    content: "Attention Level 300 Computer Science students: due to internal network reconfiguration in the Ojo Science Annex, the CSC 305 mock exam scheduled for tomorrow is pushed to Friday. Access the updated blueprint maps via UniVault. Do not rely on WhatsApp group gossip.",
    likes: 124,
    comments: 42,
    karmaValue: 150
  },
  {
    id: "fp-2",
    universityId: "lasu",
    departmentId: "lasu-law",
    level: 300,
    category: "RepRadio",
    title: "Moot Court Allocation Schedule Released!",
    author: "Gbemisola Shonibare",
    role: "Class Rep",
    time: "1 hour ago",
    content: "Guys, the moot court allocation index for the constitutional law debate (LAW 312) has been compiled. Teams 3 to 14 will present at the Ojo Courtroom A. Teams 15 to 22 will occupy Courtroom B. Download your brief sheet and review materials in UniVault today.",
    likes: 85,
    comments: 19,
    karmaValue: 80
  },
  {
    id: "fp-3",
    universityId: "lasu",
    departmentId: "lasu-cs",
    level: 300,
    category: "Academic",
    title: "CSC 301 Practice Exams compiled by Peer Tutors",
    author: "Tunde Bakare",
    role: "Student",
    time: "3 hours ago",
    content: "I have structured the previous answer grids for the CSC 301 recursive algorithm questions from 2021 to 2024. All responses are verified against standard logic sheets. Free to review inside your CSC 301 course stream node.",
    likes: 195,
    comments: 26,
    karmaValue: 110
  },
  {
    id: "fp-4",
    universityId: "funaab",
    departmentId: "funaab-agro",
    level: 400,
    category: "HODRadar",
    title: "Pre-Practical Field Grid Allotment For PCP 402",
    author: "Dr. Olawale Adeyemi",
    role: "HOD",
    time: "15 mins ago",
    content: "All Plant Physiology Level 400 students are required on agricultural farms by 07:00 tomorrow. Bring coordinates charts and weather telemetry logs. Any student arriving after 07:15 is barred from entering the microclimate practical labs.",
    likes: 142,
    comments: 55,
    karmaValue: 200
  },
  {
    id: "fp-5",
    universityId: "funaab",
    departmentId: "funaab-fst",
    level: 200,
    category: "RepRadio",
    title: "CBT Preparation Quiz is Active on SyllabusSphere",
    author: "Afeez Oladosu",
    role: "Class Rep",
    time: "2 hours ago",
    content: "Good morning FST Level 200 cohort. I discussed with Dr. Mrs. Adewusi and she activated a brief 10-question CBT self-test on preservation fundamentals inside SyllabusSphere. Use it to check your comprehension before the physical halls on Monday.",
    likes: 96,
    comments: 12,
    karmaValue: 75
  },
  {
    id: "fp-6",
    universityId: "funaab",
    departmentId: "funaab-agro",
    level: 300,
    category: "Gig",
    title: "Off-Campus Hydrologics Farm Internship Site Selection",
    author: "Emeka Obi",
    role: "Student",
    time: "4 hours ago",
    content: "If you are in Level 300 and interested in organic moisture tracking systems, the local Food Security Initiative in Abeokuta has opened 4 fully-paid sessional placements. ₦50,000 allowance + meal plan. Let's exchange requirements in PCP 301. Details attached.",
    likes: 72,
    comments: 8,
    karmaValue: 60
  }
];

export default function SessionalEcosystems({ 
  userProfile, 
  soundEnabled = true,
  triggerHapticFeedback = (freq: number) => {} 
}: { 
  userProfile?: any; 
  soundEnabled?: boolean;
  triggerHapticFeedback?: (freq: number, type?: any, duration?: number) => void;
}) {
  const [activeSubTab, setActiveSubTab] = useState<"mapping" | "uni-vault">("mapping");

  const studentUni = userProfile?.university || "Obafemi Awolowo University (OAU)";
  const studentDept = userProfile?.department || "Computer Science";
  const studentLevelStr = userProfile?.level || "300L";
  const studentLevelNum = parseInt(studentLevelStr) || 100;
  const studentCollege = userProfile?.college || "College of Technology";
  const studentFaculty = userProfile?.faculty || "Faculty of Technology";

  const personalDeptCode = (studentDept.toLowerCase().includes("comp") ? "CS" : studentDept.slice(0, 3).toUpperCase());

  // Generate dynamic custom courses specifically tailored to the profile's exact credentials!
  const personalCourses = useMemo(() => [
    { 
      id: "pc-1", 
      code: `${personalDeptCode} ${studentLevelNum + 1}`, 
      title: `${studentDept} Foundations & Logic`, 
      units: 3, 
      departmentId: "personal-dept", 
      enrolledLevel: studentLevelNum, 
      downloadCount: 840, 
      difficultyClass: "Core", 
      resources: { pastQuestionsCount: 14, slidesCount: 7 } 
    },
    { 
      id: "pc-2", 
      code: `${personalDeptCode} ${studentLevelNum + 5}`, 
      title: `Advanced ${studentDept} Systems`, 
      units: 4, 
      departmentId: "personal-dept", 
      enrolledLevel: studentLevelNum, 
      downloadCount: 710, 
      difficultyClass: "Core", 
      resources: { pastQuestionsCount: 9, slidesCount: 5 } 
    },
    { 
      id: "pc-3", 
      code: `${personalDeptCode} ${studentLevelNum + 11}`, 
      title: `Practical Lab Seminars & Case Studies`, 
      units: 3, 
      departmentId: "personal-dept", 
      enrolledLevel: studentLevelNum, 
      downloadCount: 955, 
      difficultyClass: "Practical Lab", 
      resources: { pastQuestionsCount: 18, slidesCount: 8 } 
    },
    { 
      id: "pc-4", 
      code: `${personalDeptCode} ${studentLevelNum - 99 > 0 ? studentLevelNum - 99 : 101}`, 
      title: `Introduction to ${studentDept} Elective`, 
      units: 2, 
      departmentId: "personal-dept", 
      enrolledLevel: studentLevelNum, 
      downloadCount: 1210, 
      difficultyClass: "Elective", 
      resources: { pastQuestionsCount: 22, slidesCount: 4 } 
    }
  ], [studentDept, studentLevelNum, personalDeptCode]);

  // Multi-campus state switchers
  const [selectedUni, setSelectedUni] = useState<"lasu" | "funaab" | "personal">("personal");
  const [selectedDeptId, setSelectedDeptId] = useState<string>("personal-dept");
  const [activeCourseId, setActiveCourseId] = useState<string>("pc-1");

  // Simulating active student profiles
  const [profile, setProfile] = useState({
    name: userProfile?.name || "Sam Dev",
    university: "personal" as any,
    departmentId: "personal-dept",
    level: studentLevelNum,
    role: "Student" as "Student" | "Class Rep" | "HOD",
    interestTags: userProfile?.interests || ["programming", "CBT preparation", "free wifi"]
  });

  // Mobile viewport toggler
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [mobileTab, setMobileTab] = useState<"pulse" | "vault" | "radio" | "profile">("pulse");

  // User flow simulation step track
  const [flowStep, setFlowStep] = useState(1);

  // New simulated past question upload
  const [newPqYear, setNewPqYear] = useState("2024");
  const [showPqSuccessToast, setShowPqSuccessToast] = useState(false);

  // Interactive custom growth calculator parameters for standard scale
  const [customScaleUniCount, setCustomScaleUniCount] = useState(12);
  const [replicatedInstanceRate, setReplicatedInstanceRate] = useState(30); // 30ms latency

  const activeDepartments = useMemo(() => {
    if (selectedUni === "personal") {
      return [
        {
          id: "personal-dept",
          name: studentDept,
          code: personalDeptCode,
          faculty: studentFaculty || studentCollege || "Academic Faculty",
          studentCount: 450,
          featuredCourseCount: 4,
          popularCourse: `${personalDeptCode} ${studentLevelNum + 1}`,
          activityRate: "97% Active",
          hodName: "Prof. Adewale (HOD)",
          description: `Sessional space for ${studentDept} under ${studentFaculty || studentCollege || "Academic College"}. Custom past questions synced to ${studentLevelStr}.`
        }
      ];
    }
    return DEPARTMENTS[selectedUni as any] || [];
  }, [selectedUni, studentDept, personalDeptCode, studentFaculty, studentCollege, studentLevelStr, studentLevelNum]);

  // Recalculates department when university changes to prevent mismatched states
  const handleUniversityChange = (uni: "lasu" | "funaab" | "personal") => {
    setSelectedUni(uni);
    if (uni === "personal") {
      setSelectedDeptId("personal-dept");
      setActiveCourseId("pc-1");
    } else {
      const defaultDept = DEPARTMENTS[uni][0].id;
      setSelectedDeptId(defaultDept);
      const matchingCourses = COURSES.filter(c => c.departmentId === defaultDept);
      if (matchingCourses.length > 0) {
        setActiveCourseId(matchingCourses[0].id);
      }
    }
  };

  // Trigger department selection
  const handleDepartmentChange = (deptId: string) => {
    setSelectedDeptId(deptId);
    if (selectedUni === "personal") {
      setActiveCourseId("pc-1");
    } else {
      const matchingCourses = COURSES.filter(c => c.departmentId === deptId);
      if (matchingCourses.length > 0) {
        setActiveCourseId(matchingCourses[0].id);
      }
    }
  };

  // Sync profile options
  const syncProfileToState = () => {
    setProfile(prev => ({
      ...prev,
      university: selectedUni as any,
      departmentId: selectedDeptId
    }));
  };

  // Filtering feeds based on selected profile to show "Users see only relevant content"
  const personalizedPulseFeed = useMemo(() => {
    if (selectedUni === "personal") {
      return [
        {
          id: "pf-1",
          universityId: "personal",
          departmentId: "personal-dept",
          enrolledLevel: studentLevelNum,
          category: "HODRadar",
          author: "Prof. Adewale",
          role: "HOD",
          time: "10 mins ago",
          title: `Sessional Review: ${studentDept} Syllabus update for ${studentLevelStr}`,
          content: `HOD Node alert: All material uploads for ${studentDept} on the UniVault have been synchronized. Download the approved class notes and CBT past papers to begin your preparation.`,
          karmaValue: 45
        },
        {
          id: "pf-2",
          universityId: "personal",
          departmentId: "personal-dept",
          enrolledLevel: studentLevelNum,
          category: "RepRadio",
          author: "Class Governor",
          role: "Class Rep",
          time: "1 hour ago",
          title: `${studentLevelStr} Lecture Hall allocation and sessional timetables`,
          content: `Confirming classroom allocation coordinates under the ${studentFaculty || studentCollege || 'College Area'} lecture theatres. Download verified study huddles files.`,
          karmaValue: 30
        },
        {
          id: "pf-3",
          universityId: "personal",
          departmentId: "personal-dept",
          enrolledLevel: studentLevelNum,
          category: "PeerLoop",
          author: "Esther Benson",
          role: "Student",
          time: "3 hours ago",
          title: `Study group materials for mid-semester CBT assessments`,
          content: `Hey peers, I have prepared study slides summaries. Let's start a dynamic study group!`,
          karmaValue: 20
        }
      ];
    }

    return FEED_DATABASE.filter(post => {
      // Direct filter - MUST be same university
      if (post.universityId !== selectedUni) return false;

      // Filter by department - strict encapsulation of campus circles
      // If student is CSC, don't display clinical medical operations or Moot court schedules unless general
      if (post.departmentId !== selectedDeptId && post.category !== "Buzz") return false;

      // Filter by level context - highly organized filters to prevent juniors seeing graduation templates
      if (post.level !== profile.level && post.category === "RepRadio") return false;

      return true;
    });
  }, [selectedUni, selectedDeptId, profile.level]);

  return (
    <div className="space-y-6 text-left" id="sessional-ecosystems-architecture">
      
      {/* Dynamic Sub-header describing Campus Spaces */}
      <div className="bg-gradient-to-tr from-[#111625] via-zinc-950 to-[#0A0F1E] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3.5xl font-semibold tracking-tight text-white font-sans">
              Campus Spaces: Localized Academic Networks
            </h2>
            <p className="text-xs text-white/60 max-w-2xl leading-relaxed">
              UniVerse organizes each university into distinct spaces to keep feeds and resources relevant. Switch between campuses to see how departmental frameworks are managed.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-zinc-950 p-2.5 rounded-xl border border-white/5 flex gap-1.5 shrink-0 shadow-md flex-wrap">
              <button
                onClick={() => handleUniversityChange("personal")}
                className={`px-4 py-2 rounded-lg font-bold text-xs uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedUni === "personal"
                    ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-black shadow-lg"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="text-[10px] bg-white/20 px-1 rounded text-white font-bold">★</div>
                <span>Your Uni ({studentUni.split("(").pop()?.replace(")", "") || "My Space"})</span>
              </button>
              <button
                onClick={() => handleUniversityChange("lasu")}
                className={`px-4 py-2 rounded-lg font-bold text-xs uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedUni === "lasu"
                    ? "bg-gradient-to-r from-[#06B6D4] to-[#1E3A8A] text-white shadow-lg"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="text-[10px] bg-white/20 px-1 rounded">L</div>
                LASU Space
              </button>
              <button
                onClick={() => handleUniversityChange("funaab")}
                className={`px-4 py-2 rounded-lg font-bold text-xs uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedUni === "funaab"
                    ? "bg-gradient-to-r from-[#10B981] to-[#1E3A8A] text-white shadow-lg"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="text-[10px] bg-white/20 px-1 rounded">F</div>
                FUNAAB Space
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex border-b border-white/10 pb-1 overflow-x-auto gap-2 scrollbar-none">
        {[
          { id: "mapping", label: "🗺️ Campus Hierarchy", icon: Layers },
          { id: "uni-vault", label: "📚 Course Vault", icon: BookOpen }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-3 font-bold text-xs uppercase tracking-wider transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                active
                  ? "border-cyan-400 text-cyan-400"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================================
          TAB 1: ARCHIME MAPPING & DIRECTORIES (LASU & FUNAAB DOMAINS)
          ============================================================================ */}
      {activeSubTab === "mapping" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn text-left">
          
          {/* Department Lists & active details */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 pb-2.5 border-b border-white/5">
              <Database className="w-4 h-4 text-cyan-400" /> 
              {selectedUni === "lasu" ? "Lagos State University" : "Federal Univ of Agriculture"} Space
            </h3>

            <p className="text-[11px] text-zinc-400 leading-relaxed font-semibold">
              The platform namespaces all courses, feeds, and resources under the localized domain below. Try selecting a department to route resources.
            </p>

            <div className="space-y-3 pt-2">
              {activeDepartments.map((dept) => {
                const active = dept.id === selectedDeptId;
                return (
                  <button
                    key={dept.id}
                    onClick={() => handleDepartmentChange(dept.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col gap-1.5 cursor-pointer ${
                      active
                        ? "bg-[#111625] border-cyan-500/40 shadow-md ring-1 ring-cyan-500/10"
                        : "bg-zinc-950/70 border-white/5 hover:border-white/10 hover:bg-zinc-950"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[10px] font-mono text-cyan-400 font-extrabold tracking-widest">{dept.code} Namespace</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 bg-white/5 text-zinc-450 border border-white/5 rounded">
                        {dept.activityRate}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white tracking-tight">{dept.name}</h4>
                    <span className="text-[10.5px] text-zinc-500 font-serif italic">HOD: {dept.hodName}</span>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed font-semibold bg-black/20 p-2 rounded border border-white/5">
                      {dept.description}
                    </p>

                    <div className="flex justify-between text-[11px] font-mono text-zinc-500 pt-1.5 border-t border-white/5 w-full">
                      <span>{dept.studentCount} student nodes</span>
                      <span>{dept.featuredCourseCount} courses</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Profile Setup link */}
            <div className="p-4.5 bg-[#151B2B] rounded-xl border border-white/10 space-y-3">
              <span className="text-[9px] font-mono text-[#FACC15] font-extrabold uppercase flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5" /> Sync My Simulator Profile
              </span>
              <p className="text-[11px] text-zinc-300 font-semibold leading-relaxed">
                Sync your workspace configurations to update feed calculations instantly.
              </p>
              <button
                onClick={syncProfileToState}
                className="w-full bg-[#1E3A8A] hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-blue-400/20 uppercase"
              >
                Save configurations to profile <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Topology Graph */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-zinc-950 p-5 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Network className="w-5 h-5 text-cyan-400" /> Scalable Campus Information Hierarchy Diagram
                  </h4>
                  <p className="text-[10px] text-zinc-500 uppercase font-mono">
                    Routing Schema: universe.net &gt; {selectedUni} &gt; {selectedDeptId}
                  </p>
                </div>
                <span className="text-[9px] font-mono bg-[#06B6D4]/15 text-[#06B6D4] px-2 py-0.5 rounded border border-[#06B6D4]/20 font-extrabold">
                  ECO-ROUTER: ACTIVE
                </span>
              </div>

              {/* Graphical Network Schema (HTML & CSS diagram) */}
              <div className="p-6 bg-black/40 rounded-xl relative overflow-hidden border border-white/5 space-y-5">
                {/* Visual Connector lines in background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/2 to-purple-500/2 pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10 font-mono text-center text-xs">
                  
                  {/* Global Ecosystem Core Node */}
                  <div className="p-3 bg-gradient-to-tr from-[#151B2B] to-[#0A0F1E] rounded-xl border border-cyan-500/30 flex flex-col justify-center items-center gap-1 shadow-md">
                    <div className="w-8 h-8 rounded bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <UniVerseLogo size={24} animate={false} orbitSpeed={0} glow={false} />
                    </div>
                    <span className="text-[10px] text-cyan-400 font-bold tracking-wider">UniVerse</span>
                    <span className="text-[8.5px] text-zinc-450 uppercase font-mono">Platform Base</span>
                  </div>

                  {/* University Namespace Node */}
                  <div className="p-3 bg-[#111625] rounded-xl border border-white/10 flex flex-col justify-center items-center gap-1 shadow-md relative">
                    <div className="w-8 h-8 rounded bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold">
                      {selectedUni.toUpperCase()}
                    </div>
                    <span className="text-[10px] text-white font-bold tracking-wider capitalize">
                      {selectedUni === "lasu" ? "LASU" : "FUNAAB"}
                    </span>
                    <span className="text-[8.5px] text-zinc-450 uppercase font-mono">Campus Workspace</span>
                    
                    {/* Active route indicator lamp */}
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[7px] text-zinc-550 header">Live</span>
                    </div>
                  </div>

                  {/* Department Namespace Node */}
                  <div className="p-3 bg-zinc-950 rounded-xl border border-white/10 flex flex-col justify-center items-center gap-1 shadow-md">
                    <div className="w-8 h-8 rounded bg-rose-500/10 flex items-center justify-center text-[#EC4899] font-bold font-mono">
                      {(activeDepartments || []).find(d => d.id === selectedDeptId)?.code || "DEPT"}
                    </div>
                    <span className="text-[10px] text-white font-bold tracking-wider truncate max-w-[100px]">
                      {(activeDepartments || []).find(d => d.id === selectedDeptId)?.name || "Department"}
                    </span>
                    <span className="text-[8.5px] text-zinc-450 uppercase font-mono">Department Space</span>
                  </div>

                  {/* Feature Node Vault level */}
                  <div className="p-3 bg-zinc-950/60 rounded-xl border border-white/5 flex flex-col justify-center items-center gap-1 shadow-md">
                    <div className="w-8 h-8 rounded bg-[#FACC15]/10 flex items-center justify-center text-[#FACC15]">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-white font-bold tracking-wider">Resources</span>
                    <span className="text-[8.5px] text-zinc-450 uppercase font-mono">Sessional Vault</span>
                  </div>

                </div>

                <div className="border-t border-white/5 pt-4 text-xs space-y-2 text-zinc-300">
                  <h5 className="font-bold text-white flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Sessional Data Isolation
                  </h5>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Students at the **Lagos State University** only see local feeds, test announcements, and crowd-sourced chat lines. The platform partitions information to ensure relevant academic delivery for each campus.
                  </p>
                </div>
              </div>

              {/* Feeds matching the specific Namespace selector */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#FACC15]" /> Live Domain Streams: {selectedUni.toUpperCase()} Updates
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {personalizedPulseFeed.slice(0, 2).map((post) => (
                    <div key={post.id} className="p-4 bg-[#111625] rounded-xl border border-white/5 space-y-2 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                            post.category === "HODRadar" ? "bg-rose-500/25 text-rose-300" : "bg-cyan-500/25 text-cyan-300"
                          }`}>
                            {post.category === "HODRadar" ? "HODRadar" : "RepRadio"}
                          </span>
                          <span className="text-[9px] font-mono text-zinc-550 leading-none">{post.time}</span>
                        </div>
                        <h5 className="font-bold text-white text-xs tracking-tight">{post.title}</h5>
                        <p className="text-[11px] text-zinc-400 line-clamp-3 leading-normal font-semibold">
                          {post.content}
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 pt-2 border-t border-white/5 mt-2">
                        <span>By {post.author} ({post.role})</span>
                        <span className="text-emerald-400">Karma score: +{post.karmaValue}</span>
                      </div>
                    </div>
                  ))}
                  {personalizedPulseFeed.length === 0 && (
                    <div className="p-6 text-center text-xs text-zinc-500 font-mono col-span-2">
                      No active announcements scoped with {profile.level}L in this space. Try changing profile levels!
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ============================================================================
          COURSE VAULT (UniVault System)
          ============================================================================ */}
      {activeSubTab === "uni-vault" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn text-left">
          
          {/* Main Course select list */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-4">
            <div className="bg-[#111625] p-5 rounded-2xl border border-white/10 space-y-4">
              <div className="pb-2 border-b border-white/5">
                <h4 className="text-sm font-bold text-white tracking-tight">
                  {selectedUni === "personal" ? studentUni : selectedUni === "lasu" ? "LASU" : "FUNAAB"} Course Directory
                </h4>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {(selectedUni === "personal" ? personalCourses : COURSES).filter(c => c.departmentId === selectedDeptId).map((course) => {
                  const active = course.id === activeCourseId;
                  return (
                    <button
                      key={course.id}
                      onClick={() => setActiveCourseId(course.id)}
                      className={`w-full p-4 rounded-xl text-left border transition-all flex justify-between items-center cursor-pointer ${
                        active
                          ? "bg-zinc-950 border-cyan-400 shadow-md ring-1 ring-cyan-400/10"
                          : "bg-zinc-950/40 border-white/5 hover:border-white/10 hover:bg-zinc-950"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-cyan-400 font-extrabold px-1.5 py-0.5 bg-cyan-400/10 rounded">
                            {course.code}
                          </span>
                          <span className={`text-[8.5px] font-mono font-bold uppercase rounded px-1.5 py-0.5 ${
                            course.difficultyClass === "Core" ? "bg-purple-500/15 text-purple-300" : "bg-emerald-500/15 text-emerald-300"
                           }`}>
                            {course.difficultyClass}
                          </span>
                        </div>
                        <h5 className="font-bold text-xs text-white leading-normal truncate max-w-[200px] uppercase">{course.title}</h5>
                        <p className="text-[10px] text-zinc-550">Level {course.enrolledLevel} • {course.units} Credit Units</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-mono text-zinc-400 block font-semibold">{course.downloadCount} dl</span>
                        <span className="text-[9px] font-mono text-zinc-500 italic">verified</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Course Resource Vault Viewer */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-4">
            {(() => {
              const currentCourseList = selectedUni === "personal" ? personalCourses : COURSES;
              const course = (currentCourseList || []).find(c => c.id === activeCourseId);
              if (!course) {
                return (
                  <div className="bg-zinc-950 p-12 text-center text-xs text-zinc-500 font-mono border border-white/10 rounded-2xl">
                    Select a class from the directory on the left to review resources.
                  </div>
                );
              }
              return (
                <div className="bg-zinc-950 p-5 rounded-2xl border border-white/10 space-y-4">
                  
                  {/* Course Header card info */}
                  <div className="flex justify-between items-start pb-3.5 border-b border-white/5">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-cyan-400 font-extrabold uppercase">
                        Resources &gt; {course.code}
                      </span>
                      <h4 className="text-lg font-bold text-white tracking-tight uppercase">{course.title}</h4>
                      <p className="text-[11px] text-zinc-500">
                        Past questions, slides, and peer discussions for your current session.
                      </p>
                    </div>
                    
                    <div className="p-2.5 bg-[#111625] rounded-xl border border-white/5 text-right font-mono text-xs">
                      <span className="text-zinc-500 block text-[8px] uppercase font-bold">Files Accessed</span>
                      <strong className="text-emerald-400 font-black">{course.downloadCount} Hits</strong>
                    </div>
                  </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3.5 bg-[#111625] rounded-xl border border-white/5 space-y-1.5">
                          <div className="flex items-center gap-1 text-[#FACC15]">
                            <Book className="w-4 h-4" />
                            <span className="text-[9px] font-mono font-black uppercase">Study Materials</span>
                          </div>
                          <strong className="text-white text-base block">{course.resources.slidesCount} Slides</strong>
                          <span className="text-[9.5px] font-mono text-zinc-500">Lecture slides</span>
                        </div>

                        <div className="p-3.5 bg-[#111625] rounded-xl border border-white/5 space-y-1.5">
                          <div className="flex items-center gap-1 text-cyan-400">
                            <FileText className="w-4 h-4" />
                            <span className="text-[9px] font-mono font-black uppercase">Past Questions</span>
                          </div>
                          <strong className="text-white text-base block">{course.resources.pastQuestionsCount} PQs</strong>
                          <span className="text-[9.5px] font-mono text-zinc-500">CBT & Papers</span>
                        </div>

                        <div className="p-3.5 bg-[#111625] rounded-xl border border-white/5 space-y-1.5 opacity-50">
                          <div className="flex items-center gap-1 text-purple-400">
                            <Users className="w-4 h-4" />
                            <span className="text-[9px] font-mono font-black uppercase">Study Discussions</span>
                          </div>
                          <strong className="text-white text-base block font-mono">LOCKED</strong>
                          <span className="text-[9.5px] font-mono text-zinc-500">Coming soon</span>
                        </div>
                      </div>

                      <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
                        <span className="text-[10px] font-mono text-[#FACC15] uppercase tracking-wider block font-bold">
                          ★ Contribute to the vault
                        </span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-semibold">
                          Upload a past CBT or written test sheet to help peers and earn karma:
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="flex-1">
                            <label className="text-[8.5px] text-zinc-500 block uppercase font-mono mb-1">Session year</label>
                            <input
                              type="text"
                              value={newPqYear}
                              onChange={(e) => setNewPqYear(e.target.value)}
                              className="w-full bg-[#111625] p-2 text-xs border border-white/5 rounded text-white outline-none focus:border-cyan-400 font-mono"
                              placeholder="e.g. 2024"
                            />
                          </div>

                          <div className="flex-1">
                            <label className="text-[8.5px] text-zinc-500 block uppercase font-mono mb-1">Attachment</label>
                            <label className="w-full bg-[#111625] px-3 py-2 text-[10px] border border-dashed border-white/10 rounded text-slate-400 font-mono text-center flex items-center justify-center gap-1.5 cursor-pointer hover:border-white/20 transition-all select-none">
                              <input type="file" className="hidden" onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  // Simplified feedback
                                  triggerHapticFeedback(700, "sine");
                                }
                              }} />
                              <CloudLightning className="w-3.5 h-3.5" /> Tap to upload PDF
                            </label>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setShowPqSuccessToast(true);
                            setTimeout(() => setShowPqSuccessToast(false), 3500);
                          }}
                          className="w-full bg-[#10B981] text-zinc-950 hover:bg-[#059669] font-black tracking-wider uppercase text-[11px] py-2.5 rounded transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                        >
                          Submit paper to {course.code} Vault <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <AnimatePresence>
                        {showPqSuccessToast && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="p-3 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 rounded text-[11px] font-mono flex items-center gap-2"
                          >
                            <Check className="w-4 h-4" /> Paper processed successfully! Added to {course.code} and karma points issued.
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="p-3.5 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-[11.5px] text-zinc-350 leading-relaxed font-semibold">
                        Courses inside the **Vault** are organized by session. Every resource has an isolated comment thread to keep academic discussions focused.
                      </div>
                    </div>
                  );
                })()}
          </div>

        </div>
      )}

    </div>
  );
}
