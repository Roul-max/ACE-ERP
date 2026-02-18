import React, { useEffect, useState } from 'react';
import client from '../../api/client';
import { IndianRupee, CreditCard } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

const Fees: React.FC = () => {
  const [fees, setFees] = useState([]);

  const fetchFees = async () => {
    const res = await client.get('/finance/my');
    setFees(res.data);
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handlePay = async (id: string) => {
    if(confirm('Proceed to payment gateway simulation?')) {
        await client.put(`/finance/${id}/pay`);
        alert('Payment Successful!');
        fetchFees();
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Fees</h1>
      
      <div className="grid gap-6">
        {fees.map((fee: any) => (
          <div key={fee._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-300">
                  <IndianRupee size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-lg text-gray-900 dark:text-white">{fee.type}</h3>
                 <p className="text-gray-500 dark:text-gray-400">Due: {new Date(fee.dueDate).toLocaleDateString('en-IN')}</p>
                 {fee.status === 'Paid' && <p className="text-xs text-green-600 font-medium mt-1">Txn: {fee.transactionId}</p>}
               </div>
            </div>
            
            <div className="flex items-center gap-6">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(fee.amount)}</span>
                {fee.status === 'Pending' ? (
                    <button 
                        onClick={() => handlePay(fee._id)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-green-600/20 transition-all font-medium"
                    >
                        <CreditCard size={18} /> Pay Now
                    </button>
                ) : (
                    <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg font-bold border border-green-200 dark:border-green-800">Paid</span>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fees;
