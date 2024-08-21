import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import Hero from './components/hero';
import axios from 'axios';
import MenuAppBar from './components/AppBar';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID}>
      <div className="App">
        <MenuAppBar />
        <Hero />
        <GoogleLoginButton />
      </div>
    </GoogleOAuthProvider>
  );
}

function GoogleLoginButton() {
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (response) => {
      console.log("This is the authorization code response", response);
      const { code } = response;
      try {
        const serverResponse = await axios.post('/api/create-tokens', { code });
        console.log('Tokens:', serverResponse.data);
      } catch (error) {
        console.error('Error exchanging authorization code:', error.message);
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });
  return (
    <button onClick={() => googleLogin()}>Login with Google</button>
  );
}

export default App;
