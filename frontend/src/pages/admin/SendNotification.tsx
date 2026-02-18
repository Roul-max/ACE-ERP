import React from 'react';
import { useForm } from 'react-hook-form';
import client from '../../api/client';
import { Send } from 'lucide-react';

const SendNotification: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await client.post('/notifications', data);
      alert('Notification sent successfully');
      reset();
    } catch (error) {
      alert('Failed to send notification');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Broadcast Notification</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input 
              {...register('title', { required: true })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Important Announcement"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <textarea 
              {...register('message', { required: true })}
              rows={4}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your message here..."
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-medium"
            >
              <Send size={18} />
              Send Broadcast
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">This will send a notification to all active users.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendNotification;