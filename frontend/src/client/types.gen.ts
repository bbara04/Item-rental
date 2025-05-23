// This file is auto-generated by @hey-api/openapi-ts

/**
 * Represents the financial balance of a user
 */
export type Balance = {
    /**
     * Unique identifier for the balance record
     */
    id?: number;
    /**
     * Unique identifier for owner of the balance
     */
    userID?: number;
    /**
     * Current balance amount in the system's currency
     */
    currentValue: number;
    /**
     * Current balance's currency
     */
    unit: string;
    /**
     * Type of payment method
     */
    payType?: string;
};

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

/**
 * Represents an item in the system with all their information
 */
export type Item = {
    /**
     * Unique identifier for the item
     */
    id: number;
    /**
     * Item's name in the system
     */
    name: string;
    /**
     * Item's description in the system
     */
    description: string;
    /**
     * Item's categories, which is helpful for filtering
     */
    categories?: Array<string>;
    /**
     * Item's faculties with id, which is helpful for filtering
     */
    facultiesId?: Array<string>;
    /**
     * A rating value between 0.0 and 5.0
     */
    costPerDay: number;
    /**
     * Number of available items
     */
    availability: number;
    image: Image;
};

/**
 * Represents a transaction request for a renting process
 */
export type TransactionResponse = {
    /**
     * Unique identifier for the transaction
     */
    id: number;
    item: Item;
    /**
     * Item's requested number
     */
    numberOfItems: number;
    status: 'STARTED' | 'PENDING' | 'APPROVED' | 'DECLINED' | 'ARCHIVED' | 'DELETED' | 'OVERDUE';
    user: User;
    startDate: string;
    endDate: string;
    transactionType?: string;
    costPerDay?: number;
    currentCost?: number;
};

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
    loginType?: 'LOCAL' | 'GOOGLE' | 'FACEBOOK';
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
    role: 'ADMIN' | 'STUDENT' | 'GUEST' | 'COORDINATOR';
    image?: Image;
};

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

/**
 * The Transaction to be updated
 */
export type TransactionRequest = {
    /**
     * Unique identifier for the transaction
     */
    id?: number;
    /**
     * Unique identifier for the item of the transaction
     */
    itemId: string;
    /**
     * Unique identifier for the user of the transaction
     */
    userId: string;
    /**
     * Item's requested number
     */
    numberOfItems: number;
    startDate: string;
    endDate: string;
};

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
    role?: 'ADMIN' | 'STUDENT' | 'GUEST' | 'COORDINATOR';
    image?: Image;
    /**
     * Password for the user, for local login or for new password
     */
    password?: string;
};

export type LoginRequest = {
    email: string;
    passkey: string;
};

/**
 * Transaction patch request
 */
export type TransactionPatch = {
    /**
     * Unique identifier for the transaction
     */
    id: number;
    /**
     * Unique identifier for the item of the transaction
     */
    itemId?: string;
    /**
     * Unique identifier for the user of the transaction
     */
    userId?: string;
    status?: 'STARTED' | 'PENDING' | 'APPROVED' | 'DECLINED' | 'ARCHIVED' | 'DELETED' | 'OVERDUE';
    /**
     * Item's requested number
     */
    numberOfItems?: number;
    startDate?: string;
    endDate?: string;
};

/**
 * The Transaction's status to be patched
 */
export type TransactionStatusPatch = {
    /**
     * Unique identifier for the transaction
     */
    id: number;
    status: 'STARTED' | 'PENDING' | 'APPROVED' | 'DECLINED' | 'ARCHIVED' | 'DELETED' | 'OVERDUE';
};

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
     * Item's faculties with id, which is helpful for filtering
     */
    facultiesId?: Array<string>;
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

/**
 * Response of the Universities endpoint
 */
export type UniversitiesResponse = {
    /**
     * Universities array
     */
    universities: Array<University>;
    /**
     * Faculties array
     */
    faculties: Array<Faculty>;
};

export type DeleteUserTransactionData = {
    body?: never;
    path: {
        /**
         * Identifier of the User
         */
        id: string;
    };
    query: {
        /**
         * Identifier of the Transaction
         */
        transactionId: string;
    };
    url: '/user/{id}/renting-transactions';
};

