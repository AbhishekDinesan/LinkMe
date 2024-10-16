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

    // Create a queue to hold nodes at each level
    let queue = [];
    queue.push(root);  // Start with the root node

    // BFS traversal, process nodes level by level
    while (queue.length > 0) {
        let levelSize = queue.length;  // Number of nodes at the current level

        // Process all nodes at the current level
        while (levelSize > 0) {
            // Get the front node from the queue
            let currentNode = queue.shift();
            
            // Print the current node's interval and max values
            console.log(`Node: [${currentNode.interval.startDate} ${currentNode.interval.startTime}] to [${currentNode.interval.endDate} ${currentNode.interval.endTime}], maxEndDate: ${currentNode.maxEndDate}, maxEndTime: ${currentNode.maxEndTime}`);

            // Add left and right children to the queue for the next level
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }

            levelSize--;  // Decrease the level size count
        }

        // Add a line break to separate levels
        console.log("--------");
    }
}