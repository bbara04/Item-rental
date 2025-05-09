/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The Transaction to be updated
 */
export type TransactionRequest = {
    /**
     * Unique identifier for the transaction
     */
    id?: number;
    /**
     * Unique identifier for the item of the transaction
     */
    itemId: string;
    /**
     * Unique identifier for the user of the transaction
     */
    userId: string;
    /**
     * Item's requested number
     */
    numberOfItem: number;
    startDate: string;
    endDate: string;
};

