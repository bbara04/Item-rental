import axios from "axios";
import { DecodedGoogleToken } from "../dto/DecodedGoogleToken";
import { User } from "../dto/User";
import NavigationService from "../NavigationService";

export class GoogleAuthHelper {
    static handleDecodedToken(token: DecodedGoogleToken, setGlobalUser: ( user: User ) => void) : void{
        console.log('Decoded Token:', token);

        const email = token.email;
        const firstName = token.given_name;
        const lastName = token.family_name;
        const uniqueId = token.sub;

        if (!email || !firstName || !lastName || !uniqueId) {
            console.error('Invalid token:', token);
            return;
        }

        const response = axios.get("http://localhost:8080/api/users/by-email", 
            {
                params: {
                    email: token.email
                }
            }
        );
        response.then((response) => {
            if (response.status == 200) {
                console.log("User found:", response.data);
                this.handleUserFound(setGlobalUser, email, uniqueId);
            } else if (response.status == 204) {
                console.log("User not found:", response.data);
                this.handleUserNotFound(setGlobalUser, email, uniqueId, firstName, lastName);
            } else {
                console.log("Invalid status code:", response.status);
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    private static handleUserFound(setGlobalUser: (user: User) => void, email: string, uniqueId: string) : void {
        const response = axios.post("http://localhost:8080/api/auth/google/login", 
            {
                email: email,
                passkey: uniqueId
            }
        );
        response.then((response) => {
            console.log("Successful login:", response.data);
            setGlobalUser(response.data);
            NavigationService.goToHome();
        }).catch((err) => {
            console.error(err);
        });
    }

    private static handleUserNotFound(setGlobalUser: (user: User) => void, email: string, uniqueId: string, firstName: string, lastName: string) : void {
        const response = axios.post("http://localhost:8080/api/auth/google/register", 
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
            NavigationService.goToHome();
        }).catch((err) => {
            console.error(err);
        });
    }
}