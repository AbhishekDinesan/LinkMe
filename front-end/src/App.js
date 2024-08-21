import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import Hero from './components/hero';
import axios from 'axios';
import MenuAppBar from './components/AppBar';
import Button from '@mui/material/Button';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID}>
      <div className="App">
        <MenuAppBar />
        <Hero />
      </div>
    </GoogleOAuthProvider>
  );
}


export function GoogleLoginButton() {
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
        addEventToCalendar(access_token);
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

async function addEventToCalendar(accessToken) {
  try {
    const event = {
      summary: 'Sample Event',
      location: '123 Main St, Anytown, USA',
      description: 'This is a sample event.',
      start: {
        dateTime: '2024-08-21T09:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: '2024-08-21T17:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
    };

    const response = await axios.post(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      event,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Event created:', response.data);
  } catch (error) {
    console.error('Error creating event:', error.message);
  }
}

export default App;
