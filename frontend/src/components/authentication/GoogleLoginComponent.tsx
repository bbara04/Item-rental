import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContextProvider';
import { DecodedGoogleToken } from '../../dto/DecodedGoogleToken';
import { GoogleAuthHelper } from '../../helper/GoogleAuthHelper';

const GoogleLoginComponent = () => {

    const { setUser, setRegistrationInfo } = useAppContext();
    const navigate = useNavigate();

    async function handleDecodedToken(token: DecodedGoogleToken) {
        const successful: boolean = await GoogleAuthHelper.authenticateUser(token, setRegistrationInfo, setUser, () => navigate('/'));
        if (!successful) {
            navigate("/register/additional")
        }
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
