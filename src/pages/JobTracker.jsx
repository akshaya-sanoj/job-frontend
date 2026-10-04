import React, { useState, useEffect } from 'react';
import api from '../api/axios'; // <-- USING THE NEW API INSTANCE
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Navbar from '../components/Navbar';
import JobForm from '../components/JobForm';
import JobTable from '../components/JobTable';

const JobTracker = ({ theme, toggleTheme }) => {
  const [applications, setApplications] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  const user = JSON.parse(sessionStorage.getItem('user'));

  const fetchApplications = async () => {
    try {
      // Replaced axios.get('http://localhost:5000...') with api.get('...')
      const { data } = await api.get(`/applications?userId=${user.id}`);
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, recordsPerPage]);

  const handleFormSubmit = async (formData) => {
    try {
      if (editingJob) {
        await api.put(`/applications/${editingJob.id}`, { ...formData, userId: user.id });
      } else {
        await api.post('/applications', { ...formData, userId: user.id });
      }
      fetchApplications();
      setIsFormOpen(false);
      setEditingJob(null);
    } catch (error) {
      console.error("Error saving application:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await api.delete(`/applications/${id}`);
        fetchApplications();
      } catch (error) {
        console.error("Error deleting application:", error);
      }
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const exportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Job Applications Report", 14, 20);
      
      const tableColumns = ["Company", "Role", "Date Applied", "Status"];
      const tableRows = filteredApplications.map(job => [
        job.companyName,
        job.jobRole,
        job.applicationDate,
        job.status
      ]);

      autoTable(doc, {
        head: [tableColumns],
        body: tableRows,
        startY: 30,
        theme: 'striped',
        headStyles: { fillColor: [11, 19, 43] }, // Midnight Navy
        styles: { fontSize: 10, cellPadding: 3 }
      });

      doc.save('applications-report.pdf');
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("PDF Error: " + error.message);
    }
  };

  const downloadIndividualPDF = (job) => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.setTextColor(201, 164, 92); // Champagne Gold
      doc.text("Job Application Details", 20, 20);
      
      doc.setFontSize(12);
      doc.setTextColor(17, 24, 39); // Dark Text
      
      let yPos = 40;
      const lineHeight = 10;
      
      doc.setFont(undefined, 'bold');
      doc.text("Company:", 20, yPos);
      doc.setFont(undefined, 'normal');
      doc.text(job.companyName, 60, yPos);
      
      yPos += lineHeight;
      doc.setFont(undefined, 'bold');
      doc.text("Role:", 20, yPos);
      doc.setFont(undefined, 'normal');
      doc.text(job.jobRole, 60, yPos);
      
      yPos += lineHeight;
      doc.setFont(undefined, 'bold');
      doc.text("Location:", 20, yPos);
      doc.setFont(undefined, 'normal');
      doc.text(job.location || 'Not specified', 60, yPos);
      
      yPos += lineHeight;
      doc.setFont(undefined, 'bold');
      doc.text("Applied On:", 20, yPos);
      doc.setFont(undefined, 'normal');
      doc.text(job.applicationDate, 60, yPos);
      
      yPos += lineHeight;
      doc.setFont(undefined, 'bold');
      doc.text("Status:", 20, yPos);
      doc.setFont(undefined, 'normal');
      doc.text(job.status, 60, yPos);
      
      if (job.interviewDate) {
        yPos += lineHeight;
        doc.setFont(undefined, 'bold');
        doc.text("Interview:", 20, yPos);
        doc.setFont(undefined, 'normal');
        doc.text(job.interviewDate, 60, yPos);
      }

      if (job.notes) {
        yPos += lineHeight + 5;
        doc.setFont(undefined, 'bold');
        doc.text("Notes:", 20, yPos);
        doc.setFont(undefined, 'normal');
        const splitNotes = doc.splitTextToSize(job.notes, 150);
        doc.text(splitNotes, 20, yPos + 7);
      }
      
      doc.save(`${job.companyName.replace(/\s+/g, '_')}_Application.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate individual PDF.");
    }
  };

  const filteredApplications = applications.filter((job) => {
    const matchesSearch = job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.jobRole.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === '' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredApplications.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredApplications.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-[#F7F3EA] dark:bg-[#080D1C] transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="max-w-7xl mx-auto p-6 mt-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#111827] dark:text-[#F5F1E8]">Job Applications</h1>
            <p className="text-[#6B7280] dark:text-[#9CA3AF] mt-1">Manage and track your job search progress.</p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={exportPDF}
              className="bg-[#C9A45C] hover:bg-[#B18A42] dark:bg-[#D4AF6A] dark:hover:bg-[#C9A45C] text-[#111827] px-5 py-2.5 rounded-md font-bold transition-colors shadow-sm whitespace-nowrap"
            >
              Export Bulk PDF
            </button>
            {!isFormOpen && (
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-[#0B132B] hover:bg-[#111827] dark:bg-[#F5F1E8] dark:hover:bg-[#E5DED0] text-[#F7F3EA] dark:text-[#0B132B] px-6 py-2.5 rounded-md font-bold transition-colors shadow-sm whitespace-nowrap"
              >
                + Add Application
              </button>
            )}
          </div>
        </div>

        {isFormOpen && (
          <JobForm onSubmit={handleFormSubmit} initialData={editingJob} onCancel={() => { setIsFormOpen(false); setEditingJob(null); }} />
        )}

        {/* Filters */}
        {!isFormOpen && (
          <div className="flex flex-col md:flex-row gap-4 mb-6 bg-[#FFFFFF] dark:bg-[#111827] p-4 rounded-xl shadow-sm border border-[#E5DED0] dark:border-[#263044]">
            <input 
              type="text" 
              placeholder="Search company or role..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-2 border border-[#E5DED0] dark:border-[#263044] rounded-md focus:ring-2 focus:ring-[#C9A45C] focus:outline-none bg-transparent text-[#111827] dark:text-[#F5F1E8] placeholder-[#6B7280] dark:placeholder-[#9CA3AF]"
            />
            
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border border-[#E5DED0] dark:border-[#263044] rounded-md focus:ring-2 focus:ring-[#C9A45C] focus:outline-none bg-[#FFFFFF] dark:bg-[#050914] text-[#111827] dark:text-[#F5F1E8] md:w-48"
            >
              <option value="">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offer Received">Offer Received</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select 
              value={recordsPerPage} 
              onChange={(e) => setRecordsPerPage(Number(e.target.value))}
              className="p-2 border border-[#E5DED0] dark:border-[#263044] rounded-md focus:ring-2 focus:ring-[#C9A45C] focus:outline-none bg-[#FFFFFF] dark:bg-[#050914] text-[#111827] dark:text-[#F5F1E8] md:w-32"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
          </div>
        )}

        {/* Table */}
        <div id="applications-table-container">
          <JobTable 
            applications={currentRecords} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            onDownload={downloadIndividualPDF} 
          />
        </div>

        {/* Pagination */}
        {!isFormOpen && filteredApplications.length > 0 && (
          <div className="flex justify-between items-center mt-6">
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              className="px-4 py-2 border border-[#E5DED0] dark:border-[#263044] bg-[#FFFFFF] dark:bg-[#111827] rounded-md text-[#111827] dark:text-[#F5F1E8] disabled:opacity-50 hover:bg-[#F7F3EA] dark:hover:bg-[#050914] transition-colors"
            >
              Previous
            </button>
            <span className="text-[#6B7280] dark:text-[#9CA3AF] font-medium">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-[#E5DED0] dark:border-[#263044] bg-[#FFFFFF] dark:bg-[#111827] rounded-md text-[#111827] dark:text-[#F5F1E8] disabled:opacity-50 hover:bg-[#F7F3EA] dark:hover:bg-[#050914] transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobTracker;