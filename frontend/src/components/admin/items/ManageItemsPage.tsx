import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Removed axios import
import { Item } from '../../../dto/Item';
// import { ItemCategory } from '../../../dto/ItemCategory'; // Assuming string representation for now

// Mock data for items - Adjusted to match Item DTO
const mockItems: Item[] = [
  {
    id: 1,
    name: 'Laptop Pro X',
    description: 'High-performance laptop for professionals.',
    category: 'LAPTOP', // Use string representation
    costPerDay: 5000,
    availability: 10, // Represents total quantity in mock
    image: { id: 1, url: 'https://via.placeholder.com/150/92c952', createdAt: '', updatedAt: '' }, // Match Image structure
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Tablet Air 5',
    description: 'Lightweight and powerful tablet.',
    category: 'TABLET',
    costPerDay: 3000,
    availability: 15,
    image: { id: 2, url: 'https://via.placeholder.com/150/771796', createdAt: '', updatedAt: '' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Smartphone Galaxy S25',
    description: 'Latest generation smartphone with AI features.',
    category: 'SMARTPHONE',
    costPerDay: 4000,
    availability: 20,
    image: { id: 3, url: 'https://via.placeholder.com/150/24f355', createdAt: '', updatedAt: '' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Define a type for the form state, using correct property names
type CurrentItemFormState = Partial<Omit<Item, 'image' | 'category'> & { imageUrl: string, category: string }>;

const ManageItemsPage: React.FC = () => {
  // const backendAddress = import.meta.env.VITE_BACKEND_ADDRESS; // No longer needed
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  // Use the new form state type
  const [currentItem, setCurrentItem] = useState<CurrentItemFormState>({});
  const [showForm, setShowForm] = useState(false);

  // Fetch all items (using mock data)
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    // Simulate API call delay
    setTimeout(() => {
      setItems(mockItems);
      setError(null);
    }, 500); // 0.5 second delay
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Handle numeric inputs specifically
    const isNumericField = ['costPerDay', 'availability'].includes(name);
    setCurrentItem({
      ...currentItem,
      [name]: isNumericField ? (value === '' ? null : Number(value)) : value
    });
  };

  const resetForm = () => {
    setCurrentItem({});
    setIsEditing(false);
    setShowForm(false);
  };

  const handleAddItem = () => {
    setIsEditing(false);
    setCurrentItem({});
    setShowForm(true);
  };

  const handleEditItem = (item: Item) => {
    // Convert Item DTO to form state
    setCurrentItem({
        ...item,
        imageUrl: item.image?.url || '',
        category: item.category // Assuming category in Item DTO is string-like or has toString()
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Validation using correct property names
    if (!currentItem.name || !currentItem.category || !currentItem.costPerDay || !currentItem.availability || !currentItem.description) {
        setError('Please fill in all required fields.');
        return;
    }

    // Simulate API call delay
    setTimeout(() => {
      if (isEditing && currentItem.id) {
        // Update existing item in mock data
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === currentItem.id ? {
              ...item, // Keep existing fields like createdAt
              name: currentItem.name!,
              description: currentItem.description!,
              category: currentItem.category!, // Assuming string
              costPerDay: currentItem.costPerDay!,
              availability: currentItem.availability!,
              image: currentItem.imageUrl ? { ...(item.image || { id: Date.now(), createdAt:'', updatedAt:'' }), url: currentItem.imageUrl } : null,
              updatedAt: new Date().toISOString(),
            } : item
          )
        );
      } else {
        // Create new item in mock data
        const newItem: Item = {
          id: Date.now(), // Simple unique ID generation for mock
          name: currentItem.name!,
          description: currentItem.description!,
          category: currentItem.category!, // Assuming string
          costPerDay: currentItem.costPerDay!,
          availability: currentItem.availability!,
          image: currentItem.imageUrl ? { id: Date.now(), url: currentItem.imageUrl, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } : null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setItems(prevItems => [...prevItems, newItem]);
      }

      resetForm();
    }, 300); // 0.3 second delay
  };

  const handleDeleteItem = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      // Simulate API call delay
      setTimeout(() => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
      }, 300); // 0.3 second delay
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Items</h1>
        <button 
          onClick={handleAddItem}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-md transition"
        >
          Add New Item
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={currentItem.name || ''}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={currentItem.category || ''} // Value is now string
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="LAPTOP">Laptop</option>
                  <option value="TABLET">Tablet</option>
                  <option value="SMARTPHONE">Smartphone</option>
                  <option value="CAMERA">Camera</option>
                  <option value="AUDIO">Audio</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Daily Price (HUF)</label>
                <input
                  type="number"
                  name="costPerDay" // Changed name
                  value={currentItem.costPerDay ?? ''} // Changed value prop
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Total Quantity</label>
                <input
                  type="number"
                  name="availability" // Changed name
                  value={currentItem.availability ?? ''} // Changed value prop
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* ... Description textarea ... */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={currentItem.description || ''}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={4}
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  name="imageUrl" // Keep name for form state
                  value={currentItem.imageUrl || ''} // Changed value prop
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* ... Form buttons ... */}
            <div className="flex justify-end mt-6 space-x-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              >
                {isEditing ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Item List */}
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
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No items found. Add some items to get started.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.image?.url ? ( // Check image.url
                          <img src={item.image.url} alt={item.name} className="h-10 w-10 rounded-md mr-3 object-cover" /> // Use image.url
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
                      {item.category} {/* Category is now string */} 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.costPerDay} HUF {/* Use costPerDay */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.availability} {/* Use availability */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
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

export default ManageItemsPage;