import React from 'react';
import { User, UserRequest } from '../../client/types.gen';

// ProfileEdit komponens - a felhasználói adatok szerkesztéséért felelős
interface ProfileEditProps {
  user: User;
  editData: Partial<UserRequest>;
  isLoading: boolean;
  error: string | null;
  success: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ 
  user, 
  editData, 
  isLoading, 
  error, 
  success, 
  onInputChange, 
  onSave, 
  onCancel 
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Profil Szerkesztése</h2>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Felhasználónév</label>
            <input
              type="text"
              name="userName"
              value={editData.userName !== undefined ? editData.userName : user.userName}
              onChange={onInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={editData.email !== undefined ? editData.email : user.email}
              onChange={onInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vezetéknév</label>
            <input
              type="text"
              name="lastName"
              value={editData.lastName !== undefined ? editData.lastName : user.lastName}
              onChange={onInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keresztnév</label>
            <input
              type="text"
              name="firstName"
              value={editData.firstName !== undefined ? editData.firstName : user.firstName}
              onChange={onInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bemutatkozás</label>
          <textarea
            name="description"
            value={editData.description !== undefined ? editData.description : user.description || ''}
            onChange={onInputChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
            disabled={isLoading}
          >
            Mégse
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Mentés...' : 'Mentés'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
