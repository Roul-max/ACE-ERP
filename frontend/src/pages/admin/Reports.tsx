import React from 'react';
import { BarChart3, PieChart, TrendingUp, Download } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Reports</h1>
        <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
           <Download size={18} /> Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-blue-500" /> Attendance Trends
            </h3>
            <div className="h-40 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-400">Chart Placeholder</span>
            </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <PieChart size={20} className="text-green-500" /> Fee Collection
            </h3>
             <div className="h-40 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-400">Chart Placeholder</span>
            </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-purple-500" /> Academic Performance
            </h3>
             <div className="h-40 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-400">Chart Placeholder</span>
            </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white">Generated Reports</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Report Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Generated On</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Type</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[1, 2, 3].map(i => (
                    <tr key={i}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Monthly Attendance Report - Oct</td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Oct 31, 2024</td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">PDF</td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Download</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;