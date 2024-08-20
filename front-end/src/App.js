
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import axios from 'axios'

function App() {
  const responseGoogle = (response) =>{
    console.log("This is the response",  response)
    const { credential } = response;
    console.log("This is the code", credential)
    axios.post('/api/create-tokens', {credential})
    .then(response =>{console.log(response.data)})
    .catch(error=>console.log(error.message))
  };

  const responseError = error =>{
    console.log(error)
  }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID}>
    <div>
      <div className="App">
        <h1>LinkMe</h1>
        <GoogleLogin
          onError={responseError}
          clientId={process.env.REACT_APP_CLIENTID}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseError}
          cookiePolicy={'single_host_origin'}
          responseType="code" // Request authorization code
          accessType="offline" // Request refresh token
          useOneTap
        />
      </div>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;

