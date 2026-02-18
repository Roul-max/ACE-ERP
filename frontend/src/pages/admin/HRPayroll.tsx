import React, { useState } from 'react';
import { Users, IndianRupee, Briefcase, Phone, Mail, Plus, UserPlus } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

const HRPayroll: React.FC = () => {
  const [activeTab, setActiveTab] = useState('staff');

  // Mock Data
  const staff = [
    { id: 1, name: 'Dr. Alan Grant', role: 'Professor', dept: 'Paleontology', salary: 850000, status: 'Active' },
    { id: 2, name: 'Dr. Ellie Sattler', role: 'Associate Prof', dept: 'Botany', salary: 750000, status: 'Active' },
    { id: 3, name: 'Ian Malcolm', role: 'Lecturer', dept: 'Mathematics', salary: 600000, status: 'On Leave' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">HR & Payroll</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                <Users size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Staff</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">48</h3>
            </div>
         </div>
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                <IndianRupee size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Payroll</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(2450000)}</h3>
            </div>
         </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
                <Briefcase size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Departments</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12</h3>
            </div>
         </div>
      </div>

      <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700 mb-6">
        <button 
          onClick={() => setActiveTab('staff')}
          className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'staff' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Staff Directory
        </button>
        <button 
          onClick={() => setActiveTab('payroll')}
          className={`pb-3 px-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'payroll' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Payroll Processing
        </button>
      </div>

      {activeTab === 'staff' ? (
        <>
            <div className="flex justify-end mb-4">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all">
                    <UserPlus size={18} /> Add Staff
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map(s => (
                    <div key={s.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-600 dark:text-gray-300">
                                    {s.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{s.name}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{s.role}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${s.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {s.status}
                            </span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center gap-2">
                                <Briefcase size={16} className="text-gray-400" />
                                {s.dept}
                            </div>
                             <div className="flex items-center gap-2">
                                <IndianRupee size={16} className="text-gray-400" />
                                {formatCurrency(s.salary)}/yr
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail size={16} className="text-gray-400" />
                                email@university.com
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
      ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-16 text-center">
              <IndianRupee size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Payroll Generator</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Select a month to generate payslips for all active staff.</p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow-md transition-all">Generate Payroll</button>
          </div>
      )}
    </div>
  );
};

export default HRPayroll;
