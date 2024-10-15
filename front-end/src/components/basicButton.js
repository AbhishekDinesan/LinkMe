import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButton({buttonName, type, onClick}) {
  return (
    <Button variant="contained" type={type} onClick={onClick}>
      {buttonName}
    </Button>
  );
}