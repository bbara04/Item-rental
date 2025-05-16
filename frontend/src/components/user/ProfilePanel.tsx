import React, { useState } from 'react';
import { useAppContext } from '../../AppContextProvider';
import BlankProfilePic from '../../assets/blank_profile_pic.png';
import { updateUserdataById } from '../../client/sdk.gen';
import { UserRequest } from '../../client/types.gen';
import ProfileEdit from './ProfileEdit';
import ProfileView from './ProfileView';

// Fő ProfilePanel komponens - összefogja a két alkomponenst
const ProfilePanel: React.FC = () => {
  const { user, setUser } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserRequest>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!user) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading user data or not logged in...</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user.id) {
      setError('Hiányzó felhasználó azonosító');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedUserData: UserRequest = {
        id: user.id,
        userName: editData.userName || user.userName,
        firstName: editData.firstName || user.firstName,
        lastName: editData.lastName || user.lastName,
        email: editData.email || user.email,
        description: editData.description !== undefined ? editData.description : user.description
      };

      const { data, error } = await updateUserdataById({
        path: { id: user.id.toString() },
        body: updatedUserData
      });

      if (error) {
        setError(`Hiba történt: ${error || 'Ismeretlen hiba'}`);
      } else if (data) {
        setUser(data);
        setSuccess('Sikeres adatmódosítás!');
        setIsEditing(false);
      }
    } catch (err) {
      setError('Váratlan hiba történt a mentés során');
      console.error('Profil mentési hiba:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src={user.image?.imageData ? `data:${user.image.contentType};base64,${user.image.imageData}` : BlankProfilePic} 
            alt="Profile"
            className="h-24 w-24 rounded-full border-4 border-blue-200 mb-4 object-cover"
          />
          <h1 className="text-2xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h1>
          <p className="text-gray-600">@{user.userName}</p>
          {user.loginType && (
            <div className="mt-2">
              <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                {user.loginType} felhasználó
              </span>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6">
          {isEditing ? (
            <ProfileEdit 
              user={user}
              editData={editData}
              isLoading={isLoading}
              error={error}
              success={success}
              onInputChange={handleInputChange}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <ProfileView 
              user={user} 
              onEditClick={() => setIsEditing(true)} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
