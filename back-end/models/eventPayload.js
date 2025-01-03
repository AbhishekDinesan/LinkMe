
function extractEventPayload(event) {
    return {
        id: event.id,
        name: event.name,
        startingLocalDate: event.dates.start.localDate,
        startingDateTime: event.dates.start.dateTime,
        combinedStartDateTime: `${event.dates.start.localDate}T${event.dates.start.localTime || '00:00:00Z'}`,
        venue: event._embedded.venues[0]?.name || 'unknown',
        city: event._embedded.venues[0]?.city?.name,
        country: event._embedded.venues[0]?.country?.name,
        url: event.url,
        eventGenre: event.classifications[0].genre.name,
        imageUrl: event.images.find(img => img.ratio === '16_9' && img.width === 2426)?.url || event.images[0]?.url
    };
}

module.exports =  {extractEventPayload}