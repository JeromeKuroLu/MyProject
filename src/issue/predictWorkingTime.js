
var _ = require('lodash'),
    tasksArray = [],
    workersArray = [];

function init(taskNumArray, workersNum) {
    tasksArray = taskNumArray;
    var len = tasksArray.length;

    for (var j = 0; j < workersNum; j++) {
        var expectation = 0,
            worker = {};
        for (var i = 1; i <= len; i++) {
            var workingTime = Math.floor(Math.random() * 5 + 1);
            worker[i] = workingTime;
            expectation += workingTime;
        }
        expectation /= len;
        worker[0] = expectation;
        workersArray.push(worker);
    }
}

function calculateWorstTime() {
    var totalTime = 0;
    _.forEach(workersArray, function (worker) {
        totalTime += worker[0];
    });
    console.log("total time is: " + totalTime / 60);
    // console.log('The original workers array:');
    // console.log(workersArray);
    buildHeap(workersArray, 0, 0);
    // console.log('The priority queue is:');
    // console.log(workersArray);
    while (hasTasksLeft()) {
        var currentWorker = extractExtreme(workersArray, 0),
            sortedTasks = getUseMostTimeTasks(currentWorker);
        takeTask(currentWorker, sortedTasks);
    }
    var totalTime2 = 0,
        maxTime = 0;
    _.forEach(workersArray, function (worker) {
        totalTime2 += worker[0];
        if (worker[0] > maxTime) {
            maxTime = worker[0];
        }
    });
    console.log("total time2 is: " + totalTime2 / 60);
    console.log("The difference is: " + (totalTime2 - totalTime) / 60);
    console.log("The max time is: " + maxTime / 60);
}

function getUseMostTimeTasks(worker) {
    var newWorker = _.clone(worker),
        useMostTimeTasks = [];
    // insert sort
    // console.log(worker);
    for (var i = 1; i <= tasksArray.length; i++) {
        var key = newWorker[i],
            comparedOneIndex = i - 1;
        useMostTimeTasks.push(i);
        while (key > newWorker[comparedOneIndex] && comparedOneIndex > 0) {
            newWorker[comparedOneIndex + 1] = newWorker[comparedOneIndex];
            newWorker[comparedOneIndex] = key;
            var m = useMostTimeTasks[comparedOneIndex];
            useMostTimeTasks[comparedOneIndex] = useMostTimeTasks[comparedOneIndex - 1];
            useMostTimeTasks[comparedOneIndex - 1] = m;
            comparedOneIndex--;
        }
    }
    // console.log(newWorker);
    // console.log(useMostTimeTasks);
    return useMostTimeTasks;
}

function takeTask(worker, sortedTasks) {
    for (var i = 0, len = sortedTasks.length; i < len; i++) {
        var taskNo = sortedTasks[i],
            taskIndex = taskNo - 1;
        if (tasksArray[taskIndex] > 0) {
            tasksArray[taskIndex]--;
            worker[0] += worker[taskNo];
            insert(workersArray, worker, 0, 0);
            break;
        }
        else if (tasksArray[taskIndex] <= 0 && i == len - 1) {
            insert(workersArray, worker, 0, 0);
        }
    }
}

function hasTasksLeft() {
    var hasTasksLeft = false;
    _.forEach(tasksArray, function (taskNum) {
        if (taskNum > 0) {
            hasTasksLeft = true;
            return false;
        }
    });
    return hasTasksLeft;
}
// status: 0 = minimum, 1 = maximum
function buildHeap(s, status, key) {
    var leafIndexBoundary = Math.floor(s.length / 2);
    for (var i = leafIndexBoundary - 1; i >= 0; i--) {
        heapify(s, i, status, key);
    }
    return s;
}

function heapify(s, i, status, key) {
    var root = s[i],
        leftChildIndex = 2 * i + 1,
        rightChildIndex = 2 * i + 2,
        leftChild = s[leftChildIndex],
        rightChild = s[rightChildIndex],
        extremeValueIndex = i;

    if (leftChild && leftChildIndex < s.length) {
        if ((!status || leftChild[key] > s[extremeValueIndex][key]) && (status || leftChild[key] < s[extremeValueIndex][key])) {
            extremeValueIndex = leftChildIndex;
        }
    }

    if (rightChild && rightChildIndex < s.length) {
        if ((!status || rightChild[key] > s[extremeValueIndex][key]) && (status || rightChild[key] < s[extremeValueIndex][key])) {
            extremeValueIndex = rightChildIndex;
        }
    }
    if (extremeValueIndex != i) {
        s[i] = s[extremeValueIndex];
        s[extremeValueIndex] = root;
        heapify(s, extremeValueIndex, status, key);
    }
}

function insert(s, el, status, key) {
    if (typeof el === 'object' && el[key]) {
        s.push(el);
        if (s.length > 1) {
            compareWithParent(s, s.length - 1, status, key);
        }
    }
    else {
        console.error('must insert a Object contains "key" value.');
    }
}

function compareWithParent(s, i, status, key) {
    var child = s[i],
        parentIndex = Math.floor((i - 1) / 2),
        parent = s[parentIndex];

    var compareParent = (!status || child[key] > parent[key]) && (status || child[key] < parent[key]);
    if (compareParent) {
        s[parentIndex] = child;
        s[i] = parent;
        if (parentIndex > 0) {
            compareWithParent(s, parentIndex, status, key);
        }
    }
}

function extractExtreme(s, status) {
    var extreme;
    if (s.length < 1) {
        console.error('heap underflow');
    }
    else {
        extreme = s.shift();
        buildHeap(s, status);
    }
    return extreme;
}

(function () {
    var taskNumArray = [3205, 1342, 9085, 8723, 1233], //sum 23588, min 393h, max 1965h.
        workersNum = 400;
    init(taskNumArray, workersNum);
    calculateWorstTime();
}());