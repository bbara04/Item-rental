import React from 'react';
import { User } from '../../client/types.gen';

// ProfileView komponens - a felhasználói adatok megjelenítéséért felelős
interface ProfileViewProps {
  user: User;
  onEditClick: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onEditClick }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Profil Információk</h2>
        <button 
          onClick={onEditClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Szerkesztés
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Felhasználónév:</span>
          <span className="text-gray-800">@{user.userName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Email:</span>
          <span className="text-gray-800">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Vezetéknév:</span>
          <span className="text-gray-800">{user.lastName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Keresztnév:</span>
          <span className="text-gray-800">{user.firstName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Szerepkör:</span>
          <span className="text-gray-800 capitalize">{user.role}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Egyetem:</span>
          <span className="text-gray-800">{user.university?.name || 'Nincs megadva'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Kar:</span>
          <span className="text-gray-800">{user.faculty?.name || 'Nincs megadva'}</span>
        </div>
        {user.balance && (
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Egyenleg:</span>
            <span className="text-gray-800">{user.balance?.currentValue || 0} {user.balance?.unit || 'Ft'}</span>
          </div>
        )}
        {user.ratings !== undefined && (
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Értékelés:</span>
            <span className="text-gray-800">{user.ratings || 0}/5</span>
          </div>
        )}
        {user.description && (
          <div className="mt-4">
            <span className="text-gray-500 font-medium block mb-2">Bemutatkozás:</span>
            <p className="text-gray-800 bg-gray-50 p-3 rounded">{user.description || 'Nincs megadva'}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileView;
