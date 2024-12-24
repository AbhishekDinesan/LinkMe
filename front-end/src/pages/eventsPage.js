import React, { useState, useEffect } from 'react';
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
} from '@mui/material';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedDay, setSelectedDay] = useState('1');
  const [selectedQuickOption, setSelectedQuickOption] = useState('Today');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/fetch-start-date-events', {
          headers: { 'Content-Type': 'application/json' },
        });
        console.log(response.data)
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

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
          {['2023', '2024', '2025'].map((year) => (
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

        <Select
          value={selectedQuickOption}
          onChange={(e) => setSelectedQuickOption(e.target.value)}
        >
          {['Today', 'Tomorrow', 'Next Week'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
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
          {/* Map over fetched events to render cards */}
          {events.map((event, index) => (
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
                venue={event.venue}
                city={event.city}
                country={event.country}
                eventUrl={event.url}
                eventGenre={event.eventGenre}
                imageUrl={event.imageUrl || 'defaultImageURL'} // Fallback image
              />
            </Box>
          ))}
        </Box>
      </Box>

      {expandedCard !== null && events[expandedCard] && (
        <Modal open={true} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" gutterBottom>
              {events[expandedCard].name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Detailed information about {events[expandedCard].name}.
            </Typography>
            <Typography variant="body2" gutterBottom>
              Venue: {events[expandedCard].venue}
            </Typography>
            <Typography variant="body2" gutterBottom>
              City: {events[expandedCard].city}, {events[expandedCard].country}
            </Typography>
            <Box sx={{ mt: 4 }}>
              <BasicButton buttonName="Close" type="button" onClick={handleClose} />
            </Box>
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
