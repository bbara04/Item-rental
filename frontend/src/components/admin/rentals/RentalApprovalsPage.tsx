import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { TransactionResponse } from '../../../client';
import {
  getAllUserTransactions, // Changed from getTransactions
  patchTransactionStatusById
} from '../../../client/sdk.gen';
import { useAppContext } from '../../../AppContextProvider';

// Helper function to format date strings (assuming ISO format)
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return 'N/A';
  try {
    return format(new Date(dateString), 'yyyy-MM-dd');
  } catch (e) {
    return 'Invalid Date';
  }
};

const RentalApprovalsPage: React.FC = () => {
  const [pendingRentals, setPendingRentals] = useState<TransactionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { baseColor } = useAppContext(); // Added baseColor
  const style = { '--user-bg-color': baseColor } as React.CSSProperties; // Added style object
  
  // Fetch pending rentals from API
  useEffect(() => {
    fetchPendingRentals();
  }, []);
  
  const fetchPendingRentals = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Request pending transactions from the API
      const { data, error: apiError } = await getAllUserTransactions();
      
      if (apiError) {
        setError(`Failed to fetch pending rentals: ${apiError.toString || 'Unknown error'}`);
        setPendingRentals([]);
      } else if (data) {
        const pendingTransactions = data.filter((transaction) => transaction.status === 'STARTED');
        setPendingRentals(pendingTransactions);
      }
    } catch (err) {
      console.error('Error fetching pending rentals:', err);
      setError('An unexpected error occurred while fetching pending rentals');
      setPendingRentals([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleApprove = async (id: number) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const { data, error: apiError } = await patchTransactionStatusById({
        path: { id: id.toString() },
        body: { 
          id: id,
          status: 'APPROVED'
         }
      });
      
      if (apiError) {
        setError(`Failed to approve rental: ${apiError.status || 'Unknown error'}`);
      } else {
        setSuccessMessage(`Rental #${id} successfully approved`);
        // Refresh the list to remove the approved rental
        fetchPendingRentals();
      }
    } catch (err) {
      console.error('Error approving rental:', err);
      setError('An unexpected error occurred while approving the rental');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeny = async (id: number) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const { data, error: apiError } = await patchTransactionStatusById({
        path: { id: id.toString() },
        body: {
          id: id, 
          status: 'DECLINED'
         }
      });
      
      if (apiError) {
        setError(`Failed to deny rental: ${apiError.status || 'Unknown error'}`);
      } else {
        setSuccessMessage(`Rental #${id} successfully denied`);
        // Refresh the list to remove the denied rental
        fetchPendingRentals();
      }
    } catch (err) {
      console.error('Error denying rental:', err);
      setError('An unexpected error occurred while denying the rental');
    } finally {
      setLoading(false);
    }
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
      
      {/* Refresh button */}
      <div className="mb-4">
        <button 
          onClick={fetchPendingRentals}
          className="px-4 py-2 bg-[var(--user-bg-color)] text-white font-medium rounded hover:bg-[var(--user-bg-color)] transition"
          disabled={loading}
          style={style} // Added style
        >
          {loading ? 'Refreshing...' : 'Refresh List'}
        </button>
      </div>
      
      {/* Rental Requests List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
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
                        {rental.user.firstName} {rental.user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{rental.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{rental.item.name}</div>
                      <div className="text-sm text-gray-500">{rental.item.categories}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>From: {formatDate(rental.startDate)}</div>
                      <div>To: {formatDate(rental.endDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {rental.item.costPerDay} Huf/day
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(rental.id)}
                          className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded hover:bg-green-600 transition"
                          disabled={loading}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeny(rental.id)}
                          className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition"
                          disabled={loading}
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