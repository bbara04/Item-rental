import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Item, ItemRequest, getItemsById, updateItemDataById } from '../../../client';

// Define a type for the error structure from the API
interface ApiErrorDetail {
  error?: {
    detail?: string;
  };
  message?: string;
}

const ModifyItemPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(itemId);

  const [formData, setFormData] = useState<Partial<Item>>({});
  const [originalItem, setOriginalItem] = useState<Item | null>(null);
  // No need for originalImage state, originalItem.image can be used directly for comparison
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [newImagePreviewUrl, setNewImagePreviewUrl] = useState<string | null>(null); // Added for new image preview

  useEffect(() => {
    if (isEditMode && itemId) {
      setIsLoading(true);
      getItemsById({ path: { id: itemId } })
        .then(({ data, error: fetchError }) => {
          if (fetchError) {
            setError('Failed to fetch item details.');
            console.error("Error fetching item:", fetchError);
          } else if (data) {
            setFormData(data);
            setOriginalItem(data);
            if (data.image) {
              setSelectedFileName(data.image.fileName || "Stored image");
            }
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [itemId, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'categories') {
      const newCategories = value.split(',').map(cat => cat.trim()).filter(cat => cat.length > 0);
      setFormData(prev => ({ ...prev, categories: newCategories.length > 0 ? newCategories : undefined }));
    } else if (['costPerDay', 'availability'].includes(name)) {
      const numValue = Number(value);
      setFormData(prev => ({ ...prev, [name]: value === '' ? undefined : (isNaN(numValue) ? undefined : numValue) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setNewImagePreviewUrl(null); // Clear previous preview before reading new file

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64DataUrl = reader.result as string;
        setNewImagePreviewUrl(base64DataUrl); // Set new preview URL

        // Extract Base64 data for sending to backend
        const imageDataBase64 = base64DataUrl.split(',')[1]; 
        const imageId = formData.image?.id ?? originalItem?.image?.id ?? 0;

        setFormData(prev => ({
          ...prev,
          image: {
            id: imageId,
            imageData: imageDataBase64,
            contentType: file.type,
            fileName: file.name,
          }
        }));
      };
      reader.onerror = () => { // Added error handling for FileReader
        setError("Failed to read file. Please try again.");
        setSelectedFileName("");
        setNewImagePreviewUrl(null);
        setFormData(prev => ({ ...prev, image: undefined }));
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFileName("");
      setNewImagePreviewUrl(null); // Clear preview if file is deselected
      setFormData(prev => ({ ...prev, image: undefined })); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!formData.name || !formData.categories?.[0] || formData.costPerDay == null || formData.availability == null || !formData.description) {
      setError('Please fill in all required fields: Name, Category (at least one, comma-separated), Daily Price, Quantity, and Description.');
      setIsLoading(false);
      return;
    }
    if (formData.costPerDay < 0 || formData.availability < 0) {
      setError('Cost per day and availability cannot be negative.');
      setIsLoading(false);
      return;
    }

    let payload: Partial<ItemRequest> = {};

    if (isEditMode && originalItem && itemId) {
      // For PATCH, start with the ID, then add only changed fields.
      payload = { id: parseInt(itemId, 10) };

      if (formData.name !== undefined && formData.name !== originalItem.name) {
        payload.name = formData.name;
      }
      if (formData.description !== undefined && formData.description !== originalItem.description) {
        payload.description = formData.description;
      }
      if (formData.costPerDay !== undefined && formData.costPerDay !== originalItem.costPerDay) {
        payload.costPerDay = formData.costPerDay;
      }
      if (formData.availability !== undefined && formData.availability !== originalItem.availability) {
        payload.availability = formData.availability;
      }

      // Deep compare for categories, handling undefined cases
      const originalCategoriesString = JSON.stringify(originalItem.categories || []);
      const formCategoriesString = JSON.stringify(formData.categories || []);
      if (formCategoriesString !== originalCategoriesString) {
        payload.categories = formData.categories; // Send current formData.categories (could be undefined)
      }

      // Deep compare for image, handling undefined cases
      // originalItem.image is non-optional in Item, formData.image can be undefined
      const originalImageString = JSON.stringify(originalItem.image);
      const formImageString = JSON.stringify(formData.image);
      if (formImageString !== originalImageString) {
         payload.image = formData.image; // Send current formData.image (could be undefined)
      }
      
      // Example for facultiesId if it were editable in the form
      // const originalFacultiesIdString = JSON.stringify(originalItem.facultiesId || []);
      // const formFacultiesIdString = JSON.stringify(formData.facultiesId || []);
      // if (formFacultiesIdString !== originalFacultiesIdString) {
      //    payload.facultiesId = formData.facultiesId;
      // }

    } else {
      // Create mode: build full payload from formData
      // The ItemRequest type requires id. For creation, this might be 0 or handled by backend.
      // Ensure all required fields for creation are present before building payload
      if (!formData.name || !formData.description || !formData.categories || formData.costPerDay === undefined || formData.availability === undefined) {
        setError('Missing required fields for creating a new item. Name, description, categories, cost, and availability are required.');
        setIsLoading(false);
        return;
      }
      payload = {
        id: formData.id || 0, 
        name: formData.name,
        description: formData.description,
        categories: formData.categories,
        costPerDay: formData.costPerDay,
        availability: formData.availability,
        ...(formData.image && { image: formData.image }), // Include image if present
        ...(formData.facultiesId && { facultiesId: formData.facultiesId }), // Include facultiesId if present
      };
    }
    
    // Validation for image object if it exists (e.g. after file processing)
    if (formData.image && (formData.image.id == null || !formData.image.imageData || !formData.image.contentType)) {
        setError('Image data is incomplete. Ensure file is processed correctly.');
        setIsLoading(false);
        return;
    }

    try {
      if (isEditMode && itemId) {
        // Check if any actual changes were made besides the ID
        const changedFieldKeys = Object.keys(payload).filter(k => k !== 'id');
        if (changedFieldKeys.length === 0) {
           setError('No changes detected to update.');
           setIsLoading(false);
           return;
        }

        const { error: updateError } = await updateItemDataById({ 
            path: { id: itemId }, 
            body: payload as ItemRequest // Cast because ItemRequest might be stricter than Partial<ItemRequest>
        });

        if (updateError) {
          const apiError = updateError as ApiErrorDetail;
          const errorDetail = apiError.error?.detail || apiError.message || 'Failed to update item.';
          setError(errorDetail);
          console.error("Error updating item:", updateError);
        } else {
          navigate('/admin/items');
        }
      } else {
        // TODO: Implement createItem call once available in the SDK.
        // Ensure 'payload' for createItem is a full ItemRequest as required by the (future) SDK function.
        setError('Create item functionality is not yet implemented.');
        console.log("Attempted to create item with payload:", payload);
      }
    } catch (apiErrorResponse: unknown) {
      let detailMessage = isEditMode ? 'Failed to update item.' : 'Failed to create item.';
      const castedError = apiErrorResponse as ApiErrorDetail;
      if (castedError.error?.detail) {
        detailMessage = castedError.error.detail;
      } else if (castedError.message) {
        detailMessage = castedError.message;
      }
      setError(detailMessage);
      console.error(isEditMode ? "Error updating item:" : "Error creating item:", apiErrorResponse);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditMode && !originalItem) return <div className="container mx-auto px-4 py-8">Loading item details...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditMode ? 'Edit Item' : 'Add New Item'}
      </h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="itemName" className="block text-gray-700 mb-1">Name</label>
            <input
              id="itemName" type="text" name="name"
              value={formData.name || ''} onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="itemCategories" className="block text-gray-700 mb-1">Categories (comma-separated)</label>
            <input
              id="itemCategories" type="text" name="categories"
              value={formData.categories?.join(', ') || ''} onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="itemCost" className="block text-gray-700 mb-1">Daily Price (HUF)</label>
            <input
              id="itemCost" type="number" name="costPerDay"
              value={formData.costPerDay ?? ''} onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required min="0"
            />
          </div>
          <div>
            <label htmlFor="itemAvailability" className="block text-gray-700 mb-1">Total Quantity</label>
            <input
              id="itemAvailability" type="number" name="availability"
              value={formData.availability ?? ''} onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required min="0"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="itemDescription" className="block text-gray-700 mb-1">Description</label>
            <textarea
              id="itemDescription" name="description"
              value={formData.description || ''} onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4} required
            ></textarea>
          </div>
          <div>
            <label htmlFor="itemImageFile" className="block text-gray-700 mb-1">Item Image</label>
            <input
              id="itemImageFile" type="file" name="itemImageFile" accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {selectedFileName && <p className="text-sm text-gray-500 mt-1">Selected: {selectedFileName}</p>}
            {newImagePreviewUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">New image preview:</p>
                <img
                  src={newImagePreviewUrl}
                  alt="New item preview"
                  className="max-h-32 max-w-xs border border-gray-300 rounded mt-1"
                />
              </div>
            )}
            {/* Display current image if in edit mode, an image exists, AND no new file is being previewed */}
            {isEditMode && originalItem?.image && !newImagePreviewUrl && (
                <div className="mt-2">
                    <p className="text-sm text-gray-600">Current image:</p>
                    <img 
                        src={`data:${originalItem.image.contentType};base64,${originalItem.image.imageData}`}
                        alt={originalItem.image.fileName || "Item image"} 
                        className="max-h-32 max-w-xs border border-gray-300 rounded mt-1" />
                </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button" onClick={() => navigate('/admin/items')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit" disabled={isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : (isEditMode ? 'Update Item' : 'Add Item')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifyItemPage;