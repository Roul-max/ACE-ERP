import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import client from '../../api/client';
import { IndianRupee, Plus } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

const Finance: React.FC = () => {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState<any[]>([]);
  const { register, handleSubmit, reset } = useForm();

  const fetchFees = async () => {
    const res = await client.get('/finance/all');
    setFees(res.data);
  };

  useEffect(() => {
    fetchFees();
    client.get('/students').then(res => setStudents(res.data.students));
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await client.post('/finance', data);
      reset();
      fetchFees();
    } catch (error) {
      // Error handled globally
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Finance Management</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Create Fee Record</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <select {...register('student', { required: true })} className="p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Student</option>
            {students.map(s => <option key={s._id} value={s._id}>{s.user?.name} ({s.rollNumber})</option>)}
          </select>
          <div className="relative">
             <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input {...register('amount', { required: true })} type="number" placeholder="Amount" className="w-full pl-9 pr-3 py-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <select {...register('type', { required: true })} className="p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
            <option value="Tuition">Tuition Fee</option>
            <option value="Hostel">Hostel Fee</option>
            <option value="Library">Library Fee</option>
            <option value="Other">Other</option>
          </select>
          <input {...register('dueDate', { required: true })} type="date" className="p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 shadow-md transition-all">
            <Plus size={18} /> Create
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {fees.map((fee: any) => (
              <tr key={fee._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{fee.student?.user?.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{fee.type}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(fee.amount)}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{new Date(fee.dueDate).toLocaleDateString('en-IN')}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${fee.status === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {fee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Finance;
