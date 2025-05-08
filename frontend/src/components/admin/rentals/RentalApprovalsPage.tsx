import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Removed axios import
import { RentingTransaction } from '../../../dto/RentingTransaction';
// import { RentingStatus } from '../../../dto/RentingTransaction'; // Removed RentingStatus import
// import { ItemCategory } from '../../../dto/ItemCategory'; // Removed ItemCategory import
import { format } from 'date-fns';

// Helper function to format date strings (assuming ISO format)
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return 'N/A';
  try {
    return format(new Date(dateString), 'yyyy-MM-dd');
  } catch (e) {
    return 'Invalid Date';
  }
};

// Mock data for pending rental requests - Adjusted to match DTOs
const mockPendingRentals: RentingTransaction[] = [
  {
    id: 101,
    transactionType: 'RENTAL',
    status: 'PENDING', // Use string status
    rentedItem: { 
      id: 1, 
      name: 'Laptop Pro X', 
      category: 'LAPTOP', // Use string category
      costPerDay: 5000, 
      availability: 10, 
      description: '...', 
      image: { id: 1, url: 'https://via.placeholder.com/150/92c952', createdAt: '', updatedAt: '' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    renterUser: { 
      id: 5, 
      firstName: 'Alice', 
      lastName: 'Smith', 
      email: 'alice.s@example.com', 
      role: 'USER',
      // Add other required User fields with placeholder/null values
      balance: { id: 1, amount: 10000, createdAt: '', updatedAt: '' },
      userName: 'alice.s',
      loginType: 'BASIC',
      university: { id: 1, name: 'Tech University', createdAt: '', updatedAt: '' },
      faculty: { id: 1, name: 'Engineering', createdAt: '', updatedAt: '' },
      image: null,
      ratings: null,
      description: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    startDateTime: '2025-05-10T09:00:00Z', // Use startDateTime
    endDateTime: '2025-05-15T17:00:00Z', // Use endDateTime
    remainingDays: null, // Or calculate if needed
    costPerDay: 5000,
    curCost: 25000, // Use curCost
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 102,
    transactionType: 'RENTAL',
    status: 'PENDING',
    rentedItem: { 
      id: 3, 
      name: 'Smartphone Galaxy S25', 
      category: 'SMARTPHONE', // Use string category
      costPerDay: 4000, 
      availability: 20, 
      description: '...', 
      image: { id: 3, url: 'https://via.placeholder.com/150/24f355', createdAt: '', updatedAt: '' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    renterUser: { 
      id: 8, 
      firstName: 'Bob', 
      lastName: 'Johnson', 
      email: 'bob.j@example.com', 
      role: 'USER',
      // Add other required User fields with placeholder/null values
      balance: { id: 2, amount: 5000, createdAt: '', updatedAt: '' },
      userName: 'bob.j',
      loginType: 'GOOGLE',
      university: { id: 1, name: 'Tech University', createdAt: '', updatedAt: '' },
      faculty: { id: 2, name: 'Business', createdAt: '', updatedAt: '' },
      image: null,
      ratings: null,
      description: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    startDateTime: '2025-05-12T10:00:00Z',
    endDateTime: '2025-05-19T10:00:00Z',
    remainingDays: null,
    costPerDay: 4000,
    curCost: 28000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const RentalApprovalsPage: React.FC = () => {
  // const backendAddress = import.meta.env.VITE_BACKEND_ADDRESS; // No longer needed
  
  const [pendingRentals, setPendingRentals] = useState<RentingTransaction[]>([]);
  const [loading, setLoading] = useState(true); // Removed loading state
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Fetch pending rentals (using mock data)
  useEffect(() => {
    fetchPendingRentals();
  }, []);
  
  const fetchPendingRentals = () => {
    // Simulate API call delay
    setLoading(true);
    setTimeout(() => {
      // Filter mock data to only show pending rentals
      setPendingRentals(mockPendingRentals.filter(r => r.status === 'PENDING'));
      setError(null);
      setLoading(false);
    }, 600); // 0.6 second delay
  };
  
  const handleApprove = (id: number) => {
    // Simulate API call delay
    setTimeout(() => {
      setPendingRentals(prevRentals =>
        prevRentals.map(rental =>
          rental.id === id ? { ...rental, status: 'APPROVED' } : rental // Use string status
        ).filter(r => r.status === 'PENDING') // Keep only pending ones in the view
      );
      // Optionally, you might want to move approved items to a different list or view
    }, 300);
  };
  
  const handleDeny = (id: number) => {
    // Simulate API call delay
    setTimeout(() => {
      setPendingRentals(prevRentals =>
        prevRentals.map(rental =>
          rental.id === id ? { ...rental, status: 'DENIED' } : rental // Use string status
        ).filter(r => r.status === 'PENDING') // Keep only pending ones in the view
      );
      // Optionally, handle denied items (e.g., move to history)
    }, 300);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Rental Approval Management</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {successMessage}
        </div>
      )}
      
      {/* Rental Requests List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                {/* Removed Quantity Header */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rental Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    <div className="loader"></div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-red-500">
                    {error}
                  </td>
                </tr>
              ) : pendingRentals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No pending rental requests at this time.
                  </td>
                </tr>
              ) : (
                pendingRentals.map((rental) => (
                  <tr key={rental.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {rental.renterUser.firstName} {rental.renterUser.lastName} {/* Use renterUser */}
                      </div>
                      <div className="text-sm text-gray-500">{rental.renterUser.email}</div> {/* Use renterUser */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{rental.rentedItem.name}</div> {/* Use rentedItem */}
                      <div className="text-sm text-gray-500">{rental.rentedItem.category}</div> {/* Use rentedItem */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>From: {formatDate(rental.startDateTime)}</div> {/* Use startDateTime */}
                      <div>To: {formatDate(rental.endDateTime)}</div> {/* Use endDateTime */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {rental.curCost} HUF {/* Use curCost */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(rental.id)}
                          className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded hover:bg-green-600 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeny(rental.id)}
                          className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition"
                        >
                          Deny
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RentalApprovalsPage;