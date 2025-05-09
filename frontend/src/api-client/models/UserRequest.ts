/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Balance } from './Balance';
import type { Faculty } from './Faculty';
import type { Image } from './Image';
import type { University } from './University';
/**
 * The User to be patched
 */
export type UserRequest = {
    /**
     * Unique identifier for the user
     */
    id: number;
    /**
     * User's unique username in the system
     */
    userName?: string;
    /**
     * User's email address for login and notifications
     */
    email?: string;
    /**
     * User's first name, supports Hungarian characters
     */
    firstName?: string;
    /**
     * User's last name, supports Hungarian characters
     */
    lastName?: string;
    /**
     * Average rating of the user based on past transactions
     */
    ratings?: number;
    /**
     * User's description or bio
     */
    description?: string;
    balance?: Balance;
    university?: University;
    faculty?: Faculty;
    role?: UserRequest.role;
    image?: Image;
    /**
     * Password for the user, for local login or for new password
     */
    password?: string;
};
export namespace UserRequest {
    export enum role {
        ADMIN = 'ADMIN',
        STUDENT = 'STUDENT',
        GUEST = 'GUEST',
        COORDINATOR = 'COORDINATOR',
    }
}

