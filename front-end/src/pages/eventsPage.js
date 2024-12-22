import React, { useState } from 'react';
import BasicButton from '../components/basicButton';
import MenuAppBar from '../components/AppBar';
import GenericCard from '../components/Card';
import { Box, Modal, Typography } from '@mui/material';

const EventsPage = () => {
  const [expandedCard, setExpandedCard] = useState(null); 
  const handleCardClick = (index) => {
    setExpandedCard(index); 
  };
  const handleClose = () => {
    setExpandedCard(null); //
  };

  return (
    <div>
      <MenuAppBar title={"🔗 LinkMe."} />
      <Box sx={{ mt: 4 }}>
        <BasicButton buttonName={"AI Recommendation"} type="submit" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4, // margin-top
        }}
      >
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            width: '90%',
            padding: 2,
            gap: 2, // space between cards
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                minWidth: 300,
                cursor: 'pointer',
              }}
              onClick={() => handleCardClick(index)} // Handle click event
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
    </div>
  );
};

export default EventsPage;
