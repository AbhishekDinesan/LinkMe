import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

function BasicDatePicker({ labelName, value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label={labelName}
      value={value}
      onChange={(newDate) => {
        onChange(newDate); // Make sure the selected date is passed to the parent
      }}
      renderInput={(params) => <TextField {...params} />}
    />
    </LocalizationProvider>
  );
}

export default BasicDatePicker;
