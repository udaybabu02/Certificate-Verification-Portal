import { useState, useEffect } from "react";
import { 
  Search, 
  User, 
  FileCheck, 
  AlertCircle, 
  Loader2, 
  Building, 
  Phone, 
  Mail, 
  Globe, 
  MapPin,
  X as CloseIcon,
  Database,
  ArrowLeft,
  Lock,
  Info,
  LogIn
} from "lucide-react";
import { mockCertificates } from "./mockData";
import VerifiedSuccessCard from "./components/VerifiedSuccessCard";
import AdminUploadDashboard from "./components/AdminUploadDashboard";
import { supabase, isSupabaseConfigured } from "./supabaseClient";

// Inline Custom SVG Icons to prevent missing export errors in bundlers
const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764.784.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.387.51a3.003 3.003 0 0 0-2.11 2.108C0 8.025 0 12 0 12s0 3.975.503 5.837a3.003 3.003 0 0 0 2.11 2.108c1.862.51 9.387.51 9.387.51s7.525 0 9.387-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.36-.49.99-.75 3.87-1.69 6.45-2.8 7.74-3.32 3.69-1.5 4.45-1.76 4.95-1.77.11 0 .36.03.52.16.13.1.17.24.19.34.02.1.02.26.01.32z"/>
  </svg>
);

const WhatsappIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.634-1.02-5.11-2.884-6.978C16.578 1.895 14.1 .874 11.47 1.874c-5.437 0-9.86 4.42-9.864 9.864-.001 1.73.488 3.42 1.416 4.919l-.95 3.473 3.568-.936zM17.56 14.24c-.304-.152-1.8-.886-2.079-.988-.278-.102-.48-.152-.68.152-.2.304-.775.988-.95 1.192-.175.203-.35.228-.654.076-.304-.152-1.285-.473-2.448-1.51-1.009-.9-1.69-2.012-1.888-2.352-.198-.34-.021-.524.15-.675.154-.136.304-.355.456-.532.152-.178.203-.304.304-.507.102-.203.05-.38-.025-.532-.076-.152-.68-1.64-.932-2.25-.247-.591-.497-.512-.68-.521-.176-.009-.377-.01-.578-.01-.2 0-.527.076-.803.38-.277.304-1.058 1.033-1.058 2.52 0 1.488 1.082 2.923 1.232 3.126.15.203 2.13 3.253 5.16 4.56.72.31 1.282.496 1.72.636.724.23 1.381.197 1.9.12.579-.086 1.8-.736 2.054-1.446.253-.71.253-1.317.177-1.446-.077-.127-.278-.203-.58-.355z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.23 0-5.856-2.628-5.856-5.857 0-3.228 2.628-5.856 5.856-5.856 1.43 0 2.738.514 3.754 1.363l3.05-3.05C18.876 3.197 15.76 2 12.24 2 6.583 2 2 6.583 2 12.24s4.583 10.24 10.24 10.24c5.795 0 10.254-4.074 10.254-10.24 0-.695-.08-1.355-.22-1.955H12.24z"/>
  </svg>
);

