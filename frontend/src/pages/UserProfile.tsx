import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import client from '../api/client';
import { User, Edit2, Save, X, Mail, Shield, Check } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { user, login } = useContext(AuthContext)!;
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: any) => {
    try {
      const res = await client.put('/auth/profile', data);
      login(res.data.token, res.data);
      setIsEditing(false);
      // Optional: Add toast notification here
      window.alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile</h1>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Edit2 size={16} /> Edit Profile
          </button>
        )}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header / Avatar */}
        <div className="p-8 flex flex-col items-center border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg mb-4">
              <span className="text-4xl font-bold">{user?.name.charAt(0)}</span>
            </div>
            <div className="absolute bottom-4 right-0 p-1.5 bg-green-500 rounded-full border-4 border-white dark:border-gray-800" title="Active"></div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 capitalize flex items-center gap-1.5 mt-1">
            <Shield size={14} /> {user?.role}
          </p>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      {...register('name', { required: true })}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      {...register('email', { required: true })}
                      type="email"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password (Optional)</label>
                  <input 
                    {...register('password')}
                    type="password"
                    placeholder="Leave blank to keep current password"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <X size={18} /> Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
                >
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Name</label>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700/50 flex items-center gap-3">
                   <User size={18} className="text-gray-400" />
                   {user?.name}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Email</label>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700/50 flex items-center gap-3">
                   <Mail size={18} className="text-gray-400" />
                   {user?.email}
                </div>
              </div>
               <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Account Status</label>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-700 dark:text-green-300 border border-green-100 dark:border-green-900/30 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                   Active
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Role</label>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700/50 capitalize">
                   {user?.role}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;