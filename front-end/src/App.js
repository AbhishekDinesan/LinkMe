import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/hero';
import axios from 'axios';
import MenuAppBar from './components/AppBar';
import Button from '@mui/material/Button';
import Dashboard from './components/SuccessPage';
import { useNavigate } from 'react-router-dom';
import Footer from './components/FooterBar';
import FooterBar from './components/FooterBar';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID}>
       <Router>
        <MenuAppBar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/dashboard" element={<Dashboard />} />  // Your target page component
        </Routes>
        <FooterBar />
      </Router>
    </GoogleOAuthProvider>
  );
}

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
        navigate('/dashboard');
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



export default App;
