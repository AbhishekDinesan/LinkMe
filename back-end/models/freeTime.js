const dayjs = require('dayjs');

class Interval {
    constructor(startDate, startTime, endDate, endTime) {
        this.startDateTime = dayjs(`${startDate} ${startTime}`);
        this.endDateTime = dayjs(`${endDate} ${endTime}`);
        console.log(`Created interval: ${this.startDateTime.format()} to ${this.endDateTime.format()}`);
    }
}

function isOverlap(interval1, interval2) {
    console.log(`Checking overlap between: ${interval1.startDateTime.format()} - ${interval1.endDateTime.format()} and ${interval2.startDateTime.format()} - ${interval2.endDateTime.format()}`);
    return (
        interval1.startDateTime.isBefore(interval2.endDateTime) &&
        interval2.startDateTime.isBefore(interval1.endDateTime
    ));
}

function getOverlappingIntervals(queryPeriod, events_object) {
    const intervalList = [];

    for (let event of events_object) {
        if (event.start_time && event.end_time) {
            const startDate = dayjs(event.start_time).format('YYYY-MM-DD');
            const startTime = dayjs(event.start_time).format('HH:mm:ss');
            const endDate = dayjs(event.end_time).format('YYYY-MM-DD');
            const endTime = dayjs(event.end_time).format('HH:mm:ss');
            const interval = new Interval(startDate, startTime, endDate, endTime);
            intervalList.push(interval);
        }   
    }

    // Sort intervals based on startDateTime
    intervalList.sort((a, b) => a.startDateTime.diff(b.startDateTime));

    console.log(`Query Interval: ${queryPeriod.startDateTime.format()} to ${queryPeriod.endDateTime.format()}`);

    const overlappingIntervals = [];

    for (let interval of intervalList) {
        if (isOverlap(queryPeriod, interval)) {
            overlappingIntervals.push(interval);
        }
    }

    return overlappingIntervals;
}

function checkConflict(events_object) {
    const hardCodedInterval = new Interval(
        '2024-10-23', '00:00:00',
        '2024-10-26', '11:46:48'
    );

    const overlappedIntervals = getOverlappingIntervals(hardCodedInterval, events_object);

    console.log("These are the overlapped intervals:");
    console.log(overlappedIntervals);

    return overlappedIntervals.length ? overlappedIntervals : false;
}

module.exports = {
    Interval,
    checkConflict
};
