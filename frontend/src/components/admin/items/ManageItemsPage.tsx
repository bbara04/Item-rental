import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteItemById, ErrorModel, getAllItems, Item } from '../../../client'; // Added ErrorModel for type safety

const ManageItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await getAllItems();
    if (fetchError) {
      console.error("Error fetching items:", fetchError);
      // Use fetchError.detail or fetchError.title from ErrorModel
      const errorMessage = fetchError.detail || fetchError.title || 'Failed to fetch items.';
      setError(errorMessage);
      setItems([]);
    } else if (data) {
      setItems(data);
    } else {
      setItems([]);
    }
    setLoading(false);
  };

  const handleAddItem = () => {
    navigate('/admin/items/new');
  };

  const handleEditItem = (itemId: number) => {
    navigate(`/admin/items/edit/${itemId}`);
  };

  const handleDeleteItem = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      setError(null);
      setLoading(true); // Indicate loading during delete operation
      try {
        await deleteItemById({ path: { id: id.toString() } });
        setItems(prevItems => prevItems.filter(item => item.id !== id));
      } catch (apiError: unknown) {
        let detailMessage = 'Failed to delete item.';
        if (typeof apiError === 'object' && apiError !== null) {
            const err = apiError as { error?: { detail?: string }, message?: string }; // Or cast to ErrorModel if appropriate
            if (err.error && typeof err.error.detail === 'string') {
                detailMessage = err.error.detail;
            // Check if apiError itself is an ErrorModel (if client throws it directly)
            } else if ((apiError as ErrorModel).detail) {
                detailMessage = (apiError as ErrorModel).detail;
            } else if (typeof err.message === 'string') {
                detailMessage = err.message;
            }
        }
        setError(detailMessage);
        console.error("Error deleting item:", apiError);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Items</h1>
        <button 
          onClick={handleAddItem}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-md transition"
        >
          Add New Item
        </button>
      </div> */}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          {error}
        </div>
      )}
      {loading && <div className="text-center py-4"><p>Loading...</p></div>} {/* Centered loading text */}

      {!loading && items.length === 0 && !error && (
         <div className="text-center text-gray-500 py-8">
            No items found. Add some items to get started.
        </div>
      )}
      {!loading && items.length > 0 && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.image && item.image.imageData && item.image.contentType ? (
                          <img src={`data:${item.image.contentType};base64,${item.image.imageData}`} alt={item.image.fileName ?? item.name ?? "Item image"} className="h-10 w-10 rounded-md mr-3 object-cover" />
                        ) : (
                          <div className="h-10 w-10 rounded-md bg-gray-200 mr-3 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No img</span>
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.categories?.[0] || 'N/A'} 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.costPerDay} HUF 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.availability} 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditItem(item.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                          disabled={loading} // Disable button while loading
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={loading} // Disable button while loading
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageItemsPage;