import React, { useState, useEffect } from 'react';
import api from '../api/axios'; // <-- USING THE NEW API INSTANCE
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import Navbar from '../components/Navbar';

const Dashboard = ({ theme, toggleTheme }) => {
  const [applications, setApplications] = useState([]);
  
  // Get the logged-in user
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    // Fetch only the logged-in user's applications using the centralized API
    const fetchApplications = async () => {
      try {
        const { data } = await api.get(`/applications?userId=${user.id}`);
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, [user?.id]);

  // --- 1. CALCULATE SUMMARY STATISTICS ---
  const totalApplications = applications.length;
  const interviewsScheduled = applications.filter(app => app.status === 'Interview Scheduled').length;
  const offersReceived = applications.filter(app => app.status === 'Offer Received').length;
  const rejected = applications.filter(app => app.status === 'Rejected').length;

  // --- 2. PREPARE DATA FOR STATUS PIE CHART ---
  const statusData = [
    { name: 'Applied', value: applications.filter(app => app.status === 'Applied').length },
    { name: 'Interview', value: interviewsScheduled },
    { name: 'Offer', value: offersReceived },
    { name: 'Rejected', value: rejected }
  ].filter(item => item.value > 0); 

  // CUSTOM DESIGN SYSTEM STATUS COLORS
  const COLORS = ['#6D5A8D', '#286B8A', '#397A5A', '#9B3D3D']; 

  // --- 3. PREPARE DATA FOR MONTHLY BAR CHART ---
  const processMonthlyData = () => {
    const monthlyCounts = {};
    
    applications.forEach(app => {
      if (app.applicationDate) {
        const date = new Date(app.applicationDate);
        const month = date.toLocaleString('default', { month: 'short' });
        monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
      }
    });

    const monthOrder = { 'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12 };
    
    return Object.keys(monthlyCounts)
      .map(key => ({ name: key, count: monthlyCounts[key] }))
      .sort((a, b) => monthOrder[a.name] - monthOrder[b.name]);
  };

  const monthlyData = processMonthlyData();

  // Chart styling based on theme
  const chartTextColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  const tooltipBg = theme === 'dark' ? '#111827' : '#FFFFFF';
  const tooltipBorder = theme === 'dark' ? '#263044' : '#E5DED0';

  return (
    <div className="min-h-screen bg-[#F7F3EA] dark:bg-[#080D1C] transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="max-w-7xl mx-auto p-6 mt-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827] dark:text-[#F5F1E8]">Dashboard Analytics</h1>
          <p className="text-[#6B7280] dark:text-[#9CA3AF] mt-2">Overview of your job application journey.</p>
        </div>

        {/* --- SUMMARY STATISTICS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#FFFFFF] dark:bg-[#111827] p-6 rounded-xl shadow-sm border border-[#E5DED0] dark:border-[#263044] transition-colors">
            <h3 className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">Total Applications</h3>
            <p className="text-3xl font-bold text-[#111827] dark:text-[#F5F1E8] mt-2">{totalApplications}</p>
          </div>
          <div className="bg-[#FFFFFF] dark:bg-[#111827] p-6 rounded-xl shadow-sm border border-[#E5DED0] dark:border-[#263044] transition-colors">
            <h3 className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">Interviews Scheduled</h3>
            <p className="text-3xl font-bold text-[#286B8A] mt-2">{interviewsScheduled}</p>
          </div>
          <div className="bg-[#FFFFFF] dark:bg-[#111827] p-6 rounded-xl shadow-sm border border-[#E5DED0] dark:border-[#263044] transition-colors">
            <h3 className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">Offers Received</h3>
            <p className="text-3xl font-bold text-[#397A5A] mt-2">{offersReceived}</p>
          </div>
          <div className="bg-[#FFFFFF] dark:bg-[#111827] p-6 rounded-xl shadow-sm border border-[#E5DED0] dark:border-[#263044] transition-colors">
            <h3 className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">Rejected</h3>
            <p className="text-3xl font-bold text-[#9B3D3D] mt-2">{rejected}</p>
          </div>
        </div>

        {/* --- CHARTS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: Application Status Breakdown */}
          <div className="bg-[#FFFFFF] dark:bg-[#111827] p-6 rounded-xl shadow-sm border border-[#E5DED0] dark:border-[#263044] h-96 flex flex-col transition-colors">
            <h3 className="text-lg font-bold text-[#111827] dark:text-[#F5F1E8] mb-4 shrink-0">Application Status</h3>
            <div className="flex-1 w-full min-h-0">
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: tooltipBg, borderRadius: '8px', border: `1px solid ${tooltipBorder}` }}
                      itemStyle={{ color: chartTextColor, fontWeight: 'bold' }}
                    />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: chartTextColor }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-[#6B7280] dark:text-[#9CA3AF]">No data to display.</div>
              )}
            </div>
          </div>

          {/* Chart 2: Monthly Applications */}
          <div className="bg-[#FFFFFF] dark:bg-[#111827] p-6 rounded-xl shadow-sm border border-[#E5DED0] dark:border-[#263044] h-96 flex flex-col transition-colors">
            <h3 className="text-lg font-bold text-[#111827] dark:text-[#F5F1E8] mb-4 shrink-0">Monthly Activity</h3>
            <div className="flex-1 w-full min-h-0">
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#263044' : '#E5DED0'} vertical={false} />
                    <XAxis dataKey="name" stroke={chartTextColor} tick={{ fill: chartTextColor, fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis stroke={chartTextColor} tick={{ fill: chartTextColor, fontSize: 12 }} allowDecimals={false} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ fill: theme === 'dark' ? '#263044' : '#F7F3EA', opacity: 0.6 }}
                      contentStyle={{ backgroundColor: tooltipBg, borderRadius: '8px', border: `1px solid ${tooltipBorder}` }}
                      itemStyle={{ color: chartTextColor, fontWeight: 'bold' }}
                    />
                    <Bar dataKey="count" fill="#C9A45C" radius={[4, 4, 0, 0]} name="Applications" /> 
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-[#6B7280] dark:text-[#9CA3AF]">No data to display.</div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;