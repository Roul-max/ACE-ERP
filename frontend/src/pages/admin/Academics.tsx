import React from 'react';
import Courses from './Courses';
import { Layers, BookOpen } from 'lucide-react';

const Academics: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('courses');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Academics Management</h1>
      
      <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
        <button 
          onClick={() => setActiveTab('courses')}
          className={`pb-3 px-4 flex items-center gap-2 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'courses' 
            ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          <BookOpen size={18} /> Courses
        </button>
        <button 
          onClick={() => setActiveTab('batches')}
          className={`pb-3 px-4 flex items-center gap-2 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'batches' 
            ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          <Layers size={18} /> Batches & Classes
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'courses' ? (
          <Courses />
        ) : (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
             <Layers size={48} className="mx-auto text-gray-400 mb-4" />
             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Batch Management</h3>
             <p className="text-gray-500 dark:text-gray-400">Feature to manage academic years, batches, and section allocations coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Academics;