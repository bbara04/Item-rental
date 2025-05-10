/* eslint-disable @typescript-eslint/no-unused-vars */
import { differenceInDays, parseISO } from 'date-fns'; // Assuming date-fns is available or installable
import React from "react";
import { PreviewRentalItem } from "../../dto/PreviewRentalItem";

// Define a type for the augmented rental item data used on the UserRentalsPage
export type UserRentalItemDetails = PreviewRentalItem & {
    rentalStartDate?: string; // Make optional as not needed for active card per image
    rentalEndDate: string; // Keep as string (ISO format preferred for parsing)
    status: "Active" | "Returned" | "Completed"; // Use specific statuses
    totalCost?: number; // For history
};

interface UserRentalItemCardProps {
    item: UserRentalItemDetails;
}

// Helper function to calculate remaining days (ensure rentalEndDate is a valid date string)
const getRemainingDays = (endDate: string): number | null => {
    try {
        // Let's assume the date is in a format parseISO can handle, like YYYY-MM-DD
        // Or adjust parsing based on the actual format
        const due = parseISO(endDate); // Or new Date(endDate) if format is compatible
        const now = new Date(); // Use current date for calculation
        // Ensure we only show positive remaining days
        const days = differenceInDays(due, now);
        return days > 0 ? days : 0;
    } catch (e) {
        console.error("Error parsing date:", e);
        return null; // Return null or some indicator of error
    }
};


const UserRentalItemCard: React.FC<UserRentalItemCardProps> = ({ item }) => {
    // Only render if status is Active for this card component based on the image context
    if (item.status !== "Active") {
        return null; // Or handle other statuses differently if needed elsewhere
    }

    const remainingDays = getRemainingDays(item.rentalEndDate);
    // Format the due date string for display (e.g., "May 6, 2025")
    // This requires knowing the format of item.rentalEndDate or using a date library robustly
    let formattedDueDate = item.rentalEndDate; // Placeholder
    try {
        formattedDueDate = new Date(item.rentalEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) { /* ignore potential parsing error, use original string */ }


    return (
        // Adjusted card structure based on the image
        <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm">
            <div className="relative h-48 w-full"> {/* Container for image and badge */}
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover" // Cover the area
                />
                <span className="absolute bottom-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {item.status}
                </span>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price}/day</p>
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
