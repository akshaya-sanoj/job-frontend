import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../components/Footer';
import { CiSun } from "react-icons/ci";


const LandingPage = ({ theme = 'light', toggleTheme }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F3EA] dark:bg-[#080D1C] text-[#111827] dark:text-[#F5F1E8] font-sans relative overflow-hidden transition-colors duration-300 flex flex-col">
      
      {/* Soft Background Glow */}
      <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 rounded-full bg-[#C9A45C] opacity-10 blur-3xl pointer-events-none"></div>

      {/* Public Navbar */}
      <nav className="max-w-7xl w-full mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C9A45C] flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#111827]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-2xl i uppercase font-bold tracking-tight">careerloom</span>
        </div>
        
        <div className="flex items-center gap-6 font-medium">
          {/* NOTE: If this button is missing, you need to update App.jsx! */}
          {toggleTheme && (
            <button onClick={toggleTheme} className="text-xl p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              {theme === 'dark' ? <CiSun className="text-yellow-400 text-2xl" /> : '🌙'}
            </button>
          )}
          <Link to="/login" className="hover:text-[#C9A45C] transition-colors">Sign In</Link>
          <Link to="/register" className="bg-[#C9A45C] hover:bg-[#B18A42] text-[#111827] px-5 py-2.5 rounded-lg shadow-sm transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        
        {/* Left Column: Copy & CTAs */}
        <div data-aos="fade-right">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A45C] text-[#B18A42] dark:text-[#D4AF6A] text-sm font-semibold mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Your complete job search command center
          </div>
          
          <p className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Land your next <br />
            <span className="text-[#C9A45C]">dream job faster</span>
          </p>
          
          <p className="text-lg lg:text-xl text-[#111827]/70 dark:text-[#F5F1E8]/70 mb-10 max-w-lg leading-relaxed">
            Track every application, schedule interviews, analyze your progress, and generate reports — all in one beautifully designed dashboard.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-14">
            <Link to="/register" className="flex items-center gap-2 bg-[#C9A45C] hover:bg-[#B18A42] text-[#111827] px-8 py-3.5 rounded-xl font-bold shadow-md transition-all hover:translate-y-[-2px]">
              Start Free Today
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link to="/login" className="px-8 py-3.5 rounded-xl font-bold border-2 border-[#E5DED0] dark:border-[#263044] hover:bg-[#E5DED0]/50 dark:hover:bg-[#263044]/50 transition-colors">
              Sign In
            </Link>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="text-2xl font-black">5+</h4>
              <p className="text-sm text-[#111827]/60 dark:text-[#F5F1E8]/60 mt-1">Status Types</p>
            </div>
            <div>
              <h4 className="text-2xl font-black">6</h4>
              <p className="text-sm text-[#111827]/60 dark:text-[#F5F1E8]/60 mt-1">Chart Variations</p>
            </div>
            <div>
              <h4 className="text-2xl font-black">100%</h4>
              <p className="text-sm text-[#111827]/60 dark:text-[#F5F1E8]/60 mt-1">Data Private</p>
            </div>
          </div>
        </div>

        {/* Right Column: Mock Dashboard UI */}
        <div data-aos="fade-left" className="relative lg:ml-10">
          
          {/* Main Mock Card */}
          <div className="bg-white dark:bg-[#050914] rounded-3xl p-8 shadow-2xl border border-[#E5DED0] dark:border-[#263044] relative z-10 w-full max-w-[500px] ml-auto">
            
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Dashboard</p>
                <h3 className="font-bold text-lg text-[#0B132B] dark:text-white">Job Search Overview</h3>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#C9A45C] flex items-center justify-center opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#111827]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Mock Stat Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-3">
                  <div className="w-4 h-4 border-2 border-green-500 rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div></div>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white">3</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Offers</p>
                </div>
              </div>
              <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white">7</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Interviews</p>
                </div>
              </div>
              <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-full bg-[#F7F3EA] dark:bg-gray-800 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#C9A45C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white">24</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Applied</p>
                </div>
              </div>
            </div>

            {/* Mock Chart Area */}
            <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#C9A45C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                Applications by Status
              </div>
              <div className="h-10 mt-2"></div>
            </div>

            {/* Mock List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google — Frontend Dev</span>
                <div className="w-2 h-2 rounded-full bg-[#C9A45C]"></div>
              </div>
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Stripe — Product Eng</span>
                <div className="w-2 h-2 rounded-full bg-[#C9A45C]"></div>
              </div>
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Vercel — UX Engineer</span>
                <div className="w-2 h-2 rounded-full bg-[#C9A45C]"></div>
              </div>
            </div>
          </div>

          {/* Floating Widget (Restored!) */}
       

        </div>
      </main>

      {/* Footer Included Here */}
      <Footer />

    </div>
  );
};

export default LandingPage;