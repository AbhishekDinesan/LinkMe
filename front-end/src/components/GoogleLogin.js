
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export function GoogleLoginButton() {
    const navigate = useNavigate();
    const googleLogin = useGoogleLogin({
      flow: 'auth-code',
      scope: 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.events',
      onSuccess: async (response) => {
        console.log("This is the authorization code response", response);
        const { code } = response;
        try {
          const serverResponse = await axios.post('/api/create-tokens', { code });
          console.log('Tokens:', serverResponse.data);
          const { access_token } = serverResponse.data.tokens;
          navigate('/dashboard'); // this is horrible, horrible, horrible design you idiot
        } catch (error) {
          console.error('Error exchanging authorization code:', error.message);
        }
      },
      onError: (error) => {
        console.error('Login Failed:', error);
      },
    });
    return (
      <Button variant="contained" color="primary" onClick={() => googleLogin()}>Login</Button>
    );
  }
  
  
  
  