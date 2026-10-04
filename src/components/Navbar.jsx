import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSun } from "react-icons/ci";

const Navbar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-[#0B132B] dark:bg-[#050914] text-[#F7F3EA] dark:text-[#F5F1E8] p-4 shadow-md transition-colors duration-300 border-b border-[#E5DED0]/10 dark:border-[#263044]">
      <div className="max-w-7xl mx-auto flex justify-between items-center k">
        <Link to="/dashboard" className="text-xl i  uppercase font-bold text-[#C9A45C] dark:text-[#D4AF6A]">CareerLoom</Link>
        
        <div className="flex items-center gap-6 text-lg">
          <Link to="/dashboard" className="hover:text-[#C9A45C] dark:hover:text-[#D4AF6A] transition-colors">Dashboard</Link>
          <Link to="/tracker" className="hover:text-[#C9A45C] dark:hover:text-[#D4AF6A] transition-colors">Applications</Link>
          <Link to="/calendar" className="hover:text-[#C9A45C] dark:hover:text-[#D4AF6A] transition-colors">Calendar</Link>
          
      
        </div>

        <div className='flex justify-between items-center gap-6'>
          <button
  onClick={toggleTheme}
  className="text-3xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
  title="Toggle Dark/Light Mode"
>
  {theme === 'dark' ? <CiSun className="text-yellow-400 text-2xl" /> : '🌙'}
</button>

          <span className="text-[#F7F3EA]/70 dark:text-[#9CA3AF] text-xl c ">Hi, <span className='r capitalize'>{user?.name || 'User'}</span> </span>
          <button 
            onClick={handleLogout} 
            className="bg-[#C9A45C] hover:bg-[#B18A42] dark:bg-[#D4AF6A] dark:hover:bg-[#C9A45C] text-[#111827] px-4 py-1.5 rounded-md text-sm font-bold transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;