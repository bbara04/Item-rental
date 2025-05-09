/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorModel } from '../models/ErrorModel';
import type { LoginRequest } from '../models/LoginRequest';
import type { User } from '../models/User';
import type { UserRequest } from '../models/UserRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Register a new user with Google authentication
     * @returns ErrorModel Basic Error Response
     * @returns User User created successfully
     * @throws ApiError
     */
    public static registerByGoogle({
        requestBody,
    }: {
        requestBody: UserRequest,
    }): CancelablePromise<ErrorModel | User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/google/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - invalid input parameters`,
                409: `Conflict - user already exists or registration failed`,
            },
        });
    }
    /**
     * Login with Google authentication
     * @returns User Login successful
     * @throws ApiError
     */
    public static loginByGoogle({
        requestBody,
    }: {
        requestBody: LoginRequest,
    }): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/google/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - invalid input parameters`,
                401: `Unauthorized - invalid credentials`,
            },
        });
    }
    /**
     * Register a new user with basic authentication
     * @returns ErrorModel Basic Error Response
     * @returns User User created successfully
     * @throws ApiError
     */
    public static registerByBasic({
        requestBody,
    }: {
        requestBody: User,
    }): CancelablePromise<ErrorModel | User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/basic/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - invalid input parameters`,
                409: `Conflict - user already exists or registration failed`,
            },
        });
    }
    /**
     * Login with basic authentication
     * @returns User Login successful
     * @returns ErrorModel Basic Error Response
     * @throws ApiError
     */
    public static loginByBasic({
        requestBody,
    }: {
        requestBody: LoginRequest,
    }): CancelablePromise<User | ErrorModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/basic/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - invalid input parameters`,
                401: `Unauthorized - invalid credentials`,
            },
        });
    }
}
