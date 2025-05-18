import React, { useRef, useState } from 'react';
import { useAppContext } from '../../AppContextProvider';
import BlankProfilePic from '../../assets/blank_profile_pic.png';
import { updateUserdataById } from '../../client/sdk.gen';
import { Image as ApiImage, UserRequest } from '../../client/types.gen';
import ProfileEdit from './ProfileEdit';
import ProfileView from './ProfileView';

// Define a type for the image part of editData, making id optional for new uploads
// and ensuring it's compatible with ApiImage for the request body.
interface EditableImage extends Omit<ApiImage, 'id'> {
  id?: number; // id is optional for new uploads, but ApiImage requires it.
}

// Fő ProfilePanel komponens - összefogja a két alkomponenst
const ProfilePanel: React.FC = () => {
  const { user, setUser } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  // Adjust editData to use Partial<UserRequest> but allow image to be our EditableImage or undefined.
  const [editData, setEditData] = useState<Partial<Omit<UserRequest, 'image'> & { image?: EditableImage }>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Added ref for file input

  if (!user) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading user data or not logged in...</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = (reader.result as string).split(',')[1];
        const contentType = file.type;
        const fileName = file.name;
        // For a new image, id will be undefined.
        setEditData(prev => ({ ...prev, image: { imageData, contentType, fileName } }));
      };
      reader.readAsDataURL(file);
    }
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
      // Construct the image object for the API request.
      // If a new image was selected, editData.image will have imageData, contentType, and fileName.
      // The backend might expect an 'id' even for new images (e.g., if it uses it as a placeholder or ignores it).
      // Or it might handle new images without an 'id'. We assume it can handle absence of 'id' for new images.
      let imageForRequest: ApiImage | undefined = undefined;
      if (editData.image) {
        imageForRequest = {
          // If user already has an image, keep its id, otherwise undefined (for new image)
          id: user.image?.id ?? undefined,
          imageData: editData.image.imageData,
          contentType: editData.image.contentType,
          fileName: editData.image.fileName,
        } as ApiImage; // Cast to ApiImage, assuming backend handles missing id for new images.
      }

      const updatedUserData: UserRequest = {
        id: user.id,
        userName: editData.userName || user.userName,
        firstName: editData.firstName || user.firstName,
        lastName: editData.lastName || user.lastName,
        email: editData.email || user.email,
        description: editData.description !== undefined ? editData.description : user.description,
        ...(imageForRequest && { image: imageForRequest }),
      };

      const { data, error: apiError } = await updateUserdataById({
        path: { id: user.id.toString() },
        body: updatedUserData
      });

      if (apiError) {
        let errorMessage = "Hiba történt";
        if (typeof apiError === 'object' && apiError !== null) {
          if ('body' in apiError && typeof apiError.body === 'object' && apiError.body !== null) {
            const errorBody = apiError.body as { detail?: string; title?: string; message?: string; [key: string]: any };
            errorMessage = errorBody.detail || errorBody.title || errorBody.message || JSON.stringify(apiError.body);
          } else {
            const errorDetail = (apiError as any).detail || (apiError as any).title || (apiError as any).message;
            errorMessage = errorDetail || JSON.stringify(apiError);
          }
        } else if (typeof apiError === 'string') {
          errorMessage = apiError;
        }
        setError(`Hiba történt: ${errorMessage}`);
      } else if (data) { // data is User object from API
        const userToSet = { ...data }; // Start with server response

        // Scenario: User uploaded/changed an image (editData.image is populated)
        if (editData.image && typeof editData.image.imageData === 'string') {
          // Check if server's response for the image is incomplete or missing
          const serverImage = data.image;
          if (!serverImage || typeof serverImage.imageData !== 'string' || typeof serverImage.contentType !== 'string') {
            console.warn("Server response for user update did not include complete image data. Using local data for display, with server's ID if available.");
            
            let imageIdToUse: number;
            // Prioritize server's ID from the (incomplete) image object
            if (serverImage && typeof serverImage.id === 'number') {
              imageIdToUse = serverImage.id;
            // Fallback to previous image's ID if updating an existing one
            } else if (user.image && typeof user.image.id === 'number') {
              imageIdToUse = user.image.id;
            } else {
              // This case means it was a new image, and server didn't return an image object with an ID.
              // This is problematic for ApiImage type which requires an ID.
              // Assigning a temporary/dummy ID. This might not be correct for subsequent operations.
              // Ideally, the server should always return the new image ID.
              console.error("New image uploaded, but server response did not provide an image ID. Using placeholder ID 0.");
              imageIdToUse = 0; // Placeholder ID to satisfy ApiImage type, backend should provide real ID.
            }

            userToSet.image = {
              imageData: editData.image.imageData,
              contentType: editData.image.contentType,
              fileName: editData.image.fileName || '', // Ensure fileName is at least an empty string
              id: imageIdToUse,
            };
          }
        }
        
        setUser(userToSet);
        setSuccess('Sikeres adatmódosítás!');
        setIsEditing(false);
        setEditData({}); // Clear edit data after save
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

  // Determine the image source for display
  let displayImageSrc = BlankProfilePic;
  if (editData.image?.imageData) {
    displayImageSrc = `data:${editData.image.contentType};base64,${editData.image.imageData}`;
  } else if (user.image?.imageData) {
    displayImageSrc = `data:${user.image.contentType};base64,${user.image.imageData}`;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
          <img
            src={displayImageSrc}
            alt="Profile"
            className="h-24 w-24 rounded-full border-4 border-blue-200 mb-4 object-cover"
            onClick={handleImageClick}
            style={{ cursor: isEditing ? 'pointer' : 'default' }}
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
              // Pass editData, ensuring its 'image' part is compatible or handled by ProfileEdit
              // If ProfileEdit expects a full UserRequest image, this might need adjustment or ProfileEdit needs to be more flexible.
              editData={editData as Partial<UserRequest>} // Cast here, assuming ProfileEdit can handle potentially partial image
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
