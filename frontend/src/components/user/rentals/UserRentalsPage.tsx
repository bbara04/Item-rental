import React from "react";
import { TransactionResponse } from "../../../client";
import UserRentalItemCard from "./UserRentalItemCard";

// Simulate active rentals using ExampleData
// In a real app, this data would come from an API based on the logged-in user
const activeRentals: TransactionResponse[] = [{
  id: 1,
  item: {
    id: 101,
    name: "MacBook Pro 16",
    description: "Powerful laptop for all your creative needs. Features a stunning 16-inch Retina display.",
    categories: ["Electronics", "Computers", "Laptops"],
    facultiesId: ["F001"], // Example faculty ID
    costPerDay: 89, // This was already here as 'price', aligning with Item type
    availability: 5,
    image: {
      id: 201,
      imageData: "base64_encoded_image_data_placeholder", // Placeholder for actual base64 image data
      contentType: "image/jpeg",
      fileName: "macbook_pro_16.jpg"
    }
  },
  numberOfItem: 1, // added numberOfItem property
  status: "STARTED",
  user: { // Added User mock data
    id: 123,
    userName: "testuser",
    email: "testuser@example.com",
    firstName: "Test",
    lastName: "User",
    role: "STUDENT",
    university: {
      id: 1,
      name: "Test University",
    },
    faculty: {
      id: 1,
      name: "Test Faculty",
      code: "TF"
    }
  },
  startDate: "2025-04-15",
  endDate: "2025-05-06"
}];

// Simulate rental history
const rentalHistory: TransactionResponse[] = [{
  id: 1,
  item: {
    id: 101,
    name: "MacBook Pro 16",
    description: "Powerful laptop for all your creative needs. Features a stunning 16-inch Retina display.",
    categories: ["Electronics", "Computers", "Laptops"],
    facultiesId: ["F001"],
    costPerDay: 89, 
    availability: 5,
    image: {
      id: 201,
      imageData: "base64_encoded_image_data_placeholder",
      contentType: "image/jpeg",
      fileName: "macbook_pro_16.jpg"
    }
  },
  numberOfItem: 1, // added numberOfItem property
  status: "ARCHIVED",
  user: { // Added User mock data
    id: 123,
    userName: "testuser",
    email: "testuser@example.com",
    firstName: "Test",
    lastName: "User",
    role: "STUDENT",
    university: {
      id: 1,
      name: "Test University",
    },
    faculty: {
      id: 1,
      name: "Test Faculty",
      code: "TF"
    }
  },
  startDate: "2025-04-15",
  endDate: "2025-05-06"
}];

const UserRentalsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Active Rentals</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center active:bg-blue-400 hover:bg-blue-500 transition duration-200 ease-in-out"
            onClick={() => window.location.href = '/'}>
          <span className="mr-1">+</span> New Rental
        </button>
      </div>

      <section className="mb-10">
        {activeRentals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeRentals.map((item) => (
              <UserRentalItemCard key={`${item.id}-active`} itemTransaction={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You have no active rentals.</p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Rental History</h2>
        
        {rentalHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3 px-4">Device</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Period</th>
                  <th className="py-3 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {rentalHistory.map((itemTransaction) => (
                  <tr key={itemTransaction.id} className="border-b">
                    <td className="py-3 px-4">{itemTransaction.item.name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                        {itemTransaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{itemTransaction.startDate} - {itemTransaction.endDate}</td>
                    <td className="py-3 px-4 text-right">${itemTransaction.item.costPerDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">You have no rental history.</p>
        )}
      </section>
    </div>
  );
};

export default UserRentalsPage;
