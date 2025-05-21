import { findByEmail, loginByGoogle, User } from "../client";
import { DecodedGoogleToken } from "../dto/DecodedGoogleToken";
import { RegisterType, RegistrationInfo } from "../dto/RegistrationInfo";

// TODO: Fix this mess

export class GoogleAuthHelper {
  private static email: string;
  private static firstName: string;
  private static lastName: string;
  private static uniqueId: string;

  static init(token: DecodedGoogleToken, setRegistrationInfo: (registrationInfo: RegistrationInfo) => void) {
    if (token.email == undefined || token.family_name == undefined || token.given_name == undefined || token.sub == undefined) {
      console.log("Received google jwt token does not contain data required for using this feature");
      return;
    }
    GoogleAuthHelper.email = token.email;
    GoogleAuthHelper.firstName = token.given_name;
    GoogleAuthHelper.lastName = token.family_name;
    GoogleAuthHelper.uniqueId = token.sub;

    setRegistrationInfo({
      user: {
        userName: this.firstName + '' + this.lastName,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        passkey: this.uniqueId,
      },
      registerType: RegisterType.GOOGLE
    })
  }

  static async authenticateUser(token: DecodedGoogleToken, setRegistrationInfo: (registrationInfo: RegistrationInfo) => void, setGlobalUser: (user: User) => void, navigate: () => void): Promise<boolean> {
    this.init(token, setRegistrationInfo);

    try {
      const { data: user, error } = await findByEmail({
        query: {
          email: GoogleAuthHelper.email
        }
      });

      if (error) {
        console.log("Error fetching user by email:", error);
        return false;
      }

      if (user) {
        console.log("User found:", user);
        return this.handleLogin(setGlobalUser, navigate);
      } else {
        console.log("User not found, proceeding to registration.");
        return false;
      }

    } catch (e) {
      console.error("An unexpected error occurred in handleDecodedToken:", e);
    }
    return false;
  }

  private static async handleLogin(setGlobalUser: (user: User) => void, navigate: () => void): Promise<boolean> {
    const { data, error } = await loginByGoogle({
      body: {
        email: this.email,
        passkey: this.uniqueId
      }
    });
    if (error) {
      console.log("Failed to login user" + error);
    }
    if (data) {
      setGlobalUser(data);
      navigate();
      return true;
    }
    console.error("login returned no User but wasn't error")
    return false;
  }

}