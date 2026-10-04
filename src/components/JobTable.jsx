import React from 'react';

const JobTable = ({ applications, onEdit, onDelete, onDownload }) => {
  if (applications.length === 0) {
    return (
      <div className="text-center p-8 bg-[#FFFFFF] dark:bg-[#111827] rounded-xl text-[#6B7280] dark:text-[#9CA3AF] border border-[#E5DED0] dark:border-[#263044]">
        No job applications tracked yet. Start adding some!
      </div>
    );
  }

  // Exact HEX codes for badges
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Applied': return { backgroundColor: '#6D5A8D', color: '#FFFFFF' };
      case 'Interview Scheduled': return { backgroundColor: '#286B8A', color: '#FFFFFF' };
      case 'Under Review': return { backgroundColor: '#B7791F', color: '#FFFFFF' };
      case 'Offer Received': return { backgroundColor: '#397A5A', color: '#FFFFFF' };
      case 'Rejected': return { backgroundColor: '#9B3D3D', color: '#FFFFFF' };
      default: return { backgroundColor: '#6B7280', color: '#FFFFFF' };
    }
  };

  return (
    <div className="overflow-x-auto bg-[#FFFFFF] dark:bg-[#111827] rounded-xl shadow-sm border border-[#E5DED0] dark:border-[#263044] transition-colors duration-300">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[#F7F3EA] dark:bg-[#050914] text-[#111827] dark:text-[#F5F1E8] border-b border-[#E5DED0] dark:border-[#263044]">
          <tr>
            <th className="p-4 font-semibold">Company</th>
            <th className="p-4 font-semibold">Role</th>
            <th className="p-4 font-semibold">Date Applied</th>
            <th className="p-4 font-semibold">Status</th>
            <th className="p-4 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((job) => (
            <tr key={job.id} className="border-b border-[#E5DED0] dark:border-[#263044] hover:bg-[#F7F3EA]/50 dark:hover:bg-[#080D1C] transition-colors">
              <td className="p-4 font-medium text-[#111827] dark:text-[#F5F1E8]">{job.companyName}</td>
              <td className="p-4 text-[#6B7280] dark:text-[#9CA3AF]">{job.jobRole}</td>
              <td className="p-4 text-[#6B7280] dark:text-[#9CA3AF]">{job.applicationDate}</td>
              <td className="p-4">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-semibold shadow-sm tracking-wide"
                  style={getStatusStyle(job.status)}
                >
                  {job.status}
                </span>
              </td>
              <td className="p-4 flex gap-4 justify-center items-center">
                
                {/* Custom Gold Icons */}
                <button onClick={() => onDownload(job)} title="Download PDF" className="text-[#C9A45C] dark:text-[#D4AF6A] hover:text-[#B18A42] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </button>

                <button onClick={() => onEdit(job)} title="Edit" className="text-[#C9A45C] dark:text-[#D4AF6A] hover:text-[#B18A42] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </button>

                <button onClick={() => onDelete(job.id)} title="Delete" className="text-[#9B3D3D] hover:text-red-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;