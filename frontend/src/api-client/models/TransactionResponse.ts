/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from './Item';
import type { User } from './User';
/**
 * Represents a transaction request for a renting process
 */
export type TransactionResponse = {
    /**
     * Unique identifier for the transaction
     */
    id: number;
    item: Item;
    /**
     * Item's requested number
     */
    numberOfItem: number;
    status: TransactionResponse.status;
    user: User;
    startDate: string;
    endDate: string;
};
export namespace TransactionResponse {
    export enum status {
        STARTED = 'STARTED',
        PENDING = 'PENDING',
        APPROVED = 'APPROVED',
        DECLINED = 'DECLINED',
        ARCHIVED = 'ARCHIVED',
        DELETED = 'DELETED',
        OVERDUE = 'OVERDUE',
    }
}