export type DeleteUserTransactionErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type DeleteUserTransactionError = DeleteUserTransactionErrors[keyof DeleteUserTransactionErrors];

export type DeleteUserTransactionResponses = {
    /**
     * Transaction found, operation successfully commited
     */
    204: void;
};

export type DeleteUserTransactionResponse = DeleteUserTransactionResponses[keyof DeleteUserTransactionResponses];

export type GetAllUserTransactionsData = {
    body?: never;
    path: {
        /**
         * Identifier of the User
         */
        id: string;
    };
    query?: never;
    url: '/user/{id}/renting-transactions';
};

export type GetAllUserTransactionsErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type GetAllUserTransactionsError = GetAllUserTransactionsErrors[keyof GetAllUserTransactionsErrors];

export type GetAllUserTransactionsResponses = {
    /**
     * List of all user's renting transactions
     */
    200: Array<TransactionResponse>;
};

export type GetAllUserTransactionsResponse = GetAllUserTransactionsResponses[keyof GetAllUserTransactionsResponses];

export type UpdateUserTransactionData = {
    body: TransactionRequest;
    path: {
        /**
         * Identifier of the User
         */
        id: string;
    };
    query: {
        /**
         * Identifier of the Transaction
         */
        transactionId: string;
    };
    url: '/user/{id}/renting-transactions';
};

export type UpdateUserTransactionErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type UpdateUserTransactionError = UpdateUserTransactionErrors[keyof UpdateUserTransactionErrors];

export type UpdateUserTransactionResponses = {
    /**
     * Item found, operation successfully commited
     */
    200: TransactionResponse;
};

export type UpdateUserTransactionResponse = UpdateUserTransactionResponses[keyof UpdateUserTransactionResponses];

export type CreateUserTransactionData = {
    body: TransactionRequest;
    path: {
        /**
         * Identifier of the User
         */
        id: string;
    };
    query?: never;
    url: '/user/{id}/renting-transactions';
};

export type CreateUserTransactionErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type CreateUserTransactionError = CreateUserTransactionErrors[keyof CreateUserTransactionErrors];

export type CreateUserTransactionResponses = {
    /**
     * User found, operation successfully commited
     */
    200: TransactionResponse;
};

export type CreateUserTransactionResponse = CreateUserTransactionResponses[keyof CreateUserTransactionResponses];

export type RegisterByGoogleData = {
    body: UserRequest;
    path?: never;
    query?: never;
    url: '/auth/google/register';
};

