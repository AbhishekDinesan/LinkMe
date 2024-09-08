import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicDatePicker from './DatePicker';
import BasicTimePicker from './TimePicker';
import BasicButton from './basicButton';
import axios from 'axios';
import dayjs from 'dayjs';


function Dashboard() {
  const [formData, setFormData] = useState({ // hook for the form
    eventName: '',
    eventDescription: '',
    startEvent: dayjs(),
    endEvent: dayjs(),
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
    console.log('Form data being sent:', formData);
    e.preventDefault();
    const formattedFormData = {
      ...formData,
      startEvent: formData.startEvent?.toISOString().split('T')[0],  // Convert to YYYY-MM-DD
      endEvent: formData.endEvent?.toISOString().split('T')[0],      // Convert to YYYY-MM-DD
      startTime: formData.startTime?.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), // HH:MM format
      endTime: formData.endTime?.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),    // HH:MM format
    };
    try {
      const response = await axios.post('/api/create-event', formattedFormData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Event created:', response.data);
    } catch (error) {
      console.error('Error creating event:', error.message);
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
    <TextField id="outlined-basic" label="Event Description" variant="standard" name="eventDescription" value={formData.eventDescription} onChange={handleChange} />
    <BasicDatePicker labelName={"Start Event"}   value={formData.startEvent}
      onChange={(date) => setFormData({ ...formData, startEvent: date })} />
    <BasicDatePicker labelName={"End Event"} value={formData.endEvent}
      onChange={(date) => setFormData({ ...formData, endEvent: date })}/>
    <BasicTimePicker labelName={"Start Time"} value={formData.startTime}
      onChange={(time) => setFormData({ ...formData, startTime: time })}  />
    <BasicTimePicker labelName={"End Time"}value={formData.endTime}
      onChange={(time) => setFormData({ ...formData, endTime: time })}/>
    <BasicButton buttonName={"Create Event"} type="submit"/>
  </Box>
  }
  
  export default Dashboard;

  // summary, location, description, start datetime, timeZone, end dateTime, timeZone