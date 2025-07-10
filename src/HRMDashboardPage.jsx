import React, { useState, useEffect } from 'react';
import {
  ChevronDown, ChevronRight, Search, Bell, User, PlusCircle, LayoutGrid, Download, Sliders, ChevronsUpDown,
  Filter, Eye, ListPlus, Settings2, Share, Home, Users, Briefcase, Calendar, Phone, Package, FileText, Building2,
  ClipboardList, Handshake, Mail, Box, Book, Folder, Lightbulb, MapPin, Globe, Cog, HelpCircle, XCircle,
  Shield, Clipboard, BriefcaseBusiness, UserRoundSearch, PieChart, Clock, Goal, LineChart, UserPlus, FileUp,
  LineChart as SalesChart, TrendingUp, DollarSign, Megaphone, Menu, Sun, Moon
} from 'lucide-react';
import clsx from 'clsx';

// === Reusable NavItem Component (for internal sidebars) ===
const NavItem = ({ icon, text, hasSubItems, isOpen, onClick, isActive, isCollapsed, isDarkMode }) => (
  <div className="relative group">
    <div
      className={clsx(
        "flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200",
        {
          'bg-[#3B5998] text-white': isActive || isOpen,
          'hover:bg-[#3B5998] hover:text-white': !isActive && !isOpen && !isDarkMode,
          'hover:bg-gray-700 hover:text-gray-200': !isActive && !isOpen && isDarkMode,
          'justify-center': isCollapsed,
          'justify-start': !isCollapsed
        }
      )}
      onClick={onClick}
    >
      {React.cloneElement(icon, {
        size: 16,
        className: clsx("text-white", {
          'group-hover:text-white': !isActive && !isOpen && !isDarkMode,
          'group-hover:text-gray-200': !isActive && !isOpen && isDarkMode,
        })
      })}
      {!isCollapsed && <span className="ml-2 text-sm whitespace-nowrap">{text}</span>}
      {!isCollapsed && hasSubItems && (
        <span className="ml-auto">
          {isOpen ? <ChevronDown size={16} className="text-white" /> : <ChevronRight size={16} className="text-white" />}
        </span>
      )}
    </div>
  </div>
);

// === Reusable SubNavItem Component (for internal sidebars) ===
const SubNavItem = ({ text, active, onClick, isCollapsed, isDarkMode }) => (
  <div
    className={clsx(
      "flex items-center py-1.5 rounded-lg cursor-pointer transition-colors duration-200",
      {
        'bg-[#3B5998] text-white font-semibold': active,
        'hover:bg-[#3B5998] hover:text-white text-gray-300': !active && !isDarkMode,
        'hover:bg-gray-700 hover:text-gray-200 text-gray-400': !active && isDarkMode,
        'justify-center': isCollapsed,
        'pl-7': !isCollapsed
      }
    )}
    onClick={onClick}
  >
    {!isCollapsed && <span className="text-sm whitespace-nowrap">{text}</span>}
  </div>
);

// === AddEmployeeForm Modal Component ===
const AddEmployeeForm = ({ onClose, onSave, isDarkMode }) => {
  const [formData, setFormData] = useState({
    employeeId: '', firstName: '', lastName: '', email: '', phone: '', jobTitle: '',
    department: '', status: 'Active', hireDate: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className={clsx("rounded-lg shadow-xl w-full max-w-3xl overflow-hidden", { 'bg-white': !isDarkMode, 'bg-[#2C2C2C] text-gray-200': isDarkMode })}>
        <div className={clsx("flex justify-between items-center p-4", { 'bg-[#1A2C5B] text-white': !isDarkMode, 'bg-[#1A1A1A] text-gray-200': isDarkMode })}>
          <h2 className="text-xl font-semibold">Add New Employee</h2>
          <button onClick={onClose} className={clsx("transition-colors duration-200", { 'text-white hover:text-gray-300': !isDarkMode, 'text-gray-400 hover:text-gray-200': isDarkMode })}>
            <XCircle size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h3 className={clsx("md:col-span-2 text-lg font-semibold mb-2 border-b pb-2", { 'text-gray-800': !isDarkMode, 'text-gray-200 border-gray-600': isDarkMode })}>Personal Information</h3>
          <div><label htmlFor="firstName" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>First Name</label><input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })} required/></div>
          <div><label htmlFor="lastName" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Last Name</label><input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })} required/></div>
          <div className="md:col-span-2"><label htmlFor="email" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Email Address</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })} required/></div>
          <div><label htmlFor="phone" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Phone Number</label><input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })}/></div>
          <div><label htmlFor="employeeId" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Employee ID</label><input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })}/></div>
          <h3 className={clsx("md:col-span-2 text-lg font-semibold mt-4 mb-2 border-b pb-2", { 'text-gray-800': !isDarkMode, 'text-gray-200 border-gray-600': isDarkMode })}>Employment Information</h3>
          <div><label htmlFor="jobTitle" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Job Title</label><input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })}/></div>
          <div><label htmlFor="department" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Department</label><input type="text" id="department" name="department" value={formData.department} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })}/></div>
          <div><label htmlFor="hireDate" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Hire Date</label><input type="date" id="hireDate" name="hireDate" value={formData.hireDate} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })}/></div>
          <div><label htmlFor="status" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Status</label><select id="status" name="status" value={formData.status} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })}><option value="Active">Active</option><option value="On Leave">On Leave</option><option value="Terminated">Terminated</option></select></div>
          <div className="md:col-span-2 flex justify-end space-x-3 mt-6"><button type="button" onClick={onClose} className={clsx("px-5 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B5998]", { 'border-gray-300 text-gray-700 hover:bg-gray-50': !isDarkMode, 'border-gray-600 text-gray-300 hover:bg-gray-700': isDarkMode })}>Cancel</button><button type="submit" className={clsx("px-5 py-2 text-white rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3B5998]", { 'bg-[#3B5998] hover:bg-[#1A2C5B]': !isDarkMode, 'bg-[#A0A0A0] hover:bg-gray-700': isDarkMode })}>Save Employee</button></div>
        </form>
      </div>
    </div>
  );
};

