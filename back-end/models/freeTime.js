const dayjs = require('dayjs');

class Interval {
    constructor(startDate, startTime, endDate, endTime, user_id) {
        this.startDateTime = dayjs(`${startDate} ${startTime}`).format('YYYY-MM-DDTHH:mm:ss');
        this.endDateTime = dayjs(`${endDate} ${endTime}`).format('YYYY-MM-DDTHH:mm:ss');
        this.user_id = user_id;
    }
}

function isOverlap(queryPeriod, interval) {
    const queryStart = dayjs(queryPeriod.startDateTime);
    const queryEnd = dayjs(queryPeriod.endDateTime);
    const intervalStart = dayjs(interval.startDateTime);
    const intervalEnd = dayjs(interval.endDateTime);

    return (
        queryStart.isBefore(intervalEnd) &&
        intervalStart.isBefore(queryEnd)
    );

}

function getOverlappingIntervals(events_object, queryPeriod) {
    const intervalList = [];

    console.log("events_object in getOverlappingIntervals", events_object)

    for (const user of events_object){
        for (let event of user) {
            if (event.start_time && event.end_time) {
                const startDate = dayjs(event.start_time).format('YYYY-MM-DD');
                const startTime = dayjs(event.start_time).format('HH:mm:ss');
                const endDate = dayjs(event.end_time).format('YYYY-MM-DD');
                const endTime = dayjs(event.end_time).format('HH:mm:ss');
                const interval = new Interval(startDate, startTime, endDate, endTime, event.user_id);
                intervalList.push(interval);
            }   
        }
    }
    const overlappingIntervals = [];
    for (let interval of intervalList) {
        if (isOverlap(queryPeriod, interval)) {
            overlappingIntervals.push(interval);
        }
    }

    return overlappingIntervals;
}

function checkConflict(events_object, query_interval) {
    const overlappedIntervals = getOverlappingIntervals(events_object, query_interval);
    return overlappedIntervals ? overlappedIntervals : false;
}

module.exports = {
    Interval,
    checkConflict
};
