class IntervalTreeNode{
    constructor(interval, maxEndTime, maxEndDate){
        this.interval = interval;
        this.maxEndTime = maxEndTime;
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
    console.log("This is the interval Node List:", JSON.stringify(intervalNodeList, null, 2));
    return intervalNodeList;
}



function checkFreeTime(){}; 

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
         dayjs(intervalNode.interval.endTime).isAfter(rootNode.maxEndTime))) {
        rootNode.maxEndDate = intervalNode.interval.endDate;
        rootNode.maxEndTime = intervalNode.interval.endTime;
    }
    return rootNode;
}

function printIntervalNodesLevelByLevel(root) {
    if (!root) {
        console.log("Tree is empty");
        return;
    }
    let queue = [];
    queue.push(root); 
    while (queue.length > 0) {
        let levelSize = queue.length;  
        while (levelSize > 0) {
            let currentNode = queue.shift();
            console.log(`Node: [${currentNode.interval.startDate} ${currentNode.interval.startTime}] to [${currentNode.interval.endDate} ${currentNode.interval.endTime}], maxEndDate: ${currentNode.maxEndDate}, maxEndTime: ${currentNode.maxEndTime}`);
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }

            levelSize--;  
        }
        console.log("--------");
    }
}