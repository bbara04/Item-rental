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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Active Rentals</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center active:bg-blue-400 hover:bg-blue-500 transition duration-200 ease-in-out"
            onClick={() => window.location.href = '/'}>
          <span className="mr-1">+</span> New Rental
        </button>
      </div>

      <section className="mb-10">
        {activeTransactions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeTransactions.map((item) => (
              <UserRentalItemCard key={`${item.id}-active`} itemTransaction={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You have no active rentals.</p>
        )}
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6">Overdue Rentals</h2>
        {overdueTransactions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {overdueTransactions.map((item) => (
              <UserRentalItemCard key={`${item.id}-overdue`} itemTransaction={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You have no overdue rentals.</p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Rental History</h2>
        
        {oldTransactions.length > 0 ? (
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
                {oldTransactions.filter(t => t.status === "ARCHIVED").map((itemTransaction) => (
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
