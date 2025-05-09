/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Image } from './Image';
/**
 * Represents a university institution
 */
export type University = {
    /**
     * Unique identifier for the university
     */
    id?: number;
    /**
     * Name of the university
     */
    name: string;
    /**
     * Address of the university
     */
    address?: string;
    /**
     * Description of the university
     */
    description?: string;
    /**
     * Website of the university
     */
    website?: string;
    image?: Image;
};

