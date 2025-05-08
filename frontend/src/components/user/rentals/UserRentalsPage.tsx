import React from "react";
import { ExampleData } from "../../../dto/ExampleData";
import UserRentalItemCard, { UserRentalItemDetails } from "./UserRentalItemCard";

// Simulate active rentals using ExampleData
// In a real app, this data would come from an API based on the logged-in user
const activeRentals: UserRentalItemDetails[] = ExampleData.exampleRentalItems.slice(0, 1).map(item => ({
  ...item,
  name: "MacBook Pro 16\"", // Hardcode the name to match the image
  price: 89, // $89/day as shown in image
  rentalStartDate: "2025-04-15",
  rentalEndDate: "2025-05-06", // Due date as shown in image: May 6, 2025
  status: "Active"
}));

// Simulate rental history
const rentalHistory = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    status: "Completed",
    period: "Mar 15 - Apr 2",
    total: 245.00
  }
];

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
              <UserRentalItemCard key={`${item.id}-active`} item={item} />
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
                {rentalHistory.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.period}</td>
                    <td className="py-3 px-4 text-right">${item.total.toFixed(2)}</td>
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
