import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../../AppContextProvider";
import { createUserTransaction, getItemsById, Item } from "../../../client";

const ItemRentalPage: React.FC = () => {
  const { user } = useAppContext();
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Added quantity state
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

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const newStartDate = new Date(dateValue);
      setStartDate(newStartDate);
      if (endDate && newStartDate > endDate) {
        setEndDate(null); // Reset end date if it's before the new start date
      }
    } else {
      setStartDate(null);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const newEndDate = new Date(dateValue);
      setEndDate(newEndDate);
      if (startDate && newEndDate < startDate) {
        setStartDate(null); // Reset start date if it's after the new end date
      }
    } else {
      setEndDate(null);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) {
      value = 1;
    }
    if (item && value > item.availability) {
      value = item.availability;
    }
    if (value < 1) {
      value = 1;
    }
    setQuantity(value);
  };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    if (typeof input.showPicker === 'function') {
      try {
        input.showPicker();
      } catch (e) {
        console.error("Could not display date picker:", e);
      }
    }
  };

  const handleRent = async () => {
    if (startDate && endDate && item && user && user.id) {
      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();
      const {data, error} = await createUserTransaction({
        path: {
          id: user.id.toString(),
        },
        body: {
          itemId: item.id.toString(),
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          numberOfItems: quantity,
          userId: user.id.toString(),
        }
      })
      if (error) {
        setError(String(error));
        return;
      }
      if (!data) {
        setError("No data returned from API");
        return;
      }
      setSuccess(true);

      setTimeout(() => {
        navigate("/my-rentals");
      }, 2000);
    } else {
      // Handle case where dates are not selected, perhaps show an error
      setError("Please select both a start and end date.");
    }
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
                <label htmlFor="startDate" className="block text-gray-700 mb-2">
                  Start Date:
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate ? startDate.toISOString().split("T")[0] : ""}
                  onChange={handleStartDateChange}
                  onClick={handleInputClick} // Added onClick handler
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
                />
              </div>
              <div className="mb-4">
                <label htmlFor="endDate" className="block text-gray-700 mb-2">
                  End Date:
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate ? endDate.toISOString().split("T")[0] : ""}
                  onChange={handleEndDateChange}
                  onClick={handleInputClick} // Added onClick handler
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  min={startDate ? startDate.toISOString().split("T")[0] : new Date().toISOString().split("T")[0]} // Prevent selecting dates before start date or past dates
                />
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-gray-700 mb-2">
                  Quantity (Available: {item.availability}):
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  min="1"
                  max={item.availability}
                  disabled={item.availability === 0} // Disable if no items are available
                />
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
                  disabled={success || item.availability === 0 || !startDate || !endDate} // Also disable if no items or dates not selected
                  className={`px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-500 transition-colors ${
                    success || item.availability === 0 || !startDate || !endDate
                      ? "opacity-50 cursor-not-allowed"
                      : ""
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