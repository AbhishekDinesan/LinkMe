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

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedDay, setSelectedDay] = useState('1');

  var groupId = null;

  const getGroupDataFromCookie = async () => {
    const groupId = Cookies.get('groupId');
    const userIdResponse = await axios.get('/api/fetch-users-in-group',{
      headers: { 'Content-Type': 'application/json' },
      params: { group_id: Cookies.get('groupId') },
    })
    const userIdList = userIdResponse.data;
    console.log("userIdList", userIdList)
    const userNameList = [];
    for (const id of userIdList){
      const userName = await axios.get('api/fetch-usernames-from-id', {
        headers: { 'Content-Type': 'application/json' },
        params: { user_id: id},
      })
      userNameList.push(userName.data[0].name)
    }
    console.log(userNameList)
    return groupId ? JSON.parse(groupId) : null;
  };

  const fetchEvents = async () => {
    try {
      const selectedDate = `${selectedYear}-${String(
        new Date(`${selectedMonth} 1`).getMonth() + 1
      ).padStart(2, '0')}-${selectedDay.padStart(2, '0')}T00:00:00Z`;

      const response = await axios.get('/api/fetch-start-date-events', {
        headers: { 'Content-Type': 'application/json' },
        params: { startDate: selectedDate, numEvents: 20 },
      });
      console.log(response.data);
      groupId = getGroupDataFromCookie();
      console.log("Does the groupId persist" + groupId);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSearch = () => {
    fetchEvents();
  };

  const handleCardClick = (index) => {
    setExpandedCard(index);
  };

  const handleClose = () => {
    setExpandedCard(null);
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
                imageUrl={event.imageUrl || 'defaultImageURL'} // add a default
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
