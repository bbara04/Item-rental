/* eslint-disable @typescript-eslint/no-unused-vars */
import { differenceInDays, parseISO } from 'date-fns'; // Assuming date-fns is available or installable
import React from "react";
import { TransactionResponse } from '../../../client';

interface UserRentalItemCardProps {
    itemTransaction: TransactionResponse;
}

const getRemainingDays = (endDate: string): number | null => {
    try {
        const due = parseISO(endDate);
        const now = new Date();
        const days = differenceInDays(due, now);
        return days > 0 ? days : 0;
    } catch (e) {
        console.error("Error parsing date:", e);
        return null;
    }
};


const UserRentalItemCard: React.FC<UserRentalItemCardProps> = ({ itemTransaction }) => {
    if (["DECLINED", "PENDING", "DELETED", "ARCHIVED"].includes(itemTransaction.status)) {
        return null; 
    }

    const remainingDays = getRemainingDays(itemTransaction.endDate);
    let formattedDueDate = itemTransaction.endDate;
    try {
        formattedDueDate = new Date(itemTransaction.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) { /* ignore potential parsing error, use original string */ }


    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm">
            <div className="relative h-48 w-full">
                <img
                    src={itemTransaction.item.image && itemTransaction.item.image.imageData && itemTransaction.item.image.contentType ? `data:${itemTransaction.item.image.contentType};base64,${itemTransaction.item.image.imageData}` : "https://placehold.co/600x400"}
                    alt={itemTransaction.item.image?.fileName ?? itemTransaction.item.name ?? "Item image"}
                    className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {itemTransaction.status}
                </span>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{itemTransaction.item.name}</h3>
                    <p className="text-sm text-gray-600">${itemTransaction.item.costPerDay}/day</p>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                     <p>
                        <span role="img" aria-label="calendar">🗓️</span> Due: {formattedDueDate}
                    </p>
                    {remainingDays !== null && (
                        <p>
                           <span role="img" aria-label="clock">⏰</span> {remainingDays} days remaining
                        </p>
                    )}
                </div>
                 {/* Removed Rented date and original status/due date lines */}
            </div>
        </div>
    );
};

export default UserRentalItemCard;
