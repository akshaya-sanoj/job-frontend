import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios'; // <-- Using your custom API instance
import Footer from '../components/Footer';
import { CiSun } from "react-icons/ci";

const Register = ({ theme, toggleTheme }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Check if user already exists
      const checkUser = await api.get(`/users?email=${email}`);
      if (checkUser.data.length > 0) {
        setError('An account with this email already exists.');
        return;
      }

      // Create new user in json-server
      const { data } = await api.post('/users', {
        name,
        email,
        password
      });
      
      // Auto-login and redirect
      sessionStorage.setItem('user', JSON.stringify(data));
      navigate('/dashboard');
      
    } catch (err) {
      console.error("Registration error:", err);
      setError('Server error. Ensure json-server is running.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EA] dark:bg-[#080D1C] text-[#111827] dark:text-[#F5F1E8] font-sans relative overflow-hidden transition-colors duration-300 flex flex-col">
      
      {/* Soft Background Glow */}
      <div className="absolute top-0 left-0 -ml-48 -mt-48 w-96 h-96 rounded-full bg-[#C9A45C] opacity-10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 -mr-48 -mb-48 w-96 h-96 rounded-full bg-[#6D5A8D] opacity-10 blur-3xl pointer-events-none"></div>

      {/* Minimal Auth Navbar */}
      <nav className="max-w-7xl w-full mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-[#C9A45C] flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#111827]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-2xl uppercase font-bold tracking-tight">careerloom</span>
        </Link>
        
        {toggleTheme && (
          <button onClick={toggleTheme} className="text-xl p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            {theme === 'dark' ? <CiSun className="text-yellow-400 text-2xl" /> : '🌙'}
          </button>
        )}
      </nav>

      {/* Main Register Form Area */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10 w-full">
        <div className="bg-[#FFFFFF] dark:bg-[#111827] rounded-3xl p-8 md:p-10 shadow-2xl border border-[#E5DED0] dark:border-[#263044] w-full max-w-md transition-colors">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-[#111827] dark:text-[#F5F1E8] tracking-tight">Create Account</h2>
            <p className="text-[#6B7280] dark:text-[#9CA3AF] mt-2 text-sm">Join today and supercharge your job search.</p>
          </div>

          {error && (
            <div className="bg-[#9B3D3D]/10 border border-[#9B3D3D]/30 text-[#9B3D3D] dark:text-red-400 p-3 rounded-lg text-sm text-center mb-6 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#111827] dark:text-[#F5F1E8] mb-1.5">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 bg-[#F7F3EA]/50 dark:bg-[#050914]/50 border border-[#E5DED0] dark:border-[#263044] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A45C] text-[#111827] dark:text-[#F5F1E8] transition-all placeholder-[#6B7280] dark:placeholder-[#9CA3AF]"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#111827] dark:text-[#F5F1E8] mb-1.5">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 bg-[#F7F3EA]/50 dark:bg-[#050914]/50 border border-[#E5DED0] dark:border-[#263044] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A45C] text-[#111827] dark:text-[#F5F1E8] transition-all placeholder-[#6B7280] dark:placeholder-[#9CA3AF]"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-[#111827] dark:text-[#F5F1E8] mb-1.5">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 bg-[#F7F3EA]/50 dark:bg-[#050914]/50 border border-[#E5DED0] dark:border-[#263044] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A45C] text-[#111827] dark:text-[#F5F1E8] transition-all placeholder-[#6B7280] dark:placeholder-[#9CA3AF]"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#C9A45C] hover:bg-[#B18A42] text-[#111827] font-bold py-3.5 rounded-xl shadow-md transition-all hover:translate-y-[-1px] mt-2"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-[#6B7280] dark:text-[#9CA3AF] font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-[#C9A45C] dark:text-[#D4AF6A] hover:text-[#B18A42] transition-colors font-bold">
              Sign in here
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;