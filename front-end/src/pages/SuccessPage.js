import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicDatePicker from '../components/DatePicker';
import BasicTimePicker from '../components/TimePicker';
import BasicButton from '../components/basicButton';
import axios from 'axios';
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [formData, setFormData] = useState({ 
    eventName: dayjs(),
    eventDescription: dayjs(), 
    startEvent: dayjs(),
    endEvent: dayjs(),
    startTime: dayjs(),
    endTime: dayjs(),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFreeTime = async () => {
    try{
      const response = await axios.post('/api/free-time', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Free-time Response:', response.data);
    }
    catch(exception){
      console.log(exception)
    }
  };

  const navigate = useNavigate();

  const handleGroupAction = async () => {
    try {
      const response = await axios.post('/api/create-groups', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Group Response:', response.data);
    } catch (error) {
      console.error('Error during another action:', error.message);
    }
  };
  
  const handleSubmit = async (e) => {
    console.log('Form data being sent:', formData);
    e.preventDefault();
    const formattedFormData = {
      ...formData,
      startEvent: formData.startEvent?.format('YYYY-MM-DD'),  
      endEvent: formData.endEvent?.format('YYYY-MM-DD'),    
      startTime: formData.startTime?.format('HH:mm'), 
      endTime: formData.endTime?.format('HH:mm'),    
    };
    try {
      const response = await axios.post('/api/create-event', formattedFormData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response2 = await axios.get('/api/fetch-events', formattedFormData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // you need to insert response 2 into the database with the appropriate user_id
      console.log('Event created:', response.data);
      console.log(response2);
    } catch (error) {
      console.error('Error creating event:', error.message);
    }
  };
  
    return <Box
    component="form"
    sx={{ '& > :not(style)': { m: 1, width: '25ch', marginTop: '64px' } }}
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
    <BasicButton buttonName={"Create Group"} onClick={handleGroupAction} type="button" redirect={"/groupCreation"}/>
    <BasicButton buttonName={"Calculate Free Time"} onClick={handleFreeTime} type="button"/>
    <BasicButton buttonName={"Testing Purposes"} onClick={handleSubmit} type="button"/>
  </Box>
  }
  
  export default Dashboard;

