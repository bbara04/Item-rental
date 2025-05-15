import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../AppContextProvider";
import { getAllUserTransactions, TransactionResponse } from "../../../client";
import UserRentalItemCard from "./UserRentalItemCard";

function isTransactionActive(transaction: TransactionResponse): boolean {
  return transaction.status === "APPROVED" || transaction.status === "PENDING";
};

function isTransactionOverdue(transaction: TransactionResponse): boolean {
  return transaction.status === "OVERDUE";
};

function isTransactionOld(transaction: TransactionResponse): boolean {
  return transaction.status === "ARCHIVED" || transaction.status === "DECLINED";
};

const UserRentalsPage: React.FC = () => {
  const { user } = useAppContext();
  const [activeTransactions, setActiveTransactions] = useState<TransactionResponse[]>([]);
  const [overdueTransactions, setOverdueTransactions] = useState<TransactionResponse[]>([]);
  const [oldTransactions, setOldTransactions] = useState<TransactionResponse[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (user?.id) {
        const { data, error } = await getAllUserTransactions({
          path: {
            id: user.id.toString()
          }
        });
        if (error) {
          console.error("Error fetching transactions:", error);
          return;
        }
        if (!data) {
          console.error("No data returned from API");
          return;
        }
        const active = data.filter(isTransactionActive);
        const overdue = data.filter(isTransactionOverdue);
        const old = data.filter(isTransactionOld);
        setActiveTransactions(active);
        setOverdueTransactions(overdue);
        setOldTransactions(old);
      } else {
        console.log("user's id is undefined");
      }
    }
    fetchTransactions();
  }, [user]);

  if (user == undefined) {
    console.log("User is not set.");
    return <p>Loading...</p>;
  }


  return (
    <div className="max-w-screen-lg mx-auto px-2 sm:px-4 py-4 md:py-8 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
          <span className="inline-block w-2 h-8 bg-blue-500 rounded-full mr-2"></span>
          My Rentals
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow hover:bg-blue-700 active:bg-blue-500 transition duration-200 ease-in-out"
            onClick={() => window.location.href = '/'}>
          <span className="mr-1 text-lg font-bold">+</span> New Rental
        </button>
      </div>

      {/* Active Rentals Section */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-2 h-6 bg-green-500 rounded-full"></span>
          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Active Rentals</h2>
        </div>
        {activeTransactions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeTransactions.map((item) => (
              <UserRentalItemCard key={`${item.id}-active`} itemTransaction={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center">You have no active rentals.</p>
        )}
      </section>

      {/* Overdue Rentals Section */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-2 h-6 bg-red-500 rounded-full"></span>
          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Overdue Rentals</h2>
        </div>
        {overdueTransactions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {overdueTransactions.map((item) => (
              <UserRentalItemCard key={`${item.id}-overdue`} itemTransaction={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center">You have no overdue rentals.</p>
        )}
      </section>

      {/* Rental History Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-2 h-6 bg-gray-400 rounded-full"></span>
          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Rental History</h2>
        </div>
        {oldTransactions.length > 0 ? (
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white rounded-lg shadow text-sm md:text-base">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3 px-2 md:px-4">Device</th>
                  <th className="py-3 px-2 md:px-4">Status</th>
                  <th className="py-3 px-2 md:px-4">Period</th>
                  <th className="py-3 px-2 md:px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {oldTransactions.filter(t => t.status === "ARCHIVED").map((itemTransaction) => (
                  <tr key={itemTransaction.id} className="border-b">
                    <td className="py-3 px-2 md:px-4">{itemTransaction.item.name}</td>
                    <td className="py-3 px-2 md:px-4">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                        {itemTransaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 md:px-4">{itemTransaction.startDate} - {itemTransaction.endDate}</td>
                    <td className="py-3 px-2 md:px-4 text-right">${itemTransaction.item.costPerDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic text-center">You have no rental history.</p>
        )}
      </section>
    </div>
  );
};

export default UserRentalsPage;
