import React, { useState } from "react";
import { 
  Building, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  RefreshCw, 
  Code, 
  Laptop, 
  BarChart2, 
  Puzzle, 
  Lightbulb, 
  QrCode, 
  CheckCircle,
  FileCheck,
  Award,
  Calendar,
  Clock,
  User,
  Eye,
  FileText
} from "lucide-react";

export default function VerifiedSuccessCard({ 
  studentName, 
  course, 
  issueDate, 
  grade, 
  credentialId, 
  duration,
  institution,
  registrationNumber,
  avatarUrl,
  certificateImage, // Base64 or URL of the uploaded certificate file
  onReset 
}) {
  const [activeTab, setActiveTab] = useState(certificateImage ? "document" : "template"); // default to original doc if uploaded

  // Smart gender-based avatar fallback
  const getAvatarUrl = () => {
    if (avatarUrl) return avatarUrl;
    
    const nameLower = (studentName || "").toLowerCase();
    if (
      nameLower.includes("niranjan") || 
      nameLower.includes("john") || 
      nameLower.includes("bob") || 
      nameLower.includes("kovitapu") ||
      nameLower.includes("clarence") === false && (nameLower.includes("singh") || nameLower.includes("kumar"))
    ) {
      return "/student_headshot_male.jpg";
    }
    return "/student_headshot.jpg"; // default to female
  };

  // Custom SVG logo for Government Ministry
  const GovEmblemSVG = () => (
    <svg className="h-10 w-auto text-slate-700" viewBox="0 0 100 130" fill="currentColor">
      <path d="M50 10c12 0 16 8 16 12 0 6-6 10-6 10s4 2 4 6c0 5-5 8-8 8v6h12v4H32v-4h12v-6c-3 0-8-3-8-8 0-4 4-6 4-6s-6-4-6-10c0-4 4-12 16-12z" />
      <rect x="47" y="52" width="6" height="12" rx="1" />
      <path d="M35 70c0-10 30-10 30 0v10H35V70zm15 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      <path d="M38 95c0-3 3-5 12-5s12 2 12 5v15H38V95z" />
    </svg>
  );

  // Custom SVG logo for MSME
  const MSMELogoSVG = () => (
    <div className="flex flex-col items-center justify-center text-[8px] font-bold text-slate-800 leading-tight">
      <span className="text-sm tracking-wider text-blue-900 border-b border-amber-500 pb-0.5 font-extrabold">MSME</span>
      <span className="text-[6px] text-slate-500 uppercase tracking-widest mt-0.5">Micro, Small & Medium</span>
    </div>
  );

  return (
    <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-100 shadow-[0_20px_60px_rgba(99,102,241,0.08)] overflow-hidden animate-fade-in my-4">
      
      {/* Visual Top Accent Line */}
      <div className="h-2 bg-gradient-to-r from-indigo-900 via-purple-700 to-pink-500"></div>

      <div className="p-4 sm:p-8">
        
        {/* Verification Success Pill Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 px-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100/60 border border-emerald-200 text-emerald-800 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Verified Certificate Authentic
          </div>
          
          {/* Toggle Tabs (Only shown if certificateImage is available) */}
          {certificateImage && (
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveTab("document")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "document" 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Original Document
              </button>
              <button
                onClick={() => setActiveTab("template")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "template" 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Digitized Replica
              </button>
            </div>
          )}
        </div>

        {/* --- VIEW MODE A: ORIGINAL UPLOADED DOCUMENT --- */}
        {activeTab === "document" && certificateImage && (
          <div className="relative border-4 border-slate-900 rounded-2xl overflow-hidden shadow-lg bg-slate-950 flex justify-center items-center p-2 sm:p-4 max-h-[580px] animate-fade-in">
            <img 
              src={certificateImage} 
              alt="Uploaded Certificate Document" 
              className="max-h-[540px] w-full object-contain rounded-lg"
            />
            {/* Stamp Overlays */}
            <div className="absolute bottom-6 left-6 px-3 py-1.5 bg-emerald-500/90 text-white rounded-lg text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-xs shadow-md border border-emerald-400">
              ✓ Verified Authentic
            </div>
          </div>
        )}

        {/* --- VIEW MODE B: DYNAMIC REACT TEMPLATE --- */}
        {activeTab === "template" && (
          <div className="relative bg-[#FAF9F5] border-[12px] border-slate-900 rounded-2xl p-4 sm:p-8 md:p-10 shadow-inner text-[#0A1D37] overflow-hidden select-none animate-fade-in">
            
            {/* Certificate Inner Gold Accent Border */}
            <div className="absolute inset-1.5 border border-amber-600/60 pointer-events-none rounded-lg"></div>

            {/* Top Logo and Header Row */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-amber-500/30 pb-6 mb-6 relative">
              
              {/* Government Ministry logo */}
              <div className="flex items-center gap-3 w-48 shrink-0 justify-center md:justify-start">
                <GovEmblemSVG />
                <div className="text-[7.5px] font-extrabold uppercase text-slate-700 leading-tight">
                  Ministry of<br />Corporate Affairs<br />
                  <span className="text-slate-500 font-semibold text-[6.5px]">Government of India</span>
                </div>
              </div>

              {/* Central Amaramam Skill Hub Logo */}
              <div className="flex flex-col items-center text-center">
                <img 
                  src="https://www.amaramamskillhub.com/assets/logo-CvqXEK2L.png" 
                  alt="Amaramam Skill Hub" 
                  className="h-10 md:h-12 object-contain"
                />
                <span className="text-[8px] text-slate-400 tracking-widest mt-1 uppercase font-semibold">Learn • Build • Grow</span>
                <div className="mt-1.5 flex items-center gap-1 bg-[#FFF9ED] border border-amber-200/50 rounded-md px-2 py-0.5 text-[8px] font-bold text-amber-800">
                  <span className="text-emerald-600">#</span>startupindia
                </div>
              </div>

              {/* MSME & Certificate ID column */}
              <div className="flex flex-row md:flex-col items-center gap-4 w-48 shrink-0 justify-center md:justify-end">
                <MSMELogoSVG />
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">Certificate ID</span>
                  <span className="text-[10px] font-bold font-mono text-indigo-950 bg-[#0A1D37]/5 px-2 py-0.5 rounded border border-indigo-950/10">
                    {credentialId}
                  </span>
                </div>
              </div>

            </div>

            {/* Certificate Main Body */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch relative">
              
              {/* Left Column: Internship Highlights */}
              <div className="lg:col-span-1 bg-[#0A1D37] text-white rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-md">
                <div>
                  <h4 className="text-[10px] tracking-widest font-extrabold uppercase border-b border-white/20 pb-2 mb-4 text-amber-400">
                    Internship Highlights
                  </h4>
                  <ul className="space-y-3.5 text-[11px] text-slate-200">
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Code className="w-3.5 h-3.5 text-amber-400" />
                      </span>
                      <span>Software Development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Laptop className="w-3.5 h-3.5 text-amber-400" />
                      </span>
                      <span>Real-time Experience</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
                      </span>
                      <span>Data Analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Puzzle className="w-3.5 h-3.5 text-amber-400" />
                      </span>
                      <span>Problem Solving</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      </span>
                      <span>Industry Skills</span>
                    </li>
                  </ul>
                </div>

                {/* Verified Ribbon inside sidebar */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[10px] text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified Authentic Record</span>
                </div>
              </div>

              {/* Center/Right Main Content Area */}
              <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
                
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative">
                  
                  {/* Text Layout */}
                  <div className="flex-grow space-y-4">
                    <div className="text-center md:text-left">
                      <h3 className="font-serif text-3xl font-extrabold tracking-wide text-blue-900 leading-tight">
                        Certificate of Internship
                      </h3>
                      <div className="h-0.5 w-32 bg-amber-500 mt-2 mx-auto md:mx-0"></div>
                    </div>
                    
                    <div className="space-y-1 text-center md:text-left">
                      <p className="text-[10px] tracking-widest text-slate-500 font-semibold uppercase">
                        This Certificate is Proudly Presented To
                      </p>
                      <p className="font-serif italic text-3xl text-indigo-950 font-bold tracking-wide py-1">
                        {studentName}
                      </p>
                    </div>

                    <div className="space-y-1.5 text-center md:text-left">
                      <p className="text-xs text-slate-500">
                        for successfully completing an internship on
                      </p>
                      <p className="text-lg font-extrabold text-blue-950 tracking-wide font-sans">
                        {course}
                      </p>
                    </div>

                    {institution && (
                      <div className="space-y-0.5 text-center md:text-left pt-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">from</p>
                        <p className="text-xs font-bold text-emerald-800">
                          {institution.toUpperCase()}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right side: Student circular Photo Headshot */}
                  <div className="flex flex-col items-center justify-center shrink-0 w-36 mx-auto md:mx-0">
                    <div className="relative w-28 h-28 rounded-full border-4 border-amber-500/80 shadow-md overflow-hidden bg-slate-100 flex items-center justify-center">
                      <img 
                        src={getAvatarUrl()} 
                        alt={studentName}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop";
                        }} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-[8px] font-bold tracking-widest text-slate-500 block uppercase">COMMITTED TO EXCELLENCE</span>
                      <div className="flex justify-center gap-0.5 text-amber-500 mt-0.5">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Metadata Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-amber-500/20">
                  
                  {/* 1. DURATION */}
                  <div className="bg-[#FAF9F5] border border-slate-200/80 rounded-xl p-2.5 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-900 shrink-0" />
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-bold">Duration</span>
                      <span className="text-[10px] font-bold text-slate-800 leading-tight block">
                        {duration || "8 Weeks"}
                      </span>
                    </div>
                  </div>

                  {/* 2. REGISTRATION */}
                  <div className="bg-[#FAF9F5] border border-slate-200/80 rounded-xl p-2.5 flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-900 shrink-0" />
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-bold">Registration No</span>
                      <span className="text-[10px] font-bold text-slate-800 font-mono block">
                        {registrationNumber || "23891A05L1"}
                      </span>
                    </div>
                  </div>

                  {/* 3. DATE OF ISSUE */}
                  <div className="bg-[#FAF9F5] border border-slate-200/80 rounded-xl p-2.5 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-900 shrink-0" />
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-bold">Date of Issue</span>
                      <span className="text-[10px] font-bold text-slate-800 block">
                        {issueDate}
                      </span>
                    </div>
                  </div>

                  {/* 4. GRADE / STATUS */}
                  <div className="bg-[#FAF9F5] border border-slate-200/80 rounded-xl p-2.5 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-bold">Internship Status</span>
                      <span className="text-[10px] font-bold text-emerald-800 block">
                        {grade || "Completed"}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Lower footer row */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-200/40 text-slate-500 text-[9px]">
                  
                  {/* QR Code and verification tag */}
                  <div className="flex items-center gap-2.5">
                    <div className="p-1 bg-white border border-slate-200 rounded-md">
                      <QrCode className="w-8 h-8 text-slate-900" />
                    </div>
                    <div className="leading-tight">
                      <span className="font-bold text-slate-800 block uppercase">Verify Certificate</span>
                      <span>Scan QR code or visit www.amaramam.com/verify</span>
                    </div>
                  </div>

                  {/* Institution Signature block */}
                  <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-slate-200/50 pt-2 sm:pt-0 sm:pl-4">
                    <span className="block font-bold text-slate-700 uppercase">Authorized Signatory</span>
                    <span className="italic font-serif text-[10px] text-indigo-950 font-semibold block mt-0.5">Amaramam Skill Hub Board</span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* --- BOTTOM ACTION BUTTON (VERIFY ANOTHER) --- */}
        <div className="mt-8 max-w-lg mx-auto">
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-[#0A1D37] hover:bg-[#132c52] text-white font-medium rounded-xl transition-all duration-300 transform active:scale-98 shadow-lg cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 animate-spin-hover" />
            Verify Another Certificate
          </button>
        </div>

      </div>
    </div>
  );
}
