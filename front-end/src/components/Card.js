import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
}) {
  const [expanded, setExpanded] = React.useState(false);

  // Toggle card expansion
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      style={{
        maxWidth: 400,
        borderRadius: 16,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
      }}
    >
      <CardActionArea
        component="a"
        target="_blank"
        rel="noopener noreferrer"
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
          <Box style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Typography variant="body2" style={{ color: '#555' }}>
              <strong>Starting Time:</strong> {combinedStartDateTime || 'TBD'}
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
          </Box>
        </CardContent>
      </CardActionArea>

      {/* Expand Icon */}
      <IconButton
        onClick={handleExpandClick}
        style={{
          transition: 'transform 0.3s',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
      </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant="h6"
            style={{ textAlign: 'center', color: '#1976d2' }}
          >
            User Availability
          </Typography>
          <List>
            {userNames.map((user, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={user.name}
                  secondary={user.isAvailable ? 'Available' : 'Not Available'}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}
