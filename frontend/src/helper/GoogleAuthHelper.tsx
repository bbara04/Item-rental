import axios from "axios";
import { DecodedGoogleToken } from "../dto/DecodedGoogleToken";
import { User } from "../dto/User"; 

// TODO: Fix this mess

export class GoogleAuthHelper {
    private static ipAddress: String = import.meta.env.VITE_SERVER_IP_ADDRESS;
    private static port: String = import.meta.env.VITE_SERVER_PORT;

    static handleDecodedToken(token: DecodedGoogleToken, setGlobalUser: (user: User) => void, navigate: () => void): void {
        const email = token.email;
        const firstName = token.given_name;
        const lastName = token.family_name;
        const uniqueId = token.sub;

        if (!email || !firstName || !lastName || !uniqueId) {
            console.error('Invalid token:', token);
            return;
        }

        const response = axios.get(`http://${this.ipAddress}:${this.port}/api/users/by-email`,
            {
                params: {
                    email: token.email
                }
            }
        );
        response.then((response) => {
            if (response.status == 200) {
                console.log("User found:", response.data);
                this.handleUserFound(setGlobalUser, navigate, email, uniqueId);
            } else if (response.status == 204) {
                console.log("User not found:", response.data);
                this.handleUserNotFound(setGlobalUser, navigate, email, uniqueId, firstName, lastName);
            } else {
                console.log("Invalid status code:", response.status);
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    private static handleUserFound(setGlobalUser: (user: User) => void, navigate: () => void, email: string, uniqueId: string): void {
        const response = axios.post(`http://${this.ipAddress}:${this.port}/api/auth/google/login`,
            {
                email: email,
                passkey: uniqueId
            }
        );
        response.then((response) => {
            console.log("Successful login:", response.data);
            setGlobalUser(response.data);
            navigate();
        }).catch((err) => {
            console.error(err);
        });
    }

    private static handleUserNotFound(setGlobalUser: (user: User) => void, navigate: () => void, email: string, uniqueId: string, firstName: string, lastName: string): void {
        const response = axios.post(`http://${this.ipAddress}:${this.port}/api/auth/google/register`,
            {
                username: `${firstName}.${lastName}(google)`,
                email: email,
                passkey: uniqueId,
                firstName: firstName,
                lastName: lastName
            }
        );
        response.then((response) => {
            console.log("Successful registration:", response.data);
            setGlobalUser(response.data);
            navigate()
        }).catch((err) => {
            console.error(err);
        });
    }
}