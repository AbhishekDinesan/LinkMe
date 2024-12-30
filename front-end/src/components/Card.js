import * as React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function GenericCard({
  name,
  startingLocalDate,
  startingDateTime,
  combinedStartDateTime,
  venue,
  city,
  country,
  eventUrl,
  eventGenre,
  imageUrl,
  userNames,
  groupId,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [availabilityData, setAvailabilityData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [date, time] = combinedStartDateTime.split("T");

  const fetchGroupEvents = async () => {
    setLoading(true);
    try {
      console.log('Starting Combined Start Date', combinedStartDateTime);
      console.log('GroupId', groupId);
      const response = await axios.get('/api/fetch-events-group-id', {
        headers: { 'Content-Type': 'application/json' },
        params: {
          group_id: groupId,
          startTime: time,
          startDate: date,
          endTime: time,
          endDate: date,
        },
      });
      setAvailabilityData(response.data); 
    } catch (err) {
      console.error('Error fetching group events:', err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    setExpanded((prev) => !prev);
  };

  React.useEffect(() => {
    if (expanded) {
      fetchGroupEvents();
    }
  }, [expanded]);

  return (
    <Card
      style={{
        maxWidth: 400,
        borderRadius: 16,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer', // Indicate that the card is clickable
      }}
      onClick={handleCardClick} // Handle the click event
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={imageUrl || 'https://via.placeholder.com/400'}
        alt={`${name} cover image`}
        style={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          objectFit: 'cover',
        }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ fontWeight: 'bold', textAlign: 'center', color: '#1976d2' }}
        >
          {name || 'Event Name'}
        </Typography>
        <Typography variant="body2" style={{ color: '#555' }}>
          <strong>Starting Time:</strong> {time|| 'TBD'}
        </Typography>
        <Typography variant="body2" style={{ color: '#555' }}>
          <strong>Venue:</strong> {venue || 'TBD'}
        </Typography>
        <Typography variant="body2" style={{ color: '#555' }}>
          <strong>City:</strong> {city || 'TBD'}
        </Typography>
        <Typography variant="body2" style={{ color: '#555' }}>
          <strong>Country:</strong> {country || 'TBD'}
        </Typography>
        <Typography variant="body2" style={{ color: '#555' }}>
          <strong>Event Genre:</strong> {eventGenre || 'TBD'}
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit></Collapse>
    </Card>
  );
}
