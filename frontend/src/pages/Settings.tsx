import React from 'react';
import { Save, Lock, Bell, User } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button className="px-6 py-4 text-sm font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/10">General</button>
            <button className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700">Security</button>
            <button className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700">Notifications</button>
        </div>
        
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Institution Name</label>
                    <input type="text" defaultValue="University of Technology" className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg dark:text-white" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Domain</label>
                    <input type="text" defaultValue="@university.edu" className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg dark:text-white" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Email</label>
                    <input type="email" defaultValue="admin@university.edu" className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Academic Year</label>
                    <select className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg dark:text-white">
                        <option>2023 - 2024</option>
                        <option>2024 - 2025</option>
                    </select>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                 <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Save size={18} /> Save Changes
                 </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;