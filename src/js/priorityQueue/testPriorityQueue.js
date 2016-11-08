/**
 * Created by Jerome on 2016/11/8.
 */
var priorityQueue = require('./priorityQueue');
(function () {
    var items = [{name: 'aaa', key: 5}, {name: 'bbb', key: 7}, {name: 'ccc', key: 12}, {
        name: 'ddd',
        key: 9
    }, {name: 'eee', key: 19}, {name: 'fff', key: 10}, {name: 'ggg', key: 11}, {name: 'hhh', key: 4}, {
        name: 'iii',
        key: 8
    }, {name: 'jjj', key: 1}, {name: 'kkk', key: 14}, {name: 'lll', key: 6}];

    var queue = [],
        status = 0;
    for (var i = 0; i < 12; i++) {
        priorityQueue.insert(queue, items[i], status);
    }
    console.log(queue);
    console.log(priorityQueue.getExtreme(queue));
    priorityQueue.increaseKey(queue, items[9], 100, status);
    console.log(queue);
    priorityQueue.extractExtreme(queue, status);
    console.log(priorityQueue.getExtreme(queue));
})();
