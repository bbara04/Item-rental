import { JwtPayload } from "jwt-decode";

export interface DecodedGoogleToken extends JwtPayload {
    email?: string;
    given_name?: string;
    family_name?: string;
}