// === AddVacancyForm Modal Component ===
const AddVacancyForm = ({ onClose, onSave, isDarkMode }) => {
  const [formData, setFormData] = useState({
    jobTitleInput: '', // Input for LLM prompt
    department: '',
    location: '',
    description: '', // This will be the LLM output
    status: 'Open',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateJobDescription = async () => {
    if (!formData.jobTitleInput) {
      alert('Please enter a job title to generate a description.');
      return;
    }
    setIsGenerating(true);
    try {
      const prompt = `Generate a detailed and professional job description for a ${formData.jobTitleInput}. Include responsibilities, qualifications, and preferred skills.`;
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = "";
      // Keep this as-is, Canvas will provide it at runtime.
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const generatedText = result.candidates[0].content.parts[0].text;
        setFormData((prev) => ({ ...prev, description: generatedText }));
      } else {
        alert("Failed to generate job description. Please try again.");
        console.error("Gemini API returned an unexpected structure:", result);
      }
    } catch (error) {
      console.error("Error generating job description:", error);
      alert("Error generating job description. Please check console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className={clsx("rounded-lg shadow-xl w-full max-w-2xl overflow-hidden", { 'bg-white': !isDarkMode, 'bg-[#2C2C2C] text-gray-200': isDarkMode })}>
        <div className={clsx("flex justify-between items-center p-4", { 'bg-[#1A2C5B] text-white': !isDarkMode, 'bg-[#1A1A1A] text-gray-200': isDarkMode })}>
          <h2 className="text-xl font-semibold">Add New Vacancy</h2>
          <button onClick={onClose} className={clsx("transition-colors duration-200", { 'text-white hover:text-gray-300': !isDarkMode, 'text-gray-400 hover:text-gray-200': isDarkMode })}>
            <XCircle size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="jobTitleInput" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Job Title (for AI)</label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="jobTitleInput"
                name="jobTitleInput"
                value={formData.jobTitleInput}
                onChange={handleChange}
                className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })}
                required
              />
              <button
                type="button"
                onClick={handleGenerateJobDescription}
                disabled={isGenerating}
                className={clsx("px-4 py-2 text-white rounded-md text-sm font-semibold transition-colors duration-200 flex items-center justify-center", { 'bg-purple-600 hover:bg-purple-700': !isDarkMode, 'bg-[#A0A0A0] hover:bg-gray-700': isDarkMode })}
              >
                {isGenerating ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>Generate JD ✨</>
                )}
              </button>
            </div>
          </div>
          <div><label htmlFor="department" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Department</label><input type="text" id="department" name="department" value={formData.department} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })}/></div>
          <div><label htmlFor="location" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Location</label><input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })}/></div>
          <div><label htmlFor="description" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Job Description</label><textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })} placeholder="Generated or manually entered job description"></textarea></div>
          <div><label htmlFor="status" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Status</label><select id="status" name="status" value={formData.status} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })}><option value="Open">Open</option><option value="Closed">Closed</option><option value="On Hold">On Hold</option></select></div>
          <div className="flex justify-end space-x-3 mt-4 md:col-span-1"><button type="button" onClick={onClose} className={clsx("px-5 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B5998]", { 'border-gray-300 text-gray-700 hover:bg-gray-50': !isDarkMode, 'border-gray-600 text-gray-300 hover:bg-gray-700': isDarkMode })}>Cancel</button><button type="submit" className={clsx("px-5 py-2 text-white rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3B5998]", { 'bg-[#3B5998] hover:bg-[#1A2C5B]': !isDarkMode, 'bg-[#A0A0A0] hover:bg-gray-700': isDarkMode })}>Save Vacancy</button></div>
        </form>
      </div>
    </div>
  );
};

