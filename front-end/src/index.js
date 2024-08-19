import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppBar } from '@mui/material';
import ButtonAppBar from './components/AppBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ButtonAppBar />
    <App />
    
  </React.StrictMode>
);