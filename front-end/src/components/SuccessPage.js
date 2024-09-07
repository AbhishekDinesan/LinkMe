import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicDatePicker from './DatePicker';
import BasicTimePicker from './TimePicker';
import BasicButton from './basicButton';


function Dashboard() {
  const [formData, setFormData] = useState({ // hook for the form
    eventName: '',
    eventDescription: '',
    startEvent: '',
    endEvent: '',
    startTime: '',
    endTime: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Event created:', data);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };
  
    return <Box
    component="form"
    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit}
  >
    <TextField id="outlined-basic" label="Event Name" variant="standard" name="eventName" value={formData.eventName} onChange={handleChange}/>
    <TextField id="outlined-basic" label="Event Description" variant="standard" name="description" value={formData.eventName} onChange={handleChange} />
    <BasicDatePicker labelName={"Start Event"}   value={formData.endEvent}
      onChange={(date) => setFormData({ ...formData, endEvent: date })} />
    <BasicDatePicker labelName={"End Event"} value={formData.endEvent}
      onChange={(date) => setFormData({ ...formData, endEvent: date })}/>
    <BasicTimePicker labelName={"Start Time"} value={formData.startTime}
      onChange={(time) => setFormData({ ...formData, startTime: time })}  />
    <BasicTimePicker labelName={"End Time"}value={formData.endTime}
      onChange={(time) => setFormData({ ...formData, endTime: time })}/>
    <BasicButton buttonName={"Create Event"} />
  </Box>
  }
  
  export default Dashboard;

  // summary, location, description, start datetime, timeZone, end dateTime, timeZone