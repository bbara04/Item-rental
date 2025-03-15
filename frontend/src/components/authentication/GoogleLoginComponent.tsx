import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useAppContext } from '../../AppContextProvider';
import { DecodedGoogleToken } from '../../dto/DecodedGoogleToken';
import { GoogleAuthHelper } from '../../helper/GoogleAuthHelper';
import { useNavigate } from 'react-router-dom';

const GoogleLoginComponent = () => {

    const { setUser } = useAppContext();
    const navigate = useNavigate();

    function handleDecodedToken(token: DecodedGoogleToken) {
        GoogleAuthHelper.handleDecodedToken(token, setUser, () => navigate('/'));
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
