import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import SidebarMenu from '../components/SidebarMenu';
import { api } from '../services/api';

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        // Simulating API call
        const response = await api.getSubscriptions(user.id);
        setSubscriptions(response);
      } catch (error) {
        console.error('Failed to fetch subscriptions:', error);
      }
    };
    fetchSubscriptions();
  }, [user.id]);

  const handleUnsubscribe = async (subscriptionId) => {
    try {
      await api.unsubscribe(user.id, subscriptionId);
      setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionId));
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <SidebarMenu />
      <div className="flex-grow ml-8">
        <h1 className="text-3xl font-bold mb-8">Mes Abonnements</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            className="w-full p-2 border rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          {filteredSubscriptions.map(sub => (
            <div key={sub.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div className="flex items-center">
                <img src={sub.avatar} alt={sub.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-semibold">{sub.name}</h3>
                  <p className="text-sm text-gray-600">{sub.role} | Abonné depuis {sub.duration}</p>
                </div>
              </div>
              <button
                onClick={() => handleUnsubscribe(sub.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Se désabonner
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
