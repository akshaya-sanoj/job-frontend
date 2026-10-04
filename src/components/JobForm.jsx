import React, { useState, useEffect } from 'react';

const JobForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    companyName: '', jobRole: '', location: '', applicationDate: '',
    interviewDate: '', status: 'Applied', jobLink: '', notes: ''
  });

  // If we pass in initialData (when editing), populate the form
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-8 transition-colors">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {initialData ? 'Edit Application' : 'Add New Application'}
      </h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="companyName" placeholder="Company Name *" required value={formData.companyName} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        <input type="text" name="jobRole" placeholder="Job Role *" required value={formData.jobRole} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 dark:text-gray-400">Application Date *</label>
          <input type="date" name="applicationDate" required value={formData.applicationDate} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 dark:text-gray-400">Interview Date</label>
          <input type="date" name="interviewDate" value={formData.interviewDate} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>

        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <option value="Applied">Applied</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Offer Received">Offer Received</option>
          <option value="Rejected">Rejected</option>
        </select>

        <input type="url" name="jobLink" placeholder="Job Post Link" value={formData.jobLink} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        <input type="text" name="notes" placeholder="Notes (e.g., Focus on React)" value={formData.notes} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />

        <div className="md:col-span-2 flex gap-4 mt-2">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors">
            {initialData ? 'Update Job' : 'Save Job'}
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;