/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { University } from './University';
/**
 * Represents a faculty within a university
 */
export type Faculty = {
    /**
     * Unique identifier for the faculty
     */
    id?: number;
    /**
     * Name of the faculty
     */
    name: string;
    /**
     * Code of the faculty
     */
    code: string;
    /**
     * Description of the university
     */
    description?: string;
    university?: University;
};

