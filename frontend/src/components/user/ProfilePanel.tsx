import React from 'react';
import { useAppContext } from '../../AppContextProvider';
import BlankProfilePic from '../../assets/blank_profile_pic.png';

const ProfilePanel: React.FC = () => {
  const { user } = useAppContext();

  if (!user) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading user data or not logged in...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src={BlankProfilePic} // Replace with user.profileImageUrl if available
            alt="Profile"
            className="h-24 w-24 rounded-full border-4 border-blue-200 mb-4"
          />
          <h1 className="text-2xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h1>
          <p className="text-gray-600">@{user.userName}</p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Email:</span>
              <span className="text-gray-800">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">First Name:</span>
              <span className="text-gray-800">{user.firstName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Last Name:</span>
              <span className="text-gray-800">{user.lastName}</span>
            </div>
            {/* Add more user details here as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;