export type RegisterByGoogleErrors = {
    /**
     * Bad request - invalid input parameters
     */
    400: string;
    /**
     * Conflict - user already exists or registration failed
     */
    409: string;
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type RegisterByGoogleError = RegisterByGoogleErrors[keyof RegisterByGoogleErrors];

export type RegisterByGoogleResponses = {
    /**
     * User created successfully
     */
    201: User;
};

export type RegisterByGoogleResponse = RegisterByGoogleResponses[keyof RegisterByGoogleResponses];

export type LoginByGoogleData = {
    body: LoginRequest;
    path?: never;
    query?: never;
    url: '/auth/google/login';
};

export type LoginByGoogleErrors = {
    /**
     * Bad request - invalid input parameters
     */
    400: string;
    /**
     * Unauthorized - invalid credentials
     */
    401: string;
};

export type LoginByGoogleError = LoginByGoogleErrors[keyof LoginByGoogleErrors];

export type LoginByGoogleResponses = {
    /**
     * Login successful
     */
    200: User;
};

export type LoginByGoogleResponse = LoginByGoogleResponses[keyof LoginByGoogleResponses];

export type RegisterByBasicData = {
    body: User;
    path?: never;
    query?: never;
    url: '/auth/basic/register';
};

export type RegisterByBasicErrors = {
    /**
     * Bad request - invalid input parameters
     */
    400: string;
    /**
     * Conflict - user already exists or registration failed
     */
    409: string;
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type RegisterByBasicError = RegisterByBasicErrors[keyof RegisterByBasicErrors];

export type RegisterByBasicResponses = {
    /**
     * User created successfully
     */
    201: User;
};

export type RegisterByBasicResponse = RegisterByBasicResponses[keyof RegisterByBasicResponses];

export type LoginByBasicData = {
    body: LoginRequest;
    path?: never;
    query?: never;
    url: '/auth/basic/login';
};

export type LoginByBasicErrors = {
    /**
     * Bad request - invalid input parameters
     */
    400: string;
    /**
     * Unauthorized - invalid credentials
     */
    401: string;
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type LoginByBasicError = LoginByBasicErrors[keyof LoginByBasicErrors];

export type LoginByBasicResponses = {
    /**
     * Login successful
     */
    200: User;
};

export type LoginByBasicResponse = LoginByBasicResponses[keyof LoginByBasicResponses];

export type DeleteUserByIdData = {
    body?: never;
    path: {
        /**
         * Identifier of the User
         */
        id: string;
    };
    query?: never;
    url: '/users/{id}';
};

export type DeleteUserByIdErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type DeleteUserByIdError = DeleteUserByIdErrors[keyof DeleteUserByIdErrors];

export type DeleteUserByIdResponses = {
    /**
     * User successfully deleted
     */
    204: void;
};

export type DeleteUserByIdResponse = DeleteUserByIdResponses[keyof DeleteUserByIdResponses];

export type GetUserdataByIdData = {
    body?: never;
    path: {
        /**
         * Identifier of the User
         */
        id: string;
    };
    query?: never;
    url: '/users/{id}';
};

export type GetUserdataByIdErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type GetUserdataByIdError = GetUserdataByIdErrors[keyof GetUserdataByIdErrors];

export type GetUserdataByIdResponses = {
    /**
     * User found
     */
    200: User;
};

export type GetUserdataByIdResponse = GetUserdataByIdResponses[keyof GetUserdataByIdResponses];

export type UpdateUserdataByIdData = {
    body: UserRequest;
    path: {
        /**
         * Identifier of the User
         */
        id: string;
    };
    query?: never;
    url: '/users/{id}';
};

export type UpdateUserdataByIdErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type UpdateUserdataByIdError = UpdateUserdataByIdErrors[keyof UpdateUserdataByIdErrors];

export type UpdateUserdataByIdResponses = {
    /**
     * User found, operation successfully commited
     */
    200: User;
};

export type UpdateUserdataByIdResponse = UpdateUserdataByIdResponses[keyof UpdateUserdataByIdResponses];

export type GetUserTransactionByIdData = {
    body?: never;
    path: {
        /**
         * Identifier of the transaction
         */
        id: string;
    };
    query?: never;
    url: '/transactions/{id}';
};

export type GetUserTransactionByIdErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type GetUserTransactionByIdError = GetUserTransactionByIdErrors[keyof GetUserTransactionByIdErrors];

export type GetUserTransactionByIdResponses = {
    /**
     * Get renting transaction
     */
    200: TransactionResponse;
};

export type GetUserTransactionByIdResponse = GetUserTransactionByIdResponses[keyof GetUserTransactionByIdResponses];

export type PatchTransactionByIdData = {
    body: TransactionPatch;
    path: {
        /**
         * Identifier of the renting transaction
         */
        id: string;
    };
    query?: never;
    url: '/transactions/{id}';
};

export type PatchTransactionByIdErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type PatchTransactionByIdError = PatchTransactionByIdErrors[keyof PatchTransactionByIdErrors];

export type PatchTransactionByIdResponses = {
    /**
     * Transaction found, operation successfully commited
     */
    200: TransactionResponse;
};

export type PatchTransactionByIdResponse = PatchTransactionByIdResponses[keyof PatchTransactionByIdResponses];

export type PatchTransactionStatusByIdData = {
    body: TransactionStatusPatch;
    path: {
        /**
         * Identifier of the User
         */
        id: string;
    };
    query?: never;
    url: '/transactions/{id}/status';
};

export type PatchTransactionStatusByIdErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type PatchTransactionStatusByIdError = PatchTransactionStatusByIdErrors[keyof PatchTransactionStatusByIdErrors];

export type PatchTransactionStatusByIdResponses = {
    /**
     * Transaction found, operation successfully commited
     */
    200: TransactionResponse;
};

export type PatchTransactionStatusByIdResponse = PatchTransactionStatusByIdResponses[keyof PatchTransactionStatusByIdResponses];

export type DeleteItemByIdData = {
    body?: never;
    path: {
        /**
         * Identifier of the User
         */
        id: string;
    };
    query?: never;
    url: '/items/{id}';
};

export type DeleteItemByIdErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type DeleteItemByIdError = DeleteItemByIdErrors[keyof DeleteItemByIdErrors];

export type DeleteItemByIdResponses = {
    /**
     * Item successfully deleted
     */
    204: void;
};

export type DeleteItemByIdResponse = DeleteItemByIdResponses[keyof DeleteItemByIdResponses];

export type GetItemsByIdData = {
    body?: never;
    path: {
        /**
         * Identifier of the Item
         */
        id: string;
    };
    query?: never;
    url: '/items/{id}';
};

export type GetItemsByIdErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type GetItemsByIdError = GetItemsByIdErrors[keyof GetItemsByIdErrors];

export type GetItemsByIdResponses = {
    /**
     * The item object with the given id
     */
    200: Item;
};

export type GetItemsByIdResponse = GetItemsByIdResponses[keyof GetItemsByIdResponses];

export type UpdateItemDataByIdData = {
    body: ItemRequest;
    path: {
        /**
         * Identifier of the Item
         */
        id: string;
    };
    query?: never;
    url: '/items/{id}';
};

export type UpdateItemDataByIdErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type UpdateItemDataByIdError = UpdateItemDataByIdErrors[keyof UpdateItemDataByIdErrors];

export type UpdateItemDataByIdResponses = {
    /**
     * User found, operation successfully commited
     */
    200: Item;
};

export type UpdateItemDataByIdResponse = UpdateItemDataByIdResponses[keyof UpdateItemDataByIdResponses];

export type FindByEmailData = {
    body?: never;
    path?: never;
    query: {
        /**
         * Email address of the user to find
         */
        email: string;
    };
    url: '/users/by-email';
};

export type FindByEmailErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type FindByEmailError = FindByEmailErrors[keyof FindByEmailErrors];

export type FindByEmailResponses = {
    /**
     * User found
     */
    200: User;
    /**
     * User not found (no content)
     */
    204: User;
};

export type FindByEmailResponse = FindByEmailResponses[keyof FindByEmailResponses];

export type GetAllUserData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/users/all';
};

export type GetAllUserErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type GetAllUserError = GetAllUserErrors[keyof GetAllUserErrors];

export type GetAllUserResponses = {
    /**
     * List of all users
     */
    200: Array<User>;
};

export type GetAllUserResponse = GetAllUserResponses[keyof GetAllUserResponses];

export type GetAllUniversitiesFacultiesData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/universities/all';
};

export type GetAllUniversitiesFacultiesErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type GetAllUniversitiesFacultiesError = GetAllUniversitiesFacultiesErrors[keyof GetAllUniversitiesFacultiesErrors];

export type GetAllUniversitiesFacultiesResponses = {
    /**
     * List of all universities and faculties
     */
    200: UniversitiesResponse;
};

export type GetAllUniversitiesFacultiesResponse = GetAllUniversitiesFacultiesResponses[keyof GetAllUniversitiesFacultiesResponses];

export type GetItemsByCategoryData = {
    body?: never;
    path?: never;
    query: {
        /**
         * Category of the item for filtering
         */
        categoryId: string;
    };
    url: '/items/by-category';
};

export type GetItemsByCategoryErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type GetItemsByCategoryError = GetItemsByCategoryErrors[keyof GetItemsByCategoryErrors];

export type GetItemsByCategoryResponses = {
    /**
     * List of all items with the given category
     */
    200: Array<Item>;
};

export type GetItemsByCategoryResponse = GetItemsByCategoryResponses[keyof GetItemsByCategoryResponses];

export type GetAllItemsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/items/all';
};

export type GetAllItemsErrors = {
    /**
     * Basic Error Response
     */
    default: ErrorModel;
};

export type GetAllItemsError = GetAllItemsErrors[keyof GetAllItemsErrors];

export type GetAllItemsResponses = {
    /**
     * List of all items
     */
    200: Array<Item>;
};

export type GetAllItemsResponse = GetAllItemsResponses[keyof GetAllItemsResponses];

export type ClientOptions = {
    baseUrl: 'http://localhost:7070/api' | (string & {});
};