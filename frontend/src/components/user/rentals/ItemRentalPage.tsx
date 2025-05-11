import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItemsById, Item } from "../../../client";

const ItemRentalPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [rentalDays, setRentalDays] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    async function fetchItem() {
      if (!itemId) {
        setError("Item id is not provided");
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await getItemsById({
        path: {
          id: itemId,
        }
      });
      if (error) {
        setError(String(error));
      } else {
        setItem(data);
      }
      setLoading(false);
    }
    fetchItem();
  }, [itemId]);

  const handleRentalDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setRentalDays(value);
    }
  };

  const handleRent = () => {
    setSuccess(true);
    setTimeout(() => {
      navigate("/my-rentals");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-gray-600">Loading item details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-red-600">Item not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 text-center">
          <span className="block sm:inline">
            Item rented successfully! Redirecting to your rentals...
          </span>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={item.image && item.image.imageData && item.image.contentType ? `data:${item.image.contentType};base64,${item.image.imageData}` : "https://placehold.co/600x400"}
              alt={item.image?.fileName ?? item.name ?? "Item image"}
              className="w-full h-auto object-contain max-h-[600px]"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{item.name}</h1>
              <div className="flex items-center mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-2">
                  {item.categories}
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {item.availability} available
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-4">
                ${item.costPerDay} / day
              </div>
              <p className="text-gray-600 mb-8">{item.description}</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-xl font-semibold mb-4">Rent this item</h2>
              <div className="mb-4">
                <label htmlFor="rentalDays" className="block text-gray-700 mb-2">
                  Number of days:
                </label>
                <input
                  type="number"
                  id="rentalDays"
                  min="1"
                  value={rentalDays}
                  onChange={handleRentalDaysChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-700">
                  <span className="font-semibold">Total cost:</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  ${(item.costPerDay * rentalDays)}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate("/")}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                >
                  Back to items
                </button>
                <button
                  onClick={handleRent}
                  disabled={success}
                  className={`px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-500 transition-colors ${
                    success ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Rent Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Rental Terms</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>A valid ID is required for all rentals</li>
            <li>Full payment is due at the time of rental</li>
            <li>Late returns incur a fee of 20% of the daily rate per day</li>
            <li>The renter is responsible for any damage to the item</li>
            <li>Cancellations must be made at least 24 hours in advance for a full refund</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemRentalPage;