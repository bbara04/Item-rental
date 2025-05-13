import { SimpleUser } from "./SimpleUser";


export enum RegisterType {
    BASIC = 'basic',
    GOOGLE = 'google'
}

export type RegistrationInfo = {
    user: SimpleUser;
    registerType: RegisterType
}