import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './pages/hero';
import axios from 'axios';
import MenuAppBar from './components/AppBar';
import Button from '@mui/material/Button';
import Dashboard from './pages/SuccessPage';
import { useNavigate } from 'react-router-dom';
import Footer from './components/FooterBar';
import FooterBar from './components/FooterBar';
import GroupCreationPage from './pages/groupCreationPage';
import EventsPage from './pages/eventsPage';
import './styles/App.css'

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID}>
       <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/dashboard" element={<Dashboard />} />  
          <Route path="/groupCreation" element={<GroupCreationPage />} /> 
          <Route path="/eventsPage" element={<EventsPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;