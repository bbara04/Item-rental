import { Item } from './Item';
import { User } from './User';

export interface RentingTransaction {
    id: number;
    transactionType: string | null;
    status: string | null;
    rentedItem: Item; // Assuming Item DTO exists
    renterUser: User; // Assuming AppUser DTO exists
    startDateTime: string | null; // Representing LocalDateTime as string
    endDateTime: string | null; // Representing LocalDateTime as string
    remainingDays: number | null;
    costPerDay: number | null;
    curCost: number | null;
    createdAt: string; // Representing LocalDateTime as string
    updatedAt: string; // Representing LocalDateTime as string
}
