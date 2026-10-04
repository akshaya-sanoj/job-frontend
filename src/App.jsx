import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JobTracker from './pages/JobTracker';
import CalendarView from './pages/CalendarView';

// Route Guard to protect internal pages
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('user');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  // Load theme from local storage
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Attach the native Tailwind 'dark' class to the HTML tag
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // The toggle function passed to the Navbar
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes - PROPS ADDED HERE SO THE TOGGLE BUTTON WORKS! */}
        <Route path="/" element={<LandingPage theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/login" element={<Login theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/register" element={<Register theme={theme} toggleTheme={toggleTheme} />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><Dashboard theme={theme} toggleTheme={toggleTheme} /></ProtectedRoute>} 
        />
        <Route 
          path="/tracker" 
          element={<ProtectedRoute><JobTracker theme={theme} toggleTheme={toggleTheme} /></ProtectedRoute>} 
        />
        <Route 
          path="/calendar" 
          element={<ProtectedRoute><CalendarView theme={theme} toggleTheme={toggleTheme} /></ProtectedRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default App;