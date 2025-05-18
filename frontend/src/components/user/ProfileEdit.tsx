import React from 'react';
import { useAppContext } from '../../AppContextProvider'; // Added import
import { User, UserRequest } from '../../client'; // Assuming User and UserRequest types are from client

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
  const { baseColor } = useAppContext(); // Added baseColor
  const style = { '--user-bg-color': baseColor } as React.CSSProperties; // Added style object
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
              className="w-full p-2 border border-gray-300 rounded focus:ring-[var(--user-bg-color)] focus:border-[var(--user-bg-color)]"
              style={style} // Added style
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={editData.email !== undefined ? editData.email : user.email}
              onChange={onInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-[var(--user-bg-color)] focus:border-[var(--user-bg-color)]"
              style={style} // Added style
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vezetéknév</label>
            <input
              type="text"
              name="lastName"
              value={editData.lastName !== undefined ? editData.lastName : user.lastName}
              onChange={onInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-[var(--user-bg-color)] focus:border-[var(--user-bg-color)]"
              style={style} // Added style
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keresztnév</label>
            <input
              type="text"
              name="firstName"
              value={editData.firstName !== undefined ? editData.firstName : user.firstName}
              onChange={onInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-[var(--user-bg-color)] focus:border-[var(--user-bg-color)]"
              style={style} // Added style
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
            className="w-full p-2 border border-gray-300 rounded focus:ring-[var(--user-bg-color)] focus:border-[var(--user-bg-color)]"
            style={style} // Added style
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
            className="px-4 py-2 bg-[var(--user-bg-color)] text-white rounded hover:bg-[var(--user-bg-color)] transition"
            disabled={isLoading}
            style={style} // Added style
          >
            {isLoading ? 'Mentés...' : 'Mentés'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