// === AddCandidateForm Modal Component ===
const AddCandidateForm = ({ onClose, onSave, isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', appliedPosition: '', status: 'New',
    resumeText: '', // Simulates resume content for LLM
    profileSummary: '', // LLM generated summary
  });
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateSummary = async () => {
    if (!formData.resumeText) {
      alert('Please enter some resume text to generate a summary.');
      return;
    }
    setIsGeneratingSummary(true);
    try {
      const prompt = `Summarize the following resume content into a concise candidate profile summary, highlighting key skills and experience. Resume content: "${formData.resumeText}"`;
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = "";
      // Keep this as-is, Canvas will provide it at runtime.
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const generatedText = result.candidates[0].content.parts[0].text;
        setFormData((prev) => ({ ...prev, profileSummary: generatedText }));
      } else {
        alert("Failed to generate summary. Please try again.");
        console.error("Gemini API returned an unexpected structure:", result);
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      alert("Error generating summary. Please check console for details.");
    } finally {
      setIsGeneratingSummary(false);
    }
  };
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className={clsx("rounded-lg shadow-xl w-full max-w-2xl overflow-hidden", { 'bg-white': !isDarkMode, 'bg-[#2C2C2C] text-gray-200': isDarkMode })}>
        <div className={clsx("flex justify-between items-center p-4", { 'bg-[#1A2C5B] text-white': !isDarkMode, 'bg-[#1A1A1A] text-gray-200': isDarkMode })}>
          <h2 className="text-xl font-semibold">Add New Candidate</h2>
          <button onClick={onClose} className={clsx("transition-colors duration-200", { 'text-white hover:text-gray-300': !isDarkMode, 'text-gray-400 hover:text-gray-200': isDarkMode })}>
            <XCircle size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 gap-4">
          <div><label htmlFor="name" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Candidate Name</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })} required/></div>
          <div><label htmlFor="email" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Email Address</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })} required/></div>
          <div><label htmlFor="phone" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Phone Number</label><input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })}/></div>
          <div><label htmlFor="appliedPosition" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Applied Position</label><input type="text" id="appliedPosition" name="appliedPosition" value={formData.appliedPosition} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })}/></div>
          <div><label htmlFor="status" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Status</label><select id="status" name="status" value={formData.status} onChange={handleChange} className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })}><option value="New">New</option><option value="Screening">Screening</option><option value="Interview">Interview</option><option value="Offered">Offered</option><option value="Rejected">Rejected</option></select></div>

          {/* AI Resume Summary Section */}
          <div>
            <label htmlFor="resumeText" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Resume Content (for AI)</label>
            <textarea
              id="resumeText"
              name="resumeText"
              value={formData.resumeText}
              onChange={handleChange}
              rows="3"
              className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })}
              placeholder="Paste or type key resume details here for AI summary..."
            ></textarea>
            <button
              type="button"
              onClick={handleGenerateSummary}
              disabled={isGeneratingSummary}
              className={clsx("mt-2 px-4 py-2 text-white rounded-md text-sm font-semibold transition-colors duration-200 flex items-center justify-center w-full", { 'bg-purple-600 hover:bg-purple-700': !isDarkMode, 'bg-[#A0A0A0] hover:bg-gray-700': isDarkMode })}
            >
              {isGeneratingSummary ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>Generate Profile Summary ✨</>
              )}
            </button>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="profileSummary" className={clsx("block text-sm font-medium mb-1", { 'text-gray-700': !isDarkMode, 'text-gray-300': isDarkMode })}>Candidate Profile Summary</label>
            <textarea
              id="profileSummary"
              name="profileSummary"
              value={formData.profileSummary}
              onChange={handleChange}
              rows="4"
              className={clsx("mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-[#3B5998] focus:border-[#3B5998]", { 'border-gray-300 bg-white text-gray-900': !isDarkMode, 'border-gray-600 bg-[#1A1A1A] text-gray-200': isDarkMode })}
              placeholder="AI-generated or manually entered summary of the candidate's profile."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 mt-4 md:col-span-1"><button type="button" onClick={onClose} className={clsx("px-5 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B5998]", { 'border-gray-300 text-gray-700 hover:bg-gray-50': !isDarkMode, 'border-gray-600 text-gray-300 hover:bg-gray-700': isDarkMode })}>Cancel</button><button type="submit" className={clsx("px-5 py-2 text-white rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3B5998]", { 'bg-[#3B5998] hover:bg-[#1A2C5B]': !isDarkMode, 'bg-[#A0A0A0] hover:bg-gray-700': isDarkMode })}>Save Candidate</button></div>
        </form>
      </div>
    </div>
  );
};

