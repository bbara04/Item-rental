import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Item, ItemRequest, getItemsById, updateItemDataById } from '../../../client';
import useResponsiveWidth from '../../../hooks/useResponsiveWidth';

// Define a type for the error structure from the API
interface ApiErrorDetail {
  error?: {
    detail?: string;
  };
  message?: string;
}

interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  min?: string;
  rows?: number;
  accept?: string;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
}

const ModifyItemPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(itemId);
  const screenWidth = useResponsiveWidth();

  const [formData, setFormData] = useState<Partial<Item>>({});
  const [originalItem, setOriginalItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [newImagePreviewUrl, setNewImagePreviewUrl] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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

  // Field validation function
  const validateField = (name: string, value: unknown): string => {
    switch(name) {
      case 'name':
        return !value ? 'Name is required' : '';
      case 'categories':
        return !value || (Array.isArray(value) && value.length === 0) ? 'At least one category is required' : '';
      case 'costPerDay': {
        const numValue = typeof value === 'number' ? value : Number(value);
        return value === undefined || numValue < 0 ? 'Price must be a positive number' : '';
      }
      case 'availability': {
        const numValue = typeof value === 'number' ? value : Number(value);
        return value === undefined || numValue < 0 ? 'Quantity must be a positive number' : '';
      }
      case 'description':
        return !value ? 'Description is required' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let updatedValue: string | number | string[] | undefined = value;
    let validationMessage = '';

    if (name === 'categories') {
      const newCategories = value.split(',').map(cat => cat.trim()).filter(cat => cat.length > 0);
      updatedValue = newCategories.length > 0 ? newCategories : undefined;
      validationMessage = validateField(name, updatedValue);
    } else if (['costPerDay', 'availability'].includes(name)) {
      const numValue = Number(value);
      updatedValue = value === '' ? undefined : (isNaN(numValue) ? undefined : numValue);
      validationMessage = validateField(name, updatedValue);
    } else {
      validationMessage = validateField(name, value);
    }

    setFormData(prev => ({ ...prev, [name]: updatedValue }));
    
    // Update validation errors
    setValidationErrors(prev => ({
      ...prev,
      [name]: validationMessage
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validImageTypes.includes(file.type)) {
        setError("Invalid file type. Please upload JPEG, PNG, GIF or WebP images.");
        return;
      }
      
      if (file.size > maxSize) {
        setError("File is too large. Maximum size is 5MB.");
        return;
      }
      
      setSelectedFileName(file.name);
      setNewImagePreviewUrl(null); // Clear previous preview
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64DataUrl = reader.result as string;
        setNewImagePreviewUrl(base64DataUrl);

        // Extract Base64 data for backend
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
        
        // Clear any previous image error
        setValidationErrors(prev => ({...prev, image: ''}));
      };
      
      reader.onerror = () => {
        setError("Failed to read file. Please try again.");
        setSelectedFileName("");
        setNewImagePreviewUrl(null);
        setFormData(prev => ({ ...prev, image: undefined }));
      };
      
      reader.readAsDataURL(file);
    } else {
      setSelectedFileName("");
      setNewImagePreviewUrl(null);
      setFormData(prev => ({ ...prev, image: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);
    
    // Validate all fields
    const errors: Record<string, string> = {};
    
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.categories?.length) errors.categories = 'At least one category is required';
    if (formData.costPerDay === undefined || formData.costPerDay < 0) errors.costPerDay = 'Price must be a positive number';
    if (formData.availability === undefined || formData.availability < 0) errors.availability = 'Quantity must be a positive number';
    if (!formData.description) errors.description = 'Description is required';
    
    // Update validation state
    setValidationErrors(errors);
    
    // Check if there are any validation errors
    if (Object.values(errors).some(error => error !== '')) {
      setError('Please correct the errors in the form.');
      setIsSaving(false);
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
      
      // Check if any actual changes were made
      const changedFieldKeys = Object.keys(payload).filter(k => k !== 'id');
      if (changedFieldKeys.length === 0) {
         setError('No changes detected to update.');
         setIsSaving(false);
         return;
      }

    } else {
      // Create mode: build full payload from formData
      payload = {
        id: formData.id || 0, 
        name: formData.name,
        description: formData.description,
        categories: formData.categories,
        costPerDay: formData.costPerDay,
        availability: formData.availability,
        ...(formData.image && { image: formData.image }),
        ...(formData.facultiesId && { facultiesId: formData.facultiesId }),
      };
    }

    try {
      if (isEditMode && itemId) {
        const { error: updateError } = await updateItemDataById({ 
            path: { id: itemId }, 
            body: payload as ItemRequest
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
      setIsSaving(false);
    }
  };

  // Form field helper component
  const FormField = ({ 
    label, id, name, type = 'text', value, onChange, error, required = false,
    min, rows, accept, placeholder, className = '', children
  }: FormFieldProps) => {
    const fieldError = validationErrors[name] || '';
    
    return (
      <div className={className}>
        <label htmlFor={id} className="block text-gray-700 mb-1 font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {type === 'textarea' ? (
          <textarea
            id={id}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows || 4}
            className={`w-full border ${fieldError ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
            required={required}
          />
        ) : (
          <input
            id={id}
            type={type}
            name={name}
            value={value ?? ''}
            onChange={onChange}
            accept={accept}
            min={min}
            placeholder={placeholder}
            className={`w-full border ${fieldError ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
            required={required}
          />
        )}
        
        {children}
        
        {fieldError && (
          <p className="mt-1 text-sm text-red-600">{fieldError}</p>
        )}
      </div>
    );
  };

  if (isLoading && isEditMode && !originalItem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-36 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 w-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
          {isEditMode ? 'Edit Item' : 'Add New Item'}
        </h1>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6" role="alert">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <FormField
              label="Name"
              id="itemName"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              required
              placeholder="Enter item name"
            />

            <FormField
              label="Categories"
              id="itemCategories"
              name="categories"
              value={formData.categories?.join(', ') || ''}
              onChange={handleInputChange}
              required
              placeholder="e.g. Electronics, Tools, etc."
            >
              <p className="text-xs text-gray-500 mt-1">Separate multiple categories with commas</p>
            </FormField>

            <FormField
              label="Daily Price (HUF)"
              id="itemCost"
              name="costPerDay"
              type="number"
              value={formData.costPerDay ?? ''}
              onChange={handleInputChange}
              required
              min="0"
              placeholder="0"
            />

            <FormField
              label="Total Quantity"
              id="itemAvailability"
              name="availability"
              type="number"
              value={formData.availability ?? ''}
              onChange={handleInputChange}
              required
              min="0"
              placeholder="0"
            />

            <FormField
              label="Description"
              id="itemDescription"
              name="description"
              type="textarea"
              value={formData.description || ''}
              onChange={handleInputChange}
              required
              placeholder="Describe the item in detail"
              className="md:col-span-2"
              rows={4}
            />

            <div className="md:col-span-2">
              <label htmlFor="itemImageFile" className="block text-gray-700 mb-1 font-medium">
                Item Image
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <div className="md:col-span-2">
                  <input
                    id="itemImageFile"
                    type="file"
                    name="itemImageFile"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition"
                  />
                  {selectedFileName && (
                    <p className="text-sm text-gray-500 mt-1">Selected: {selectedFileName}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Recommended: JPEG or PNG, max 5MB</p>
                </div>
                
                <div className="md:col-span-1">
                  {newImagePreviewUrl ? (
                    <div className="border border-gray-300 rounded-md p-2 bg-gray-50">
                      <p className="text-xs text-gray-600 mb-1">New image:</p>
                      <img
                        src={newImagePreviewUrl}
                        alt="New item preview"
                        className="max-h-32 w-full object-contain rounded"
                      />
                    </div>
                  ) : isEditMode && originalItem?.image ? (
                    <div className="border border-gray-300 rounded-md p-2 bg-gray-50">
                      <p className="text-xs text-gray-600 mb-1">Current image:</p>
                      <img
                        src={`data:${originalItem.image.contentType};base64,${originalItem.image.imageData}`}
                        alt={originalItem.image.fileName || "Item image"}
                        className="max-h-32 w-full object-contain rounded"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center border border-gray-300 rounded-md p-2 bg-gray-50 h-full min-h-[80px]">
                      <p className="text-sm text-gray-400">No image</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={() => navigate('/admin/items')}
              className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 flex items-center justify-center"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEditMode ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                isEditMode ? 'Update Item' : 'Add Item'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyItemPage;
