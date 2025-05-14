import React from "react";
import { Link } from "react-router-dom";
import { Item } from "../../../client";

const RentalItemCard: React.FC<Item> = (item) => {
  return (
    <div className="grid grid-rows-[auto_auto] grid-cols-1 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 max-w-[300px] max-h-fit content-between">
      <div className="flex flex-col max-h-fit">
        <div className="flex max-h-[200px] justify-center mb-2">
          <img
            src={item.image && item.image.imageData && item.image.contentType ? `data:${item.image.contentType};base64,${item.image.imageData}` : "https://placehold.co/600x400"}
            alt={item.image?.fileName ?? item.name ?? "Item image"}
            className="h-full object- rounded-t-md"
          />
        </div>
        <div className="flex flex-col justify-end p-2">
          <h2 className="text-xl font-semibold text-gray-800 text-center">{item.name}</h2>
          <p className="text-sm text-gray-600 mt-2 text-center line-clamp-3">
            {item.description}
          </p>
          
        </div>
      </div>
      <div className="flex flex-col justify-end max-h-fit p-2">
        <p className="text-sm font-medium text-center pb-3">
            Available: <span className="font-bold text-green-600">{item.availability}</span>
        </p>
        <div className="flex justify-evenly">
          <p className="text-sm text-center text-gray-600 mt-2 font-semibold">
            Price/Day: <span className="font-bold text-blue-600">${item.costPerDay}</span>
          </p>
          <Link
            to={`/rent/${item.id}`}
            className="mt-auto bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Rent Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RentalItemCard;
