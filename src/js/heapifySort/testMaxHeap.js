/**
 * Created by Jerome on 2016/11/7.
 */
var buildMaxHeap = require('./buildMaxHeap').buildMaxHeap,
    displayHeap = require('./displayHeap').displayHeap;

(function () {
    var arr = [2, 14, 8, 9, 10, 3, 8, 5, 13, 2, 7, 1, 6],
        maxHeap = buildMaxHeap(arr);
    console.log(maxHeap);
    displayHeap(maxHeap);
})();