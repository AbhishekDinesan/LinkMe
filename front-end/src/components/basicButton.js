import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButton({buttonName, type}) {
  return (
    <Button variant="contained" type={type}>
      {buttonName}
    </Button>
  );
}