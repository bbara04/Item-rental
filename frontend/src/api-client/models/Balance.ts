/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Represents the financial balance of a user
 */
export type Balance = {
    /**
     * Unique identifier for the balance record
     */
    id?: number;
    /**
     * Unique identifier for owner of the balance
     */
    userID?: number;
    /**
     * Current balance amount in the system's currency
     */
    currentValue: number;
    /**
     * Current balance's currency
     */
    unit: string;
    /**
     * Type of payment method
     */
    payType?: string;
};

