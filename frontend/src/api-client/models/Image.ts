/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Represents an image in the system
 */
export type Image = {
    /**
     * Unique identifier for the image
     */
    id: number;
    /**
     * Binary representation of the image encoded as base64 string
     */
    imageData: string;
    /**
     * MIME type of the image
     */
    contentType: string;
    /**
     * Original filename of the image
     */
    fileName?: string;
    /**
     * Type of entity this image belongs to
     */
    entityType?: string;
    /**
     * ID of the entity this image is associated with
     */
    entityId?: number;
};

