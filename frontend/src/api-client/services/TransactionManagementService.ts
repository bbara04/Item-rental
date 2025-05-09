/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorModel } from '../models/ErrorModel';
import type { TransactionRequest } from '../models/TransactionRequest';
import type { TransactionResponse } from '../models/TransactionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TransactionManagementService {
    /**
     * Get all renting transactions of the user
     * @returns TransactionResponse List of all user's renting transactions
     * @returns ErrorModel Basic Error Response
     * @throws ApiError
     */
    public static getAllUserTransactions({
        id,
    }: {
        /**
         * Identifier of the User
         */
        id: string,
    }): CancelablePromise<Array<TransactionResponse> | ErrorModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{id}/renting-transactions',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Create renting transaction
     * @returns TransactionResponse User found, operation successfully commited
     * @returns ErrorModel Basic Error Response
     * @throws ApiError
     */
    public static createUserTransaction({
        id,
        requestBody,
    }: {
        /**
         * Identifier of the User
         */
        id: string,
        requestBody: TransactionRequest,
    }): CancelablePromise<TransactionResponse | ErrorModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/{id}/renting-transactions',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json;charset=utf-8',
        });
    }
    /**
     * Delete the id's transaction, useful for update the status of transaction
     * @returns ErrorModel Basic Error Response
     * @throws ApiError
     */
    public static deleteUserTransaction({
        id,
        transactionId,
    }: {
        /**
         * Identifier of the User
         */
        id: string,
        /**
         * Identifier of the Transaction
         */
        transactionId: string,
    }): CancelablePromise<ErrorModel> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/{id}/renting-transactions',
            path: {
                'id': id,
            },
            query: {
                'transactionId': transactionId,
            },
        });
    }
    /**
     * Update the id's transaction, useful for update the status of transaction
     * @returns TransactionResponse Item found, operation successfully commited
     * @returns ErrorModel Basic Error Response
     * @throws ApiError
     */
    public static updateUserTransaction({
        id,
        transactionId,
        requestBody,
    }: {
        /**
         * Identifier of the User
         */
        id: string,
        /**
         * Identifier of the Transaction
         */
        transactionId: string,
        requestBody: TransactionRequest,
    }): CancelablePromise<TransactionResponse | ErrorModel> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/user/{id}/renting-transactions',
            path: {
                'id': id,
            },
            query: {
                'transactionId': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json;charset=utf-8',
        });
    }
}
