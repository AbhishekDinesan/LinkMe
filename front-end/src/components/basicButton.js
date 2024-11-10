import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function BasicButton({buttonName, type, onClick, redirect}) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (redirect) {
      navigate(redirect.startsWith('/') ? redirect : `/${redirect}`);
    }
    if (onClick) {
      onClick();
    }
  };
  return (
    <Button variant="contained" type={type} onClick={handleClick}>
      {buttonName}
    </Button>
  );
}