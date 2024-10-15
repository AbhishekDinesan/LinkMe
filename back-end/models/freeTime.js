const dayjs = require('dayjs');

class Interval{
    constructor(startDate,startTime, endDate, endTime){
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
    }
};

function freeTimePreProcess(events_object){
    var intervalList = [];
    for (let event of events_object){
    let startDate = dayjs(event.startTime).format('YYYY-MM-DD');
    let startTime = dayjs(event.startTime).format('HH:mm:ss');
    let endDate = dayjs(event.endTime).format('YYYY-MM-DD');
    let endTime = dayjs(event.endTime).format('HH:mm:ss');
    let interval = {startDate, startTime, endDate, endTime};
    intervalList.push(interval);
    }
    console.log(intervalList);
};

function calculateFreeTime(queryPeriod, listOfIntervals){

}

module.exports = {
    Interval,
    freeTimePreProcess
  };

