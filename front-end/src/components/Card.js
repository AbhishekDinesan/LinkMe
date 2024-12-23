import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function GenericCard({name, startingDateTime, venue, city, country, eventUrl, eventGenre, imageUrl}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image= {imageUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Typography> Starting Time: {startingDateTime}</Typography>
          <Typography> Venue {venue}</Typography>
          <Typography> City: {city}</Typography>
          <Typography> Country: {country}</Typography>
          <Typography> Event Url {eventUrl}</Typography>
          <Typography> Event Genre {eventGenre}</Typography>
          <Typography> Image URL {imageUrl}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
