import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useAppContext } from '../../AppContextProvider';
import { DecodedGoogleToken } from '../../dto/DecodedGoogleToken';
import { GoogleAuthHelper } from '../../helper/GoogleAuthHelper';

const GoogleLoginComponent = () => {

    const { setUser } = useAppContext();

    function handleDecodedToken(token: DecodedGoogleToken) {
        GoogleAuthHelper.handleDecodedToken(token, setUser);
    }

    return (
        <>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log('Credential Response:', credentialResponse);
                    if (credentialResponse.credential) {
                        const decoded = jwtDecode(credentialResponse.credential);
                        handleDecodedToken(decoded);
                    } else {
                        console.error('No credential provided.');
                    }
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </>
    );
};

export default GoogleLoginComponent;
