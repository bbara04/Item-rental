/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorModel } from '../models/ErrorModel';
import type { User } from '../models/User';
import type { UserRequest } from '../models/UserRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserManagementService {
    /**
     * Get the id's userdata
     * @returns User User found
     * @returns ErrorModel Basic Error Response
     * @throws ApiError
     */
    public static getUserdataById({
        id,
    }: {
        /**
         * Identifier of the User
         */
        id: string,
    }): CancelablePromise<User | ErrorModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Delete user by Id
     * @returns ErrorModel Basic Error Response
     * @throws ApiError
     */
    public static deleteUserById({
        id,
    }: {
        /**
         * Identifier of the User
         */
        id: string,
    }): CancelablePromise<ErrorModel> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update the id's userdata
     * @returns User User found, operation successfully commited
     * @returns ErrorModel Basic Error Response
     * @throws ApiError
     */
    public static updateUserdataById({
        id,
        requestBody,
    }: {
        /**
         * Identifier of the User
         */
        id: string,
        requestBody: UserRequest,
    }): CancelablePromise<User | ErrorModel> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json;charset=utf-8',
        });
    }
    /**
     * Find a user by email
     * @returns User User found
     * @returns ErrorModel Basic Error Response
     * @throws ApiError
     */
    public static findByEmail({
        email,
    }: {
        /**
         * Email address of the user to find
         */
        email: string,
    }): CancelablePromise<User | ErrorModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/by-email',
            query: {
                'email': email,
            },
        });
    }
    /**
     * Get all user
     * @returns User List of all users
     * @returns ErrorModel Basic Error Response
     * @throws ApiError
     */
    public static getAllUser(): CancelablePromise<Array<User> | ErrorModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/all',
        });
    }
}
