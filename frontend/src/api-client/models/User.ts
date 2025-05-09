/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Balance } from './Balance';
import type { Faculty } from './Faculty';
import type { Image } from './Image';
import type { University } from './University';
/**
 * Represents a user in the system with all their profile information
 */
export type User = {
    /**
     * Unique identifier for the user
     */
    id?: number;
    /**
     * User's unique username in the system
     */
    userName: string;
    /**
     * User's email address for login and notifications
     */
    email: string;
    /**
     * User's first name, supports Hungarian characters
     */
    firstName: string;
    /**
     * User's last name, supports Hungarian characters
     */
    lastName: string;
    /**
     * Hashed password (typically not returned in responses)
     */
    passwordHash?: string;
    loginType?: User.loginType;
    /**
     * Average rating of the user based on past transactions
     */
    ratings?: number;
    /**
     * User's description or bio
     */
    description?: string;
    balance?: Balance;
    university: University;
    faculty: Faculty;
    role: User.role;
    image?: Image;
};
export namespace User {
    export enum loginType {
        LOCAL = 'LOCAL',
        GOOGLE = 'GOOGLE',
        FACEBOOK = 'FACEBOOK',
    }
    export enum role {
        ADMIN = 'ADMIN',
        STUDENT = 'STUDENT',
        GUEST = 'GUEST',
        COORDINATOR = 'COORDINATOR',
    }
}

