import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import client from '../api/client';
import { Lock, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const ResetPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const password = watch('password');

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await client.put(`/auth/reset-password/${token}`, { password: data.password });
      setSuccess(true);
      // Optional: Auto login after 2 seconds
      setTimeout(() => {
        login(res.data.token, res.data);
        navigate('/');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password. Link might be expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0f172a] p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4 transform rotate-3">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Set New Password</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Your new password must be different from previous used passwords.
            </p>
          </div>

          {success ? (
             <div className="text-center py-6 animate-scale-in">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-4">
                    <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Password Reset!</h3>
                <p className="text-slate-500 dark:text-slate-400">Redirecting to dashboard...</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 p-4 rounded-xl text-sm flex items-start gap-3 border border-red-100 dark:border-red-800 animate-scale-in">
                        <AlertCircle size={20} className="mt-0.5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <div className="space-y-5">
                    <div className="group">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">New Password</label>
                        <div className="relative">
                            <input
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                            type="password"
                            className="block w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 dark:focus:border-blue-500 transition-all"
                            placeholder="••••••••"
                            />
                        </div>
                        {errors.password && <span className="text-red-500 text-xs ml-1 font-medium mt-1 block">{errors.password.message as string}</span>}
                    </div>

                    <div className="group">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">Confirm Password</label>
                        <div className="relative">
                            <input
                            {...register('confirmPassword', { 
                                required: 'Please confirm password',
                                validate: value => value === password || "Passwords do not match"
                            })}
                            type="password"
                            className="block w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 dark:focus:border-blue-500 transition-all"
                            placeholder="••••••••"
                            />
                        </div>
                        {errors.confirmPassword && <span className="text-red-500 text-xs ml-1 font-medium mt-1 block">{errors.confirmPassword.message as string}</span>}
                    </div>
                </div>

                <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                ) : (
                    <>
                    Reset Password <ArrowRight size={20} />
                    </>
                )}
                </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;