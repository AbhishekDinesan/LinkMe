import React, { useState } from 'react';
import axios from 'axios';
import BasicButton from '../components/basicButton';
import MenuAppBar from '../components/AppBar';
import GenericCard from '../components/Card';
import {
  Box,
  MenuItem,
  Select,
  Typography,
  Modal,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import Cookies from 'js-cookie';
const moment = require('moment-timezone')

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [group, setGroup] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedDay, setSelectedDay] = useState('1');

  var groupId = null;
  const [userNameList, setUserNameList] = useState([]);
  const [userIdList, setUserIdList] = useState([]);
  

  const getGroupDataFromCookie = async () => {
    const groupId = Cookies.get('groupId');
    const userIdResponse = await axios.get('/api/fetch-users-in-group',{
      headers: { 'Content-Type': 'application/json' },
      params: { group_id: Cookies.get('groupId') },
    })
    const userIds = userIdResponse.data;
    setUserIdList(userIds)
    const userNames = await Promise.all(
      userIds.map(async (id) => {
        const userNameResponse = await axios.get('/api/fetch-usernames-from-id', {
          headers: { 'Content-Type': 'application/json' },
          params: { user_id: id },
        });
        return userNameResponse.data[0].name;
      })
    );
    setUserNameList(userNames);
    return groupId;
  };

  const fetchEvents = async () => {
    try {
      const localDate = new Date(
        selectedYear,
        new Date(`${selectedMonth} 1`).getMonth(),
        parseInt(selectedDay),
        0, 0, 0
      );
      localDate.setDate(localDate.getDate() + 1)
      const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
      const selectedDate = utcDate.toISOString().split('.')[0] + 'Z';

      const response = await axios.get('/api/fetch-start-date-events', {
        headers: { 'Content-Type': 'application/json' },
        params: { startDate: selectedDate, numEvents: 20 },
      });
      groupId = await getGroupDataFromCookie();
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSearch = () => {
    fetchEvents();
  };

  const [groupAvailability, setGroupAvailability] = useState({});

  const handleCalendar = async () =>{
    try{
      const [date, time] = events[expandedCard].combinedStartDateTime.split("T");
      const combinedDateTime = `${date}T${time}`
      const combinedEndDate = "2025-02-19T17:30:00"
      console.log("Start", combinedDateTime)
      console.log("End", combinedEndDate)
    const formattedData = {
      eventName: events[expandedCard].name,
      eventDescription: "Added by LinkMe",
      combinedStart:  combinedDateTime,
      combinedEnd: combinedEndDate
    }
    const response = await axios.post('/api/create-event', formattedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
  }catch(exception){
    console.log(exception)
  }
  }

  const handleCardClick = async (index) => {
    const selectedEvent = events[index];
  const combinedStartDateTime = selectedEvent.combinedStartDateTime;
  try {
    const [date, time] = combinedStartDateTime.split("T");
    const response = await axios.get('/api/fetch-events-group-id', {
      headers: { 'Content-Type': 'application/json' },
      params: {
        group_id: Cookies.get('groupId'),
        startTime: time,
        startDate: date,
        endTime: time,
        endDate: date,
      },
    });
    console.log("Response", response.data)
    var names;
    if (response.data.length != 0){
       names = await processAvailability(response.data)
    }
    setGroupAvailability((prev) => ({
      ...prev,
      [index]: response.data.length == 0 ? ["available"]: names, // Store results for the specific event
    }));
    setExpandedCard(index);
  }catch(exception){console.log(exception)}
};

  const handleClose = () => {
    setExpandedCard(null);
  };

  const processAvailability = async (available) =>{
    const arrayUsers = []
    for (const element of available) {
      const response = await axios.get("/api/fetch-usernames-from-id", {
        headers: { 'Content-Type': 'application/json' },
        params: {user_id: element.user_id},
      })
      arrayUsers.push(response)
    }
    const returnArray= []
    returnArray.push(arrayUsers[0].data[0].name)
    return returnArray
  };

  return (
    <div>
      <MenuAppBar title="🔗 LinkMe." />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mt: 4,
          flexWrap: 'wrap',
        }}
      >
        <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          {['2025', '2026', '2027'].map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>

        <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
            (month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            )
          )}
        </Select>

        <Select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
          {Array.from({ length: 31 }, (_, i) => (i + 1).toString()).map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>

        <BasicButton buttonName="Search" onClick={handleSearch} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            width: '90%',
            padding: 2,
            gap: 2,
          }}
        >
          {events.map((event, index) => {
            return(
              <Box
                key={event.id}
                sx={{
                  minWidth: 300,
                  cursor: 'pointer',
                }}
                onClick={() => handleCardClick(index)}
              >
              <GenericCard
                name={event.name}
                startingDateTime={event.startingDateTime}
                startingLocalDate={event.startingLocalDate}
                combinedStartDateTime={event.combinedStartDateTime}
                venue={event.venue}
                city={event.city}
                country={event.country}
                eventUrl={event.url}
                eventGenre={event.eventGenre}
                imageUrl={event.imageUrl || 'defaultImageURL'} // add a default image
                userNames={(() => {
                  return userNameList;
                })()}
                userIds={userIdList}
                groupId={Cookies.get('groupId')}
              />
            </Box>
          )})}
        </Box>
      </Box>
      {expandedCard !== null && (
  <Modal open={true} onClose={handleClose}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: 500,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 2,
      }}
    >
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={events[expandedCard]?.imageUrl || 'defaultImageURL'}
          alt={events[expandedCard]?.name}
        />
        <CardContent>
  <Typography variant="h5" gutterBottom>
    {events[expandedCard]?.name}
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Venue: {events[expandedCard]?.venue}
  </Typography>
  <Typography variant="body2" color="text.secondary">
    City: {events[expandedCard]?.city}, {events[expandedCard]?.country}
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Genre: {events[expandedCard]?.eventGenre}
  </Typography>
  <Typography variant="h6" sx={{ mt: 2 }}>
    Group Availability:
  </Typography>
  {groupAvailability[expandedCard] ? (
  groupAvailability[expandedCard].length > 0 ? (
    groupAvailability[expandedCard].map((availability, index) => (
      !(availability.includes("available")) ? (
        <Button
          key={index}
          variant="contained"
          sx={{
            backgroundColor: '#f44336',
            color: '#fff',
            mt: 1,
            '&:hover': {
              backgroundColor: '#e53935',
            },
          }}
        >
          Unavailable: {availability.replace('not available', '').trim()}
        </Button>
      ) : (
        <Button
          key={index}
          variant="contained"
          sx={{
            backgroundColor: '#4caf50',
            color: '#fff',
            mt: 1,
            '&:hover': {
              backgroundColor: '#45a049',
            },
          }}
        >
          {availability}
        </Button>
      )
    ))
  ) : (
    <Typography variant="body2" color="text.secondary">
      No availability information found.
    </Typography>
  )
) : (
  <Typography variant="body2" color="text.secondary">
    Loading...
  </Typography>
)}
</CardContent>

        <CardActions>
          <Button
            size="small"
            color="primary"
            target="_blank"
            rel="noopener noreferrer"
            component="a"
            href={events[expandedCard]?.eventUrl}
          >
            View Event
          </Button>
          <Button size="small" olor="primary" onClick={handleCalendar}>
            Add to Calendar
          </Button>
          <Button size="small" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </CardActions>
      </Card>
    </Box>
  </Modal>
)}


      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <BasicButton buttonName="🤖 AI Recommendation" />
      </Box>
    </div>
  );
};

export default EventsPage;
