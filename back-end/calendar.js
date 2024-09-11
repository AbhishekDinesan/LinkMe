async function addEventToCalendar(accessToken) {
    try {
      const event = {
        summary: 'Sample Event',
        location: '123 Main St, Anytown, USA',
        description: 'This is a sample event.',
        start: {
          dateTime: '2024-08-21T09:00:00-07:00',
          timeZone: 'America/Toronto',
        },
        end: {
          dateTime: '2024-08-21T17:00:00-07:00',
          timeZone: 'America/Toronto',
        },
      };
  
      const response = await axios.post(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        event,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Event created:', response.data);
    } catch (error) {
      console.error('Error creating event:', error.message);
    }
  }