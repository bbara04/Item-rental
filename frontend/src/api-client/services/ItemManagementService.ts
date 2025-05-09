/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorModel } from '../models/ErrorModel';
import type { Item } from '../models/Item';
import type { ItemRequest } from '../models/ItemRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ItemManagementService {
    /**
     * Get the item with the given id
     * @returns Item The item object with the given id
     * @returns ErrorModel Basic Error Response
     * @throws ApiError
     */
    public static getItemsById({
        id,
    }: {
        /**
         * Identifier of the Item
         */
        id: string,
    }): CancelablePromise<Item | ErrorModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/items/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Delete item by Id
     * @returns ErrorModel Basic Error Response
     * @throws ApiError
     */
    public static deleteItemById({
        id,
    }: {
        /**
         * Identifier of the User
         */
        id: string,
    }): CancelablePromise<ErrorModel> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/items/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update the data of the id's item
     * @returns Item User found, operation successfully commited
     * @returns ErrorModel Basic Error Response
     * @throws ApiError
     */
    public static updateItemDataById({
        id,
        requestBody,
    }: {
        /**
         * Identifier of the Item
         */
        id: string,
        requestBody: ItemRequest,
    }): CancelablePromise<Item | ErrorModel> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/items/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json;charset=utf-8',
        });
    }
    /**
     * Get all items with the given category
     * @returns Item List of all items with the given category
     * @returns ErrorModel Basic Error Response
     * @throws ApiError
     */
    public static getItemsByCategory({
        categoryId,
    }: {
        /**
         * Category of the item for filtering
         */
        categoryId: string,
    }): CancelablePromise<Array<Item> | ErrorModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/items/by-category',
            query: {
                'categoryId': categoryId,
            },
        });
    }
    /**
     * Get all items
     * @returns Item List of all items
     * @returns ErrorModel Basic Error Response
     * @throws ApiError
     */
    public static getAllItems(): CancelablePromise<Array<Item> | ErrorModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/items/all',
        });
    }
}
