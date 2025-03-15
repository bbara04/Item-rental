import React from "react";

interface RentalItemProps {
  imageUrl: string;
  name: string;
  description: string;
  available: number;
  rentLink: string;
}

const RentalItemCard: React.FC<RentalItemProps> = ({
  imageUrl,
  name,
  description,
  available,
  rentLink,
}) => {
  return (
    <div className="flex flex-col justify-evenly p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-sm h-[450px]">
      {/* Image Section */}
      <div className="w-full flex flex-grow justify-center mb-6">
        <img
          src={imageUrl}
          alt={name}
          className="h-full object-cover rounded-md"
        />
      </div>

      {/* Content Section - Flex-grow keeps button at the bottom */}
      <div className="flex flex-col justify-end p-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center">{name}</h2>
        <p className="text-sm text-gray-600 mt-2 text-center line-clamp-3">
          {description}
        </p>
        <p className="text-sm font-medium mt-3 text-center">
          Available: <span className="font-bold text-green-600">{available}</span>
        </p>
      </div>

      {/* Rent Button - Always at the bottom */}
      <a
        href={rentLink}
        className="mt-auto bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Rent Now
      </a>
    </div>
  );
};

export default RentalItemCard;
