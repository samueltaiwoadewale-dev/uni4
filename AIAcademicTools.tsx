import React, { useState, useEffect } from "react";
import { 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  Plus, 
  Trash2, 
  BrainCircuit, 
  ChevronRight, 
  HelpCircle, 
  Info, 
  RefreshCw,
  Award,
  Zap,
  Target
} from "lucide-react";
import { Course, University } from "../types";

// Standard Nigerian Universities preset list
const universitiesList: University[] = [
  { id: "unilag", name: "University of Lagos", abbreviation: "UNILAG", location: "Akoka, Lagos", established: "1962", popularSlang: "Akokites, Moremi, LT 1", scale: 5.0 },
  { id: "ui", name: "University of Ibadan", abbreviation: "UI", location: "Ibadan, Oyo", established: "1948", popularSlang: "First & Best, Tedder Hall", scale: 7.0 },
  { id: "oau", name: "Obafemi Awolowo University", abbreviation: "OAU", location: "Ile-Ife, Osun", established: "1961", popularSlang: "Great Ife, Angola, Oduduwa Hall", scale: 5.0 },
  { id: "abu", name: "Ahmadu Bello University", abbreviation: "ABU", location: "Zaria, Kaduna", established: "1962", popularSlang: "Naturally Ahead, Congo Campus", scale: 5.0 },
  { id: "unn", name: "University of Nigeria, Nsukka", abbreviation: "UNN", location: "Nsukka, Enugu", established: "1955", popularSlang: "Lions & Lionesses, Franco", scale: 5.0 }
];

interface AIAcademicToolsProps {
  userProfile?: any;
}

