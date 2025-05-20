import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../AppContextProvider'; // Added import

interface DashboardStats {
  totalItems: number;
  availableItems: number;
  pendingRentals: number;
  activeRentals: number;
  totalUsers: number;
  totalRevenue: number;
}

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { baseColor } = useAppContext(); // Added baseColor
  const style = { '--user-bg-color': baseColor } as React.CSSProperties; // Added style object
  
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const fetchDashboardData = () => { // Removed async
    // Simulate API call delay
    setLoading(true);
    setTimeout(() => {
      // Use the existing fallback mock data directly
      setStats({
        totalItems: 12,
        availableItems: 6,
        pendingRentals: 1,
        activeRentals: 3,
        totalUsers: 8,
        totalRevenue: 5000
      });
      setError(null); // Clear any previous errors
      setLoading(false);
    }, 700); // 0.7 second delay
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Item Inventory</h3>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-purple-600">{stats.totalItems}</span>
              <span className="text-sm text-gray-500">Total Items</span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xl font-semibold text-green-500">{stats.availableItems}</span>
              <span className="text-sm text-gray-500">Available for Rent</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Rental Status</h3>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-yellow-500">{stats.pendingRentals}</span>
              <span className="text-sm text-gray-500">Pending Approvals</span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xl font-semibold text-[var(--user-bg-color)]" style={style}>{stats.activeRentals}</span>
              <span className="text-sm text-gray-500">Active Rentals</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">User & Revenue</h3>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-indigo-600">{stats.totalUsers}</span>
              <span className="text-sm text-gray-500">Registered Users</span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xl font-semibold text-emerald-500">{stats.totalRevenue.toLocaleString()} HUF</span>
              <span className="text-sm text-gray-500">Total Revenue</span>
            </div>
          </div>
        </div>
      )}
      
      {/* We could add charts and more detailed statistics here */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button 
            onClick={() => window.location.href = '/admin/items'}
            className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium py-3 px-4 rounded transition flex items-center justify-center"
          >
            Manage Items
          </button>
          <button 
            onClick={() => window.location.href = '/admin/approvals'}
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium py-3 px-4 rounded transition flex items-center justify-center"
          >
            Review Rentals
          </button>
          <button 
            onClick={() => window.location.href = '/admin/users'}
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-3 px-4 rounded transition flex items-center justify-center"
          >
            Manage Users
          </button> 
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;