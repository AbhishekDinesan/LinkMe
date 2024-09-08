import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';

function BasicTimePicker({ labelName, value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <TimePicker
      label={labelName}
      value={value}
      onChange={(newTime) => {
        onChange(newTime); // Pass the selected time to the parent
      }}
      renderInput={(params) => <TextField {...params} />}
    />
    </LocalizationProvider>
  );
}

export default BasicTimePicker;