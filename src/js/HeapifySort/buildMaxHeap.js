/**
 * Created by Jerome on 2016/11/7.
 */
var maxHeapify = require('./maxHeapify').maxHeapify;
function buildMaxHeap(arr) {
    var leafIndexBoundary = Math.floor(arr.length / 2);
    for (var i = leafIndexBoundary - 1; i >= 0; i--) {
        maxHeapify(arr, i);
    }
    return arr;
}

module.exports = {
    buildMaxHeap: buildMaxHeap
};
