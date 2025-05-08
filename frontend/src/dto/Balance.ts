export interface Balance {
    id: number;
    curValue: number | null;
    unit: string | null;
    payType: string | null;
    createdAt: string; // Representing LocalDateTime as string
    updatedAt: string; // Representing LocalDateTime as string
}
