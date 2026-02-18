import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import client from '../api/client';

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const res = await client.get('/notifications');
      setNotifications(res.data);
      setUnreadCount(res.data.filter((n: any) => !n.read).length);
    } catch (error) {
      console.error('Failed to fetch notifications');
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (id: string) => {
    await client.put(`/notifications/${id}/read`);
    fetchNotifications();
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors relative"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 font-semibold dark:text-white">
            Notifications
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">No notifications</div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif._id} 
                  className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${!notif.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                  onClick={() => markAsRead(notif._id)}
                >
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{notif.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;