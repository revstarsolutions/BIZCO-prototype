import React, { useState, useEffect } from 'react';
import HRMDashboardPage from './HRMDashboardPage';
import SamAssistant from './SamAssistant';
import './SamAssistant.css'; // Import SAM's specific CSS
import { // Import necessary icons from lucide-react for renderConsoleContent
  Search, Bell, Sun, Moon, Users, Briefcase, Mail, Cog, TrendingUp, Megaphone, PlusCircle, LineChart
} from 'lucide-react';
import clsx from 'clsx'; // Import clsx for conditional class names

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSuperModule, setActiveSuperModule] = useState('Console Dashboard'); // Keep track of main modules

  // Load dark mode preference from local storage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setIsDarkMode(JSON.parse(savedMode));
    }
  }, []);

  // Save dark mode preference to local storage and apply to body
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleSuperModuleClick = (moduleName) => {
    setActiveSuperModule(moduleName);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const renderConsoleContent = () => {
    // This is the content from your HRMDashboardPage's App component renderConsoleContent
    // It's placed here because App.js is the root of the "Bizco Business Console"
    return (
      <div className={clsx("p-6", {'bg-gray-50':!isDarkMode, 'bg-gradient-to-br from-[#121212] to-[#202020]':isDarkMode})}> {/* Updated dark mode background */}
        <div className="mb-6">
          <h1 className={clsx("text-3xl font-bold mb-2", {'text-gray-900':!isDarkMode, 'text-gray-100':isDarkMode})}>Bizco Business Console Dashboard</h1>
          <p className={clsx("text-lg", {'text-gray-600':!isDarkMode, 'text-gray-300':isDarkMode})}>Your central hub for all business management insights and access to modules.</p>
        </div>

        {/* Console Module Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => handleSuperModuleClick('HR Management')}
            className={clsx("flex flex-col items-center justify-center p-4 rounded-lg shadow-md transition-colors duration-200 h-32 w-full", {
              'bg-[#3B5998] text-white hover:bg-[#1A2C5B]': !isDarkMode,
              'bg-[#2C2C2C] text-gray-200 hover:bg-gray-700': isDarkMode,
            })}
          >
            <Users size={28} className="mb-2" />
            <span className="text-base font-bold text-center">HR Management</span>
          </button>

          <button
            onClick={() => handleSuperModuleClick('Sales Management')}
            className={clsx("flex flex-col items-center justify-center p-4 rounded-lg shadow-md transition-colors duration-200 h-32 w-full", {
              'bg-[#3B5998] text-white hover:bg-[#1A2C5B]': !isDarkMode,
              'bg-[#2C2C2C] text-gray-200 hover:bg-gray-700': isDarkMode,
            })}
          >
            <LineChart size={28} className="mb-2" />
            <span className="text-base font-bold text-center">Sales Management</span>
          </button>

          <button
            onClick={() => handleSuperModuleClick('Marketing Management')}
            className={clsx("flex flex-col items-center justify-center p-4 rounded-lg shadow-md transition-colors duration-200 h-32 w-full", {
              'bg-[#3B5998] text-white hover:bg-[#1A2C5B]': !isDarkMode,
              'bg-[#2C2C2C] text-gray-200 hover:bg-gray-700': isDarkMode,
            })}
          >
            <Megaphone size={28} className="mb-2" />
            <span className="text-base font-bold text-center">Marketing Management</span>
          </button>

          <button
            onClick={() => handleSuperModuleClick('System Settings')}
            className={clsx("flex flex-col items-center justify-center p-4 rounded-lg shadow-md transition-colors duration-200 h-32 w-full", {
              'bg-[#3B5998] text-white hover:bg-[#1A2C5B]': !isDarkMode,
              'bg-[#2C2C2C] text-gray-200 hover:bg-gray-700': isDarkMode,
            })}
          >
            <Cog size={28} className="mb-2" />
            <span className="text-base font-bold text-center">System Settings</span>
          </button>

          {/* New informative cards */}
          <div className={clsx("p-4 rounded-lg shadow-md flex flex-col justify-between", {'bg-white':!isDarkMode, 'bg-[#2C2C2C]':isDarkMode})}>
            <div>
              <h3 className={clsx("text-sm font-semibold mb-1", {'text-gray-600':!isDarkMode, 'text-gray-400':isDarkMode})}>Total Revenue (YTD)</h3>
              <p className={clsx("text-2xl font-bold", {'text-[#1A2C5B]':!isDarkMode, 'text-[#A0A0A0]':isDarkMode})}>$1.5M</p>
            </div>
            <div className={clsx("text-right text-sm flex items-center justify-end", {'text-green-600':!isDarkMode, 'text-green-400':isDarkMode})}>
              <TrendingUp size={16} className="mr-1" /> +12% vs last year
            </div>
          </div>

          <div className={clsx("p-4 rounded-lg shadow-md flex flex-col justify-between", {'bg-white':!isDarkMode, 'bg-[#2C2C2C]':isDarkMode})}>
            <div>
              <h3 className={clsx("text-sm font-semibold mb-1", {'text-gray-600':!isDarkMode, 'text-gray-400':isDarkMode})}>Conversion Rate</h3>
              <p className={clsx("text-2xl font-bold", {'text-[#1A2C5B]':!isDarkMode, 'text-[#A0A0A0]':isDarkMode})}>4.8%</p>
            </div>
            <div className={clsx("text-right text-sm flex items-center justify-end", {'text-red-600':!isDarkMode, 'text-red-400':isDarkMode})}>
              <TrendingUp size={16} className="mr-1 transform rotate-180" /> -0.2% vs last month
            </div>
          </div>

          <div className={clsx("p-4 rounded-lg shadow-md flex flex-col justify-between", {'bg-white':!isDarkMode, 'bg-[#2C2C2C]':isDarkMode})}>
            <div>
              <h3 className={clsx("text-sm font-semibold mb-1", {'text-gray-600':!isDarkMode, 'text-gray-400':isDarkMode})}>Customer Churn Rate</h3>
              <p className={clsx("text-2xl font-bold", {'text-[#1A2C5B]':!isDarkMode, 'text-[#A0A0A0]':isDarkMode})}>0.5%</p>
            </div>
            <div className={clsx("text-right text-sm flex items-center justify-end", {'text-green-600':!isDarkMode, 'text-green-400':isDarkMode})}>
              <TrendingUp size={16} className="mr-1" /> Stable
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className={clsx("lg:col-span-3 p-6 rounded-lg shadow-md", {'bg-white':!isDarkMode, 'bg-[#2C2C2C]':isDarkMode})}>
            <h2 className={clsx("text-xl font-semibold mb-4", {'text-[#1A2C5B]':!isDarkMode, 'text-gray-200':isDarkMode})}>Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className={clsx("flex flex-col items-center p-3 rounded-md transition-colors duration-200", {'bg-gray-100 hover:bg-gray-200':!isDarkMode, 'bg-gray-800 hover:bg-gray-700':isDarkMode})}>
                <PlusCircle size={20} className={clsx("mb-1", {'text-[#3B5998]':!isDarkMode, 'text-[#A0A0A0]':isDarkMode})} />
                <span className={clsx("text-sm", {'text-gray-800':!isDarkMode, 'text-gray-200':isDarkMode})}>Add New Lead</span>
              </button>
              <button className={clsx("flex flex-col items-center p-3 rounded-md transition-colors duration-200", {'bg-gray-100 hover:bg-gray-200':!isDarkMode, 'bg-gray-800 hover:bg-gray-700':isDarkMode})}>
                <Briefcase size={20} className={clsx("mb-1", {'text-[#3B5998]':!isDarkMode, 'text-[#A0A0A0]':isDarkMode})} />
                <span className={clsx("text-sm", {'text-gray-800':!isDarkMode, 'text-gray-200':isDarkMode})}>Manage Deals</span>
              </button>
              <button className={clsx("flex flex-col items-center p-3 rounded-md transition-colors duration-200", {'bg-gray-100 hover:bg-gray-200':!isDarkMode, 'bg-gray-800 hover:bg-gray-700':isDarkMode})}>
                <Mail size={20} className={clsx("mb-1", {'text-[#3B5998]':!isDarkMode, 'text-[#A0A0A0]':isDarkMode})} />
                <span className={clsx("text-sm", {'text-gray-800':!isDarkMode, 'text-gray-200':isDarkMode})}>Send Campaign</span>
              </button>
              <button className={clsx("flex flex-col items-center p-3 rounded-md transition-colors duration-200", {'bg-gray-100 hover:bg-gray-200':!isDarkMode, 'bg-gray-800 hover:bg-gray-700':isDarkMode})}>
                <Users size={20} className={clsx("mb-1", {'text-[#3B5998]':!isDarkMode, 'text-[#A0A0A0]':isDarkMode})} />
                <span className="text-sm text-center">View All Contacts</span>
              </button>
            </div>
          </div>

          {/* Recent Console Activities Section */}
          <div className={clsx("lg:col-span-3 p-6 rounded-lg shadow-md", {'bg-white':!isDarkMode, 'bg-[#2C2C2C]':isDarkMode})}>
            <h2 className={clsx("text-xl font-semibold mb-4", {'text-[#1A2C5B]':!isDarkMode, 'text-gray-200':isDarkMode})}>Recent Console Activities</h2>
            <ul className={clsx("divide-y", {'divide-gray-200':!isDarkMode, 'divide-gray-700':isDarkMode})}>
              <li className="py-3 flex items-center justify-between">
                <div>
                  <p className={clsx("font-medium", {'text-gray-800':!isDarkMode, 'text-gray-200':isDarkMode})}>New lead from Website: <span className="text-[#3B5998]">John Doe</span></p>
                  <p className={clsx("text-sm", {'text-gray-500':!isDarkMode, 'text-gray-400':isDarkMode})}>5 minutes ago</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-full">Lead</span>
              </li>
              <li className="py-3 flex items-center justify-between">
                <div>
                  <p className={clsx("font-medium", {'text-gray-800':!isDarkMode, 'text-gray-200':isDarkMode})}>Deal updated for <span className="text-[#3B5998]">Acme Corp</span>: Stage changed to Proposal</p>
                  <p className={clsx("text-sm", {'text-gray-500':!isDarkMode, 'text-gray-400':isDarkMode})}>1 hour ago</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">Deal</span>
              </li>
              <li className="py-3 flex items-center justify-between">
                <div>
                  <p className={clsx("font-medium", {'text-gray-800':!isDarkMode, 'text-gray-200':isDarkMode})}>Scheduled follow-up call with <span className="text-[#3B5998]">Jane Smith</span></p>
                  <p className={clsx("text-sm", {'text-gray-500':!isDarkMode, 'text-gray-400':isDarkMode})}>Yesterday</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium text-white bg-purple-500 rounded-full">Task</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Placeholder for more Console-specific charts/data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className={clsx("p-6 rounded-lg shadow-md", {'bg-white':!isDarkMode, 'bg-[#2C2C2C]':isDarkMode})}>
            <h2 className={clsx("text-xl font-semibold mb-4", {'text-[#1A2C5B]':!isDarkMode, 'text-gray-200':isDarkMode})}>Sales Pipeline Overview</h2>
            <div className={clsx("h-48 flex items-center justify-center border rounded-md", {'text-gray-400 border-dashed border-gray-300':!isDarkMode, 'text-gray-500 border-dashed border-gray-700':isDarkMode})}>
              Placeholder Chart: Sales Stages
            </div>
          </div>
          <div className={clsx("p-6 rounded-lg shadow-md", {'bg-white':!isDarkMode, 'bg-[#2C2C2C]':isDarkMode})}>
            <h2 className={clsx("text-xl font-semibold mb-4", {'text-[#1A2C5B]':!isDarkMode, 'text-gray-200':isDarkMode})}>Customer Acquisition Trends</h2>
            <div className={clsx("h-48 flex items-center justify-center border rounded-md", {'text-gray-400 border-dashed border-gray-300':!isDarkMode, 'text-gray-500 border-dashed border-gray-700':isDarkMode})}>
              Placeholder Chart: New Customers Over Time
            </div>
          </div>
        </div>
        {/* Copyright notice */}
        <footer className={clsx("text-center text-sm mt-8 py-4", {'text-gray-500':!isDarkMode, 'text-gray-400':isDarkMode})}>
          © Revstar Solutions. All rights reserved. 2025
        </footer>
      </div>
    );
  };

  return (
    <div className={clsx("flex min-h-screen font-inter relative", {'bg-gray-50':!isDarkMode, 'bg-gradient-to-br from-[#121212] to-[#202020]':isDarkMode})}> {/* Updated overall dark mode background */}
      {/* The fix is here: Wrap the header and main in a fragment or another div */}
      <div className="flex-1 flex flex-col">
        {/* Top Header Bar - Console Level (Consistent across all super modules) */}
        <header className={clsx("p-4 border-b shadow-sm flex items-center justify-between", {
          'bg-gradient-to-r from-[#1A2C5B] to-[#6B8ECB] border-gray-700': !isDarkMode,
          'bg-gradient-to-r from-[#1A1A1A] to-[#2C2C2C] border-gray-900': isDarkMode, // Retain existing dark mode gradient for header
        })}>
          {/* Bizco Business Console Main Title */}
          <div className="flex items-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13c-3.03 0-5.5-2.47-5.5-5.5S8.97 6.5 12 6.5s5.5 2.47 5.5 5.5-2.47 5.5-5.5 5.5zm0-9.5c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" fill={isDarkMode ? "#A0A0A0" : "#3B5998"}/>
              <circle cx="12" cy="12" r="3" fill={isDarkMode ? "#1A1A1A" : "#FFFFFF"}/>
            </svg>
            <h1 className="text-white text-xl font-extrabold">Bizco Business Console</h1>
          </div>

          <div className="relative w-1/3 max-w-sm hidden md:block ml-auto mr-4">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              placeholder={`Search in ${activeSuperModule}...`}
              className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-10 text-white rounded-md text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-white focus:bg-opacity-20 transition-all duration-200"
            />
          </div>
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle - Centralized Here */}
            <button onClick={toggleDarkMode} className="text-white cursor-pointer hover:text-gray-300">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Bell size={20} className="text-white cursor-pointer hover:text-gray-300" />
            <div className="w-8 h-8 bg-[#3B5998] rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
              B
            </div>
          </div>
        </header>

        {/* Dynamically Rendered Content based on activeSuperModule */}
        <main className="flex-1 overflow-auto">
          {activeSuperModule === 'HR Management' ? (
            <HRMDashboardPage onGoBackToCRM={() => handleSuperModuleClick('Console Dashboard')} isDarkMode={isDarkMode} />
          ) : activeSuperModule === 'Console Dashboard' ? (
            renderConsoleContent()
          ) : (
            // Generic placeholder for other modules accessed via buttons
            <div className={clsx("p-6", {'bg-gray-50 text-gray-900':!isDarkMode, 'bg-gradient-to-br from-[#1A1A1A] to-[#2C2C2C]':isDarkMode})}>
              <div className="mb-6">
                <h1 className={clsx("text-3xl font-bold mb-2", {'text-gray-900':!isDarkMode, 'text-gray-100':isDarkMode})}>{activeSuperModule}</h1>
                <p className={clsx("text-lg", {'text-gray-600':!isDarkMode, 'text-gray-300':isDarkMode})}>Overview and actions for {activeSuperModule.toLowerCase()}.</p>
              </div>
              <div className="text-center text-gray-600 py-20">
                <h2 className={clsx("text-2xl font-bold mb-4", {'text-gray-800':!isDarkMode, 'text-gray-200':isDarkMode})}>Welcome to the {activeSuperModule} module!</h2>
                <p className={clsx("", {'text-gray-600':!isDarkMode, 'text-gray-400':isDarkMode})}>This section is currently under development. Stay tuned for more features!</p>
                <button
                  onClick={() => handleSuperModuleClick('Console Dashboard')}
                  className={clsx("mt-6 px-6 py-3 rounded-md text-base font-semibold transition-colors duration-200", {
                    'bg-[#3B5998] text-white hover:bg-[#1A2C5B]': !isDarkMode,
                    'bg-[#A0A0A0] text-gray-900 hover:bg-gray-700': isDarkMode,
                  })}
                >
                  Back to Console Dashboard
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
      {/* Render the SamAssistant component at the top level */}
      <SamAssistant isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
