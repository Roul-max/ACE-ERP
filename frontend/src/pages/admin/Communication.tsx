import React from 'react';
import SendNotification from './SendNotification';
import { MessageSquare, Mail, Bell } from 'lucide-react';

const Communication: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('broadcast');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Communication Hub</h1>

      <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
        <button 
          onClick={() => setActiveTab('broadcast')}
          className={`pb-3 px-4 flex items-center gap-2 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'broadcast' 
            ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          <Bell size={18} /> Broadcasts
        </button>
        <button 
          onClick={() => setActiveTab('email')}
          className={`pb-3 px-4 flex items-center gap-2 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'email' 
            ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          <Mail size={18} /> Email Logs
        </button>
      </div>

      <div className="mt-6">
        {activeTab === 'broadcast' ? (
            <SendNotification />
        ) : (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                <Mail size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Integration</h3>
                <p className="text-gray-500 dark:text-gray-400">SMTP Server configuration and email log viewing coming soon.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Communication;