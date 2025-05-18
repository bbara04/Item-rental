import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../AppContextProvider";
import { getAllUserTransactionsByUserId, TransactionResponse } from "../../../client";
import UserRentalItemCard from "./UserRentalItemCard";

function isTransactionActive(transaction: TransactionResponse): boolean {
  return transaction.status === "APPROVED" || transaction.status === "PENDING";
};

function isTransactionOverdue(transaction: TransactionResponse): boolean {
  return transaction.status === "OVERDUE";
};

function isTransactionPending(transaction: TransactionResponse): boolean {
  return transaction.status === "STARTED";
};

function isTransactionOld(transaction: TransactionResponse): boolean {
  return transaction.status === "ARCHIVED" || transaction.status === "DECLINED";
};

const UserRentalsPage: React.FC = () => {
  const { user, baseColor } = useAppContext();
  const style = { '--user-bg-color': baseColor } as React.CSSProperties;
  const [activeTransactions, setActiveTransactions] = useState<TransactionResponse[]>([]);
  const [overdueTransactions, setOverdueTransactions] = useState<TransactionResponse[]>([]);
  const [pendingTransactions, setPendingTransactions] = useState<TransactionResponse[]>([]);
  const [oldTransactions, setOldTransactions] = useState<TransactionResponse[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (user?.id) {
        const { data, error } = await getAllUserTransactionsByUserId({
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
        const pending = data.filter(isTransactionPending);
        const old = data.filter(isTransactionOld);
        setActiveTransactions(active);
        setOverdueTransactions(overdue);
        setPendingTransactions(pending);
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
          <span 
            className="inline-block w-2 h-8 bg-[var(--user-bg-color)] rounded-full mr-2"
            style={style}
          ></span>
          My Rentals
        </h1>
        <button className="bg-[var(--user-bg-color)] text-white px-4 py-2 rounded-lg flex items-center shadow transition duration-200 ease-in-out"
            style={style}
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

      {/* Pending Rentals Section */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-2 h-6 bg-yellow-500 rounded-full"></span>
          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Pending Rentals</h2>
        </div>
        {pendingTransactions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pendingTransactions.map((item) => (
              <UserRentalItemCard key={`${item.id}-pending`} itemTransaction={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center">You have no pending rentals.</p>
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
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-2 h-6 bg-slate-500 rounded-full"></span>
          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Rental History</h2>
        </div>
        {oldTransactions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {oldTransactions.map((item) => (
              <UserRentalItemCard key={`${item.id}-old`} itemTransaction={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center">You have no history of renting.</p>
        )}
      </section>
    </div>
  );
};

export default UserRentalsPage;