// === HRMDashboardPage Component (Full HRM Module Page) ===
const HRMDashboardPage = ({ onGoBackToCRM, isDarkMode }) => {
  const [activeModule, setActiveModule] = useState('Dashboard');
  const [activePIMTab, setActivePIMTab] = useState('Employee List');
  const [activeRecruitmentTab, setActiveRecruitmentTab] = useState('Vacancies');
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showAddVacancyModal, setShowAddVacancyModal] = useState(false);
  const [showAddCandidateModal, setShowAddCandidateModal] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({
    admin: false, pim: false, leave: false, time: false, recruitment: false, performance: false, directory: false, maintenance: false,
  });
  const toggleSubMenu = (menu) => {
    setOpenSubMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };
  const handleModuleClick = (moduleName) => {
    setActiveModule(moduleName);
    setOpenSubMenus({
      admin: false, pim: false, leave: false, time: false, recruitment: false, performance: false, directory: false, maintenance: false,
    });
    if (['Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'Performance', 'Directory', 'Maintenance'].includes(moduleName)) {
      setOpenSubMenus((prev) => ({ ...prev, [moduleName.toLowerCase()]: true }));
    }
    if (moduleName === 'PIM') { setActivePIMTab('Employee List'); }
    if (moduleName === 'Recruitment') { setActiveRecruitmentTab('Vacancies'); }
  };
  const handleSaveNewEmployee = (employeeData) => { console.log('New Employee Data:', employeeData); setShowAddEmployeeModal(false); };
  const handleSaveNewVacancy = (vacancyData) => { console.log('New Vacancy Data:', vacancyData); setShowAddVacancyModal(false); };
  const handleSaveNewCandidate = (candidateData) => { console.log('New Candidate Data:', candidateData); setShowAddCandidateModal(false); };
  const renderPIMContent = () => {
    switch (activePIMTab) {
      case 'Employee List':
        return (
          <>
            <div className="mb-6"><h1 className="text-3xl font-bold text-gray-900 mb-2">Employee List</h1><p className="text-gray-600 text-lg">View and manage all your employees.</p></div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2"><button onClick={() => setShowAddEmployeeModal(true)} className={clsx("flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200", {'bg-[#3B5998] text-white hover:bg-[#1A2C5B]':!isDarkMode, 'bg-[#A0A0A0] text-gray-900 hover:bg-gray-700':isDarkMode})}><UserPlus size={16} className="mr-2"/>Add New Employee</button><button className={clsx("flex items-center px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200", {'text-gray-700':!isDarkMode, 'text-gray-200 bg-gray-800 hover:bg-gray-700':isDarkMode})}><Filter size={16} className="mr-2"/>Filter Employees</button></div>
              <div className="flex space-x-2"><button className={clsx("flex items-center px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200", {'text-gray-700':!isDarkMode, 'text-gray-200 bg-gray-800 hover:bg-gray-700':isDarkMode})}><Settings2 size={16} className="mr-2"/>Customize Columns</button><button className={clsx("flex items-center px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200", {'text-gray-700':!isDarkMode, 'text-gray-200 bg-gray-800 hover:bg-gray-700':isDarkMode})}><Download size={16} className="mr-2"/>Export Employees</button></div>
            </div>
            <div className={clsx("overflow-x-auto rounded-lg border shadow-sm", {'border-gray-200':!isDarkMode, 'border-gray-700':isDarkMode})}>
              <table className="min-w-full divide-y divide-gray-200"><thead className={clsx({'bg-gray-50':!isDarkMode, 'bg-gray-900':isDarkMode})}><tr><th scope="col" className={clsx("px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", {'text-gray-500':!isDarkMode, 'text-gray-400':isDarkMode})}><input type="checkbox" className={clsx("rounded border-gray-300 text-[#3B5998] shadow-sm focus:border-[#3B5998] focus:ring focus:ring-[#3B5998] focus:ring-opacity-50", {'text-gray-900':isDarkMode})}/></th><th scope="col" className={clsx("px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", {'text-gray-500':!isDarkMode, 'text-gray-400':isDarkMode})}>Employee ID</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Job Title</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Department</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Contact Email</th></tr></thead>
                <tbody className={clsx({'bg-white divide-y divide-gray-200':!isDarkMode, 'bg-[#2C2C2C] text-gray-200 divide-gray-700':isDarkMode})}>
                  <tr><td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" className={clsx("rounded border-gray-300 text-[#3B5998] shadow-sm focus:border-[#3B5998] focus:ring focus:ring-[#3B5998] focus:ring-opacity-50", {'text-gray-900':isDarkMode})}/></td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm font-medium", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>EMP001</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3B5998] cursor-pointer", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Alice Smith</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Software Engineer</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Engineering</td><td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span></td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>alice.s@bizco.com</td></tr>
                  <tr><td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" className={clsx("rounded border-gray-300 text-[#3B5998] shadow-sm focus:border-[#3B5998] focus:ring focus:ring-[#3B5998] focus:ring-opacity-50", {'text-gray-900':isDarkMode})}/></td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm font-medium", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>EMP002</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm text-[#3B5998] cursor-pointer", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Bob Johnson</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>HR Manager</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Human Resources</td><td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">On Leave</span></td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>bob.j@bizco.com</td></tr>
                  <tr><td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" className={clsx("rounded border-gray-300 text-[#3B5998] shadow-sm focus:border-[#3B5998] focus:ring focus:ring-[#3B5998] focus:ring-opacity-50", {'text-gray-900':isDarkMode})}/></td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm font-medium", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>EMP003</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm text-[#3B5998] cursor-pointer", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Charlie Brown</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Sales Representative</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Sales</td><td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span></td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>charlie.b@bizco.com</td></tr>
                </tbody>
              </table>
            </div>
          </>
        );
      case 'Add Employee':
        return (
          <>
            <div className="mb-6"><h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Employee</h1><p className="text-gray-600 text-lg">Fill in the details to add a new employee to your records.</p></div>
            <div className="text-center py-10"><p className="text-gray-500">Click the "Add New Employee" button below to open the form.</p><button onClick={() => setShowAddEmployeeModal(true)} className={clsx("mt-6 flex items-center mx-auto px-6 py-3 rounded-md text-base font-semibold transition-colors duration-200", {'bg-[#3B5998] text-white hover:bg-[#1A2C5B]':!isDarkMode, 'bg-[#A0A0A0] text-gray-900 hover:bg-gray-700':isDarkMode})}><UserPlus size={20} className="mr-2"/>Open Add Employee Form</button></div>
          </>
        );
      case 'Reports':
        return (
          <div className="text-center text-gray-600 py-20"><h2 className="text-2xl font-bold mb-4">PIM Reports</h2><p>Generate various reports related to employee data, demographics, and more.</p><p className="mt-4 text-sm">This section will contain charts and data summaries once implemented.</p></div>
        );
      default: return null;
    }
  };

  const renderRecruitmentContent = () => {
    switch (activeRecruitmentTab) {
      case 'Vacancies':
        return (
          <>
            <div className="mb-6"><h1 className="text-3xl font-bold text-gray-900 mb-2">Job Vacancies</h1><p className="text-gray-600 text-lg">Manage all open and closed job positions.</p></div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2"><button onClick={() => setShowAddVacancyModal(true)} className={clsx("flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200", {'bg-[#3B5998] text-white hover:bg-[#1A2C5B]':!isDarkMode, 'bg-[#A0A0A0] text-gray-900 hover:bg-gray-700':isDarkMode})}><PlusCircle size={16} className="mr-2"/>Add New Vacancy</button><button className={clsx("flex items-center px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200", {'text-gray-700':!isDarkMode, 'text-gray-200 bg-gray-800 hover:bg-gray-700':isDarkMode})}><Filter size={16} className="mr-2"/>Filter Vacancies</button></div>
              <div className="flex space-x-2"><button className={clsx("flex items-center px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200", {'text-gray-700':!isDarkMode, 'text-gray-200 bg-gray-800 hover:bg-gray-700':isDarkMode})}><Eye size={16} className="mr-2"/>View Applicants</button><button className={clsx("flex items-center px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200", {'text-gray-700':!isDarkMode, 'text-gray-200 bg-gray-800 hover:bg-gray-700':isDarkMode})}><Download size={16} className="mr-2"/>Export Vacancies</button></div>
            </div>
            <div className={clsx("overflow-x-auto rounded-lg border shadow-sm", {'border-gray-200':!isDarkMode, 'border-gray-700':isDarkMode})}>
              <table className="min-w-full divide-y divide-gray-200"><thead className={clsx({'bg-gray-50':!isDarkMode, 'bg-gray-900':isDarkMode})}><tr><th scope="col" className={clsx("px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", {'text-gray-500':!isDarkMode, 'text-gray-400':isDarkMode})}><input type="checkbox" className={clsx("rounded border-gray-300 text-[#3B5998] shadow-sm focus:border-[#3B5998] focus:ring focus:ring-[#3B5998] focus:ring-opacity-50", {'text-gray-900':isDarkMode})}/></th><th scope="col" className={clsx("px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", {'text-gray-500':!isDarkMode, 'text-gray-400':isDarkMode})}>Vacancy</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Department</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Posted Date</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Applicants</th></tr></thead>
                <tbody className={clsx({'bg-white divide-y divide-gray-200':!isDarkMode, 'bg-[#2C2C2C] text-gray-200 divide-gray-700':isDarkMode})}>
                  <tr><td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" className={clsx("rounded border-gray-300 text-[#3B5998] shadow-sm focus:border-[#3B5998] focus:ring focus:ring-[#3B5998] focus:ring-opacity-50", {'text-gray-900':isDarkMode})}/></td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3B5998] cursor-pointer">Senior Software Engineer</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Engineering</td><td className={clsx("px-6 py-4 whitespace-nowrap", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Open</span></td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>2023-01-15</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>8</td></tr>
                  <tr><td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" className={clsx("rounded border-gray-300 text-[#3B5998] shadow-sm focus:border-[#3B5998] focus:ring focus:ring-[#3B5998] focus:ring-opacity-50", {'text-gray-900':isDarkMode})}/></td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3B5998] cursor-pointer">Marketing Specialist</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Marketing</td><td className={clsx("px-6 py-4 whitespace-nowrap", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">On Hold</span></td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-02-01</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>3</td></tr>
                  <tr><td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" className={clsx("rounded border-gray-300 text-[#3B5998] shadow-sm focus:border-[#3B5998] focus:ring focus:ring-[#3B5998] focus:ring-opacity-50", {'text-gray-900':isDarkMode})}/></td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm font-medium", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>HR Coordinator</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Human Resources</td><td className={clsx("px-6 py-4 whitespace-nowrap", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Closed</span></td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>2022-12-01</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>15</td></tr>
                </tbody>
              </table>
            </div>
          </>
        );
      case 'Candidates':
        return (
          <>
            <div className="mb-6"><h1 className="text-3xl font-bold text-gray-900 mb-2">Job Candidates</h1><p className="text-gray-600 text-lg">Review and manage all applicants.</p></div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2"><button onClick={() => setShowAddCandidateModal(true)} className={clsx("flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200", {'bg-[#3B5998] text-white hover:bg-[#1A2C5B]':!isDarkMode, 'bg-[#A0A0A0] text-gray-900 hover:bg-gray-700':isDarkMode})}><UserPlus size={16} className="mr-2"/>Add New Candidate</button><button className={clsx("flex items-center px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200", {'text-gray-700':!isDarkMode, 'text-gray-200 bg-gray-800 hover:bg-gray-700':isDarkMode})}><Filter size={16} className="mr-2"/>Filter Candidates</button></div>
              <div className="flex space-x-2"><button className={clsx("flex items-center px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200", {'text-gray-700':!isDarkMode, 'text-gray-200 bg-gray-800 hover:bg-gray-700':isDarkMode})}><Calendar size={16} className="mr-2"/>Schedule Interview</button><button className={clsx("flex items-center px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200", {'text-gray-700':!isDarkMode, 'text-gray-200 bg-gray-800 hover:bg-gray-700':isDarkMode})}><Download size={16} className="mr-2"/>Export Candidates</button></div>
            </div>
            <div className={clsx("overflow-x-auto rounded-lg border shadow-sm", {'border-gray-200':!isDarkMode, 'border-gray-700':isDarkMode})}>
              <table className="min-w-full divide-y divide-gray-200"><thead className={clsx({'bg-gray-50':!isDarkMode, 'bg-gray-900':isDarkMode})}><tr><th scope="col" className={clsx("px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", {'text-gray-500':!isDarkMode, 'text-gray-400':isDarkMode})}><input type="checkbox" className={clsx("rounded border-gray-300 text-[#3B5998] shadow-sm focus:border-[#3B5998] focus:ring focus:ring-[#3B5998] focus:ring-opacity-50", {'text-gray-900':isDarkMode})}/></th><th scope="col" className={clsx("px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", {'text-gray-500':!isDarkMode, 'text-gray-400':isDarkMode})}>Candidate Name</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Applied Position</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Phone</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Last Updated</th></tr></thead>
              <tbody className={clsx({'bg-white divide-y divide-gray-200':!isDarkMode, 'bg-[#2C2C2C] text-gray-200 divide-gray-700':isDarkMode})}>
                  <tr><td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" className={clsx("rounded border-gray-300 text-[#3B5998] shadow-sm focus:border-[#3B5998] focus:ring focus:ring-[#3B5998] focus:ring-opacity-50", {'text-gray-900':isDarkMode})}/></td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3B5998] cursor-pointer", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>David Lee</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Senior Software Engineer</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>david.l@example.com</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>555-111-2222</td><td className={clsx("px-6 py-4 whitespace-nowrap", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">New</span></td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Just now</td></tr>
                  <tr><td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" className={clsx("rounded border-gray-300 text-[#3B5998] shadow-sm focus:border-[#3B5998] focus:ring focus:ring-[#3B5998] focus:ring-opacity-50", {'text-gray-900':isDarkMode})}/></td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3B5998] cursor-pointer", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Emily Chen</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Marketing Specialist</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>emily.c@example.com</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>555-333-4444</td><td className={clsx("px-6 py-4 whitespace-nowrap", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Interview</span></td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>1 day ago</td></tr>
                  <tr><td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" className={clsx("rounded border-gray-300 text-[#3B5998] shadow-sm focus:border-[#3B5998] focus:ring focus:ring-[#3B5998] focus:ring-opacity-50", {'text-gray-900':isDarkMode})}/></td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm font-medium", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>Frank White</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>HR Coordinator</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>frank.w@example.com</td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>555-555-6666</td><td className={clsx("px-6 py-4 whitespace-nowrap", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Rejected</span></td><td className={clsx("px-6 py-4 whitespace-nowrap text-sm", {'text-gray-900':!isDarkMode, 'text-gray-200':isDarkMode})}>3 days ago</td></tr>
                </tbody>
              </table>
            </div>
          </>
        );
      default: return null;
    }
  };
  return (
    <div className="flex h-full">
      {/* HRM Internal Sidebar */}
      <aside className={clsx("w-56 p-4 flex flex-col shadow-lg transition-colors duration-200", {
        'bg-gradient-to-br from-[#1A2C5B] to-[#6B8ECB] border-r border-gray-700': !isDarkMode,
        'bg-gradient-to-br from-[#1A1A1A] to-[#2C2C2C] border-r border-gray-700': isDarkMode,
      })}>
        <div className="flex items-center justify-center mb-8 px-2 flex-col">
          {/* Back to CRM Dashboard button */}
          <button
            onClick={onGoBackToCRM}
            className={clsx("flex items-center justify-center w-full py-2 px-3 rounded-md text-sm font-semibold transition-colors duration-200 mb-4", {
              'bg-[#3B5998] text-white hover:bg-[#1A2C5B]': !isDarkMode,
              'bg-[#A0A0A0] text-gray-900 hover:bg-gray-700': isDarkMode,
            })}
          >
            <Home size={16} className="mr-2" />
            Back to Console
          </button>
          <span className="text-white text-base font-bold mt-2">HR Management</span>
          <span className="text-gray-300 text-xs mt-1 text-center">MODULE OVERVIEW</span>
        </div>

        <nav className="flex-grow space-y-1">
          <NavItem icon={<Home />} text="Dashboard" isActive={activeModule === 'Dashboard'} onClick={() => handleModuleClick('Dashboard')} isCollapsed={false} isDarkMode={isDarkMode} />

          <NavItem
            icon={<Shield />} text="Admin" hasSubItems={true} isOpen={openSubMenus.admin}
            onClick={() => handleModuleClick('Admin')} isActive={activeModule === 'Admin'} isCollapsed={false} isDarkMode={isDarkMode}
          />
          {openSubMenus.admin && (
            <div className="space-y-1 mt-1 mb-2">
              <SubNavItem text="User Management" active={false} isCollapsed={false} isDarkMode={isDarkMode} /><SubNavItem text="Job" active={false} isCollapsed={false} isDarkMode={isDarkMode} />
              <SubNavItem text="Organization" active={false} isCollapsed={false} isDarkMode={isDarkMode} /><SubNavItem text="Qualifications" active={false} isCollapsed={false} isDarkMode={isDarkMode} />
              <SubNavItem text="Nationalities" active={false} isCollapsed={false} isDarkMode={isDarkMode} />
            </div>
          )}

          <NavItem
            icon={<Users />} text="PIM" hasSubItems={true} isOpen={openSubMenus.pim}
            onClick={() => handleModuleClick('PIM')} isActive={activeModule === 'PIM'} isCollapsed={false} isDarkMode={isDarkMode}
          />
          {openSubMenus.pim && (
            <div className="space-y-1 mt-1 mb-2">
              <SubNavItem text="Employee List" active={activePIMTab === 'Employee List'} onClick={() => setActivePIMTab('Employee List')} isCollapsed={false} isDarkMode={isDarkMode} />
              <SubNavItem text="Add Employee" active={activePIMTab === 'Add Employee'} onClick={() => setActivePIMTab('Add Employee')} isCollapsed={false} isDarkMode={isDarkMode} />
              <SubNavItem text="Reports" active={activePIMTab === 'Reports'} onClick={() => setActivePIMTab('Reports')} isCollapsed={false} isDarkMode={isDarkMode} />
            </div>
          )}

          <NavItem
            icon={<Calendar />} text="Leave" hasSubItems={true} isOpen={openSubMenus.leave}
            onClick={() => handleModuleClick('Leave')} isActive={activeModule === 'Leave'} isCollapsed={false} isDarkMode={isDarkMode}
          />
          {openSubMenus.leave && (
            <div className="space-y-1 mt-1 mb-2">
              <SubNavItem text="Apply" active={false} isCollapsed={false} isDarkMode={isDarkMode} /><SubNavItem text="My Leave" active={false} isCollapsed={false} isDarkMode={isDarkMode} />
              <SubNavItem text="Leave Entitlements" active={false} isCollapsed={false} isDarkMode={isDarkMode} />
            </div>
          )}

          <NavItem
            icon={<Clock />} text="Time" hasSubItems={true} isOpen={openSubMenus.time}
            onClick={() => handleModuleClick('Time')} isActive={activeModule === 'Time'} isCollapsed={false} isDarkMode={isDarkMode}
          />
          {openSubMenus.time && (
            <div className="space-y-1 mt-1 mb-2">
              <SubNavItem text="Timesheets" active={false} isCollapsed={false} isDarkMode={isDarkMode} /><SubNavItem text="Attendance" active={false} isCollapsed={false} isDarkMode={isDarkMode} />
            </div>
          )}

          <NavItem
            icon={<UserRoundSearch />} text="Recruitment" hasSubItems={true} isOpen={openSubMenus.recruitment}
            onClick={() => handleModuleClick('Recruitment')} isActive={activeModule === 'Recruitment'} isCollapsed={false} isDarkMode={isDarkMode}
          />
          {openSubMenus.recruitment && (
            <div className="space-y-1 mt-1 mb-2">
              <SubNavItem text="Vacancies" active={activeRecruitmentTab === 'Vacancies'} onClick={() => setActiveRecruitmentTab('Vacancies')} isCollapsed={false} isDarkMode={isDarkMode} />
              <SubNavItem text="Candidates" active={activeRecruitmentTab === 'Candidates'} onClick={() => setActiveRecruitmentTab('Candidates')} isCollapsed={false} isDarkMode={isDarkMode} />
            </div>
          )}

          <NavItem icon={<User />} text="My Info" isActive={activeModule === 'My Info'} onClick={() => handleModuleClick('My Info')} isCollapsed={false} isDarkMode={isDarkMode} />
          <NavItem icon={<Goal />} text="Performance" isActive={activeModule === 'Performance'} onClick={() => handleModuleClick('Performance')} isCollapsed={false} isDarkMode={isDarkMode} />
          <NavItem icon={<Book />} text="Directory" isActive={activeModule === 'Directory'} onClick={() => handleModuleClick('Directory')} isCollapsed={false} isDarkMode={isDarkMode} />
          <NavItem icon={<Cog />} text="Maintenance" isActive={activeModule === 'Maintenance'} onClick={() => handleModuleClick('Maintenance')} isCollapsed={false} isDarkMode={isDarkMode} />

        </nav>
      </aside>

      {/* HRM Content Area */}
      <main className={clsx("flex-1 p-6 overflow-auto", {'bg-white text-gray-900':!isDarkMode, 'bg-gradient-to-br from-[#1A1A1A] to-[#2C2C2C] text-gray-200':isDarkMode})}> {/* Updated dark mode background */}
        {activeModule === 'Dashboard' && (
          <>
            <div className="mb-6"><h1 className="text-3xl font-bold mb-2">HRM Dashboard</h1><p className="text-lg text-gray-600">Quick overview of your human resources.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className={clsx("p-6 rounded-lg shadow-md flex flex-col items-start", {'bg-white':!isDarkMode, 'bg-[#2C2C2C]':isDarkMode})}>
                <div className={clsx("flex items-center mb-2", {'text-gray-600':!isDarkMode, 'text-gray-400':isDarkMode})}>
                  <Clock size={20} className="mr-2"/> <span className="font-semibold">Punched Out</span>
                </div>
                <p className={clsx("text-4xl font-bold", {'text-[#1A2C5B]':!isDarkMode, 'text-[#A0A0A0]':isDarkMode})}>0h 18m Today</p>
                <button className={clsx("mt-4 px-4 py-2 text-white rounded-md text-sm font-semibold", {
                  'bg-[#3B5998] hover:bg-[#1A2C5B]': !isDarkMode,
                  'bg-[#A0A0A0] hover:bg-gray-700': isDarkMode,
                })}>
                  PUNCH IN
                </button>
              </div>

              <div className={clsx("p-6 rounded-lg shadow-md flex flex-col items-center justify-center", {'bg-white':!isDarkMode, 'bg-[#2C2C2C]':isDarkMode})}>
                <div className={clsx("flex items-center mb-2", {'text-gray-600':!isDarkMode, 'text-gray-400':isDarkMode})}>
                  <Users size={20} className="mr-2"/> <span className="font-semibold">Candidates to Interview</span>
                </div>
                <p className={clsx("text-5xl font-bold", {'text-[#1A2C5B]':!isDarkMode, 'text-[#A0A0A0]':isDarkMode})}>12</p>
              </div>

              <div className={clsx("p-6 rounded-lg shadow-md flex flex-col items-start", {'bg-white':!isDarkMode, 'bg-[#2C2C2C]':isDarkMode})}>
                <div className={clsx("flex items-center mb-2", {'text-gray-600':!isDarkMode, 'text-gray-400':isDarkMode})}>
                  <Calendar size={20} className="mr-2"/> <span className="font-semibold">This Week</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                  <div className={clsx("h-4 rounded-full", {'bg-[#3B5998]':!isDarkMode, 'bg-[#A0A0A0]':isDarkMode})} style={{ width: '65%' }}></div>
                </div>
                <p className={clsx("text-sm mt-2", {'text-gray-600':!isDarkMode, 'text-gray-400':isDarkMode})}>65% progress on weekly tasks</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={clsx("p-6 rounded-lg shadow-md", {'bg-white':!isDarkMode, 'bg-[#2C2C2C]':isDarkMode})}>
                <h2 className={clsx("text-lg font-semibold mb-4", {'text-gray-800':!isDarkMode, 'text-gray-200':isDarkMode})}>Employees on Leave Today</h2>
                <div className="h-48 flex items-end justify-around space-x-2">
                  <div className={clsx("w-1/6", {'bg-[#3B5998]':!isDarkMode, 'bg-gray-500':isDarkMode})} style={{ height: '80%' }}></div>
                  <div className={clsx("w-1/6", {'bg-[#6B8ECB]':!isDarkMode, 'bg-gray-600':isDarkMode})} style={{ height: '50%' }}></div>
                  <div className={clsx("w-1/6", {'bg-gray-300':!isDarkMode, 'bg-gray-700':isDarkMode})} style={{ height: '30%' }}></div>
                  <div className={clsx("w-1/6", {'bg-[#3B5998]':!isDarkMode, 'bg-gray-500':isDarkMode})} style={{ height: '70%' }}></div>
                  <div className={clsx("w-1/6", {'bg-[#6B8ECB]':!isDarkMode, 'bg-gray-600':isDarkMode})} style={{ height: '40%' }}></div>
                </div>
                <p className={clsx("text-center text-sm mt-4", {'text-gray-500':!isDarkMode, 'text-gray-400':isDarkMode})}>Placeholder Bar Chart</p>
              </div>

              <div className={clsx("p-6 rounded-lg shadow-md flex flex-col items-center", {'bg-white':!isDarkMode, 'bg-[#2C2C2C]':isDarkMode})}>
                <h2 className={clsx("text-lg font-semibold mb-4", {'text-gray-800':!isDarkMode, 'text-gray-200':isDarkMode})}>Employee Distribution by Sub Unit</h2>
                <div className={clsx("w-48 h-48 rounded-full flex items-center justify-center text-white text-4xl font-bold", {
                  'bg-gradient-to-br from-[#3B5998] via-[#2563eb] to-[#1e40af]': !isDarkMode,
                  'bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700': isDarkMode,
                })}>
                  <PieChart size={64} color="white"/>
                </div>
                <div className={clsx("mt-4 text-sm", {'text-gray-700':!isDarkMode, 'text-gray-300':isDarkMode})}>
                  <p><span className={clsx("inline-block w-3 h-3 rounded-full mr-2", {'bg-[#3B5998]':!isDarkMode, 'bg-gray-500':isDarkMode})}></span> HR: 15%</p>
                  <p><span className={clsx("inline-block w-3 h-3 rounded-full mr-2", {'bg-[#2563eb]':!isDarkMode, 'bg-gray-600':isDarkMode})}></span> Marketing: 25%</p>
                  <p><span className={clsx("inline-block w-3 h-3 rounded-full mr-2", {'bg-gray-400':!isDarkMode, 'bg-gray-700':isDarkMode})}></span> Sales: 60%</p>
                </div>
                <p className={clsx("text-center text-sm mt-2", {'text-gray-500':!isDarkMode, 'text-gray-400':isDarkMode})}>Placeholder Pie Chart</p>
              </div>

              <div className={clsx("p-6 rounded-lg shadow-md flex flex-col items-center", {'bg-white':!isDarkMode, 'bg-[#2C2C2C]':isDarkMode})}>
                <h2 className={clsx("text-lg font-semibold mb-4", {'text-gray-800':!isDarkMode, 'text-gray-200':isDarkMode})}>Employee Distribution by Location</h2>
                <div className={clsx("w-48 h-48 rounded-full flex items-center justify-center text-white text-4xl font-bold", {
                  'bg-gradient-to-br from-[#1A2C5B] via-[#3B5998] to-[#2563eb]': !isDarkMode,
                  'bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500': isDarkMode,
                })}>
                  <MapPin size={64} color="white"/>
                </div>
                <div className={clsx("mt-4 text-sm", {'text-gray-700':!isDarkMode, 'text-gray-300':isDarkMode})}>
                  <p><span className={clsx("inline-block w-3 h-3 rounded-full mr-2", {'bg-[#1A2C5B]':!isDarkMode, 'bg-gray-900':isDarkMode})}></span> Office A: 40%</p>
                  <p><span className={clsx("inline-block w-3 h-3 rounded-full mr-2", {'bg-[#3B5998]':!isDarkMode, 'bg-gray-700':isDarkMode})}></span> Office B: 30%</p>
                  <p><span className={clsx("inline-block w-3 h-3 rounded-full mr-2", {'bg-[#2563eb]':!isDarkMode, 'bg-gray-500':isDarkMode})}></span> Remote: 30%</p>
                </div>
                <p className={clsx("text-center text-sm mt-2", {'text-gray-500':!isDarkMode, 'text-gray-400':isDarkMode})}>Placeholder Pie Chart</p>
              </div>
            </div>
          </>
        )}

        {activeModule === 'PIM' && renderPIMContent()}
        {activeModule === 'Recruitment' && renderRecruitmentContent()}

        {activeModule !== 'Dashboard' && activeModule !== 'PIM' && activeModule !== 'Recruitment' && (
          <div className="text-center text-gray-600 py-20"><h2 className={clsx("text-2xl font-bold mb-4", {'text-gray-800':!isDarkMode, 'text-gray-200':isDarkMode})}>Welcome to the {activeModule} module!</h2><p className={clsx("", {'text-gray-600':!isDarkMode, 'text-gray-400':isDarkMode})}>This section is currently under development. Stay tuned for more features!</p></div>
        )}
      </main>

      {/* Modals for HRM */}
      {showAddEmployeeModal && (<AddEmployeeForm onClose={() => setShowAddEmployeeModal(false)} onSave={handleSaveNewEmployee} isDarkMode={isDarkMode}/>)}
      {showAddVacancyModal && (<AddVacancyForm onClose={() => setShowAddVacancyModal(false)} onSave={handleSaveNewVacancy} isDarkMode={isDarkMode}/>)}
      {showAddCandidateModal && (<AddCandidateForm onClose={() => setShowAddCandidateModal(false)} onSave={handleSaveNewCandidate} isDarkMode={isDarkMode}/>)}
    </div>
  );
};

// Removed the "App" component from this file.
// It is now the main App component in App.js to unify the header and dark mode.
export default HRMDashboardPage;
