
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';

function App() {

  const responseGoogle = response =>{
    console.log(response)
  }

  const responseError = error =>{
    console.log(error)
  }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID}>
    <div>
      <div className="App">
        <h1>LinkMe</h1>
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={responseError}
          useOneTap
        />
      </div>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;

