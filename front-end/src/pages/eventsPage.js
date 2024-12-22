import React, { useState } from 'react';
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
  const [expandedCard, setExpandedCard] = useState(null); 
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedDay, setSelectedDay] = useState('1');
  const [selectedQuickOption, setSelectedQuickOption] = useState('Today');

  const handleCardClick = (index) => {
    setExpandedCard(index); 
  };

  const handleClose = () => {
    setExpandedCard(null); 
  };

  return (
    <div>
      <MenuAppBar title={"🔗 LinkMe."} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mt: 4,
          flexWrap: 'wrap',
        }}
      >

        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {['2023', '2024', '2025'].map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ].map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
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
          {Array.from({ length: 10 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                minWidth: 300,
                cursor: 'pointer',
              }}
              onClick={() => handleCardClick(index)} 
            >
              <GenericCard
                title={`Event ${index + 1}`}
                description={`Details for event ${index + 1}`}
              />
            </Box>
          ))}
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
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Event {expandedCard + 1}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Detailed information about Event {expandedCard + 1}.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <BasicButton buttonName={"Close"} type="button" onClick={handleClose} />
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
  <BasicButton buttonName={"🤖 AI Recommendation"} />
</Box>
    </div>
  );
};

export default EventsPage;
