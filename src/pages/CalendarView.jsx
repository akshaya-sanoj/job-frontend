import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import Navbar from '../components/Navbar';

const CalendarView = ({ theme, toggleTheme }) => {
  const [date, setDate] = useState(new Date());
  const [applications, setApplications] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/applications?userId=${user.id}`);
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, [user.id]);

  // Use the exact hex colors for the dots
  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return '#6D5A8D';
      case 'Interview Scheduled': return '#286B8A';
      case 'Under Review': return '#B7791F';
      case 'Offer Received': return '#397A5A';
      case 'Rejected': return '#9B3D3D';
      default: return '#6B7280';
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const dayApps = applications.filter(app => 
        app.applicationDate === dateStr || app.interviewDate === dateStr
      );

      if (dayApps.length > 0) {
        return (
          <div className="flex justify-center gap-1 mt-1 flex-wrap">
            {dayApps.map((app, idx) => (
              <div 
                key={idx} 
                className="w-2 h-2 rounded-full shadow-sm" 
                style={{ backgroundColor: getStatusColor(app.status) }}
                title={`${app.companyName} - ${app.status}`}
              />
            ))}
          </div>
        );
      }
    }
    return null;
  };

  const selectedDateStr = date.toISOString().split('T')[0];
  const activitiesOnSelectedDate = applications.filter(
    app => app.applicationDate === selectedDateStr || app.interviewDate === selectedDateStr
  );

  return (
    <div className="min-h-screen bg-[#F7F3EA] dark:bg-[#080D1C] transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="max-w-7xl mx-auto p-6 mt-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827] dark:text-[#F5F1E8]">Calendar</h1>
          <p className="text-[#6B7280] dark:text-[#9CA3AF] mt-2 k">View your application and interview dates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-[#FFFFFF] dark:bg-[#111827] p-6 rounded-xl shadow-sm border border-[#E5DED0] dark:border-[#263044]">
            <div className="w-full flex justify-center custom-calendar-wrapper"> 
              <Calendar 
                onChange={setDate} 
                value={date} 
                tileContent={tileContent}
                className="border-none w-full max-w-full font-sans"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-[#E5DED0] dark:border-[#263044] text-sm text-[#6B7280] dark:text-[#9CA3AF]">
              <span className="font-bold mr-2 text-[#111827] dark:text-[#F5F1E8]">Legend:</span>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#6D5A8D' }}></div> Applied</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#286B8A' }}></div> Interview</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#397A5A' }}></div> Offer</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#9B3D3D' }}></div> Rejected</div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="bg-[#FFFFFF] dark:bg-[#111827] p-6 rounded-xl shadow-sm border border-[#E5DED0] dark:border-[#263044] flex flex-col">
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-2xl">📅</span>
              <h3 className="text-xl font-bold text-[#111827] dark:text-[#F5F1E8] t">
                Select a date
              </h3>
            </div>
            
            {activitiesOnSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {activitiesOnSelectedDate.map(app => (
                  <div key={app.id} className="p-4 border-l-4 border-[#C9A45C] dark:border-[#D4AF6A] bg-[#F7F3EA] dark:bg-[#050914] rounded-r-md transition-colors">
                    <h4 className="font-bold text-[#111827] dark:text-[#F5F1E8] text-lg">{app.companyName}</h4>
                    <p className="text-[#6B7280] dark:text-[#9CA3AF]">{app.jobRole}</p>
                    <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-2 font-medium">Status: {app.status}</p>
                    {app.interviewDate === selectedDateStr && (
                      <p className="text-xs font-bold text-[#C9A45C] dark:text-[#D4AF6A] mt-2 tracking-wide uppercase">⭐ Interview Today</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-[#6B7280] dark:text-[#9CA3AF] text-center mt-10">
                <div className="w-16 h-16 bg-[#F7F3EA] dark:bg-[#050914] rounded-full flex items-center justify-center mb-4 transition-colors">
                  <span className="text-2xl opacity-50">📅</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-[#111827] dark:text-[#F5F1E8]">No date selected</h4>
                <p className="text-sm t">Click on any date to see applications and interviews</p>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* --- CUSTOM CSS TO FORCE CALENDAR COLORS --- */}
      <style>{`
        /* Remove default calendar background */
        .react-calendar {
          background: transparent !important;
          border: none !important;
          color: inherit !important;
        }
        
        /* Make tiles taller */
        .react-calendar__tile {
          height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding-top: 10px;
          color: #111827 !important; /* Light mode text */
        }
        .dark .react-calendar__tile {
          color: #F5F1E8 !important; /* Dark mode text */
        }

        /* Month / Year Navigation Header */
        .react-calendar__navigation button {
          color: #111827 !important;
          font-weight: bold;
          font-size: 1.1rem;
        }
        .dark .react-calendar__navigation button {
          color: #F5F1E8 !important;
        }
        
        /* Days of the Week (Mon, Tue...) */
        .react-calendar__month-view__weekdays__weekday {
          color: #6B7280 !important;
          font-weight: 600;
        }
        .dark .react-calendar__month-view__weekdays__weekday {
          color: #9CA3AF !important;
        }
        .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none !important; /* Remove dotted underline */
        }

        /* Hover states */
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus,
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: #E5DED0 !important;
          border-radius: 8px;
        }
        .dark .react-calendar__tile:enabled:hover,
        .dark .react-calendar__tile:enabled:focus,
        .dark .react-calendar__navigation button:enabled:hover,
        .dark .react-calendar__navigation button:enabled:focus {
          background-color: #263044 !important;
        }

        /* Active Selected Day */
        .react-calendar__tile--active,
        .react-calendar__tile--hasActive {
          background-color: #C9A45C !important;
          color: #111827 !important;
          border-radius: 8px;
        }
        .dark .react-calendar__tile--active,
        .dark .react-calendar__tile--hasActive {
          background-color: #D4AF6A !important;
          color: #111827 !important;
        }

        /* Out of month days */
        .react-calendar__month-view__days__day--neighboringMonth {
          color: #9CA3AF !important;
          opacity: 0.5;
        }
        .dark .react-calendar__month-view__days__day--neighboringMonth {
          color: #6B7280 !important;
        }
      `}</style>
    </div>
  );
};

export default CalendarView;