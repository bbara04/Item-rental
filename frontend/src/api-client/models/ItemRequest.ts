/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Image } from './Image';
/**
 * The CustomerBalance to be created
 */
export type ItemRequest = {
    /**
     * Unique identifier for the item
     */
    id: number;
    /**
     * Item's name in the system
     */
    name?: string;
    /**
     * Item's description in the system
     */
    description?: string;
    /**
     * Item's categories, which is helpful for filtering
     */
    categories?: Array<string>;
    /**
     * A rating value between 0.0 and 5.0
     */
    costPerDay?: number;
    /**
     * Number of available items
     */
    availability?: number;
    image?: Image;
};

