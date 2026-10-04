import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-[#E5DED0] dark:border-[#263044] bg-[#F7F3EA] dark:bg-[#050914] py-8 relative z-10 w-full transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#C9A45C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="font-bold uppercase text-[#111827] dark:text-[#F5F1E8]">CareerLoom</span>
        </div>
        
        {/* Copyright */}
        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          © {new Date().getFullYear()} JobTrack. All rights reserved.
        </p>
        
        {/* Links */}
        <div className="flex gap-6 text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">
          <Link to="#" className="hover:text-[#C9A45C] dark:hover:text-[#D4AF6A] transition-colors">Privacy</Link>
          <Link to="#" className="hover:text-[#C9A45C] dark:hover:text-[#D4AF6A] transition-colors">Terms</Link>
          <Link to="#" className="hover:text-[#C9A45C] dark:hover:text-[#D4AF6A] transition-colors">Contact</Link>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;