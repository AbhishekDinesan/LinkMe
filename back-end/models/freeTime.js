const dayjs = require('dayjs');

class Interval{
    constructor(startDate,startTime, endDate, endTime){
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
    }
};

class IntervalTreeNode{
    constructor(interval, maxEndTime, maxEndDate){
        this.interval = interval;
        this.maxEndDate = maxEndTime;
        this.maxEndDate = maxEndDate;
        this.left = null;
        this.right = null;
    }
};

function freeTimePreProcess(events_object) {
    var intervalNodeList = [];
    
    for (let event of events_object) {
        if (event.start_time && event.end_time) {
            let startDate = dayjs(event.start_time).format('YYYY-MM-DD');
            let startTime = dayjs(event.start_time).format('HH:mm:ss');
            let endDate = dayjs(event.end_time).format('YYYY-MM-DD');
            let endTime = dayjs(event.end_time).format('HH:mm:ss');
            let interval = { startDate, startTime, endDate, endTime };
            let intervalNode = { interval: { ...interval }, endTime, endDate }; 
            intervalNodeList.push(intervalNode);
        } else {
            console.warn("Event missing start_time or end_time:", event);
        }
    }
    
    // Log the interval node list for better readability
    console.log("This is the interval Node List:", JSON.stringify(intervalNodeList, null, 2));
    return intervalNodeList;
}


function checkFreeTime(){}; // given a list of events, and a query period, return all free time

function intervalTreeInsert(rootNode, intervalNode) {
    if (!rootNode) {
        return new IntervalTreeNode(intervalNode.interval, intervalNode.interval.endTime, intervalNode.interval.endDate);
    }
    if (intervalNode.interval.startDate < rootNode.interval.startDate || 
       (intervalNode.interval.startDate === rootNode.interval.startDate &&
        intervalNode.interval.startTime < rootNode.interval.startTime)) {
        rootNode.left = intervalTreeInsert(rootNode.left, intervalNode);
    } 
    else {
        rootNode.right = intervalTreeInsert(rootNode.right, intervalNode);
    }

    if (dayjs(intervalNode.interval.endDate).isAfter(rootNode.maxEndDate) || 
        (intervalNode.interval.endDate === rootNode.maxEndDate && 
         intervalNode.interval.endTime > rootNode.maxEndTime)) {
        rootNode.maxEndDate = intervalNode.interval.endDate;
        rootNode.maxEndTime = intervalNode.interval.endTime;
    }
    return rootNode;
}

function printIntervalTree(node, level = 0) {
    if (!node) return;

    // Print the right subtree
    printIntervalTree(node.right, level + 1);

    // Print the current node with indentation based on the level
    console.log(' '.repeat(level * 4) + `Node: [${node.interval.startDate} ${node.interval.startTime}] to [${node.interval.endDate} ${node.interval.endTime}], maxEndDate: ${node.maxEndDate}, maxEndTime: ${node.maxEndTime}`);

    // Print the left subtree
    printIntervalTree(node.left, level + 1);
}


function checkConflict(queryPeriod, events_object){// given a time period, see if there is an issue
    const intervalList = freeTimePreProcess(events_object); // json --> intervalNodes
    const hardCodedInterval = new Interval(
        dayjs('2024-10-15').format('YYYY-MM-DD'), // startDate
        dayjs('10:46:48').format('HH:mm:ss'),    // startTime
        dayjs('2024-10-15').format('YYYY-MM-DD'), // endDate
        dayjs('11:46:48').format('HH:mm:ss')     // endTime
    );
    let root = null;
    for (let intervalNode of intervalList) {
        root = intervalTreeInsert(root, intervalNode);
    }
    printIntervalTree(root);
};

module.exports = {
    Interval,
    IntervalTreeNode,
    checkConflict
  };

