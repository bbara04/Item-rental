/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * ### Általános hiba leíró *** Minden hiba esetén ezt az általános hiba osztályt adja vissza az API. Például:   `HTTP/1.1 500 Bad Request`   `Content-Type: application/problem+json`   ```json   {     ...     'error' : {     'status' : '400-012',     'title' : 'Bad Request',     'detail': 'A name paraméter érvénytelen értéket tartalmaz'     }     ...                 }   ```
 */
export type ErrorModel = {
    /**
     * The HTTP Status code returned by the service or its extended version. Pl.:   * 400     : Bad Request   * 400-012 : Specific error
     */
    status: string;
    title: string;
    detail: string;
};

