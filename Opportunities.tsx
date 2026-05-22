import React, { useState } from "react";
import { 
  Briefcase, 
  MapPin, 
  Search, 
  Calendar, 
  Award, 
  GraduationCap, 
  Layers, 
  TrendingUp, 
  CheckCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Opportunity } from "../types";

// Seed opportunities reflecting actual African tech/corporate student tracks
const opportunitiesSet: Opportunity[] = [];

interface OpportunitiesProps {
  opportunities?: Opportunity[];
  setOpportunities?: React.Dispatch<React.SetStateAction<Opportunity[]>>;
}

export default function Opportunities({ opportunities, setOpportunities }: OpportunitiesProps = {}) {
  const [filterType, setFilterType] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [bookmarkedList, setBookmarkedList] = useState<string[]>([]);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);

  const activeSet = opportunities || opportunitiesSet;

  // Filter opportunities list
  const filtered = activeSet.filter((opp) => {
    const matchesType = filterType === "All" || opp.type === filterType;
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedList.includes(id)) {
      setBookmarkedList(bookmarkedList.filter((bId) => bId !== id));
    } else {
      setBookmarkedList([...bookmarkedList, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Filters Column */}
      <div className="lg:col-span-4 space-y-4">
        
        {/* Search Panel Card */}
        <div className="bg-[#151B2B] rounded-2xl border border-white/10 p-5 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
            <Search className="w-4 h-4 text-emerald-400" /> Filter Pipelines
          </h3>
          
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-white/40" />
            <input
              type="text"
              placeholder="Search provider or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs bg-[#0A0F1E] border border-white/10 pl-8 pr-3 py-2 rounded-lg text-white pointer-events-auto placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>

          <div className="space-y-1 pt-1">
            {["All", "Scholarship", "Fellowship", "Internship", "Campus Gig", "Hackathon"].map((type) => {
              const active = filterType === type;
              return (
                <button
                  id={`opp-type-btn-${type}`}
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex justify-between items-center cursor-pointer ${
                    active 
                      ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold" 
                      : "bg-[#0A0F1E] text-white/60 border border-white/5 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{type}</span>
                  {active && <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Talent Pipe Advocacy Box */}
        <div className="p-4 bg-gradient-to-br from-[#1E293B]/40 to-black border border-white/10 rounded-2xl space-y-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider">
            <Award className="w-4 h-4 text-emerald-400" /> VC Career Conduit
          </div>
          <h4 className="text-xs font-bold font-display text-white">Are you a campus rep or brand sponsor?</h4>
          <p className="text-[11px] text-white/60 leading-relaxed">
            UniVerse allows domestic firms to safely launch hackathons, student brand ambassadorships, and targeted class work challenges. Our study registry makes finding your top 1% candidates extremely simple and fully validated.
          </p>
          <div className="pt-2">
            <button className="text-[11px] font-bold text-emerald-400 hover:text-white underline cursor-pointer">
              Partner with UniVerse Labs →
            </button>
          </div>
        </div>

      </div>

      {/* Main listings Column */}
      <div className="lg:col-span-8 space-y-4">
        
        {selectedOpp ? (
          /* Detailed Expanded view of selected Opportunity */
          <div className="bg-[#151B2B] rounded-2xl border border-white/10 p-6 space-y-5 shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start gap-3">
              <div>
                <button 
                  onClick={() => setSelectedOpp(null)} 
                  className="text-xs text-emerald-400 font-bold hover:underline mb-3 cursor-pointer inline-block"
                >
                  ← Return to Opportunity Board
                </button>
                <h3 className="text-lg font-bold text-white font-display leading-tight">{selectedOpp.title}</h3>
                <p className="text-xs text-emerald-400 font-mono mt-1 font-bold">{selectedOpp.provider}</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-1 bg-[#0A0F1E] text-white/60 border border-white/10 rounded-lg shrink-0 uppercase">
                {selectedOpp.type}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-[#0A0F1E] p-4 rounded-xl border border-white/5">
              <div>
                <p className="text-[9px] uppercase font-bold text-white/40 font-mono">Eligibility Scope</p>
                <p className="font-medium text-white/80 mt-1 leading-snug">{selectedOpp.eligibility}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-white/40 font-mono">Package / Benefits</p>
                <p className="font-bold text-emerald-400 mt-1 leading-snug">{selectedOpp.benefit}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-white/40 font-mono">Geographic Location</p>
                <p className="font-medium text-white/70 mt-1 flex items-center gap-1">📍 {selectedOpp.location}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-white/40 font-mono">Submission Deadline</p>
                <p className="font-bold text-rose-405 mt-1 font-mono text-rose-400">{selectedOpp.deadline}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase mb-1.5 font-mono">Description</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                {selectedOpp.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex flex-wrap gap-2 justify-between items-center">
              <span className="text-[10px] text-white/40 font-mono">Referenced on local networks</span>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => handleToggleBookmark(selectedOpp.id, e)}
                  className="px-3 py-1.5 border border-white/10 text-xs text-white/80 rounded-xl bg-[#0A0F1E] hover:bg-white/5 font-semibold cursor-pointer"
                >
                  {bookmarkedList.includes(selectedOpp.id) ? "❤️ Bookmarked" : "Save Opportunity"}
                </button>
                <a 
                  href={selectedOpp.applyUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="bg-emerald-505 hover:bg-emerald-600 bg-emerald-500 text-white px-4 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  Apply Directly <ExternalLink className="w-3.5 h-3.5 text-white/70" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* General List rendering */
          <div className="space-y-3.5">
            {filtered.length === 0 ? (
              <div className="bg-[#151B2B] rounded-2xl border border-white/10 p-12 text-center text-white/40">
                <p className="text-sm font-semibold">No active pipelines matched your criteria.</p>
                <p className="text-xs mt-1">Refine your search parameters or query keywords above.</p>
              </div>
            ) : (
              filtered.map((opp) => (
                <div 
                  key={opp.id}
                  onClick={() => setSelectedOpp(opp)}
                  className="bg-[#151B2B] border border-white/10 hover:border-white/20 rounded-2xl p-5 shadow-sm transition-all duration-200 cursor-pointer flex justify-between items-start gap-4 relative"
                >
                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#0A0F1E] border border-white/10 text-white/50 rounded uppercase tracking-wider">
                        {opp.type}
                      </span>
                      <span className="text-[10px] text-white/40 font-mono font-medium flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-white/30" /> {opp.location}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-sm font-display truncate pr-16">
                      {opp.title}
                    </h4>

                    <p className="text-xs text-white/40 leading-none font-bold">
                      Hosted by: <span className="text-emerald-400">{opp.provider}</span>
                    </p>

                    <div className="flex gap-4 pt-1 text-[11px] text-white/50 font-medium">
                      <p className="truncate max-w-xs">Eligibility: <span className="font-semibold text-white/80">{opp.eligibility}</span></p>
                      <p className="shrink-0 text-emerald-400 font-bold">Benefit: <span>{opp.benefit.split("+")[0]}</span></p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                    <button 
                      onClick={(e) => handleToggleBookmark(opp.id, e)}
                      className="text-white/30 hover:text-rose-500 p-1 rounded-full text-base cursor-pointer"
                    >
                      {bookmarkedList.includes(opp.id) ? "❤️" : "🤍"}
                    </button>
                    
                    <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-0.5 mt-4 hover:underline">
                      See Details <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>

    </div>
  );
}