function App() {
  // Helper to determine initial view based on URL pathname
  const getInitialView = () => {
    const path = window.location.pathname;
    if (path === "/admin" || path === "/admin/") {
      return "admin";
    }
    return "public";
  };

  // Navigation & Auth States
  const [view, setView] = useState(getInitialView()); // public, admin
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoginError, setAdminLoginError] = useState("");

  // Verification Form States
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [status, setStatus] = useState("default"); // default, loading, success, error
  const [verifiedCertificate, setVerifiedCertificate] = useState(null);
  const [touched, setTouched] = useState({ reg: false, name: false });
  const [showChatPopup, setShowChatPopup] = useState(true);

  // Sync state-based view changes to URL bar path history
  const navigateTo = (newView) => {
    setView(newView);
    const newPath = newView === "admin" ? "/admin" : "/";
    window.history.pushState({}, "", newPath);
    if (newView === "public") {
      handleAdminLogout();
    }
  };

  // Listen to popstate (Back/Forward browser buttons) to keep URL and view in sync
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/admin" || path === "/admin/") {
        setView("admin");
      } else {
        setView("public");
        handleAdminLogout();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Handle public check certificate query
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!registrationNumber.trim() || !studentName.trim()) {
      setTouched({ reg: true, name: true });
      return;
    }

    setStatus("loading");

    // Connect to Supabase if configured, otherwise fall back to mock data
    if (isSupabaseConfigured) {
      try {
        // Query the certificates table
        const { data, error } = await supabase
          .from("certificates")
          .select("*")
          .ilike("registration_number", registrationNumber.trim())
          .ilike("student_name", studentName.trim())
          .maybeSingle();

        if (error) throw error;

        // Small simulated latency for UX loading spinner
        setTimeout(() => {
          if (data) {
            setVerifiedCertificate({
              studentName: data.student_name,
              course: data.course_name || data.course, // maps course_name
              issueDate: data.issue_date || data.issueDate, // maps issue_date
              grade: data.status || data.grade, // maps status column to grade display
              credentialId: data.credential_id || data.credentialId || `ARMS/0006/2025-2026`, // fallback ID
              duration: data.duration || "8 Weeks", 
              institution: data.institution || "Sagi Rama Krishnam Raju Engineering College, Bhimavaram",
              registrationNumber: data.registration_number,
              certificateImage: data.certificate_image // Map the uploaded certificate image!
            });
            setStatus("success");
          } else {
            setVerifiedCertificate(null);
            setStatus("error");
          }
        }, 1200);

      } catch (err) {
        console.error("Database query failed:", err);
        setTimeout(() => {
          setStatus("error");
        }, 1200);
      }
    } else {
      // Fallback Mock Mode lookup (read custom certificates from localStorage first)
      setTimeout(() => {
        const stored = localStorage.getItem("custom_certificates");
        const customCerts = stored ? JSON.parse(stored) : [];
        const combinedCerts = [...customCerts, ...mockCertificates];

        const match = combinedCerts.find(
          (cert) =>
            (cert.registrationNumber || "").trim().toLowerCase() === registrationNumber.trim().toLowerCase() &&
            (cert.studentName || "").trim().toLowerCase() === studentName.trim().toLowerCase()
        );

        if (match) {
          setVerifiedCertificate(match);
          setStatus("success");
        } else {
          setVerifiedCertificate(null);
          setStatus("error");
        }
      }, 1200);
    }
  };

  // Admin Login Handle
  const handleAdminLogin = (e) => {
    e.preventDefault();
    setAdminLoginError("");
    if (adminPassword === "admin") {
      setIsAdminLoggedIn(true);
      setAdminPassword("");
    } else {
      setAdminLoginError("Invalid administrator password.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminPassword("");
    setAdminLoginError("");
  };

  const resetForm = () => {
    setRegistrationNumber("");
    setStudentName("");
    setVerifiedCertificate(null);
    setStatus("default");
    setTouched({ reg: false, name: false });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-slate-50 via-indigo-50/15 to-slate-100 font-sans antialiased text-slate-800 relative overflow-hidden">
      
      {/* Decorative Aurora Floating Glow Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-400/10 blur-[120px] pointer-events-none"></div>
      
      {/* Top Header Row / Navigation */}
      <header className="w-full pt-10 pb-4 flex flex-col items-center justify-center relative px-4 z-10">
        
        {/* Brand logo only shown on Public view (Admin Dashboard uses its own Nav bar) */}
        {view === "public" && (
          <div className="flex flex-col items-center gap-2">
            {/* Moderately Sized Glass-Glow Container for Logo */}
            <div className="bg-white/85 backdrop-blur-md p-4 sm:p-5 rounded-[1.75rem] border border-white/60 shadow-[0_15px_40px_rgba(99,102,241,0.05)] hover:shadow-[0_25px_60px_rgba(99,102,241,0.1)] hover:scale-[1.02] transition-all duration-300 mb-2 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src="https://www.amaramamskillhub.com/assets/logo-CvqXEK2L.png" 
                alt="Amaramam Skill Hub Logo" 
                className="h-14 sm:h-16 md:h-20 object-contain relative z-10"
              />
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center px-4 py-6 z-10">
        
        {/* ----------------- PUBLIC VIEW ----------------- */}
        {view === "public" && (
          <>
            {status === "success" && verifiedCertificate ? (
              <VerifiedSuccessCard
                studentName={verifiedCertificate.studentName}
                course={verifiedCertificate.course}
                issueDate={verifiedCertificate.issueDate}
                grade={verifiedCertificate.grade}
                credentialId={verifiedCertificate.credentialId}
                duration={verifiedCertificate.duration}
                institution={verifiedCertificate.institution}
                registrationNumber={verifiedCertificate.registrationNumber}
                avatarUrl={verifiedCertificate.avatarUrl}
                certificateImage={verifiedCertificate.certificateImage}
                onReset={resetForm}
              />
            ) : (
              <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-[0_30px_80px_rgba(99,102,241,0.08)] overflow-hidden transition-all duration-500 hover:shadow-[0_35px_90px_rgba(99,102,241,0.12)] animate-fade-in">
                
                {/* Accent Top Bar */}
                <div className="h-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"></div>
 
                <div className="p-6 sm:p-10">
                  {/* Header Text inside Card */}
                  <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Online Certificate Verification
                    </h1>
                    <p className="text-slate-500 mt-2 text-sm">
                      Verify credential authenticity issued by Amaramam Skill Hub
                    </p>
                  </div>

                  {/* Error State Banner */}
                  {status === "error" && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 animate-fade-in">
                      <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-rose-800 text-sm">Verification Failed</h3>
                        <p className="text-rose-600 text-xs mt-0.5">
                          Certificate not found. Please check your Registration Number and Name.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Search Form State */}
                  <form onSubmit={handleVerify} className="space-y-6">
                    
                    {/* Registration Number Field */}
                    <div>
                      <label 
                        htmlFor="registrationNumber" 
                        className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
                      >
                        Registration Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Search className="w-4.5 h-4.5" />
                        </div>
                        <input
                          type="text"
                          id="registrationNumber"
                          required
                          placeholder="e.g. 23891A05L1"
                          value={registrationNumber}
                          disabled={status === "loading"}
                          onBlur={() => setTouched(prev => ({ ...prev, reg: true }))}
                          onChange={(e) => setRegistrationNumber(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:bg-white focus:ring-3 transition-all duration-200 ${
                            touched.reg && !registrationNumber.trim() 
                          ? "border-rose-300 focus:ring-rose-100" 
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                          }`}
                        />
                      </div>
                      {touched.reg && !registrationNumber.trim() && (
                        <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> Registration Number is required.
                        </p>
                      )}
                    </div>

                    {/* Student Full Name Field */}
                    <div>
                      <label 
                        htmlFor="studentName" 
                        className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2"
                      >
                        Student Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4.5 h-4.5" />
                        </div>
                        <input
                          type="text"
                          id="studentName"
                          required
                          placeholder="e.g. Moka Clarence Nightingale"
                          value={studentName}
                          disabled={status === "loading"}
                          onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                          onChange={(e) => setStudentName(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:bg-white focus:ring-3 transition-all duration-200 ${
                            touched.name && !studentName.trim() 
                          ? "border-rose-300 focus:ring-rose-100" 
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                          }`}
                        />
                      </div>
                      {touched.name && !studentName.trim() && (
                        <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> Student Full Name is required.
                        </p>
                      )}
                    </div>

                    {/* Helper text */}
                    <p className="text-[11px] text-slate-400 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      Please enter the details exactly as they appear on your certificate.
                    </p>

                    {/* Submit Action Button */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium rounded-xl transition-all duration-300 transform active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/10 cursor-pointer"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Checking Certificate...
                        </>
                      ) : (
                        <>
                          <FileCheck className="w-5 h-5" />
                          Check Certificate
                        </>
                      )}
                    </button>
                  </form>


                </div>
              </div>
            )}
          </>
        )}

        {/* ----------------- ADMIN VIEW ----------------- */}
        {view === "admin" && (
          <div className="w-full px-4">
            
            {/* Admin Login Box */}
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden">
                <div className="h-2 bg-slate-900"></div>
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/80 inline-block mb-3">
                      <img 
                        src="https://www.amaramamskillhub.com/assets/logo-CvqXEK2L.png" 
                        alt="Amaramam Skill Hub Logo" 
                        className="h-10 object-contain mx-auto"
                      />
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-950 flex items-center justify-center gap-1.5">
                      <Lock className="w-4 h-4 text-slate-800" />
                      Admin Login
                    </h2>
                    <p className="text-slate-400 text-[10px] mt-1 uppercase tracking-wider font-semibold">Database Management Access</p>
                  </div>
                  {adminLoginError && (
                    <div className="mb-4 p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-xs text-rose-700">
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{adminLoginError}</span>
                    </div>
                  )}
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
                      <input 
                        type="password" 
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="Default password is 'admin'"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:bg-white focus:ring-3 focus:ring-indigo-100 focus:border-slate-800 transition-all duration-200"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-slate-950 hover:bg-slate-900 text-white font-medium rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <LogIn className="w-4 h-4" />
                      Login to Dashboard
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              /* Admin Upload Dashboard Component */
              <AdminUploadDashboard 
                onBackToPortal={() => { 
                  navigateTo("public"); 
                }} 
              />
            )}

          </div>
        )}

      </main>

      {/* Footer Section */}
      <footer className="w-full bg-white text-slate-600 py-12 px-6 border-t border-slate-200/60 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-sm">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-4">
            <div className="flex items-center mb-1">
              <img 
                src="https://www.amaramamskillhub.com/assets/logo-CvqXEK2L.png" 
                alt="Amaramam Skill Hub Logo" 
                className="h-14 object-contain"
              />
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              Empowering learners with real-world, industry-aligned skills in AI, Web Development, Design, Marketing, and more.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-center transition-all duration-200 text-slate-600 cursor-pointer">
                <LinkedinIcon />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-pink-50 hover:text-pink-600 flex items-center justify-center transition-all duration-200 text-slate-600 cursor-pointer">
                <InstagramIcon />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-all duration-200 text-slate-600 cursor-pointer">
                <FacebookIcon />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 hover:text-black flex items-center justify-center transition-all duration-200 text-slate-600 cursor-pointer">
                <XIcon />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-all duration-200 text-slate-600 cursor-pointer">
                <YoutubeIcon />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-600 flex items-center justify-center transition-all duration-200 text-slate-600 cursor-pointer">
                <TelegramIcon />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 flex items-center justify-center transition-all duration-200 text-slate-600 cursor-pointer">
                <WhatsappIcon />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-555 flex items-center justify-center transition-all duration-200 text-slate-600 cursor-pointer">
                <GoogleIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-semibold tracking-wider uppercase text-xs">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#" className="hover:text-blue-700 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-700 transition-colors">Courses</a></li>
              <li><a href="#" className="hover:text-blue-700 transition-colors">Programs</a></li>
              <li><a href="#" className="hover:text-blue-700 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-700 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-700 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-semibold tracking-wider uppercase text-xs">Legal</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#" className="hover:text-blue-700 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-blue-700 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-700 transition-colors">Refund & Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-blue-700 transition-colors">Disclaimer</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-semibold tracking-wider uppercase text-xs">Contact Us</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Vijayawada, Andhra Pradesh, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <a href="tel:+917075851158" className="hover:text-blue-700 transition-colors">+917075851158</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <a href="mailto:info@amaramam.com" className="hover:text-blue-700 transition-colors">info@amaramam.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-6xl mx-auto pt-6 border-t border-slate-200/60 text-center text-xs text-slate-400">
          &copy; 2026 Amaramam Skill Hub. All rights reserved.
        </div>
      </footer>

      {/* Floating Chat Widget */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50 animate-fade-in">
        {showChatPopup && (
          <div className="relative bg-white rounded-2xl p-4 shadow-xl border border-slate-100 max-w-[240px] text-slate-800 text-xs flex flex-col gap-1.5">
            {/* Close Button */}
            <button 
              onClick={() => setShowChatPopup(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
            <span className="font-semibold text-slate-900 flex items-center gap-1">
              Hi 👋
            </span>
            <p className="text-slate-600">Any enquiry about courses?</p>
            <a 
              href="https://wa.me/917075851158" 
              target="_blank" 
              rel="noreferrer"
              className="text-blue-600 hover:text-blue-700 font-semibold underline mt-0.5 inline-block"
            >
              Chat with us!
            </a>
            {/* Triangle indicator pointing to the call button */}
            <div className="absolute bottom-[-6px] right-5 w-3 h-3 bg-white rotate-45 border-r border-b border-slate-100"></div>
          </div>
        )}
        <a
          href="https://wa.me/917075851158"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <WhatsappIcon className="w-6 h-6" />
        </a>
      </div>

    </div>
  );
}

export default App;