export default function AIAcademicTools({ userProfile }: AIAcademicToolsProps) {
  const [activeSubTab, setActiveSubTab] = useState<"cgp" | "ai">("cgp");

  // --- REGION A: CGPA Forecast State ---
  const [selectedUni, setSelectedUni] = useState<string>("unilag");
  const [currentCGPA, setCurrentCGPA] = useState<string>("3.80");
  const [targetCGPA, setTargetCGPA] = useState<string>("4.50");
  const [totalCompletedUnits, setTotalCompletedUnits] = useState<string>("60");
  
  // Active courses input table
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "GST 101: Nigerian Peoples", units: 2, grade: "A" },
    { id: "2", name: "CHM 101: General Chemistry", units: 4, grade: "" },
    { id: "3", name: "PHY 111: Mechanics", units: 3, grade: "" },
    { id: "4", name: "MTH 101: Algebra", units: 4, grade: "" },
    { id: "5", name: "GST 102: Philosophy", units: 2, grade: "B" }
  ]);

  const [newCourseName, setNewCourseName] = useState<string>("");
  const [newCourseUnits, setNewCourseUnits] = useState<number>(3);

  // AI GPA strategy reports
  const [gpaAdvisory, setGpaAdvisory] = useState<string>("");
  const [loadingAdvisor, setLoadingAdvisor] = useState<boolean>(false);

  // --- REGION B: AI Summarizer State ---
  const [selectedDomain, setSelectedDomain] = useState<string>("Humanities & Social Sciences");
  const [textInput, setTextInput] = useState<string>("");
  const [summarizedOutput, setSummarizedOutput] = useState<string>("");
  const [flashcards, setFlashcards] = useState<Array<{question: string, answer: string}>>([]);
  const [loadingSummaries, setLoadingSummaries] = useState<boolean>(false);
  const [activeFlashcard, setActiveFlashcard] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<"Easy" | "Moderate" | "Hard">("Moderate");

  const [handouts, setHandouts] = useState<Array<{title: string, domain: string, text: string}>>([]);

  // Generate customized handouts based on userProfile
  useEffect(() => {
    if (userProfile && userProfile.department && userProfile.level) {
      const dept = userProfile.department;
      const level = userProfile.level;
      
      const customHandouts = [
        {
          title: `Intro to ${dept} (${level}) - Core Principles`,
          domain: dept.includes("Science") || dept.includes("Engineering") ? "STEM/Engineering" : "Humanities & Social Sciences",
          text: `In the study of ${dept} at ${level}, establishing a foundational understanding of the core principles is essential. \n\n1. Foundational Theory: The primary mechanism driving ${dept} involves complex systemic interactions within the ecosystem. \n2. Modern Applications: Today, ${dept} professionals apply these theories to solve real-world problems in African contexts.`
        },
        {
          title: `Advanced ${dept} Analysis - Case Studies`,
          domain: dept.includes("Science") || dept.includes("Engineering") ? "STEM/Engineering" : "Humanities & Social Sciences",
          text: `A critical review of standard case studies in ${dept} reveals key insights about scalability and sustainability. Focus is placed on local variations and regulatory frameworks. Continuous assessment emphasizes critical synthesis over memorization.`
        },
        {
          title: `General Study (GST) - African Culture & Values`,
          domain: "Humanities & Social Sciences",
          text: `The early history of Nigeria is characterized by several distinct civilizations, archaeological evidence of which points to advanced metal-working and socio-political orders. 
1. The Nok Culture (approx. 1500 BC to 500 AD): Located in the Kaduna-Jos-Plateau area. Famous for terracotta figurines, advanced iron smelting furnaces, and sophisticated art styles. They represent the earliest organized iron-age society in West Africa.
2. Igbo-Ukwu (approx. 9th Century AD): Located in modern-day Anambra. Revealed stunning bronze castings made using the 'lost-wax' method, glass beads, and highly elaborate burial systems of rulers/priests (Ozo titles).`
        }
      ];
      setHandouts(customHandouts);
      if (!textInput && customHandouts.length > 0) {
        setTextInput(customHandouts[0].text);
        setSelectedDomain(customHandouts[0].domain);
      }
    } else {
      // Fallback
      setHandouts([
        {
          title: "GST 101: Nigerian Peoples & Culture (Early Civilization)",
          domain: "Humanities & Social Sciences",
          text: "The early history of Nigeria is characterized by several distinct civilizations..."
        }
      ]);
    }
  }, [userProfile]);

  // Get current university details
  const activeUniObj = (universitiesList || []).find(u => u.id === selectedUni) || (universitiesList || [])[0];

  // Grade point mapping based on scale
  const getGradeValue = (grade: string, scale: number): number => {
    if (scale === 5.0) {
      switch (grade) {
        case "A": return 5;
        case "B": return 4;
        case "C": return 3;
        case "D": return 2;
        case "E": return 1;
        case "F": return 0;
        default: return 0;
      }
    } else if (scale === 7.0) {
      switch (grade) {
        case "A": return 7;
        case "B": return 6;
        case "C": return 5;
        case "D": return 4;
        case "E": return 3; // minimal pass
        case "F": return 0;
        default: return 0;
      }
    } else { // 4.0 Scale
      switch (grade) {
        case "A": return 4;
        case "B": return 3;
        case "C": return 2;
        case "D": return 1;
        case "F": return 0;
        default: return 0;
      }
    }
  };

  const handleAddCourse = () => {
    if (!newCourseName.trim()) return;
    const newCourse: Course = {
      id: Date.now().toString(),
      name: newCourseName,
      units: Number(newCourseUnits),
      grade: ""
    };
    setCourses([...courses, newCourse]);
    setNewCourseName("");
    setNewCourseUnits(3);
  };

  const handleRemoveCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const handleGradeChange = (id: string, grade: Course["grade"]) => {
    setCourses(courses.map(c => c.id === id ? { ...c, grade } : c));
  };

  // Calculate local GPA factors
  const totalSemesterUnits = courses.reduce((sum, c) => sum + c.units, 0);
  const gradedCourses = courses.filter(c => c.grade !== "");
  const totalGradedUnits = gradedCourses.reduce((sum, c) => sum + c.units, 0);
  const semesterGPPoints = gradedCourses.reduce((sum, c) => {
    return sum + (getGradeValue(c.grade, activeUniObj.scale) * c.units);
  }, 0);
  
  const calculatedSemesterGPA = totalGradedUnits > 0 
    ? (semesterGPPoints / totalGradedUnits).toFixed(2) 
    : "0.00";

  // Request strategic report from AI endpoint
  const handleGetAIGPAStrategy = async () => {
    setLoadingAdvisor(true);
    setGpaAdvisory("");
    try {
      const activeCoursesPayload = courses.map(c => ({
        name: c.name,
        units: c.units,
        gradeState: c.grade ? `Target Grade ${c.grade}` : "Not finalized"
      }));

      const res = await fetch("/api/gemini/gpa-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentCGPA: parseFloat(currentCGPA) || 0,
          targetCGPA: parseFloat(targetCGPA) || 0,
          totalUnitsCurrent: parseInt(totalCompletedUnits) || 0,
          baseScale: activeUniObj.scale,
          courses: activeCoursesPayload,
          university: activeUniObj.name
        })
      });

      const data = await res.json();
      if (data.error) {
        setGpaAdvisory(`### Error Formulating Report\n\nCould not fetch advice: ${data.error}`);
      } else {
        setGpaAdvisory(data.advice || "No report returned.");
      }
    } catch (err: any) {
      setGpaAdvisory(`### Error Formulating Report\n\nConnection issues occurred: ${err.message || err}`);
    } finally {
      setLoadingAdvisor(false);
    }
  };

  // Request lecture note review from AI endpoint
  const handleAISummarizeNotes = async () => {
    setLoadingSummaries(true);
    setSummarizedOutput("");
    setFlashcards([]);
    setActiveFlashcard(null);
    setShowAnswer(false);

    try {
      const res = await fetch("/api/gemini/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          noteText: textInput,
          domain: selectedDomain,
          university: activeUniObj.name,
          difficulty: difficulty,
          studentLevel: userProfile?.level || "Undergraduate",
          department: userProfile?.department || "General",
          promptAdditions: "Be as friendly and explanatory as possible in shaping the flashcards. Make the flashcards sound like a cool, supportive AI peer tutor."
        })
      });

      const data = await res.json();
      if (data.error) {
        setSummarizedOutput(`### Request Failed\nCould not fetch AI review: ${data.error}`);
      } else {
        setSummarizedOutput(data.summary || "No lecture notes generated.");
        setFlashcards(data.flashcards || []);
        if (data.flashcards && data.flashcards.length > 0) {
          setActiveFlashcard(0);
        }
      }
    } catch (err: any) {
      setSummarizedOutput(`### Network Failure\nUnable to reach server API proxy. Error: ${err.message || err}`);
    } finally {
      setLoadingSummaries(false);
    }
  };

  // Extremely basic custom parser to safely render basic markdown structures in React
  const renderSimpleMarkdown = (text: string) => {
    if (!text) return null;
    return text.split("\n").map((line, idx) => {
      // Headers
      if (line.startsWith("### ")) {
        return <h4 key={idx} className="text-sm font-bold text-emerald-400 mt-4 mb-2 border-b border-white/10 pb-1 font-display uppercase tracking-wider">{line.substring(4)}</h4>;
      }
      if (line.startsWith("#### ")) {
        return <h5 key={idx} className="text-xs font-bold text-white/80 mt-3 mb-1 uppercase font-mono">{line.substring(5)}</h5>;
      }
      if (line.startsWith("## ")) {
        return <h3 key={idx} className="text-base font-bold text-emerald-300 mt-5 mb-2 font-display">{line.substring(3)}</h3>;
      }
      
      // Bullets
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const cleanContent = line.trim().substring(2);
        return (
          <li key={idx} className="text-xs text-white/70 ml-4 list-disc mb-1 leading-relaxed">
            {formatBoldText(cleanContent)}
          </li>
        );
      }

      // Standard text line
      return <p key={idx} className={`text-xs text-white/50 mb-2 leading-relaxed ${line.trim() === "" ? "h-2" : ""}`}>{formatBoldText(line)}</p>;
    });
  };

  // Replace Markdown **bolding** with robust React strong markup
  const formatBoldText = (txt: string) => {
    const parts = txt.split(/\*\*(.*?)\*\*/);
    return parts.map((part, index) => 
      index % 2 === 1 ? <strong key={index} className="font-semibold text-white">{part}</strong> : part
    );
  };

  return (
    <div className="space-y-6">
      {/* Sub tabs selector */}
      <div className="flex border-b border-slate-200">
        <button
          id="tab-cgp-planner"
          onClick={() => setActiveSubTab("cgp")}
          className={`px-5 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === "cgp" 
              ? "border-slate-900 text-slate-900 font-bold" 
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <GraduationCap className="w-4 h-4 text-violet-600" />
          CGPA Planner & AI Predictor
        </button>
        <button
          id="tab-ai-summarizer"
          onClick={() => setActiveSubTab("ai")}
          className={`px-5 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === "ai" 
              ? "border-slate-900 text-slate-900 font-bold" 
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-emerald-600" />
          AI Lecture Summarizer & Flashcards
        </button>
      </div>

      {/* VIEW A: CGPA Planner */}
      {activeSubTab === "cgp" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Settings & Add Course Columns */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Context Inputs Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Info className="w-4 h-4 text-violet-600" /> Semester Environment
              </h3>

              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Select University</label>
                <select
                  value={selectedUni}
                  onChange={(e) => setSelectedUni(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-200 bg-white p-2 text-slate-800 focus:outline-none focus:border-slate-400"
                >
                  {universitiesList.map((uni) => (
                    <option key={uni.id} value={uni.id}>{uni.name} ({uni.abbreviation})</option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 mt-1 italic font-mono uppercase">
                  Scaling Scale: {activeUniObj.scale}.0 Scale • Slang: "{activeUniObj.popularSlang}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Current CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max={activeUniObj.scale}
                    value={currentCGPA}
                    onChange={(e) => setCurrentCGPA(e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Target CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max={activeUniObj.scale}
                    value={targetCGPA}
                    onChange={(e) => setTargetCGPA(e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Completed Units (excluding active)</label>
                <input
                  type="number"
                  min="0"
                  value={totalCompletedUnits}
                  onChange={(e) => setTotalCompletedUnits(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-200 p-2 text-slate-800"
                />
              </div>
            </div>

            {/* Quick Add Course Code Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                Add Semester Course
              </h3>
              
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Course Code/Title</label>
                  <input
                    placeholder="e.g. MTH 101: Calculus"
                    type="text"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-200 p-2 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Unit Value</label>
                    <select
                      value={newCourseUnits}
                      onChange={(e) => setNewCourseUnits(Number(e.target.value))}
                      className="w-full text-xs rounded-lg border border-slate-200 bg-white p-2 text-slate-800 focus:outline-none"
                    >
                      <option value="1">1 Unit</option>
                      <option value="2">2 Units</option>
                      <option value="3">3 Units</option>
                      <option value="4">4 Units</option>
                      <option value="5">5 Units</option>
                      <option value="6">6 Units</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={handleAddCourse}
                      className="w-full bg-slate-900 text-white rounded-lg py-2 text-xs font-semibold hover:bg-slate-800 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Append
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Active Work Courses Calculation Column */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Your Active Semester Courses</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Define grades of assessments or leave empty to model targets.</p>
                </div>
                <div className="px-3 py-1.5 bg-violet-50 text-violet-800 border-violet-100 border rounded-lg text-center">
                  <p className="text-[9px] uppercase font-bold font-mono text-slate-400 leading-none">Sem Est GPA</p>
                  <p className="text-sm font-semibold font-mono leading-none mt-1">{calculatedSemesterGPA}</p>
                </div>
              </div>

              {/* Course entries tree */}
              <div className="divide-y divide-slate-100 max-h-[240px] overflow-y-auto pr-1">
                {courses.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-8">No semesters courses registered. Use the panel on the left to add.</p>
                ) : (
                  courses.map((course) => (
                    <div key={course.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-800 truncate">{course.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono uppercase">{course.units} Credit Units</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={course.grade}
                          onChange={(e) => handleGradeChange(course.id, e.target.value as Course["grade"])}
                          className="text-xs rounded border border-slate-200 bg-white px-2 py-1 text-slate-700"
                        >
                          <option value="">Pending</option>
                          <option value="A">Grade A (Excellent)</option>
                          <option value="B">Grade B (Good)</option>
                          <option value="C">Grade C (Average)</option>
                          <option value="D">Grade D (Pass)</option>
                          {activeUniObj.scale >= 5.0 && <option value="E">Grade E (Low Pass)</option>}
                          <option value="F">Grade F (Fail)</option>
                        </select>

                        <button
                          onClick={() => handleRemoveCourse(course.id)}
                          className="hover:text-red-600 text-slate-300 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                <p>Total Class Load: <strong className="text-slate-800">{totalSemesterUnits} Units</strong></p>
                
                <button
                  onClick={handleGetAIGPAStrategy}
                  disabled={loadingAdvisor || courses.length === 0}
                  className="bg-indigo-600 text-white rounded-xl px-4 py-2 text-xs font-semibold hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> 
                  {loadingAdvisor ? "AI Strategizing..." : "Generate AI Campus GPA Strategy"}
                </button>
              </div>

            </div>

            {/* AI Advisor Output Screen */}
            {gpaAdvisory && (
              <div className="bg-slate-900 text-slate-100 rounded-xl p-6 shadow-md border border-slate-950 font-sans relative overflow-hidden transition-all duration-300">
                <div className="absolute top-0 right-0 p-3 opacity-25">
                  <GraduationCap className="w-16 h-16 text-violet-400" />
                </div>
                
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] uppercase font-bold text-violet-400 font-mono tracking-wider">
                    UniVerse AI Mentor Insights (Live Generated)
                  </span>
                </div>

                <div className="prose prose-invert max-w-none space-y-2 prose-xs pr-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                  {renderSimpleMarkdown(gpaAdvisory)}
                </div>
                
                <div className="border-t border-slate-800/80 mt-4 pt-3 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                  <span>Target: {targetCGPA} • Mode: Local Curriculums Advisor</span>
                  <button 
                    onClick={() => setGpaAdvisory("")}
                    className="underline hover:text-slate-300 cursor-pointer"
                  >
                    Clear Strategy Board
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* VIEW B: AI Study Summarizer */}
      {activeSubTab === "ai" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left panel: Input Area */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Text Study Material
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">Character limit: 3000 max</span>
              </div>

              {/* Sample loader */}
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Load Handout Preset:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {handouts.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setTextInput(h.text);
                        setSelectedDomain(h.domain);
                      }}
                      className="text-left text-[11px] p-2 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-200 truncate cursor-pointer font-medium text-slate-700 block"
                    >
                      📄 {h.title}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">University Domain</label>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-200 bg-white p-2 text-slate-800 focus:outline-none"
                >
                  <option value="Humanities & Social Sciences">Humanities & Social Sciences (GST, SOC, CLA)</option>
                  <option value="STEM/Engineering">STEM/Engineering (PHY, CHM, MTH, CVE)</option>
                  <option value="Law">Law/Jurisprudence (BUL, PPL)</option>
                  <option value="Medicine & Health Sciences">Biological/Medical Sciences (BCH, MCB, ANA)</option>
                  <option value="Economics & Business">Economics & Commerce (ACC, BUS, ECN)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Raw Lecture Material or Paste Text</label>
                <textarea
                  placeholder="Paste textbook passages, syllabus bullet points, class notes, or assignment prompts..."
                  rows={8}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-200 p-2.5 text-slate-800 bg-slate-50"
                />
              </div>

              <button
                id="btn-summarize"
                disabled={loadingSummaries || textInput.trim().length === 0}
                onClick={handleAISummarizeNotes}
                className="w-full bg-emerald-600 text-white font-semibold rounded-xl text-xs py-2.5 hover:bg-emerald-700 shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                {loadingSummaries ? "Gemini Organizing Notes..." : "Summarize Note & Generate Flashcards"}
              </button>

            </div>
          </div>

          {/* Right panel: Output summaries & Flashcards */}
          <div className="lg:col-span-7 space-y-6">

            {/* AI Summaries Render */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 min-h-[180px]">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                    Core Study Summary
                  </h3>
                </div>
                {loadingSummaries && (
                  <span className="text-[10px] text-emerald-600 font-semibold animate-pulse">Running Gemini pipeline...</span>
                )}
              </div>

              {!summarizedOutput && !loadingSummaries ? (
                <div className="text-center py-12 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Choose one of the presets on the left or paste your departmental materials. Click compile to trigger our live server-side summarizing.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 prose-xs max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
                  {renderSimpleMarkdown(summarizedOutput)}
                </div>
              )}
            </div>

            {/* AI Flashcards Render */}
            {flashcards.length > 0 && activeFlashcard !== null && (
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 space-y-6 shadow-2xl relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                  <BrainCircuit className="w-48 h-48 text-indigo-500 blur-2xl" />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 relative z-10 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30">
                      <Sparkles className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white uppercase tracking-tight">
                        AI Revision Deck
                      </h3>
                      <p className="text-[10px] text-zinc-400 font-mono">Card {activeFlashcard + 1} of {flashcards.length}</p>
                    </div>
                  </div>

                  {/* Difficulty Switcher */}
                  <div className="flex bg-black/40 rounded-full p-1 border border-white/5">
                    {(["Easy", "Moderate", "Hard"] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => {
                          setDifficulty(level);
                          // Optional: Ideally this would trigger a re-fetch of flashcards with new difficulty
                        }}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all duration-300 ${
                          difficulty === level
                            ? level === "Easy" ? "bg-emerald-500/20 text-emerald-400" 
                              : level === "Moderate" ? "bg-amber-500/20 text-amber-400"
                              : "bg-rose-500/20 text-rose-400"
                            : "text-zinc-500 hover:text-white"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Card Widget */}
                <div className="relative group perspective">
                  <div 
                    onClick={() => setShowAnswer(!showAnswer)}
                    className={`min-h-[220px] rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-500 preserve-3d relative p-8 shadow-xl ${
                      showAnswer
                        ? "bg-gradient-to-br from-indigo-600 to-violet-800 text-white shadow-indigo-500/20"
                        : "bg-gradient-to-br from-[#1A1F35] to-[#121626] border border-white/10 hover:border-indigo-500/50 text-white"
                    }`}
                  >
                    <div className="absolute top-4 left-4 flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-rose-500/50"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
                    </div>
                    
                    <p className={`absolute top-4 right-4 text-[9px] uppercase font-bold font-mono tracking-widest ${showAnswer ? "text-indigo-200" : "text-emerald-400"}`}>
                      {showAnswer ? "Answer" : "Question"}
                    </p>

                    <h4 className={`text-center font-bold text-lg md:text-xl leading-relaxed max-w-lg ${showAnswer ? "drop-shadow-md text-white" : "text-zinc-100"}`}>
                      {showAnswer ? flashcards[activeFlashcard].answer : flashcards[activeFlashcard].question}
                    </h4>

                    <div className="absolute bottom-4 left-0 w-full text-center text-[10px] opacity-40 font-mono tracking-widest uppercase">
                      Tap card to flip
                    </div>
                  </div>
                </div>

                {/* Controls - High Visibility Next Button */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 relative z-10">
                  <span className="text-[10px] text-zinc-500 font-mono">
                    <Target className="w-3 h-3 inline mr-1" />
                    Adaptive Mode Active
                  </span>

                  <button
                    onClick={() => {
                      // Randomize next question that is not current
                      if (flashcards.length > 1) {
                        let nextRandom;
                        do {
                          nextRandom = Math.floor(Math.random() * flashcards.length);
                        } while (nextRandom === activeFlashcard);
                        setActiveFlashcard(nextRandom);
                      }
                      setShowAnswer(false);
                    }}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(99,102,241,0.4)] group overflow-hidden relative cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative z-10">Next Question</span>
                    <RefreshCw className="w-4 h-4 relative z-10 group-hover:rotate-180 transition-transform duration-700" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
