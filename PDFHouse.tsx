import React, { useState } from "react";
import { FileText, Upload, Trash2, Search, CheckCircle, AlertCircle, Building2, GraduationCap, Layers, Download } from "lucide-react";

interface PDFDocument {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  university: string;
  faculty: string;
  level: string;
}

export default function PDFHouse() {
  const [university, setUniversity] = useState("");
  const [faculty, setFaculty] = useState("");
  const [level, setLevel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState<PDFDocument[]>([
    {
      id: "demo-doc-1",
      name: "CSC 201 - Intro to Programming.pdf",
      size: "2.4 MB",
      uploadedAt: "2 days ago",
      university: "UNILAG",
      faculty: "Science",
      level: "200L"
    },
    {
      id: "demo-doc-2",
      name: "GST 101 - Use of English.pdf",
      size: "1.1 MB",
      uploadedAt: "1 week ago",
      university: "General",
      faculty: "General",
      level: "100L"
    },
    {
      id: "demo-doc-3",
      name: "PHY 101 - Mechanics Notes.pdf",
      size: "4.8 MB",
      uploadedAt: "3 weeks ago",
      university: "OAU",
      faculty: "Science",
      level: "100L"
    }
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    let files: FileList | null = null;
    if ("files" in e.target) {
      files = (e.target as HTMLInputElement).files;
    } else if ("dataTransfer" in e) {
      files = (e as React.DragEvent).dataTransfer.files;
    }

    if (files && files.length > 0) {
      setIsUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        const newDocs: PDFDocument[] = Array.from(files!).map(file => ({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
          uploadedAt: new Date().toLocaleDateString(),
          university: university || "All Universities",
          faculty: faculty || "General Faculty",
          level: level || "All Levels"
        }));

        setUploadedDocs(prev => [...newDocs, ...prev]);
        setIsUploading(false);
      }, 1500);
    }
  };

  const removeDoc = (id: string) => {
    setUploadedDocs(prev => prev.filter(doc => doc.id !== id));
  };

  const handleDownload = (doc: PDFDocument) => {
    // Creating a mock download action
    const blob = new Blob(["Mock PDF Content for " + doc.name], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredDocs = uploadedDocs.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.faculty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header section */}
      <header className="space-y-2 text-left">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-white font-display uppercase tracking-tight">University PDF House</h2>
        </div>
        <p className="text-sm text-zinc-500 max-w-2xl font-medium">
          Centralized repository for sessional slides, past questions, and departmental notes. 
          Upload directly from your device to share with peers.
        </p>
      </header>

      {/* Target Configuration Card */}
      <div className="p-6 bg-[#121829] border border-white/5 rounded-3xl space-y-5 text-left">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-black text-white uppercase tracking-widest font-mono">Archive Target Metadata</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono tracking-widest ml-1">University / Institution</label>
            <div className="relative group">
              <Building2 className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-600 group-focus-within:text-emerald-400 transition-colors" />
              <input 
                type="text" 
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="e.g. Obafemi Awolowo University"
                className="w-full bg-[#070B16] border border-white/10 rounded-2xl py-3.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-all font-bold placeholder:text-zinc-600 shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono tracking-widest ml-1">Department / Faculty</label>
            <div className="relative group">
              <GraduationCap className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-600 group-focus-within:text-emerald-400 transition-colors" />
              <input 
                type="text" 
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                placeholder="e.g. Computer Science & Eng"
                className="w-full bg-[#070B16] border border-white/10 rounded-2xl py-3.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-all font-bold placeholder:text-zinc-600 shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-zinc-500 font-mono tracking-widest ml-1">Academic Level</label>
            <div className="relative group">
              <Layers className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-600 group-focus-within:text-emerald-400 transition-colors" />
              <select 
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-[#070B16] border border-white/10 rounded-2xl py-3.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-all font-bold appearance-none shadow-inner"
              >
                <option value="">Select Level</option>
                <option value="100L">100 Level</option>
                <option value="200L">200 Level</option>
                <option value="300L">300 Level</option>
                <option value="400L">400 Level</option>
                <option value="500L">500 Level</option>
                <option value="Post-grad">Postgraduate</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFileUpload(e); }}
        className={`relative border-2 border-dashed rounded-3xl p-10 transition-all duration-300 text-center ${
          dragActive ? "border-emerald-500 bg-emerald-500/5" : "border-white/5 bg-[#121829]/50 hover:bg-[#121829] hover:border-white/15"
        }`}
      >
        <input 
          type="file" 
          id="pdf-upload"
          multiple 
          accept=".pdf"
          onChange={handleFileUpload}
          className="hidden"
        />
        <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center gap-4">
          <div className={`p-5 rounded-full transition-transform duration-300 ${isUploading ? "animate-pulse scale-110 bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-zinc-400 group-hover:scale-110"}`}>
            {isUploading ? <CheckCircle className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Click to upload or drag & drop PDFs</h4>
            <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest font-mono">Maximum 50MB per file • High-fidelity PDF only</p>
          </div>
        </label>

        {isUploading && (
          <div className="absolute inset-0 bg-[#070B16]/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center space-y-4 z-10">
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 animate-[loading_1.5s_ease-in-out_infinite]" />
            </div>
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest font-mono">Uploading & Saving File...</p>
          </div>
        )}
      </div>

      {/* Uploaded Documents List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
          <h3 className="text-xs font-black text-white uppercase tracking-widest font-mono">Sessional Archives ({filteredDocs.length})</h3>
          
          <div className="relative group flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-600 group-focus-within:text-emerald-400 transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PDFs, university, faculty..."
              className="w-full bg-[#070B16] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-all font-bold placeholder:text-zinc-600 shadow-inner"
            />
          </div>
        </div>

        {filteredDocs.length === 0 ? (
          <div className="p-12 border border-white/5 rounded-3xl bg-[#121829]/30 flex flex-col items-center justify-center text-center space-y-3 opacity-60">
            <AlertCircle className="w-10 h-10 text-zinc-700" />
            <p className="text-xs font-semibold text-zinc-500">No documents found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="p-4 bg-[#121829] border border-white/5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-950/10">
                <div className="flex items-center gap-4 text-left overflow-hidden">
                  <div className="w-10 h-10 shrink-0 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    <h5 className="text-xs font-bold text-white truncate w-full">{doc.name}</h5>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span className="truncate">{doc.university}</span>
                      <span>•</span>
                      <span>{doc.level}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button 
                    onClick={() => handleDownload(doc)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest font-mono"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <button 
                    onClick={() => removeDoc(doc.id)}
                    className="p-1.5 text-zinc-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; left: 0%; }
          50% { width: 100%; left: 0%; }
          100% { width: 0%; left: 100%; }
        }
      `}</style>
    </div>
  );
}
