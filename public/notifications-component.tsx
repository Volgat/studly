import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { api } from '../services/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const fetchedNotifications = await api.getNotifications();
      setNotifications(fetchedNotifications);
    };
    fetchNotifications();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Bell size={18} className="mr-2" /> Notifications
      </h2>
      <ul className="space-y-3">
        {notifications.map((notification) => (
          <li key={notification.id} className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Bell size={16} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-gray-500">{notification.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
